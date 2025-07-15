const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();

const NEWS_FILE = path.join(__dirname, 'news.json');
const KEYWORDS = [
  'Bairiyadih', 'Harsidhi', 'Semra', 'Motihari', 'Purvi Champaran', 'East Champaran', 'Bihar',
  'बैरियाडीह', 'हरसिद्धि', 'सेमरा', 'मोतिहारी', 'पूर्वी चंपारण', 'बिहार'
];
const LANGUAGES = ['hi', 'en'];
const SOURCES = [
  {
    name: 'NewsData.io',
    url: `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&q=${encodeURIComponent(KEYWORDS.join(' OR '))}&language=hi,en&country=in`,
    map: (item) => ({
      id: item.link,
      title: item.title,
      summary: item.description,
      url: item.link,
      image: item.image_url,
      published: item.pubDate,
      lang: item.language,
      source: 'NewsData.io',
      tags: item.keywords || [],
    })
  },
  {
    name: 'NewsAPI.org',
    url: `https://newsapi.org/v2/everything?q=${encodeURIComponent(KEYWORDS.join(' OR '))}&language=en&apiKey=${process.env.NEWSAPI_API_KEY}`,
    map: (item) => ({
      id: item.url,
      title: item.title,
      summary: item.description,
      url: item.url,
      image: item.urlToImage,
      published: item.publishedAt,
      lang: 'en',
      source: 'NewsAPI.org',
      tags: [],
    })
  },
  {
    name: 'GNews',
    url: `https://gnews.io/api/v4/search?q=${encodeURIComponent(KEYWORDS.join(' OR '))}&lang=hi,en&country=in&token=${process.env.GNEWS_API_KEY}`,
    map: (item) => ({
      id: item.url,
      title: item.title,
      summary: item.description,
      url: item.url,
      image: item.image,
      published: item.publishedAt,
      lang: item.language,
      source: 'GNews',
      tags: [],
    })
  }
];

function filterNews(news) {
  // Only Hindi/English, only if keyword present in title/summary
  return news.filter(item =>
    LANGUAGES.includes(item.lang) &&
    KEYWORDS.some(k => (item.title + ' ' + item.summary).toLowerCase().includes(k.toLowerCase()))
  );
}

function removeOldNews(news) {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return news.filter(item => new Date(item.published).getTime() > cutoff);
}

async function fetchAllNews() {
  let allNews = [];
  for (const src of SOURCES) {
    try {
      const res = await axios.get(src.url);
      const items = res.data.results || res.data.articles || [];
      allNews = allNews.concat(items.map(src.map));
    } catch (e) {
      console.error('Error fetching from', src.name, e.message);
    }
  }
  return filterNews(allNews);
}

function saveNews(news) {
  fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf8');
}

function loadNews() {
  if (!fs.existsSync(NEWS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

async function updateNews() {
  const freshNews = await fetchAllNews();
  let existing = loadNews();
  // Remove old news
  existing = removeOldNews(existing);
  // Merge, dedupe by id
  const all = [...freshNews, ...existing].reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  const merged = Object.values(all).sort((a, b) => new Date(b.published) - new Date(a.published));
  saveNews(merged);
  console.log(`[NewsFetcher] Updated news. Total: ${merged.length}`);
}

function startNewsScheduler() {
  updateNews(); // Run once at startup
  cron.schedule('0 */12 * * *', updateNews); // Every 12 hours
}

module.exports = { startNewsScheduler, loadNews }; 