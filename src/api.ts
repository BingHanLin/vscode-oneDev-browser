
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

export async function fetchPullRequests(credentials: Credentials): Promise<any[]> {
    const apiUrl = `${credentials.url}/~api/pulls`;
    const queryParams = new URLSearchParams({
        query: "",
        offset: "0",
        count: "20",
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    return await response.json();
}

export async function fetchIssues(credentials: Credentials): Promise<any[]> {
    const apiUrl = `${credentials.url}/~api/issues`;
    const queryParams = new URLSearchParams({
        query: `"Project" is "${credentials.projectPath}"`,
        offset: "0",
        count: "20",
    });
    const response = await makeApiRequest(apiUrl, queryParams, credentials);
    return await response.json();
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
