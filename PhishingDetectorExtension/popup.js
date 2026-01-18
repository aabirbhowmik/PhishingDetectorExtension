document.addEventListener('DOMContentLoaded', () => {
    // Query for the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (!activeTab || !activeTab.id) {
            console.error("Could not get active tab.");
            updateUI(null, null);
            return;
        }

        const tabId = activeTab.id;

        // Get the analysis result from storage for this tab
        chrome.storage.local.get(tabId.toString(), (result) => {
            const analysis = result[tabId];
            updateUI(analysis, activeTab.url);
        });
    });
});

function updateUI(analysis, url) {
    const statusCard = document.getElementById('status-card');
    const statusIcon = document.getElementById('status-icon');
    const statusTitle = document.getElementById('status-title');
    const statusUrl = document.getElementById('status-url');
    const riskScoreEl = document.getElementById('risk-score');
    const threatsList = document.getElementById('threats-list');

    // Default state
    statusCard.className = 'status-card analyzing';
    statusTitle.textContent = 'Analyzing...';
    statusUrl.textContent = url ? new URL(url).hostname : 'No URL found';
    riskScoreEl.textContent = 'N/A';
    threatsList.innerHTML = '';
    statusIcon.innerHTML = getIconSVG('analyzing');


    if (!analysis) {
        statusTitle.textContent = 'No analysis data';
        statusUrl.textContent = 'Please reload the page.';
        return;
    }
    
    // Update UI based on analysis result
    const { score, status, threats } = analysis;
    
    statusCard.className = `status-card ${status}`;
    statusTitle.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    statusIcon.innerHTML = getIconSVG(status);
    riskScoreEl.textContent = `${score}/100`;

    if (threats && threats.length > 0) {
        threats.forEach(threat => {
            const li = document.createElement('li');
            li.textContent = threat;
            threatsList.appendChild(li);
        });
    } else if (status === 'safe') {
        const li = document.createElement('li');
        li.textContent = 'No immediate threats detected.';
        threatsList.appendChild(li);
    }
}

function getIconSVG(status) {
    switch (status) {
        case 'safe':
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
        case 'suspicious':
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
        case 'danger':
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
        default: // analyzing
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>`;
    }
}