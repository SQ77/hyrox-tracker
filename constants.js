export const stages = [
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

export const stationStageMap = {
    0: "station-start",
    1: "station-running1",
    2: "station-skierg",
    3: "station-running2",
    4: "station-sled-push",
    5: "station-running3",
    6: "station-sled-pull",
    7: "station-running4",
    8: "station-burpee-jumps",
    9: "station-running5",
    10: "station-row",
    11: "station-running6",
    12: "station-farmers-carry",
    13: "station-running7",
    14: "station-sandbag-lunges",
    15: "station-running8",
    16: "station-wallballs",
    17: "station-end",
};

export const completed = Array(stages.length).fill(0);

const RACE = "cologne-April-2025";
export const mapPath = `${RACE}.jpg`;

export const trackSvg = `
    <svg id="track-overlay" class="hyrox-track-overlay" viewBox="-100 100 800 600">
        <path id="track-path"
            d="M 263 590 L 840 587 L 840 482 L 786 409 L 782 286 L 232 277 C 192 280 182 289 171 312 L 171 587 L 261 590 L 667 586"
            fill="none"
            stroke="transparent"
            stroke-width="5"/>
    </svg>
    `;

export const stations = {
    "station-start": { top: 231, left: 274, bottom: 258, right: 346 },
    "station-skierg": { top: 518, left: 669, bottom: 559, right: 799 },
    "station-sled-push": { top: 489, left: 410, bottom: 565, right: 614 },
    "station-sled-pull": { top: 383, left: 406, bottom: 466, right: 625 },
    "station-burpee-jumps": {
        top: 393,
        left: 644,
        bottom: 498,
        right: 729,
    },
    "station-row": { top: 397, left: 338, bottom: 520, right: 392 },
    "station-farmers-carry": {
        top: 387,
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
    "station-end": { top: 147, left: 702, bottom: 216, right: 764 },
};
