
import * as vscode from "vscode";
import { PRsTreeDataProvider } from "./prsWebviewViewProvider";
import { IssuesTreeDataProvider } from "./issuesTreeDataProvider";
import { BuildsTreeDataProvider } from "./buildsTreeDataProvider";
import { registerStatusBarCommand } from "./statusbar";
import { getConfigValue, getConfigNumber } from "./utils/config";


export function activate(context: vscode.ExtensionContext) {
  // Register PRs/Issues/Builds providers ONCE
  const prsProvider = new PRsTreeDataProvider();
  const issuesProvider = new IssuesTreeDataProvider();
  const buildsProvider = new BuildsTreeDataProvider();
  // Create tree views ONCE
  const prsView = vscode.window.createTreeView("onedevPRsView", { treeDataProvider: prsProvider });
  const issuesView = vscode.window.createTreeView("onedevIssuesView", { treeDataProvider: issuesProvider });
  const buildsView = vscode.window.createTreeView("onedevBuildsView", { treeDataProvider: buildsProvider });

  // Register one refresh command for all views
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.refreshAllViews', () => {
      prsProvider.refresh();
      issuesProvider.refresh();
      buildsProvider.refresh();
    })
  );
  // --- Refresh commands for tree views ---
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.refreshPRsView', () => prsProvider.refresh())
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.refreshIssuesView', () => issuesProvider.refresh())
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.refreshBuildsView', () => buildsProvider.refresh())
  );

  // --- Auto-refresh when view is focused ---
  let prsInterval: NodeJS.Timeout | undefined;
  let issuesInterval: NodeJS.Timeout | undefined;
  let buildsInterval: NodeJS.Timeout | undefined;
  prsView.onDidChangeVisibility(e => {
    if (e.visible) {
      prsProvider.refresh();
      prsInterval = setInterval(() => prsProvider.refresh(), 30000);
    } else if (prsInterval) {
      clearInterval(prsInterval);
      prsInterval = undefined;
    }
  });
  issuesView.onDidChangeVisibility(e => {
    if (e.visible) {
      issuesProvider.refresh();
      issuesInterval = setInterval(() => issuesProvider.refresh(), 30000);
    } else if (issuesInterval) {
      clearInterval(issuesInterval);
      issuesInterval = undefined;
    }
  });
  buildsView.onDidChangeVisibility(e => {
    if (e.visible) {
      buildsProvider.refresh();
      buildsInterval = setInterval(() => buildsProvider.refresh(), 30000);
    } else if (buildsInterval) {
      clearInterval(buildsInterval);
      buildsInterval = undefined;
    }
  });
  // Register command for tree view navigation to PR in webview
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.openWebviewToPR', (prNumber: number, pr: any, url?: string, projectPath?: string) => {
      // Open the PR in the user's default browser
      if (url && projectPath && prNumber) {
        const prUrl = `${url}/${projectPath}/~pulls/${prNumber}`;
        vscode.env.openExternal(vscode.Uri.parse(prUrl));
      } else {
        vscode.window.showErrorMessage('Missing oneDev URL, project path, or PR number.');
      }
    })
  );


  // Register status bar button
  registerStatusBarCommand(context);

  // Register command for opening the React webview
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.openWebview', () => {
      openReactWebview(context);
    })
  );

  // Register commands for tree view navigation to webview
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.openWebviewToIssue', (issueNumber: number, issue: any, url?: string, projectPath?: string) => {
      // Open the Issue in the user's default browser
      if (url && projectPath && issueNumber) {
        const issueUrl = `${url}/${projectPath}/~issues/${issueNumber}`;
        vscode.env.openExternal(vscode.Uri.parse(issueUrl));
      } else {
        vscode.window.showErrorMessage('Missing oneDev URL, project path, or issue number.');
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.openWebviewToBuild', (buildNumber: number, build: any, url?: string, projectPath?: string) => {
      // Open the Build in the user's default browser
      if (url && projectPath && buildNumber) {
        const buildUrl = `${url}/${projectPath}/~builds/${buildNumber}`;
        vscode.env.openExternal(vscode.Uri.parse(buildUrl));
      } else {
        vscode.window.showErrorMessage('Missing oneDev URL, project path, or build number.');
      }
    })
  );

  // Register Content Provider for readonly file access
  const myScheme = 'onedev';
  const myProvider = new OneDevContentProvider();
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider));
}

class OneDevContentProvider implements vscode.TextDocumentContentProvider {
  async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
    const query = new URLSearchParams(uri.query);
    const projectId = query.get('projectId');
    const blobId = query.get('blobId');

    if (!projectId || !blobId) {
      return "Error: Missing projectId or blobId";
    }

    // Try Local Git first if blobId looks like a SHA (40 hex chars)
    // or just always try git if we have a workspace
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      const rootPath = workspaceFolders[0].uri.fsPath;
      const cp = require('child_process');
      try {
        return await new Promise<string>((resolve, reject) => {
          // -p pretty print, but simple git show blobId works for blobs
          cp.exec(`git show ${blobId}`, { cwd: rootPath }, (err: any, stdout: string, stderr: string) => {
            if (err) {
              reject(err);
            } else {
              resolve(stdout);
            }
          });
        });
      } catch (gitErr) {
        console.log("Local git fetch failed, falling back to API", gitErr);
      }
    }

    const config = vscode.workspace.getConfiguration("onedev-browser");
    const creds = {
      url: getConfigValue(config, "url"),
      email: getConfigValue(config, "email"),
      token: getConfigValue(config, "token"),
      projectPath: getConfigValue(config, "projectPath")
    };

    try {
      const { fetchFileContent } = require('./api');
      const content = await fetchFileContent(creds, parseInt(projectId), blobId);
      return content;
    } catch (err: any) {
      return `Error reading file: ${err.message}`;
    }
  }
}

let oneDevPanel: vscode.WebviewPanel | undefined;

function openReactWebview(context: vscode.ExtensionContext) {
  if (oneDevPanel) {
    oneDevPanel.reveal(vscode.ViewColumn.One);
    return oneDevPanel;
  }
  let panel = vscode.window.createWebviewPanel("webview", "oneDev Browser", vscode.ViewColumn.One, {
    enableScripts: true
  });
  oneDevPanel = panel;

  let scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.js"));
  let cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.css"));

  panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
      <head>
      <link rel="stylesheet" href="${cssSrc}" />
      </head>
      <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
      <script src="${scriptSrc}"></script>
      </body>
    </html>
    `;

  // --- Webview message handler ---
  panel.onDidDispose(() => {
    oneDevPanel = undefined;
  });
  panel.webview.onDidReceiveMessage(async (message) => {
    console.log('[Extension] Received message:', message);
    try {
      if (message.command === 'getCredentials') {
        const config = vscode.workspace.getConfiguration('onedev-browser');

        const url = getConfigValue(config, 'url');
        const email = getConfigValue(config, 'email');
        const token = getConfigValue(config, 'token');
        const projectPath = getConfigValue(config, 'projectPath');
        panel.webview.postMessage({
          command: 'setCredentials',
          url,
          email,
          token,
          projectPath
        });
      } else if (message.command === 'checkoutBranch') {
        try {
          const branch = message.branch;
          const terminal = vscode.window.createTerminal({ name: 'oneDev: git checkout' });
          terminal.show();
          // First fetch, then checkout (auto-create local branch if needed)
          let fetchAndCheckoutCmd = '';
          if (process.platform === 'win32') {
            // Windows (cmd/powershell)
            fetchAndCheckoutCmd = `git fetch origin ${branch}:${branch} ; git checkout ${branch}`;
          } else {
            // macOS/Linux (bash/zsh/sh)
            fetchAndCheckoutCmd = `git fetch origin ${branch}:${branch} || git fetch origin && git checkout ${branch}`;
          }
          terminal.sendText(fetchAndCheckoutCmd);
          vscode.window.showInformationMessage(`Switching to branch ${branch}`);
          panel.webview.postMessage({
            command: 'checkoutBranchSuccess',
            branch
          });
        } catch (err) {
          panel.webview.postMessage({
            command: 'checkoutBranchError',
            message: 'Failed to checkout branch.'
          });
        }
        // Handle fetchCurrentBuilds command from webview
      } else if (message.command === 'fetchCurrentBuilds') {
        try {
          // Dynamically import fetchCurrentBuilds from api.ts
          const { fetchCurrentBuilds } = require('./api');
          // Call fetchCurrentBuilds with credentials and PR number
          const builds = await fetchCurrentBuilds({
            url: message.url,
            email: message.email,
            token: message.token,
            projectPath: message.projectPath
          }, message.prID);
          // Send builds data back to webview
          panel.webview.postMessage({
            command: 'setCurrentBuilds',
            builds
          });
        } catch (err) {
          // On error, send empty builds array
          panel.webview.postMessage({
            command: 'setCurrentBuilds',
            builds: []
          });
        }
      } else if (message.command === 'fetchPullRequests') {
        try {
          const { fetchPullRequests } = require('./api');
          const offset = typeof message.offset === 'number' ? message.offset : 0;
          const count = typeof message.count === 'number' ? message.count : 20;
          const pullRequests = await fetchPullRequests({
            url: message.url,
            email: message.email,
            token: message.token,
            projectPath: message.projectPath
          }, offset, count);
          panel.webview.postMessage({
            command: 'setPullRequests',
            pullRequests,
            offset,
            count
          });
        } catch (err) {
          panel.webview.postMessage({
            command: 'showErrorMessage',
            message: 'Failed to fetch pull requests.'
          });
        }
      } else if (message.command === 'fetchBuilds') {
        try {
          const { fetchBuilds } = require('./api');
          const offset = typeof message.offset === 'number' ? message.offset : 0;
          const count = typeof message.count === 'number' ? message.count : 20;
          const builds = await fetchBuilds({
            url: message.url,
            email: message.email,
            token: message.token,
            projectPath: message.projectPath
          }, offset, count);
          panel.webview.postMessage({
            command: 'setBuilds',
            builds,
            offset,
            count
          });
        } catch (err) {
          panel.webview.postMessage({
            command: 'showErrorMessage',
            message: 'Failed to fetch builds.'
          });
        }
      } else if (message.command === 'fetchIssues') {
        try {
          const { fetchIssues } = require('./api');
          const offset = typeof message.offset === 'number' ? message.offset : 0;
          const count = typeof message.count === 'number' ? message.count : 20;
          const issues = await fetchIssues({
            url: message.url,
            email: message.email,
            token: message.token,
            projectPath: message.projectPath
          }, offset, count);
          panel.webview.postMessage({
            command: 'setIssues',
            issues,
            offset,
            count
          });
        } catch (err) {
          panel.webview.postMessage({
            command: 'showErrorMessage',
            message: 'Failed to fetch issues.'
          });
        }
      } else if (message.command === 'getPrChanges') {
        try {
          // Use Local Git logic
          const { getPullRequestChanges } = require('./git');
          const workspaceFolders = vscode.workspace.workspaceFolders;
          if (!workspaceFolders || workspaceFolders.length === 0) {
            throw new Error("No workspace folder open.");
          }
          const rootPath = workspaceFolders[0].uri.fsPath;

          // We need to fetch the PR details to get branch names if not passed?
          // The message only has prId. We need to find the PR object.
          // BUT, we don't have the list here easily unless we fetch it again or pass it.
          // Let's assume we can fetch the single PR details via API first to get branches.
          const { fetchPullRequestChanges: fetchPRChangesAPI, fetchPullRequests } = require('./api');

          // Helper to get PR details - reusing fetchPullRequests for now or need a getPullRequest(id)
          // Since we don't have getPullRequest(id), let's assume we can pass the source/target branches 
          // from the frontend, OR we fetch all and find. 
          // Fetching specific PR by ID is probably better.
          // For now, let's ask the frontend to pass the PR details or fetch changes via API failure fallback?
          // User said API is broken.

          // Actually, let's fetch the PR details using the API. fetchPullRequestChanges (list of files) is broken,
          // but fetching the PR metadata (title, branches) usually is a different endpoint /~api/pulls/:id
          // I didn't verify that endpoint. Let's assume fetching PR list worked, so we can pass the PR object 
          // from frontend to backend in the message!

          const prDetails = message.pr; // We need to update frontend to pass this.

          if (!prDetails) {
            // Fallback: try to fetch it? 
            throw new Error("PR details not provided for Git diff.");
          }

          const changes = await getPullRequestChanges(
            rootPath,
            prDetails.sourceBranch,
            prDetails.targetBranch,
            prDetails.id || prDetails.number, // Pass PR number
            message.url, // Pass remote URL for auth construction
            message.token // Pass token
          );

          panel.webview.postMessage({
            command: 'setPrChanges',
            changes
          });
        } catch (err: any) {
          panel.webview.postMessage({
            command: 'showErrorMessage',
            message: `Failed to fetch PR changes (Git): ${err.message}`
          });
        }
      } else if (message.command === 'openDiff') {
        const { change, projectId } = message;
        // URI format: onedev:/path/to/file?projectId=123&blobId=abc
        // If deleted, we might want to handle it (show empty).
        // If added, oldURI is empty/null.

        let oldUri: vscode.Uri | undefined;
        let newUri: vscode.Uri | undefined;

        if (change.oldBlobId) {
          oldUri = vscode.Uri.parse(`onedev:${change.oldPath || change.path}?projectId=${projectId}&blobId=${change.oldBlobId}`);
        }
        if (change.blobId) {
          newUri = vscode.Uri.parse(`onedev:${change.path}?projectId=${projectId}&blobId=${change.blobId}`);
        }

        if (oldUri && newUri) {
          const title = `${change.oldPath || change.path} (OneDev Diff)`;
          await vscode.commands.executeCommand('vscode.diff', oldUri, newUri, title);
        } else if (newUri) {
          await vscode.window.showTextDocument(newUri);
        }
      } else if (message.command === 'generateCodeReview') {
        try {
          // Use Local Git logic
          const { getPullRequestChanges } = require('./git');
          const workspaceFolders = vscode.workspace.workspaceFolders;
          const rootPath = workspaceFolders ? workspaceFolders[0].uri.fsPath : undefined;

          if (!rootPath) throw new Error("No workspace open.");

          // Message should pass PR object now via handleGenerateReview? 
          // Frontend might need update if it doesn't pass PR.
          // But we can check message.prId and maybe we have to assume message.projectId is prId?
          // Actually, the PRTab generate button logic only sends prId currently.
          // I need to update PRTab.tsx for generating review too OR reuse logic.
          // Wait, I updated getPrChanges message, but generateCodeReview message might not have 'pr'.
          // Let's assume we update frontend to pass 'pr' or we fail.
          // IF we don't have 'pr', we can't get branches.

          // Ideally we shouldn't fail if we can avoid it.
          // But for now, let's update frontend too.

          const prDetails = message.pr;
          if (!prDetails) throw new Error("PR details not provided for Git review.");

          const changes = await getPullRequestChanges(
            rootPath,
            prDetails.sourceBranch,
            prDetails.targetBranch,
            prDetails.id || prDetails.number,
            message.url,
            message.token
          );

          let prompt = "Please review the following code changes:\n\n";
          let tokensUsed = 0;
          const MAX_TOKENS = 8000;

          // For content, we shouldn't use fetchFileContent(api) if we want local git content.
          // We can use git show.
          // Let's use `git show blobId` (which is SHA) or `git show sourceBranch:path`.
          // We'll use cp.exec directly or add helper.

          const cp = require('child_process');
          const getBlobContent = (sha: string) => {
            return new Promise<string>((resolve) => {
              cp.exec(`git show ${sha}`, { cwd: rootPath }, (err: any, stdout: string) => {
                resolve(stdout || "");
              });
            });
          };

          for (const change of changes) {
            if (change.type === 'MODIFY' || change.type === 'ADD') {
              if (change.blobId) {
                // change.blobId from getPullRequestChanges is a SHA
                const content = await getBlobContent(change.blobId);
                const truncatedContent = content.slice(0, 2000);
                prompt += `File: ${change.path}\nContent:\n\`\`\`\n${truncatedContent}\n\`\`\`\n\n`;
                tokensUsed += truncatedContent.length / 4;
                if (tokensUsed > MAX_TOKENS) break;
              }
            }
          }

          const models = await vscode.lm.selectChatModels();
          let model;
          if (models && models.length > 0) {
            model = models[0];
          } else {
            const allModels = await vscode.lm.selectChatModels();
            if (allModels.length > 0) model = allModels[0];
          }

          if (model) {
            const chatResponse = await model.sendRequest([
              vscode.LanguageModelChatMessage.User(prompt)
            ], {}, new vscode.CancellationTokenSource().token);

            let reviewText = "";
            for await (const fragment of chatResponse.text) {
              reviewText += fragment;
            }

            panel.webview.postMessage({
              command: 'setCodeReview',
              review: reviewText
            });
          } else {
            throw new Error("No Language Model found.");
          }

        } catch (err: any) {
          panel.webview.postMessage({
            command: 'showErrorMessage',
            message: `Code review failed: ${err.message}`
          });
        }
      }
    } catch (err) {
      panel.webview.postMessage({
        command: 'showErrorMessage',
        message: 'Unexpected error.'
      });
    }
  });

  return panel;
}

export function deactivate() { }
