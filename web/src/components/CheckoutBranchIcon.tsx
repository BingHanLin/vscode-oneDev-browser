import React from "react";

/**
 * A shared checkout branch icon for use in PRTab.
 * @param size Icon size in px (default: 16)
 * @param style Additional style props
 */
const CheckoutBranchIcon: React.FC<{
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

export default CheckoutBranchIcon;
