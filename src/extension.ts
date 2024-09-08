import * as vscode from "vscode";
import { createWebviewPanel } from "./webview";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "onedev-browser.setCredentials",
        () => {
            createWebviewPanel(context);
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
