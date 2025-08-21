import React, { useState, useRef, useEffect } from "react";
import {
    VSCodeButton,
    VSCodeDropdown,
    VSCodeOption,
    VSCodeDataGrid,
    VSCodeDataGridCell,
    VSCodeDataGridRow,
} from "@vscode/webview-ui-toolkit/react";
import { Issue } from "../types";

interface IssuesTabProps {
    issues: Issue[];
    issueSort: string;
    isLoading: boolean;
    url: string;
    projectPath: string;
    onReload: () => void;
    onSortChange: (sort: string) => void;
    sortIssues: (issues: Issue[]) => Issue[];
    loadMoreIssues: () => void;
    hasMoreIssues: boolean;
    selectedIssue?: number | null;
}

const IssuesTab: React.FC<IssuesTabProps> = ({
    issues,
    issueSort,
    isLoading,
    url,
    projectPath,
    onReload,
    onSortChange,
    sortIssues,
    loadMoreIssues,
    hasMoreIssues,
    selectedIssue,
}) => {
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
    const [keyword, setKeyword] = useState("");
    const [stateFilter, setStateFilter] = useState<string>("all");
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
    }, [issues, pendingScroll]);
    const allStates = Array.from(
        new Set(issues.map((issue) => issue.state))
    ).sort();
    // Filter issues by state and then by keyword
    const filteredIssues = issues
        .filter((issue) => stateFilter === "all" || issue.state === stateFilter)
        .filter((issue) =>
            issue.title.toLowerCase().includes(keyword.toLowerCase())
        );
    // Highlight keyword in title
    function highlightKeyword(text: string, keyword: string) {
        if (!keyword) return text;
        const regex = new RegExp(
            `(${keyword.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")})`,
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
                <h2 className="text-2xl font-bold">Issues</h2>
                <VSCodeButton onClick={onReload}>Reload</VSCodeButton>
            </div>
            <div className="flex justify-end mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Search issues..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{
                        minWidth: 180,
                        padding: 4,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                    }}
                />
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
                    value={issueSort}
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
            {isLoading && issues.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    Loading...
                </div>
            ) : filteredIssues.length === 0 ? (
                <p>No issues found.</p>
            ) : (
                <>
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
                        {filteredIssues.map((issue) => (
                            <VSCodeDataGridRow
                                key={issue.number}
                                className={
                                    selectedIssue === issue.number
                                        ? "vscode-selected-row"
                                        : ""
                                }
                                style={
                                    selectedIssue === issue.number
                                        ? {
                                              background:
                                                  "var(--vscode-list-activeSelectionBackground)",
                                              color: "var(--vscode-list-activeSelectionForeground)",
                                          }
                                        : {}
                                }
                            >
                                <VSCodeDataGridCell grid-column="1">
                                    {issue.number}
                                </VSCodeDataGridCell>
                                <VSCodeDataGridCell grid-column="2">
                                    <span>
                                        {highlightKeyword(issue.title, keyword)}
                                    </span>
                                    <a
                                        href={`${url}/${projectPath}/~issues/${issue.number}`}
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
                    {hasMoreIssues && (
                        <div
                            className="flex justify-center my-4"
                            ref={loadMoreWrapperRef}
                        >
                            <VSCodeButton
                                onClick={() => {
                                    setPendingScroll(true);
                                    loadMoreIssues();
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: 20,
                                        height: 16,
                                        marginRight: 8,
                                    }}
                                />
                                Load More
                            </VSCodeButton>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default IssuesTab;
