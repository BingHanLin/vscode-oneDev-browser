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
}) => {
    const [keyword, setKeyword] = useState("");
    // Filter issues by keyword (title)
    const filteredIssues = issues.filter((issue) =>
        issue.title.toLowerCase().includes(keyword.toLowerCase())
    );
    // 高亮顯示關鍵字
    function highlightKeyword(text: string, keyword: string) {
        if (!keyword) return text;
        const regex = new RegExp(
            `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
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
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <VSCodeProgressRing />
                </div>
            ) : filteredIssues.length === 0 ? (
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
                    {sortIssues(filteredIssues).map((issue) => (
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
                                    {highlightKeyword(issue.title, keyword)}
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
};

export default IssuesTab;
