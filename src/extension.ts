import * as vscode from "vscode";
import { createWebviewPanel } from "./webview";

export function activate(context: vscode.ExtensionContext) {
    let openWebviewDisposable = vscode.commands.registerCommand(
        "onedev-browser.openWebview",
        () => {
            createWebviewPanel(context);
        }
    );
    context.subscriptions.push(openWebviewDisposable);

    let statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        100
    );
    statusBarItem.text = "oneDev";
    statusBarItem.tooltip = "View oneDev Browser";
    statusBarItem.command = "onedev-browser.openWebview";
    context.subscriptions.push(statusBarItem);

    statusBarItem.show();
}

export function deactivate() {}
