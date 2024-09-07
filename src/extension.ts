import * as vscode from "vscode";
import fetch from "node-fetch";

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
                                projectPath: config.get("projectPath", ""),
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
                            await config.update(
                                "projectPath",
                                message.projectPath,
                                vscode.ConfigurationTarget.Global
                            );

                            // Make API call to get project ID
                            try {
                                const apiUrl = `${message.url}/~api/projects`;
                                const queryParams = new URLSearchParams({
                                    query: `"Path" is "${message.projectPath}"`,
                                    offset: "0",
                                    count: "100",
                                });
                                const response = await fetch(
                                    `${apiUrl}?${queryParams}`,
                                    {
                                        method: "GET",
                                        headers: {
                                            Authorization:
                                                "Basic " +
                                                Buffer.from(
                                                    `${message.email}:${message.token}`
                                                ).toString("base64"),
                                        },
                                    }
                                );

                                if (!response.ok) {
                                    throw new Error(
                                        `HTTP error! status: ${response.status}`
                                    );
                                }

                                const projects = await response.json();
                                if (projects && projects.length > 0) {
                                    const projectId = projects[0].id;
                                    panel.webview.postMessage({
                                        command: "setProjectId",
                                        projectId: projectId,
                                    });
                                    panel.webview.postMessage({
                                        command: "showSuccessMessage",
                                        message:
                                            "oneDev credentials saved successfully!",
                                    });
                                } else {
                                    throw new Error(
                                        "No projects found with the given name."
                                    );
                                }
                            } catch (error) {
                                panel.webview.postMessage({
                                    command: "showErrorMessage",
                                    message: `Error fetching project ID: ${error.message}`,
                                });
                            }
                            break;
                        case "fetchPullRequests":
                            try {
                                const apiUrl = `${message.url}/~api/pulls`;
                                const queryParams = new URLSearchParams({
                                    query: "open and to be reviewed by me",
                                    // query: `"Source Project" is "${message.projectPath}" and open and to be reviewed by me`,
                                    offset: "0",
                                    count: "100",
                                });
                                const response = await fetch(
                                    `${apiUrl}?${queryParams}`,
                                    {
                                        method: "GET",
                                        headers: {
                                            Authorization:
                                                "Basic " +
                                                Buffer.from(
                                                    `${message.email}:${message.token}`
                                                ).toString("base64"),
                                        },
                                    }
                                );

                                if (!response.ok) {
                                    throw new Error(
                                        `HTTP error! status: ${response.status}`
                                    );
                                }

                                const pullRequests = await response.json();
                                panel.webview.postMessage({
                                    command: "setPullRequests",
                                    pullRequests: pullRequests.map(
                                        (pr: any) => ({
                                            number: pr.number,
                                            title: pr.title,
                                            targetBranch: pr.targetBranch,
                                            sourceBranch: pr.sourceBranch,
                                        })
                                    ),
                                });
                            } catch (error) {
                                panel.webview.postMessage({
                                    command: "showErrorMessage",
                                    message: `Error fetching pull requests: ${error.message}`,
                                });
                            }
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
