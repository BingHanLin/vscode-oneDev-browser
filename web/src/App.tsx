import React, { useState, useEffect } from "react";
import "./App.css";

import {
    VSCodeButton,
    VSCodeTextField,
    VSCodeDivider,
    VSCodeDropdown,
    VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";

// Declare the vscode API
declare global {
    interface Window {
        acquireVsCodeApi: () => any;
    }
}

// Get the VS Code API
const vscode = window.acquireVsCodeApi();

interface PullRequest {
    number: number;
    title: string;
    targetBranch: string;
    sourceBranch: string;
    submitterId: number;
    submitDate: string;
    lastActivity: {
        userId: number;
        date: string;
        description: string;
    };
    commentCount: number;
    state: string;
}

// Add this interface for Issues
interface Issue {
    number: number;
    title: string;
    state: string;
    submitterId: number;
    submitDate: string;
    lastActivity: {
        userId: number;
        date: string;
        description: string;
    };
    commentCount: number;
}

function App() {
    const [activeTab, setActiveTab] = useState("settings");
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
    const [issues, setIssues] = useState<Issue[]>([]);
    const [prFilter, setPrFilter] = useState("all");
    const [prSort, setPrSort] = useState("newest");
    const [issueFilter, setIssueFilter] = useState("all");
    const [issueSort, setIssueSort] = useState("newest");

    useEffect(() => {
        window.addEventListener("message", handleMessage);
        vscode.postMessage({ command: "getCredentials" });
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    useEffect(() => {
        if (activeTab === "pr") {
            fetchPullRequests();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === "issues") {
            fetchIssues();
        }
    }, [activeTab]);

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
            case "setPullRequests":
                setPullRequests(message.pullRequests);
                break;
            case "setIssues":
                setIssues(message.issues);
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setProjectId(null);
        vscode.postMessage({
            command: "saveCredentials",
            url,
            email,
            token,
            projectPath,
        });
    };

    const toggleTokenVisibility = () => {
        setShowToken(!showToken);
    };

    const fetchPullRequests = () => {
        vscode.postMessage({
            command: "fetchPullRequests",
            url,
            email,
            token,
            projectPath,
        });
    };

    const fetchIssues = () => {
        vscode.postMessage({
            command: "fetchIssues",
            url,
            email,
            token,
            projectPath,
        });
    };

    const filterPullRequests = (prs: PullRequest[]) => {
        switch (prFilter) {
            case "open":
                return prs.filter((pr) => pr.state === "Open");
            case "closed":
                return prs.filter((pr) => pr.state === "Closed");
            default:
                return prs;
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

    const filterIssues = (issues: Issue[]) => {
        switch (issueFilter) {
            case "open":
                return issues.filter((issue) => issue.state === "Open");
            case "closed":
                return issues.filter((issue) => issue.state === "Closed");
            default:
                return issues;
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

    const renderSettingsTab = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
                <label htmlFor="url" className="w-1/4">
                    oneDev URL:
                </label>
                <VSCodeTextField
                    id="url"
                    value={url}
                    onChange={(e) =>
                        setUrl((e.target as HTMLInputElement).value)
                    }
                    placeholder="https://your-onedev-instance.com"
                    className="w-3/4"
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="email" className="w-1/4">
                    Email:
                </label>
                <VSCodeTextField
                    id="email"
                    value={email}
                    onChange={(e) =>
                        setEmail((e.target as HTMLInputElement).value)
                    }
                    placeholder="user@example.com"
                    className="w-3/4"
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="token" className="w-1/4">
                    API Token:
                </label>
                <div className="w-3/4 flex">
                    <VSCodeTextField
                        id="token"
                        type={showToken ? "text" : "password"}
                        value={token}
                        onChange={(e) =>
                            setToken((e.target as HTMLInputElement).value)
                        }
                        placeholder="Your API token"
                        className="flex-grow"
                    />
                    <VSCodeButton
                        appearance="secondary"
                        onClick={toggleTokenVisibility}
                        className="ml-2"
                    >
                        {showToken ? "Hide" : "Show"}
                    </VSCodeButton>
                </div>
            </div>
            <div className="flex items-center">
                <label htmlFor="projectPath" className="w-1/4">
                    Project Path:
                </label>
                <VSCodeTextField
                    id="projectPath"
                    value={projectPath}
                    onChange={(e) =>
                        setProjectPath((e.target as HTMLInputElement).value)
                    }
                    placeholder="Your project path"
                    className="w-3/4"
                />
            </div>
            <VSCodeDivider />
            <div className="h-16 mb-4">
                {isError && message && (
                    <div
                        className={
                            "p-4 rounded bg-red-100 text-red-700 transition-opacity duration-500 ease-in-out " +
                            (showMessage ? "opacity-100" : "opacity-0")
                        }
                    >
                        {message}
                    </div>
                )}
                {!isError && message && projectId !== null && (
                    <div
                        className={
                            "p-4 rounded bg-green-100 text-green-700 transition-opacity duration-500 ease-in-out " +
                            (showMessage ? "opacity-100" : "opacity-0")
                        }
                    >
                        {message} Project ID: {projectId}
                    </div>
                )}
            </div>
            <div className="flex justify-end">
                <VSCodeButton type="submit">Save Credentials</VSCodeButton>
            </div>
        </form>
    );

    const renderPRTab = () => (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Pull Requests</h2>
                <VSCodeButton onClick={handleReload}>Reload</VSCodeButton>
            </div>
            <div className="flex justify-between mb-4">
                <VSCodeDropdown
                    value={prFilter}
                    onChange={(e) =>
                        setPrFilter((e.target as HTMLSelectElement).value)
                    }
                >
                    <VSCodeOption value="all">All PRs</VSCodeOption>
                    <VSCodeOption value="open">Open PRs</VSCodeOption>
                    <VSCodeOption value="closed">Closed PRs</VSCodeOption>
                </VSCodeDropdown>
                <VSCodeDropdown
                    value={prSort}
                    onChange={(e) =>
                        setPrSort((e.target as HTMLSelectElement).value)
                    }
                >
                    <VSCodeOption value="newest">Newest First</VSCodeOption>
                    <VSCodeOption value="oldest">Oldest First</VSCodeOption>
                    <VSCodeOption value="most-comments">
                        Most Comments
                    </VSCodeOption>
                    <VSCodeOption value="least-comments">
                        Least Comments
                    </VSCodeOption>
                </VSCodeDropdown>
            </div>
            {pullRequests.length === 0 ? (
                <p>No pull requests found.</p>
            ) : (
                <ul className="space-y-6">
                    {sortPullRequests(filterPullRequests(pullRequests)).map(
                        (pr) => (
                            <li
                                key={pr.number}
                                className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold mb-2 sm:mb-0 sm:mr-4 break-words">
                                        <a
                                            href={`${url}/${projectPath}/~pulls/${pr.number}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            #{pr.number}: {pr.title}
                                        </a>
                                    </h3>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    <p>
                                        From{" "}
                                        <span className="font-medium">
                                            {pr.sourceBranch}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-medium">
                                            {pr.targetBranch}
                                        </span>
                                    </p>
                                    <p>
                                        Opened on{" "}
                                        {new Date(
                                            pr.submitDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-500">
                                    <span>
                                        Submitted by User #{pr.submitterId}
                                    </span>
                                    <span className="mt-1 sm:mt-0">
                                        Last activity:{" "}
                                        {pr.lastActivity.description} on{" "}
                                        {new Date(
                                            pr.lastActivity.date
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            )}
        </div>
    );

    const renderIssuesTab = () => (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Issues</h2>
                <VSCodeButton onClick={handleReload}>Reload</VSCodeButton>
            </div>
            <div className="flex justify-between mb-4">
                <VSCodeDropdown
                    value={issueFilter}
                    onChange={(e) =>
                        setIssueFilter((e.target as HTMLSelectElement).value)
                    }
                >
                    <VSCodeOption value="all">All Issues</VSCodeOption>
                    <VSCodeOption value="open">Open Issues</VSCodeOption>
                    <VSCodeOption value="closed">Closed Issues</VSCodeOption>
                </VSCodeDropdown>
                <VSCodeDropdown
                    value={issueSort}
                    onChange={(e) =>
                        setIssueSort((e.target as HTMLSelectElement).value)
                    }
                >
                    <VSCodeOption value="newest">Newest First</VSCodeOption>
                    <VSCodeOption value="oldest">Oldest First</VSCodeOption>
                    <VSCodeOption value="most-comments">
                        Most Comments
                    </VSCodeOption>
                    <VSCodeOption value="least-comments">
                        Least Comments
                    </VSCodeOption>
                </VSCodeDropdown>
            </div>
            {issues.length === 0 ? (
                <p>No issues found.</p>
            ) : (
                <ul className="space-y-6">
                    {sortIssues(filterIssues(issues)).map((issue) => (
                        <li
                            key={issue.number}
                            className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold mb-2 sm:mb-0 sm:mr-4 break-words">
                                    <a
                                        href={`${url}/${projectPath}/~issues/${issue.number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        #{issue.number}: {issue.title}
                                    </a>
                                </h3>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>
                                    Opened on{" "}
                                    {new Date(
                                        issue.submitDate
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-500">
                                <span>
                                    Submitted by User #{issue.submitterId}
                                </span>
                                <span className="mt-1 sm:mt-0">
                                    Last activity:{" "}
                                    {issue.lastActivity.description} on{" "}
                                    {new Date(
                                        issue.lastActivity.date
                                    ).toLocaleString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">oneDev Browser</h1>
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
                <button
                    className={`tab-button ${
                        activeTab === "settings" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                >
                    Settings
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "pr" && renderPRTab()}
                {activeTab === "issues" && renderIssuesTab()}
                {activeTab === "settings" && renderSettingsTab()}
            </div>
        </div>
    );
}

export default App;
