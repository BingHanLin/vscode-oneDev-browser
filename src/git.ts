import * as cp from 'child_process';
import * as path from 'path';
import { PullRequestChange } from '../shared/types';

export async function getPullRequestChanges(
    rootPath: string,
    sourceBranch: string,
    targetBranch: string,
    prNumber?: number,
    remoteUrl?: string,
    token?: string
): Promise<PullRequestChange[]> {
    return new Promise((resolve, reject) => {
        // Construct authenticated URL if token provided
        let fetchUrl = 'origin';
        if (remoteUrl && token) {
            // assume remoteUrl is like https://onedev.com/project
            // inject token: https://git:token@onedev.com/project
            try {
                const urlObj = new URL(remoteUrl);
                urlObj.username = 'git';
                urlObj.password = token;
                fetchUrl = urlObj.toString();
            } catch (e) {
                console.error("Invalid remote URL", e);
            }
        }

        // Strategy:
        // 1. Fetch target branch (base)
        // 2. Fetch source branch OR refs/pull/N/head (head)
        // 3. Diff

        // OneDev standard refs: refs/pull/N/head
        const sourceRef = prNumber ? `refs/pull/${prNumber}/head` : sourceBranch;
        const targetRef = targetBranch;

        // Fetch command: fetch target and source
        // We fetch into FETCH_HEAD.
        // NOTE: fetching multiple refs into FETCH_HEAD might overwrite. 
        // Safer to fetch target to local remote-tracking branch?
        // git fetch origin targetBranch
        // git fetch origin refs/pull/N/head:refs/remotes/origin/pr/N

        const cmds: string[] = [];

        // Use standard remote tracking branches
        // We explicitly fetch to refs/remotes/origin/BRANCH to ensure we have the commit
        // and that 'origin/BRANCH' is valid.

        const localTargetRef = `refs/remotes/origin/${targetBranch}`;
        const localSourceRef = `refs/remotes/origin/${sourceBranch}`;

        // Fetch command: src:dest
        // origin/target -> refs/remotes/origin/target
        cmds.push(`git fetch ${fetchUrl} ${targetRef}:${localTargetRef}`);

        // origin/source -> refs/remotes/origin/source
        // We use sourceRef which is just sourceBranch now (we ignored PR ref for now as requested)
        cmds.push(`git fetch ${fetchUrl} ${sourceBranch}:${localSourceRef}`);

        // Execute fetches sequentially
        const runFetches = async () => {
            for (const cmd of cmds) {
                await new Promise<void>((res) => {
                    cp.exec(cmd, { cwd: rootPath }, (err) => {
                        if (err) console.warn(`[git] Fetch warning: ${err.message}`);
                        res();
                    });
                });
            }
        };

        runFetches().then(() => {
            // Diff using the refs we just fetched
            const baseObj = localTargetRef;
            const headObj = localSourceRef;

            // User requested to check if '...' is needed.
            // Converting to Direct Diff (base head) to avoid ambiguous merge-base issues
            // Note: This shows diff between tips, so if target has advanced, it might show extra noise.
            const diffCmd = `git diff --name-status ${baseObj} ${headObj}`;

            cp.exec(diffCmd, { cwd: rootPath }, async (error, stdout, stderr) => {
                if (error) {
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

                    const headRef = localSourceRef;
                    const baseRef = localTargetRef;

                    let blobId: string | undefined;
                    let oldBlobId: string | undefined;

                    if (type !== 'DELETE') {
                        blobId = await getGitRevParse(rootPath, headRef, filePath);
                    }
                    if (type !== 'ADD') {
                        oldBlobId = await getGitRevParse(rootPath, baseRef, originalPath || filePath);
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
        });
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
