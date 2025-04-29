const API_KEY = '05d56c9ff7124c87bdd6f8991344e878';
const BASE_URL = 'https://newsapi.org/v2/everything';
const newsContainer = document.getElementById('news-container');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Fetch top headlines on page load
window.addEventListener('DOMContentLoaded', () => {
  fetchNews();
});

// Fetch news function
async function fetchNews(query = '') {
  let url = `${BASE_URL}?country=us&apiKey=${API_KEY}`;
  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }
  newsContainer.innerHTML = '<p>Loading...</p>';
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles || []);
  } catch (error) {
    newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
  }
}

// Display news articles
function displayNews(articles) {
  newsContainer.innerHTML = '';
  if (!articles.length) {
    newsContainer.innerHTML = '<p>No news articles found.</p>';
    return;
  }
  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/320x180?text=No+Image'}" alt="News Image">
      <div class="content">
        <h2>${article.title}</h2>
        <p>${article.description || 'No description available.'}</p>
        <p><strong>Source:</strong> ${article.source.name || 'Unknown'}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

// Search button event
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  fetchNews(query);
});

// Optional: Enter key triggers search
searchInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    fetchNews(searchInput.value.trim());
  }
});

