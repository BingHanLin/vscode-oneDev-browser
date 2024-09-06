import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "onedev-browser" is now active!'
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "onedev-browser.setCredentials",
        async () => {
            const url = await vscode.window.showInputBox({
                prompt: "Enter your oneDev instance URL",
                placeHolder: "https://your-onedev-instance.com",
            });

            const email = await vscode.window.showInputBox({
                prompt: "Enter your oneDev account email",
                placeHolder: "user@example.com",
            });

            const token = await vscode.window.showInputBox({
                prompt: "Enter your oneDev API token",
                password: true,
            });

            if (url && email && token) {
                const config =
                    vscode.workspace.getConfiguration("onedev-browser");
                await config.update(
                    "url",
                    url,
                    vscode.ConfigurationTarget.Global
                );
                await config.update(
                    "email",
                    email,
                    vscode.ConfigurationTarget.Global
                );
                await config.update(
                    "token",
                    token,
                    vscode.ConfigurationTarget.Global
                );

                vscode.window.showInformationMessage(
                    "oneDev credentials saved successfully!"
                );
            } else {
                vscode.window.showErrorMessage(
                    "Failed to save oneDev credentials. Please provide all required information."
                );
            }
        }
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
