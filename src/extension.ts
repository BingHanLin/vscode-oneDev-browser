import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "onedev-browser.setCredentials",
        () => {
            const panel = vscode.window.createWebviewPanel(
                "onedevCredentials",
                "oneDev Credentials",
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                }
            );

            const scriptSrc = panel.webview.asWebviewUri(
                vscode.Uri.joinPath(
                    context.extensionUri,
                    "web",
                    "dist",
                    "index.js"
                )
            );

            const cssSrc = panel.webview.asWebviewUri(
                vscode.Uri.joinPath(
                    context.extensionUri,
                    "web",
                    "dist",
                    "index.css"
                )
            );

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

            // const config = vscode.workspace.getConfiguration("onedev-browser");
            // const url = config.get("url", "");
            // const email = config.get("email", "");
            // const token = config.get("token", "");

            // panel.webview.html = getWebviewContent(url, email, token);

            // panel.webview.onDidReceiveMessage(
            //     async (message) => {
            //         switch (message.command) {
            //             case "saveCredentials":
            //                 await config.update(
            //                     "url",
            //                     message.url,
            //                     vscode.ConfigurationTarget.Global
            //                 );
            //                 await config.update(
            //                     "email",
            //                     message.email,
            //                     vscode.ConfigurationTarget.Global
            //                 );
            //                 await config.update(
            //                     "token",
            //                     message.token,
            //                     vscode.ConfigurationTarget.Global
            //                 );
            //                 vscode.window.showInformationMessage(
            //                     "oneDev credentials saved successfully!"
            //                 );
            //                 panel.dispose();
            //                 return;
            //         }
            //     },
            //     undefined,
            //     context.subscriptions
            // );
        }
    );

    context.subscriptions.push(disposable);
}

function getWebviewContent(url: string, email: string, token: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>oneDev Credentials</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            input { width: 100%; padding: 5px; margin-bottom: 10px; }
            button { padding: 10px; }
        </style>
    </head>
    <body>
        <h1>oneDev Credentials</h1>
        <form id="credentialsForm">
            <label for="url">oneDev URL:</label>
            <input type="text" id="url" value="${url}" required>
            
            <label for="email">Email:</label>
            <input type="email" id="email" value="${email}" required>
            
            <label for="token">API Token:</label>
            <input type="password" id="token" value="${token}" required>
            
            <button type="submit">Save Credentials</button>
        </form>
        <script>
            const vscode = acquireVsCodeApi();
            document.getElementById('credentialsForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const url = document.getElementById('url').value;
                const email = document.getElementById('email').value;
                const token = document.getElementById('token').value;
                vscode.postMessage({
                    command: 'saveCredentials',
                    url,
                    email,
                    token
                });
            });
        </script>
    </body>
    </html>`;
}

export function deactivate() {}
