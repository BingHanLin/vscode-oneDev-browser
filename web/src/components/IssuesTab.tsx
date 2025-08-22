import React, { useState, useRef, useEffect } from "react";
import {
    VSCodeButton,
    VSCodeDropdown,
    VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";
import GenericTable, { TableColumn } from "./GenericTable";
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
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                display: "inline",
                verticalAlign: "middle",
                marginLeft: 4,
                color: "#0078d4",
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
    // Local state for selected issue (for detail panel)
    const [selectedIssueLocal, setSelectedIssueLocal] = useState<number | null>(
        selectedIssue ?? null
    );
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
    // Highlight keyword in title
    function highlightKeyword(text: string, keyword: string) {
        if (!keyword) return text;
        const regex = new RegExp(
            `(${keyword.replace(/[.*+?^${}()|[\]\[]/g, "\\$&")})`,
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

    // Table columns config
    const columns: TableColumn<Issue>[] = [
        {
            title: "Number",
            dataIndex: "number",
            width: 80,
        },
        {
            title: "Title",
            dataIndex: "title",
            render: (value, issue) => (
                <span>
                    {highlightKeyword(value, keyword)}
                    <a
                        href={`${url}/${projectPath}/~issues/${issue.number}`}
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
            title: "State",
            dataIndex: "state",
            width: 90,
        },
        {
            title: "Submitter",
            dataIndex: "submitterId",
            width: 100,
        },
    ];

    // Filter and sort issues for display
    const filteredIssues = sortIssues(
        issues.filter(
            (issue) =>
                (stateFilter === "all" || issue.state === stateFilter) &&
                (!keyword ||
                    issue.title.toLowerCase().includes(keyword.toLowerCase()))
        )
    );

    return (
        <div style={{ display: "flex", height: "100vh", minHeight: 0 }}>
            {/* Left: Issues list */}
            <div
                style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 8 }}
            >
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
                        <GenericTable
                            columns={columns}
                            data={filteredIssues}
                            rowKey={(issue) => issue.number}
                            onRowClick={(issue) =>
                                setSelectedIssueLocal(issue.number)
                            }
                            selectedRowKey={selectedIssueLocal}
                            ariaLabel="Issues"
                        />
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
                    const issue = issues.find(
                        (i) => i.number === selectedIssueLocal
                    );
                    if (!issue)
                        return (
                            <div
                                style={{
                                    color: "#888",
                                    marginTop: 32,
                                    textAlign: "center",
                                }}
                            >
                                Please select an issue
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
                                {issue.title}
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
                                {issue.state}
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
                                {issue.submitterId}
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
                                {new Date(issue.submitDate).toLocaleString()}
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
                                    issue.lastActivity.date
                                ).toLocaleString()}
                            </div>
                            {issue.description && (
                                <div
                                    style={{
                                        color: "var(--vscode-foreground)",
                                        fontSize: 15,
                                        marginTop: 16,
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {issue.description}
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default IssuesTab;
