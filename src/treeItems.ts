import * as vscode from "vscode";
import { PullRequest, Issue, Build } from "./types";

function timeAgo(dateStr: string): string {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const seconds = Math.floor((now - then) / 1000);
    if (seconds < 60) { return `${seconds}s ago`; }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) { return `${minutes}m ago`; }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) { return `${hours}h ago`; }
    const days = Math.floor(hours / 24);
    if (days < 30) { return `${days}d ago`; }
    const months = Math.floor(days / 30);
    if (months < 12) { return `${months}mo ago`; }
    return `${Math.floor(months / 12)}y ago`;
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export class PRTreeItem extends vscode.TreeItem {
    contextValue = "prItem";

    constructor(
        public readonly pr: PullRequest,
        public readonly serverUrl: string,
        public readonly projectPath: string
    ) {
        super(`#${pr.number} ${pr.title}`, vscode.TreeItemCollapsibleState.None);

        const status = (pr.status || "").toUpperCase();
        const statusLabel = capitalize(pr.status || "Unknown");
        const ago = pr.submitDate ? timeAgo(pr.submitDate) : "";

        this.description = `${statusLabel}${ago ? ` \u00b7 ${ago}` : ""}`;

        // Icon
        switch (status) {
            case "OPEN":
                this.iconPath = new vscode.ThemeIcon("git-pull-request", new vscode.ThemeColor("charts.green"));
                break;
            case "MERGED":
                this.iconPath = new vscode.ThemeIcon("git-merge", new vscode.ThemeColor("charts.purple"));
                break;
            case "DISCARDED":
            case "CLOSED":
                this.iconPath = new vscode.ThemeIcon("git-pull-request-closed", new vscode.ThemeColor("charts.red"));
                break;
            default:
                this.iconPath = new vscode.ThemeIcon("git-pull-request");
        }

        // Tooltip
        const md = new vscode.MarkdownString(undefined, true);
        md.supportThemeIcons = true;
        md.appendMarkdown(`**#${pr.number} ${pr.title}**\n\n---\n\n`);
        md.appendMarkdown(`$(git-branch) \`${pr.sourceBranch}\` \u2192 \`${pr.targetBranch}\`\n\n`);
        md.appendMarkdown(`$(account) Submitter: #${pr.submitterId}\n\n`);
        md.appendMarkdown(`$(comment) Comments: ${pr.commentCount ?? 0}\n\n`);
        if (pr.submitDate) {
            md.appendMarkdown(`$(clock) Created: ${timeAgo(pr.submitDate)}\n\n`);
        }
        if (pr.description) {
            const preview = pr.description.length > 200 ? pr.description.slice(0, 200) + "..." : pr.description;
            md.appendMarkdown(`> ${preview.replace(/\n/g, " ")}`);
        }
        this.tooltip = md;

        // Click command — open in webview and scroll to this PR
        this.command = {
            command: "onedev-browser.showInWebview",
            title: "Show in Webview",
            arguments: ["pr", pr.number]
        };
    }
}

export class IssueTreeItem extends vscode.TreeItem {
    contextValue = "issueItem";

    constructor(
        public readonly issue: Issue,
        public readonly serverUrl: string,
        public readonly projectPath: string
    ) {
        super(`#${issue.number} ${issue.title}`, vscode.TreeItemCollapsibleState.None);

        const state = (issue.state || "").toLowerCase();
        const stateLabel = capitalize(issue.state || "Unknown");
        const ago = issue.submitDate ? timeAgo(issue.submitDate) : "";

        this.description = `${stateLabel}${ago ? ` \u00b7 ${ago}` : ""}`;

        // Icon
        if (state === "open") {
            this.iconPath = new vscode.ThemeIcon("issues", new vscode.ThemeColor("charts.green"));
        } else if (state === "closed") {
            this.iconPath = new vscode.ThemeIcon("issue-closed", new vscode.ThemeColor("charts.purple"));
        } else {
            this.iconPath = new vscode.ThemeIcon("issue-draft");
        }

        // Tooltip
        const md = new vscode.MarkdownString(undefined, true);
        md.supportThemeIcons = true;
        md.appendMarkdown(`**#${issue.number} ${issue.title}**\n\n---\n\n`);
        md.appendMarkdown(`$(info) State: ${stateLabel}\n\n`);
        md.appendMarkdown(`$(account) Submitter: #${issue.submitterId}\n\n`);
        md.appendMarkdown(`$(comment) Comments: ${issue.commentCount ?? 0}\n\n`);
        if (issue.submitDate) {
            md.appendMarkdown(`$(clock) Created: ${timeAgo(issue.submitDate)}\n\n`);
        }
        if (issue.description) {
            const preview = issue.description.length > 200 ? issue.description.slice(0, 200) + "..." : issue.description;
            md.appendMarkdown(`> ${preview.replace(/\n/g, " ")}`);
        }
        this.tooltip = md;

        // Click command — open in webview and scroll to this issue
        this.command = {
            command: "onedev-browser.showInWebview",
            title: "Show in Webview",
            arguments: ["issues", issue.number]
        };
    }
}

export class BuildTreeItem extends vscode.TreeItem {
    contextValue = "buildItem";

    constructor(
        public readonly build: Build,
        public readonly serverUrl: string,
        public readonly projectPath: string
    ) {
        super(`#${build.number} ${build.jobName || ""}`, vscode.TreeItemCollapsibleState.None);

        const status = (build.status || "").toUpperCase();
        const statusLabel = capitalize(build.status || "Unknown");
        const dateStr = build.finishDate || build.startDate;
        const ago = dateStr ? timeAgo(dateStr) : "";

        this.description = `${statusLabel}${ago ? ` \u00b7 ${ago}` : ""}`;

        // Icon
        switch (status) {
            case "SUCCESSFUL":
                this.iconPath = new vscode.ThemeIcon("pass", new vscode.ThemeColor("charts.green"));
                break;
            case "FAILED":
                this.iconPath = new vscode.ThemeIcon("error", new vscode.ThemeColor("charts.red"));
                break;
            case "RUNNING":
                this.iconPath = new vscode.ThemeIcon("sync~spin", new vscode.ThemeColor("charts.blue"));
                break;
            case "WAITING":
            case "PENDING":
                this.iconPath = new vscode.ThemeIcon("watch", new vscode.ThemeColor("charts.yellow"));
                break;
            case "CANCELLED":
                this.iconPath = new vscode.ThemeIcon("circle-slash", new vscode.ThemeColor("disabledForeground"));
                break;
            default:
                this.iconPath = new vscode.ThemeIcon("circle-outline");
        }

        // Tooltip
        const md = new vscode.MarkdownString(undefined, true);
        md.supportThemeIcons = true;
        md.appendMarkdown(`**#${build.number} ${build.jobName || ""}**\n\n---\n\n`);
        md.appendMarkdown(`$(symbol-event) Status: ${statusLabel}\n\n`);
        if (build.startDate) {
            md.appendMarkdown(`$(clock) Started: ${timeAgo(build.startDate)}\n\n`);
        }
        if (build.finishDate) {
            md.appendMarkdown(`$(check) Finished: ${timeAgo(build.finishDate)}\n\n`);
        }
        if (build.duration !== null && build.duration !== undefined) {
            const durationSec = Math.floor(build.duration / 1000);
            md.appendMarkdown(`$(watch) Duration: ${durationSec}s\n\n`);
        }
        this.tooltip = md;

        // Click command — open in webview and scroll to this build
        this.command = {
            command: "onedev-browser.showInWebview",
            title: "Show in Webview",
            arguments: ["builds", build.number]
        };
    }
}
