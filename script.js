const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const typedText = document.getElementById("typedText");
const year = document.getElementById("year");

const phrases = [
  "secure APIs",
  "FastAPI services",
  "data pipelines",
  "cloud platforms",
  "React dashboards"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];
  typedText.textContent = currentPhrase.slice(0, charIndex);

  if (!deleting && charIndex < currentPhrase.length) {
    charIndex += 1;
    setTimeout(typeLoop, 82);
    return;
  }

  if (!deleting && charIndex === currentPhrase.length) {
    deleting = true;
    setTimeout(typeLoop, 1100);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 42);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  setTimeout(typeLoop, 240);
}

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☾" : "☀";
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    document.body.classList.remove("nav-open");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});


const rootStyle = document.documentElement.style;
let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY || window.pageYOffset;
  rootStyle.setProperty("--scroll-y", `${scrollY}px`);
  rootStyle.setProperty("--pattern-x", `${scrollY * -0.08}px`);
  rootStyle.setProperty("--pattern-y", `${scrollY * 0.12}px`);
  ticking = false;
}

function requestParallax() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

updateParallax();
window.addEventListener("scroll", requestParallax, { passive: true });


year.textContent = new Date().getFullYear();
typeLoop();
