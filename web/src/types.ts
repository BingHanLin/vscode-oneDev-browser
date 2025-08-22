// PullRequest and Issue types
export interface PullRequest {
    number: number;
    title: string;
    description: string;
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
    status: string;
}

export interface Issue {
    number: number;
    title: string;
    description: string;
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

// Build type for BuildTab
export interface Build {
    number: number;
    name: string;
    branch: string;
    commitHash?: string;
    status: string;
    startDate?: string;
    duration?: number; // seconds
    log?: string;
}
