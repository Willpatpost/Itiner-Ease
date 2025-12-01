//main.js

// ===============================
// HTML Template Loader
// ===============================

async function loadHTML(url, targetId) {
  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`templateLoader: Target element #${targetId} not found.`);
    return;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url} — HTTP ${response.status}`);
    }

    const html = await response.text();
    target.innerHTML = html;

  } catch (err) {
    console.error(`templateLoader: Error loading ${url}`, err);
  }
}

// ===============================
// Fade-In Intersection Observer
// ===============================

let observer;

function setupFadeIn() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// ===============================
// Dropdown Toggles (Reports Page)
// ===============================

function setupDropdowns() {
  document.querySelectorAll(".dropdown-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const content = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", !isOpen);
      content.hidden = isOpen;

      button.textContent = button.textContent.replace(
        isOpen ? "▲" : "▼",
        isOpen ? "▼" : "▲"
      );
    });
  });
}

// ===============================
// Mobile Menu Toggle
// ===============================

function setupMobileMenu() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", !isOpen);
      navMenu.classList.toggle("open");
    });
  }
}

// ===============================
// DOM Ready → Load Templates + Init All Behaviors
// ===============================

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadHTML("/Itiner-Ease/header.html", "header-placeholder"),
    loadHTML("/Itiner-Ease/footer.html", "footer-placeholder")
  ]);

  setupFadeIn();
  setupDropdowns();
  setupMobileMenu();
});
