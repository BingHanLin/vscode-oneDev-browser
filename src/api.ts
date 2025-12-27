import fetch from "node-fetch";
import { Credentials, PullRequest, Issue, Build, PullRequestChange } from "./types";


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

    // Construct query: "Target Project" is "..." AND (<user_query>)
    let filter = `"Target Project" is "${credentials.projectPath}"`;
    if (query) {
        filter = `${filter} AND (${query})`;
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
        filter = `${filter} AND (${query})`;
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
        filter = `${filter} AND (${query})`;
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

export async function fetchPullRequestChanges(
    credentials: Credentials,
    prId: number
): Promise<PullRequestChange[]> {
    const apiUrl = `${credentials.url}/~api/pulls/${prId}/changes`;
    const queryParams = new URLSearchParams();
    // Usually no query params needed for changes, but keeping structure
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    const json = await response.json();
    return json as PullRequestChange[];
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
        const text = await response.text();
        console.error(`[api] HTTP error! status: ${response.status}, body:`, text);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}
