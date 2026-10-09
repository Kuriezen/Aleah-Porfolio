// Mobile menu
const navToggle = document.getElementById("navToggle");
const topNav = document.getElementById("topNav");

navToggle.addEventListener("click", () => {
  const open = topNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  navToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

topNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    topNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", false);
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
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
