// main.js

// ===============================
// HTML Template Loader
// ===============================
async function loadHTML(url, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} failed: ${res.status}`);
    target.innerHTML = await res.text();
  } catch (err) {
    console.error("templateLoader:", err);
  }
}

// ===============================
// Fade-In Observer
// ===============================
let observer;
function setupFadeIn() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

// ===============================
// Event Delegation: Dropdowns
// ===============================
// Works even if buttons are added later or scripts run early.
function handleDropdownClick(btn) {
  const contentId = btn.getAttribute("aria-controls");
  if (!contentId) return;

  const content = document.getElementById(contentId);
  if (!content) return;

  const isOpen = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!isOpen));
  content.hidden = isOpen;

  // Optional: swap arrow if present
  const txt = btn.textContent || "";
  if (txt.includes("▼") || txt.includes("▲")) {
    btn.textContent = txt.replace(isOpen ? "▲" : "▼", isOpen ? "▼" : "▲");
  }
}

function setupDelegatedDropdowns() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".dropdown-toggle");
    if (btn) handleDropdownClick(btn);
  });

  // Keyboard accessibility (Enter/Space)
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.closest(".dropdown-toggle")) {
      e.preventDefault();
      handleDropdownClick(e.target.closest(".dropdown-toggle"));
    }
  });
}

// ===============================
// Event Delegation: Team Card Flips
// ===============================
function setupDelegatedCardFlips() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
      card.classList.toggle("flipped");
    }
  });
}

// ===============================
// Mobile Menu (after header loads)
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
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  // Inject header/footer first
  await Promise.all([
    loadHTML("/Itiner-Ease/header.html", "header-placeholder"),
    loadHTML("/Itiner-Ease/footer.html", "footer-placeholder"),
  ]);

  // Initialize behaviors (delegated where appropriate)
  setupFadeIn();
  setupDelegatedDropdowns();
  setupDelegatedCardFlips();
  setupMobileMenu();
});
