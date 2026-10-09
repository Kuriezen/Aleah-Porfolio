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
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObserver.observe(el);
});

document.getElementById("year").textContent = new Date().getFullYear();
