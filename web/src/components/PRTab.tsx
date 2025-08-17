import React, { useState } from "react";
import {
    VSCodeButton,
    VSCodeDropdown,
    VSCodeOption,
    VSCodeDataGrid,
    VSCodeDataGridCell,
    VSCodeDataGridRow,
    VSCodeProgressRing,
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
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <VSCodeProgressRing />
                </div>
            ) : filteredPRs.length === 0 ? (
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
                    {sortPullRequests(filteredPRs).map((pr) => (
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
                                    {highlightKeyword(pr.title, keyword)}
                                </a>
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="3">
                                {highlightKeyword(pr.sourceBranch, keyword)}
                            </VSCodeDataGridCell>
                            <VSCodeDataGridCell grid-column="4">
                                {highlightKeyword(pr.targetBranch, keyword)}
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
};

export default PRTab;
