import { stages } from "./constants";

export function createProgressLine(currentStageIndex) {
    const container = document.createElement("div");
    container.className = "hyrox-timeline-container";

    const timeline = document.createElement("ul");
    timeline.className = "hyrox-timeline";

    stages.forEach((stage, index) => {
        const item = document.createElement("li");

        // Circle element
        const circle = document.createElement("div");
        circle.className = "circle";
        const startOrEnd = index === 0 || index === 17;
        circle.textContent = startOrEnd ? "" : index;

        // Label element
        const label = document.createElement("span");
        label.className = "label";
        label.textContent = stage;

        if (index <= currentStageIndex) {
            item.classList.add("active-tl");
            circle.style.color = "white";
        } else {
            circle.style.color = "black";
        }

        item.appendChild(circle);
        item.appendChild(label);

        timeline.appendChild(item);
    });

    container.appendChild(timeline);
    return container;
}
