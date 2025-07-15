import React from 'react';
import { useTranslation } from 'react-i18next';
import DesignerCardBackground from './DesignerCardBackground';
import { useNavigate } from 'react-router-dom';

function Gallery() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();
  const categories = [
    { icon: '🌾', hi: 'खेत', en: 'Fields', descHi: 'हरे-भरे खेत', descEn: 'Green fields' },
    { icon: '🛕', hi: 'मंदिर', en: 'Temples', descHi: 'प्राचीन मंदिर', descEn: 'Ancient temples' },
    { icon: '🎪', hi: 'मेला', en: 'Fair', descHi: 'गाँव का मेला', descEn: 'Village fair' },
    { icon: '⚽', hi: 'खेल', en: 'Sports', descHi: 'गाँव के खेल', descEn: 'Village sports' }
  ];
  const [form, setForm] = React.useState({ name: '', url: '', category: '', caption: '' });
  const [formMsg, setFormMsg] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const handleFormChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleFormSubmit = async e => {
    e.preventDefault();
    setFormMsg(null);
    try {
      await new Promise(res => setTimeout(res, 700));
      setFormMsg({ type: 'success', text: lang === 'hi' ? 'फोटो भेज दी गई!' : 'Photo submitted!' });
      setForm({ name: '', url: '', category: '', caption: '' });
    } catch {
      setFormMsg({ type: 'error', text: lang === 'hi' ? 'फोटो भेजने में त्रुटि!' : 'Failed to submit photo!' });
    }
  };
  return (
    <main className="flex flex-col items-center mt-8 px-4 relative">
      {/* Go Back Button */}
      <div className="w-full max-w-6xl mb-4 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-3 rounded-full shadow-lg hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 font-medium focus:ring-2 focus:ring-orange-500"
        >
          <span role="img" aria-label="back">⬅️</span>
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl w-full border-l-8 border-orange-400 mt-8 mb-8 relative z-10 overflow-hidden">
        {/* Subtle SVG Rural Motif */}
        <svg className="absolute bottom-0 left-0 w-full h-24 opacity-10 pointer-events-none select-none" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="100" rx="120" ry="20" fill="#fdba74" />
          <ellipse cx="600" cy="110" rx="180" ry="25" fill="#fef08a" />
          <ellipse cx="1200" cy="100" rx="140" ry="18" fill="#fca5a5" />
          <rect x="1000" y="90" width="40" height="20" rx="6" fill="#fcd34d" />
          <rect x="1020" y="100" width="10" height="10" fill="#fde68a" />
          <rect x="300" y="95" width="30" height="15" rx="4" fill="#fdba74" />
          <rect x="310" y="105" width="10" height="7" fill="#f59e42" />
        </svg>
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-orange-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="gallery" className="text-4xl">📸</span>
            {lang === 'hi' ? 'गैलरी' : 'Gallery'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-600 to-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-black leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'गाँव की सुंदरता, संस्कृति और खेल की झलक। श्रेणी चुनें और तस्वीरें देखें!' 
              : 'A glimpse of village beauty, culture, and sports. Select a category to explore photos!'}
          </p>
        </div>
        {/* Public Add Photo Button & Enhanced Form */}
        <div className="mb-8 max-w-6xl w-full mx-auto">
          <div className="flex justify-end mb-2">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-500 text-white font-semibold text-base px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition-all flex items-center gap-2 focus:ring-2 focus:ring-orange-500"
              >
                <span className="text-lg font-bold">+</span>
                {lang === 'hi' ? 'फोटो जोड़ें' : 'Add Photo'}
              </button>
            )}
                </div>
          {showForm && (
            <div className="relative mt-4 bg-orange-50 rounded-xl shadow-lg border-l-4 border-orange-400 p-6">
              <button onClick={() => { setShowForm(false); setFormMsg(null); }} className="absolute top-2 right-2 text-gray-400 hover:text-orange-500 text-xl font-bold focus:ring-2 focus:ring-orange-500" aria-label="Close">✕</button>
              <h3 className="text-lg font-bold text-orange-700 mb-3 text-center">{lang === 'hi' ? 'फोटो जोड़ें' : 'Add Photo'}</h3>
              <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
                <input name="name" value={form.name} onChange={handleFormChange} required placeholder={lang === 'hi' ? 'आपका नाम' : 'Your Name'} className="p-2 rounded border border-orange-200 focus:border-orange-400 focus:shadow focus:shadow-orange-100 transition-all" />
                <input name="url" value={form.url} onChange={handleFormChange} required placeholder={lang === 'hi' ? 'फोटो URL' : 'Photo URL'} className="p-2 rounded border border-orange-200 focus:border-orange-400 focus:shadow focus:shadow-orange-100 transition-all" />
                <select name="category" value={form.category} onChange={handleFormChange} required className="p-2 rounded border border-orange-200 focus:border-orange-400 focus:shadow focus:shadow-orange-100 transition-all">
                  <option value="">{lang === 'hi' ? 'श्रेणी चुनें' : 'Select Category'}</option>
                  {categories.map((cat, i) => <option key={i} value={lang === 'hi' ? cat.hi : cat.en}>{lang === 'hi' ? cat.hi : cat.en}</option>)}
                </select>
                <input name="caption" value={form.caption} onChange={handleFormChange} placeholder={lang === 'hi' ? 'कैप्शन/विवरण' : 'Caption/Description'} className="p-2 rounded border border-orange-200 focus:border-orange-400 focus:shadow focus:shadow-orange-100 transition-all" />
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-2 rounded-lg font-bold text-base shadow hover:from-orange-600 hover:to-yellow-500 transition-all mt-2 focus:ring-2 focus:ring-orange-500">{lang === 'hi' ? 'फोटो भेजें' : 'Submit Photo'}</button>
              </form>
              {formMsg && <div className={`mt-3 text-sm font-bold ${formMsg.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>{formMsg.text}</div>}
            </div>
          )}
        </div>
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'श्रेणियाँ' : 'Categories'}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${lang === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? cat.hi : cat.en}</h4>
                <p className="text-sm text-black">{lang === 'hi' ? cat.descHi : cat.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        <div className="text-center mt-8 relative z-10">
          <span className="text-2xl">🖼️</span>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mx-auto my-2"></div>
          <p className="text-base text-orange-700 font-semibold italic">
            {lang === 'hi' ? 'गाँव की यादें, तस्वीरों में।' : 'Village memories, in pictures.'}
          </p>
            </div>
        {/* Bilingual Rural Quote/Fact at Bottom */}
        <div className="flex justify-center items-center mt-8 mb-2 relative z-10">
          <span className="text-base md:text-lg text-orange-800 font-semibold flex items-center gap-2 bg-orange-100/60 px-3 py-1 rounded-full border border-orange-300/40 shadow-sm">
            <span>🌾</span>
            {lang === 'hi' ? 'गाँव की तस्वीरें, गाँव की पहचान।' : 'Photos are the village identity.'}
            <span>🌻</span>
          </span>
        </div>
      </div>
    </main>
  );
}

export default Gallery; 