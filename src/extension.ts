import { PRsWebviewViewProvider } from "./prsWebviewViewProvider";

import * as vscode from "vscode";

import { IssuesTreeDataProvider } from "./issuesTreeDataProvider"; // Keep import
import { BuildsTreeDataProvider } from "./buildsTreeDataProvider"; // Keep import



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
}

export function deactivate() { }
