// Function to load HTML content into a container element
function loadHTML(url, elementId) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok for ' + url);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading ' + url + ':', error);
    });
}

// Load header and footer after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('header.html', 'header-placeholder');
  loadHTML('footer.html', 'footer-placeholder');
});
