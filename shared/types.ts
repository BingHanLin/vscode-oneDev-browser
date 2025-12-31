// Shared types for both extension and webview
export interface PullRequest {
    id: number;
    number: number;
    title: string;
    description?: string;
    targetBranch: string;
    sourceBranch: string;
    submitterId: number;
    submitDate: string;
    lastActivity: {
        userId: number;
        date: string;
        description: string;
    };
    commentCount: number;
    state?: string;
    baseCommitHash: string;
    buildCommitHash: string;
    status?: string;
}

export interface Issue {
    number: number;
    title: string;
    description?: string;
    state: string;
    submitterId: number;
    submitDate: string;
    lastActivity: {
        userId: number;
        date: string;
        description: string;
    };
    commentCount: number;
}

export interface Build {
    number: number;
    jobName: string;
    status: string;
    runningDuration?: number;
    finishDate?: string;
    startDate?: string;
    duration?: number;
}

export interface PullRequestChange {
    type: "ADD" | "MODIFY" | "DELETE" | "RENAME";
    path: string;
    oldPath?: string;
    blobId?: string;
    oldBlobId?: string;
}

export interface Credentials {
    url: string;
    email: string;
    token: string;
    projectPath: string;
}
