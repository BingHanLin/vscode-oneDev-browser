import React from "react";
import {
    VSCodeButton,
    VSCodeTextField,
    VSCodeDivider,
} from "@vscode/webview-ui-toolkit/react";

interface SettingsTabProps {
    url: string;
    email: string;
    token: string;
    projectPath: string;
    showToken: boolean;
    projectId: number | null;
    message: string;
    isError: boolean;
    showMessage: boolean;
    onUrlChange: (v: string) => void;
    onEmailChange: (v: string) => void;
    onTokenChange: (v: string) => void;
    onProjectPathChange: (v: string) => void;
    onToggleToken: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
    url,
    email,
    token,
    projectPath,
    showToken,
    projectId,
    message,
    isError,
    showMessage,
    onUrlChange,
    onEmailChange,
    onTokenChange,
    onProjectPathChange,
    onToggleToken,
    onSubmit,
}) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex items-center">
            <label htmlFor="url" className="w-1/4">
                oneDev URL:
            </label>
            <VSCodeTextField
                id="url"
                value={url}
                onChange={(e) =>
                    onUrlChange((e.target as HTMLInputElement).value)
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
                    onEmailChange((e.target as HTMLInputElement).value)
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
                        onTokenChange((e.target as HTMLInputElement).value)
                    }
                    placeholder="Your API token"
                    className="flex-grow"
                />
                <VSCodeButton
                    appearance="secondary"
                    onClick={onToggleToken}
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
                    onProjectPathChange((e.target as HTMLInputElement).value)
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

export default SettingsTab;
