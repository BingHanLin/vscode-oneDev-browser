
import * as vscode from "vscode";
import { fetchIssues, fetchPullRequests, fetchBuilds } from "./api";
import { Credentials } from "./types";



class OneDevTreeItem extends vscode.TreeItem {
    contextValue?: string;
    children?: OneDevTreeItem[];
    constructor(label: string, collapsibleState?: vscode.TreeItemCollapsibleState, contextValue?: string, children?: OneDevTreeItem[]) {
        super(label, collapsibleState);
        this.contextValue = contextValue;
        this.children = children;
    }
}

class OneDevTreeDataProvider implements vscode.TreeDataProvider<OneDevTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<OneDevTreeItem | undefined | void> = new vscode.EventEmitter<OneDevTreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<OneDevTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    getTreeItem(element: OneDevTreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: OneDevTreeItem): Promise<OneDevTreeItem[]> {
        if (!element) {
            return [
                new OneDevTreeItem("Pull Requests", vscode.TreeItemCollapsibleState.Collapsed, "pullRequests"),
                new OneDevTreeItem("Issues", vscode.TreeItemCollapsibleState.Collapsed, "issues"),
                new OneDevTreeItem("Builds", vscode.TreeItemCollapsibleState.Collapsed, "builds")
            ];
        }

        // Get credentials from config
        const config = vscode.workspace.getConfiguration("onedev-browser");
        const creds: Credentials = {
            url: config.get("url", ""),
            email: config.get("email", ""),
            token: config.get("token", ""),
            projectPath: config.get("projectPath", "")
        };
        if (!creds.url || !creds.token || !creds.projectPath) {
            return [new OneDevTreeItem("Please set oneDev config in settings.")];
        }

        if (element.contextValue === "pullRequests") {
            const prs = await fetchPullRequests(creds);
            return prs.map((pr: any) => new OneDevTreeItem(`#${pr.number} ${pr.title}`));
        }
        if (element.contextValue === "issues") {
            const issues = await fetchIssues(creds);
            return issues.map((issue: any) => new OneDevTreeItem(`#${issue.number} ${issue.title}`));
        }
        if (element.contextValue === "builds") {
            const builds = await fetchBuilds(creds);
            return builds.map((build: any) => new OneDevTreeItem(`#${build.number} ${build.status || ""}`));
        }
        return [];
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}

export function activate(context: vscode.ExtensionContext) {
    // Register sidebar TreeView
    const treeDataProvider = new OneDevTreeDataProvider();
    vscode.window.createTreeView("onedevTreeView", { treeDataProvider });
    // Add refresh command if needed in the future
}

export function deactivate() { }
