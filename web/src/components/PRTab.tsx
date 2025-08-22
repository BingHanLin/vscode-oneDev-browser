import React, { useState, useRef, useEffect } from "react";
import { highlightKeyword } from "../utils/highlightKeyword";
import {
    VSCodeButton,
    VSCodeDropdown,
    VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";
import GenericTable, { TableColumn } from "./GenericTable";
import ExternalLinkIcon from "./ExternalLinkIcon";
import CheckoutBranchIcon from "./CheckoutBranchIcon";
import { PullRequest } from "../types";

interface PRTabProps {
    pullRequests: PullRequest[];
    prSort: string;
    isLoading: boolean;
    url: string;
    projectPath: string;
    onReload: () => void;
    onSortChange: (sort: string) => void;
    sortPullRequests: (prs: PullRequest[]) => PullRequest[];
    loadMorePRs: () => void;
    hasMorePRs: boolean;
    vscode?: { postMessage: (message: any) => void };
    selectedPR?: number | null;
}

const PRTab: React.FC<PRTabProps> = ({
    pullRequests,
    prSort,
    isLoading,
    url,
    projectPath,
    onReload,
    onSortChange,
    sortPullRequests,
    loadMorePRs,
    hasMorePRs,
    vscode,
    selectedPR: selectedPRProp,
}) => {
    // Local state for selected PR (for detail panel)
    const [selectedPRLocal, setSelectedPRLocal] = useState<number | null>(
        selectedPRProp ?? null
    );
    // Sync with prop if it changes
    useEffect(() => {
        setSelectedPRLocal(selectedPRProp ?? null);
    }, [selectedPRProp]);
    // State for keyword search
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
                    {highlightKeyword(value, keyword)}
                    <a
                        href={`${url}/${projectPath}/~pulls/${pr.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in oneDev"
                        style={{ color: "#0078d4", textDecoration: "none" }}
                    >
                        {linkIcon}
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
                    <span>{highlightKeyword(value, keyword)}</span>
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
            render: (value) => highlightKeyword(value, keyword),
        },
        {
            title: "Submitter",
            dataIndex: "submitterId",
            width: 100,
        },
    ];

    // SVG external link icon
    const linkIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            style={{
                marginLeft: 4,
                verticalAlign: "middle",
                cursor: "pointer",
            }}
        >
            <path
                d="M13.5 2H18v4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.5 7.5L18 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.5 4.5H7A3.5 3.5 0 0 0 3.5 8v5A3.5 3.5 0 0 0 7 16.5h5A3.5 3.5 0 0 0 15.5 13v-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return (
        <div style={{ display: "flex", height: "100vh", minHeight: 0 }}>
            {/* Left: PR list */}
            <div
                style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 8 }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Pull Requests</h2>
                    <VSCodeButton onClick={onReload}>Reload</VSCodeButton>
                </div>
                <div className="flex justify-end mb-4 gap-2">
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
                            onRowClick={(pr) => setSelectedPRLocal(pr.number)}
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
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Last Activity:
                                </span>
                                {new Date(
                                    pr.lastActivity.date
                                ).toLocaleString()}
                            </div>
                            {pr.description && (
                                <div
                                    style={{
                                        color: "var(--vscode-foreground)",
                                        fontSize: 15,
                                        marginTop: 16,
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {pr.description}
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default PRTab;
