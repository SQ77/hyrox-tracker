const info = document.getElementById("race-info");
const select = document.getElementById("race-select");
const confirmBtn = document.getElementById("confirm-btn");
const resetBtn = document.getElementById("reset-btn");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    const idp = new URLSearchParams(url.search).get("idp");

    if (!idp) {
        info.textContent = "No race detected.";
        confirmBtn.disabled = true;
        return;
    }

    // Load detected race for this idp
    chrome.storage.local.get(idp, (result) => {
        const currentRace = result[idp];
        if (currentRace) {
            info.textContent = `Current Race: ${currentRace}`;
            select.value = currentRace;
            confirmBtn.disabled = false;
        } else {
            info.textContent =
                "No race detected. Defaulted to New York May 2025.";
        }
    });

    // Enable confirm if a race is selected
    select.addEventListener("change", () => {
        confirmBtn.disabled = select.value === "";
    });

    confirmBtn.addEventListener("click", () => {
        const selected = select.value;
        if (selected) {
            chrome.storage.local.set({ [idp]: selected }, () => {
                info.textContent = `Current Race: ${selected}`;
            });
        }
    });

    resetBtn.addEventListener("click", () => {
        chrome.storage.local.remove(idp, () => {
            info.textContent = "Current Race: newyork-May-2025";
            select.value = "";
            confirmBtn.disabled = true;
        });
    });
});

const notificationIcon = document.getElementById("notification-icon");

const bellOnSVG = `
<svg xmlns="http://www.w3.org/2000/svg" id="bell-icon" viewBox="0 0 24 24">
    <path d="M11.5 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6.5-6v-5.5c0-3.07-2.13-5.64-5-6.32V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v.68c-2.87.68-5 3.25-5 6.32V16l-2 2v1h17v-1l-2-2z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>`;

const bellOffSVG = `
<svg xmlns="http://www.w3.org/2000/svg" id="bell-icon" viewBox="0 0 24 24">
    <path d="M11.5 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zM18 10.5c0-3.07-2.13-5.64-5-6.32V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v.68c-.51.12-.99.32-1.45.56L18 14.18V10.5zm-.27 8.5l2 2L21 19.73 4.27 3 3 4.27l2.92 2.92C5.34 8.16 5 9.29 5 10.5V16l-2 2v1h14.73z"/>
</svg>`;

function updateBellIcon(enabled) {
    notificationIcon.innerHTML = enabled ? bellOnSVG : bellOffSVG;
    notificationIcon.title = `notifications: ${enabled ? "on" : "off"}`;
}

// Load saved state
chrome.storage.sync.get(["notificationsEnabled"], (result) => {
    const enabled = result.notificationsEnabled ?? false;
    updateBellIcon(enabled);
    notificationIcon.classList.toggle("enabled", enabled);
});

// Toggle on click
notificationIcon.addEventListener("click", () => {
    const isEnabled = notificationIcon.classList.toggle("enabled");
    chrome.storage.sync.set({ notificationsEnabled: isEnabled });
    updateBellIcon(isEnabled);
});
