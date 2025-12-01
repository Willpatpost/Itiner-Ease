// main.js

// ===============================
// HTML Template Loader (Pre-Paint)
// ===============================
async function loadHTMLSync(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} failed: ${res.status}`);
  return res.text();
}

// ===============================
// Fade-In Observer
// ===============================
function setupFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-in").forEach((el) =>
    observer.observe(el)
  );
}

// ===============================
// Dropdowns
// ===============================
function handleDropdownClick(btn) {
  const contentId = btn.getAttribute("aria-controls");
  if (!contentId) return;

  const content = document.getElementById(contentId);
  if (!content) return;

  const open = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!open));
  content.hidden = open;

  // Optional arrow swap
  const txt = btn.textContent || "";
  if (txt.includes("▼") || txt.includes("▲")) {
    btn.textContent = txt.replace(open ? "▲" : "▼", open ? "▼" : "▲");
  }
}

function setupDelegatedDropdowns() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".dropdown-toggle");
    if (btn) handleDropdownClick(btn);
  });

  document.addEventListener("keydown", (e) => {
    if (
      (e.key === "Enter" || e.key === " ") &&
      e.target.closest(".dropdown-toggle")
    ) {
      e.preventDefault();
      handleDropdownClick(e.target.closest(".dropdown-toggle"));
    }
  });
}

// ===============================
// Team Card Flips
// ===============================
function setupDelegatedCardFlips() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) card.classList.toggle("flipped");
  });
}

// ===============================
// Mobile Menu
// ===============================
function setupMobileMenu() {
  const btn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("open");
  });
}

// ===============================
// DOM READY (Pre-Paint Includes)
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  const header = await loadHTMLSync("/Itiner-Ease/header.html");
  const footer = await loadHTMLSync("/Itiner-Ease/footer.html");

  document.getElementById("header-placeholder").outerHTML = header;
  document.getElementById("footer-placeholder").outerHTML = footer;

  // Now that header/footer exist → initialize interactions
  setupMobileMenu();
  setupFadeIn();
  setupDelegatedCardFlips();
  setupDelegatedDropdowns();
});
