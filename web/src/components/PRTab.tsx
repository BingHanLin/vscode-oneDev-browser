import React, { useState, useRef, useEffect } from "react";
import {
    VSCodeButton,
    VSCodeDropdown,
    VSCodeOption,
    VSCodeDataGrid,
    VSCodeDataGridCell,
    VSCodeDataGridRow,
} from "@vscode/webview-ui-toolkit/react";
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
    selectedPR,
}) => {
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

    // Highlight keyword in a string (case-insensitive)
    function highlightKeyword(text: string, keyword: string) {
        if (!keyword) return text;
        const regex = new RegExp(
            `(${keyword.replace(/[.*+?^${}()|[\\\\\]\[]/g, "\\$&")})`,
            "gi"
        );
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? (
                <mark key={i} style={{ background: "#ffe066", padding: 0 }}>
                    {part}
                </mark>
            ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
            )
        );
    }

    return (
        <div>
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
                        setStateFilter((e.target as HTMLSelectElement).value)
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
            {filteredPRs.length === 0 ? (
                <p>No pull requests found.</p>
            ) : (
                <>
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
                        {pagedPRs.map((pr) => (
                            <VSCodeDataGridRow
                                key={pr.number}
                                className={
                                    selectedPR === pr.number
                                        ? "vscode-selected-row"
                                        : ""
                                }
                                style={
                                    selectedPR === pr.number
                                        ? {
                                              background:
                                                  "var(--vscode-list-activeSelectionBackground)",
                                              color: "var(--vscode-list-activeSelectionForeground)",
                                          }
                                        : {}
                                }
                            >
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
                                        {highlightKeyword(pr.title, keyword)}
                                    </a>
                                </VSCodeDataGridCell>
                                <VSCodeDataGridCell grid-column="3">
                                    <button
                                        className="text-blue-600 hover:underline mr-2"
                                        title="Checkout Source Branch"
                                        onClick={() => {
                                            if (vscode) {
                                                vscode.postMessage({
                                                    command: "checkoutBranch",
                                                    branch: pr.sourceBranch,
                                                });
                                            } else {
                                                // If no vscode API, fallback to local alert
                                                alert(
                                                    "VS Code API not available."
                                                );
                                            }
                                        }}
                                    >
                                        {highlightKeyword(
                                            pr.sourceBranch,
                                            keyword
                                        )}
                                    </button>
                                </VSCodeDataGridCell>
                                <VSCodeDataGridCell grid-column="4">
                                    {highlightKeyword(pr.targetBranch, keyword)}
                                </VSCodeDataGridCell>
                                <VSCodeDataGridCell grid-column="5">
                                    {new Date(
                                        pr.submitDate
                                    ).toLocaleDateString()}
                                </VSCodeDataGridCell>
                                <VSCodeDataGridCell grid-column="6">
                                    {new Date(
                                        pr.lastActivity.date
                                    ).toLocaleString()}
                                </VSCodeDataGridCell>
                            </VSCodeDataGridRow>
                        ))}
                    </VSCodeDataGrid>
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
    );
};

export default PRTab;
