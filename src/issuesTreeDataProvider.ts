import * as vscode from "vscode";
import { fetchIssues } from "./api";
import { Credentials } from "./types";

export class IssuesTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem { return element; }
    async getChildren(): Promise<vscode.TreeItem[]> {
        // Prefer user scope config, fallback to workspace
        const config = vscode.workspace.getConfiguration("onedev-browser");
        const getConfigValue = (key: string) => {
            const inspected = config.inspect<string>(key);
            if (inspected?.globalValue !== undefined && inspected.globalValue !== "") {
                return inspected.globalValue;
            }
            if (inspected?.workspaceValue !== undefined && inspected.workspaceValue !== "") {
                return inspected.workspaceValue;
            }
            if (inspected?.workspaceFolderValue !== undefined && inspected.workspaceFolderValue !== "") {
                return inspected.workspaceFolderValue;
            }
            return "";
        };
        const creds: Credentials = {
            url: getConfigValue("url"),
            email: getConfigValue("email"),
            token: getConfigValue("token"),
            projectPath: getConfigValue("projectPath")
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
            // Add click command to open webview and navigate to this issue
            item.command = {
                command: 'onedev-browser.openWebviewToIssue',
                title: 'Open Issue in Webview',
                arguments: [issue.number, issue]
            };
            return item;
        });
    }
    refresh(): void { this._onDidChangeTreeData.fire(); }
}
