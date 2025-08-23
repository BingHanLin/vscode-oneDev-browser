import * as vscode from "vscode";

/**
 * Get a string value from VS Code settings, priority: user > workspace > workspaceFolder.
 */
export function getConfigValue(config: vscode.WorkspaceConfiguration, key: string): string {
    const inspected = config.inspect(key);
    if (typeof inspected?.globalValue === 'string' && inspected.globalValue !== "") {
        return inspected.globalValue;
    }
    if (typeof inspected?.workspaceValue === 'string' && inspected.workspaceValue !== "") {
        return inspected.workspaceValue;
    }
    if (typeof inspected?.workspaceFolderValue === 'string' && inspected.workspaceFolderValue !== "") {
        return inspected.workspaceFolderValue;
    }
    return "";
}

/**
 * Get a number value from VS Code settings, priority: user > workspace > workspaceFolder.
 */
export function getConfigNumber(config: vscode.WorkspaceConfiguration, key: string): number {
    const inspected = config.inspect(key);
    if (typeof inspected?.globalValue === 'number') return inspected.globalValue;
    if (typeof inspected?.workspaceValue === 'number') return inspected.workspaceValue;
    if (typeof inspected?.workspaceFolderValue === 'number') return inspected.workspaceFolderValue;
    return 0;
}
