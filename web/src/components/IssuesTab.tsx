import React from "react";
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
}) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Issues</h2>
            <VSCodeButton onClick={onReload}>Reload</VSCodeButton>
        </div>
        <div className="flex justify-end mb-4">
            <VSCodeDropdown
                value={issueSort}
                onChange={(e) =>
                    onSortChange((e.target as HTMLSelectElement).value)
                }
            >
                <VSCodeOption value="newest">Newest First</VSCodeOption>
                <VSCodeOption value="oldest">Oldest First</VSCodeOption>
                <VSCodeOption value="most-comments">Most Comments</VSCodeOption>
                <VSCodeOption value="least-comments">
                    Least Comments
                </VSCodeOption>
            </VSCodeDropdown>
        </div>
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <VSCodeProgressRing />
            </div>
        ) : issues.length === 0 ? (
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
                            {new Date(issue.submitDate).toLocaleDateString()}
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell grid-column="5">
                            {new Date(issue.lastActivity.date).toLocaleString()}
                        </VSCodeDataGridCell>
                    </VSCodeDataGridRow>
                ))}
            </VSCodeDataGrid>
        )}
    </div>
);

export default IssuesTab;
