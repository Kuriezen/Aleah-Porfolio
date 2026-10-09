import { reduceMotion } from "./motion.js";

// Skill cards (.tilt) lean toward the mouse
export function initTilt() {
  if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;

  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", `${x * 8}deg`);
      card.style.setProperty("--rx", `${-y * 8}deg`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}
