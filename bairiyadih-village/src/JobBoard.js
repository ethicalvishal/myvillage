import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db, storage } from './firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const categories = [
  { en: 'Job', hi: 'नौकरी' },
  { en: 'Tuition', hi: 'ट्यूशन' },
];

function JobBoard() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    contact: '',
    paymentProof: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [listings, setListings] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function fetchListings() {
      setFetching(true);
      const snap = await getDocs(query(collection(db, 'job_listings'), where('status', '==', 'approved')));
      setListings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setFetching(false);
    }
    fetchListings();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((f) => ({ ...f, [name]: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      let paymentProofUrl = '';
      if (form.paymentProof) {
        const payRef = ref(storage, `job_listings/payments/${Date.now()}_${form.paymentProof.name}`);
        await uploadBytes(payRef, form.paymentProof);
        paymentProofUrl = await getDownloadURL(payRef);
      }
      await addDoc(collection(db, 'job_listings'), {
        title: form.title,
        description: form.description,
        category: form.category,
        contact: form.contact,
        paymentProofUrl,
        status: 'pending',
        submittedAt: serverTimestamp(),
      });
      setSuccess(i18n.language === 'hi' ? 'लिस्टिंग सफलतापूर्वक सबमिट हुई! स्वीकृति के बाद दिखेगी।' : 'Listing submitted successfully! It will appear after approval.');
      setForm({ title: '', description: '', category: '', contact: '', paymentProof: null });
    } catch (err) {
      setError(i18n.language === 'hi' ? 'कुछ गलत हो गया, कृपया पुनः प्रयास करें।' : 'Something went wrong, please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white/90 rounded-2xl shadow-xl border border-blue-200 backdrop-blur-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
      >
        <span className="text-xl">⬅️</span> {i18n.language === 'hi' ? 'वापस जाएं' : 'Go Back'}
      </button>
      <h2 className="text-3xl font-bold mb-1 flex items-center gap-2 justify-center bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
        <span role="img" aria-label="job">💼</span>
        {i18n.language === 'hi' ? 'पेड जॉब बोर्ड / ट्यूशन लिस्टिंग' : 'Paid Job Board / Tuition Listing'}
      </h2>
      <div className="h-1 w-24 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full"></div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'शीर्षक' : 'Title'} *</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'विवरण' : 'Description'} *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border rounded px-3 py-2" rows={2} />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'श्रेणी' : 'Category'} *</label>
          <select name="category" value={form.category} onChange={handleChange} required className="w-full border rounded px-3 py-2">
            <option value="">{i18n.language === 'hi' ? 'चुनें' : 'Select'}</option>
            {categories.map((cat) => (
              <option key={cat.en} value={i18n.language === 'hi' ? cat.hi : cat.en}>
                {i18n.language === 'hi' ? cat.hi : cat.en}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'संपर्क (फोन/व्हाट्सएप)' : 'Contact (Phone/WhatsApp)'} *</label>
          <input type="text" name="contact" value={form.contact} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'भुगतान स्क्रीनशॉट (₹50–₹200)' : 'Payment Screenshot (₹50–₹200)'} *</label>
          <input type="file" name="paymentProof" accept="image/*" onChange={handleChange} required className="w-full" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
          {loading ? (i18n.language === 'hi' ? 'सबमिट कर रहे हैं...' : 'Submitting...') : (i18n.language === 'hi' ? 'लिस्टिंग जोड़ें' : 'Submit Listing')}
        </button>
        {success && <div className="text-green-700 font-semibold mt-2">{success}</div>}
        {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
      </form>
      <h3 className="text-xl font-bold text-blue-700 mb-2">{i18n.language === 'hi' ? 'स्वीकृत लिस्टिंग्स' : 'Approved Listings'}</h3>
      {fetching ? (
        <div className="text-gray-500 mb-2">{i18n.language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</div>
      ) : listings.length === 0 ? (
        <div className="text-gray-500 mb-2">{i18n.language === 'hi' ? 'कोई लिस्टिंग उपलब्ध नहीं है।' : 'No listings available yet.'}</div>
      ) : (
        <div className="space-y-4">
          {listings.map(listing => (
            <div key={listing.id} className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-left shadow-xl flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 hover:shadow-2xl">
              <div className="font-bold text-blue-800 text-lg mb-1">{listing.title}</div>
              <div className="text-sm text-gray-700 mb-1">{listing.description}</div>
              <div className="text-xs text-blue-700 mb-1">{i18n.language === 'hi' ? 'श्रेणी:' : 'Category:'} {listing.category}</div>
              <a href={`https://wa.me/${listing.contact.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 underline text-xs mb-2 flex items-center gap-1">
                <span role="img" aria-label="whatsapp">🟢</span> WhatsApp
              </a>
              <div className="text-xs text-blue-700 mt-1">{i18n.language === 'hi' ? 'संपर्क:' : 'Contact:'} {listing.contact}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobBoard; 