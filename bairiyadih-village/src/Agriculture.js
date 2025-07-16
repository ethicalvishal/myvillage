import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DesignerCardBackground from './DesignerCardBackground';

function Agriculture() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();
  const [showAllWards, setShowAllWards] = useState(false);

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

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl w-full border-l-8 border-green-400 mt-8 mb-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="agriculture" className="text-4xl">🌾</span>
            {lang === 'hi' ? 'बैरियाडीह की कृषि' : 'Agriculture in Bairiyadih'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-villagegreen-dark to-villageyellow-dark rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'बैरियाडीह गाँव की अर्थव्यवस्था मुख्यतः कृषि पर आधारित है। यहाँ के किसान पारंपरिक और आधुनिक तकनीकों का मिश्रण करके खेती करते हैं।' 
              : 'The economy of Bairiyadih village is mainly based on agriculture. Farmers here practice a mix of traditional and modern farming techniques.'}
          </p>
        </div>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'मुख्य फसलें' : 'Main Crops'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌾</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'गेहूं' : 'Wheat'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'रबी फसल' : 'Rabi crop'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'बुवाई: नवंबर-दिसंबर' : 'Sowing: Nov-Dec'}
                </div>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌾</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'धान' : 'Rice'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'खरीफ फसल' : 'Kharif crop'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'बुवाई: जून-जुलाई' : 'Sowing: Jun-Jul'}
                </div>
              </div>
            </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌽</span>
                    </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'मक्का' : 'Maize'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'खरीफ फसल' : 'Kharif crop'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'बुवाई: जून-जुलाई' : 'Sowing: Jun-Jul'}
                </div>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🫘</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'दालें' : 'Pulses'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'रबी और खरीफ' : 'Rabi and Kharif'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'वर्ष भर' : 'Year round'}
                </div>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'कृषि तकनीक' : 'Farming Techniques'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚜</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'आधुनिक मशीनरी' : 'Modern Machinery'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'ट्रैक्टर और कृषि उपकरण' : 'Tractors and farm equipment'}
                </p>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💧</span>
                    </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'सिंचाई' : 'Irrigation'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'नहर और ट्यूबवेल' : 'Canals and tube wells'}
                </p>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌱</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'उन्नत बीज' : 'Improved Seeds'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'उच्च उपज वाले बीज' : 'High yielding seeds'}
                </p>
              </div>
                    </div>
                  </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">💰</span>
                    </div>
                <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'PM-KISAN' : 'PM-KISAN'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'किसान आय सहायता' : 'Farmer income support'}
                  </p>
                    </div>
                  </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>💵 {i18n.language === 'hi' ? '₹6,000 प्रति वर्ष' : '₹6,000 per year'}</li>
                <li>👨‍🌾 {i18n.language === 'hi' ? 'सभी किसानों के लिए' : 'For all farmers'}</li>
                <li>📱 {i18n.language === 'hi' ? 'डिजिटल भुगतान' : 'Digital payment'}</li>
                <li>📋 {i18n.language === 'hi' ? 'ऑनलाइन आवेदन' : 'Online application'}</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">🌾</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'फसल बीमा' : 'Crop Insurance'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'फसल हानि सुरक्षा' : 'Crop loss protection'}
                  </p>
                    </div>
                  </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>🛡️ {i18n.language === 'hi' ? 'प्राकृतिक आपदा सुरक्षा' : 'Natural disaster protection'}</li>
                <li>💰 {i18n.language === 'hi' ? 'कम प्रीमियम' : 'Low premium'}</li>
                <li>📊 {i18n.language === 'hi' ? 'स्वचालित भुगतान' : 'Automatic payment'}</li>
                <li>📱 {i18n.language === 'hi' ? 'मोबाइल ऐप' : 'Mobile app'}</li>
              </ul>
                    </div>
                  </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'कृषि बाजार' : 'Agricultural Market'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏪</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'APMC मंडी' : 'APMC Market'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'नियमित बाजार' : 'Regular market'}
                </p>
              </div>
            </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📱</span>
                    </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'e-NAM' : 'e-NAM'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'राष्ट्रीय कृषि बाजार' : 'National agriculture market'}
                </p>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚚</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'लॉजिस्टिक्स' : 'Logistics'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'परिवहन और भंडारण' : 'Transport and storage'}
                </p>
              </div>
                    </div>
                  </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'कृषि प्रशिक्षण' : 'Agricultural Training'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎓</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'कृषि विज्ञान केंद्र' : 'Krishi Vigyan Kendra'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'कृषि प्रशिक्षण और अनुसंधान' : 'Agricultural training and research'}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>📚 {i18n.language === 'hi' ? 'नई तकनीक प्रशिक्षण' : 'New technology training'}</li>
                <li>🌱 {i18n.language === 'hi' ? 'बीज उत्पादन' : 'Seed production'}</li>
                <li>🐄 {i18n.language === 'hi' ? 'पशुपालन प्रशिक्षण' : 'Animal husbandry training'}</li>
                <li>🌿 {i18n.language === 'hi' ? 'जैविक खेती' : 'Organic farming'}</li>
              </ul>
            </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'डिजिटल कृषि' : 'Digital Agriculture'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'मोबाइल ऐप्स और सेवाएं' : 'Mobile apps and services'}
                  </p>
                    </div>
                  </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>📊 {i18n.language === 'hi' ? 'मौसम पूर्वानुमान' : 'Weather forecast'}</li>
                <li>💧 {i18n.language === 'hi' ? 'सिंचाई सलाह' : 'Irrigation advice'}</li>
                <li>🌾 {i18n.language === 'hi' ? 'फसल प्रबंधन' : 'Crop management'}</li>
                <li>💰 {i18n.language === 'hi' ? 'बाजार मूल्य' : 'Market prices'}</li>
              </ul>
                    </div>
                  </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'भविष्य की योजनाएं' : 'Future Plans'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌿</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'जैविक खेती' : 'Organic Farming'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'प्राकृतिक खेती को बढ़ावा' : 'Promote natural farming'}
                </p>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💧</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'ड्रिप सिंचाई' : 'Drip Irrigation'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'पानी की बचत' : 'Water conservation'}
                </p>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'स्मार्ट कृषि' : 'Smart Agriculture'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'IoT और AI का उपयोग' : 'Use of IoT and AI'}
                </p>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'कृषि (वार्ड अनुसार)' : 'Agriculture (Ward-wise)'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(22)].slice(0, showAllWards ? 22 : 3).map((_, idx) => {
              const wardNum = idx + 1;
              let data = null;
              
              // Example data for some wards
              if (wardNum === 5) {
                data = {
                  mainCrop: lang === 'hi' ? 'गेहूं और धान' : 'Wheat and Rice',
                  farmers: lang === 'hi' ? '25 किसान' : '25 farmers',
                  irrigation: lang === 'hi' ? 'ट्यूबवेल और नहर' : 'Tube well and canal',
                  area: lang === 'hi' ? '50 एकड़' : '50 acres',
                  scheme: lang === 'hi' ? 'PM-KISAN लाभार्थी' : 'PM-KISAN beneficiary'
                };
              } else if (wardNum === 7) {
                data = {
                  mainCrop: lang === 'hi' ? 'मक्का और दालें' : 'Maize and Pulses',
                  farmers: lang === 'hi' ? '18 किसान' : '18 farmers',
                  irrigation: lang === 'hi' ? 'नहर सिंचाई' : 'Canal irrigation',
                  area: lang === 'hi' ? '35 एकड़' : '35 acres',
                  scheme: lang === 'hi' ? 'सिंचाई योजना' : 'Irrigation scheme'
                };
              } else if (wardNum === 9) {
                data = {
                  mainCrop: lang === 'hi' ? 'सब्जियां और फल' : 'Vegetables and Fruits',
                  farmers: lang === 'hi' ? '12 किसान' : '12 farmers',
                  irrigation: lang === 'hi' ? 'ड्रिप सिंचाई' : 'Drip irrigation',
                  area: lang === 'hi' ? '20 एकड़' : '20 acres',
                  scheme: lang === 'hi' ? 'हॉर्टिकल्चर योजना' : 'Horticulture scheme'
                };
              } else if (wardNum === 10) {
                data = {
                  mainCrop: lang === 'hi' ? 'धान और गेहूं' : 'Rice and Wheat',
                  farmers: lang === 'hi' ? '30 किसान' : '30 farmers',
                  irrigation: lang === 'hi' ? 'नहर और ट्यूबवेल' : 'Canal and tube well',
                  area: lang === 'hi' ? '60 एकड़' : '60 acres',
                  scheme: lang === 'hi' ? 'PM-KISAN और MSP' : 'PM-KISAN and MSP'
                };
              }
              
              return (
                <div key={wardNum} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{wardNum}</span>
                    </div>
                    <div>
                      <h4 className={`font-semibold text-gray-800 ${lang === 'hi' ? 'hindi-text' : ''}`}>
                        {lang === 'hi' ? `वार्ड नंबर ${wardNum}` : `Ward No. ${wardNum}`}
                      </h4>
                    </div>
                  </div>
                  {data ? (
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>🌾 {lang === 'hi' ? `मुख्य फसल: ${data.mainCrop}` : `Main Crop: ${data.mainCrop}`}</li>
                      <li>👨‍🌾 {lang === 'hi' ? `किसान: ${data.farmers}` : `Farmers: ${data.farmers}`}</li>
                      <li>💧 {lang === 'hi' ? `सिंचाई: ${data.irrigation}` : `Irrigation: ${data.irrigation}`}</li>
                      <li>📏 {lang === 'hi' ? `क्षेत्र: ${data.area}` : `Area: ${data.area}`}</li>
                      <li>💰 {lang === 'hi' ? `योजना: ${data.scheme}` : `Scheme: ${data.scheme}`}</li>
                    </ul>
                  ) : (
                    <div className="text-gray-400 text-sm text-center py-6">
                      {lang === 'hi' ? 'जानकारी उपलब्ध नहीं' : 'No data available'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold rounded-full shadow hover:scale-105 transition-all duration-200"
              onClick={() => setShowAllWards(v => !v)}
            >
              {showAllWards
                ? (lang === 'hi' ? 'कम दिखाएं' : 'Show Less')
                : (lang === 'hi' ? 'सभी वार्ड देखें' : 'See All Wards')}
            </button>
        </div>
        </DesignerCardBackground>
      </div>
    </main>
  );
}

export default Agriculture; 