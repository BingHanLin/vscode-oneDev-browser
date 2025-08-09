
import * as vscode from "vscode";

import { PRsTreeDataProvider } from "./prsTreeDataProvider"; // Keep import
import { IssuesTreeDataProvider } from "./issuesTreeDataProvider"; // Keep import
import { BuildsTreeDataProvider } from "./buildsTreeDataProvider"; // Keep import


export function activate(context: vscode.ExtensionContext) {
    // Register three separate TreeViews for PRs, Issues, Builds
    const prsProvider = new PRsTreeDataProvider();
    const issuesProvider = new IssuesTreeDataProvider();
    const buildsProvider = new BuildsTreeDataProvider();
    vscode.window.createTreeView("onedevPRsView", { treeDataProvider: prsProvider });
    vscode.window.createTreeView("onedevIssuesView", { treeDataProvider: issuesProvider });
    vscode.window.createTreeView("onedevBuildsView", { treeDataProvider: buildsProvider });
}

export function deactivate() { }
