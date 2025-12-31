import React from "react";
import {
    VSCodeDataGrid,
    VSCodeDataGridRow,
    VSCodeDataGridCell,
} from "@vscode/webview-ui-toolkit/react";

export interface TableColumn<T> {
    title: string;
    dataIndex: keyof T | string;
    render?: (value: unknown, record: T, rowIndex: number) => React.ReactNode;
    width?: number | string;
}

interface GenericTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    rowKey: (record: T) => React.Key;
    onRowClick?: (record: T, rowIndex: number) => void;
    selectedRowKey?: React.Key | null;
    ariaLabel?: string;
}

function GenericTable<T>({
    columns,
    data,
    rowKey,
    onRowClick,
    selectedRowKey,
    ariaLabel,
}: GenericTableProps<T>) {
    return (
        <VSCodeDataGrid aria-label={ariaLabel || "Table"}>
            <VSCodeDataGridRow row-type="header">
                {columns.map((col, idx) => (
                    <VSCodeDataGridCell
                        key={col.dataIndex as string}
                        cell-type="columnheader"
                        grid-column={idx + 1}
                        style={col.width ? { width: col.width } : {}}
                    >
                        {col.title}
                    </VSCodeDataGridCell>
                ))}
            </VSCodeDataGridRow>
            {data.map((record, rowIdx) => {
                const selected = selectedRowKey === rowKey(record);
                const rowStyle = Object.assign(
                    {},
                    selected
                        ? {
                              background:
                                  "var(--vscode-list-activeSelectionBackground)",
                              color: "var(--vscode-list-activeSelectionForeground)",
                          }
                        : {},
                    {
                        borderRadius: 6,
                        marginBottom: 4,
                        cursor: onRowClick ? "pointer" : undefined,
                        transition: "background 0.15s",
                    }
                );
                return (
                    <VSCodeDataGridRow
                        key={rowKey(record)}
                        className={selected ? "vscode-selected-row" : ""}
                        style={rowStyle}
                        onClick={
                            onRowClick
                                ? () => onRowClick(record, rowIdx)
                                : undefined
                        }
                    >
                        {columns.map((col, colIdx) => {
                            const value =
                                typeof col.dataIndex === "string"
                                    ? (record as Record<string, unknown>)[
                                          col.dataIndex
                                      ]
                                    : record[col.dataIndex];
                            return (
                                <VSCodeDataGridCell
                                    key={col.dataIndex as string}
                                    grid-column={colIdx + 1}
                                >
                                    {col.render
                                        ? col.render(value, record, rowIdx)
                                        : (value as React.ReactNode)}
                                </VSCodeDataGridCell>
                            );
                        })}
                    </VSCodeDataGridRow>
                );
            })}
        </VSCodeDataGrid>
    );
}

export default GenericTable;
