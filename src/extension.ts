
import * as vscode from "vscode";
import { PRsTreeDataProvider } from "./prsWebviewViewProvider";
import { IssuesTreeDataProvider } from "./issuesTreeDataProvider";
import { BuildsTreeDataProvider } from "./buildsTreeDataProvider";
import { registerStatusBarCommand } from "./statusbar";



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
        function getPrefValue(key: string): string {
          const inspect = config.inspect<string>(key);
          return (inspect?.globalValue ?? '') || (inspect?.workspaceValue ?? '') || '';
        }
        const url = getPrefValue('url');
        const email = getPrefValue('email');
        const token = getPrefValue('token');
        const projectPath = getPrefValue('projectPath');
        panel.webview.postMessage({
          command: 'setCredentials',
          url,
          email,
          token,
          projectPath
        });
      } else if (message.command === 'saveCredentials') {
        // scope: 'user' or 'workspace'
        const config = vscode.workspace.getConfiguration('onedev-browser');
        const target = message.scope === 'user' ? vscode.ConfigurationTarget.Global : vscode.ConfigurationTarget.Workspace;
        await config.update('url', message.url, target);
        await config.update('email', message.email, target);
        await config.update('token', message.token, target);
        await config.update('projectPath', message.projectPath, target);
        panel.webview.postMessage({
          command: 'showSuccessMessage',
          message: 'Credentials saved successfully.'
        });
        // Optional: fetch projectId
        try {
          const { fetchProjectId } = require('./api');
          const projectId = await fetchProjectId({
            url: message.url,
            email: message.email,
            token: message.token,
            projectPath: message.projectPath
          });
          panel.webview.postMessage({
            command: 'setProjectId',
            projectId
          });
        } catch (err) {
          panel.webview.postMessage({
            command: 'showErrorMessage',
            message: 'Failed to fetch project ID.'
          });
        }
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
