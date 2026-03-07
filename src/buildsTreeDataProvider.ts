import * as vscode from "vscode";
import { fetchBuilds } from "./api";
import { getCredentials, getConfigNumber } from "./utils/config";
import { BuildTreeItem } from "./treeItems";

export class BuildsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
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
            const maxItems = getConfigNumber(config, "maxBuildItems");
            const builds = await fetchBuilds(creds);
            return builds.slice(0, maxItems).map((build: any) => new BuildTreeItem(build, creds.url, creds.projectPath));
        } catch (e: any) {
            const item = new vscode.TreeItem(`Error: ${e.message || 'Failed to load builds'}`);
            item.iconPath = new vscode.ThemeIcon('error');
            return [item];
        }
    }

    refresh(): void { this._onDidChangeTreeData.fire(); }
}