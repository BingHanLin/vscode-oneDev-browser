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
            `(${keyword.replace(/[.*+?^${}()|[\\\]\[]/g, "\\$&")})`,
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
                                    <span>
                                        {highlightKeyword(pr.title, keyword)}
                                    </span>
                                    <a
                                        href={`${url}/${projectPath}/~pulls/${pr.number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Open in oneDev"
                                        style={{
                                            color: "#0078d4",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {linkIcon}
                                    </a>
                                </VSCodeDataGridCell>
                                <VSCodeDataGridCell grid-column="3">
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span>
                                            {highlightKeyword(
                                                pr.sourceBranch,
                                                keyword
                                            )}
                                        </span>
                                        <button
                                            title="Checkout Source Branch"
                                            onClick={() => {
                                                if (vscode) {
                                                    vscode.postMessage({
                                                        command:
                                                            "checkoutBranch",
                                                        branch: pr.sourceBranch,
                                                    });
                                                } else {
                                                    alert(
                                                        "VS Code API not available."
                                                    );
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
                                            {/* Checkout icon (downward arrow on branch) */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                style={{
                                                    display: "inline",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <path
                                                    d="M10 2v12"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M6 12l4 4 4-4"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </span>
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
