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

            const config = vscode.workspace.getConfiguration("onedev-browser");

            panel.webview.onDidReceiveMessage(
                async (message) => {
                    switch (message.command) {
                        case "getCredentials":
                            panel.webview.postMessage({
                                command: "setCredentials",
                                url: config.get("url", ""),
                                email: config.get("email", ""),
                                token: config.get("token", ""),
                            });
                            break;
                        case "saveCredentials":
                            await config.update(
                                "url",
                                message.url,
                                vscode.ConfigurationTarget.Global
                            );
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
                            vscode.window.showInformationMessage(
                                "oneDev credentials saved successfully!"
                            );
                            panel.dispose();
                            break;
                    }
                },
                undefined,
                context.subscriptions
            );
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
