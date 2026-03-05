import * as vscode from "vscode";
import { Credentials } from "../../shared/types";

let secretStorage: vscode.SecretStorage | undefined;

export function initSecretStorage(secrets: vscode.SecretStorage): void {
    secretStorage = secrets;
}

export async function getToken(): Promise<string> {
    if (secretStorage) {
        const secret = await secretStorage.get("onedev-browser.token");
        if (secret) {
            return secret;
        }
    }
    return "";
}

export async function setToken(token: string): Promise<void> {
    if (!secretStorage) {
        throw new Error("SecretStorage not initialized.");
    }
    await secretStorage.store("onedev-browser.token", token);
}

export async function getCredentials(): Promise<Credentials> {
    const resource = vscode.workspace.workspaceFolders?.[0]?.uri;
    const config = vscode.workspace.getConfiguration("onedev-browser", resource);
    const token = await getToken();
    return {
        url: getConfigValue(config, "url"),
        email: getConfigValue(config, "email"),
        token,
        projectPath: getConfigValue(config, "projectPath")
    };
}

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
