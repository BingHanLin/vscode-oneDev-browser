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

function App() {
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [projectName, setProjectName] = useState("");
    const [showToken, setShowToken] = useState(false);
    const [projectId, setProjectId] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        window.addEventListener("message", handleMessage);
        vscode.postMessage({ command: "getCredentials" });
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    useEffect(() => {
        if (message) {
            // Short delay for fade-in effect
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
                setProjectName(message.projectName);
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
            projectName,
        });
    };

    const toggleTokenVisibility = () => {
        setShowToken(!showToken);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">oneDev Credentials</h1>
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
                    <label htmlFor="projectName" className="w-1/4">
                        Project Name:
                    </label>
                    <VSCodeTextField
                        id="projectName"
                        value={projectName}
                        onChange={(e) =>
                            setProjectName((e.target as HTMLInputElement).value)
                        }
                        placeholder="Your project name"
                        className="w-3/4"
                    />
                </div>
                <VSCodeDivider />
                <div className="h-16 mb-4">
                    {" "}
                    {/* Fixed height container for messages */}
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
        </div>
    );
}

export default App;
