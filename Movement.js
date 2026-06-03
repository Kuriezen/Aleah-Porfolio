document.addEventListener("DOMContentLoaded", () => {

// ================================
// FADE-IN REVEAL ANIMATION
// ================================

const fadeElements = document.querySelectorAll(
".container, .hero-content, .tool, .role, .stat-card, .skill-card"
);

const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {

```
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }

  });
},
{
  threshold: 0.15,
}
```

);

fadeElements.forEach((el) => {
el.classList.add("fade-in");
observer.observe(el);
});

// ================================
// ACTIVE NAVBAR LINK
// ================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".top-nav a");

window.addEventListener("scroll", () => {

```
let current = "";

sections.forEach((section) => {

  const sectionTop = section.offsetTop - 150;

  if (window.pageYOffset >= sectionTop) {
    current = section.getAttribute("id");
  }

});

navLinks.forEach((link) => {

  link.classList.remove("active");

  if (link.getAttribute("href") === `#${current}`) {
    link.classList.add("active");
  }

});
```

});

// ================================
// HEADER SHADOW ON SCROLL
// ================================

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

```
if (window.scrollY > 50) {
  header.style.boxShadow =
    "0 5px 30px rgba(0,0,0,0.25)";
} else {
  header.style.boxShadow = "none";
}
```

});

// ================================
// SCROLL TO TOP BUTTON
// ================================

const goUpBtn = document.createElement("button");

goUpBtn.innerHTML = "↑";
goUpBtn.id = "goUpBtn";

document.body.appendChild(goUpBtn);

goUpBtn.style.position = "fixed";
goUpBtn.style.bottom = "30px";
goUpBtn.style.right = "30px";
goUpBtn.style.width = "55px";
goUpBtn.style.height = "55px";
goUpBtn.style.borderRadius = "50%";
goUpBtn.style.border = "none";
goUpBtn.style.cursor = "pointer";
goUpBtn.style.fontSize = "22px";
goUpBtn.style.fontWeight = "bold";
goUpBtn.style.background =
"linear-gradient(135deg, #ff5ca8, #ff9ad5)";
goUpBtn.style.color = "white";
goUpBtn.style.display = "none";
goUpBtn.style.zIndex = "999";
goUpBtn.style.boxShadow =
"0 0 20px rgba(255,92,168,.4)";
goUpBtn.style.transition = ".3s";

window.addEventListener("scroll", () => {

```
if (
  document.body.scrollTop > 300 ||
  document.documentElement.scrollTop > 300
) {
  goUpBtn.style.display = "block";
} else {
  goUpBtn.style.display = "none";
}
```

});

goUpBtn.addEventListener("mouseenter", () => {
goUpBtn.style.transform = "translateY(-5px)";
});

goUpBtn.addEventListener("mouseleave", () => {
goUpBtn.style.transform = "translateY(0)";
});

goUpBtn.addEventListener("click", () => {

```
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
```

});

// ================================
// TYPING EFFECT
// ================================

const heroTitle = document.querySelector(".hero-text h2");

if (heroTitle) {

```
const originalText = heroTitle.textContent;

heroTitle.textContent = "";

let index = 0;

function typeEffect() {

  if (index < originalText.length) {

    heroTitle.textContent += originalText.charAt(index);

    index++;

    setTimeout(typeEffect, 40);

  }

}

typeEffect();
```

}

// ================================
// TOOL CARD HOVER EFFECT
// ================================

const tools = document.querySelectorAll(".tool");

tools.forEach((tool) => {

```
tool.addEventListener("mousemove", (e) => {

  const rect = tool.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  tool.style.background = `
    radial-gradient(
      circle at ${x}px ${y}px,
      rgba(255,92,168,0.18),
      rgba(255,255,255,0.06)
    )
  `;
});

tool.addEventListener("mouseleave", () => {

  tool.style.background =
    "rgba(255,255,255,0.07)";

});
```

});

// ================================
// HERO IMAGE PARALLAX EFFECT
// ================================

window.addEventListener("scroll", () => {

```
const scrolled = window.pageYOffset;

const heroImage =
  document.querySelector(".hero-image img");

if (heroImage) {

  heroImage.style.transform =
    `translateY(${scrolled * 0.08}px)`;

}
```

});

});
