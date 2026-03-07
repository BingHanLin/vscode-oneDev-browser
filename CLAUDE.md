# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VS Code extension for browsing pull requests, issues, and builds from a [OneDev](https://onedev.io/) instance. Includes a React webview UI and a Copilot Chat participant (`@onedev`) for AI-powered code reviews.

## Build Commands

### Extension (root)
- `npm run compile` — Build extension with webpack
- `npm run watch` — Watch mode for extension development
- `npm run package` — Production build with hidden source maps
- `npm run lint` — ESLint on `src/` (TypeScript)
- `npm run test` — Run tests (requires `npm run compile-tests` first)
- `npm run pretest` — Compile tests + compile + lint (all-in-one pre-test)

### Webview UI (`web/`)
- `cd web && npm run build` — Build React webview with Parcel (outputs to `web/dist/`)
- `cd web && npm run start` — Dev server for webview
- `cd web && npm run test` — React tests via react-scripts

### Full development workflow
1. `npm install` in root and `cd web && npm install`
2. Run `npm run watch` in root for extension
3. Run `cd web && npm run build` for webview (or `npm run start` for dev)
4. Press F5 in VS Code to launch Extension Development Host

## Architecture

This is a **dual-project** repo: a VS Code extension (Node.js/TypeScript) and a React webview app.

### Extension Backend (`src/`)
- **`extension.ts`** — Main activation, registers all commands, tree views, webview panel, and the `onedev:` content provider for diff viewing. The webview communicates via `postMessage`/`onDidReceiveMessage`.
- **`api.ts`** — All OneDev REST API calls (`fetchPullRequests`, `fetchIssues`, `fetchBuilds`, etc.). Uses `node-fetch` with Basic Auth.
- **`chatParticipant.ts`** — VS Code Chat API participant (`@onedev`). Handles `/review`, `/issues`, `/pr`, `/build` commands. The `/review` command fetches PR diffs via git, sends them to an LM, and renders clickable `[FILE:path]` links in the response.
- **`prsTreeDataProvider.ts`**, **`issuesTreeDataProvider.ts`**, **`buildsTreeDataProvider.ts`** — Sidebar tree view data providers.
- **`git.ts`** — Local git operations (checkout branch, get PR changes via `git diff`).
- **`utils/config.ts`** — Config helpers for reading `onedev-browser.*` settings.

### Webview Frontend (`web/`)
- Built with **React 18 + Tailwind CSS**, bundled by **Parcel**.
- **`App.tsx`** — Root component managing all state (credentials, data, filters, pagination). Communicates with extension via `vscode.postMessage`.
- **`components/PRTab.tsx`**, **`IssuesTab.tsx`**, **`BuildTab.tsx`** — Tab components with filtering, sorting, and pagination.
- **`components/GenericTable.tsx`** — Shared table component.
- Tabs use CSS `display: none/block` (not conditional rendering) to preserve state across tab switches.

### Shared Code (`shared/`)
- **`shared/types.ts`** — Type definitions (`PullRequest`, `Issue`, `Build`, `Credentials`, `PullRequestChange`) used by both extension and webview.
- `src/types.ts` re-exports from `shared/types.ts`.
- `web/src/types.ts` has its own copy of the same types.

### Communication Pattern
Extension ↔ Webview communication uses VS Code's message passing:
- Webview sends commands like `fetchPullRequests`, `getCredentials`, `checkoutBranch`
- Extension responds with `setPullRequests`, `setCredentials`, etc.
- All message handling is in `extension.ts:openReactWebview()` and `web/src/App.tsx:handleMessage()`

## Key Configuration Settings
All under `onedev-browser.*`: `url`, `email`, `token`, `projectPath`, `maxPRItems`, `maxIssueItems`, `maxBuildItems`, `codeReviewModel`, `codeReviewPrompt`.

## Conventions
- Extension targets VS Code `^1.93.0`, Node.js context
- ESLint rules: `@typescript-eslint/semi` (warn), `curly` (warn), `eqeqeq` (warn)
- Webpack bundles extension to `dist/extension.js`; Parcel bundles webview to `web/dist/`
- OneDev API returns different casing for states ("OPEN" for PRs, "Open" for issues) — code uses case-insensitive matching
