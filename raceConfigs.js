// Mapping of displayed race names to raceId values
export const raceIdMap = {
    "2025 Cologne": "cologne-April-2025",
    "2025 Paris": "paris-April-2025",
    "2025 London": "london-May-2025",
    "2025 Heerenveen": "heerenveen-May-2025",
    "2025 Berlin": "berlin-May-2025",
    "2025 Bangkok": "bangkok-May-2025",
};

export const raceConfigs = {
    "cologne-April-2025": {
        scale: 1,
        mapPath: "maps/cologne-April-2025.jpg",
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
        scale: 1,
        mapPath: "maps/paris-April-2025.png",
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
        scale: 1,
        mapPath: "maps/london-May-2025.png",
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

    "heerenveen-May-2025": {
        scale: 1,
        mapPath: "maps/heerenveen-May-2025.png",
        imageWidth: 1254,
        imageHeight: 493,
        trackSvg: `
            <svg id="track-overlay" class="hyrox-track-overlay" viewBox="-100 100 800 600">
                <path id="track-path"
                    d="M 1092 430 C 1287 314 1238 120 1084 31 L 251 22 A 1 1 0 0 0 267 452 L 1033 454 C 1059 457 1073 439 1092 433"
                    fill="none"
                    stroke="transparent"
                    stroke-width="5"/>
            </svg>
        `,
        stations: {
            "station-start": { top: 183, left: 12, bottom: 296, right: 53 },
            "station-skierg": {
                top: 100,
                left: 1051,
                bottom: 336,
                right: 1110,
            },
            "station-sled-push": {
                top: 100,
                left: 898,
                bottom: 391,
                right: 1035,
            },
            "station-sled-pull": {
                top: 99,
                left: 739,
                bottom: 390,
                right: 876,
            },
            "station-burpee-jumps": {
                top: 121,
                left: 446,
                bottom: 389,
                right: 527,
            },
            "station-row": { top: 120, left: 361, bottom: 391, right: 442 },
            "station-farmers-carry": {
                top: 171,
                left: 85,
                bottom: 312,
                right: 118,
            },
            "station-sandbag-lunges": {
                top: 120,
                left: 228,
                bottom: 360,
                right: 346,
            },
            "station-wallballs": {
                top: 219,
                left: 557,
                bottom: 390,
                right: 723,
            },
            "station-end": { top: 97, left: 555, bottom: 219, right: 725 },
        },
    },

    "berlin-May-2025": {
        scale: 0.8,
        mapPath: "maps/berlin-May-2025.png",
        imageWidth: 1381,
        imageHeight: 775,
        trackSvg: `
            <svg id="track-overlay" class="hyrox-track-overlay" viewBox="-80 80 640 480">
                <path id="track-path"
                    d="M 637.6 462.4 L 676.8 443.2 L 858.4 420.8 L 1036.8 324 C 1046.4 316.8 1050.4 304.8 1044.8 296.8 L 1024 240 C 1020.8 229.6 1011.2 226.4 1000 228.8 L 669.6 289.6 C 638.4 296 634.4 280.8 632.8 268 L 632.8 71.2 C 633.6 59.2 628.8 55.2 619.2 52.8 L 539.2 52.8 C 531.2 52.8 526.4 57.6 527.2 68.8 L 524.8 251.2 C 524.8 268 516.8 280.8 496.8 280 L 167.2 236 C 147.2 231.2 140 233.6 136 242.4 L 104 332 C 100 341.6 104 349.6 116.8 354.4 L 240 403.2"
                    fill="none"
                    stroke="transparent"
                    stroke-width="4" />
            </svg>
        `,
        stations: {
            "station-start": { top: 609, left: 1084, bottom: 701, right: 1126 },
            "station-skierg": {
                points: [
                    [85, 448],
                    [142, 475],
                    [106, 555],
                    [45, 525],
                ],
            },
            "station-sled-push": {
                points: [
                    [155, 482],
                    [350, 566],
                    [317, 645],
                    [125, 563],
                ],
            },
            "station-sled-pull": {
                points: [
                    [396, 584],
                    [610, 642],
                    [589, 723],
                    [380, 665],
                ],
            },
            "station-burpee-jumps": {
                points: [
                    [618, 642],
                    [712, 657],
                    [701, 739],
                    [608, 722],
                ],
            },
            "station-row": {
                points: [
                    [719, 657],
                    [799, 665],
                    [791, 748],
                    [713, 736],
                ],
            },
            "station-farmers-carry": {
                points: [
                    [436, 531],
                    [586, 570],
                    [765, 595],
                    [761, 626],
                    [579, 603],
                    [430, 561],
                ],
            },
            "station-sandbag-lunges": {
                top: 648,
                left: 806,
                bottom: 748,
                right: 879,
            },
            "station-wallballs": {
                top: 589,
                left: 972,
                bottom: 737,
                right: 1022,
            },
            "station-end": { top: 692, left: 891, bottom: 765, right: 932 },
        },
    },

    "bangkok-May-2025": {
        scale: 0.8,
        mapPath: "maps/bangkok-May-2025.png",
        imageWidth: 1449,
        imageHeight: 779,
        trackSvg: `
            <svg id="track-overlay" class="hyrox-track-overlay" viewBox="-80 80 640 480">
                <path id="track-path"
                    d="M 297.6 96 L 404.8 94.4 L 488 42.4 L 1008.8 43.2 C 1050.4 44.8 1108 36.8 1110.4 80 L 1118.4 442.4 C 1120.8 465.6 1118.4 489.6 1076.8 489.6 L 721.6 489.6 L 608 576.8 L 102.4 584 C 69.6 582.4 44 568.8 46.4 540.8 L 50.4 168 C 47.2 127.2 75.2 100 104.8 98.4 L 300 96.8"
                    fill="none"
                    stroke="transparent"
                    stroke-width="4" />
            </svg>
        `,
        stations: {
            "station-start": { top: 264, left: 142, bottom: 357, right: 208 },
            "station-skierg": {
                points: [
                    [1276, 145],
                    [1314, 145],
                    [1353, 180],
                    [1355, 461],
                    [1278, 460],
                ],
            },
            "station-sled-push": {
                top: 140,
                left: 1107,
                bottom: 530,
                right: 1253,
            },
            "station-sled-pull": {
                top: 142,
                left: 962,
                bottom: 531,
                right: 1106,
            },
            "station-burpee-jumps": {
                top: 141,
                left: 843,
                bottom: 533,
                right: 930,
            },
            "station-row": { top: 201, left: 503, bottom: 447, right: 602 },
            "station-farmers-carry": {
                top: 204,
                left: 390,
                bottom: 421,
                right: 487,
            },
            "station-sandbag-lunges": {
                top: 204,
                left: 252,
                bottom: 432,
                right: 373,
            },
            "station-wallballs": {
                top: 180,
                left: 637,
                bottom: 479,
                right: 742,
            },
            "station-end": { top: 545, left: 628, bottom: 634, right: 769 },
        },
    },
};
