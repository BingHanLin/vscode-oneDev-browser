import * as vscode from "vscode";


class OneDevTreeItem extends vscode.TreeItem {
    constructor(label: string, collapsibleState?: vscode.TreeItemCollapsibleState) {
        super(label, collapsibleState);
    }
}

class OneDevTreeDataProvider implements vscode.TreeDataProvider<OneDevTreeItem> {
    getTreeItem(element: OneDevTreeItem): vscode.TreeItem {
        return element;
    }
    getChildren(element?: OneDevTreeItem): Thenable<OneDevTreeItem[]> {
        if (!element) {
            return Promise.resolve([
                new OneDevTreeItem("Pull Requests", vscode.TreeItemCollapsibleState.None),
                new OneDevTreeItem("Issues", vscode.TreeItemCollapsibleState.None),
                new OneDevTreeItem("Builds", vscode.TreeItemCollapsibleState.None)
            ]);
        }
        return Promise.resolve([]);
    }
}

export function activate(context: vscode.ExtensionContext) {
    // Register sidebar TreeView
    const treeDataProvider = new OneDevTreeDataProvider();
    vscode.window.createTreeView("onedevTreeView", { treeDataProvider });
}

export function deactivate() { }
