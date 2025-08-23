import React, { useState, useRef, useEffect } from "react";
import {
    VSCodeButton,
    VSCodeDropdown,
    VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";
import GenericTable, { TableColumn } from "./GenericTable";
import { ExternalLinkIcon } from "./Icons";
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
            b.jobName?.toLowerCase().includes(keyword.toLowerCase())
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
    // Use shared ExternalLinkIcon

    // Table columns config for GenericTable
    const columns: TableColumn<Build>[] = [
        {
            title: "Number",
            dataIndex: "number",
            width: 80,
        },
        {
            title: "Job Name",
            dataIndex: "jobName",
            render: (value, b) => (
                <span>
                    {highlightKeyword(value, keyword)}
                    <a
                        href={`${url}/${projectPath}/~builds/${b.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in oneDev"
                        style={{ color: "#0078d4", textDecoration: "none" }}
                    >
                        <ExternalLinkIcon size={14} />
                    </a>
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            width: 90,
        },
    ];
    return (
        <div style={{ display: "flex", height: "100vh", minHeight: 0 }}>
            {/* Left: Build list */}
            <div
                style={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                }}
            >
                {/* Controls area: always fixed above the table, not affected by table scroll */}
                <div
                    className="flex justify-end mb-4 gap-2"
                    style={{ flexShrink: 0 }}
                >
                    {" "}
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
                {/* Table area: scrollable, controls above will not move when scrolling horizontally */}
                <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
                    {isLoading && builds.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            Loading...
                        </div>
                    ) : filteredBuilds.length === 0 ? (
                        <p>No builds found.</p>
                    ) : (
                        <>
                            <GenericTable
                                columns={columns}
                                data={pagedBuilds}
                                rowKey={(b) => b.number}
                                onRowClick={(b) =>
                                    setSelectedBuildLocal(b.number)
                                }
                                selectedRowKey={selectedBuildLocal}
                                ariaLabel="Builds"
                            />
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
                    // runningDuration: format as 'X hours Y minutes Z seconds', omit zero units, up to hours
                    console.log(
                        "BuildTab debug: runningDuration(raw)",
                        b.runningDuration,
                        b
                    );
                    let runningDuration = "-";
                    if (b.runningDuration != null) {
                        if (b.runningDuration < 1000) {
                            runningDuration = `${b.runningDuration} ms`;
                        } else {
                            let seconds = Math.floor(b.runningDuration / 1000);
                            const hours = Math.floor(seconds / 3600);
                            seconds = seconds % 3600;
                            const minutes = Math.floor(seconds / 60);
                            seconds = seconds % 60;
                            const parts = [];
                            if (hours > 0)
                                parts.push(
                                    `${hours} hour${hours > 1 ? "s" : ""}`
                                );
                            if (minutes > 0)
                                parts.push(
                                    `${minutes} minute${minutes > 1 ? "s" : ""}`
                                );
                            if (seconds > 0 || parts.length === 0)
                                parts.push(
                                    `${seconds} second${
                                        seconds !== 1 ? "s" : ""
                                    }`
                                );
                            runningDuration = parts.join(" ");
                        }
                    }
                    // finishDate: use b.finishDate if present
                    let finishDate = "-";
                    if (b.finishDate) {
                        const d = new Date(b.finishDate);
                        if (!isNaN(d.getTime())) {
                            finishDate = d.toLocaleString();
                        }
                    }
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
                                {b.jobName}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Number:
                                </span>
                                {b.number}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Status:
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
                                    Running Duration:
                                </span>
                                {runningDuration}
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontWeight: 500,
                                        color: "#666",
                                        marginRight: 6,
                                    }}
                                >
                                    Finish Date:
                                </span>
                                {finishDate}
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default BuildTab;
