//chrome.runtime.openOptionsPage();

chrome.runtime.onInstalled.addListener((details) => {
    // Show welcome page
    if (details.reason === "install") {
        chrome.runtime.openOptionsPage();
    }
});
