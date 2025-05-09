chrome.runtime.onInstalled.addListener((details) => {
    // Show welcome page
    if (details.reason === "install") {
        chrome.runtime.openOptionsPage();
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "STAGE_COMPLETED") {
        const { names, stage } = message;

        const nameList =
            names.length === 1
                ? names[0]
                : names.slice(0, -1).join(", ") +
                  " & " +
                  names[names.length - 1];

        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon-48.png",
            title: "Stage Completed!",
            message: `${nameList} completed ${stage}.`,
            priority: 2,
        });
    }
});
