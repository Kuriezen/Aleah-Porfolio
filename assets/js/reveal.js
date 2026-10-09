// Adds .show to every .reveal element as it scrolls into view (see motion.css)
export function initReveal() {
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
}
