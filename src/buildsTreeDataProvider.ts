import * as vscode from "vscode";
import { fetchBuilds } from "./api";
import { Credentials } from "./types";

export class BuildsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
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
        const builds = await fetchBuilds(creds);
        return builds.map((build: any) => {
            const item = new vscode.TreeItem(`#${build.number} ${build.status || ''}`);
            item.description = `${build.jobName || ''} | ${build.submitterId || ''}`;
            if (build.submitDate) {
                const date = new Date(build.submitDate);
                item.tooltip = `Job: ${build.jobName || ''}\nStatus: ${build.status || ''}\nAuthor: ${build.submitterId || ''}\nCreated: ${date.toLocaleString()}`;
            }
            // Pass url and projectPath to command for reliability
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
