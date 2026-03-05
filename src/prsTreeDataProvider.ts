import * as vscode from "vscode";
import { fetchPullRequests } from "./api";
import { getCredentials, getConfigNumber } from "./utils/config";

export class PRsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem { return element; }

    async getChildren(): Promise<vscode.TreeItem[]> {
        const creds = await getCredentials();
        if (!creds.url || !creds.token || !creds.projectPath) {
            return [new vscode.TreeItem("Please set oneDev config in settings.")];
        }
        const config = vscode.workspace.getConfiguration("onedev-browser");
        const maxItems = getConfigNumber(config, "maxPRItems");
        const prs = await fetchPullRequests(creds);
        return prs.slice(0, maxItems).map((pr: any) => {
            const item = new vscode.TreeItem(`#${pr.number} ${pr.title}`);
            item.description = `${pr.status || ''} | ${pr.submitterId || ''}`;
            if (pr.submitDate) {
                const date = new Date(pr.submitDate);
                item.tooltip = `Status: ${pr.status}\nAuthor: ${pr.submitterId}\nCreated: ${date.toLocaleString()}`;
            }
            item.command = {
                command: 'onedev-browser.openWebviewToPR',
                title: 'Open PR in Webview',
                arguments: [pr.number, pr, creds.url, creds.projectPath]
            };
            return item;
        });
    }
    refresh(): void { this._onDidChangeTreeData.fire(); }
}