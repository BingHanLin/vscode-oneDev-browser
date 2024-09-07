import React, { useState, useEffect } from "react";
import "./App.css";

import {
    VSCodeButton,
    VSCodeTextField,
    VSCodeDivider,
} from "@vscode/webview-ui-toolkit/react";

// Declare the vscode API
declare global {
    interface Window {
        acquireVsCodeApi: () => any;
    }
}

// Get the VS Code API
const vscode = window.acquireVsCodeApi();

interface PullRequest {
    id: number;
    title: string;
    targetBranch: string;
    sourceBranch: string;
}

function App() {
    const [activeTab, setActiveTab] = useState("settings");
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [projectPath, setProjectPath] = useState("");
    const [showToken, setShowToken] = useState(false);
    const [projectId, setProjectId] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

    useEffect(() => {
        window.addEventListener("message", handleMessage);
        vscode.postMessage({ command: "getCredentials" });
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    useEffect(() => {
        if (activeTab === "pr") {
            fetchPullRequests();
        }
    }, [activeTab]);

    useEffect(() => {
        if (message) {
            setTimeout(() => setShowMessage(true), 10);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleMessage = (event: MessageEvent) => {
        const message = event.data;
        switch (message.command) {
            case "setCredentials":
                setUrl(message.url);
                setEmail(message.email);
                setToken(message.token);
                setProjectPath(message.projectPath);
                break;
            case "setProjectId":
                setProjectId(message.projectId);
                break;
            case "showSuccessMessage":
                setMessage(message.message);
                setIsError(false);
                break;
            case "showErrorMessage":
                setMessage(message.message);
                setIsError(true);
                break;
            case "setPullRequests":
                setPullRequests(message.pullRequests);
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setProjectId(null);
        vscode.postMessage({
            command: "saveCredentials",
            url,
            email,
            token,
            projectPath,
        });
    };

    const toggleTokenVisibility = () => {
        setShowToken(!showToken);
    };

    const fetchPullRequests = () => {
        vscode.postMessage({
            command: "fetchPullRequests",
            url,
            email,
            token,
        });
    };

    const renderSettingsTab = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
                <label htmlFor="url" className="w-1/4">
                    oneDev URL:
                </label>
                <VSCodeTextField
                    id="url"
                    value={url}
                    onChange={(e) =>
                        setUrl((e.target as HTMLInputElement).value)
                    }
                    placeholder="https://your-onedev-instance.com"
                    className="w-3/4"
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="email" className="w-1/4">
                    Email:
                </label>
                <VSCodeTextField
                    id="email"
                    value={email}
                    onChange={(e) =>
                        setEmail((e.target as HTMLInputElement).value)
                    }
                    placeholder="user@example.com"
                    className="w-3/4"
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="token" className="w-1/4">
                    API Token:
                </label>
                <div className="w-3/4 flex">
                    <VSCodeTextField
                        id="token"
                        type={showToken ? "text" : "password"}
                        value={token}
                        onChange={(e) =>
                            setToken((e.target as HTMLInputElement).value)
                        }
                        placeholder="Your API token"
                        className="flex-grow"
                    />
                    <VSCodeButton
                        appearance="secondary"
                        onClick={toggleTokenVisibility}
                        className="ml-2"
                    >
                        {showToken ? "Hide" : "Show"}
                    </VSCodeButton>
                </div>
            </div>
            <div className="flex items-center">
                <label htmlFor="projectPath" className="w-1/4">
                    Project Path:
                </label>
                <VSCodeTextField
                    id="projectPath"
                    value={projectPath}
                    onChange={(e) =>
                        setProjectPath((e.target as HTMLInputElement).value)
                    }
                    placeholder="Your project path"
                    className="w-3/4"
                />
            </div>
            <VSCodeDivider />
            <div className="h-16 mb-4">
                {isError && message && (
                    <div
                        className={
                            "p-4 rounded bg-red-100 text-red-700 transition-opacity duration-500 ease-in-out " +
                            (showMessage ? "opacity-100" : "opacity-0")
                        }
                    >
                        {message}
                    </div>
                )}
                {!isError && message && projectId !== null && (
                    <div
                        className={
                            "p-4 rounded bg-green-100 text-green-700 transition-opacity duration-500 ease-in-out " +
                            (showMessage ? "opacity-100" : "opacity-0")
                        }
                    >
                        {message} Project ID: {projectId}
                    </div>
                )}
            </div>
            <div className="flex justify-end">
                <VSCodeButton type="submit">Save Credentials</VSCodeButton>
            </div>
        </form>
    );

    const renderPRTab = () => (
        <div>
            <h2 className="text-xl mb-4">Pull Requests</h2>
            {pullRequests.length === 0 ? (
                <p>No pull requests found.</p>
            ) : (
                <ul className="space-y-4">
                    {pullRequests.map((pr) => (
                        <li key={pr.id} className="border p-4 rounded">
                            <h3 className="font-bold">{pr.title}</h3>
                            <p>Target Branch: {pr.targetBranch}</p>
                            <p>Source Branch: {pr.sourceBranch}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">oneDev Browser</h1>
            <div className="tab-container">
                <button
                    className={`tab-button ${
                        activeTab === "pr" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("pr")}
                >
                    PR
                </button>
                <button
                    className={`tab-button ${
                        activeTab === "settings" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                >
                    Settings
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "pr" && renderPRTab()}
                {activeTab === "settings" && renderSettingsTab()}
            </div>
        </div>
    );
}

export default App;
