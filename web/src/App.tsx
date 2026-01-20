import React, { useState, useEffect } from "react";
import "./App.css";
import PRTab from "./components/PRTab";
import IssuesTab from "./components/IssuesTab";
import BuildTab from "./components/BuildTab";
import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { PullRequest, Issue, Build } from "./types";

// Declare the vscode API
interface VSCodeApi {
    postMessage: (message: unknown) => void;
}
declare global {
    interface Window {
        acquireVsCodeApi?: () => VSCodeApi;
    }
}

// Get the VS Code API
const vscode = window.acquireVsCodeApi ? window.acquireVsCodeApi() : undefined;

// ...types moved to types.ts...

function App() {
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
        if (vscode) vscode.postMessage(payload);
        // If replace, clear PRs immediately for better UX
        if (replace) setPullRequests([]);
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
        if (vscode) vscode.postMessage(payload);
        // If replace, clear issues immediately for better UX
        if (replace) setIssues([]);
    };

    // Fetch builds with offset/count, replace: true means reset, false means append
    const fetchBuilds = (
        offset = 0,
        count = BUILD_PAGE_SIZE,
        replace = false
    ) => {
        setIsLoading(true);
        const payload = {
            command: "fetchBuilds",
            url,
            email,
            token,
            projectPath,
            offset,
            count,
        };
        if (vscode) vscode.postMessage(payload);
        if (replace) setBuilds([]);
    };
    const [activeTab, setActiveTab] = useState("pr");
    const [selectedPR, setSelectedPR] = useState<number | null>(null);
    const [selectedIssue, setSelectedIssue] = useState<number | null>(null);
    const [selectedBuild, setSelectedBuild] = useState<number | null>(null);
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
    const [prSort, setPrSort] = useState("newest");
    const [issues, setIssues] = useState<Issue[]>([]);
    const [issuesOffset, setIssuesOffset] = useState(0);
    const ISSUES_PAGE_SIZE = 20;
    const [hasMoreIssues, setHasMoreIssues] = useState(true);
    const [issueSort, setIssueSort] = useState("newest");
    const [prStateFilter, setPrStateFilter] = useState("Open");
    const [issueStateFilter, setIssueStateFilter] = useState("Open");
    const [prFilterInitialized, setPrFilterInitialized] = useState(false);
    const [issueFilterInitialized, setIssueFilterInitialized] = useState(false);
    
    // Track whether data has been loaded for each tab
    const [prDataLoaded, setPrDataLoaded] = useState(false);
    const [issuesDataLoaded, setIssuesDataLoaded] = useState(false);
    const [buildsDataLoaded, setBuildsDataLoaded] = useState(false);

    // PRTab current builds state
    const [currentBuilds, setCurrentBuilds] = useState<Build[] | null>(null);
    const [loadingBuilds, setLoadingBuilds] = useState(false);

    // Build tab state
    const [builds, setBuilds] = useState<Build[]>([]);
    const [buildOffset, setBuildOffset] = useState(0);
    const BUILD_PAGE_SIZE = 20;
    const [hasMoreBuilds, setHasMoreBuilds] = useState(true);
    const [buildSort, setBuildSort] = useState("newest");
    // Share loading state for all tabs
    const [isLoading, setIsLoading] = useState(false);
    const loadMoreBuilds = () => {
        if (!isLoading && hasMoreBuilds) {
            fetchBuilds(buildOffset, BUILD_PAGE_SIZE, false);
        }
    };

    const sortBuilds = (builds: Build[]) => {
        switch (buildSort) {
            case "oldest":
                return [...builds].sort(
                    (a, b) =>
                        (a.startDate ? new Date(a.startDate).getTime() : 0) -
                        (b.startDate ? new Date(b.startDate).getTime() : 0)
                );
            case "longest":
                return [...builds].sort(
                    (a, b) => (b.duration || 0) - (a.duration || 0)
                );
            case "shortest":
                return [...builds].sort(
                    (a, b) => (a.duration || 0) - (b.duration || 0)
                );
            default: // newest
                return [...builds].sort(
                    (a, b) =>
                        (b.startDate ? new Date(b.startDate).getTime() : 0) -
                        (a.startDate ? new Date(a.startDate).getTime() : 0)
                );
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

    const loadMorePRs = () => {
        if (!isLoading && hasMorePRs) {
            fetchPullRequests(prOffset, PR_PAGE_SIZE, false);
        }
    };

    const loadMoreIssues = () => {
        if (!isLoading && hasMoreIssues) {
            fetchIssues(issuesOffset, ISSUES_PAGE_SIZE, false);
        }
    };

    const handleReload = () => {
        if (activeTab === "pr") {
            fetchPullRequests();
        } else if (activeTab === "issues") {
            fetchIssues();
        } else if (activeTab === "builds") {
            fetchBuilds();
        }
    };

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
            case "setCurrentBuilds":
                setCurrentBuilds(
                    Array.isArray(message.builds) ? message.builds : []
                );
                setLoadingBuilds(false);
                break;
            case "setPullRequests":
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
            case "setIssues":
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
            case "setBuilds":
                if (typeof message.offset === "number" && message.offset > 0) {
                    setBuilds((prev) => [...prev, ...(message.builds || [])]);
                } else {
                    setBuilds(message.builds || []);
                }
                setBuildOffset(
                    (message.offset || 0) + (message.count || BUILD_PAGE_SIZE)
                );
                setHasMoreBuilds(
                    (message.builds || []).length ===
                        (message.count || BUILD_PAGE_SIZE)
                );
                setIsLoading(false);
                break;
            default:
                break;
        }
    };

    // Handle fetch current builds as a message handler style function
    const handleFetchCurrentBuilds = (prID: number) => {
        if (!prID) return;
        if (!url || !email || !token || !projectPath) return;
        setLoadingBuilds(true);
        setCurrentBuilds(null);
        if (vscode)
            vscode.postMessage({
                command: "fetchCurrentBuilds",
                url,
                email,
                token,
                projectPath,
                prID,
            });
    };

    useEffect(() => {
        window.addEventListener("message", handleMessage);
        if (vscode) vscode.postMessage({ command: "getCredentials" });
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    useEffect(() => {
        if (url && email && token && projectPath) {
            if (activeTab === "pr" && !prDataLoaded) {
                setPrOffset(0);
                fetchPullRequests(0, PR_PAGE_SIZE, true);
                setPrDataLoaded(true);
            } else if (activeTab === "issues" && !issuesDataLoaded) {
                setIssuesOffset(0);
                fetchIssues(0, ISSUES_PAGE_SIZE, true);
                setIssuesDataLoaded(true);
            } else if (activeTab === "builds" && !buildsDataLoaded) {
                setBuildOffset(0);
                fetchBuilds(0, BUILD_PAGE_SIZE, true);
                setBuildsDataLoaded(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, url, email, token, projectPath, prDataLoaded, issuesDataLoaded, buildsDataLoaded]);

    useEffect(() => {
        if (message) {
            setTimeout(() => setShowMessage(true), 10);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Auto-detect and set correct "Open" state for PRs
    useEffect(() => {
        if (!prFilterInitialized && pullRequests.length > 0) {
            const allStates = Array.from(
                new Set(pullRequests.map((pr) => pr.status))
            );
            const openState = allStates.find(state => 
                state && state.toLowerCase() === "open"
            );
            if (openState) {
                setPrStateFilter(openState);
            } else if (allStates.length > 0) {
                // If no Open state exists, use the first available state
                setPrStateFilter(allStates[0]);
            } else {
                // If no states at all, default to "all"
                setPrStateFilter("all");
            }
            setPrFilterInitialized(true);
        }
    }, [pullRequests, prFilterInitialized]);

    // Auto-detect and set correct "Open" state for Issues
    useEffect(() => {
        if (!issueFilterInitialized && issues.length > 0) {
            const allStates = Array.from(
                new Set(issues.map((issue) => issue.state))
            );
            const openState = allStates.find(state => 
                state && state.toLowerCase() === "open"
            );
            if (openState) {
                setIssueStateFilter(openState);
            } else if (allStates.length > 0) {
                // If no Open state exists, use the first available state
                setIssueStateFilter(allStates[0]);
            } else {
                // If no states at all, default to "all"
                setIssueStateFilter("all");
            }
            setIssueFilterInitialized(true);
        }
    }, [issues, issueFilterInitialized]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">oneDev Browser</h1>
            {/* Summary Bar - VSCodeTextField style */}
            <div className="mb-4 flex flex-wrap items-center gap-4">
                <VSCodeTextField
                    readOnly
                    value={email}
                    placeholder="(not set)"
                    className="w-72"
                    style={{ minWidth: 220 }}
                    aria-label="Email"
                >
                    Email
                </VSCodeTextField>
                <VSCodeTextField
                    readOnly
                    value={url}
                    placeholder="(not set)"
                    className="w-96"
                    style={{ minWidth: 260 }}
                    aria-label="oneDev URL"
                >
                    oneDev URL
                </VSCodeTextField>
                <VSCodeTextField
                    readOnly
                    value={projectPath}
                    placeholder="(not set)"
                    className="w-72"
                    style={{ minWidth: 220 }}
                    aria-label="Project Path"
                >
                    Project Path
                </VSCodeTextField>
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
                <button
                    className={`tab-button ${
                        activeTab === "builds" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("builds")}
                >
                    Builds
                </button>
            </div>
            <div className="tab-content">
                <div style={{ display: activeTab === "pr" ? "block" : "none" }}>
                    <PRTab
                        pullRequests={pullRequests}
                        prSort={prSort}
                        isLoading={isLoading}
                        url={url}
                        email={email}
                        token={token}
                        projectPath={projectPath}
                        onReload={handleReload}
                        onSortChange={setPrSort}
                        sortPullRequests={sortPullRequests}
                        loadMorePRs={loadMorePRs}
                        hasMorePRs={hasMorePRs}
                        vscode={vscode}
                        selectedPR={selectedPR}
                        currentBuilds={currentBuilds}
                        loadingBuilds={loadingBuilds}
                        onFetchCurrentBuilds={handleFetchCurrentBuilds}
                        stateFilter={prStateFilter}
                        onStateFilterChange={setPrStateFilter}
                    />
                </div>
                <div style={{ display: activeTab === "issues" ? "block" : "none" }}>
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
                        selectedIssue={selectedIssue}
                        stateFilter={issueStateFilter}
                        onStateFilterChange={setIssueStateFilter}
                    />
                </div>
                <div style={{ display: activeTab === "builds" ? "block" : "none" }}>
                    <BuildTab
                        builds={builds}
                        buildSort={buildSort}
                        isLoading={isLoading}
                        url={url}
                        projectPath={projectPath}
                        onReload={handleReload}
                        onSortChange={setBuildSort}
                        sortBuilds={sortBuilds}
                        loadMoreBuilds={loadMoreBuilds}
                        hasMoreBuilds={hasMoreBuilds}
                        vscode={vscode}
                        selectedBuild={selectedBuild}
                    />
                </div>
            </div>
        </div>
    );
}
export default App;
