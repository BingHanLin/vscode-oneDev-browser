
import * as vscode from "vscode";
import { PRsTreeDataProvider } from "./prsWebviewViewProvider";
import { IssuesTreeDataProvider } from "./issuesTreeDataProvider";
import { BuildsTreeDataProvider } from "./buildsTreeDataProvider";
import { registerStatusBarCommand } from "./statusbar";



export function activate(context: vscode.ExtensionContext) {
  // Register PRs tree view
  const prsProvider = new PRsTreeDataProvider();
  vscode.window.createTreeView("onedevPRsView", { treeDataProvider: prsProvider });
  // Register command for tree view navigation to PR in webview
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.openWebviewToPR', (prNumber: number, pr: any) => {
      const panel = openReactWebview(context);
      // Send message to webview to navigate to specific PR
      if (oneDevPanel) {
        oneDevPanel.webview.postMessage({
          command: 'navigateToPR',
          prNumber,
          pr
        });
      }
    })
  );

  // Issues/Builds TreeView
  const issuesProvider = new IssuesTreeDataProvider();
  const buildsProvider = new BuildsTreeDataProvider();
  vscode.window.createTreeView("onedevIssuesView", { treeDataProvider: issuesProvider });
  vscode.window.createTreeView("onedevBuildsView", { treeDataProvider: buildsProvider });

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
    vscode.commands.registerCommand('onedev-browser.openWebviewToIssue', (issueNumber: number, issue: any) => {
      const panel = openReactWebview(context);
      // Send message to webview to navigate to specific issue
      if (oneDevPanel) {
        oneDevPanel.webview.postMessage({
          command: 'navigateToIssue',
          issueNumber,
          issue
        });
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.openWebviewToBuild', (buildNumber: number, build: any) => {
      const panel = openReactWebview(context);
      // Send message to webview to navigate to specific build
      if (oneDevPanel) {
        oneDevPanel.webview.postMessage({
          command: 'navigateToBuild',
          buildNumber,
          build
        });
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
