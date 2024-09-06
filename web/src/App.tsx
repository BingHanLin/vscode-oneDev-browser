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

    useEffect(() => {
        // Add event listener for messages from the extension
        window.addEventListener("message", handleMessage);

        // Request initial data from the extension
        vscode.postMessage({ command: "getCredentials" });

        // Clean up the event listener
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const handleMessage = (event: MessageEvent) => {
        const message = event.data;
        switch (message.command) {
            case "setCredentials":
                setUrl(message.url);
                setEmail(message.email);
                setToken(message.token);
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        vscode.postMessage({
            command: "saveCredentials",
            url,
            email,
            token,
        });
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
                    <VSCodeTextField
                        id="token"
                        type="password"
                        value={token}
                        onChange={(e) =>
                            setToken((e.target as HTMLInputElement).value)
                        }
                        placeholder="Your API token"
                        className="w-3/4"
                    />
                </div>
                <VSCodeDivider />
                <div className="flex justify-end">
                    <VSCodeButton type="submit">Save Credentials</VSCodeButton>
                </div>
            </form>
        </div>
    );
}

export default App;
