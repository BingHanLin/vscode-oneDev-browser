# oneDev Browser

A Visual Studio Code extension to browse pull requests, issues, and builds from your [oneDev](https://onedev.io/) instance, with a modern React + Tailwind UI.

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

### Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Run `Open oneDev Browser`.
3. Enter your oneDev instance URL, email, and API token when prompted.
4. Use the sidebar tabs to browse Pull Requests, Issues, and Builds.
5. Use the dropdowns and search boxes to sort, filter, and search items.
6. Click any item to view details in a webview panel.

### Configuration

You will be prompted for the following settings on first use (or can update them later in the extension settings):

-   **oneDev URL**: The base URL of your oneDev instance (e.g., `https://your-onedev-instance.com`).
-   **Email**: Your oneDev account email address.
-   **API Token**: Your personal API token for authentication.
-   **Project Path**: The path to your project within oneDev (e.g., `projects/your-project`).

## Development

The extension backend is in `src/`, and the React webview UI is in `web/`.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

---

## References

-   [oneDev Official Site](https://onedev.io/)
-   [VS Code Extension + React + Tailwind Guide](https://dev.to/rakshit47/create-vs-code-extension-with-react-typescript-tailwind-1ba6)
