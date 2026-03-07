# oneDev Browser

[![Version](https://img.shields.io/visual-studio-marketplace/v/binghanlin.onedev-browser)](https://marketplace.visualstudio.com/items?itemName=binghanlin.onedev-browser)
[![License](https://img.shields.io/github/license/BingHanLin/vscode-oneDev-browser)](https://github.com/BingHanLin/vscode-oneDev-browser/blob/main/LICENSE.md)

A Visual Studio Code extension to browse pull requests, issues, and builds from your [oneDev](https://onedev.io/) instance, with a modern React + Tailwind UI.

> **Notice: This extension is a personal side project and is not an official plugin from oneDev or its maintainers.**

---

## Features

-   **Sidebar Tree Views**: Browse Pull Requests, Issues, and Builds with status icons, rich tooltips, and context menus. Click any item to open the webview and jump to its details.
-   **Webview Dashboard**: View and filter PRs, issues, and builds in a rich panel with status badges, markdown PR descriptions, and scrollable detail panels.
-   **Onboarding Wizard**: Guided setup for first-time users to configure OneDev server URL, credentials, and project.
-   **AI Chat Participant**: Interact with OneDev via `@onedev` in GitHub Copilot Chat.
    -   **AI Code Review**: Generate reviews for Pull Requests using your preferred model.
    -   **Clickable Diffs**: Open file diffs directly from the AI's review comments.

## Getting Started

### Installation

1. Search for `oneDev Browser` in the VS Code Extensions Marketplace and install it.
2. Reload VS Code if prompted.

### Configuration

Before using the extension, go to VS Code **Settings** (`Ctrl+,` or `Cmd+,` on macOS), search for `Onedev-browser`, and set the following options:

-   **oneDev URL**: The base URL of your oneDev instance (e.g., `https://your-onedev-instance.com`).
-   **Email**: Your oneDev account email address.
-   **API Token**: Your personal API token for authentication.
-   **Project Path**: The path to your project within oneDev (e.g., `projects/your-project`).

### Usage

1. **Tree Views**: Use the **oneDev Browser** sidebar to browse Pull Requests, Issues, and Builds.
2. **Webview**: Open the command palette and run `Open oneDev Webview` to see a rich dashboard.
3. **AI Chat**: Open Copilot Chat and type `@onedev` to start interacting.
    -   `@onedev /review #123`: Request an AI code review for PR #123.

## AI Code Review Setup

1.  **Select Model**: Run `OneDev: Select Code Review Model` to choose which AI model to use (e.g., GPT-4). You can set this globally or per workspace.
2.  **Custom Prompt**: Configure `onedev-browser.codeReviewPrompt` in settings to customize the instructions given to the AI (e.g., "Focus on security vulnerabilities").

## Development

The extension backend is in `src/`, and the React webview UI is in `web/`.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

---

## References

-   [oneDev Official Site](https://onedev.io/)
-   [VS Code Extension + React + Tailwind Guide](https://dev.to/rakshit47/create-vs-code-extension-with-react-typescript-tailwind-1ba6)
