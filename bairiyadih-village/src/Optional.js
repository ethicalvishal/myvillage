import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import ConfirmDialog from './ConfirmDialog';
import DesignerCardBackground from './DesignerCardBackground';

const features = [
  { key: 'lostfound', hi: 'खोई हुई और पाई गई वस्तुएँ', en: 'Lost & Found Items', icon: '🔎' },
  { key: 'matrimonial', hi: 'शादी/विवाह जोन', en: 'Matrimonial Zone', icon: '💍' },
  { key: 'blood', hi: 'रक्तदाता', en: 'Blood Donor', icon: '🩸' },
  { key: 'fame', hi: 'गौरव दीवार', en: 'Wall of Fame', icon: '🏆' },
];

function Optional() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState({});
  const [form, setForm] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState({ key: '', id: '' });
  const [loading, setLoading] = useState({});

  useEffect(() => {
    features.forEach(f => {
      const q = query(collection(db, f.key), orderBy('date', 'desc'));
      onSnapshot(q, (snapshot) => {
        setData(d => ({ ...d, [f.key]: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) }));
      });
    });
  }, []);

  const handleChange = (e, key) => {
    setForm(f => ({ ...f, [key]: { ...f[key], [e.target.name]: e.target.value } }));
  };

  const handleSubmit = async (e, key) => {
    e.preventDefault();
    const entry = form[key];
    if (!entry || !entry.text) return;
    setLoading(l => ({ ...l, [key]: true }));
    alert(lang === 'hi' ? 'संदेश भेज दिया गया!' : 'Message sent!');
    setForm(f => ({ ...f, [key]: { text: '' } }));
    try {
      await fetch('https://bairiyadih-backend.onrender.com/api/input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: key,
          ...entry,
          lang,
          section: 'optional'
        })
      });
    } catch (error) {
      alert(lang === 'hi' ? 'भेजने में त्रुटि' : 'Error sending message');
    } finally {
      setLoading(l => ({ ...l, [key]: false }));
    }
  };

  const handleDelete = (key, id) => {
    setPendingDelete({ key, id });
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      await deleteDoc(doc(db, pendingDelete.key, pendingDelete.id));
    } catch (error) {
      alert(lang === 'hi' ? 'हटाने में त्रुटि' : 'Delete error');
    } finally {
      setPendingDelete({ key: '', id: '' });
    }
  };

  // Simple demo admin login (replace with secure auth in production)
  const handleLogin = e => {
    e.preventDefault();
    if (password === 'admin123') setAdmin(true);
    else alert('Wrong password');
    setPassword('');
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page in history
  };

  return (
    <main className="flex flex-col items-center mt-8 px-4 relative">
      
      {/* Back Button */}
      <div className="w-full max-w-6xl mb-4 relative z-10">
        <button 
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <span role="img" aria-label="back">⬅️</span>
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => { setShowConfirm(false); setPendingDelete({ key: '', id: '' }); }}
        title={lang === 'hi' ? 'क्या आप इस प्रविष्टि को हटाना चाहते हैं?' : 'Do you want to delete this entry?'}
        message={lang === 'hi' ? 'यह कार्रवाई पूर्ववत नहीं की जा सकती।' : 'This action cannot be undone.'}
        confirmText={lang === 'hi' ? 'हटाएं' : 'Delete'}
        cancelText={lang === 'hi' ? 'रद्द करें' : 'Cancel'}
      />
      <DesignerCardBackground variant="default">
        <div className="text-center mb-8">
          <span className="text-6xl mb-2 animate-bounce" role="img" aria-label="optional">✨</span>
          <h2 className="text-4xl font-extrabold text-purple-800 mb-2 drop-shadow-lg tracking-tight leading-[1.2] hindi-heading">
            {lang === 'hi' ? 'वैकल्पिक सेक्शन' : 'Optional Features'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            {lang === 'hi'
              ? 'गांव के लिए विशेष सुविधाएं: Lost & Found, विवाह/मेट्रिमोनियल, रक्तदाता, Wall of Fame आदि।'
              : 'Special features for the village: Lost & Found, Matrimonial, Blood Donor, Wall of Fame, etc.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-10">
          {features.map(f => (
            <div key={f.key} className="bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col items-center border-l-8 border-purple-400">
              <span className="text-4xl mb-2">{f.icon}</span>
              <div className="font-bold text-xl text-purple-900 mb-1">{lang === 'hi' ? f.hi : f.en}</div>
              <form onSubmit={e => handleSubmit(e, f.key)} className="flex gap-2 mb-2 w-full">
                <input
                  name="text"
                  value={form[f.key]?.text || ''}
                  onChange={e => handleChange(e, f.key)}
                  placeholder={lang === 'hi' ? 'जानकारी लिखें' : 'Enter info'}
                  className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-300 outline-none w-full"
                />
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg font-semibold shadow transition" disabled={loading[f.key]}>
                  {loading[f.key] ? (lang === 'hi' ? 'भेजा जा रहा है...' : 'Sending...') : (lang === 'hi' ? 'जोड़ें' : 'Add')}
                </button>
              </form>
              <ul className="space-y-2 w-full">
                {(f.key === 'lostfound' || f.key === 'fame') ? (
                  (data[f.key]?.filter(item => item.lang === lang).length === 0)
                    ? <li className="text-gray-500">{lang === 'hi' ? 'कोई प्रविष्टि नहीं।' : 'No entries yet.'}</li>
                    : data[f.key]?.filter(item => item.lang === lang).map(item => (
                        <li key={item.id} className="border rounded p-2 flex justify-between items-center bg-purple-50">
                          <span>{item.text} <span className="text-xs text-gray-400">({new Date(item.date).toLocaleString(lang)})</span></span>
                          {admin && (
                            <button onClick={() => handleDelete(f.key, item.id)} className="ml-2 text-red-600 hover:underline">{lang === 'hi' ? 'हटाएं' : 'Delete'}</button>
                          )}
                        </li>
                      ))
                ) : (
                  (data[f.key]?.length === 0)
                    ? <li className="text-gray-500">{lang === 'hi' ? 'कोई प्रविष्टि नहीं।' : 'No entries yet.'}</li>
                    : data[f.key]?.map(item => (
                        <li key={item.id} className="border rounded p-2 flex justify-between items-center bg-purple-50">
                          <span>{item.text} <span className="text-xs text-gray-400">({new Date(item.date).toLocaleString(lang)})</span></span>
                          {admin && (
                            <button onClick={() => handleDelete(f.key, item.id)} className="ml-2 text-red-600 hover:underline">{lang === 'hi' ? 'हटाएं' : 'Delete'}</button>
                          )}
                        </li>
                      ))
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="my-6">
          <h3 className="text-lg font-semibold text-green-800 mb-1 flex items-center gap-2">
            <span role="img" aria-label="admin" className="text-xl">🔑</span>
            {lang === 'hi' ? 'एडमिन लॉगिन' : 'Admin Login'}
          </h3>
          {!admin && (
            <form onSubmit={handleLogin} className="flex gap-2 items-center mt-2">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={lang === 'hi' ? 'पासवर्ड' : 'Password'}
                className="border px-2 py-1 rounded"
              />
              <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">{lang === 'hi' ? 'लॉगिन' : 'Login'}</button>
            </form>
          )}
        </div>
      </DesignerCardBackground>
    </main>
  );
}

export default Optional; 