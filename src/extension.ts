import * as vscode from "vscode";


import { PRsWebviewViewProvider } from "./prsWebviewViewProvider";
import { IssuesTreeDataProvider } from "./issuesTreeDataProvider";
import { BuildsTreeDataProvider } from "./buildsTreeDataProvider";



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


    {

        let webview = vscode.commands.registerCommand('onedev-browser.testit', () => {

            let panel = vscode.window.createWebviewPanel("webview", "React Test", vscode.ViewColumn.One, {
                enableScripts: true
            })

            let scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.js"))
            let cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.css"))

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
        `
        });

        context.subscriptions.push(webview);
    }
}

export function deactivate() { }
