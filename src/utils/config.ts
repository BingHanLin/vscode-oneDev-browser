import * as vscode from "vscode";

/**
 * Get a string value from VS Code settings, priority: user > workspace > workspaceFolder.
 */
export function getConfigValue(config: vscode.WorkspaceConfiguration, key: string): string {
    const inspected = config.inspect(key);
    if (inspected) {
        if (inspected.workspaceFolderValue !== undefined && inspected.workspaceFolderValue !== "") {
            return inspected.workspaceFolderValue as string;
        }
        if (inspected.workspaceValue !== undefined && inspected.workspaceValue !== "") {
            return inspected.workspaceValue as string;
        }
        if (inspected.globalValue !== undefined && inspected.globalValue !== "") {
            return inspected.globalValue as string;
        }
        if (inspected.defaultValue !== undefined && inspected.defaultValue !== "") {
            return inspected.defaultValue as string;
        }
    }
    return "";
}

/**
 * Get a number value from VS Code settings, priority: user > workspace > workspaceFolder.
 */
export function getConfigNumber(config: vscode.WorkspaceConfiguration, key: string): number {
    const inspected = config.inspect(key);
    if (inspected?.workspaceFolderValue !== undefined) return inspected.workspaceFolderValue as number;
    if (inspected?.workspaceValue !== undefined) return inspected.workspaceValue as number;
    if (inspected?.globalValue !== undefined) return inspected.globalValue as number;
    if (inspected?.defaultValue !== undefined) return inspected.defaultValue as number;
    return 0;
}
