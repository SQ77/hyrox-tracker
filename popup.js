const info = document.getElementById("race-info");
const select = document.getElementById("race-select");
const confirmBtn = document.getElementById("confirm-btn");
const resetBtn = document.getElementById("reset-btn");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    const idp = new URLSearchParams(url.search).get("idp");

    if (!idp) {
        info.textContent = "Error: idp not found in URL.";
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
                "No race detected. Defaulted to Paris April 2025.";
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
            info.textContent = "Current Race: paris-April-2025";
            select.value = "";
            confirmBtn.disabled = true;
        });
    });
});
