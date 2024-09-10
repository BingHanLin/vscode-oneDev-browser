import * as vscode from "vscode";
import fetch from "node-fetch";
import { Credentials } from "./types";

export async function fetchProjectId(
    credentials: Credentials
): Promise<number> {
    const apiUrl = `${credentials.url}/~api/projects`;
    const queryParams = new URLSearchParams({
        query: `"Path" is "${credentials.projectPath}"`,
        offset: "0",
        count: "100",
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);

    const projects = await response.json();
    if (projects && projects.length > 0) {
        return projects[0].id;
    } else {
        throw new Error("No projects found with the given name.");
    }
}

export async function fetchPullRequests(
    message: Credentials,
    panel: vscode.WebviewPanel
) {
    try {
        const apiUrl = `${message.url}/~api/pulls`;
        const queryParams = new URLSearchParams({
            query: `"Source Project" is "${message.projectPath}" and open and to be reviewed by me`,
            offset: "0",
            count: "100",
        });
        const response = await makeApiRequest(apiUrl, queryParams, message);

        const pullRequests = await response.json();
        panel.webview.postMessage({
            command: "setPullRequests",
            pullRequests: pullRequests.map((pr: any) => ({
                number: pr.number,
                title: pr.title,
                targetBranch: pr.targetBranch,
                sourceBranch: pr.sourceBranch,
                submitterId: pr.submitterId,
                submitDate: pr.submitDate,
                lastActivity: pr.lastActivity,
                commentCount: pr.commentCount,
                state: pr.state,
            })),
        });
    } catch (error) {
        if (error instanceof Error) {
            panel.webview.postMessage({
                command: "showErrorMessage",
                message: `Error fetching pull requests: ${error.message}`,
            });
        } else {
            panel.webview.postMessage({
                command: "showErrorMessage",
                message: `Error fetching pull requests: ${error}`,
            });
        }
    }
}

export async function fetchIssues(
    message: Credentials,
    panel: vscode.WebviewPanel
) {
    try {
        const apiUrl = `${message.url}/~api/issues`;
        const queryParams = new URLSearchParams({
            query: `"Project" is "${message.projectPath}"`,
            offset: "0",
            count: "100",
        });
        const response = await makeApiRequest(apiUrl, queryParams, message);

        const issues = await response.json();
        panel.webview.postMessage({
            command: "setIssues",
            issues: issues.map((issue: any) => ({
                number: issue.number,
                title: issue.title,
                state: issue.state,
                submitterId: issue.submitterId,
                submitDate: issue.submitDate,
                lastActivity: issue.lastActivity,
                commentCount: issue.commentCount,
            })),
        });
    } catch (error) {
        if (error instanceof Error) {
            panel.webview.postMessage({
                command: "showErrorMessage",
                message: `Error fetching issues: ${error.message}`,
            });
        } else {
            panel.webview.postMessage({
                command: "showErrorMessage",
                message: `Error fetching issues: ${error}`,
            });
        }
    }
}

async function makeApiRequest(
    apiUrl: string,
    queryParams: URLSearchParams,
    credentials: Credentials
) {
    const response = await fetch(`${apiUrl}?${queryParams}`, {
        method: "GET",
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(
                    `${credentials.email}:${credentials.token}`
                ).toString("base64"),
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
}
