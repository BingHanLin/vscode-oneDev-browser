import * as cp from 'child_process';
import { PullRequestChange } from '../shared/types';
import { assertValidSha, assertValidGitRef } from './utils/validation';

export async function getPullRequestChanges(
    rootPath: string,
    prNumber: number,
    baseCommitHash: string
): Promise<PullRequestChange[]> {
    return new Promise((resolve, reject) => {
        if (!prNumber || !Number.isInteger(prNumber) || prNumber <= 0) {
            return reject("PR Number must be a positive integer.");
        }
        if (!baseCommitHash) {
            return reject("Base Commit Hash is required for fetching changes.");
        }
        assertValidSha(baseCommitHash, "baseCommitHash");

        const prRef = `refs/pulls/${prNumber}/head`;
        const prRefFallback = `refs/pull/${prNumber}/head`;

        cp.execFile('git', ['fetch', 'origin', prRef], { cwd: rootPath }, (err, _stdout, stderr) => {
            if (err) {
                console.warn(`Fetch with refs/pulls failed, trying refs/pull just in case...`);
                cp.execFile('git', ['fetch', 'origin', prRefFallback], { cwd: rootPath }, (err2) => {
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
    cp.execFile('git', ['diff', '--name-status', baseCommitHash, 'FETCH_HEAD'], { cwd: rootPath }, async (error, stdout, stderr) => {
        if (error) {
            return reject(`Git diff failed: ${stderr || error.message}`);
        }

        const lines = stdout.trim().split('\n');
        const changes: PullRequestChange[] = [];

        for (const line of lines) {
            if (!line.trim()) { continue; }

            const parts = line.split('\t');
            const statusChar = parts[0][0]; // 'M', 'A', 'D', 'R'
            const filePath = parts.length > 1 ? parts[parts.length - 1] : '';
            const originalPath = parts.length === 3 ? parts[1] : undefined;

            let type: "ADD" | "MODIFY" | "DELETE" | "RENAME" = "MODIFY";
            if (statusChar === 'A') { type = "ADD"; }
            else if (statusChar === 'D') { type = "DELETE"; }
            else if (statusChar === 'R') { type = "RENAME"; }

            let blobId: string | undefined;
            let oldBlobId: string | undefined;

            if (type !== 'DELETE') {
                blobId = await getGitRevParse(rootPath, "FETCH_HEAD", filePath);
            }
            if (type !== 'ADD') {
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
        cp.execFile('git', ['rev-parse', `${ref}:${filePath}`], { cwd: rootPath }, (err, stdout) => {
            if (err) {
                resolve(undefined);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

export async function checkoutBranch(
    rootPath: string,
    prNumber?: number,
    sourceBranch?: string,
    onProgress?: (message: string) => void
): Promise<string> {
    const runCommand = (args: string[]) => {
        return new Promise<string>((resolve, reject) => {
            cp.execFile('git', args, { cwd: rootPath }, (err, stdout, stderr) => {
                if (err) { reject(stderr || err.message); }
                else { resolve(stdout.trim()); }
            });
        });
    };

    if (!sourceBranch) {
        throw new Error("Source branch is required.");
    }
    assertValidGitRef(sourceBranch, "sourceBranch");

    let message = `Checking out branch ${sourceBranch}...`;
    if (onProgress) { onProgress(message); }

    try {
        await runCommand(['checkout', sourceBranch]);
    } catch (err) {
        if (prNumber) {
            if (!Number.isInteger(prNumber) || prNumber <= 0) {
                throw new Error("PR number must be a positive integer.");
            }
            if (onProgress) { onProgress("Fetching PR head..."); }
            try {
                const fetchRef = `refs/pulls/${prNumber}/head`;
                try {
                    await runCommand(['fetch', 'origin', `${fetchRef}:${sourceBranch}`]);
                } catch (e) {
                    await runCommand(['fetch', 'origin', `refs/pull/${prNumber}/head:${sourceBranch}`]);
                }

                if (onProgress) { onProgress("Checking out..."); }
                await runCommand(['checkout', sourceBranch]);
            } catch (fetchErr: any) {
                throw new Error(`Failed to checkout branch ${sourceBranch}: ${fetchErr.message || fetchErr}`);
            }
        } else {
            throw new Error(`Failed to checkout branch ${sourceBranch}: ${(err as any).message || err}`);
        }
    }
    return sourceBranch!;
}
