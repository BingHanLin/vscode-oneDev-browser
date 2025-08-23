# oneDev Browser

A Visual Studio Code extension to browse pull requests, issues, and builds from your [oneDev](https://onedev.io/) instance, with a modern React + Tailwind UI.

> **Notice: This extension is a personal side project and is not an official plugin from oneDev or its maintainers.**

---

## Features

-   **Tabbed UI**: Switch between Pull Requests, Issues, and Builds in a single sidebar view.
-   **Sorting & Filtering**: Sort and filter PRs, Issues, and Builds by state, status, or keyword.
-   **Search**: Quickly search PRs, Issues, and Builds by title or number.
-   **Status Bar Integration**: Access the oneDev Browser instantly from the VS Code status bar.
-   **Webview Details**: Open PR, Issue, or Build details in a rich webview panel.
-   **Progress Indicators**: Visual feedback while loading data.
-   **Project Configuration**: Connect to any oneDev instance and project with your credentials.

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

1. Use the **oneDev Browser** sidebar tree view to browse Pull Requests, Issues, and Builds for your configured project.

    - You can configure the maximum number of Pull Requests, Issues, and Builds shown in the tree view via the settings: `onedev-browser.maxPRItems`, `onedev-browser.maxIssueItems`, and `onedev-browser.maxBuildItems`.

2. To view rich details, open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and run `Open oneDev Webview`.

## Development

The extension backend is in `src/`, and the React webview UI is in `web/`.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

---

## References

-   [oneDev Official Site](https://onedev.io/)
-   [VS Code Extension + React + Tailwind Guide](https://dev.to/rakshit47/create-vs-code-extension-with-react-typescript-tailwind-1ba6)
