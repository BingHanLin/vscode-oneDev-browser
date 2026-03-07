import * as vscode from "vscode";
import { fetchPullRequests } from "./api";
import { getCredentials, getConfigNumber } from "./utils/config";
import { PRTreeItem } from "./treeItems";

export class PRsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem { return element; }

    async getChildren(): Promise<vscode.TreeItem[]> {
        const creds = await getCredentials();
        if (!creds.url || !creds.token || !creds.projectPath) {
            return [];
        }
        try {
            const config = vscode.workspace.getConfiguration("onedev-browser");
            const maxItems = getConfigNumber(config, "maxPRItems");
            const prs = await fetchPullRequests(creds);
            return prs.slice(0, maxItems).map((pr: any) => new PRTreeItem(pr, creds.url, creds.projectPath));
        } catch (e: any) {
            const item = new vscode.TreeItem(`Error: ${e.message || 'Failed to load pull requests'}`);
            item.iconPath = new vscode.ThemeIcon('error');
            return [item];
        }
    }
    refresh(): void { this._onDidChangeTreeData.fire(); }
}