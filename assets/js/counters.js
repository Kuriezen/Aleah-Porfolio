import { reduceMotion } from "./motion.js";

// Counts numbers up from 0 when they scroll into view:
//   <strong data-count="80" data-suffix="+">80+</strong>
export function initCounters() {
  if (reduceMotion) return;

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix;
        const start = performance.now();
        const duration = 1400;

        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));
}
