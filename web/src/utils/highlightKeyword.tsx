import React from "react";

/**
 * Highlight the keyword in the given text (case-insensitive), returns an array of ReactNode.
 * @param text The original string
 * @param keyword The keyword to highlight
 */
export function highlightKeyword(
    text: string,
    keyword: string
): React.ReactNode {
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
