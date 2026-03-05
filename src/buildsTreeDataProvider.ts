import * as vscode from "vscode";
import { fetchBuilds } from "./api";
import { getCredentials, getConfigNumber } from "./utils/config";

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
            return builds.slice(0, maxItems).map((build: any) => {
                const item = new vscode.TreeItem(`#${build.number}  ${build.jobName || ''}`);
                item.description = `${build.status || ''}`;
                if (build.submitDate) {
                    const date = new Date(build.submitDate);
                    item.tooltip = `Job: ${build.jobName || ''}\nStatus: ${build.status || ''}\nCreated: ${date.toLocaleString()}`;
                }
                item.command = {
                    command: 'onedev-browser.openWebviewToBuild',
                    title: 'Open Build in Webview',
                    arguments: [build.number, build, creds.url, creds.projectPath]
                };
                return item;
            });
        } catch (e: any) {
            const item = new vscode.TreeItem(`Error: ${e.message || 'Failed to load builds'}`);
            item.iconPath = new vscode.ThemeIcon('error');
            return [item];
        }
    }

    refresh(): void { this._onDidChangeTreeData.fire(); }
}