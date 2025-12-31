import * as vscode from 'vscode';
import { fetchIssues, fetchPullRequests, fetchBuilds } from './api';
import { ExtensionContext } from 'vscode';
import { getConfigValue } from './utils/config';

interface OneDevCredentials {
    url: string;
    email: string;
    token: string;
    projectPath: string;
}

function getCredentials(): OneDevCredentials {
    // Scope config to the first workspace folder to ensure we pick up .vscode/settings.json
    const resource = vscode.workspace.workspaceFolders?.[0]?.uri;
    const config = vscode.workspace.getConfiguration("onedev-browser", resource);
    return {
        url: getConfigValue(config, "url"),
        email: getConfigValue(config, "email"),
        token: getConfigValue(config, "token"),
        projectPath: getConfigValue(config, "projectPath")
    };
}

export function registerChatParticipant(context: ExtensionContext) {
    const participant = vscode.chat.createChatParticipant('onedev-browser.chatParticipant', async (request, context, response, token) => {
        const cmd = request.command;
        const prompt = request.prompt;
        const creds = getCredentials();

        if (!creds.url || !creds.token || !creds.projectPath) {
            response.markdown('Please configure OneDev settings (URL, Token, Project Path) first.');
            return;
        }

        try {
            if (cmd === 'issues') {
                await handleIssues(creds, prompt, response);
            } else if (cmd === 'pr') {
                await handlePRs(creds, prompt, response);
            } else if (cmd === 'build') {
                await handleBuilds(creds, prompt, response);
            } else if (cmd === 'review') {
                await handleReview(creds, prompt, response);
            } else {
                response.markdown('I can help you querying **issues**, **PRs**, and **builds**. Try `@onedev /issues assigned to me`.');
            }
        } catch (err: any) {
            response.markdown(`Error processing request: ${err.message}`);
        }
    });

    // Set the icon
    participant.iconPath = vscode.Uri.joinPath(context.extensionUri, 'images', 'icon.png');

    context.subscriptions.push(participant);
}

async function handleIssues(creds: OneDevCredentials, prompt: string, response: vscode.ChatResponseStream) {
    // Parse natural language "to me" -> "me" for OneDev query
    // Example: "assigned to me" -> "Assignee" is "me"
    // OneDev supports "me" keyword if authenticated user is known, or let's assume user email or specific query syntax.
    // If prompt is empty, just list recent.

    let query = "";
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('assign') && lowerPrompt.includes('me')) {
        query = `"Assignee" is "me"`;
    } else if (lowerPrompt.includes('submit') && lowerPrompt.includes('me')) {
        query = `"Submitter" is "me"`;
    } else if (prompt.trim().length > 0) {
        // Assume text search on title/desc
        // "Title" contains "foo" OR "Description" contains "foo"
        // But simpler: just text search if OneDev supports it or pass raw query if advanced User?
        // Let's assume text search: quote the prompt
        // OneDev syntax for text search? usually simple words match description/title
        // But safer to allow advanced users to type query directly if they want, 
        // OR construct a fuzzy search.
        // Let's try to infer: if it looks like query syntax do nothing, else make it a text search
        if (!prompt.includes('"')) {
            query = `("Title" contains "${prompt}" OR "Description" contains "${prompt}")`;
        } else {
            query = prompt; // User typed explicit query
        }
    }

    response.progress('Fetching issues...');
    const issues = await fetchIssues(creds, 0, 10, query);

    if (issues.length === 0) {
        response.markdown('No issues found.');
        return;
    }

    response.markdown(`Found ${issues.length} issues:\n`);
    for (const issue of issues) {
        // [Link text](url) - we don't have direct web URL in Issue type, but can construct from creds.url
        // url/projects/projectPath/issues/number
        // Issue interface has number, title.
        const issueUrl = `${creds.url}/projects/${creds.projectPath}/issues/${issue.number}`;
        response.markdown(`- [**#${issue.number}**](${issueUrl}) ${issue.title} (${issue.state})\n`);
    }
}

async function handlePRs(creds: OneDevCredentials, prompt: string, response: vscode.ChatResponseStream) {
    // Check for "summarize #123" intent
    const summarizeMatch = prompt.match(/summarize\s+(?:pr\s+)?#?(\d+)/i);

    if (summarizeMatch) {
        // Reuse Git Logic to summarize! 
        // Need to import git logic or refactor.
        // Since logic is inside `extension.ts` (the LM interaction), we might need to export it or duplicate/move common parts.
        // Moving common logic is better. But for now, let's keep it simple: 
        // fetch PR, pass to LM. 
        // To access LM from here, we need `vscode.lm`.
        // We'll need `getPullRequestChanges` from git.ts

        const prIdOrNum = parseInt(summarizeMatch[1]);
        response.progress(`Summarizing PR #${prIdOrNum}...`);

        await summarizePR(creds, prIdOrNum, response);
        return;
    }

    let query = "";
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('review') && lowerPrompt.includes('me')) {
        // "Reviewers" contains "me" AND "Submitter" != "me"
        query = `"Reviewers" contains "me" AND "Submitter" != "me"`; // rough approx
    } else if ((lowerPrompt.includes('create') || lowerPrompt.includes('submit')) && lowerPrompt.includes('me')) {
        query = `"Submitter" is "me"`;
    } else if (prompt.trim().length > 0) {
        if (!prompt.includes('"')) {
            query = `("Title" contains "${prompt}" OR "Description" contains "${prompt}")`;
        } else {
            query = prompt;
        }
    }

    response.progress('Fetching PRs...');
    const prs = await fetchPullRequests(creds, 0, 10, query);

    if (prs.length === 0) {
        response.markdown('No PRs found.');
        return;
    }

    response.markdown(`Found ${prs.length} PRs:\n`);
    for (const pr of prs) {
        // url/projects/projectPath/pulls/number
        const prUrl = `${creds.url}/projects/${creds.projectPath}/pulls/${pr.number}`;
        response.markdown(`- [**#${pr.number}**](${prUrl}) ${pr.title}\n`);
    }
}

async function summarizePR(creds: OneDevCredentials, prNumber: number, response: vscode.ChatResponseStream) {
    // 1. Fetch PR details to get branches (Wait, fetchPullRequests returns list, we need specific PR details?)
    // fetchPullRequests supports query. query by number.
    const prs = await fetchPullRequests(creds, 0, 1, `"Number" is "${creds.projectPath}#${prNumber}"`);
    if (prs.length === 0) {
        response.markdown(`PR #${prNumber} not found.`);
        return;
    }
    const pr = prs[0];

    // 2. Fetch changes via Git
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        response.markdown('No workspace folder open. Cannot run git diff.');
        return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;

    try {
        const { getPullRequestChanges } = require('./git');
        var cp = require('child_process'); // Access cp for git show

        const changes = await getPullRequestChanges(
            rootPath,
            pr.number,
            pr.baseCommitHash
        );

        // 3. Construct Prompt
        let promptText = `Please summarize the following changes for PR #${pr.number}: "${pr.title}":\n\n`;

        const getBlobContent = (sha: string) => {
            return new Promise<string>((resolve) => {
                try {
                    cp.exec(`git show ${sha}`, { cwd: rootPath }, (err: any, stdout: string) => {
                        resolve(stdout || "");
                    });
                } catch (e) { resolve(""); }
            });
        };

        for (const change of changes) {
            if ((change.type === 'MODIFY' || change.type === 'ADD') && change.blobId) {
                const content = await getBlobContent(change.blobId);
                const truncated = content.slice(0, 1500);
                promptText += `File: ${change.path}\n\`\`\`\n${truncated}\n\`\`\`\n\n`;
            }
        }

        // 4. Send to LM
        const models = await vscode.lm.selectChatModels({ family: 'gpt-4' });
        let model = models.length > 0 ? models[0] : (await vscode.lm.selectChatModels())[0];

        if (!model) {
            response.markdown('No Language Model found. Please check GitHub Copilot Chat.');
            return;
        }

        const chatReq = await model.sendRequest([vscode.LanguageModelChatMessage.User(promptText)], {}, new vscode.CancellationTokenSource().token);

        for await (const frag of chatReq.text) {
            response.markdown(frag);
        }

    } catch (err: any) {
        response.markdown(`Failed to summarize: ${err.message}`);
    }
}

async function handleBuilds(creds: OneDevCredentials, prompt: string, response: vscode.ChatResponseStream) {
    // Sort by Date desc default? API usually does.
    // Query? status?

    let query = "";
    if (prompt.includes('fail')) {
        query = `"Status" is "failed"`; // Verify OneDev status keywords
    } else if (prompt.includes('success')) {
        query = `"Status" is "successful"`;
    }

    response.progress('Fetching builds...');
    const builds = await fetchBuilds(creds, 0, 5, query);

    if (builds.length === 0) {
        response.markdown('No builds found.');
        return;
    }

    response.markdown(`Recent Builds:\n`);
    for (const build of builds) {
        const icon = build.status === 'SUCCESSFUL' ? '$(check)' : build.status === 'FAILED' ? '$(error)' : '$(loading)';
        // url/projects/projectPath/builds/number
        const buildUrl = `${creds.url}/projects/${creds.projectPath}/builds/${build.number}`;
        response.markdown(`- ${icon} [**#${build.number}**](${buildUrl}) ${build.jobName} - ${build.status}\n`);
    }
}

async function handleReview(creds: OneDevCredentials, prompt: string, response: vscode.ChatResponseStream) {
    // Expect prompt to contain PR number like "#123" or just numbers "123"
    const match = prompt.match(/#?(\d+)/);
    if (!match) {
        response.markdown('Please specify a PR number, e.g., `@onedev /review #123`.');
        return;
    }
    const prNumber = parseInt(match[1]);

    // 1. Fetch PR details
    response.progress(`Fetching PR #${prNumber}...`);
    const prs = await fetchPullRequests(creds, 0, 1, `"Number" is "${creds.projectPath}#${prNumber}"`);
    if (prs.length === 0) {
        response.markdown(`PR #${prNumber} not found.`);
        return;
    }
    const pr = prs[0];

    // 2. Fetch changes via Git (reuse logic)
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        response.markdown('No workspace folder open. Cannot run git diff.');
        return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;

    try {
        const { getPullRequestChanges } = require('./git');
        var cp = require('child_process');

        response.progress('Fetching changes from Git...');
        const changes = await getPullRequestChanges(
            rootPath,
            pr.number,
            pr.baseCommitHash
        );

        if (changes.length === 0) {
            response.markdown('No changes found in this PR.');
            return;
        }

        // 3. Construct Prompt (Review Style)
        let promptText = `Please provide a code review for the following changes in PR #${pr.number}: "${pr.title}". \n`;
        promptText += `Focus on logic errors, potential bugs, code style, and best practices.\n\n`;

        const getBlobContent = (sha: string) => {
            return new Promise<string>((resolve) => {
                try {
                    cp.exec(`git show ${sha}`, { cwd: rootPath }, (err: any, stdout: string) => {
                        resolve(stdout || "");
                    });
                } catch (e) { resolve(""); }
            });
        };

        for (const change of changes) {
            if ((change.type === 'MODIFY' || change.type === 'ADD') && change.blobId) {
                const content = await getBlobContent(change.blobId);
                promptText += `File: ${change.path}\n\`\`\`\n${content}\n\`\`\`\n\n`;
            }
        }

        // 4. Select Model
        response.progress('Configuring Model...');

        const config = vscode.workspace.getConfiguration("onedev-browser");
        const preferredModel = getConfigValue(config, "codeReviewModel");

        let model: vscode.LanguageModelChat | undefined;

        if (preferredModel) {
            const allModels = await vscode.lm.selectChatModels();
            model = allModels.find(m => m.family === preferredModel || m.id === preferredModel || m.name === preferredModel);
            if (!model) {
                response.markdown(`Warning: Configured model '${preferredModel}' not found. Falling back to default.\n\n`);
            }
        }

        if (!model) {
            const models = await vscode.lm.selectChatModels({ family: 'gpt-4' });
            model = models.length > 0 ? models[0] : (await vscode.lm.selectChatModels())[0];
        }

        if (!model) {
            response.markdown('No Language Model found. Please check GitHub Copilot Chat.');
            return;
        }

        // 5. Send to LM, show working model name
        response.progress(`Generating Review With ${model.name}...`);

        const chatReq = await model.sendRequest([vscode.LanguageModelChatMessage.User(promptText)], {}, new vscode.CancellationTokenSource().token);

        for await (const frag of chatReq.text) {
            response.markdown(frag);
        }

    } catch (err: any) {
        response.markdown(`Failed to generate review: ${err.message}`);
    }
}
