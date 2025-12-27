import React, { useState, useRef, useEffect } from "react";
import { highlightKeyword } from "../utils/highlightKeyword";
import {
    VSCodeButton,
    VSCodeDropdown,
    VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";
import GenericTable, { TableColumn } from "./GenericTable";
import { ExternalLinkIcon, CheckoutBranchIcon } from "./Icons";
import { PullRequest, Build, PullRequestChange } from "../types";
import ReactMarkdown from 'react-markdown';

interface VSCodeMessagePayload {
    command: string;
    [key: string]: unknown;
}

interface PRTabProps {
    pullRequests: PullRequest[];
    prSort: string;
    isLoading: boolean;
    url: string;
    email: string;
    token: string;
    projectPath: string;
    onReload: () => void;
    onSortChange: (sort: string) => void;
    sortPullRequests: (prs: PullRequest[]) => PullRequest[];
    loadMorePRs: () => void;
    hasMorePRs: boolean;
    vscode?: { postMessage: (message: VSCodeMessagePayload) => void };
    selectedPR?: number | null;
    currentBuilds: Build[] | null;
    loadingBuilds: boolean;
    onFetchCurrentBuilds: (prID: number) => void;
}

const PRTab: React.FC<PRTabProps> = ({
    pullRequests,
    prSort,
    isLoading,
    url,
    email,
    token,
    projectPath,
    onReload,
    onSortChange,
    sortPullRequests,
    loadMorePRs,
    hasMorePRs,
    vscode,
    selectedPR: selectedPRProp,
    currentBuilds,
    loadingBuilds,
    onFetchCurrentBuilds,
}) => {
    // Local state for selected PR (for detail panel)
    const [selectedPRLocal, setSelectedPRLocal] = useState<number | null>(
        selectedPRProp ?? null
    );
    // Sync with prop if it changes
    useEffect(() => {
        setSelectedPRLocal(selectedPRProp ?? null);
    }, [selectedPRProp]);

    useEffect(() => {
        if (selectedPRLocal != null) {
            const pr = pullRequests.find((p) => p.number === selectedPRLocal);
            if (pr && pr.id != null) {
                onFetchCurrentBuilds(pr.id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPRLocal, pullRequests]);

    // Changes state
    const [prChanges, setPrChanges] = useState<PullRequestChange[]>([]);
    const [loadingChanges, setLoadingChanges] = useState(false);
    const [review, setReview] = useState<string>("");
    const [generatingReview, setGeneratingReview] = useState(false);

    useEffect(() => {
        if (selectedPRLocal && vscode) {
             const pr = pullRequests.find(p => p.number === selectedPRLocal);
             if (pr && pr.id) {
               setLoadingChanges(true);
               setPrChanges([]);
               setReview("");
               vscode.postMessage({
                   command: 'getPrChanges',
                   url, email, token, projectPath,
                   prId: pr.id,
                   pr // Pass the full PR object for Git logic
               });
             }
        }
    }, [selectedPRLocal, pullRequests, vscode]); // Depend on selectedPRLocal changes

    
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
             const { command, changes, review } = event.data;
             if (command === 'setPrChanges') {
                 setPrChanges(changes || []);
                 setLoadingChanges(false);
             } else if (command === 'setCodeReview') {
                 setReview(review);
                 setGeneratingReview(false);
             }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleGenerateReview = () => {
        if (selectedPRLocal && vscode) {
            const pr = pullRequests.find(p => p.number === selectedPRLocal);
            if (pr && pr.id) {
                setGeneratingReview(true);
                vscode.postMessage({
                    command: 'generateCodeReview',
                    url, email, token, projectPath,
                    prId: pr.id,
                    projectId: pr.id, // TODO: Check if projectId logic in extension needs fix, might need fetchProjectId
                    pr // Pass PR object for Git logic
                });
            }
        }
    };

    const handleOpenDiff = (change: PullRequestChange) => {
         if (vscode && selectedPRLocal) {
            const pr = pullRequests.find(p => p.number === selectedPRLocal);
             vscode.postMessage({
                 command: 'openDiff',
                 change,
                 projectId: pr?.id // Using pr id as project ID proxy for now, might need actual project ID
             });
         }
    };
    const [keyword, setKeyword] = useState("");

    // State for PR status filter
    const [stateFilter, setStateFilter] = useState<string>("all");

    // Get all unique statuses from PRs (e.g., open, closed, merged)
    const allStates = Array.from(
        new Set(pullRequests.map((pr) => pr.status))
    ).sort();

    // Filter PRs by keyword and status
    const filteredPRs = pullRequests.filter(
        (pr) =>
            (stateFilter === "all" || pr.status === stateFilter) &&
            (pr.title.toLowerCase().includes(keyword.toLowerCase()) ||
                // Use shared ExternalLinkIcon
                pr.sourceBranch.toLowerCase().includes(keyword.toLowerCase()) ||
                pr.targetBranch.toLowerCase().includes(keyword.toLowerCase()))
    );

    // The PRs to display (all loaded so far, filtered)
    const pagedPRs = sortPullRequests(filteredPRs);

    // Ref for the Load More button wrapper
    const loadMoreWrapperRef = useRef<HTMLDivElement | null>(null);
    // Track if we just triggered load more (for scroll restoration)
    const [pendingScroll, setPendingScroll] = useState(false);
    // When pendingScroll is set, scroll the Load More button into view after render
    useEffect(() => {
        if (pendingScroll && loadMoreWrapperRef.current) {
            loadMoreWrapperRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            setPendingScroll(false);
        }
    }, [pullRequests, pendingScroll]);

    // Listen for checkoutBranchSuccess/checkoutBranchError, ask extension to show VS Code notification
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            const { command, message } = event.data || {};
            if (
                (command === "checkoutBranchSuccess" ||
                    command === "checkoutBranchError") &&
                vscode
            ) {
                vscode.postMessage({
                    command:
                        command === "checkoutBranchSuccess"
                            ? "showInfoMessage"
                            : "showErrorMessage",
                    message:
                        message ||
                        (command === "checkoutBranchSuccess"
                            ? "Branch checked out successfully."
                            : "Failed to checkout branch."),
                });
            }
        }
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [vscode]);

    // Table columns config
    const columns: TableColumn<PullRequest>[] = [
        {
            title: "Number",
            dataIndex: "number",
            width: 80,
        },
        {
            title: "Title",
            dataIndex: "title",
            render: (value, pr) => (
                <span>
                    {highlightKeyword(value as string, keyword)}
                    <a
                        href={`${url}/${projectPath}/~pulls/${pr.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in oneDev"
                        style={{ color: "#0078d4", textDecoration: "none" }}
                    >
                        <ExternalLinkIcon size={14} />
                    </a>
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            width: 90,
        },
        {
            title: "Source",
            dataIndex: "sourceBranch",
            render: (value, pr) => (
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <span>{highlightKeyword(value as string, keyword)}</span>
                    <button
                        title="Checkout Source Branch"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (vscode) {
                                vscode.postMessage({
                                    command: "checkoutBranch",
                                    branch: pr.sourceBranch,
                                });
                            } else {
                                alert("VS Code API not available.");
                            }
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            marginLeft: 6,
                            color: "#0078d4",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                        }}
                    >
                        <CheckoutBranchIcon size={16} />
                    </button>
                </span>
            ),
        },
        {
            title: "Target",
            dataIndex: "targetBranch",
            render: (value) => highlightKeyword(value as string, keyword),
        },
        {
            title: "Submitter",
            dataIndex: "submitterId",
            width: 100,
        },
    ];

    // SVG external link icon

    return (
        <div style={{ display: "flex", height: "100vh", minHeight: 0 }}>
            {/* Left: PR list */}
            <div
                style={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                }}
            >
                {/* Controls area: always fixed above the table, not affected by table scroll */}
                <div
                    className="flex justify-end mb-4 gap-2"
                    style={{ flexShrink: 0 }}
                >
                    {/* Keyword search input for title/source/target branch */}
                    <input
                        type="text"
                        placeholder="Search PRs..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                            minWidth: 180,
                            padding: 4,
                            borderRadius: 4,
                            border: "1px solid #ccc",
                        }}
                    />
                    {/* Status filter dropdown */}
                    <VSCodeDropdown
                        value={stateFilter}
                        onChange={(e) =>
                            setStateFilter(
                                (e.target as HTMLSelectElement).value
                            )
                        }
                        style={{ minWidth: 120 }}
                    >
                        <VSCodeOption value="all">All States</VSCodeOption>
                        {allStates.map((state) => (
                            <VSCodeOption key={state} value={state}>
                                {state}
                            </VSCodeOption>
                        ))}
                    </VSCodeDropdown>
                    <VSCodeDropdown
                        value={prSort}
                        onChange={(e) =>
                            onSortChange((e.target as HTMLSelectElement).value)
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
                {/* Table area: scrollable, controls above will not move when scrolling horizontally */}
                <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
                    {isLoading && pullRequests.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            Loading...
                        </div>
                    ) : filteredPRs.length === 0 ? (
                        <p>No pull requests found.</p>
                    ) : (
                        <>
                            <GenericTable
                                columns={columns}
                                data={pagedPRs}
                                rowKey={(pr) => pr.number}
                                onRowClick={(pr) =>
                                    setSelectedPRLocal(pr.number)
                                }
                                selectedRowKey={selectedPRLocal}
                                ariaLabel="Pull Requests"
                            />
                            {hasMorePRs && (
                                <div
                                    className="flex justify-center my-4"
                                    ref={loadMoreWrapperRef}
                                >
                                    <VSCodeButton
                                        onClick={() => {
                                            setPendingScroll(true);
                                            loadMorePRs();
                                        }}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        Load More
                                    </VSCodeButton>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {/* Right: Detail panel */}
            <div
                style={{
                    width: 340,
                    minWidth: 240,
                    maxWidth: 400,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    padding: "28px 24px 20px 24px",
                    boxSizing: "border-box",
                }}
            >
                {(() => {
                    const pr = pullRequests.find(
                        (p) => p.number === selectedPRLocal
                    );
                    if (!pr)
                        return (
                            <div
                                style={{
                                    color: "#888",
                                    marginTop: 32,
                                    textAlign: "center",
                                }}
                            >
                                Please select a pull request
                            </div>
                        );
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginBottom: 2,
                                    letterSpacing: 0.5,
                                }}
                            >
                                {pr.title}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    State:
                                </span>
                                {pr.status}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Author:
                                </span>
                                {pr.submitterId}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Source:
                                </span>
                                {pr.sourceBranch}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Target:
                                </span>
                                {pr.targetBranch}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Created:
                                </span>
                                {new Date(pr.submitDate).toLocaleString()}
                            </div>
                            {/* <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Request ID:
                                </span>
                                {pr.id}
                            </div> */}
                            {/* Current Builds Section */}
                            <div style={{ marginTop: 18 }}>
                                <div
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                        marginBottom: 6,
                                    }}
                                >
                                    Builds
                                </div>
                                {loadingBuilds ? (
                                    <div style={{ color: "#888" }}>
                                        Loading builds...
                                    </div>
                                ) : currentBuilds &&
                                  currentBuilds.length > 0 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 6,
                                        }}
                                    >
                                        {currentBuilds.map((b) => (
                                            <div
                                                key={b.number}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    borderBottom:
                                                        "1px solid #eee",
                                                    padding: "6px 0",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        flex: 1,
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {b.jobName}
                                                </span>
                                                <span
                                                    style={{
                                                        marginRight: 12,
                                                        color:
                                                            b.status ===
                                                            "SUCCESSFUL"
                                                                ? "#2ecc40"
                                                                : b.status ===
                                                                  "FAILED"
                                                                ? "#e74c3c"
                                                                : "#666",
                                                        fontWeight:
                                                            b.status ===
                                                                "SUCCESSFUL" ||
                                                            b.status ===
                                                                "FAILED"
                                                                ? "bold"
                                                                : undefined,
                                                    }}
                                                >
                                                    {b.status}
                                                </span>
                                                <a
                                                    href={
                                                        url &&
                                                        projectPath &&
                                                        b.number
                                                            ? `${url}/${projectPath}/~builds/${b.number}`
                                                            : undefined
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Open build in oneDev"
                                                    style={{
                                                        color: "#0078d4",
                                                        textDecoration: "none",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <ExternalLinkIcon
                                                        size={15}
                                                    />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ color: "#888" }}>
                                        No builds found.
                                    </div>
                                )}
                            </div>
                            {/* End Current Builds Section */}

                            {/* Changes Section */}
                             <div style={{ marginTop: 18 }}>
                                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
                                    Changes
                                </div>
                                {loadingChanges ? (
                                    <div>Loading changes...</div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {prChanges.map((change, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                                                 <span style={{ 
                                                     fontWeight: 'bold', 
                                                     color: change.type === 'ADD' ? 'green' : change.type === 'DELETE' ? 'red' : 'orange',
                                                     marginRight: 6,
                                                     width: 12
                                                }}>
                                                     {change.type[0]}
                                                </span>
                                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={change.path}>
                                                    {change.path}
                                                </span>
                                                <button 
                                                    onClick={() => handleOpenDiff(change)}
                                                    style={{ border: 'none', background: 'none', color: '#0078d4', cursor: 'pointer' }}
                                                >
                                                    Diff
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                             </div>

                            {/* AI Review Section */}
                             <div style={{ marginTop: 18 }}>
                                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>AI Code Review</span>
                                    <button 
                                        onClick={handleGenerateReview}
                                        disabled={generatingReview}
                                        style={{ 
                                            fontSize: 12, 
                                            padding: '4px 8px', 
                                            cursor: generatingReview ? 'wait' : 'pointer' 
                                        }}
                                    >
                                        {generatingReview ? "Generating..." : "Generate"}
                                    </button>
                                </div>
                                {review && (
                                    <div className="markdown-body" style={{ fontSize: 14, overflow: 'auto', maxHeight: 400, border: '1px solid #eee', padding: 8 }}>
                                        <ReactMarkdown>{review}</ReactMarkdown>
                                    </div>
                                )}
                             </div>

                            {pr.description && (
                                <>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 16,
                                            marginTop: 18,
                                            marginBottom: 6,
                                        }}
                                    >
                                        Description
                                    </div>
                                    <div
                                        style={{
                                            color: "var(--vscode-foreground)",
                                            fontSize: 15,
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {pr.description}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default PRTab;
