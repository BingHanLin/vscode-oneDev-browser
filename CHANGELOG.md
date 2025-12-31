# Change Log

All notable changes to the "onedev-browser" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

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