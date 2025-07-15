import React, { useState } from 'react';
import { db, storage } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const shopTypes = [
  { en: 'Grocery', hi: 'किराना' },
  { en: 'Tailor', hi: 'दर्जी' },
  { en: 'Mobile Recharge', hi: 'मोबाइल रिचार्ज' },
  { en: 'Medical', hi: 'मेडिकल' },
  { en: 'Stationery', hi: 'स्टेशनरी' },
  { en: 'Other', hi: 'अन्य' },
];

function LocalAds() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    shopType: '',
    description: '',
    logo: null,
    paymentProof: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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
      // Upload logo
      let logoUrl = '';
      if (form.logo) {
        const logoRef = ref(storage, `local_ads/logos/${Date.now()}_${form.logo.name}`);
        await uploadBytes(logoRef, form.logo);
        logoUrl = await getDownloadURL(logoRef);
      }
      // Upload payment proof
      let paymentProofUrl = '';
      if (form.paymentProof) {
        const payRef = ref(storage, `local_ads/payments/${Date.now()}_${form.paymentProof.name}`);
        await uploadBytes(payRef, form.paymentProof);
        paymentProofUrl = await getDownloadURL(payRef);
      }
      // Add to Firestore
      await addDoc(collection(db, 'local_ads'), {
        businessName: form.businessName,
        ownerName: form.ownerName,
        phone: form.phone,
        shopType: form.shopType,
        description: form.description,
        imageUrl: logoUrl,
        paymentProofUrl,
        status: 'pending',
        submittedAt: serverTimestamp(),
      });
      setSuccess(i18n.language === 'hi' ? 'विज्ञापन सफलतापूर्वक सबमिट हुआ! स्वीकृति के बाद दिखेगा।' : 'Ad submitted successfully! It will appear after approval.');
      setForm({ businessName: '', ownerName: '', phone: '', shopType: '', description: '', logo: null, paymentProof: null });
    } catch (err) {
      setError(i18n.language === 'hi' ? 'कुछ गलत हो गया, कृपया पुनः प्रयास करें।' : 'Something went wrong, please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-pink-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
      >
        <span className="text-xl">⬅️</span> {i18n.language === 'hi' ? 'वापस जाएं' : 'Go Back'}
      </button>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-3xl">🏪</span>
        <h2 className="text-3xl font-extrabold text-green-800 drop-shadow">Local Bazaar</h2>
      </div>
      <div className="bg-gradient-to-br from-green-50 via-green-100 to-yellow-50 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center border border-green-200 relative">
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl animate-bounce">✨</span>
        <h3 className="text-2xl font-bold text-green-900 mb-2 text-center">Promote Your Business</h3>
        <p className="text-gray-700 text-center mb-4">For local shopkeepers: <span className="font-semibold text-green-700">Advertise for ₹50–₹200/month</span></p>
        <button className="mt-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow transition-all duration-200">
          Get Started
          <span className="ml-2 animate-pulse">→</span>
        </button>
      </div>
      <div className="mt-12 text-gray-500 text-lg flex items-center gap-2">
        <span className="text-2xl">🛒</span>
        <span>No ads available yet.</span>
      </div>
    </div>
  );
}

export default LocalAds; 