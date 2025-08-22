import React from "react";

/**
 * A shared external link icon for use in tables and detail panels.
 * @param size Icon size in px (default: 14)
 * @param style Additional style props
 */
export const ExternalLinkIcon: React.FC<{
    size?: number;
    style?: React.CSSProperties;
}> = ({ size = 14, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        style={{
            marginLeft: 4,
            verticalAlign: "middle",
            cursor: "pointer",
            ...style,
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

/**
 * A shared checkout branch icon for use in PRTab.
 * @param size Icon size in px (default: 16)
 * @param style Additional style props
 */
export const CheckoutBranchIcon: React.FC<{
    size?: number;
    style?: React.CSSProperties;
}> = ({ size = 16, style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        style={{
            display: "inline",
            verticalAlign: "middle",
            ...style,
        }}
    >
        <path
            d="M10 2v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M6 12l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
