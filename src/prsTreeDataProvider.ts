import * as vscode from "vscode";
import { fetchPullRequests } from "./api";
import { Credentials } from "./types";

export class PRsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem { return element; }
    async getChildren(): Promise<vscode.TreeItem[]> {
        const config = vscode.workspace.getConfiguration("onedev-browser");
        const creds: Credentials = {
            url: config.get("url", ""),
            email: config.get("email", ""),
            token: config.get("token", ""),
            projectPath: config.get("projectPath", "")
        };
        if (!creds.url || !creds.token || !creds.projectPath) {
            return [new vscode.TreeItem("Please set oneDev config in settings.")];
        }
        const prs = await fetchPullRequests(creds);
        return prs.map((pr: any) => new vscode.TreeItem(`#${pr.number} ${pr.title}`));
    }
    refresh(): void { this._onDidChangeTreeData.fire(); }
}
