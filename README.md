# 🛡️ Phishing Detector Browser Extension

![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue?style=for-the-badge&logo=google-chrome)
![Language](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript)
![Status](https://img.shields.io/badge/Status-Active_Development-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)

> **A real-time, client-side browser extension that analyzes websites for phishing threats using heuristic algorithms.**

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [How It Works (The Logic)](#-how-it-works-the-logic)
- [Installation Guide](#-installation-guide)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Future Scope](#-future-scope)
- [License](#-license)

---

## 💡 About the Project

Phishing attacks are becoming increasingly sophisticated, often bypassing traditional blacklist filters. This project is a **Heuristic-Based Phishing Detection System** built as a Chrome Extension. 

Unlike traditional antivirus tools that check a URL against a database of "known bad" sites, this extension analyzes the *behavior* and *structure* of the page itself in real-time. It calculates a risk score based on specific "red flags" (heuristics) to detect zero-day phishing attacks that haven't been reported yet.

**Note:** This project was developed as part of an NTCC academic initiative.

---

## ✨ Key Features

* **Real-Time Analysis:** Scans the URL and page content immediately upon loading.
* **Privacy-Focused:** All analysis happens locally on the client's browser. No browsing history is sent to external servers.
* **Visual Risk Score:** Displays a simple "Traffic Light" system (Safe/Suspicious/Dangerous) with a calculated risk score (0-100).
* **Detailed Threat Reporting:** Tells the user *exactly* why a site was flagged (e.g., "Non-HTTPS Connection" or "IP Address in URL").
* **Lightweight:** Built on the modern Chrome Manifest V3 architecture for minimal performance impact.

---

## 🧠 How It Works (The Logic)

The extension assigns a **Risk Score** to every website based on the following heuristics.

### 🔍 URL Analysis (Background Script)
| Heuristic | Score Weight | Rationale |
| :--- | :--- | :--- |
| **IP Address in URL** | `+30` | Legitimate sites use domain names, not raw IPs (e.g., `192.168...`). |
| **Non-HTTPS** | `+25` | Secure sites (especially login pages) must use SSL/TLS. |
| **"@" Symbol** | `+20` | Often used to trick browsers and hide the actual destination domain. |
| **Length > 75 chars** | `+15` | Attackers use long URLs to hide the domain in the address bar. |
| **Excessive Subdomains** | `+15` | E.g., `login.paypal.com.secure-update.net`. |
| **Sensitive Keywords** | `+10` | Presence of words like "login", "secure", "verify", "account". |

### 📄 Content Analysis (Content Script)
| Heuristic | Score Weight | Rationale |
| :--- | :--- | :--- |
| **Password Field Found** | `+25` | A high-risk element. If found on a non-HTTPS site, the risk is critical. |
| **iFrames Detected** | `+10` | Can be used to embed malicious content or fake login forms invisibly. |

### 🚦 Classification Thresholds
* 🟢 **0 - 30:** **Safe** (No significant threats)
* 🟡 **31 - 60:** **Suspicious** (Exercise caution)
* 🔴 **61+:** **Dangerous** (High probability of phishing)

---

## 🚀 Installation Guide

Since this is a developer project, it is not hosted on the Chrome Web Store yet. You can install it manually:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/Phishing-Detector-Extension.git](https://github.com/your-username/Phishing-Detector-Extension.git)
    ```
    *(Or simply download the ZIP file and extract it)*.

2.  **Open Chrome Extensions:**
    * Open Google Chrome.
    * Type `chrome://extensions` in the address bar and press Enter.

3.  **Enable Developer Mode:**
    * Toggle the switch named **"Developer mode"** in the top-right corner.

4.  **Load the Extension:**
    * Click the **"Load unpacked"** button in the top-left.
    * Select the folder where you saved the project files (e.g., `PhishingDetectorExtension`).

5.  **Pin and Test:**
    * Pin the extension to your toolbar.
    * Visit a site to see it in action!

---

## 📂 Project Structure

```text
Phishing-Detector-Extension/
│
├── manifest.json       # The configuration file (Permissions, V3 definition)
├── background.js       # Service worker (Handles URL analysis & Logic)
├── content.js          # Injected script (Handles DOM/HTML analysis)
├── popup.html          # The HTML structure of the extension popup
├── popup.css           # Styling for the popup UI
├── popup.js            # Logic to display results to the user
├── README.md           # Documentation
└── icons/              # Folder containing app icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
