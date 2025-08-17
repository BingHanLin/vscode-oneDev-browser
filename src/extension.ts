
import * as vscode from "vscode";
import { PRsWebviewViewProvider } from "./prsWebviewViewProvider";
import { IssuesTreeDataProvider } from "./issuesTreeDataProvider";
import { BuildsTreeDataProvider } from "./buildsTreeDataProvider";
import { registerStatusBarCommand } from "./statusbar";



export function activate(context: vscode.ExtensionContext) {
  // Register PRs webview view
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      PRsWebviewViewProvider.viewType,
      new PRsWebviewViewProvider(context)
    )
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
}

function openReactWebview(context: vscode.ExtensionContext) {
  let panel = vscode.window.createWebviewPanel("webview", "oneDev Browser", vscode.ViewColumn.One, {
    enableScripts: true
  });

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
  const credentialsKey = 'onedev-browser.credentials';
  panel.webview.onDidReceiveMessage(async (message) => {
    console.log('[Extension] Received message:', message);
    try {
      if (message.command === 'getCredentials') {
        const credentials = context.globalState.get(credentialsKey, {
          url: '',
          email: '',
          token: '',
          projectPath: ''
        });
        panel.webview.postMessage({
          command: 'setCredentials',
          ...credentials
        });
      } else if (message.command === 'saveCredentials') {
        context.globalState.update(credentialsKey, {
          url: message.url,
          email: message.email,
          token: message.token,
          projectPath: message.projectPath
        });
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
      } else if (message.command === 'fetchPullRequests') {
        try {
          const { fetchPullRequests } = require('./api');
          const pullRequests = await fetchPullRequests({
            url: message.url,
            email: message.email,
            token: message.token,
            projectPath: message.projectPath
          });
          panel.webview.postMessage({
            command: 'setPullRequests',
            pullRequests
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
          const issues = await fetchIssues({
            url: message.url,
            email: message.email,
            token: message.token,
            projectPath: message.projectPath
          });
          panel.webview.postMessage({
            command: 'setIssues',
            issues
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
}

export function deactivate() { }
