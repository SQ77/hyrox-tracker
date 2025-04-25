const info = document.getElementById("race-info");
const select = document.getElementById("race-select");
const confirmBtn = document.getElementById("confirm-btn");
const resetBtn = document.getElementById("reset-btn");

// Load detected race
chrome.storage.local.get("currentRace", ({ currentRace }) => {
    if (currentRace) {
        info.textContent = `Current Race: ${currentRace}`;
        select.value = currentRace;
        confirmBtn.disabled = false;
    } else {
        info.textContent = "No race detected. Defaulted to Paris April 2025.";
    }
});

// Enable confirm if a race is selected
select.addEventListener("change", () => {
    confirmBtn.disabled = select.value === "";
});

confirmBtn.addEventListener("click", () => {
    const selected = select.value;
    if (selected) {
        chrome.storage.local.set({ currentRace: selected }, () => {
            info.textContent = `Current Race: ${selected}`;
        });
    }
});

resetBtn.addEventListener("click", () => {
    chrome.storage.local.remove("currentRace", () => {
        info.textContent = "Current Race: paris-April-2025";
        select.value = "";
        confirmBtn.disabled = true;
    });
});
