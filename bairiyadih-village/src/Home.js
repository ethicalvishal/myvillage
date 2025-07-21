import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useTranslation } from 'react-i18next';
import DesignerCardBackground from './DesignerCardBackground';

function Home() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [localAds, setLocalAds] = useState([]);
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    // Fetch approved local ads
    async function fetchLocalAds() {
      const q = query(collection(db, 'local_ads'), where('status', '==', 'approved'));
      const snap = await getDocs(q);
      setLocalAds(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchLocalAds();

    fetch('/api/news/alerts')
      .then(res => res.json())
      .then(data => {
        if (data.alerts && data.alerts.length > 0) {
          setAlert(data.alerts[0]);
          setShowAlert(true);
        }
      });
  }, []);

  useEffect(() => {
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      window.adsbygoogle.push({});
    }
  }, []);

  const stats = [
    {
      icon: '👥',
      number: '2,500+',
      label: i18n.language === 'hi' ? 'कुल जनसंख्या' : 'Total Population',
      subtitle: i18n.language === 'hi' ? '400+ परिवार' : '400+ Families',
      color: 'bg-green-500' // solid green
    },
    {
      icon: '🏫',
      number: '3',
      label: i18n.language === 'hi' ? 'सरकारी स्कूल' : 'Government Schools',
      subtitle: i18n.language === 'hi' ? '500+ छात्र' : '500+ Students',
      color: 'from-blue-400 via-blue-500 to-blue-600' // blue gradient
    },
    {
      icon: '🌾',
      number: '150',
      label: i18n.language === 'hi' ? 'हेक्टेयर कृषि भूमि' : 'Hectares Farmland',
      subtitle: i18n.language === 'hi' ? 'मुख्य फसलें' : 'Main Crops',
      color: 'bg-yellow-500' // solid yellow
    },
    {
      icon: '🛕',
      number: '3',
      label: i18n.language === 'hi' ? 'प्राचीन मंदिर' : 'Ancient Temples',
      subtitle: i18n.language === 'hi' ? '100+ वर्ष पुराने' : '100+ Years Old',
      color: 'bg-orange-400' // solid orange
    },
    {
      icon: '🏪',
      number: '',
      label: i18n.language === 'hi' ? 'महनवा बाजार' : 'Mahanwa Bazaar',
      subtitle: i18n.language === 'hi' ? 'गाँव का प्रसिद्ध बाजार' : 'Famous village market',
      color: 'bg-pink-400' // solid pink
    },
    {
      icon: '🏬',
      number: '',
      label: i18n.language === 'hi' ? 'सिरिस चौक' : 'Siris Chowk',
      subtitle: i18n.language === 'hi' ? 'नरियारवा पेट्रोल पंप के पास' : 'Near Nariyarwa Petrol Pump',
      color: 'bg-cyan-500' // solid cyan
    },
  ];

  const features = [
    {
      icon: '🎭',
      title: i18n.language === 'hi' ? 'सांस्कृतिक विरासत' : 'Cultural Heritage',
      description: i18n.language === 'hi' ? 'समृद्ध सांस्कृतिक परंपराएँ और त्योहार' : 'Rich cultural traditions and festivals',
      color: 'primary',
      details: {
        hi: 'बैरियाडीह गाँव में छठ, होली, दीपावली, और अन्य त्योहार पूरे उत्साह के साथ मनाए जाते हैं। यहाँ की सांस्कृतिक विरासत में पारंपरिक नृत्य, लोकगीत, और मेलों का विशेष स्थान है। गाँव के लोग अपनी परंपराओं को आज भी जीवित रखते हैं।',
        en: 'Bairiyadih village celebrates festivals like Chhath, Holi, Diwali, and more with great enthusiasm. The cultural heritage includes traditional dances, folk songs, and fairs. Villagers actively preserve and participate in these traditions.'
      }
    },
    {
      icon: '🎓',
      title: i18n.language === 'hi' ? 'शैक्षिक उत्कृष्टता' : 'Educational Excellence',
      description: i18n.language === 'hi' ? 'उच्च गुणवत्ता वाली शिक्षा और छात्रवृत्तियाँ' : 'High-quality education and scholarships',
      color: 'accent',
      details: {
        hi: 'गाँव में तीन सरकारी स्कूल हैं जहाँ 500+ छात्र पढ़ते हैं। छात्रवृत्ति योजनाओं और प्रतियोगी परीक्षाओं के लिए मार्गदर्शन भी उपलब्ध है। शिक्षा के क्षेत्र में गाँव के कई छात्र-छात्राओं ने जिले और राज्य स्तर पर नाम रोशन किया है।',
        en: 'The village has three government schools with over 500 students. Guidance for scholarships and competitive exams is available. Many students from the village have excelled at district and state levels.'
      }
    },
    {
      icon: '🌾',
      title: i18n.language === 'hi' ? 'कृषि विकास' : 'Agricultural Development',
      description: i18n.language === 'hi' ? 'आधुनिक कृषि तकनीक और सिंचाई' : 'Modern farming techniques and irrigation',
      color: 'secondary',
      details: {
        hi: 'गाँव में 150 हेक्टेयर से अधिक भूमि पर खेती होती है। किसान आधुनिक कृषि तकनीकों, उन्नत बीज, और सिंचाई के साधनों का उपयोग करते हैं। मुख्य फसलें गेहूं, धान, मक्का आदि हैं। कृषि मेलों और प्रशिक्षण शिविरों का आयोजन भी होता है।',
        en: 'Over 150 hectares of land is cultivated in the village. Farmers use modern techniques, improved seeds, and irrigation. Main crops include wheat, rice, and maize. Agricultural fairs and training camps are also organized.'
      }
    },
    {
      icon: '🏥',
      title: i18n.language === 'hi' ? 'स्वास्थ्य सेवाएँ' : 'Healthcare Services',
      description: i18n.language === 'hi' ? 'बेहतर स्वास्थ्य सुविधाएँ और जागरूकता' : 'Better health facilities and awareness',
      color: 'primary',
      details: {
        hi: 'गाँव में प्राथमिक स्वास्थ्य केंद्र है जहाँ नियमित रूप से स्वास्थ्य शिविर, टीकाकरण, और जन-जागरूकता कार्यक्रम चलते हैं। आपातकालीन सेवाओं के लिए नजदीकी अस्पताल भी उपलब्ध है।',
        en: 'The village has a primary health center with regular health camps, vaccination drives, and awareness programs. Nearby hospitals are available for emergencies.'
      }
    }
  ];

  // Earning opportunities data
  const earningWays = [
    {
      icon: '💻',
      title: i18n.language === 'hi' ? 'ऑनलाइन फ्रीलांसिंग' : 'Online Freelancing',
      description: i18n.language === 'hi' ? 'Upwork, Fiverr, Freelancer जैसी वेबसाइटों पर काम करें' : 'Work on sites like Upwork, Fiverr, Freelancer',
    },
    {
      icon: '📱',
      title: i18n.language === 'hi' ? 'मोबाइल ऐप्स से कमाई' : 'Earning from Mobile Apps',
      description: i18n.language === 'hi' ? 'YouTube, Instagram, ShareChat, Josh आदि पर वीडियो बनाएं' : 'Create videos on YouTube, Instagram, ShareChat, Josh, etc.',
    },
    {
      icon: '🏢',
      title: i18n.language === 'hi' ? 'सरकारी योजनाएँ' : 'Government Schemes',
      description: i18n.language === 'hi' ? 'मनरेगा, स्वरोजगार, PMEGP, स्वरोजगार योजनाएँ' : 'MGNREGA, Self-employment, PMEGP, government schemes',
    },
    {
      icon: '🧑‍🌾',
      title: i18n.language === 'hi' ? 'कृषि आधारित कमाई' : 'Agriculture-based Earning',
      description: i18n.language === 'hi' ? 'फसल बेचें, पशुपालन, मधुमक्खी पालन, मत्स्य पालन' : 'Sell crops, animal husbandry, beekeeping, fishery',
    },
    {
      icon: '🧵',
      title: i18n.language === 'hi' ? 'हस्तशिल्प और कुटीर उद्योग' : 'Handicrafts & Cottage Industries',
      description: i18n.language === 'hi' ? 'हस्तशिल्प, सिलाई, बुनाई, अगरबत्ती, मोमबत्ती बनाना' : 'Handicrafts, tailoring, weaving, incense/candle making',
    },
    {
      icon: '🧑‍🏫',
      title: i18n.language === 'hi' ? 'शिक्षा/ट्यूशन' : 'Education/Tuition',
      description: i18n.language === 'hi' ? 'बच्चों को ट्यूशन पढ़ाएं या ऑनलाइन कोर्स बनाएं' : 'Teach tuition or create online courses',
    },
    {
      icon: '🛒',
      title: i18n.language === 'hi' ? 'स्थानीय व्यापार' : 'Local Business',
      description: i18n.language === 'hi' ? 'दुकान, सर्विस सेंटर, मोबाइल रिपेयरिंग, आदि' : 'Shop, service center, mobile repairing, etc.',
    },
    {
      icon: '🚚',
      title: i18n.language === 'hi' ? 'डिलीवरी/ड्राइवर जॉब्स' : 'Delivery/Driver Jobs',
      description: i18n.language === 'hi' ? 'ऑनलाइन डिलीवरी, टैक्सी, ट्रक ड्राइवर, आदि' : 'Online delivery, taxi, truck driver, etc.',
    },
  ];

  const quickLinks = [
    { to: '/about', icon: 'ℹ️', label: 'About Village' },
    { to: '/people', icon: '👥', label: 'Villagers' },
    { to: '/education', icon: '🎓', label: 'Education' },
    { to: '/health', icon: '🏥', label: 'Health' },
    { to: '/agriculture', icon: '🌾', label: 'Agriculture' },
    { to: '/panchayat', icon: '🏛️', label: 'Panchayat' },
    { to: '/gallery', icon: '📸', label: 'Gallery' },
    { to: '/news', icon: '📰', label: 'News' },
    { to: '/contact', icon: '📞', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen">
      {/* Emergency Alert Banner */}
      {alert && showAlert && (
        <div className="w-full bg-gradient-to-r from-red-700 via-red-500 to-yellow-400 text-white py-3 px-4 flex items-center justify-between font-bold text-lg shadow-lg z-50 fixed top-0 left-0 right-0 animate-pulse font-[Noto Sans Devanagari, Mangal, Arial, sans-serif]">
          <div className="flex items-center gap-3">
            <span className="bg-red-900 text-white px-3 py-1 rounded-full text-xs mr-2 animate-bounce">{i18n.language === 'hi' ? 'ब्रेकिंग' : 'Breaking'}</span>
            <span className="truncate max-w-[60vw]">{alert.title}</span>
          </div>
          <button onClick={() => setShowAlert(false)} className="ml-4 text-white text-2xl font-bold hover:text-yellow-200 focus:outline-none">×</button>
        </div>
      )}
      <div className={alert && showAlert ? 'pt-16' : ''}>
      {/* --- AdSense Top Banner --- */}
      <div className="w-full flex justify-center my-4">
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: 90 }}
          data-ad-client="ca-pub-5491585361894419"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 bg-gradient-to-br from-green-200 via-yellow-100 to-orange-200 overflow-hidden rounded-b-3xl shadow-xl">
        {/* Radial light effect behind heading */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[220px] bg-yellow-100 rounded-full blur-3xl opacity-60 z-0" />
        {/* Animated SVG rural motif */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none z-0">
          <svg width="320" height="60" viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse-slow">
            <ellipse cx="160" cy="50" rx="150" ry="10" fill="#FDE68A" fillOpacity="0.5" />
            <ellipse cx="160" cy="55" rx="120" ry="7" fill="#F59E42" fillOpacity="0.3" />
            <ellipse cx="160" cy="58" rx="90" ry="4" fill="#A7F3D0" fillOpacity="0.3" />
            {/* Sun motif */}
            <circle cx="280" cy="20" r="18" fill="#FDE047" opacity="0.5" />
            {/* Leaf motif */}
            <path d="M40 55 Q50 40 60 55" stroke="#22C55E" strokeWidth="3" fill="none" opacity="0.5" />
          </svg>
        </div>
        {/* Animated Sun with Rays */}
        <div className="absolute top-6 right-10 md:right-24 z-0 animate-spin-slow">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="45" cy="45" r="18" fill="#FDE047" />
            <g stroke="#FACC15" strokeWidth="3">
              <line x1="45" y1="5" x2="45" y2="25" />
              <line x1="45" y1="65" x2="45" y2="85" />
              <line x1="5" y1="45" x2="25" y2="45" />
              <line x1="65" y1="45" x2="85" y2="45" />
              <line x1="20" y1="20" x2="32" y2="32" />
              <line x1="58" y1="58" x2="70" y2="70" />
              <line x1="20" y1="70" x2="32" y2="58" />
              <line x1="58" y1="32" x2="70" y2="20" />
            </g>
          </svg>
        </div>
        {/* Animated Clouds */}
        <div className="absolute top-10 left-4 z-0 animate-cloud-move-slow">
          <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="20" rx="30" ry="12" fill="#fff" fillOpacity="0.7" />
            <ellipse cx="60" cy="16" rx="20" ry="8" fill="#fff" fillOpacity="0.5" />
          </svg>
        </div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-0 animate-cloud-move-slower">
          <svg width="100" height="36" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="18" rx="40" ry="14" fill="#fff" fillOpacity="0.5" />
            <ellipse cx="80" cy="12" rx="18" ry="7" fill="#fff" fillOpacity="0.3" />
          </svg>
        </div>
        {/* Foreground SVG fields/huts silhouette */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none z-0">
          <svg width="100%" height="60" viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="160" cy="50" rx="150" ry="10" fill="#FDE68A" fillOpacity="0.5" />
            <ellipse cx="160" cy="55" rx="120" ry="7" fill="#F59E42" fillOpacity="0.3" />
            <ellipse cx="160" cy="58" rx="90" ry="4" fill="#A7F3D0" fillOpacity="0.3" />
            {/* Hut silhouette */}
            <rect x="60" y="38" width="22" height="12" fill="#B45309" />
            <polygon points="71,28 56,38 86,38" fill="#F59E42" />
            {/* Tree silhouette */}
            <rect x="240" y="40" width="6" height="10" fill="#166534" />
            <ellipse cx="243" cy="40" rx="10" ry="8" fill="#4ADE80" />
          </svg>
        </div>
        {/* Glassmorphism Card for Heading/Tagline */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-lg py-8 px-4 md:px-10 border border-white/30">
          <h1 className={`text-4xl lg:text-6xl font-extrabold font-display mb-6 gradient-text text-center ${i18n.language === 'hi' ? 'hindi-heading' : 'english-heading'}`}>
            <span>
              {i18n.language === 'hi' ? 'बैरियाडीह गाँव' : 'Bairiyadih Village'}
                </span>
          </h1>
          <p className="text-xl lg:text-2xl text-neutral-700 max-w-3xl text-center mb-4 font-medium">
            {i18n.language === 'hi'
              ? 'डिजिटल ग्राम पंचायत और समुदाय पोर्टल - गाँववासियों, पर्यटकों, समाजसेवियों और छात्रों के लिए'
              : 'Digital Gram Panchayat & Community Portal for villagers, visitors, social workers, and students'}
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-lg text-neutral-800">
              <span className="text-2xl">📍</span>
              {i18n.language === 'hi' ? 'थाना - हरसिद्धि, बिहार, भारत' : 'Thana - Harsidhi, Bihar, India'}
          </div>
            <div className="hidden md:block h-6 w-px bg-gradient-to-b from-green-400 to-orange-400 mx-2" />
            <div className="flex items-center gap-2 text-lg text-neutral-800">
              <span className="text-2xl">🏢</span>
              {i18n.language === 'hi' ? 'जिला: पूर्वी चंपारण, पिनकोड: 845435' : 'District: East Champaran, Pincode: 845435'}
          </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <button
              onClick={() => navigate('/about')}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-pink-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
            >
              <span className="text-xl">ℹ️</span> {i18n.language === 'hi' ? 'गाँव के बारे में जानें' : 'About the Village'}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
            >
              <span className="text-xl">📞</span> {i18n.language === 'hi' ? 'संपर्क करें' : 'Contact'}
            </button>
          </div>
        </div>
      </section>

      {/* Accent Divider */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-32 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 rounded-full shadow-md" />
      </div>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto mb-12 px-4">
        <h2 className={`text-2xl lg:text-3xl font-bold text-center mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
          {i18n.language === 'hi' ? 'गाँव सांख्यिकी' : 'Village Statistics'}
          </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200`}
            >
              <span className="text-4xl mb-2 drop-shadow-lg">{stat.icon}</span>
              <div className="text-2xl font-bold text-white mb-1 drop-shadow">{stat.number}</div>
              <div className="text-lg font-semibold text-white mb-1 text-center drop-shadow">{stat.label}</div>
              <div className="text-sm text-white/90 text-center">{stat.subtitle}</div>
            </div>
            ))}
            </div>
      </section>

      {/* Accent Divider */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-32 bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 rounded-full shadow-md" />
      </div>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white/50 to-primary-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl lg:text-4xl font-bold font-display mb-4 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
              <span className="gradient-text">
                {i18n.language === 'hi' ? 'गाँव की विशेषताएं' : 'Village Features'}
              </span>
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              {i18n.language === 'hi' ? 'गाँव की मुख्य विशेषताएं और सेवाएं' : 'Key features and services of our village'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              index === 0 ? (
                <DesignerCardBackground key={index} variant="home" className="cursor-pointer" onClick={() => setSelectedFeature(feature)}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-${feature.color}-200 via-yellow-100 to-${feature.color}-100 shadow-md group-hover:scale-110 transition-transform duration-200 z-10`}>
                    <span className="text-4xl">{feature.icon}</span>
                  </div>
                  <h3 className={`text-xl font-bold text-neutral-900 mb-3 drop-shadow-sm z-10 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>{feature.title}</h3>
                  <p className="text-neutral-700 leading-relaxed text-center z-10">{feature.description}</p>
                </DesignerCardBackground>
              ) : (
              <div
                key={index}
                  className={`relative bg-gradient-to-br from-green-50 via-yellow-50 to-amber-50 bg-white/70 backdrop-blur-lg border-2 border-green-400 rounded-3xl shadow-xl shadow-green-200/40 p-7 flex flex-col items-center hover:-translate-y-2 hover:shadow-green-300/60 hover:shadow-2xl transition-transform duration-200 group`}
                  style={{ minHeight: '260px' }}
                onClick={() => setSelectedFeature(feature)}
              >
                  {/* Animated sheen overlay */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
                  </div>
                  {/* Dots + wavy pattern overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                    <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="dots2" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                          <circle cx="1" cy="1" r="1" fill="#22C55E" />
                        </pattern>
                      </defs>
                      <rect width="120" height="60" fill="url(#dots2)" />
                      <path d="M0 50 Q30 40 60 50 T120 50" stroke="#F59E42" strokeWidth="2" fill="none" opacity="0.15" />
                    </svg>
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-${feature.color}-200 via-yellow-100 to-${feature.color}-100 shadow-md group-hover:scale-110 transition-transform duration-200 z-10`}>
                    <span className="text-4xl">{feature.icon}</span>
                  </div>
                  <h3 className={`text-xl font-bold text-neutral-900 mb-3 drop-shadow-sm z-10 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>{feature.title}</h3>
                  <p className="text-neutral-700 leading-relaxed text-center z-10">{feature.description}</p>
                </div>
              )
            ))}
            </div>

          {/* Feature Details Modal */}
          {selectedFeature && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadein">
                <button
                  className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none"
                  onClick={() => setSelectedFeature(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-${selectedFeature.color}-500 to-${selectedFeature.color}-600`}>
                    <span className="text-3xl">{selectedFeature.icon}</span>
                  </div>
                  <h3 className={`text-2xl font-bold text-neutral-800 mb-2 text-center ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>{selectedFeature.title}</h3>
                  <p className="text-neutral-700 text-center mb-2">
                    {selectedFeature.details
                      ? selectedFeature.details[i18n.language] || selectedFeature.details.en
                      : selectedFeature.description}
                  </p>
                  {/* Future: Add more details here if needed */}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Accent Divider */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 via-yellow-400 to-pink-400 rounded-full shadow-md" />
      </div>

      {/* Earning Opportunities Section */}
      {/**
      <section className="max-w-5xl mx-auto mt-12 mb-16 px-4">
        <h2 className={`text-2xl lg:text-3xl font-bold text-center mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
          {i18n.language === 'hi' ? 'कमाई के अवसर' : 'Earning Opportunities'}
          </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {earningWays.map((way, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 border-2 border-yellow-300 rounded-2xl shadow-2xl p-7 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 hover:shadow-yellow-400/60 hover:shadow-2xl group"
              style={{ minHeight: '270px' }}
            >
              <span className="text-5xl mb-4 drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
                {way.icon}
              </span>
              <h3 className={`text-xl font-bold mb-2 text-center text-orange-900 drop-shadow-sm ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>{way.title}</h3>
              <p className="text-black text-center text-sm mb-6">{way.description}</p>
              <button
                className="mt-auto px-4 py-1.5 rounded-full bg-gradient-to-r from-green-400 to-orange-400 text-white font-semibold shadow-md hover:scale-105 hover:from-orange-400 hover:to-green-400 transition-all duration-200 focus:outline-none"
                style={{ fontSize: '0.95rem' }}
              >
                {i18n.language === 'hi' ? 'और जानें' : 'Learn More'}
              </button>
            </div>
          ))}
            </div>
      </section>
      */}

      {/* Accent Divider */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-32 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 rounded-full shadow-md" />
          </div>

      {/* Village Services Section - above Quick Links */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl shadow-lg my-12 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-100">
        {/* Radial light effect behind heading */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[420px] h-[180px] bg-blue-100 rounded-full blur-3xl opacity-50 z-0" />
        {/* Subtle animated SVG digital motif in background */}
        <div className="absolute bottom-8 right-8 opacity-20 z-0 animate-pulse-slow">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="30" width="80" height="8" rx="4" fill="#38BDF8" fillOpacity="0.18" />
            <circle cx="20" cy="34" r="4" fill="#22D3EE" fillOpacity="0.25" />
            <circle cx="80" cy="34" r="4" fill="#A7F3D0" fillOpacity="0.25" />
            <rect x="40" y="10" width="20" height="8" rx="4" fill="#F59E42" fillOpacity="0.18" />
            <rect x="48" y="18" width="4" height="12" rx="2" fill="#F59E42" fillOpacity="0.18" />
          </svg>
            </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-2">
              <span className="gradient-text">
                {i18n.language === 'hi' ? 'गाँववासियों के लिए डिजिटल सेवाएं' : 'Digital Services for Villagers'}
              </span>
            </h2>
            <p className="text-base text-neutral-600 max-w-2xl mx-auto">
              {i18n.language === 'hi' ? 'सभी गाँववासियों के लिए उपयोगी और सरकारी सेवाएं' : 'Useful and government services for all villagers'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 relative z-10">
            {/* Ration Card Status Card */}
            <div
              className="relative cursor-pointer bg-gradient-to-br from-blue-50 via-green-50 to-white border-2 border-blue-400 rounded-3xl shadow-xl shadow-blue-200/40 p-7 flex flex-col items-center hover:-translate-y-2 hover:shadow-blue-300/60 hover:shadow-2xl transition-transform duration-200 group"
              onClick={() => navigate('/ration-card-status')}
            >
              {/* Animated sheen overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
            </div>
              {/* Dots + wavy pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="#38BDF8" />
                    </pattern>
                  </defs>
                  <rect width="120" height="60" fill="url(#dots3)" />
                  <path d="M0 50 Q30 40 60 50 T120 50" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.15" />
                </svg>
            </div>
              {/* Digital motif (wifi/circuit) at bottom-right */}
              <div className="absolute bottom-3 right-3 opacity-20 z-0">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" stroke="#38BDF8" strokeWidth="2" fill="none" />
                  <path d="M10 24 Q18 14 26 24" stroke="#22D3EE" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="24" r="2" fill="#22D3EE" />
                </svg>
          </div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-blue-200 via-green-100 to-white shadow-md group-hover:scale-110 transition-transform duration-200 z-10">
                <span className="text-3xl">🧾</span>
            </div>
              <h3 className="text-lg font-bold text-blue-900 mb-1 drop-shadow-sm z-10">
                {i18n.language === 'hi' ? 'भोजन कार्ड स्थिति' : 'Ration Card Status'}
              </h3>
              <p className="text-black text-center text-sm z-10">
                {i18n.language === 'hi' ? 'अपना भोजन कार्ड स्थिति ऑनलाइन जांचें' : 'Check your ration card status online'}
              </p>
            </div>
            {/* Mandi Bhav Card */}
            <div
              className="relative cursor-pointer bg-gradient-to-br from-blue-50 via-green-50 to-white border-2 border-blue-400 rounded-3xl shadow-xl shadow-blue-200/40 p-7 flex flex-col items-center hover:-translate-y-2 hover:shadow-blue-300/60 hover:shadow-2xl transition-transform duration-200 group"
              onClick={() => navigate('/mandi-bhav')}
            >
              {/* Animated sheen overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
          </div>
              {/* Dots + wavy pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="#38BDF8" />
                    </pattern>
                  </defs>
                  <rect width="120" height="60" fill="url(#dots3)" />
                  <path d="M0 50 Q30 40 60 50 T120 50" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.15" />
                </svg>
            </div>
              {/* Digital motif (wifi/circuit) at bottom-right */}
              <div className="absolute bottom-3 right-3 opacity-20 z-0">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" stroke="#38BDF8" strokeWidth="2" fill="none" />
                  <path d="M10 24 Q18 14 26 24" stroke="#22D3EE" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="24" r="2" fill="#22D3EE" />
                </svg>
            </div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-blue-200 via-green-100 to-white shadow-md group-hover:scale-110 transition-transform duration-200 z-10">
                <span className="text-3xl">🌾</span>
          </div>
              <h3 className="text-lg font-bold text-blue-900 mb-1 drop-shadow-sm z-10">
                {i18n.language === 'hi' ? 'मंडी भाव' : 'Mandi Bhav'}
              </h3>
              <p className="text-black text-center text-sm z-10">
                {i18n.language === 'hi' ? 'कुछ मुख्य फसलों के लिए विश्वसनीय बाजार दर देखें' : 'See latest market rates for key crops'}
              </p>
            </div>
            {/* Rozgar Kendra Card */}
            <div
              className="relative cursor-pointer bg-gradient-to-br from-blue-50 via-green-50 to-white border-2 border-blue-400 rounded-3xl shadow-xl shadow-blue-200/40 p-7 flex flex-col items-center hover:-translate-y-2 hover:shadow-blue-300/60 hover:shadow-2xl transition-transform duration-200 group"
              onClick={() => navigate('/rozgar-kendra')}
            >
              {/* Animated sheen overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
          </div>
              {/* Dots + wavy pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="#38BDF8" />
                    </pattern>
                  </defs>
                  <rect width="120" height="60" fill="url(#dots3)" />
                  <path d="M0 50 Q30 40 60 50 T120 50" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.15" />
                </svg>
        </div>
              {/* Digital motif (wifi/circuit) at bottom-right */}
              <div className="absolute bottom-3 right-3 opacity-20 z-0">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" stroke="#38BDF8" strokeWidth="2" fill="none" />
                  <path d="M10 24 Q18 14 26 24" stroke="#22D3EE" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="24" r="2" fill="#22D3EE" />
                </svg>
      </div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-blue-200 via-green-100 to-white shadow-md group-hover:scale-110 transition-transform duration-200 z-10">
                <span className="text-3xl">💼</span>
        </div>
              <h3 className="text-lg font-bold text-blue-900 mb-1 drop-shadow-sm z-10">
                {i18n.language === 'hi' ? 'रोजगार केंद्र' : 'Rozgar Kendra'}
              </h3>
              <p className="text-black text-center text-sm z-10">
                {i18n.language === 'hi' ? 'स्थानीय और सरकारी नौकरियों खोजें' : 'Find local and government jobs'}
              </p>
                    </div>
            {/* Scholarship Center */}
            <div
              className="relative cursor-pointer bg-gradient-to-br from-blue-50 via-green-50 to-white border-2 border-blue-400 rounded-3xl shadow-xl shadow-blue-200/40 p-7 flex flex-col items-center hover:-translate-y-2 hover:shadow-blue-300/60 hover:shadow-2xl transition-transform duration-200 group"
              onClick={() => navigate('/scholarship-center')}
            >
              {/* Animated sheen overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
                  </div>
              {/* Dots + wavy pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="#38BDF8" />
                    </pattern>
                  </defs>
                  <rect width="120" height="60" fill="url(#dots3)" />
                  <path d="M0 50 Q30 40 60 50 T120 50" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.15" />
                </svg>
                </div>
              {/* Digital motif (wifi/circuit) at bottom-right */}
              <div className="absolute bottom-3 right-3 opacity-20 z-0">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" stroke="#38BDF8" strokeWidth="2" fill="none" />
                  <path d="M10 24 Q18 14 26 24" stroke="#22D3EE" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="24" r="2" fill="#22D3EE" />
                </svg>
                    </div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-blue-200 via-green-100 to-white shadow-md group-hover:scale-110 transition-transform duration-200 z-10">
                <span className="text-3xl">🎓</span>
                  </div>
              <h3 className="text-lg font-bold text-blue-900 mb-1 drop-shadow-sm z-10">
                {i18n.language === 'hi' ? 'छात्रवृत्ति केंद्र और छात्र मदद' : 'Scholarship & Student Help Center'}
              </h3>
              <p className="text-black text-center text-sm z-10">
                {i18n.language === 'hi' ? 'छात्रवृत्ति और गाइड खोजें' : 'Find scholarships and guides'}
              </p>
                </div>
            {/* Village Assistant */}
            <div
              className="relative cursor-pointer bg-gradient-to-br from-blue-50 via-green-50 to-white border-2 border-blue-400 rounded-3xl shadow-xl shadow-blue-200/40 p-7 flex flex-col items-center hover:-translate-y-2 hover:shadow-blue-300/60 hover:shadow-2xl transition-transform duration-200 group"
              onClick={() => navigate('/village-assistant')}
            >
              {/* Animated sheen overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
                    </div>
              {/* Dots + wavy pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="#38BDF8" />
                    </pattern>
                  </defs>
                  <rect width="120" height="60" fill="url(#dots3)" />
                  <path d="M0 50 Q30 40 60 50 T120 50" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.15" />
                </svg>
                  </div>
              {/* Digital motif (wifi/circuit) at bottom-right */}
              <div className="absolute bottom-3 right-3 opacity-20 z-0">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" stroke="#38BDF8" strokeWidth="2" fill="none" />
                  <path d="M10 24 Q18 14 26 24" stroke="#22D3EE" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="24" r="2" fill="#22D3EE" />
                </svg>
                </div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-blue-200 via-green-100 to-white shadow-md group-hover:scale-110 transition-transform duration-200 z-10">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-1 drop-shadow-sm z-10">
                {i18n.language === 'hi' ? 'गाँव सहायक' : 'Village Assistant'}
              </h3>
              <p className="text-black text-center text-sm z-10">
                {i18n.language === 'hi' ? 'योजनाओं, फॉर्मों या दस्तावेजों के बारे में पूछें' : 'Ask about schemes, forms, or documents'}
              </p>
                    </div>
            {/* Grievance Box */}
            <div
              className="relative cursor-pointer bg-gradient-to-br from-blue-50 via-green-50 to-white border-2 border-blue-400 rounded-3xl shadow-xl shadow-blue-200/40 p-7 flex flex-col items-center hover:-translate-y-2 hover:shadow-blue-300/60 hover:shadow-2xl transition-transform duration-200 group"
              onClick={() => navigate('/grievance-box')}
            >
              {/* Animated sheen overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
              </div>
              {/* Dots + wavy pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="#38BDF8" />
                    </pattern>
                  </defs>
                  <rect width="120" height="60" fill="url(#dots3)" />
                  <path d="M0 50 Q30 40 60 50 T120 50" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.15" />
                </svg>
            </div>
              {/* Digital motif (wifi/circuit) at bottom-right */}
              <div className="absolute bottom-3 right-3 opacity-20 z-0">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" stroke="#38BDF8" strokeWidth="2" fill="none" />
                  <path d="M10 24 Q18 14 26 24" stroke="#22D3EE" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="24" r="2" fill="#22D3EE" />
                </svg>
            </div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-blue-200 via-green-100 to-white shadow-md group-hover:scale-110 transition-transform duration-200 z-10">
                <span className="text-3xl">📝</span>
          </div>
              <h3 className="text-lg font-bold text-blue-900 mb-1 drop-shadow-sm z-10">
                {i18n.language === 'hi' ? 'ग्रीवेंस बॉक्स' : 'Grievance Box'}
            </h3>
              <p className="text-black text-center text-sm z-10">
                {i18n.language === 'hi'
                  ? 'अपनी सुझाव या शिकायत यहाँ दर्ज करें'
                  : 'Submit your suggestion or grievance here'}
              </p>
            </div>
          </div>
        </div>
      </section>
        </div>
      </div>
  );
}

export default Home;