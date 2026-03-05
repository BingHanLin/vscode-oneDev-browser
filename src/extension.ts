
import * as vscode from "vscode";
import { PRsTreeDataProvider } from "./prsTreeDataProvider";
import { IssuesTreeDataProvider } from "./issuesTreeDataProvider";
import { BuildsTreeDataProvider } from "./buildsTreeDataProvider";
import { registerStatusBarCommand } from "./statusbar";
import { getConfigValue, getConfigNumber, getCredentials, initSecretStorage, setToken } from "./utils/config";
import { isValidSha, assertValidGitRef } from "./utils/validation";

import { registerChatParticipant } from './chatParticipant';

async function updateSetupContext(): Promise<void> {
  const creds = await getCredentials();
  const needsSetup = !creds.url || !creds.token || !creds.projectPath;
  vscode.commands.executeCommand('setContext', 'onedev-browser.needsSetup', needsSetup);
}

export function activate(context: vscode.ExtensionContext) {

  // Initialize SecretStorage for secure token storage
  initSecretStorage(context.secrets);

  // Register "Set API Token" command
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.setToken', async () => {
      const token = await vscode.window.showInputBox({
        prompt: 'Enter your OneDev API token',
        password: true,
        placeHolder: 'Paste your API token here'
      });
      if (token !== undefined) {
        await setToken(token);
        vscode.window.showInformationMessage('OneDev API token saved securely.');
        updateSetupContext();
      }
    })
  );

  // Register Chat Participant
  registerChatParticipant(context);

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
    vscode.commands.registerCommand('onedev-browser.selectCodeReviewModel', async () => {
      try {
        const models = await vscode.lm.selectChatModels();
        if (!models || models.length === 0) {
          vscode.window.showInformationMessage("No Language Models found available.");
          return;
        }

        const items = models.map(m => ({
          label: `${m.name} (${m.family})`,
          description: `ID: ${m.id}`,
          modelId: m.id // Keep track
        }));

        // Add option to clear
        items.unshift({
          label: "Default",
          description: "Clear setting to use default behavior",
          modelId: ""
        });

        const selection = await vscode.window.showQuickPick(items, {
          placeHolder: "Select a Language Model for Code Reviews"
        });

        if (selection) {
          let target = vscode.ConfigurationTarget.Global;

          // Ask for scope if a workspace is open
          if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            const scopeItems = [
              { label: 'User Settings', target: vscode.ConfigurationTarget.Global, description: "Apply to all workspaces" },
              { label: 'Workspace Settings', target: vscode.ConfigurationTarget.Workspace, description: "Apply to this workspace only" }
            ];
            const scopeSelection = await vscode.window.showQuickPick(scopeItems, {
              placeHolder: 'Select target setting scope'
            });
            if (!scopeSelection) return; // User cancelled
            target = scopeSelection.target;
          }

          const config = vscode.workspace.getConfiguration("onedev-browser");
          await config.update("codeReviewModel", selection.modelId, target);

          const scopeLabel = target === vscode.ConfigurationTarget.Workspace ? "Workspace" : "User";
          if (selection.modelId) {
            vscode.window.showInformationMessage(`[${scopeLabel}] Code Review Model set to: ${selection.label}`);
          } else {
            vscode.window.showInformationMessage(`[${scopeLabel}] Code Review Model set to Auto-detect.`);
          }
        }
      } catch (e: any) {
        vscode.window.showErrorMessage(`Failed to select model: ${e.message}`);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.openDiffFromChat', async (path: string, oldBlobId: string | undefined, newBlobId: string | undefined, projectId: string) => {
      try {
        let oldUri: vscode.Uri | undefined;
        let newUri: vscode.Uri | undefined;
        let title = `${path} (OneDev Diff)`;

        if (oldBlobId) {
          oldUri = vscode.Uri.parse(`onedev:${path}?projectId=${projectId}&blobId=${oldBlobId}`);
        } else {
          // Added file
          oldUri = vscode.Uri.parse(`onedev:${path}?projectId=${projectId}&blobId=EMPTY`);
          title = `${path} (Created)`;
        }

        if (newBlobId) {
          newUri = vscode.Uri.parse(`onedev:${path}?projectId=${projectId}&blobId=${newBlobId}`);
        } else {
          // Deleted file
          newUri = vscode.Uri.parse(`onedev:${path}?projectId=${projectId}&blobId=EMPTY`);
          title = `${path} (Deleted)`;
        }

        await vscode.commands.executeCommand('vscode.diff', oldUri, newUri, title);

      } catch (e: any) {
        vscode.window.showErrorMessage(`Failed to open diff: ${e.message}`);
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

  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.triggerChatReview', async (prNumber: number) => {
      if (prNumber) {
        await vscode.commands.executeCommand('workbench.action.chat.open', { query: `@onedev /review #${prNumber}` });
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.checkoutBranch', async (prNumber?: number, sourceBranch?: string) => {
      if (!sourceBranch) {
        vscode.window.showErrorMessage('Source branch is required to checkout.');
        return;
      }

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('No workspace open to checkout commit.');
        return;
      }
      const rootPath = workspaceFolders[0].uri.fsPath;


      try {
        await vscode.window.withProgress({
          location: vscode.ProgressLocation.Notification,
          title: `Checking out...`,
          cancellable: false
        }, async (progress) => {
          const { checkoutBranch } = require('./git');
          await checkoutBranch(rootPath, prNumber, sourceBranch, (message: string) => {
            progress.report({ message });
          });
        });
        vscode.window.showInformationMessage(`Successfully checked out ${sourceBranch}.`);
      } catch (e: any) {
        vscode.window.showErrorMessage(`Failed to checkout: ${e.message || e}`);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.openLocalFile', async (filePath: string) => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('No workspace open to find local file.');
        return;
      }
      const rootPath = workspaceFolders[0].uri.fsPath;
      const uri = vscode.Uri.file(require('path').join(rootPath, filePath));

      try {
        await vscode.workspace.fs.stat(uri);
        await vscode.window.showTextDocument(uri);
      } catch (e) {
        vscode.window.showWarningMessage(`File not found locally: ${filePath}`);
      }
    })
  );

  // Register setup wizard command
  context.subscriptions.push(
    vscode.commands.registerCommand('onedev-browser.setupWizard', async () => {
      const urlInput = await vscode.window.showInputBox({
        prompt: 'OneDev Server URL',
        placeHolder: 'https://onedev.example.com',
        ignoreFocusOut: true,
        validateInput: (value) => {
          if (!value) { return 'URL is required'; }
          try { new URL(value); } catch { return 'Enter a valid URL'; }
          if (value.endsWith('/')) { return 'URL should not end with a trailing slash'; }
          return undefined;
        }
      });
      if (urlInput === undefined) { return; }

      const emailInput = await vscode.window.showInputBox({
        prompt: 'OneDev Account Email',
        placeHolder: 'you@example.com',
        ignoreFocusOut: true,
        validateInput: (value) => value ? undefined : 'Email is required'
      });
      if (emailInput === undefined) { return; }

      const projectPathInput = await vscode.window.showInputBox({
        prompt: 'OneDev Project Path',
        placeHolder: 'my-project',
        ignoreFocusOut: true,
        validateInput: (value) => value ? undefined : 'Project path is required'
      });
      if (projectPathInput === undefined) { return; }

      const tokenInput = await vscode.window.showInputBox({
        prompt: 'OneDev API Token',
        password: true,
        ignoreFocusOut: true,
        validateInput: (value) => value ? undefined : 'API token is required'
      });
      if (tokenInput === undefined) { return; }

      // Validate credentials with a test API call
      const testCreds = { url: urlInput, email: emailInput, token: tokenInput, projectPath: projectPathInput };
      try {
        const { fetchProjectId } = require('./api');
        await vscode.window.withProgress(
          { location: vscode.ProgressLocation.Notification, title: 'Verifying OneDev connection...' },
          () => fetchProjectId(testCreds)
        );
      } catch (e: any) {
        const retry = await vscode.window.showErrorMessage(
          `Connection failed: ${e.message || 'Unknown error'}. Save settings anyway?`,
          'Save Anyway', 'Cancel'
        );
        if (retry !== 'Save Anyway') { return; }
      }

      // Write all settings at once
      const target = vscode.workspace.workspaceFolders?.length
        ? vscode.ConfigurationTarget.Workspace
        : vscode.ConfigurationTarget.Global;
      const config = vscode.workspace.getConfiguration('onedev-browser');
      await config.update('url', urlInput, target);
      await config.update('email', emailInput, target);
      await config.update('projectPath', projectPathInput, target);
      await setToken(tokenInput);

      vscode.commands.executeCommand('onedev-browser.refreshAllViews');
      updateSetupContext();
      vscode.window.showInformationMessage('OneDev connection configured successfully.');
    })
  );

  // Update setup context when config changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('onedev-browser')) {
        updateSetupContext();
      }
    })
  );

  // Set initial setup context and prompt if unconfigured
  updateSetupContext();
  (async () => {
    const creds = await getCredentials();
    if (!creds.url) {
      const action = await vscode.window.showInformationMessage(
        'OneDev Browser: No connection configured.',
        'Set Up Now'
      );
      if (action === 'Set Up Now') {
        vscode.commands.executeCommand('onedev-browser.setupWizard');
      }
    }
  })();

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

    if (blobId === 'EMPTY') {
      return "";
    }

    if (!projectId || !blobId) {
      return "Error: Missing projectId or blobId";
    }

    // Try Local Git first if blobId looks like a SHA (40 hex chars)
    // or just always try git if we have a workspace
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      const rootPath = workspaceFolders[0].uri.fsPath;
      const cp = require('child_process');
      if (!isValidSha(blobId)) {
        return `Error: Invalid blob ID`;
      }
      try {
        return await new Promise<string>((resolve, reject) => {
          cp.execFile('git', ['show', blobId], { cwd: rootPath }, (err: any, stdout: string, _stderr: string) => {
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

    const creds = await getCredentials();

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
    enableScripts: true,
    retainContextWhenHidden: true,
    localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "web", "dist")]
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
    try {
      if (message.command === 'getCredentials') {
        const creds = await getCredentials();
        panel.webview.postMessage({
          command: 'setCredentials',
          url: creds.url,
          email: creds.email,
          token: creds.token,
          projectPath: creds.projectPath
        });
      } else if (message.command === 'checkoutBranch') {
        try {
          const branch = message.branch;
          try {
            assertValidGitRef(branch, "branch");
          } catch (e: any) {
            panel.webview.postMessage({
              command: 'checkoutBranchError',
              message: e.message
            });
            return;
          }
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


          const prDetails = message.pr; // We need to update frontend to pass this.

          if (!prDetails) {
            // Fallback: try to fetch it? 
            throw new Error("PR details not provided for Git diff.");
          }

          const changes = await getPullRequestChanges(
            rootPath,
            prDetails.number,
            prDetails.baseCommitHash
          );

          panel.webview.postMessage({
            command: 'setPrChanges',
            changes
          });
        } catch (err: any) {
          panel.webview.postMessage({
            command: 'setPrChanges',
            changes: [],
            error: 'Unable to load PR changes. Changes are computed using local git — please open the OneDev project repository as your workspace folder.'
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
      } else if (message.command === 'openChatReview') {
        const prNumber = message.prNumber;
        if (prNumber) {
          vscode.commands.executeCommand('workbench.action.chat.open', { query: `@onedev /review #${prNumber}` });
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
