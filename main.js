//main.js

// ===============================
// HTML Template Loader
// ===============================
async function loadHTML(url, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url} failed: ${response.status}`);

    target.innerHTML = await response.text();
  } catch (err) {
    console.error("templateLoader:", err);
  }
}

// ===============================
// Fade-In Observer
// ===============================
let observer;

function setupFadeIn() {
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// ===============================
// Dropdowns
// ===============================
function setupDropdowns() {
  document.querySelectorAll(".dropdown-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = document.getElementById(btn.getAttribute("aria-controls"));
      const open = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", !open);
      content.hidden = open;

      btn.textContent = btn.textContent.replace(
        open ? "▲" : "▼",
        open ? "▼" : "▲"
      );
    });
  });
}

// ===============================
// Card Flips (Team Page)
// ===============================
function setupCardFlips() {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
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
    btn.setAttribute("aria-expanded", !open);
    menu.classList.toggle("open");
  });
}

// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadHTML("/Itiner-Ease/header.html", "header-placeholder"),
    loadHTML("/Itiner-Ease/footer.html", "footer-placeholder"),
  ]);

  setupFadeIn();
  setupDropdowns();
  setupCardFlips();
  setupMobileMenu();
});
