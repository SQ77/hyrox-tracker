import { stages } from "./constants";
import confetti from "canvas-confetti";

const FINISH = 17;

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
        const startOrEnd = index === 0 || index === FINISH;
        circle.textContent = startOrEnd ? "" : index;

        // Label element
        const label = document.createElement("span");
        label.className = "label";
        label.textContent = stage;

        if (index < currentStageIndex || index === FINISH) {
            item.classList.add("active-tl");
            circle.style.color = "white";
        } else {
            circle.style.color = "black";
        }

        if (index === FINISH && currentStageIndex === FINISH) {
            const confettiBtn = document.createElement("span");
            confettiBtn.textContent = "🎉";
            confettiBtn.style.cursor = "pointer";
            confettiBtn.title = "Celebrate!";
            Object.assign(confettiBtn.style, {
                fontSize: "1.9rem",
                display: "inline-block", 
            });
            confettiBtn.onclick = () => launchConfetti();

            circle.appendChild(confettiBtn);
            
            // Wiggle animation
            setInterval(() => {
                confettiBtn.classList.add("wiggle");
                setTimeout(() => confettiBtn.classList.remove("wiggle"), 2000); 
            }, 4000); 
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

export function animateWave(currentIndex) {
    const timelineItems = document.querySelectorAll(".hyrox-timeline li");

    function runWave() {
        timelineItems.forEach((item, index) => {
            item.classList.remove("wave-animated", "fading-out");
            void item.offsetWidth; 

            if (index < currentIndex || index === FINISH) {
                setTimeout(() => {
                    item.classList.add("wave-animated");

                    setTimeout(() => {
                        item.classList.remove("wave-animated");
                        item.classList.add("fading-out");

                        setTimeout(() => {
                            item.classList.remove("fading-out");
                        }, 1200); // match fade out duration
                    }, 1000); // match active duration
                }, index * 600);
            }
        });
    }

    runWave(); 
    setInterval(runWave, (currentIndex + 1) * 600 + 3000); 
}
