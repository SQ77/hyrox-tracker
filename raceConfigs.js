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
};
