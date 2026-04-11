import React from "react";

/**
 * Returns a relative time string like "2 hours ago", "3 days ago", etc.
 */
export function timeAgo(dateStr: string): string {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    if (isNaN(then)) { return dateStr; }
    const seconds = Math.floor((now - then) / 1000);
    if (seconds < 60) { return "just now"; }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) { return `${minutes}m ago`; }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) { return `${hours}h ago`; }
    const days = Math.floor(hours / 24);
    if (days < 30) { return `${days}d ago`; }
    const months = Math.floor(days / 30);
    if (months < 12) { return `${months}mo ago`; }
    const years = Math.floor(months / 12);
    return `${years}y ago`;
}

const statusColors: Record<string, { bg: string; fg: string }> = {
    // PR statuses
    open: { bg: "#2ea04370", fg: "#3fb950" },
    closed: { bg: "#da363470", fg: "#f85149" },
    merged: { bg: "#8957e570", fg: "#a371f7" },
    discarded: { bg: "#da363470", fg: "#f85149" },
    // Build statuses
    successful: { bg: "#2ea04370", fg: "#3fb950" },
    failed: { bg: "#da363470", fg: "#f85149" },
    running: { bg: "#388bfd70", fg: "#58a6ff" },
    pending: { bg: "#d2992270", fg: "#e3b341" },
    waiting: { bg: "#d2992270", fg: "#e3b341" },
    cancelled: { bg: "#848d9770", fg: "#8b949e" },
    timed_out: { bg: "#da363470", fg: "#f85149" },
};

/**
 * Renders a colored status badge for PR/Issue/Build statuses.
 */
export function StatusBadge({ status }: { status: string }) {
    const key = status?.toLowerCase().replace(/\s+/g, "_") || "";
    const colors = statusColors[key] || { bg: "#848d9770", fg: "#8b949e" };
    return (
        <span
            style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: colors.bg,
                color: colors.fg,
                lineHeight: "18px",
                whiteSpace: "nowrap",
            }}
        >
            {status}
        </span>
    );
}

/**
 * Renders a spinning loader.
 */
export function Spinner({ size = 20 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={{ animation: "spin 1s linear infinite", display: "inline-block", verticalAlign: "middle" }}
        >
            <circle cx="12" cy="12" r="10" stroke="var(--vscode-foreground, #888)" strokeWidth="3" fill="none" opacity="0.25" />
            <path d="M12 2 A10 10 0 0 1 22 12" stroke="var(--vscode-focusBorder, #007acc)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
    );
}

/**
 * Loading state component for tables.
 */
export function LoadingState({ message = "Loading..." }: { message?: string }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 200, gap: 12, color: "var(--vscode-descriptionForeground, #888)" }}>
            <Spinner size={28} />
            <span>{message}</span>
        </div>
    );
}

/**
 * Empty state component for tables.
 */
export function EmptyState({ icon, title, subtitle }: { icon?: string; title: string; subtitle?: string }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 200, gap: 8, color: "var(--vscode-descriptionForeground, #888)" }}>
            {icon && <span style={{ fontSize: 32 }}>{icon}</span>}
            <span style={{ fontSize: 14, fontWeight: 500 }}>{title}</span>
            {subtitle && <span style={{ fontSize: 12 }}>{subtitle}</span>}
        </div>
    );
}
