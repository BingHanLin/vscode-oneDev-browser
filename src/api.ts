
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
    credentials: Credentials,
    offset: number = 0,
    count: number = 20
): Promise<any[]> {
    console.log('[api] fetchPullRequests called', credentials, { offset, count });
    const apiUrl = `${credentials.url}/~api/pulls`;
    const queryParams = new URLSearchParams({
        query: `"Target Project" is "${credentials.projectPath}"`,
        offset: offset.toString(),
        count: count.toString(),
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    const json = await response.json();
    console.log('[api] fetchPullRequests response', json);
    return json;
}

export async function fetchIssues(
    credentials: Credentials,
    offset: number = 0,
    count: number = 20
): Promise<any[]> {
    console.log('[api] fetchIssues called', credentials, { offset, count });
    const apiUrl = `${credentials.url}/~api/issues`;
    const queryParams = new URLSearchParams({
        query: `"Project" is "${credentials.projectPath}"`,
        offset: offset.toString(),
        count: count.toString(),
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    const json = await response.json();
    console.log('[api] fetchIssues response', json);
    return json;
}

export async function fetchBuilds(credentials: Credentials): Promise<any[]> {
    const apiUrl = `${credentials.url}/~api/builds`;
    const queryParams = new URLSearchParams({
        query: `"Project" is "${credentials.projectPath}"`,
        offset: "0",
        count: "20",
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    return await response.json();
}

async function makeApiRequest(
    apiUrl: string,
    queryParams: URLSearchParams,
    credentials: Credentials
) {
    console.log('[api] makeApiRequest', apiUrl, queryParams.toString(), credentials);
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
    console.log('[api] makeApiRequest response status', response.status);
    if (!response.ok) {
        const text = await response.text();
        console.error(`[api] HTTP error! status: ${response.status}, body:`, text);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}
