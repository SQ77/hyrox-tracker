const stages = [
    "Start",
    "Running 1",
    "1000m SkiErg",
    "Running 2",
    "50m Sled Push",
    "Running 3",
    "50m Sled Pull",
    "Running 4",
    "80m Burpee Broad Jump",
    "Running 5",
    "1000m Row",
    "Running 6",
    "200m Farmers Carry",
    "Running 7",
    "100m Sandbag Lunges",
    "Running 8",
    "Wall Balls",
    "Finish",
];

const completed = Array(stages.length).fill(0);

const stationStageMap = {
    0: "station-start",
    1: "station-running1",
    2: "station-skierg",
    3: "station-running1",
    4: "station-sled-push",
    5: "station-running1",
    6: "station-sled-pull",
    7: "station-running1",
    8: "station-burpee-jumps",
    9: "station-running1",
    10: "station-row",
    11: "station-running1",
    12: "station-farmers-carry",
    13: "station-running1",
    14: "station-sandbag-lunges",
    15: "station-running1",
    16: "station-wallballs",
    17: "station-end",
};

function getCurrentStageIndex() {
    const getTime = (label) => {
        return [...document.querySelectorAll("th.desc")]
            .find((el) => el.textContent.trim() === label)
            ?.nextElementSibling?.textContent?.trim();
    };

    const running1Time = getTime("Running 1");
    const wallBallsTime = getTime("Wall Balls");

    if (!running1Time || running1Time === "-") {
        return 0; // Start
    }

    if (wallBallsTime && wallBallsTime !== "-") {
        for (let i = 0; i < completed.length - 1; i++) {
            completed[i] = 1;
        }
        return 17; // Finish
    }

    for (let i = 1; i < stages.length; i++) {
        const time = getTime(stages[i]);
        if (!time || time === "-") {
            return i;
        }
        completed[i] = 1;
    }

    return stages.length;
}

function createMap(currentStageIndex) {
    const container = document.createElement("div");
    container.id = "hyrox-map-container";
    container.className = "hyrox-map-container";

    const map = document.createElement("img");
    map.src = chrome.runtime.getURL("cologne-April-2025.jpg");
    map.alt = "Hyrox Cologne 2025 Map";
    map.className = "hyrox-map";
    container.appendChild(map);

    const SHIFT_X = 15;

    const stations = {
        "station-start": { top: 231, left: 274, bottom: 258, right: 346 },
        "station-skierg": { top: 518, left: 669, bottom: 559, right: 799 },
        "station-sled-push": { top: 489, left: 410, bottom: 565, right: 614 },
        "station-sled-pull": { top: 381, left: 406, bottom: 466, right: 625 },
        "station-burpee-jumps": {
            top: 393,
            left: 644,
            bottom: 498,
            right: 729,
        },
        "station-row": { top: 397, left: 338, bottom: 520, right: 392 },
        "station-farmers-carry": {
            top: 385,
            left: 175,
            bottom: 564,
            right: 203,
        },
        "station-sandbag-lunges": {
            top: 399,
            left: 250,
            bottom: 540,
            right: 324,
        },
        "station-wallballs": { top: 172, left: 530, bottom: 232, right: 677 },
        "station-end": { top: 145, left: 702, bottom: 216, right: 764 },
    };

    for (const station of Object.values(stations)) {
        station.left += SHIFT_X;
        station.right += SHIFT_X;
    }

    // Place station rectangles
    for (const [id, style] of Object.entries(stations)) {
        const div = document.createElement("div");
        div.id = id;
        div.className = "station-highlight";

        const width = style.right - style.left;
        const height = style.bottom - style.top;

        const stageIndex = Object.values(stationStageMap).indexOf(id);

        Object.assign(div.style, {
            top: `${style.top}px`,
            left: `${style.left}px`,
            width: `${width}px`,
            height: `${height}px`,
            position: "absolute",
            background: completed[stageIndex]
                ? "rgba(0, 255, 0, 0.3)"
                : "transparent",
        });
        container.appendChild(div);
    }

    // Add athlete marker at center of current station
    const currentStationId = stationStageMap[currentStageIndex];
    if (currentStationId && stations[currentStationId]) {
        const { top, left, bottom, right } = stations[currentStationId];

        const centerY = top + (bottom - top) / 2;
        const centerX = left + (right - left) / 2;

        const marker = document.createElement("div");
        marker.className = "athlete-marker";
        Object.assign(marker.style, {
            top: `${centerY}px`,
            left: `${centerX}px`,
        });
        container.appendChild(marker);
    }

    return container;
}

window.addEventListener("load", () => {
    const detail = document.querySelector(".detail") || document.body;
    const currentIndex = getCurrentStageIndex();
    const map = createMap(currentIndex);
    detail.insertBefore(map, detail.firstChild);
});
