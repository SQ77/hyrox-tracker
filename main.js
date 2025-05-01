import { stages, stationStageMap, completed } from "./constants.js";
import { raceConfigs, raceIdMap } from "./raceConfigs.js";
import {
    createProgressLine,
    animateWave,
    getRunningTimes,
} from "./progressLine.js";

let currentRaceId = "london-May-2025";
let { mapPath, imageWidth, imageHeight, trackSvg, stations } =
    raceConfigs[currentRaceId];

let markerEl = null;
let currentMarkerStageIndex = null;

async function getRaceId() {
    const urlParams = new URLSearchParams(location.search);
    const idp = urlParams.get("idp");

    if (!idp) {
        console.warn("No idp found in URL.");
        return;
    }

    // Try to detect race from the page
    const raceRow = [...document.querySelectorAll("tr")].find(
        (tr) => tr.querySelector("th")?.textContent.trim() === "Race"
    );

    if (raceRow) {
        const raceText = raceRow.querySelector("td")?.textContent.trim();
        if (raceText && raceIdMap[raceText]) {
            currentRaceId = raceIdMap[raceText];
            const config = raceConfigs[currentRaceId];
            if (config) {
                ({ mapPath, imageWidth, imageHeight, trackSvg, stations } =
                    config);
                chrome.storage.local.set({ [idp]: currentRaceId });
                return;
            }
        }
    }

    // Fallback to chrome.storage.local using idp as key
    const currentRace = await new Promise((resolve) => {
        chrome.storage.local.get([idp], (result) => {
            resolve(result[idp]);
        });
    });

    if (currentRace && raceConfigs[currentRace]) {
        currentRaceId = currentRace;
        const config = raceConfigs[currentRaceId];
        ({ mapPath, imageWidth, imageHeight, trackSvg, stations } = config);
    }
}

function getCurrentStageIndex() {
    const getTime = (label) => {
        return [...document.querySelectorAll("th.desc")]
            .find((el) => el.textContent.trim() === label)
            ?.nextElementSibling?.textContent?.trim();
    };

    const running1Time = getTime("Running 1");
    const wallBallsTime = getTime("Wall Balls");

    if (!running1Time || running1Time === "–") {
        return 0; // Start
    }

    if (wallBallsTime && wallBallsTime !== "–") {
        for (let i = 1; i < completed.length - 1; i++) {
            completed[i] = 1;
        }
        return 17; // Finish
    }

    for (let i = 1; i < stages.length; i++) {
        const time = getTime(stages[i]);
        if (!time || time === "–") {
            return i;
        }
        completed[i] = 1;
    }

    return stages.length;
}

function animateAlongPath(pathEl, markerEl, retries = 5) {
    if (!pathEl) {
        if (retries > 0) {
            requestAnimationFrame(() =>
                animateAlongPath(
                    document.getElementById("track-path"),
                    markerEl,
                    retries - 1
                )
            );
        } else {
            console.warn("Path element not found after multiple attempts");
        }
        return;
    }

    const pathLength = pathEl.getTotalLength();
    const durationPerLap = 90000; // 1.5 minutes per lap
    const totalLaps = 3;
    const totalDuration = durationPerLap * totalLaps;

    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;

        if (elapsed >= totalDuration) {
            // Final position at end of last lap
            const { x, y } = pathEl.getPointAtLength(pathLength);
            markerEl.style.left = `${x}px`;
            markerEl.style.top = `${y}px`;
            return;
        }

        const lapProgress = (elapsed % durationPerLap) / durationPerLap;
        const currentDistance = lapProgress * pathLength;

        const { x, y } = pathEl.getPointAtLength(currentDistance);
        markerEl.style.left = `${x}px`;
        markerEl.style.top = `${y}px`;

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function createMap(currentStageIndex) {
    const container = document.createElement("div");
    container.id = "hyrox-map-container";
    container.className = "hyrox-map-container";

    const map = document.createElement("img");
    map.src = chrome.runtime.getURL(mapPath);
    map.alt = "Hyrox Map";
    map.className = "hyrox-map";
    Object.assign(map.style, {
        height: `${imageHeight}px`,
        width: `${imageWidth}px`,
    });
    container.appendChild(map);

    container.insertAdjacentHTML("beforeend", trackSvg);

    const tooltip = document.createElement("div");
    tooltip.className = "station-tooltip";
    tooltip.style.display = "none";
    container.appendChild(tooltip);

    const SHIFT_X = 15;

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
        const stageLabel = stages[stageIndex];

        // Get stage-specific time for non-finish stages
        const time = document.querySelectorAll("th.desc")
            ? [...document.querySelectorAll("th.desc")]
                  .find((el) => el.textContent.trim() === stageLabel)
                  ?.nextElementSibling?.textContent?.trim()
            : null;

        // Get total finish time
        const totalTime = document
            .querySelector("td.f-time_finish_netto.last")
            ?.textContent?.trim();

        div.addEventListener("mouseenter", (e) => {
            if (stageLabel.toLowerCase().includes("finish") && totalTime) {
                tooltip.textContent = `Total Time: ${totalTime}`;
                tooltip.style.display = "block";
            } else if (time) {
                tooltip.textContent = `${stageLabel}: ${time}`;
                tooltip.style.display = "block";
            }
        });

        div.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            tooltip.style.top = `${e.clientY - rect.top + 20}px`;
            tooltip.style.left = `${e.clientX - rect.left + 20}px`;
        });

        div.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });

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

    markerEl = document.createElement("div");
    markerEl.className = "athlete-marker";
    container.appendChild(markerEl);

    currentMarkerStageIndex = currentStageIndex;
    updateMarker();

    const runningTimes = getRunningTimes();
    const progressLine = createProgressLine(currentStageIndex, runningTimes);
    container.appendChild(progressLine);

    return container;
}

function updateMarker() {
    const newStageIndex = getCurrentStageIndex();
    currentMarkerStageIndex = newStageIndex;

    const marker = markerEl;
    if (!marker) return;

    const currentStationName = stationStageMap[newStageIndex];

    // Athlete is running
    if (currentStationName && currentStationName.includes("running")) {
        marker.style.display = "block";
        animateAlongPath(document.getElementById("track-path"), marker);
    } else if (currentStationName && stations[currentStationName]) {
        // Athlete is at a station
        const { top, left, bottom, right } = stations[currentStationName];
        const centerY = top + (bottom - top) / 2;
        const centerX = left + (right - left) / 2;
        marker.style.top = `${centerY}px`;
        marker.style.left = `${centerX}px`;
        marker.style.display = "block";
    } else {
        marker.style.display = "none";
    }
}

window.addEventListener("load", async () => {
    const detail = document.querySelector(".detail") || document.body;
    const currentIndex = getCurrentStageIndex();
    await getRaceId();
    const map = createMap(currentIndex);
    detail.insertBefore(map, detail.firstChild);
    animateWave(currentIndex);

    setInterval(() => {
        location.reload();
        const currentIndex = getCurrentStageIndex();
        if (currentIndex % 2 === 0 || currentIndex === 17) {
            updateMarker();
        }
    }, 90000);

    const urlParams = new URLSearchParams(location.search);
    const idp = urlParams.get("idp");

    if (idp) {
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === "local" && changes[idp]) {
                location.reload();
            }
        });
    }
});
