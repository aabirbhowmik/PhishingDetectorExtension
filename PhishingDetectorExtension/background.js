chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
        // Inject content script to analyze page content
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyzeContent" && sender.tab) {
        const tab = sender.tab;
        const url = tab.url;
        const contentFeatures = message.data;

        const urlAnalysis = analyzeUrl(url);

        let totalScore = urlAnalysis.score + contentFeatures.score;
        let threats = urlAnalysis.threats.concat(contentFeatures.threats);
        
        totalScore = Math.min(totalScore, 100);

        let status = 'safe';
        if (totalScore > 60) {
            status = 'danger';
        } else if (totalScore > 30) {
            status = 'suspicious';
        }

        const result = {
            score: totalScore,
            status: status,
            threats: threats
        };

        chrome.storage.local.set({ [tab.id.toString()]: result }, () => {
            console.log(`Analysis for ${url} saved with score ${totalScore}`);
        });
    }
});

function analyzeUrl(url) {
    let score = 0;
    let threats = [];
    const urlObj = new URL(url);

    if (url.length > 75) {
        score += 15;
        threats.push("URL is unusually long.");
    }

    const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    if (ipRegex.test(urlObj.hostname)) {
        score += 30;
        threats.push("URL uses an IP address instead of a domain name.");
    }

    if (url.includes("@")) {
        score += 20;
        threats.push("URL contains an '@' symbol, which can be misleading.");
    }

    const dots = (urlObj.hostname.match(/\./g) || []).length;
    if (dots > 3) {
        score += 15;
        threats.push("URL has an excessive number of subdomains (dots).");
    }

    if (urlObj.protocol !== "https:") {
        score += 25;
        threats.push("Connection is not secure (not HTTPS).");
    }

    const sensitiveWords = ["secure", "login", "signin", "account", "verify", "password", "update"];
    const hasSensitiveWord = sensitiveWords.some(word => url.toLowerCase().includes(word));
    if (hasSensitiveWord) {
        score += 10;
        threats.push("URL contains sensitive keywords (e.g., 'login', 'secure').");
    }

    return { score, threats };
}