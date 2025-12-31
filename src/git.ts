import * as cp from 'child_process';
import * as path from 'path';
import { PullRequestChange } from '../shared/types';

export async function getPullRequestChanges(
    rootPath: string,
    prNumber: number,
    baseCommitHash: string
): Promise<PullRequestChange[]> {
    return new Promise((resolve, reject) => {
        if (!prNumber) {
            return reject("PR Number is required for fetching changes.");
        }
        if (!baseCommitHash) {
            return reject("Base Commit Hash is required for fetching changes.");
        }

        // ONE: git fetch origin refs/pulls/<PR Number>/head
        // We fetch into FETCH_HEAD.
        const fetchCmd = `git fetch origin refs/pulls/${prNumber}/head`;

        cp.exec(fetchCmd, { cwd: rootPath }, (err, stdout, stderr) => {
            if (err) {
                console.warn(`Fetch with refs/pulls failed, trying refs/pull just in case...`);
                const fetchCmdFallback = `git fetch origin refs/pull/${prNumber}/head`;
                cp.exec(fetchCmdFallback, { cwd: rootPath }, (err2) => {
                    if (err2) {
                        return reject(`Git fetch failed: ${stderr || err?.message}`);
                    }
                    proceedToDiff(rootPath, baseCommitHash, resolve, reject);
                });
                return;
            }
            proceedToDiff(rootPath, baseCommitHash, resolve, reject);
        });
    });
}

function proceedToDiff(rootPath: string, baseCommitHash: string, resolve: Function, reject: Function) {
    // TWO: git diff baseCommitHash FETCH_HEAD
    const diffCmd = `git diff --name-status ${baseCommitHash} FETCH_HEAD`;

    cp.exec(diffCmd, { cwd: rootPath }, async (error, stdout, stderr) => {
        if (error) {
            // If baseCommitHash is not found, we might need to fetch it?
            // But usually it should be in the repo if it's the base of the PR. 
            // Error message usually says "bad revision" if missing.
            // We can try to fetch it specifically if it fails? 
            // For now, let's just fail and report.
            return reject(`Git diff failed: ${stderr || error.message}`);
        }

        const lines = stdout.trim().split('\n');
        const changes: PullRequestChange[] = [];

        for (const line of lines) {
            if (!line.trim()) continue;

            const parts = line.split('\t');
            const statusChar = parts[0][0]; // 'M', 'A', 'D', 'R'
            const filePath = parts.length > 1 ? parts[parts.length - 1] : '';
            const originalPath = parts.length === 3 ? parts[1] : undefined;

            let type: "ADD" | "MODIFY" | "DELETE" | "RENAME" = "MODIFY";
            if (statusChar === 'A') type = "ADD";
            else if (statusChar === 'D') type = "DELETE";
            else if (statusChar === 'R') type = "RENAME";

            // Head is FETCH_HEAD
            // Base is baseCommitHash

            let blobId: string | undefined;
            let oldBlobId: string | undefined;

            if (type !== 'DELETE') {
                blobId = await getGitRevParse(rootPath, "FETCH_HEAD", filePath);
            }
            if (type !== 'ADD') {
                // Determine old path (if rename, use original, else use current)
                const oldPathToUse = originalPath || filePath;
                oldBlobId = await getGitRevParse(rootPath, baseCommitHash, oldPathToUse);
            }

            changes.push({
                type,
                path: filePath,
                oldPath: originalPath,
                blobId,
                oldBlobId
            });
        }
        resolve(changes);
    });
}

function getGitRevParse(rootPath: string, ref: string, filePath: string): Promise<string | undefined> {
    return new Promise((resolve) => {
        // git rev-parse ref:path
        const cmd = `git rev-parse ${ref}:${filePath}`;
        cp.exec(cmd, { cwd: rootPath }, (err, stdout) => {
            if (err) {
                // File might not exist in that ref
                resolve(undefined);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}
