import * as vscode from 'vscode';

export function registerStatusBarCommand(context: vscode.ExtensionContext) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = '$(browser) oneDev'; // VSCode icon + label
    statusBarItem.tooltip = 'Open oneDev Browser';
    statusBarItem.command = 'onedev-browser.openWebview';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}
