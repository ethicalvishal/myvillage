import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DesignerCardBackground from './DesignerCardBackground';

function People() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page in history
  };

  const villageInfo = {
    hi: 'बैरियाडीह गाँव में विभिन्न समुदायों के लोग रहते हैं। ग्रामीण मेहनती, एकजुट और परंपराओं का सम्मान करने वाले हैं।',
    en: 'Bairiyadih village is home to people from diverse communities. The villagers are hardworking, united, and respectful of traditions.'}

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

      <div className="relative bg-gradient-to-br from-green-50 via-yellow-50 to-white bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-green-200/40 p-8 max-w-6xl w-full border-l-8 border-green-400 mt-8 mb-8 overflow-hidden">
        {/* Animated sheen overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-0 top-0 w-full h-full animate-sheen" style={{ background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)' }} />
        </div>
        {/* Dots + wavy pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
          <svg width="100%" height="100%" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots-people" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#22C55E" />
              </pattern>
            </defs>
            <rect width="400" height="180" fill="url(#dots-people)" />
            <path d="M0 160 Q100 140 200 160 T400 160" stroke="#F59E42" strokeWidth="3" fill="none" opacity="0.13" />
          </svg>
        </div>
        {/* Subtle rural SVG motif at bottom right */}
        <div className="absolute bottom-3 right-3 opacity-20 z-0">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="50" rx="24" ry="7" fill="#FDE68A" />
            <ellipse cx="30" cy="55" rx="16" ry="4" fill="#A7F3D0" />
            <circle cx="48" cy="20" r="10" fill="#FDE047" opacity="0.5" />
            <path d="M10 55 Q20 40 30 55" stroke="#22C55E" strokeWidth="3" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="community" className="text-4xl">👥</span>
            {lang === 'hi' ? 'बैरियाडीह के लोग' : 'People of Bairiyadih'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-villagegreen-dark to-villageyellow-dark rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {villageInfo[lang]}
          </p>
        </div>

        <DesignerCardBackground variant="people">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'गाँव के प्रमुख लोग' : 'Key People of the Village'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'सरपंच' : 'Sarpanch'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'ग्राम पंचायत का मुखिया' : 'Head of Gram Panchayat'}
                </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'शिक्षक' : 'Teachers'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'स्कूल के शिक्षक' : 'School Teachers'}
                </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍🌾</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'किसान' : 'Farmers'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'कृषि कार्य में लगे लोग' : 'People engaged in farming'}
                </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'डॉक्टर' : 'Doctors'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'स्वास्थ्य सेवा प्रदाता' : 'Healthcare providers'}
                </p>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="people">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'समुदाय के नेता' : 'Community Leaders'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-xl">👴</span>
              </div>
                  <div>
                <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'बुजुर्ग नेता' : 'Elder Leaders'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'अनुभवी और सम्मानित लोग' : 'Experienced and respected people'}
                </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍💼</span>
              </div>
                  <div>
                <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'युवा नेता' : 'Youth Leaders'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'नई पीढ़ी के नेता' : 'Leaders of new generation'}
                </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-xl">👩‍💼</span>
              </div>
                  <div>
                <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'महिला नेता' : 'Women Leaders'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'महिला सशक्तिकरण के नेता' : 'Leaders of women empowerment'}
                </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍🎓</span>
              </div>
                  <div>
                <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'शैक्षिक नेता' : 'Educational Leaders'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'शिक्षा के क्षेत्र में नेता' : 'Leaders in education field'}
                </p>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="people">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'व्यवसायिक समूह' : 'Professional Groups'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏥</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'स्वास्थ्य कर्मी' : 'Health Workers'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'आशा, एएनएम, डॉक्टर' : 'ASHA, ANM, Doctors'}
                </p>
                    </div>
                  </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏫</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'शिक्षक समूह' : 'Teacher Group'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'स्कूल और कॉलेज के शिक्षक' : 'School and college teachers'}
                </p>
                    </div>
                  </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍🌾</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'किसान समूह' : 'Farmer Group'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'कृषि और पशुपालन' : 'Agriculture and animal husbandry'}
                </p>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="people">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'सामाजिक कार्यकर्ता' : 'Social Workers'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-xl">🤝</span>
              </div>
                  <div>
                <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'सामुदायिक सेवा' : 'Community Service'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'गाँव की सेवा में लगे लोग' : 'People engaged in village service'}
                </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-xl">🎓</span>
              </div>
                  <div>
                <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'शिक्षा प्रचारक' : 'Education Promoters'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'शिक्षा के प्रचार में लगे' : 'Engaged in education promotion'}
                </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
                  <div>
                <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'पर्यावरण संरक्षक' : 'Environment Protectors'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'पर्यावरण संरक्षण में लगे' : 'Engaged in environment protection'}
                </p>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="people">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'युवा समूह' : 'Youth Groups'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`text-lg font-semibold mb-3 text-neutral-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'युवा क्लब' : 'Youth Club'}
              </h4>
              <p className="text-neutral-700 mb-3">
                {i18n.language === 'hi' 
                  ? 'गाँव के युवाओं का एक संगठित समूह जो खेल-कूद, सांस्कृतिक कार्यक्रम और सामाजिक विकास में सक्रिय रूप से भाग लेता है।'
                  : 'An organized group of village youth actively participating in sports, cultural programs, and social development.'
                }
              </p>
              <ul className="text-neutral-700 space-y-1">
                <li>🏃 {i18n.language === 'hi' ? 'खेल और फिटनेस' : 'Sports and Fitness'}</li>
                <li>🎭 {i18n.language === 'hi' ? 'सांस्कृतिक कार्यक्रम' : 'Cultural Programs'}</li>
                <li>💻 {i18n.language === 'hi' ? 'डिजिटल साक्षरता' : 'Digital Literacy'}</li>
                <li>🤝 {i18n.language === 'hi' ? 'सामुदायिक सेवा' : 'Community Service'}</li>
              </ul>
                </div>
            <div>
              <h4 className={`text-lg font-semibold mb-3 text-neutral-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                {i18n.language === 'hi' ? 'महिला समूह' : 'Women Groups'}
              </h4>
              <p className="text-neutral-700 mb-3">
                {i18n.language === 'hi'
                  ? 'गाँव की महिलाओं का सशक्तिकरण समूह जो स्वरोजगार, शिक्षा और स्वास्थ्य के क्षेत्र में काम करता है।'
                  : 'Women empowerment group working in self-employment, education, and health sectors.'
                }
              </p>
              <ul className="text-neutral-700 space-y-1">
                <li>💪 {i18n.language === 'hi' ? 'स्वरोजगार प्रशिक्षण' : 'Self-employment Training'}</li>
                <li>📚 {i18n.language === 'hi' ? 'शिक्षा और जागरूकता' : 'Education and Awareness'}</li>
                <li>🏥 {i18n.language === 'hi' ? 'स्वास्थ्य और पोषण' : 'Health and Nutrition'}</li>
                <li>💰 {i18n.language === 'hi' ? 'स्वयं सहायता समूह' : 'Self Help Groups'}</li>
              </ul>
            </div>
          </div>
        </DesignerCardBackground>
      </div>
    </main>
  );
}

export default People; 