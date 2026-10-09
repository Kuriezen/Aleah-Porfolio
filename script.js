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

// Curvy background line that draws itself as you scroll.
// The curve is eemonroy.com's, drawn on a 1915 x 9617 canvas; we stretch it
// over the page and rebuild it in real pixels so the ribbon keeps an even
// thickness at any screen size.
(() => {
  const page = document.getElementById("page");
  const svg = document.getElementById("scrollLine");
  const line = svg.querySelector(".scroll-line__path");
  const gradient = svg.querySelector("linearGradient");
  const CURVE =
    "M1437.03 103.016C103.027 323.016 340.035 783.376 184.035 930.016C24.0352 1080.42 150.027 1254.02 259.028 1286.02C588.035 1382.6 1506.04 1716.02 1543.03 1730.02C1825.64 1836.97 1858.04 2017.48 1767.03 2066.02C1427.03 2247.35 660.546 2848.48 567.027 2950.02C322.035 3216.02 357.868 3600.61 387.027 3686.02C514.035 4058.02 1350.95 4146.16 1571.03 4354.02C1607.03 4388.02 2043.03 4742.02 1607.03 5182.02C1171.03 5622.02 635.027 5686.02 411.027 6142.02C187.027 6598.02 219.027 6754.02 359.027 6966.02C471.027 7135.62 1152.36 7423.35 1479.03 7546.02C1649.69 7630.02 1919.03 7871.62 1631.03 8166.02C1271.03 8534.02 907.027 8418.02 563.027 8822.02C287.827 9145.22 141.694 9418.02 103.027 9514.02";
  const CANVAS_W = 1915.35;
  const CANVAS_H = 9617.04;
  const SAMPLES = 600;

  // Sample the original curve once, as fractions of its canvas
  const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
  probe.setAttribute("d", CURVE);
  probe.style.visibility = "hidden";
  svg.appendChild(probe);
  const probeLength = probe.getTotalLength();
  const unit = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const p = probe.getPointAtLength((probeLength * i) / SAMPLES);
    unit.push([p.x / CANVAS_W, p.y / CANVAS_H]);
  }
  probe.remove();

  let points = []; // [x, y, lengthSoFar] in page pixels
  let total = 0;

  const layout = () => {
    const w = page.offsetWidth;
    const h = page.offsetHeight;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

    total = 0;
    points = [];
    for (const [ux, uy] of unit) {
      const x = ux * w;
      const y = uy * h;
      const prev = points[points.length - 1];
      if (prev) total += Math.hypot(x - prev[0], y - prev[1]);
      points.push([x, y, total]);
    }

    line.setAttribute(
      "d",
      "M" + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")
    );
    line.setAttribute("stroke-width", Math.min(150, Math.max(46, w * 0.1)));
    line.style.strokeDasharray = `${total} ${total}`;

    // Same diagonal gradient direction as the reference
    gradient.setAttribute("x1", 0.33 * w);
    gradient.setAttribute("y1", -0.088 * h);
    gradient.setAttribute("x2", 3.8 * w);
    gradient.setAttribute("y2", 0.345 * h);

    update();
  };

  let frame = 0;
  const update = () => {
    frame = 0;
    if (!points.length) return;

    let progress = 1;
    if (!reduceMotion) {
      const rect = page.getBoundingClientRect();
      const vh = window.innerHeight;
      const root = document.documentElement;
      const atBottom = window.scrollY + root.clientHeight >= root.scrollHeight - 2;
      // Ease in over the first screen, then keep the tip ~72% down the viewport
      const t = Math.min(1, window.scrollY / vh);
      const ease = t * t * (3 - 2 * t);
      const tipY = -rect.top + vh * 0.72 * ease;

      if (atBottom) {
        progress = 1;
      } else if (tipY <= points[0][1]) {
        progress = 0;
      } else {
        const hit = points.find(([, y]) => y >= tipY) || points[points.length - 1];
        progress = hit[2] / total;
      }
    }

    line.style.strokeDashoffset = total * (1 - progress);
    svg.style.setProperty("--line-opacity", progress > 0 ? 1 : 0);
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  new ResizeObserver(layout).observe(page);
  if (document.fonts) document.fonts.ready.then(layout);
  layout();
})();

document.getElementById("year").textContent = new Date().getFullYear();
