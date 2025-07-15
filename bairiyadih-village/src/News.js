import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DesignerCardBackground from './DesignerCardBackground';
import { useNavigate } from 'react-router-dom';

const FILTERS = [
  { key: 'today', hi: 'आज', en: 'Today' },
  { key: 'week', hi: 'सप्ताह', en: 'This Week' },
  { key: 'important', hi: 'महत्वपूर्ण', en: 'Important' },
  { key: 'panchayat', hi: 'पंचायत', en: 'Panchayat' },
];
const TYPE_COLORS = {
  development: 'border-green-500',
  govt: 'border-yellow-400',
  emergency: 'border-red-500',
  education: 'border-blue-500',
  default: 'border-gray-300',
};
const ALERT_KEYWORDS = [
  'हड़ताल', 'बंद', 'दुर्घटना', 'बाढ़', 'अस्पताल', 'स्कूल बंद',
  'protest', 'strike', 'accident', 'flood', 'hospital', 'school closed'
];

function getType(news) {
  if (news.tags && news.tags.includes('emergency')) return 'emergency';
  if (news.tags && news.tags.includes('govt')) return 'govt';
  if (news.tags && news.tags.includes('development')) return 'development';
  if (news.tags && news.tags.includes('education')) return 'education';
  // Fallback: keyword check
  if (ALERT_KEYWORDS.some(k => (news.title + ' ' + news.summary).toLowerCase().includes(k.toLowerCase()))) return 'emergency';
  return 'default';
}

function News() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('today');
  // Admin panel state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({ title: '', summary: '', image: '', tags: '', lang: lang });
  const [adminMsg, setAdminMsg] = useState(null);
  const [publicForm, setPublicForm] = useState({ name: '', title: '', summary: '', image: '', tags: '', lang: lang });
  const [publicMsg, setPublicMsg] = useState(null);
  const [showPublicForm, setShowPublicForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(window.location.search.includes('admin=1'));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/news?filter=${filter}`)
      .then(res => res.json())
      .then(data => {
        setNews(data.news || []);
        setLoading(false);
      })
      .catch(e => {
        setError('Failed to load news');
        setLoading(false);
      });
  }, [filter, adminMsg]);

  // Admin form handlers
  const handleAdminInput = e => setAdminForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleAdminPost = async e => {
    e.preventDefault();
    setAdminMsg(null);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...adminForm,
          tags: adminForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        })
      });
      if (!res.ok) throw new Error('Failed to post');
      setAdminMsg({ type: 'success', text: lang === 'hi' ? 'खबर जोड़ दी गई!' : 'News posted!' });
      setAdminForm({ title: '', summary: '', image: '', tags: '', lang });
    } catch {
      setAdminMsg({ type: 'error', text: lang === 'hi' ? 'खबर जोड़ने में त्रुटि!' : 'Failed to post news!' });
    }
  };
  const handlePin = async id => {
    setAdminMsg(null);
    try {
      const res = await fetch(`/api/news/pin/${id}`, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to pin');
      setAdminMsg({ type: 'success', text: lang === 'hi' ? 'पिन कर दिया गया!' : 'Pinned!' });
    } catch {
      setAdminMsg({ type: 'error', text: lang === 'hi' ? 'पिन करने में त्रुटि!' : 'Failed to pin!' });
    }
  };
  const handleDelete = async id => {
    setAdminMsg(null);
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setAdminMsg({ type: 'success', text: lang === 'hi' ? 'हटा दिया गया!' : 'Deleted!' });
    } catch {
      setAdminMsg({ type: 'error', text: lang === 'hi' ? 'हटाने में त्रुटि!' : 'Failed to delete!' });
    }
  };

  const handlePublicInput = e => setPublicForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handlePublicPost = async e => {
    e.preventDefault();
    setPublicMsg(null);
    try {
      await new Promise(res => setTimeout(res, 700));
      setPublicMsg({ type: 'success', text: lang === 'hi' ? 'खबर भेज दी गई!' : 'News submitted!' });
      setPublicForm({ name: '', title: '', summary: '', image: '', tags: '', lang });
    } catch {
      setPublicMsg({ type: 'error', text: lang === 'hi' ? 'खबर भेजने में त्रुटि!' : 'Failed to submit news!' });
    }
  };

  return (
    <main className="flex flex-col items-center mt-8 px-4 relative font-[Noto Sans Devanagari, Mangal, Arial, sans-serif]">
      {/* Go Back Button */}
      <div className="w-full max-w-6xl mb-4 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-400 to-yellow-400 text-white px-6 py-3 rounded-full shadow-lg hover:from-red-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 font-medium focus:ring-2 focus:ring-yellow-500"
        >
          <span role="img" aria-label="back">⬅️</span>
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl w-full border-l-8 border-red-400 mt-8 mb-8 relative z-10 overflow-hidden">
        {/* Subtle SVG Rural Motif */}
        <svg className="absolute bottom-0 left-0 w-full h-24 opacity-10 pointer-events-none select-none" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="100" rx="120" ry="20" fill="#fecaca" />
          <ellipse cx="600" cy="110" rx="180" ry="25" fill="#fef08a" />
          <ellipse cx="1200" cy="100" rx="140" ry="18" fill="#fca5a5" />
          <rect x="1000" y="90" width="40" height="20" rx="6" fill="#fcd34d" />
          <rect x="1020" y="100" width="10" height="10" fill="#fde68a" />
          <rect x="300" y="95" width="30" height="15" rx="4" fill="#fecaca" />
          <rect x="310" y="105" width="10" height="7" fill="#f87171" />
        </svg>
        {/* Admin Panel */}
        {isAdmin && (
          <div className="mb-8 p-6 bg-yellow-50 rounded-2xl shadow-lg border-l-8 border-yellow-400">
            <h3 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">🛠️ {lang === 'hi' ? 'एडमिन न्यूज़ पैनल' : 'Admin News Panel'}</h3>
            <form className="flex flex-col gap-3 md:flex-row md:items-end md:gap-6" onSubmit={handleAdminPost}>
              <input name="title" value={adminForm.title} onChange={handleAdminInput} required placeholder={lang === 'hi' ? 'शीर्षक' : 'Title'} className="flex-1 p-2 rounded border-2 border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500" />
              <input name="summary" value={adminForm.summary} onChange={handleAdminInput} required placeholder={lang === 'hi' ? 'सारांश' : 'Summary'} className="flex-1 p-2 rounded border-2 border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500" />
              <input name="image" value={adminForm.image} onChange={handleAdminInput} placeholder={lang === 'hi' ? 'इमेज URL' : 'Image URL'} className="flex-1 p-2 rounded border-2 border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500" />
              <input name="tags" value={adminForm.tags} onChange={handleAdminInput} placeholder={lang === 'hi' ? 'टैग (कॉमा सेपरेटेड)' : 'Tags (comma separated)'} className="flex-1 p-2 rounded border-2 border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500" />
              <select name="lang" value={adminForm.lang} onChange={handleAdminInput} className="p-2 rounded border-2 border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500">
                <option value="hi">हिन्दी</option>
                <option value="en">English</option>
              </select>
              <button type="submit" className="bg-yellow-500 text-white px-5 py-2 rounded font-bold hover:bg-yellow-600 transition-all focus:ring-2 focus:ring-yellow-500">{lang === 'hi' ? 'खबर जोड़ें' : 'Post News'}</button>
            </form>
            {adminMsg && (
              <div className={`mt-3 text-sm font-bold ${adminMsg.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>{adminMsg.text}</div>
            )}
          </div>
        )}
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-red-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="news" className="text-4xl">📰</span>
            {lang === 'hi' ? 'गाँव की खबरें' : 'Village News'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-black leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'गाँव, सरकार, खेल, विकास, और संस्कृति से जुड़ी ताजा खबरें।' 
              : 'Latest news about village, government, sports, development, and culture.'}
          </p>
        </div>
        {/* Public Add News Button & Enhanced Form */}
        <div className="mb-8 max-w-6xl w-full mx-auto">
          <div className="flex justify-end mb-2">
            {!showPublicForm && (
              <button
                onClick={() => setShowPublicForm(true)}
                className="bg-red-500 text-white font-semibold text-base px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-all flex items-center gap-2 focus:ring-2 focus:ring-yellow-500"
              >
                <span className="text-lg font-bold">+</span>
                {lang === 'hi' ? 'खबर जोड़ें' : 'Add News'}
              </button>
              )}
            </div>
          {showPublicForm && (
            <div className="relative mt-4 bg-red-50 rounded-xl shadow-lg border-l-4 border-red-400 p-6">
              <button onClick={() => { setShowPublicForm(false); setPublicMsg(null); }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold focus:ring-2 focus:ring-yellow-500" aria-label="Close">✕</button>
              <h3 className="text-lg font-bold text-red-700 mb-3 text-center">{lang === 'hi' ? 'खबर जोड़ें' : 'Add News'}</h3>
              <form className="flex flex-col gap-3" onSubmit={handlePublicPost}>
                <input name="name" value={publicForm.name} onChange={handlePublicInput} required placeholder={lang === 'hi' ? 'आपका नाम' : 'Your Name'} className="p-2 rounded border border-red-200 focus:border-red-400 focus:shadow focus:shadow-red-100 transition-all focus:ring-2 focus:ring-yellow-500" />
                <input name="title" value={publicForm.title} onChange={handlePublicInput} required placeholder={lang === 'hi' ? 'खबर का शीर्षक' : 'News Title'} className="p-2 rounded border border-red-200 focus:border-red-400 focus:shadow focus:shadow-red-100 transition-all focus:ring-2 focus:ring-yellow-500" />
                <input name="summary" value={publicForm.summary} onChange={handlePublicInput} required placeholder={lang === 'hi' ? 'सारांश' : 'Summary'} className="p-2 rounded border border-red-200 focus:border-red-400 focus:shadow focus:shadow-red-100 transition-all focus:ring-2 focus:ring-yellow-500" />
                <input name="image" value={publicForm.image} onChange={handlePublicInput} placeholder={lang === 'hi' ? 'इमेज URL' : 'Image URL'} className="p-2 rounded border border-red-200 focus:border-red-400 focus:shadow focus:shadow-red-100 transition-all focus:ring-2 focus:ring-yellow-500" />
                <input name="tags" value={publicForm.tags} onChange={handlePublicInput} placeholder={lang === 'hi' ? 'टैग (कॉमा सेपरेटेड)' : 'Tags (comma separated)'} className="p-2 rounded border border-red-200 focus:border-red-400 focus:shadow focus:shadow-red-100 transition-all focus:ring-2 focus:ring-yellow-500" />
                <select name="lang" value={publicForm.lang} onChange={handlePublicInput} className="p-2 rounded border border-red-200 focus:border-red-400 focus:shadow focus:shadow-red-100 transition-all focus:ring-2 focus:ring-yellow-500">
                  <option value="hi">हिन्दी</option>
                  <option value="en">English</option>
                </select>
                <button type="submit" className="bg-gradient-to-r from-red-500 to-yellow-400 text-white px-6 py-2 rounded-lg font-bold text-base shadow hover:from-red-600 hover:to-yellow-500 transition-all mt-2 focus:ring-2 focus:ring-yellow-500">{lang === 'hi' ? 'खबर भेजें' : 'Submit News'}</button>
              </form>
              {publicMsg && <div className={`mt-3 text-sm font-bold ${publicMsg.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>{publicMsg.text}</div>}
            </div>
          )}
                  </div>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-8 relative z-10">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full font-bold border-2 transition-all duration-200 ${filter === f.key ? 'bg-red-600 text-white border-red-600 scale-105' : 'bg-white text-red-800 border-red-300 hover:bg-red-50'} focus:ring-2 focus:ring-yellow-500`}
            >
              {lang === 'hi' ? f.hi : f.en}
            </button>
          ))}
                </div>
        {/* News Cards */}
        {loading && <div className="text-center text-lg text-gray-500 my-10">{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</div>}
        {error && <div className="text-center text-red-600 my-10">{error}</div>}
        {!loading && !error && news.length === 0 && (
          <div className="text-center text-black my-10">{lang === 'hi' ? 'कोई खबर नहीं मिली।' : 'No news found.'}</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {news.map((n, i) => {
            const type = getType(n);
            return (
              <div key={n.id || i} className={`relative bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300 flex flex-col border-l-8 ${TYPE_COLORS[type] || TYPE_COLORS.default}`}> 
                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  {type === 'emergency' && (
                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse-glow">{lang === 'hi' ? 'ब्रेकिंग' : 'Breaking'}</span>
                  )}
                  {n.tags && n.tags.includes('pinned') && (
                    <span className="bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-bold">{lang === 'hi' ? 'पिन' : 'Pinned'}</span>
                  )}
                  {n.tags && n.tags.includes('important') && (
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">{lang === 'hi' ? 'महत्वपूर्ण' : 'Important'}</span>
                  )}
                </div>
                {/* Image */}
                {n.image && <img src={n.image} alt={n.title || 'news image'} className="w-full h-40 object-cover rounded-xl mb-4" />}
                {/* Title */}
                <div className="font-bold text-xl text-red-900 mb-2 hindi-heading line-clamp-2">{n.title}</div>
                {/* Summary */}
                <div className="text-black mb-3 line-clamp-3">{n.summary}</div>
                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-gray-800 mb-2">
                  <span>{n.source}</span>
                  <span>·</span>
                  <span>{new Date(n.published).toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                {/* Read More */}
                {n.url && <a href={n.url} target="_blank" rel="noopener noreferrer" className="mt-auto text-sm font-bold text-red-700 hover:underline">{lang === 'hi' ? 'पूरा पढ़ें' : 'Read More'} →</a>}
                {/* Admin Pin/Delete */}
                {isAdmin && (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handlePin(n.id)} className="bg-yellow-400 text-white px-3 py-1 rounded font-bold hover:bg-yellow-500 transition-all text-xs focus:ring-2 focus:ring-yellow-500">{lang === 'hi' ? 'पिन' : 'Pin'}</button>
                    <button onClick={() => handleDelete(n.id)} className="bg-red-600 text-white px-3 py-1 rounded font-bold hover:bg-red-700 transition-all text-xs focus:ring-2 focus:ring-yellow-500" aria-label="Delete">{lang === 'hi' ? 'हटाएँ' : 'Delete'}</button>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        {/* Bilingual Rural Quote/Fact at Bottom */}
        <div className="flex justify-center items-center mt-8 mb-2 relative z-10">
          <span className="text-base md:text-lg text-red-800 font-semibold flex items-center gap-2 bg-red-100/60 px-3 py-1 rounded-full border border-red-300/40 shadow-sm">
            <span>🌾</span>
            {lang === 'hi' ? 'खबरें गाँव की, पहचान गाँव की।' : 'News is the voice of the village.'}
            <span>📰</span>
          </span>
        </div>
      </div>
    </main>
  );
}

export default News; 