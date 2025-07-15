import React, { useState } from 'react';
import { db, storage } from './firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useTranslation } from 'react-i18next';
import DesignerCardBackground from './DesignerCardBackground';

const serviceTypes = [
  { en: 'Form Fill', hi: 'फॉर्म भरना' },
  { en: 'Recharge', hi: 'रिचार्ज' },
  { en: 'Bill Pay', hi: 'बिल भुगतान' },
  { en: 'Other', hi: 'अन्य' },
];

function DigitalServicesPanel() {
  const { i18n } = useTranslation();
  const [form, setForm] = useState({
    serviceType: '',
    details: '',
    userName: '',
    phone: '',
    paymentProof: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [statusPhone, setStatusPhone] = useState('');
  const [userRequests, setUserRequests] = useState([]);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState('');

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
      // Upload payment proof
      let paymentProofUrl = '';
      if (form.paymentProof) {
        const payRef = ref(storage, `service_requests/payments/${Date.now()}_${form.paymentProof.name}`);
        await uploadBytes(payRef, form.paymentProof);
        paymentProofUrl = await getDownloadURL(payRef);
      }
      // Add to Firestore
      await addDoc(collection(db, 'service_requests'), {
        serviceType: form.serviceType,
        details: form.details,
        userName: form.userName,
        phone: form.phone,
        paymentProofUrl,
        status: 'pending',
        submittedAt: serverTimestamp(),
      });
      setSuccess(i18n.language === 'hi' ? 'सेवा अनुरोध सफलतापूर्वक सबमिट हुआ! स्वीकृति के बाद स्थिति दिखेगी।' : 'Service request submitted successfully! Status will be shown after approval.');
      setForm({ serviceType: '', details: '', userName: '', phone: '', paymentProof: null });
    } catch (err) {
      setError(i18n.language === 'hi' ? 'कुछ गलत हो गया, कृपया पुनः प्रयास करें।' : 'Something went wrong, please try again.');
    }
    setLoading(false);
  };

  const handleStatusCheck = async (e) => {
    e.preventDefault();
    setStatusLoading(true);
    setStatusError('');
    setUserRequests([]);
    try {
      const q = query(collection(db, 'service_requests'), where('phone', '==', statusPhone));
      const snap = await getDocs(q);
      if (snap.empty) {
        setStatusError(i18n.language === 'hi' ? 'कोई अनुरोध नहीं मिला।' : 'No requests found.');
      } else {
        setUserRequests(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    } catch (err) {
      setStatusError(i18n.language === 'hi' ? 'त्रुटि: अनुरोध लोड नहीं हुआ।' : 'Error: Could not load requests.');
    }
    setStatusLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white/90 rounded-2xl shadow-xl border border-green-200 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-green-800 mb-4 flex items-center gap-2 justify-center">
        <span role="img" aria-label="services">💻</span>
        {i18n.language === 'hi' ? 'डिजिटल सेवा अनुरोध' : 'Digital Service Request'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'सेवा प्रकार' : 'Service Type'} *</label>
          <select name="serviceType" value={form.serviceType} onChange={handleChange} required className="w-full border rounded px-3 py-2">
            <option value="">{i18n.language === 'hi' ? 'चुनें' : 'Select'}</option>
            {serviceTypes.map((type) => (
              <option key={type.en} value={i18n.language === 'hi' ? type.hi : type.en}>
                {i18n.language === 'hi' ? type.hi : type.en}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'सेवा विवरण' : 'Service Details'} *</label>
          <textarea name="details" value={form.details} onChange={handleChange} required className="w-full border rounded px-3 py-2" rows={3} />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'नाम' : 'Name'} *</label>
          <input type="text" name="userName" value={form.userName} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'फोन नंबर' : 'Phone Number'} *</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'भुगतान स्क्रीनशॉट (₹20–₹100)' : 'Payment Screenshot (₹20–₹100)'} *</label>
          <input type="file" name="paymentProof" accept="image/*" onChange={handleChange} required className="w-full" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
          {loading ? (i18n.language === 'hi' ? 'सबमिट कर रहे हैं...' : 'Submitting...') : (i18n.language === 'hi' ? 'सेवा अनुरोध भेजें' : 'Submit Service Request')}
        </button>
        {success && <div className="text-green-700 font-semibold mt-2">{success}</div>}
        {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
      </form>
      <hr className="my-8 border-green-200" />
      <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2">
        <span role="img" aria-label="status">🔎</span>
        {i18n.language === 'hi' ? 'अपना अनुरोध स्टेटस देखें' : 'Check Your Request Status'}
      </h3>
      <form onSubmit={handleStatusCheck} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="tel"
          value={statusPhone}
          onChange={e => setStatusPhone(e.target.value)}
          placeholder={i18n.language === 'hi' ? 'फोन नंबर दर्ज करें' : 'Enter phone number'}
          className="flex-1 border rounded px-3 py-2"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium">
          {i18n.language === 'hi' ? 'स्थिति देखें' : 'Check Status'}
        </button>
      </form>
      {statusLoading && <div className="text-gray-500 mb-2">{i18n.language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</div>}
      {statusError && <div className="text-red-600 mb-2">{statusError}</div>}
      {userRequests.length > 0 && (
        <div className="space-y-4">
          {userRequests.map(req => (
            <div key={req.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-bold text-green-800 text-lg mb-1">{req.serviceType}</div>
              <div className="text-sm text-gray-700 mb-1">{req.details}</div>
              <div className="text-xs text-green-700 mb-1">{i18n.language === 'hi' ? 'स्थिति:' : 'Status:'} {i18n.language === 'hi'
                ? (req.status === 'pending' ? 'लंबित' : req.status === 'approved' ? 'स्वीकृत' : 'अस्वीकृत')
                : req.status.charAt(0).toUpperCase() + req.status.slice(1)}</div>
              {req.adminResponse && (
                <div className="text-xs text-blue-700 mt-1">{i18n.language === 'hi' ? 'एडमिन उत्तर:' : 'Admin Response:'} {req.adminResponse}</div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="text-xs text-gray-500 mt-3 text-center">
        {i18n.language === 'hi'
          ? 'आपका अनुरोध एडमिन स्वीकृति के बाद पूरा किया जाएगा।'
          : 'Your request will be processed after admin approval.'}
      </div>

      <DesignerCardBackground variant="default">
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
          {i18n.language === 'hi' ? 'सरकारी सेवाएं' : 'Government Services'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🆔</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'आधार अपडेट और नया कार्ड' : 'Aadhaar update and new card'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'जमीन दस्तावेज' : 'Land Documents'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'खतियान और मालिकाना' : 'Khatiyan and ownership'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'जाति प्रमाण पत्र' : 'Caste Certificate'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'जाति प्रमाण पत्र बनवाना' : 'Get caste certificate'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'आय प्रमाण पत्र' : 'Income Certificate'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'आय प्रमाण पत्र बनवाना' : 'Get income certificate'}
              </p>
            </div>
          </div>
        </div>
      </DesignerCardBackground>

      <DesignerCardBackground variant="default">
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
          {i18n.language === 'hi' ? 'बैंकिंग सेवाएं' : 'Banking Services'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏦</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'बैंक खाता' : 'Bank Account'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'नया खाता खोलना' : 'Open new account'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'डेबिट कार्ड' : 'Debit Card'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'कार्ड बनवाना और ब्लॉक' : 'Card creation and blocking'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'मोबाइल बैंकिंग' : 'Mobile Banking'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'मोबाइल बैंकिंग सेटअप' : 'Mobile banking setup'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'पासबुक' : 'Passbook'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'पासबुक अपडेट' : 'Passbook update'}
              </p>
            </div>
          </div>
        </div>
      </DesignerCardBackground>

      <DesignerCardBackground variant="default">
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
          {i18n.language === 'hi' ? 'शिक्षा सेवाएं' : 'Education Services'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎓</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'छात्रवृत्ति' : 'Scholarship'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'छात्रवृत्ति आवेदन' : 'Scholarship application'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'पुस्तकें' : 'Books'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'पुस्तक वितरण' : 'Book distribution'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👕</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'यूनिफॉर्म' : 'Uniform'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'स्कूल यूनिफॉर्म' : 'School uniform'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏫</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'प्रवेश' : 'Admission'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'स्कूल प्रवेश' : 'School admission'}
              </p>
            </div>
          </div>
        </div>
      </DesignerCardBackground>

      <DesignerCardBackground variant="default">
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
          {i18n.language === 'hi' ? 'स्वास्थ्य सेवाएं' : 'Health Services'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏥</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'आयुष्मान कार्ड' : 'Ayushman Card'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'आयुष्मान कार्ड बनवाना' : 'Get Ayushman card'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💊</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'दवाएं' : 'Medicines'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'मुफ्त दवाएं' : 'Free medicines'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👶</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'टीकाकरण' : 'Vaccination'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'बच्चों का टीकाकरण' : 'Child vaccination'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔬</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'जांच' : 'Tests'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'मुफ्त जांच' : 'Free tests'}
              </p>
            </div>
          </div>
        </div>
      </DesignerCardBackground>

      <DesignerCardBackground variant="default">
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
          {i18n.language === 'hi' ? 'कृषि सेवाएं' : 'Agriculture Services'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'PM-KISAN' : 'PM-KISAN'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'PM-KISAN रजिस्ट्रेशन' : 'PM-KISAN registration'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌾</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'फसल बीमा' : 'Crop Insurance'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'फसल बीमा आवेदन' : 'Crop insurance application'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚜</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'कृषि यंत्र' : 'Farm Equipment'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'कृषि यंत्र सब्सिडी' : 'Farm equipment subsidy'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💧</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'सिंचाई' : 'Irrigation'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'सिंचाई सुविधाएं' : 'Irrigation facilities'}
              </p>
            </div>
          </div>
        </div>
      </DesignerCardBackground>

      <DesignerCardBackground variant="default">
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
          {i18n.language === 'hi' ? 'रोजगार सेवाएं' : 'Employment Services'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛠️</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'मनरेगा' : 'MNREGA'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'मनरेगा कार्ड' : 'MNREGA card'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'रोजगार कार्ड' : 'Employment Card'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'रोजगार कार्ड बनवाना' : 'Get employment card'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎓</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'प्रशिक्षण' : 'Training'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'कौशल प्रशिक्षण' : 'Skill training'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💼</span>
              </div>
              <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'नौकरी' : 'Jobs'}
              </h4>
              <p className="text-sm text-gray-600">
                {i18n.language === 'hi' ? 'नौकरी की जानकारी' : 'Job information'}
              </p>
            </div>
          </div>
        </div>
      </DesignerCardBackground>
    </div>
  );
}

export default DigitalServicesPanel; 