function analyzePageContent() {
    let score = 0;
    let threats = [];

    const passwordInputs = document.querySelectorAll('input[type="password"]');
    if (passwordInputs.length > 0) {
        score += 25;
        threats.push("This page contains a password field.");
    }
    const iframes = document.getElementsByTagName('iframe');
    if (iframes.length > 0) {
        score += 10;
        threats.push(`Page contains ${iframes.length} iframe(s), which can hide content.`);
    }

    chrome.runtime.sendMessage({
        action: "analyzeContent",
        data: {
            score: score,
            threats: threats
        }
    });
}

analyzePageContent();