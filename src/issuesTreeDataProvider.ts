import * as vscode from "vscode";
import { fetchIssues } from "./api";
import { getConfigValue, getConfigNumber } from "./utils/config";
import { Credentials } from "./types";

export class IssuesTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem { return element; }
    async getChildren(): Promise<vscode.TreeItem[]> {
        const config = vscode.workspace.getConfiguration("onedev-browser");
        const creds: Credentials = {
            url: getConfigValue(config, "url"),
            email: getConfigValue(config, "email"),
            token: getConfigValue(config, "token"),
            projectPath: getConfigValue(config, "projectPath")
        };
        if (!creds.url || !creds.token || !creds.projectPath) {
            return [new vscode.TreeItem("Please set oneDev config in settings.")];
        }
        const maxItems = getConfigNumber(config, "maxIssueItems");
        const issues = await fetchIssues(creds);
        return issues.slice(0, maxItems).map((issue: any) => {
            const item = new vscode.TreeItem(`#${issue.number} ${issue.title}`);
            item.description = `${issue.state || ''} | ${issue.submitterId || ''}`;
            if (issue.submitDate) {
                const date = new Date(issue.submitDate);
                item.tooltip = `State: ${issue.state}\nAuthor: ${issue.submitterId}\nCreated: ${date.toLocaleString()}`;
            }
            item.command = {
                command: 'onedev-browser.openWebviewToIssue',
                title: 'Open Issue in Webview',
                arguments: [issue.number, issue, creds.url, creds.projectPath]
            };
            return item;
        });
    }
    refresh(): void { this._onDidChangeTreeData.fire(); }
}