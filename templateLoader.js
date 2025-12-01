// templateLoader.js

// Safely load and insert external HTML fragments
async function loadHTML(url, targetId) {
  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`templateLoader: Target element #${targetId} not found.`);
    return;
  }

  try {
    console.log(`templateLoader: Fetching ${url}`);
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

// Load header/footer once DOM is ready
document.addEventListener("DOMContentLoaded", async () => {

  // IMPORTANT: Use absolute repo paths so GitHub Pages loads them correctly
  await Promise.all([
    loadHTML("/Itiner-Ease/header.html", "header-placeholder"),
    loadHTML("/Itiner-Ease/footer.html", "footer-placeholder")
  ]);

  // Re-run fade-in intersection observer AFTER header/footer load
  // Only run if observer exists (prevents runtime crashes)
  if (typeof observer !== "undefined") {
    document.querySelectorAll(".fade-in").forEach(el => {
      observer.observe(el);
    });
  } else {
    console.warn("templateLoader: observer not defined — fade-in animations skipped.");
  }
});
