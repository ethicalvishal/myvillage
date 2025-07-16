import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import ConfirmDialog from './ConfirmDialog';
import DesignerCardBackground from './DesignerCardBackground';

function Contact() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const contactList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactList);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    try {
      await fetch('https://bairiyadih-backend.onrender.com/api/input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
        name,
        email,
        phone,
        message,
        language: lang
        })
      });

      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setShowForm(false);
      alert(lang === 'hi' ? 'संदेश भेज दिया गया!' : 'Message sent!');
    } catch (error) {
      alert(lang === 'hi' ? 'भेजने में त्रुटि' : 'Error sending message');
    }
  };

  const handleDelete = (contactId) => {
    setDeleteId(contactId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteDoc(doc(db, 'contacts', deleteId));
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAdmin(true);
      alert(lang === 'hi' ? 'सफल लॉगिन!' : 'Login successful!');
    } else {
      alert(lang === 'hi' ? 'गलत पासवर्ड' : 'Wrong password');
    }
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

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl w-full border-l-8 border-indigo-400 mt-8 mb-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="contact" className="text-4xl">📞</span>
            {lang === 'hi' ? 'बैरियाडीह से संपर्क करें' : 'Contact Bairiyadih'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-villagegreen-dark to-villageyellow-dark rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'बैरियाडीह गाँव से संपर्क करने के लिए यहाँ दिए गए नंबरों का उपयोग करें। आपातकालीन स्थितियों, सरकारी सेवाओं और सामान्य जानकारी के लिए संपर्क करें।' 
              : 'Use the numbers provided here to contact Bairiyadih village. Contact for emergencies, government services, and general information.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Village Contacts & Information */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <DesignerCardBackground variant="default">
              <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-3">
                <span role="img" aria-label="emergency" className="text-2xl">🚨</span>
                {lang === 'hi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="police" className="text-xl">👮</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'पुलिस स्टेशन' : 'Police Station'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? 'हरसिद्धि थाना' : 'Harsidhi Police Station'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="phone">📞</span>
                      <span>100 (आपातकालीन)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="distance">📍</span>
                      <span>{lang === 'hi' ? 'गाँव से 8 किमी दूर' : '8 km from village'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="ambulance" className="text-xl">🚑</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'एम्बुलेंस सेवा' : 'Ambulance Service'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? '24x7 आपातकालीन सेवा' : '24x7 emergency service'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="phone">📞</span>
                      <span>108 (आपातकालीन)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="availability">🕐</span>
                      <span>{lang === 'hi' ? '24 घंटे उपलब्ध' : 'Available 24 hours'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="fire" className="text-xl">🚒</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'अग्निशमन विभाग' : 'Fire Department'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? 'आग और आपातकाल' : 'Fire and emergency'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="phone">📞</span>
                      <span>101 (आपातकालीन)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="distance">📍</span>
                      <span>{lang === 'hi' ? 'मोतिहारी से 15 किमी दूर' : '15 km from Motihari'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DesignerCardBackground>

            {/* Government Services */}
            <DesignerCardBackground variant="default">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
                <span role="img" aria-label="government" className="text-2xl">🏛️</span>
                {lang === 'hi' ? 'सरकारी सेवाएं' : 'Government Services'}
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="sarpanch" className="text-xl">👑</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'सरपंच' : 'Sarpanch'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? 'श्री राम कुमार सिंह' : 'Shri Ram Kumar Singh'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="phone">📞</span>
                      <span>98765-43210</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="office">🏛️</span>
                      <span>{lang === 'hi' ? 'पंचायत भवन' : 'Panchayat Building'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="secretary" className="text-xl">📝</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'ब्लॉक विकास अधिकारी' : 'Block Development Officer'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? 'हरसिद्धि ब्लॉक' : 'Harsidhi Block'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="phone">📞</span>
                      <span>06252-123456</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="timing">🕐</span>
                      <span>{lang === 'hi' ? 'सोम-शुक्र: 10 AM - 4 PM' : 'Mon-Fri: 10 AM - 4 PM'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="school" className="text-xl">🏫</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'स्कूल प्रधानाध्यापक' : 'School Principal'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? 'श्रीमती रेखा देवी' : 'Smt. Rekha Devi'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="phone">📞</span>
                      <span>98765-43211</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="school">🏫</span>
                      <span>{lang === 'hi' ? 'प्राथमिक विद्यालय बैरियाडीह' : 'Primary School Bairiyadih'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DesignerCardBackground>
          </div>

          {/* Contact Form & Admin */}
          <div className="space-y-6">
            {/* Contact Form */}
            <DesignerCardBackground variant="default">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
                <span role="img" aria-label="contact-form" className="text-2xl">✉️</span>
                {lang === 'hi' ? 'संपर्क फॉर्म' : 'Contact Form'}
              </h3>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                {showForm ? (lang === 'hi' ? 'बंद करें' : 'Close') : (lang === 'hi' ? 'संदेश भेजें' : 'Send Message')}
              </button>

              {showForm && (
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {lang === 'hi' ? 'नाम' : 'Name'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'hi' ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {lang === 'hi' ? 'ईमेल' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {lang === 'hi' ? 'फोन नंबर' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={lang === 'hi' ? 'अपना फोन नंबर दर्ज करें' : 'Enter your phone number'}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {lang === 'hi' ? 'संदेश' : 'Message'}
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={lang === 'hi' ? 'अपना संदेश लिखें...' : 'Write your message...'}
                      className="w-full p-3 border border-gray-300 rounded-lg h-32"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    {lang === 'hi' ? 'संदेश भेजें' : 'Send Message'}
                  </button>
                </form>
              )}
            </DesignerCardBackground>

            {/* Admin Login */}
            <DesignerCardBackground variant="default">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-3">
                <span role="img" aria-label="admin" className="text-2xl">🔑</span>
                {lang === 'hi' ? 'एडमिन लॉगिन' : 'Admin Login'}
              </h3>
              {!admin ? (
                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {lang === 'hi' ? 'पासवर्ड' : 'Password'}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={lang === 'hi' ? 'एडमिन पासवर्ड' : 'Admin password'}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                  >
                    {lang === 'hi' ? 'लॉगिन' : 'Login'}
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <span role="img" aria-label="success" className="text-xl">✅</span>
                    <span className="font-medium">{lang === 'hi' ? 'लॉगिन सफल!' : 'Login successful!'}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/admin"
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm text-center"
                    >
                      {lang === 'hi' ? 'एडमिन डैशबोर्ड' : 'Admin Dashboard'}
                    </Link>
                    <button
                      onClick={() => setAdmin(false)}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                    >
                      {lang === 'hi' ? 'लॉगआउट' : 'Logout'}
                    </button>
                  </div>
                </div>
              )}
            </DesignerCardBackground>

            {/* Important Locations */}
            <DesignerCardBackground variant="default">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-3">
                <span role="img" aria-label="locations" className="text-2xl">📍</span>
                {lang === 'hi' ? 'महत्वपूर्ण स्थान' : 'Important Locations'}
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="post-office" className="text-xl">📮</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'डाकघर' : 'Post Office'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? 'बैरियाडीह डाकघर' : 'Bairiyadih Post Office'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="pincode">📮</span>
                      <span>{lang === 'hi' ? 'पिन कोड: 845435' : 'Pincode: 845435'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="timing">🕐</span>
                      <span>{lang === 'hi' ? 'सोम-शुक्र: 9 AM - 5 PM' : 'Mon-Fri: 9 AM - 5 PM'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="hospital" className="text-xl">🏥</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'स्वास्थ्य केंद्र' : 'Health Center'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? 'हरसिद्धि प्राथमिक स्वास्थ्य केंद्र' : 'Harsidhi Primary Health Center'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="phone">📞</span>
                      <span>98765-43212</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="distance">📍</span>
                      <span>{lang === 'hi' ? 'गाँव से 8 किमी दूर' : '8 km from village'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span role="img" aria-label="bank" className="text-xl">🏦</span>
                    <div>
                      <div className="font-medium text-gray-800">{lang === 'hi' ? 'बैंक' : 'Bank'}</div>
                      <div className="text-sm text-gray-600">{lang === 'hi' ? 'स्टेट बैंक ऑफ इंडिया' : 'State Bank of India'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span role="img" aria-label="phone">📞</span>
                      <span>06252-123456</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="location">📍</span>
                      <span>{lang === 'hi' ? 'हरसिद्धि बाजार' : 'Harsidhi Market'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DesignerCardBackground>
          </div>
        </div>

        {/* Village Location Information */}
        <DesignerCardBackground variant="default">
          <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center flex items-center justify-center gap-3">
            <span role="img" aria-label="location" className="text-3xl">🗺️</span>
            {lang === 'hi' ? 'गाँव की स्थान जानकारी' : 'Village Location Information'}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span role="img" aria-label="village" className="text-2xl">🏘️</span>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">{lang === 'hi' ? 'गाँव का नाम' : 'Village Name'}</div>
                  <div className="text-gray-600">बैरियाडीह (Bairiyadih)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span role="img" aria-label="district" className="text-2xl">🏛️</span>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">{lang === 'hi' ? 'जिला' : 'District'}</div>
                  <div className="text-gray-600">पूर्वी चंपारण (Purvi Champaran)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span role="img" aria-label="block" className="text-2xl">🏘️</span>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">{lang === 'hi' ? 'ब्लॉक' : 'Block'}</div>
                  <div className="text-gray-600">हरसिद्धि (Harsidhi)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span role="img" aria-label="post-office" className="text-2xl">📮</span>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">{lang === 'hi' ? 'पोस्ट ऑफिस' : 'Post Office'}</div>
                  <div className="text-gray-600">बैरियाडीह</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span role="img" aria-label="pincode" className="text-2xl">📮</span>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">{lang === 'hi' ? 'पिन कोड' : 'Pincode'}</div>
                  <div className="text-gray-600">845435</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span role="img" aria-label="state" className="text-2xl">🏛️</span>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">{lang === 'hi' ? 'राज्य' : 'State'}</div>
                  <div className="text-gray-600">बिहार (Bihar)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Railway Stations */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-3">
              <span role="img" aria-label="railway" className="text-2xl">🚉</span>
              {lang === 'hi' ? 'नजदीकी रेलवे स्टेशन' : 'Nearby Railway Stations'}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span role="img" aria-label="semra" className="text-xl">🚂</span>
                  <div>
                    <div className="font-medium text-gray-800">{lang === 'hi' ? 'सेमरा रेलवे स्टेशन' : 'Semra Railway Station'}</div>
                    <div className="text-sm text-gray-600">{lang === 'hi' ? 'सबसे नजदीक' : 'Nearest station'}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <span role="img" aria-label="distance">📏</span>
                    <span>{lang === 'hi' ? 'दूरी: 5 किमी' : 'Distance: 5 km'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="code">🚂</span>
                    <span>{lang === 'hi' ? 'स्टेशन कोड: SEM' : 'Station Code: SEM'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span role="img" aria-label="motihari" className="text-xl">🚂</span>
                  <div>
                    <div className="font-medium text-gray-800">{lang === 'hi' ? 'मोतिहारी जंक्शन' : 'Motihari Junction'}</div>
                    <div className="text-sm text-gray-600">Bapudham Motihari (BMKI)</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <span role="img" aria-label="distance">📏</span>
                    <span>{lang === 'hi' ? 'दूरी: 25 किमी' : 'Distance: 25 km'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="code">🚂</span>
                    <span>{lang === 'hi' ? 'स्टेशन कोड: BMKI' : 'Station Code: BMKI'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        {/* Village Map Section */}
        <DesignerCardBackground variant="default">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center w-full px-4 md:px-8 mb-2">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold w-full justify-center text-green-700">
                <span role="img" aria-label="map">🗺️</span>
                {lang === 'hi' ? 'गाँव का नक्शा' : 'Village Map'}
              </h2>
            </div>
            {/* Location Text just below heading */}
            <div className="text-center text-xs text-gray-500 mb-2">
              {lang === 'hi' ? 'बैरियाडीह, पूर्वी चंपारण, बिहार ८४५४३५' : 'Bairiyadih, East Champaran, Bihar 845435'}
            </div>
            {/* View Larger Map Link */}
            <div className="text-center mb-4">
              <a
                href="https://maps.app.goo.gl/DF2kDFv9CVxtbDc49"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold text-sm hover:bg-blue-200 transition"
              >
                {lang === 'hi' ? 'बड़ा नक्शा देखें' : 'View larger map'}
              </a>
            </div>
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border border-green-200">
              <iframe
                title="Bairiyadih Village Map"
                src="https://www.google.com/maps?q=Bairiyadih,+Harsidhi,+Purvi+Champaran,+Bihar+845435&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </DesignerCardBackground>

        {/* Contact Messages (Admin Only) */}
        {admin && (
          <DesignerCardBackground variant="default">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
              {lang === 'hi' ? 'संपर्क संदेश' : 'Contact Messages'}
            </h3>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-400">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{contact.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span role="img" aria-label="email">📧</span>
                          {contact.email}
                        </span>
                        {contact.phone && (
                          <span className="flex items-center gap-1">
                            <span role="img" aria-label="phone">📞</span>
                            {contact.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <span role="img" aria-label="date">📅</span>
                          {contact.timestamp?.toDate?.()?.toLocaleDateString(lang) || new Date(contact.timestamp).toLocaleDateString(lang)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                    >
                      {lang === 'hi' ? 'हटाएं' : 'Delete'}
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{contact.message}</p>
                </div>
              ))}
              {contacts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {lang === 'hi' ? 'कोई संदेश नहीं मिला।' : 'No messages found.'}
                </div>
              )}
            </div>
          </DesignerCardBackground>
        )}

        {/* Contact Information Card */}
        <DesignerCardBackground variant="default">
            <div className="flex flex-col items-center mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 via-yellow-300 to-blue-400 flex items-center justify-center shadow-lg mb-2 animate-pulse-gentle">
                <span role="img" aria-label="developer" className="text-3xl">💡</span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-center mb-1 leading-relaxed py-2"
                style={{
                  fontFamily: 'Noto Sans Devanagari, Poppins, Inter, sans-serif',
                  lineHeight: 1.35,
                  letterSpacing: '0.5px',
                  overflow: 'visible',
                  whiteSpace: 'normal',
                  WebkitTextStroke: '0.5px transparent'
                }}
              >
                <span
                  className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent animate-gradient-move"
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    padding: '0 2px'
                  }}
                >
                  {lang === 'hi' ? 'डेवलपर से संपर्क करें' : 'Contact with Developer'}
                  <span className="block md:inline ml-1 font-bold tracking-tight">
                    - {lang === 'hi' ? 'विशाल सिंह' : 'Vishal Singh'}
                  </span>
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400 rounded-full my-2 animate-shimmer"></div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-sm shadow-sm mt-1">
                <span role="img" aria-label="wave">👋</span>
                {lang === 'hi' ? 'वेबसाइट निर्माता: विशाल सिंह' : 'Website Creator'}
              </span>
            </div>
            <div className="space-y-2 text-gray-700 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-xl">📱</span>
                <span className="font-semibold">{lang === 'hi' ? 'फोन/व्हाट्सएप:' : 'Phone/WhatsApp:'}</span>
                <a href="tel:9709851977" className="hover:underline text-green-700">9709851977</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-xl">✉️</span>
                <span className="font-semibold">{lang === 'hi' ? 'ईमेल:' : 'Email:'}</span>
                <a href="mailto:vishalmth097@gmail.com" className="hover:underline text-blue-700">vishalmth097@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 text-xl">🔗</span>
                <span className="font-semibold">{lang === 'hi' ? 'सोशल मीडिया:' : 'Social Media:'}</span>
                <a href="https://wa.me/9709851977" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-600 font-bold">WhatsApp</a>
                <span>|</span>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 font-bold">Facebook</a>
                <span>|</span>
                <a href="https://instagram.com/vishal_singh9709" target="_blank" rel="noopener noreferrer" className="hover:underline text-pink-600 font-bold">Instagram</a>
              </div>
            </div>
          </DesignerCardBackground>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title={lang === 'hi' ? 'संदेश हटाएं' : 'Delete Message'}
        message={lang === 'hi' ? 'क्या आप वाकई इस संदेश को हटाना चाहते हैं?' : 'Are you sure you want to delete this message?'}
      />
    </main>
  );
}

export default Contact; 