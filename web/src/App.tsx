import React, { useState, useEffect } from "react";
import "./App.css";
import PRTab from "./components/PRTab";
import IssuesTab from "./components/IssuesTab";
import { PullRequest, Issue } from "./types";

// Declare the vscode API
declare global {
    interface Window {
        acquireVsCodeApi?: () => any;
    }
}

// Get the VS Code API
const vscode = window.acquireVsCodeApi ? window.acquireVsCodeApi() : undefined;

// ...types moved to types.ts...

function App() {
    const [activeTab, setActiveTab] = useState("pr");
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [projectPath, setProjectPath] = useState("");
    const [showToken, setShowToken] = useState(false);
    const [projectId, setProjectId] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
    const [prOffset, setPrOffset] = useState(0);
    const PR_PAGE_SIZE = 20;
    const [hasMorePRs, setHasMorePRs] = useState(true);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [issuesOffset, setIssuesOffset] = useState(0);
    const ISSUES_PAGE_SIZE = 20;
    const [hasMoreIssues, setHasMoreIssues] = useState(true);
    const [prSort, setPrSort] = useState("newest");
    const [issueSort, setIssueSort] = useState("newest");
    const [isLoading, setIsLoading] = useState(false);
    // SettingsTab removed: user/workspace values and scope state no longer needed

    useEffect(() => {
        window.addEventListener("message", handleMessage);
        vscode.postMessage({ command: "getCredentials" });
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    // Only fetch data automatically when all credentials are set; also refetch when credentials update
    useEffect(() => {
        if (url && email && token && projectPath) {
            if (activeTab === "pr") {
                setPrOffset(0);
                fetchPullRequests(0, PR_PAGE_SIZE, true);
            } else if (activeTab === "issues") {
                setIssuesOffset(0);
                fetchIssues(0, ISSUES_PAGE_SIZE, true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, url, email, token, projectPath]);

    useEffect(() => {
        if (message) {
            setTimeout(() => setShowMessage(true), 10);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleMessage = (event: MessageEvent) => {
        const message = event.data;
        switch (message.command) {
            case "setCredentials":
                setUrl(message.url);
                setEmail(message.email);
                setToken(message.token);
                setProjectPath(message.projectPath);
                break;
            // SettingsTab removed: no user/workspace settings
            case "setProjectId":
                setProjectId(message.projectId);
                break;
            case "showSuccessMessage":
                setMessage(message.message);
                setIsError(false);
                break;
            case "showErrorMessage":
                setMessage(message.message);
                setIsError(true);
                break;
            case "setPullRequests": {
                // If offset is 0, replace; else append
                if (typeof message.offset === "number" && message.offset > 0) {
                    setPullRequests((prev) => [
                        ...prev,
                        ...(message.pullRequests || []),
                    ]);
                } else {
                    setPullRequests(message.pullRequests || []);
                }
                setPrOffset(
                    (message.offset || 0) + (message.count || PR_PAGE_SIZE)
                );
                setHasMorePRs(
                    (message.pullRequests || []).length ===
                        (message.count || PR_PAGE_SIZE)
                );
                setIsLoading(false);
                break;
            }
            case "setIssues": {
                // If offset is 0, replace; else append
                if (typeof message.offset === "number" && message.offset > 0) {
                    setIssues((prev) => [...prev, ...(message.issues || [])]);
                } else {
                    setIssues(message.issues || []);
                }
                setIssuesOffset(
                    (message.offset || 0) + (message.count || ISSUES_PAGE_SIZE)
                );
                setHasMoreIssues(
                    (message.issues || []).length ===
                        (message.count || ISSUES_PAGE_SIZE)
                );
                setIsLoading(false);
                break;
            }
        }
    };

    // SettingsTab removed: handleSubmit and handleScopeChange no longer needed

    const toggleTokenVisibility = () => {
        setShowToken(!showToken);
    };

    // Fetch PRs with offset/count, replace: true means reset, false means append
    const fetchPullRequests = (
        offset = 0,
        count = PR_PAGE_SIZE,
        replace = false
    ) => {
        setIsLoading(true);
        const payload = {
            command: "fetchPullRequests",
            url,
            email,
            token,
            projectPath,
            offset,
            count,
        };
        console.log("[Webview] postMessage: fetchPullRequests", payload);
        vscode.postMessage(payload);
        // If replace, clear PRs immediately for better UX
        if (replace) setPullRequests([]);
    };
    // For PRTab: load more PRs
    const loadMorePRs = () => {
        if (!isLoading && hasMorePRs) {
            fetchPullRequests(prOffset, PR_PAGE_SIZE, false);
        }
    };

    // Fetch issues with offset/count, replace: true means reset, false means append
    const fetchIssues = (
        offset = 0,
        count = ISSUES_PAGE_SIZE,
        replace = false
    ) => {
        setIsLoading(true);
        const payload = {
            command: "fetchIssues",
            url,
            email,
            token,
            projectPath,
            offset,
            count,
        };
        console.log("[Webview] postMessage: fetchIssues", payload);
        vscode.postMessage(payload);
        // If replace, clear issues immediately for better UX
        if (replace) setIssues([]);
    };

    // For IssuesTab: load more issues
    const loadMoreIssues = () => {
        if (!isLoading && hasMoreIssues) {
            fetchIssues(issuesOffset, ISSUES_PAGE_SIZE, false);
        }
    };

    const sortPullRequests = (prs: PullRequest[]) => {
        switch (prSort) {
            case "oldest":
                return [...prs].sort(
                    (a, b) =>
                        new Date(a.submitDate).getTime() -
                        new Date(b.submitDate).getTime()
                );
            case "most-comments":
                return [...prs].sort((a, b) => b.commentCount - a.commentCount);
            case "least-comments":
                return [...prs].sort((a, b) => a.commentCount - b.commentCount);
            default: // newest
                return [...prs].sort(
                    (a, b) =>
                        new Date(b.submitDate).getTime() -
                        new Date(a.submitDate).getTime()
                );
        }
    };

    const sortIssues = (issues: Issue[]) => {
        switch (issueSort) {
            case "oldest":
                return [...issues].sort(
                    (a, b) =>
                        new Date(a.submitDate).getTime() -
                        new Date(b.submitDate).getTime()
                );
            case "most-comments":
                return [...issues].sort(
                    (a, b) => b.commentCount - a.commentCount
                );
            case "least-comments":
                return [...issues].sort(
                    (a, b) => a.commentCount - b.commentCount
                );
            default: // newest
                return [...issues].sort(
                    (a, b) =>
                        new Date(b.submitDate).getTime() -
                        new Date(a.submitDate).getTime()
                );
        }
    };

    const handleReload = () => {
        if (activeTab === "pr") {
            fetchPullRequests();
        } else if (activeTab === "issues") {
            fetchIssues();
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">oneDev Browser</h1>
            {/* Summary Bar */}
            <div className="mb-4 p-3 rounded bg-gray-100 border flex flex-wrap items-center text-sm">
                <div className="mr-6">
                    <span className="font-semibold">Email:</span>{" "}
                    {email || <span className="text-gray-400">(not set)</span>}
                </div>
                <div className="mr-6">
                    <span className="font-semibold">oneDev URL:</span>{" "}
                    {url || <span className="text-gray-400">(not set)</span>}
                </div>
                <div>
                    <span className="font-semibold">Project Path:</span>{" "}
                    {projectPath || (
                        <span className="text-gray-400">(not set)</span>
                    )}
                </div>
            </div>
            <div className="tab-container">
                <button
                    className={`tab-button ${
                        activeTab === "pr" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("pr")}
                >
                    PR
                </button>
                <button
                    className={`tab-button ${
                        activeTab === "issues" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("issues")}
                >
                    Issues
                </button>
                {/* SettingsTab removed: no settings tab in UI */}
            </div>
            <div className="tab-content">
                {activeTab === "pr" && (
                    <PRTab
                        pullRequests={pullRequests}
                        prSort={prSort}
                        isLoading={isLoading}
                        url={url}
                        projectPath={projectPath}
                        onReload={handleReload}
                        onSortChange={setPrSort}
                        sortPullRequests={sortPullRequests}
                        loadMorePRs={loadMorePRs}
                        hasMorePRs={hasMorePRs}
                        vscode={vscode}
                    />
                )}
                {activeTab === "issues" && (
                    <IssuesTab
                        issues={issues}
                        issueSort={issueSort}
                        isLoading={isLoading}
                        url={url}
                        projectPath={projectPath}
                        onReload={handleReload}
                        onSortChange={setIssueSort}
                        sortIssues={sortIssues}
                        loadMoreIssues={loadMoreIssues}
                        hasMoreIssues={hasMoreIssues}
                    />
                )}
                {/* SettingsTab removed: no settings tab content */}
            </div>
        </div>
    );
}

export default App;
