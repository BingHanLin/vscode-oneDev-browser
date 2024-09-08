export interface Credentials {
    url: string;
    email: string;
    token: string;
    projectPath: string;
}

export interface PullRequest {
    number: number;
    title: string;
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
    state: string;
}

export interface Issue {
    number: number;
    title: string;
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
