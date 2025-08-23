import * as vscode from "vscode";
import { fetchBuilds } from "./api";
import { getConfigValue, getConfigNumber } from "./utils/config";
import { Credentials } from "./types";

export class BuildsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
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
        const maxItems = getConfigNumber(config, "maxBuildItems");
        const builds = await fetchBuilds(creds);
        return builds.slice(0, maxItems).map((build: any) => {
            const item = new vscode.TreeItem(`#${build.number} ${build.status || ''}`);
            item.description = `${build.jobName || ''} | ${build.submitterId || ''}`;
            if (build.submitDate) {
                const date = new Date(build.submitDate);
                item.tooltip = `Job: ${build.jobName || ''}\nStatus: ${build.status || ''}\nAuthor: ${build.submitterId || ''}\nCreated: ${date.toLocaleString()}`;
            }
            item.command = {
                command: 'onedev-browser.openWebviewToBuild',
                title: 'Open Build in Webview',
                arguments: [build.number, build, creds.url, creds.projectPath]
            };
            return item;
        });
    }

    refresh(): void { this._onDidChangeTreeData.fire(); }
}