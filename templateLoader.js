// templateLoader.js

// Safely load and insert external HTML fragments
async function loadHTML(url, targetId) {
  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`templateLoader: Target element #${targetId} not found.`);
    return;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url} — ${response.status}`);
    }

    const html = await response.text();
    target.innerHTML = html;

  } catch (err) {
    console.error(`templateLoader: Error loading ${url}`, err);
  }
}

// Load header/footer once DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadHTML("header.html", "header-placeholder"),
    loadHTML("footer.html", "footer-placeholder")
  ]);

  // Re-run fade-in intersection observer AFTER header/footer load
  document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
  });
});
