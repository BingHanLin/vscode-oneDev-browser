import * as vscode from "vscode";
import { fetchBuilds } from "./api";
import { Credentials } from "./types";

export class BuildsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
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
        const builds = await fetchBuilds(creds);
        return builds.map((build: any) => {
            const item = new vscode.TreeItem(`#${build.number} ${build.status || ''}`);
            item.description = `${build.jobName || ''} | ${build.submitterId || ''}`;
            if (build.submitDate) {
                const date = new Date(build.submitDate);
                item.tooltip = `Job: ${build.jobName || ''}\nStatus: ${build.status || ''}\nAuthor: ${build.submitterId || ''}\nCreated: ${date.toLocaleString()}`;
            }
            // Add click command to open webview and navigate to this build
            item.command = {
                command: 'onedev-browser.openWebviewToBuild',
                title: 'Open Build in Webview',
                arguments: [build.number, build]
            };
            return item;
        });
    }
    refresh(): void { this._onDidChangeTreeData.fire(); }
}
