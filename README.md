Phishing Detector Browser Extension 🛡️

A lightweight, real-time browser extension that detects potential phishing websites using client-side heuristic analysis. This project analyzes URL characteristics and page content to calculate a risk score without sending your browsing history to external servers.

📖 Project Overview

Phishing Detector is designed to provide an immediate "first line of defense" against zero-day phishing attacks. Unlike traditional blacklists that rely on a database of known threats, this extension evaluates the behavior and structure of a webpage to determine if it is suspicious.

Key Features

Real-time Analysis: Scans every page immediately upon load.

Privacy First: All analysis happens locally on your device. No URLs are sent to the cloud.

Heuristic Detection: Uses a weighted scoring system based on common phishing tactics (e.g., IP addresses in URLs, password fields on HTTP).

Visual Risk Assessment: Simple "Traffic Light" system (Green/Yellow/Red) to indicate safety.

🛠️ Tech Stack

Platform: Google Chrome Extension (Manifest V3)

Languages: HTML5, CSS3, JavaScript (ES6+)

Architecture: Service Worker (background.js), Content Script (content.js), Popup UI.

🚀 Installation Guide

Since this is a developer project, you will need to load it into Chrome manually.

Clone or Download this repository to your local machine.

Open Google Chrome and navigate to chrome://extensions.

Toggle "Developer mode" in the top-right corner.

Click the "Load unpacked" button.

Select the folder where you saved the project files (e.g., PhishingDetectorExtension).

The extension is now active! 🕵️

🧠 How It Works (The Scoring Model)

The extension calculates a risk score (0-100) based on specific "red flags" found on the page.

Thresholds

🟢 0 - 30: Safe

🟡 31 - 60: Suspicious

🔴 61+: Dangerous

Heuristic Rules

Component

Rule

Weight

Reason

Background

IP Address in URL

+30

Legitimate sites rarely use raw IPs (e.g., 192.168...).

Background

No HTTPS

+25

Secure sites should always use SSL/TLS.

Content

Password Field

+25

High risk if combined with other flags (like No HTTPS).

Background

"@" Symbol

+20

Often used to obfuscate the real domain.

Background

Length > 75

+15

Long URLs try to hide the domain in the address bar.

Background

Subdomains > 3

+15

E.g., login.paypal.com.secure.update.net.

Background

Keywords

+10

Presence of "login", "secure", "verify", etc.

Content

iFrames

+10

Can be used to embed malicious forms invisibly.

📂 Project Structure

PhishingDetectorExtension/
├── manifest.json       # Configuration and permissions
├── background.js       # Service worker for URL analysis
├── content.js          # Script injected into pages for DOM analysis
├── popup.html          # Extension popup UI structure
├── popup.css           # Styling for the popup
├── popup.js            # Logic for displaying results
└── icons/              # App icons


⚠️ Disclaimer

This tool is a heuristic analyzer. It is not 100% perfect.

False Positives: A poorly designed legitimate website might be flagged as "Suspicious."

False Negatives: A highly sophisticated phishing site might evade detection.

Always use your best judgment when entering sensitive information online.

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

📄 License

This project is open-source and available under the MIT License.
