import fetch, { RequestInit, Response } from "node-fetch";
import * as vscode from "vscode";
import { Credentials, PullRequest, Issue, Build, PullRequestChange } from "./types";
import { getConfigNumber } from "./utils/config";


export async function fetchCurrentBuilds(
    credentials: Credentials,
    requestId: number
): Promise<Build[]> {
    const apiUrl = `${credentials.url}/~api/pulls/${requestId}/current-builds`;
    const queryParams = new URLSearchParams();
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    const json = await response.json();
    return json as Build[];
}


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
    credentials: Credentials,
    offset: number = 0,
    count: number = 20,
    query?: string
): Promise<PullRequest[]> {
    const apiUrl = `${credentials.url}/~api/pulls`;

    // Construct query: "Target Project" is "..." and (<user_query>)
    let filter = `"Target Project" is "${credentials.projectPath}"`;
    if (query) {
        filter = `${filter} and (${query})`;
    }

    const queryParams = new URLSearchParams({
        query: filter,
        offset: offset.toString(),
        count: count.toString(),
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    const json = await response.json();
    return json as PullRequest[];
}

export async function fetchIssues(
    credentials: Credentials,
    offset: number = 0,
    count: number = 20,
    query?: string
): Promise<Issue[]> {
    const apiUrl = `${credentials.url}/~api/issues`;

    let filter = `"Project" is "${credentials.projectPath}"`;
    if (query) {
        filter = `${filter} and (${query})`;
    }

    const queryParams = new URLSearchParams({
        query: filter,
        offset: offset.toString(),
        count: count.toString(),
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    const json = await response.json();
    return json as Issue[];
}

export async function fetchBuilds(
    credentials: Credentials,
    offset: number = 0,
    count: number = 20,
    query?: string
): Promise<Build[]> {
    const apiUrl = `${credentials.url}/~api/builds`;

    let filter = `"Project" is "${credentials.projectPath}"`;
    if (query) {
        filter = `${filter} and (${query})`;
    }

    const queryParams = new URLSearchParams({
        query: filter,
        offset: offset.toString(),
        count: count.toString(),
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    const json = await response.json();
    return json as Build[];
}

export async function fetchFileContent(
    credentials: Credentials,
    projectId: number,
    blobId: string
): Promise<string> {
    const apiUrl = `${credentials.url}/~api/projects/${projectId}/blobs/${blobId}`;
    const queryParams = new URLSearchParams();
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    const text = await response.text();
    // OneDev might return base64 or raw text depending on API.
    // Assuming raw text or headers for now, will adjust during verification.
    return text;
}

export async function makeApiRequest(
    apiUrl: string,
    queryParams: URLSearchParams,
    credentials: Credentials,
    fetchFn: (url: string, init: RequestInit) => Promise<Response> = fetch as any
) {
    const config = vscode.workspace.getConfiguration("onedev-browser");
    const timeout = getConfigNumber(config, "requestTimeout") || 30000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetchFn(`${apiUrl}?${queryParams}`, {
            method: "GET",
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        `${credentials.email}:${credentials.token}`
                    ).toString("base64"),
            },
            signal: controller.signal as any,
        });
        if (!response.ok) {
            const text = await response.text();
            console.error(`[api] HTTP error! status: ${response.status}, body:`, text);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } finally {
        clearTimeout(timer);
    }
}
