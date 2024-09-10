import React, { useState, useEffect } from "react";
import "./App.css";

import {
    VSCodeButton,
    VSCodeTextField,
    VSCodeDivider,
    VSCodeDropdown,
    VSCodeOption,
    VSCodeDataGrid,
    VSCodeDataGridCell,
    VSCodeDataGridRow,
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
    const [issues, setIssues] = useState<Issue[]>([]);
    const [prSort, setPrSort] = useState("newest");
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
        } else if (activeTab === "issues") {
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
            <div className="flex justify-end mb-4">
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
                <VSCodeDataGrid aria-label="Pull Requests">
                    <VSCodeDataGridRow row-type="header">
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="1"
                        >
                            Number
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="2"
                        >
                            Title
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="3"
                        >
                            Source
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="4"
                        >
                            Target
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="5"
                        >
                            Submitted
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="6"
                        >
                            Last Activity
                        </VSCodeDataGridCell>
                    </VSCodeDataGridRow>
                    {sortPullRequests(pullRequests).map((pr) => (
                        <VSCodeDataGridRow key={pr.number}>
                            <VSCodeDataGridCell grid-column="1">
                                {pr.number}
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="2">
                                <a
                                    href={`${url}/${projectPath}/~pulls/${pr.number}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {pr.title}
                                </a>
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="3">
                                {pr.sourceBranch}
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="4">
                                {pr.targetBranch}
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="5">
                                {new Date(pr.submitDate).toLocaleDateString()}
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="6">
                                {new Date(
                                    pr.lastActivity.date
                                ).toLocaleString()}
                            </VSCodeDataGridCell>
                        </VSCodeDataGridRow>
                    ))}
                </VSCodeDataGrid>
            )}
        </div>
    );

    const renderIssuesTab = () => (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Issues</h2>
                <VSCodeButton onClick={handleReload}>Reload</VSCodeButton>
            </div>
            <div className="flex justify-end mb-4">
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
                <VSCodeDataGrid aria-label="Issues">
                    <VSCodeDataGridRow row-type="header">
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="1"
                        >
                            Number
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="2"
                        >
                            Title
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="3"
                        >
                            State
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="4"
                        >
                            Submitted
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell
                            cell-type="columnheader"
                            grid-column="5"
                        >
                            Last Activity
                        </VSCodeDataGridCell>
                    </VSCodeDataGridRow>
                    {sortIssues(issues).map((issue) => (
                        <VSCodeDataGridRow key={issue.number}>
                            <VSCodeDataGridCell grid-column="1">
                                {issue.number}
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="2">
                                <a
                                    href={`${url}/${projectPath}/~issues/${issue.number}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {issue.title}
                                </a>
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="3">
                                {issue.state}
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="4">
                                {new Date(
                                    issue.submitDate
                                ).toLocaleDateString()}
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="5">
                                {new Date(
                                    issue.lastActivity.date
                                ).toLocaleString()}
                            </VSCodeDataGridCell>
                        </VSCodeDataGridRow>
                    ))}
                </VSCodeDataGrid>
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
