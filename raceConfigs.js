// Mapping of displayed race names to raceId values
export const raceIdMap = {
    "2025 Cologne": "cologne-April-2025",
    "2025 Paris": "paris-April-2025",
    "2025 London": "london-May-2025",
};

export const raceConfigs = {
    "cologne-April-2025": {
        mapPath: "cologne-April-2025.jpg",
        imageWidth: 910,
        imageHeight: 626,
        trackSvg: `
            <svg id="track-overlay" class="hyrox-track-overlay" viewBox="-100 100 800 600">
                <path id="track-path"
                    d="M 263 590 L 840 587 L 840 482 L 786 409 L 782 286 L 232 277 C 192 280 182 289 171 312 L 171 587 L 261 590 L 667 586"
                    fill="none"
                    stroke="transparent"
                    stroke-width="5"/>
            </svg>
        `,
        stations: {
            "station-start": { top: 231, left: 274, bottom: 258, right: 346 },
            "station-skierg": { top: 518, left: 669, bottom: 559, right: 799 },
            "station-sled-push": {
                top: 489,
                left: 410,
                bottom: 565,
                right: 614,
            },
            "station-sled-pull": {
                top: 383,
                left: 406,
                bottom: 466,
                right: 625,
            },
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
            "station-wallballs": {
                top: 172,
                left: 530,
                bottom: 232,
                right: 677,
            },
            "station-end": { top: 147, left: 702, bottom: 216, right: 764 },
        },
    },

    "paris-April-2025": {
        mapPath: "paris-April-2025.png",
        imageWidth: 1136,
        imageHeight: 620,
        trackSvg: `
            <svg id="track-overlay" class="hyrox-track-overlay" viewBox="-100 100 800 600">
                <path id="track-path"
                    d="M 903 315 L 747 313 L 725 324 L 501 324 L 433 313 L 259 315 C 237 314 229 322 227 337 L 229 445 C 230 460 240 464 254 465 L 454 465 L 480 455 L 964 457 C 974 454 980 449 982 442 C 1004 402 993 358 982 316 L 904 315"
                    fill="none"
                    stroke="transparent"
                    stroke-width="5"/>
            </svg>
        `,
        stations: {
            "station-start": { top: 464, left: 566, bottom: 498, right: 660 },
            "station-skierg": { top: 428, left: 256, bottom: 450, right: 436 },
            "station-sled-push": {
                top: 356,
                left: 256,
                bottom: 427,
                right: 436,
            },
            "station-sled-pull": {
                top: 356,
                left: 451,
                bottom: 438,
                right: 613,
            },
            "station-burpee-jumps": {
                top: 354,
                left: 629,
                bottom: 438,
                right: 734,
            },
            "station-row": { top: 354, left: 746, bottom: 438, right: 826 },
            "station-farmers-carry": {
                top: 326,
                left: 928,
                bottom: 437,
                right: 963,
            },
            "station-sandbag-lunges": {
                top: 354,
                left: 828,
                bottom: 438,
                right: 929,
            },
            "station-wallballs": {
                top: 219,
                left: 566,
                bottom: 311,
                right: 651,
            },
            "station-end": { top: 125, left: 585, bottom: 180, right: 652 },
        },
    },

    "london-May-2025": {
        mapPath: "london-May-2025.png",
        imageWidth: 1251,
        imageHeight: 841,
        trackSvg: `
            <svg id="track-overlay" class="hyrox-track-overlay" viewBox="-100 100 800 600">
                <path id="track-path"
                    d="M 1055 37 L 478 38 C 460 44 446 48 444 68 L 443 148 L 391 187 L 113 189 C 80 190 70 201 68 217 L 67 329 C 66 349 83 356 107 360 L 440 356 C 459 378 476 387 503 394 L 1027 396 C 1092 374 1104 338 1127 284 C 1126.6667 218 1126.3333 152 1126 86 C 1122 55 1093 37 1060 38"
                    fill="none"
                    stroke="transparent"
                    stroke-width="5"/>
            </svg>
        `,
        stations: {
            "station-start": { top: 497, left: 1021, bottom: 640, right: 1069 },
            "station-skierg": { top: 206, left: 159, bottom: 267, right: 394 },
            "station-sled-push": {
                top: 249,
                left: 508,
                bottom: 348,
                right: 807,
            },
            "station-sled-pull": {
                top: 102,
                left: 497,
                bottom: 221,
                right: 788,
            },
            "station-burpee-jumps": {
                top: 103,
                left: 819,
                bottom: 350,
                right: 886,
            },
            "station-row": { top: 105, left: 905, bottom: 267, right: 970 },
            "station-farmers-carry": {
                top: 105,
                left: 1068,
                bottom: 274,
                right: 1106,
            },
            "station-sandbag-lunges": {
                top: 103,
                left: 969,
                bottom: 265,
                right: 1068,
            },
            "station-wallballs": {
                top: 691,
                left: 772,
                bottom: 761,
                right: 1024,
            },
            "station-end": { top: 688, left: 1025, bottom: 824, right: 1124 },
        },
    },
};
