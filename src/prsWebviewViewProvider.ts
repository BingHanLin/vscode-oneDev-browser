import * as vscode from "vscode";
import { fetchPullRequests } from "./api";

export class PRsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
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
        const creds = {
            url: getConfigValue("url"),
            email: getConfigValue("email"),
            token: getConfigValue("token"),
            projectPath: getConfigValue("projectPath")
        };
        if (!creds.url || !creds.token || !creds.projectPath) {
            return [new vscode.TreeItem("Please set oneDev config in settings.")];
        }
        const prs = await fetchPullRequests(creds);
        return prs.map((pr: any) => {
            const item = new vscode.TreeItem(`#${pr.number} ${pr.title}`);
            item.description = `${pr.state || ''} | ${pr.submitterId || ''}`;
            if (pr.submitDate) {
                const date = new Date(pr.submitDate);
                item.tooltip = `State: ${pr.state}\nAuthor: ${pr.submitterId}\nCreated: ${date.toLocaleString()}`;
            }
            // Add click command to open webview and navigate to this PR
            item.command = {
                command: 'onedev-browser.openWebviewToPR',
                title: 'Open PR in Webview',
                arguments: [pr.number, pr]
            };
            return item;
        });
    }

    refresh(): void { this._onDidChangeTreeData.fire(); }
}
