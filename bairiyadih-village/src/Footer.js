import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import developerImg from './assets/developer.jpg';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const footerRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.classList.add('animate-fadein');
    }
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickLinks = [
    { to: '/', label: { hi: 'होम', en: 'Home' }, icon: '🏠' },
    { to: '/about', label: { hi: 'परिचय', en: 'About' }, icon: 'ℹ️' },
    { to: '/people', label: { hi: 'लोग', en: 'People' }, icon: '👥' },
    { to: '/education', label: { hi: 'शिक्षा', en: 'Education' }, icon: '🎓' },
    { to: '/health', label: { hi: 'स्वास्थ्य', en: 'Health' }, icon: '🏥' },
    { to: '/agriculture', label: { hi: 'कृषि', en: 'Agriculture' }, icon: '🌾' },
    { to: '/panchayat', label: { hi: 'पंचायत', en: 'Panchayat' }, icon: '🏛️' },
    { to: '/gallery', label: { hi: 'गैलरी', en: 'Gallery' }, icon: '📸' },
    { to: '/news', label: { hi: 'समाचार', en: 'News' }, icon: '📰' },
    { to: '/contact', label: { hi: 'संपर्क', en: 'Contact' }, icon: '📞' }
  ];

  const contactInfo = [
    {
      icon: '📍',
      label: lang === 'hi' ? 'स्थान' : 'Location',
      value: lang === 'hi' ? 'हरसिद्धि, बिहार' : 'Harsidhi, Bihar',
      subValue: lang === 'hi' ? 'पूर्वी चंपारण जिला' : 'Purvi Champaran District'
    },
    {
      icon: '🚉',
      label: lang === 'hi' ? 'रेलवे स्टेशन' : 'Railway Station',
      value: lang === 'hi' ? 'सेमरा' : 'Semra',
      subValue: lang === 'hi' ? 'नजदीकी स्टेशन' : 'Nearest Station'
    },
    {
      icon: '📧',
      label: lang === 'hi' ? 'ईमेल' : 'Email',
      value: 'info@bairiyadih.in',
      subValue: lang === 'hi' ? 'संपर्क के लिए' : 'For inquiries'
    }
  ];

  return (
    <>
      {/* Wavy SVG Top Divider */}
      <div className="w-full overflow-hidden -mb-1">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16">
          <path fill="url(#footerwave)" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          <defs>
            <linearGradient id="footerwave" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34d399" />
              <stop offset="0.5" stopColor="#fbbf24" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          </svg>
      </div>
      {/* Firefly/Star Particle Effect */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className={`absolute block w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-70 animate-firefly${i % 6 + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      {/* Main Footer */}
      <footer ref={footerRef} className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden animate-fadein shadow-2xl backdrop-blur-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Top Accent */}
        <div className="w-full h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-indigo-400 animate-gradient-x"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-yellow-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg animate-gradient-x">
                  <span className="text-white text-2xl font-bold">🏘️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display bg-gradient-to-r from-green-400 via-yellow-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
                    {t('villageName')}
            </h2>
                  <p className="text-neutral-400 text-sm">
                    {t('tagline')}
                  </p>
                </div>
              </div>
              <p className="text-neutral-300 leading-relaxed mb-6">
                {lang === 'hi' 
                  ? 'एक डिजिटल ग्राम पंचायत और समुदाय पोर्टल जो गाँववासियों, पर्यटकों और समाजसेवियों को जोड़ता है।'
                  : 'A digital Gram Panchayat and community portal connecting villagers, tourists, and social workers.'
                }
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                <button type="button" className="w-10 h-10 bg-gradient-to-br from-green-400 via-yellow-400 to-indigo-400 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-110 hover:bg-gradient-to-tr hover:from-indigo-400 hover:to-green-400 transition-all duration-300 transform">
                  <span className="text-lg">📱</span>
                </button>
                <button type="button" className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-green-400 to-indigo-400 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-110 hover:bg-gradient-to-tr hover:from-green-400 hover:to-yellow-400 transition-all duration-300 transform">
                  <span className="text-lg">📧</span>
                </button>
                <button type="button" className="w-10 h-10 bg-gradient-to-br from-indigo-400 via-yellow-400 to-green-400 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-110 hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-indigo-400 transition-all duration-300 transform">
                  <span className="text-lg">📞</span>
                </button>
              </div>
            </div>
            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <span className="text-green-400 animate-bounce">🔗</span>
                <span>{lang === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="flex items-center space-x-2 px-4 py-3 rounded-xl text-neutral-300 hover:text-white hover:bg-gradient-to-r hover:from-green-400/20 hover:to-indigo-400/20 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <span className="text-lg group-hover:scale-125 group-hover:text-green-400 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.label[lang]}</span>
                  </Link>
                ))}
              </div>
            </div>
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <span className="text-indigo-400 animate-pulse">📞</span>
                <span>{lang === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}</span>
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400/20 via-yellow-400/20 to-indigo-400/20 rounded-xl flex items-center justify-center border border-green-400/30 shadow-sm">
                      <span className="text-lg">{info.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{info.label}</p>
                      <p className="text-neutral-300">{info.value}</p>
                      <p className="text-sm text-neutral-400">{info.subValue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Village Landscape Row with Animation and Lantern */}
          <div className="flex justify-center items-center mt-6 mb-2 text-2xl space-x-2 opacity-80 animate-landscape-float relative">
            <span>🌳</span>
            <span>🏡</span>
            <span>🌾</span>
            <span>🛤️</span>
            <span className="animate-bounce-slow">🪔</span>
            <span>🌻</span>
            <span>🚜</span>
            <span>🌴</span>
            <span>🌅</span>
          </div>
          {/* Village Quote/Slogan */}
          <div className="flex justify-center mb-1">
            <p className="text-lg text-yellow-200 text-center font-semibold drop-shadow-sm">
              {lang === 'hi'
                ? '"गाँव की मिट्टी में खुशबू है, अपनापन है, और सपनों की उड़ान है।"'
                : '"There is fragrance, belonging, and dreams in the soil of the village."'}
            </p>
          </div>
          {/* Bottom Divider */}
          <div className="border-t border-neutral-700 mt-4 pt-3">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-neutral-400 text-sm">
                © {new Date().getFullYear()} {t('villageName')}. {lang === 'hi' ? 'सर्वाधिकार सुरक्षित' : 'All rights reserved'}.
              </p>
              <div className="flex items-center space-x-4 text-sm text-neutral-400">
                <Link to="/about" className="hover:text-green-400 transition-colors duration-300">
                  {lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </Link>
                <span>•</span>
                <Link to="/contact" className="hover:text-green-400 transition-colors duration-300">
                  {lang === 'hi' ? 'उपयोग की शर्तें' : 'Terms of Service'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Developer Credit */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mt-4">
            <img
              src={developerImg}
              alt="Vishal Singh"
              className="w-8 h-8 rounded-full shadow object-cover border-2 border-pink-300 bg-white"
              style={{ background: '#e0e7ff' }}
            />
            <span className="text-sm text-gray-200 flex items-center">
              <span className="text-lg mr-1">❤️</span>
              विशाल सिंह द्वारा प्रेम से विकसित
            </span>
          </div>
        </div>
      </div>
      {/* Back to Top Button with Glow */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-green-400 to-indigo-400 text-white p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl hover:shadow-yellow-200/60 focus:outline-none transition-all duration-300 animate-glow fadein"
          aria-label="Back to Top"
        >
          ⬆️
        </button>
      )}
      {/* Fade-in Animation */}
      <style>{`
        .fadein { animation: fadeInFooter 0.6s cubic-bezier(0.4,0,0.2,1) both; }
        .animate-fadein { animation: fadeInFooter 1.2s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes fadeInFooter { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradientX 4s ease-in-out infinite; }
        @keyframes gradientX { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-glow { box-shadow: 0 0 0px 0px #fde68a; }
        .animate-glow:hover { box-shadow: 0 0 24px 8px #fde68a, 0 0 0px 0px #fde68a; }
        .animate-landscape-float { animation: landscapeFloat 4s ease-in-out infinite alternate; }
        @keyframes landscapeFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounceSlow 2.5s infinite alternate; }
        @keyframes bounceSlow { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
        /* Firefly Animations */
        .animate-firefly1 { animation: firefly1 7s linear infinite alternate; }
        .animate-firefly2 { animation: firefly2 9s linear infinite alternate; }
        .animate-firefly3 { animation: firefly3 11s linear infinite alternate; }
        .animate-firefly4 { animation: firefly4 13s linear infinite alternate; }
        .animate-firefly5 { animation: firefly5 15s linear infinite alternate; }
        .animate-firefly6 { animation: firefly6 17s linear infinite alternate; }
        @keyframes firefly1 { 0% { opacity: 0.7; transform: translateY(0) scale(1); } 100% { opacity: 0.2; transform: translateY(-30px) scale(1.3); } }
        @keyframes firefly2 { 0% { opacity: 0.6; transform: translateY(0) scale(1); } 100% { opacity: 0.3; transform: translateY(20px) scale(1.2); } }
        @keyframes firefly3 { 0% { opacity: 0.8; transform: translateY(0) scale(1); } 100% { opacity: 0.4; transform: translateY(-20px) scale(1.1); } }
        @keyframes firefly4 { 0% { opacity: 0.5; transform: translateY(0) scale(1); } 100% { opacity: 0.7; transform: translateY(30px) scale(1.4); } }
        @keyframes firefly5 { 0% { opacity: 0.9; transform: translateY(0) scale(1); } 100% { opacity: 0.2; transform: translateY(-15px) scale(1.2); } }
        @keyframes firefly6 { 0% { opacity: 0.6; transform: translateY(0) scale(1); } 100% { opacity: 0.5; transform: translateY(25px) scale(1.3); } }
      `}</style>
    </>
  );
};

export default Footer; 