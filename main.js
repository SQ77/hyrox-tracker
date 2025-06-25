import { stages, stationStageMap, completed } from "./constants.js";
import { raceConfigs, raceIdMap } from "./raceConfigs.js";
import {
    createProgressLine,
    animateWave,
    getRunningTimes,
} from "./progressLine.js";

let currentRaceId = "singapore-June-2025";
let { scale, mapPath, imageWidth, imageHeight, trackSvg, stations } =
    raceConfigs[currentRaceId];

let markerEl = null;
let currentMarkerStageIndex = null;
const athleteNames = extractAthleteNames();

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
                ({
                    scale,
                    mapPath,
                    imageWidth,
                    imageHeight,
                    trackSvg,
                    stations,
                } = config);
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
        ({ scale, mapPath, imageWidth, imageHeight, trackSvg, stations } =
            config);
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
        height: `${imageHeight * scale}px`,
        width: `${imageWidth * scale}px`,
    });
    container.appendChild(map);

    container.insertAdjacentHTML("beforeend", trackSvg);

    const tooltip = document.createElement("div");
    tooltip.className = "station-tooltip";
    tooltip.style.display = "none";
    container.appendChild(tooltip);

    const SHIFT_X = 15;

    for (const station of Object.values(stations)) {
        if (station.points) {
            station.points = station.points.map(([x, y]) => [
                x * scale + SHIFT_X,
                y * scale,
            ]);
        } else {
            station.left = station.left * scale + SHIFT_X;
            station.right = station.right * scale + SHIFT_X;
            station.top *= scale;
            station.bottom *= scale;
        }
    }

    // Place station outlines
    for (const [id, style] of Object.entries(stations)) {
        const div = document.createElement("div");
        div.id = id;
        div.className = "station-highlight";

        const stageIndex = Object.values(stationStageMap).indexOf(id);
        const stageLabel = stages[stageIndex];

        const isCompleted = completed[stageIndex];

        if (style.points) {
            // Polygon
            const clipPathPoints = style.points
                .map(([x, y]) => `${x}px ${y}px`)
                .join(", ");
            Object.assign(div.style, {
                clipPath: `polygon(${clipPathPoints})`,
                position: "absolute",
                top: "0",
                left: "0",
                width: `${imageWidth * scale}px`,
                height: `${imageHeight * scale}px`,
                background: isCompleted
                    ? "rgba(0, 255, 0, 0.3)"
                    : "transparent",
                zIndex: 6,
            });
        } else {
            // Rectangle
            const width = style.right - style.left;
            const height = style.bottom - style.top;
            Object.assign(div.style, {
                top: `${style.top}px`,
                left: `${style.left}px`,
                width: `${width}px`,
                height: `${height}px`,
                position: "absolute",
                background: isCompleted
                    ? "rgba(0, 255, 0, 0.3)"
                    : "transparent",
            });
        }

        // Get stage-specific time
        const time = document.querySelectorAll("th.desc")
            ? [...document.querySelectorAll("th.desc")]
                  .find((el) => el.textContent.trim() === stageLabel)
                  ?.nextElementSibling?.textContent?.trim()
            : null;

        // Get total finish time
        const totalTime = document
            .querySelector("td.f-time_finish_netto.last")
            ?.textContent?.trim();

        div.addEventListener("mouseenter", () => {
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

function extractAthleteNames() {
    const names = [];

    // Single athlete
    const singleEl = document.querySelector("td.f-__fullname.last");
    if (singleEl) {
        names.push(cleanName(singleEl.textContent));
        return names;
    }

    // Doubles or Team
    const memberRows = [
        ...document.querySelectorAll("table.table-condensed tr"),
    ].filter((tr) => tr.querySelector("th")?.textContent?.startsWith("Member"));

    for (const row of memberRows) {
        const name = row.querySelector("td")?.textContent;
        if (name) names.push(cleanName(name));
    }

    return names;
}

// Removes country code from athlete names
function cleanName(name) {
    return name.replace(/\s*\([A-Z]{3}\)\s*$/, "").trim();
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
        const station = stations[currentStationName];

        let centerX, centerY;

        if (station.points && Array.isArray(station.points)) {
            // Compute center of polygon
            const xs = station.points.map(([x, _]) => x);
            const ys = station.points.map(([_, y]) => y);
            centerX = xs.reduce((a, b) => a + b, 0) / xs.length;
            centerY = ys.reduce((a, b) => a + b, 0) / ys.length;
        } else {
            // Rectangle
            const { top, left, bottom, right } = station;
            centerY = top + (bottom - top) / 2;
            centerX = left + (right - left) / 2;
        }

        marker.style.top = `${centerY}px`;
        marker.style.left = `${centerX}px`;
        marker.style.display = "block";
    } else {
        marker.style.display = "none";
    }
}

function createNotification(currentIndex) {
    const urlParams = new URLSearchParams(location.search);
    const idp = urlParams.get("idp");

    if (!idp) {
        console.warn("No idp found in URL.");
        return;
    }

    const storageKey = `lastStageIndex-${idp}`;
    const completedStageIndex = currentIndex - 1;

    if (completedStageIndex <= 0) return;

    // Check notification preference
    chrome.storage.sync.get(["notificationsEnabled"], (prefs) => {
        const notificationsEnabled = prefs.notificationsEnabled ?? false;

        if (!notificationsEnabled) {
            return;
        }

        chrome.storage.local.get([storageKey], (result) => {
            const lastStoredIndex = result[storageKey];

            if (completedStageIndex !== lastStoredIndex) {
                chrome.runtime.sendMessage({
                    type: "STAGE_COMPLETED",
                    names: athleteNames || ["Athlete"],
                    stage: stages[completedStageIndex] || `New stage`,
                });

                chrome.storage.local.set({ [storageKey]: completedStageIndex });
            }
        });
    });
}

window.addEventListener("load", async () => {
    const detail = document.querySelector(".detail") || document.body;
    const currentIndex = getCurrentStageIndex();
    await getRaceId();
    const map = createMap(currentIndex);
    detail.insertBefore(map, detail.firstChild);
    animateWave(currentIndex);
    createNotification(currentIndex);

    setInterval(() => {
        location.reload();
        const currentIndex = getCurrentStageIndex();
        if (currentIndex % 2 === 0 || currentIndex === 17) {
            updateMarker();
        }
    }, 90000);

    const urlParams = new URLSearchParams(location.search);
    const idp = urlParams.get("idp");

    // Restore scroll position based on idp
    if (idp) {
        const scrollKey = `scroll-${idp}`;
        chrome.storage.local.get([scrollKey], (result) => {
            const scrollY = result[scrollKey];
            if (typeof scrollY === "number") {
                window.scrollTo(0, scrollY);
            }
        });
    }

    // Save scroll position before page unload
    window.addEventListener("beforeunload", () => {
        if (idp) {
            const scrollKey = `scroll-${idp}`;
            chrome.storage.local.set({ [scrollKey]: window.scrollY });
        }
    });

    if (idp) {
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === "local" && changes[idp]) {
                location.reload();
            }
        });
    }
});
