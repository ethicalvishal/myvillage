const express = require('express');
const { loadNews } = require('./newsFetcher');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const NEWS_FILE = path.join(__dirname, 'news.json');
const ALERT_KEYWORDS = [
  'हड़ताल', 'बंद', 'दुर्घटना', 'बाढ़', 'अस्पताल', 'स्कूल बंद',
  'protest', 'strike', 'accident', 'flood', 'hospital', 'school closed'
];

function isAdmin(req) {
  // TODO: Replace with real auth
  return true;
}

function getNews({ filter, type, lang, date }) {
  let news = loadNews();
  if (filter === 'today') {
    const today = new Date().toISOString().slice(0, 10);
    news = news.filter(n => n.published && n.published.slice(0, 10) === today);
  } else if (filter === 'week') {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    news = news.filter(n => new Date(n.published).getTime() > weekAgo);
  } else if (filter === 'important') {
    news = news.filter(n => n.tags && n.tags.includes('important'));
  } else if (filter === 'panchayat') {
    news = news.filter(n => /panchayat|पंचायत/i.test(n.title + n.summary));
  }
  if (type) {
    news = news.filter(n => n.tags && n.tags.includes(type));
  }
  if (lang) {
    news = news.filter(n => n.lang === lang);
  }
  if (date) {
    news = news.filter(n => n.published && n.published.slice(0, 10) === date);
  }
  return news.sort((a, b) => new Date(b.published) - new Date(a.published));
}

router.get('/', (req, res) => {
  const { filter, type, lang, date } = req.query;
  res.json({ news: getNews({ filter, type, lang, date }) });
});

router.get('/alerts', (req, res) => {
  const news = loadNews();
  const alerts = news.filter(n =>
    ALERT_KEYWORDS.some(k => (n.title + ' ' + n.summary).toLowerCase().includes(k.toLowerCase()))
  );
  res.json({ alerts });
});

router.post('/', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' });
  const { title, summary, url, image, lang, tags } = req.body;
  if (!title || !summary) return res.status(400).json({ error: 'Missing fields' });
  const news = loadNews();
  const item = {
    id: 'manual-' + Date.now(),
    title, summary, url: url || '', image: image || '',
    published: new Date().toISOString(), lang: lang || 'hi', source: 'manual', tags: tags || []
  };
  news.unshift(item);
  fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf8');
  res.json({ success: true, item });
});

router.put('/pin/:id', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' });
  const { id } = req.params;
  let news = loadNews();
  news = news.map(n => n.id === id ? { ...n, tags: [...(n.tags || []), 'pinned'] } : n);
  fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf8');
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' });
  const { id } = req.params;
  let news = loadNews();
  news = news.filter(n => n.id !== id);
  fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf8');
  res.json({ success: true });
});

module.exports = router; 