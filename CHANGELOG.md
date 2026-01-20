# Change Log

All notable changes to the "onedev-browser" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.0] - 2026-01-20

### Changed

-   **PR/Issue Filtering**: Improved default filter behavior to show "Open" items by default in both tree view and webview.
-   **State Detection**: Enhanced state filter detection to handle case variations dynamically.
-   **UI Synchronization**: Fixed dropdown filter synchronization across tab switches.

### Fixed

-   **PR Query Filter**: Corrected PR query to use `"State" is "Open"` instead of `"Status" is "Open"`.
-   **Server-side Filtering**: Implemented proper server-side filtering for webview components.

## [0.0.11]

### Added

-   **AI Chat Participant**: Added `@onedev` chat participant to GitHub Copilot Chat.
    -   Available commands: `/review` to generate code reviews for Pull Requests.
-   **AI Code Review Settings**:
    -   `onedev-browser.codeReviewModel`: Select a specific AI model for reviews (User or Workspace scope).
    -   `onedev-browser.codeReviewPrompt`: Customize the system prompt for code reviews.
-   **Clickable Diff Links**: AI-generated code reviews now include clickable file links that open VS Code's diff view.
-   **Optional Copilot**: The `github.copilot-chat` dependency is now optional. The extension works without it (chat features disabled).

## [0.0.10]

-   Initial Beta Release with Tree Views and Webview support.