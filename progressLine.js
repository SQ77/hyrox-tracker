import { stages } from "./constants";
import confetti from "canvas-confetti";

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

        if (index === 17) {
            const confettiBtn = document.createElement("span");
            confettiBtn.textContent = "🎉";
            confettiBtn.style.cursor = "pointer";
            confettiBtn.title = "Celebrate!";
            Object.assign(confettiBtn.style, {
                fontSize: "1.8rem",
            });
            confettiBtn.onclick = () => launchConfetti();

            circle.appendChild(confettiBtn);
        }

        item.appendChild(circle);
        item.appendChild(label);

        timeline.appendChild(item);
    });

    container.appendChild(timeline);
    return container;
}

function launchConfetti() {
    if (typeof confetti !== "function") return;

    confetti({
        particleCount: 150,
        spread: 70,
        colors: ["#FFFF00", "#000000", "#FFFFFF"],
        origin: { y: 0.7 },
    });
}
