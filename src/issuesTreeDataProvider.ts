import * as vscode from "vscode";
import { fetchIssues } from "./api";
import { Credentials } from "./types";

export class IssuesTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
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
        const issues = await fetchIssues(creds);
        return issues.map((issue: any) => {
            const item = new vscode.TreeItem(`#${issue.number} ${issue.title}`);
            item.description = `${issue.state || ''} | ${issue.submitterId || ''}`;
            if (issue.submitDate) {
                const date = new Date(issue.submitDate);
                item.tooltip = `State: ${issue.state}\nAuthor: ${issue.submitterId}\nCreated: ${date.toLocaleString()}`;
            }
            return item;
        });
    }
    refresh(): void { this._onDidChangeTreeData.fire(); }
}
