// Pause / play the floating animations
const pauseBtn = document.getElementById("pauseBtn");

pauseBtn.addEventListener("click", () => {
  const paused = document.body.classList.toggle("paused");
  pauseBtn.innerHTML = paused
    ? '<i class="fa-solid fa-play"></i> <span>play animations</span>'
    : '<i class="fa-solid fa-pause"></i> <span>pause animations</span>';
});

// Reveal sections on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("show");
        revealObserver.unobserve(el);
        // drop the stagger delay once shown so hover effects respond instantly
        setTimeout(() => (el.style.transitionDelay = ""), 1200);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObserver.observe(el);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Count numbers up from 0 when they scroll into view
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

if (!reduceMotion) {
  document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));
}

// Skill cards tilt toward the mouse
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
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

document.getElementById("year").textContent = new Date().getFullYear();
