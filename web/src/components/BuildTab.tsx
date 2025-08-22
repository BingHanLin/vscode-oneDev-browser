import React, { useState, useRef, useEffect } from "react";
import {
    VSCodeButton,
    VSCodeDropdown,
    VSCodeOption,
    VSCodeDataGrid,
    VSCodeDataGridCell,
    VSCodeDataGridRow,
} from "@vscode/webview-ui-toolkit/react";
// TODO: Replace with actual Build type definition
import { Build } from "../types";
import { highlightKeyword } from "../utils/highlightKeyword";

interface BuildTabProps {
    builds: Build[];
    buildSort: string;
    isLoading: boolean;
    url: string;
    projectPath: string;
    onReload: () => void;
    onSortChange: (sort: string) => void;
    sortBuilds: (builds: Build[]) => Build[];
    loadMoreBuilds: () => void;
    hasMoreBuilds: boolean;
    vscode?: { postMessage: (message: any) => void };
    selectedBuild?: number | null;
}

const BuildTab: React.FC<BuildTabProps> = ({
    builds,
    buildSort,
    isLoading,
    url,
    projectPath,
    onReload,
    onSortChange,
    sortBuilds,
    loadMoreBuilds,
    hasMoreBuilds,
    vscode,
    selectedBuild: selectedBuildProp,
}) => {
    const [selectedBuildLocal, setSelectedBuildLocal] = useState<number | null>(
        selectedBuildProp ?? null
    );
    useEffect(() => {
        setSelectedBuildLocal(selectedBuildProp ?? null);
    }, [selectedBuildProp]);
    const [keyword, setKeyword] = useState("");
    const [stateFilter, setStateFilter] = useState<string>("all");
    const allStates = Array.from(new Set(builds.map((b) => b.status))).sort();
    const filteredBuilds = builds.filter(
        (b) =>
            (stateFilter === "all" || b.status === stateFilter) &&
            (b.name?.toLowerCase().includes(keyword.toLowerCase()) ||
                false ||
                b.branch?.toLowerCase().includes(keyword.toLowerCase()) ||
                false ||
                b.commitHash?.toLowerCase().includes(keyword.toLowerCase()) ||
                false)
    );
    const pagedBuilds = sortBuilds(filteredBuilds);
    const loadMoreWrapperRef = useRef<HTMLDivElement | null>(null);
    const [pendingScroll, setPendingScroll] = useState(false);
    useEffect(() => {
        if (pendingScroll && loadMoreWrapperRef.current) {
            loadMoreWrapperRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            setPendingScroll(false);
        }
    }, [builds, pendingScroll]);
    // Listen for build actions (success/error), ask extension to show VS Code notification
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            const { command, message } = event.data || {};
            if (
                (command === "rebuildSuccess" || command === "rebuildError") &&
                vscode
            ) {
                vscode.postMessage({
                    command:
                        command === "rebuildSuccess"
                            ? "showInfoMessage"
                            : "showErrorMessage",
                    message:
                        message ||
                        (command === "rebuildSuccess"
                            ? "Build triggered successfully."
                            : "Failed to trigger build."),
                });
            }
        }
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [vscode]);
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
            {/* Left: Build list */}
            <div
                style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 8 }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Builds</h2>
                    <VSCodeButton onClick={onReload}>Reload</VSCodeButton>
                </div>
                <div className="flex justify-end mb-4 gap-2">
                    <input
                        type="text"
                        placeholder="Search Builds..."
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
                        value={buildSort}
                        onChange={(e) =>
                            onSortChange((e.target as HTMLSelectElement).value)
                        }
                    >
                        <VSCodeOption value="newest">Newest First</VSCodeOption>
                        <VSCodeOption value="oldest">Oldest First</VSCodeOption>
                        <VSCodeOption value="longest">
                            Longest Duration
                        </VSCodeOption>
                        <VSCodeOption value="shortest">
                            Shortest Duration
                        </VSCodeOption>
                    </VSCodeDropdown>
                </div>
                {isLoading && builds.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        Loading...
                    </div>
                ) : filteredBuilds.length === 0 ? (
                    <p>No builds found.</p>
                ) : (
                    <>
                        <VSCodeDataGrid aria-label="Builds">
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
                                    Job Name
                                </VSCodeDataGridCell>
                                <VSCodeDataGridCell
                                    cell-type="columnheader"
                                    grid-column="3"
                                >
                                    Status
                                </VSCodeDataGridCell>
                            </VSCodeDataGridRow>
                            {pagedBuilds.map((b) => (
                                <VSCodeDataGridRow
                                    key={b.number}
                                    className={
                                        selectedBuildLocal === b.number
                                            ? "vscode-selected-row"
                                            : ""
                                    }
                                    style={
                                        selectedBuildLocal === b.number
                                            ? {
                                                  background:
                                                      "var(--vscode-list-activeSelectionBackground)",
                                                  color: "var(--vscode-list-activeSelectionForeground)",
                                              }
                                            : {}
                                    }
                                    onClick={() =>
                                        setSelectedBuildLocal(b.number)
                                    }
                                >
                                    <VSCodeDataGridCell grid-column="1">
                                        {b.number}
                                    </VSCodeDataGridCell>
                                    <VSCodeDataGridCell grid-column="2">
                                        <span>
                                            {highlightKeyword(
                                                b.jobName,
                                                keyword
                                            )}
                                        </span>
                                        <a
                                            href={`${url}/${projectPath}/~builds/${b.number}`}
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
                                        {b.status}
                                    </VSCodeDataGridCell>
                                </VSCodeDataGridRow>
                            ))}
                        </VSCodeDataGrid>
                        {hasMoreBuilds && (
                            <div
                                className="flex justify-center my-4"
                                ref={loadMoreWrapperRef}
                            >
                                <VSCodeButton
                                    onClick={() => {
                                        setPendingScroll(true);
                                        loadMoreBuilds();
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
                    const b = builds.find(
                        (x) => x.number === selectedBuildLocal
                    );
                    if (!b)
                        return (
                            <div
                                style={{
                                    color: "#888",
                                    marginTop: 32,
                                    textAlign: "center",
                                }}
                            >
                                Please select a build
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
                                {b.name}
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
                                {b.status}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Branch:
                                </span>
                                {b.branch}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Commit:
                                </span>
                                {b.commitHash}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Started:
                                </span>
                                {b.startDate &&
                                    new Date(b.startDate).toLocaleString()}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Duration:
                                </span>
                                {b.duration != null ? `${b.duration} s` : "-"}
                            </div>
                            {b.log && (
                                <div
                                    style={{
                                        color: "var(--vscode-foreground)",
                                        fontSize: 15,
                                        marginTop: 16,
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {b.log}
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default BuildTab;
