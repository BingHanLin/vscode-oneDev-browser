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
}) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Pull Requests</h2>
            <VSCodeButton onClick={onReload}>Reload</VSCodeButton>
        </div>
        <div className="flex justify-end mb-4">
            <VSCodeDropdown
                value={prSort}
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
        ) : pullRequests.length === 0 ? (
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
                {sortPullRequests(pullRequests).map((pr) => (
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
                                {pr.title}
                            </a>
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell grid-column="3">
                            {pr.sourceBranch}
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell grid-column="4">
                            {pr.targetBranch}
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell grid-column="5">
                            {new Date(pr.submitDate).toLocaleDateString()}
                        </VSCodeDataGridCell>
                        <VSCodeDataGridCell grid-column="6">
                            {new Date(pr.lastActivity.date).toLocaleString()}
                        </VSCodeDataGridCell>
                    </VSCodeDataGridRow>
                ))}
            </VSCodeDataGrid>
        )}
    </div>
);

export default PRTab;
