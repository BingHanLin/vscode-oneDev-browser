import * as vscode from "vscode";
import { fetchPullRequests, fetchIssues, fetchProjectId } from "./api";
import { Credentials } from "./types";

export function createWebviewPanel(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        "onedevCredentials",
        "oneDev Credentials",
        vscode.ViewColumn.One,
        {
            enableScripts: true,
        }
    );

    const scriptSrc = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.js")
    );

    const cssSrc = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.css")
    );

    panel.webview.html = getWebviewContent(scriptSrc, cssSrc);

    const config = vscode.workspace.getConfiguration("onedev-browser");

    panel.webview.onDidReceiveMessage(
        async (message) => {
            switch (message.command) {
                case "getCredentials":
                    sendCredentials(panel, config);
                    break;
                case "saveCredentials":
                    await saveCredentials(panel, config, message);
                    break;
                case "fetchPullRequests":
                    await fetchPullRequests(message, panel);
                    break;
                case "fetchIssues":
                    await fetchIssues(message, panel);
                    break;
            }
        },
        undefined,
        context.subscriptions
    );
}

function getWebviewContent(scriptSrc: vscode.Uri, cssSrc: vscode.Uri): string {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="${cssSrc}" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script src="${scriptSrc}"></script>
      </body>
    </html>`;
}

function sendCredentials(
    panel: vscode.WebviewPanel,
    config: vscode.WorkspaceConfiguration
) {
    panel.webview.postMessage({
        command: "setCredentials",
        url: config.get("url", ""),
        email: config.get("email", ""),
        token: config.get("token", ""),
        projectPath: config.get("projectPath", ""),
    });
}

async function saveCredentials(
    panel: vscode.WebviewPanel,
    config: vscode.WorkspaceConfiguration,
    message: Credentials
) {
    await config.update("url", message.url, vscode.ConfigurationTarget.Global);
    await config.update(
        "email",
        message.email,
        vscode.ConfigurationTarget.Global
    );
    await config.update(
        "token",
        message.token,
        vscode.ConfigurationTarget.Global
    );
    await config.update(
        "projectPath",
        message.projectPath,
        vscode.ConfigurationTarget.Global
    );

    try {
        const projectId = await fetchProjectId(message);
        panel.webview.postMessage({
            command: "setProjectId",
            projectId: projectId,
        });
        panel.webview.postMessage({
            command: "showSuccessMessage",
            message: "oneDev credentials saved successfully!",
        });
    } catch (error) {
        panel.webview.postMessage({
            command: "showErrorMessage",
            message: `Error fetching project ID: ${error.message}`,
        });
    }
}
