import * as vscode from "vscode";
import { fetchPullRequests } from "./api";

export class PRsWebviewViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = "onedevPRsView";
    private _view?: vscode.WebviewView;

    constructor(private readonly context: vscode.ExtensionContext) { }

    async resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true
        };
        // Fetch PRs
        const config = vscode.workspace.getConfiguration("onedev-browser");
        const creds = {
            url: config.get("url", ""),
            email: config.get("email", ""),
            token: config.get("token", ""),
            projectPath: config.get("projectPath", "")
        };
        let prs: any[] = [];
        try {
            prs = await fetchPullRequests(creds);
        } catch (e) {
            prs = [];
        }
        webviewView.webview.html = this.getHtml(prs);
    }

    getHtml(prs: any[]): string {
        // 將 PRs 資料序列化給前端
        const prJson = JSON.stringify(prs);
        return (
            '<!DOCTYPE html>' +
            '<html>' +
            '<body style="font-family: var(--vscode-font-family);">' +
            '    <input id="search" type="text" placeholder="Search PRs..." style="width: 98%; margin-bottom: 8px;" />' +
            '    <ul id="pr-list" style="padding-left: 0;"></ul>' +
            '    <script>' +
            '    const allPRs = ' + prJson + ';' +
            '    function renderList(prs) {' +
            '      const ul = document.getElementById("pr-list");' +
            '      ul.innerHTML = prs.map(function(pr) {' +
            '        return "<li style=\'list-style:none; margin-bottom:4px; border-bottom:1px solid #eee; padding:2px 0;\'><b>#" + pr.number + "</b> " + pr.title + "<br><small>" + (pr.state || "") + " | " + (pr.submitterId || "") + " | " + (pr.submitDate ? new Date(pr.submitDate).toLocaleString() : "") + "</small></li>";' +
            '      }).join("");' +
            '    }' +
            '    renderList(allPRs);' +
            '    document.getElementById("search").addEventListener("input", function() {' +
            '      const keyword = this.value.trim().toLowerCase();' +
            '      const filtered = allPRs.filter(function(pr) {' +
            '        return (String(pr.number).includes(keyword) ||' +
            '         (pr.title && pr.title.toLowerCase().includes(keyword)) ||' +
            '         (pr.state && pr.state.toLowerCase().includes(keyword)) ||' +
            '         (pr.submitterId && String(pr.submitterId).includes(keyword))' +
            '        );' +
            '      });' +
            '      renderList(filtered);' +
            '    });' +
            '    </script>' +
            '</body>' +
            '</html>'
        );
    }
}
