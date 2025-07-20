import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DesignerCardBackground from './DesignerCardBackground';
import developerImg from './assets/developer.jpg';

function About() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page in history
  };

  return (
    <main className="flex flex-col items-center mt-8 px-4 relative">
      {/* Back Button */}
      <div className="w-full max-w-6xl mb-4 relative z-10 flex items-center justify-between">
        <button 
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <span role="img" aria-label="back">⬅️</span>
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
        {/* Language Toggle */}
        {/* REMOVE this button for language toggle */}
      </div>

      <div className="relative bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-green-200/40 p-8 max-w-6xl w-full border-l-8 border-yellow-400 mt-8 mb-8 flex flex-col lg:flex-row gap-8 overflow-hidden">
        {/* Animated sheen overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
        </div>
        {/* Dots + wavy pattern overlay */}
        {/* REMOVE this entire div and its SVG for dots-about pattern */}
        {/* Subtle rural SVG motif at bottom right */}
        <div className="absolute bottom-3 right-3 opacity-20 z-0">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="50" rx="24" ry="7" fill="#FDE68A" />
            <ellipse cx="30" cy="55" rx="16" ry="4" fill="#A7F3D0" />
            <circle cx="48" cy="20" r="10" fill="#FDE047" opacity="0.5" />
            <path d="M10 55 Q20 40 30 55" stroke="#22C55E" strokeWidth="3" fill="none" opacity="0.5" />
          </svg>
        </div>
        {/* Left: Village Information */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-2">
            {/* Village photo/avatar placeholder */}
            <h2 className="relative text-3xl font-bold text-yellow-800 flex items-center gap-2 justify-start">
            <span role="img" aria-label="about">🏡</span>
            {lang === 'hi' ? 'बैरियाडीह गाँव का परिचय' : 'About Bairiyadih Village'}
          </h2>
          </div>
          {/* Animated accent divider */}
          
          {/* Basic Information */}
          <DesignerCardBackground variant="about" className="mb-4">
            <h3 className={`text-2xl font-bold mb-4 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>{i18n.language === 'hi' ? 'मूल जानकारी' : 'Basic Information'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Location & Climate Card */}
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-green-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center text-3xl shadow">
                <span role="img" aria-label="location">📍</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-green-800 mb-1">{i18n.language === 'hi' ? 'स्थान' : 'Location'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? 'थाना: हरसिद्धि, जिला: पूर्वी चंपारण' : 'Thana: Harsidhi, District: East Champaran'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-blue-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-3xl shadow">
                    <span role="img" aria-label="climate">🌡️</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-yellow-800 mb-1">{i18n.language === 'hi' ? 'जलवायु' : 'Climate'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? 'उष्णकटिबंधीय मानसून' : 'Tropical Monsoon'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-orange-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-3xl shadow">
                    <span role="img" aria-label="soil">🌾</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-orange-800 mb-1">{i18n.language === 'hi' ? 'मिट्टी' : 'Soil'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? 'उपजाऊ जलोढ़ मिट्टी' : 'Fertile Alluvial Soil'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-blue-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-3xl shadow">
                    <span role="img" aria-label="irrigation">💧</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-blue-800 mb-1">{i18n.language === 'hi' ? 'सिंचाई' : 'Irrigation'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? 'बोरिंग या नदी से' : 'Boring or River'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-blue-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-3xl shadow">
                    <span role="img" aria-label="assembly">🏛️</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-blue-800 mb-1">{i18n.language === 'hi' ? 'विधान सभा' : 'Vidhan Sabha'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? 'बैरियाडीह हरसिद्धि विधानसभा क्षेत्र में आता है। वर्तमान विधायक: कृष्णनंदन पासवान (हक़ी)' : 'Bairiyadih falls under Harsidhi Vidhan Sabha. Current MLA: Krishnandan Paswan (Haqi)'}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {/* Transport & Connectivity Card */}
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-purple-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center text-3xl shadow">
                    <span role="img" aria-label="road">🚌</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-purple-800 mb-1">{i18n.language === 'hi' ? 'सड़क' : 'Road'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? 'राज्य राजमार्ग से जुड़ा' : 'Connected to State Highway'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-pink-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center text-3xl shadow">
                    <span role="img" aria-label="rail">🚂</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-pink-800 mb-1">{i18n.language === 'hi' ? 'रेल' : 'Rail'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? 'निकटतम स्टेशन 5 किमी' : 'Nearest Station 5 km'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-green-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center text-3xl shadow">
                    <span role="img" aria-label="mobile">📱</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-green-800 mb-1">{i18n.language === 'hi' ? 'मोबाइल' : 'Mobile'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? '4G नेटवर्क उपलब्ध' : '4G Network Available'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-yellow-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center text-3xl shadow">
                    <span role="img" aria-label="electricity">⚡</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-yellow-800 mb-1">{i18n.language === 'hi' ? 'बिजली' : 'Electricity'}</div>
                    <div className="text-gray-700">{i18n.language === 'hi' ? '24x7 आपूर्ति' : '24x7 Supply'}</div>
              </div>
              </div>
              </div>
            </div>
          </DesignerCardBackground>

          {/* History Timeline */}
          {/* REMOVE the entire DesignerCardBackground block for 'गाँव का इतिहास' / 'Village History' / 'विकास की समयरेखा' timeline section (vertical stepper with icons and years) */}
        </div>

        {/* Right: Culture & Highlights */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Culture */}
          <DesignerCardBackground variant="about" className="mb-4">
            <h3 className={`text-2xl font-bold mb-4 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>{i18n.language === 'hi' ? 'संस्कृति और परंपरा' : 'Culture & Tradition'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Festivals Card */}
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-pink-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center text-3xl shadow">
                  <span role="img" aria-label="festivals">🎉</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-pink-800 mb-1">{i18n.language === 'hi' ? 'त्योहार' : 'Festivals'}</div>
                  <div className="text-gray-700">{i18n.language === 'hi' ? 'छठ पूजा, होली, दीपावली, रक्षाबंधन' : 'Chhath Puja, Holi, Diwali, Raksha Bandhan'}</div>
                </div>
              </div>
              {/* Folk Music & Dance Card */}
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-yellow-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center text-3xl shadow">
                <span role="img" aria-label="music">🎵</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-yellow-800 mb-1">{i18n.language === 'hi' ? 'लोक संगीत और नृत्य' : 'Folk Music & Dance'}</div>
                  <div className="text-gray-700">{i18n.language === 'hi' ? 'भजन, लोक गीत, बिहू नृत्य' : 'Bhajans, Folk songs, Bihu dance'}</div>
                </div>
              </div>
              {/* Local Cuisine Card */}
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-green-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center text-3xl shadow">
                  <span role="img" aria-label="cuisine">🍽️</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-green-800 mb-1">{i18n.language === 'hi' ? 'स्थानीय व्यंजन' : 'Local Cuisine'}</div>
                  <div className="text-gray-700">{i18n.language === 'hi' ? 'लिट्टी-चोखा, सत्तू, दाल-भात' : 'Litti-Chokha, Sattu, Dal-Bhat'}</div>
                </div>
              </div>
              {/* Small Industries & Trade Card */}
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-blue-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-3xl shadow">
                  <span role="img" aria-label="trade">🛍️</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-blue-800 mb-1">{i18n.language === 'hi' ? 'छोटे उद्योग और व्यापार' : 'Small Industries & Trade'}</div>
                  <div className="text-gray-700">{i18n.language === 'hi' ? 'हस्तशिल्प, दुकानें, बाजार, परिवहन, डिजिटल सेवाएं' : 'Handicrafts, Shops, Markets, Transport, Digital Services'}</div>
                </div>
              </div>
            </div>
          </DesignerCardBackground>

          {/* Important Places */}
          <DesignerCardBackground variant="about" className="mb-4">
            <h3 className={`text-2xl font-bold mb-4 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>{i18n.language === 'hi' ? 'महत्वपूर्ण स्थान' : 'Important Places'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-purple-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center text-3xl shadow">
                <span role="img" aria-label="temple">⛩️</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-purple-800 mb-1">{lang === 'hi' ? 'बलीयाघाट शिव मंदिर (वार्ड नं. 8)' : 'Baliyaghat Shiv Mandir (Ward No. 8)'}</div>
                  <div className="text-gray-700">{lang === 'hi' ? 'यह मंदिर गाँव के प्रमुख धार्मिक स्थलों में से एक है।' : 'This temple is one of the main religious sites of the village.'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-green-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center text-3xl shadow">
                <span role="img" aria-label="tree">🌳</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-green-800 mb-1">{lang === 'hi' ? 'बड़ का पेड़ (पंचायत स्थल)' : 'Banyan tree (Panchayat meeting place)'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-blue-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-3xl shadow">
                <span role="img" aria-label="pond">💧</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-blue-800 mb-1">{lang === 'hi' ? 'गाँव का तालाब (सिंचाई और मछली पालन)' : 'Village pond (irrigation and fishing)'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-yellow-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center text-3xl shadow">
                <span role="img" aria-label="school">🏫</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-yellow-800 mb-1">{lang === 'hi' ? 'प्राथमिक और माध्यमिक विद्यालय' : 'Primary and Secondary schools'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg p-4 border-l-4 border-pink-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center text-3xl shadow">
                <span role="img" aria-label="health">🏥</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-pink-800 mb-1">{lang === 'hi' ? 'स्वास्थ्य केंद्र और आंगनबाड़ी' : 'Health center and Anganwadi'}</div>
                </div>
              </div>
          </div>
          </DesignerCardBackground>

          {/* Development Timeline */}
          {/* REMOVE the entire DesignerCardBackground block for 'गाँव का इतिहास' / 'Village History' / 'विकास की समयरेखा' timeline section (vertical stepper with icons and years) */}
        </div>
      </div>
      {/* Developer Section */}
      <div className="max-w-2xl mx-auto mt-12 mb-12">
        <div className="bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 border-2 border-orange-200 shadow-2xl rounded-3xl px-6 py-10 flex flex-col items-center gap-4">
          {/* Heading */}
          <div className="flex flex-col items-center mb-2">
            <span className="text-5xl drop-shadow-md mb-2">🧑‍💻</span>
            <h2
              className="text-3xl md:text-4xl font-extrabold leading-relaxed text-center bg-gradient-to-r from-orange-600 via-yellow-500 to-green-600 bg-clip-text text-transparent animate-gradient-move tracking-wider"
              style={{
                fontFamily: 'Noto Sans Devanagari, Poppins, Inter, sans-serif',
                lineHeight: 1.4,
                wordSpacing: '0.12em',
                letterSpacing: '0.01em',
                padding: 0,
                margin: 0,
              }}
            >
              {lang === 'hi' ? 'डेवलपर - विशाल सिंह' : 'Developer - Vishal Singh'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full my-2 animate-shimmer"></div>
          </div>
          {/* Photo */}
          <img
            src={developerImg}
            alt="Developer Vishal Singh"
            className="w-32 h-32 md:w-40 md:h-40 shadow-2xl object-cover border-4 border-blue-200 bg-white rounded-2xl mb-2 hover:scale-105 transition-transform duration-300"
            style={{ background: '#e0e7ff' }}
          />
          {/* Subtitle */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-sm shadow-sm mb-2">
            <span role="img" aria-label="wave">👋</span>
            {lang === 'hi' ? 'वेबसाइट निर्माता: विशाल सिंह' : 'Website Creator'}
          </span>
          {/* Intro */}
          <div className="text-gray-700 text-base md:text-lg text-center mb-2">
            {lang === 'hi'
              ? 'नमस्ते! मैं विशाल सिंह, मोतिहारी से एक वेब डेवलपर और डिज़ाइनर हूँ। मुझे ग्रामीण भारत के लिए डिजिटल समाधान बनाना पसंद है। यह वेबसाइट गाँव के लोगों के लिए मेरी तरफ से एक छोटा सा प्रयास है।'
              : 'Hi, I am Vishal Singh, a passionate web developer and designer from Motihari. I love building digital solutions for rural India. This website is my small effort for my village community.'}
          </div>
          {/* Contact Info */}
          <div className="space-y-2 text-gray-700 text-base md:text-lg w-full max-w-md mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-600 text-xl">📱</span>
              <span className="font-semibold">{lang === 'hi' ? 'फोन/व्हाट्सएप:' : 'Phone/WhatsApp:'}</span>
              <a href="tel:9709851977" className="hover:underline text-green-700 font-bold">9709851977</a>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-red-500 text-xl">✉️</span>
              <span className="font-semibold">{lang === 'hi' ? 'ईमेल:' : 'Email:'}</span>
              <a href="mailto:vishalmth097@gmail.com" className="hover:underline text-blue-700 font-bold">vishalmth097@gmail.com</a>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-blue-600 text-xl">🔗</span>
              <span className="font-semibold">{lang === 'hi' ? 'सोशल मीडिया:' : 'Social Media:'}</span>
              <a href="https://wa.me/9709851977" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-600 font-bold transition-colors duration-200">WhatsApp</a>
              <span>|</span>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 font-bold transition-colors duration-200">Facebook</a>
              <span>|</span>
              <a href="https://instagram.com/vishal_singh9709" target="_blank" rel="noopener noreferrer" className="hover:underline text-pink-600 font-bold transition-colors duration-200">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About; 