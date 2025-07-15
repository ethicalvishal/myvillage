import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DesignerCardBackground from './DesignerCardBackground';

function Panchayat() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();
  
  // Dynamic year system for automatic updates
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const yearAfterNext = currentYear + 2;

  // Ward expand/collapse state
  const [showAll, setShowAll] = React.useState(false);

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page in history
  };

  const panchayatMembers = [
    {
      name: i18n.language === 'hi' ? 'जानकारी अपडेट की जा रही है' : 'Information being updated',
      position: i18n.language === 'hi' ? 'सरपंच' : 'Sarpanch',
      contact: i18n.language === 'hi' ? 'जानकारी अपडेट की जा रही है' : 'Information being updated',
      ward: i18n.language === 'hi' ? 'वार्ड नंबर 1' : 'Ward No. 1'
    },
    {
      name: i18n.language === 'hi' ? 'जानकारी अपडेट की जा रही है' : 'Information being updated',
      position: i18n.language === 'hi' ? 'उप सरपंच' : 'Deputy Sarpanch',
      contact: i18n.language === 'hi' ? 'जानकारी अपडेट की जा रही है' : 'Information being updated',
      ward: i18n.language === 'hi' ? 'वार्ड नंबर 2' : 'Ward No. 2'
    },
    {
      name: i18n.language === 'hi' ? 'जानकारी अपडेट की जा रही है' : 'Information being updated',
      position: i18n.language === 'hi' ? 'पंचायत सदस्य' : 'Panchayat Member',
      contact: i18n.language === 'hi' ? 'जानकारी अपडेट की जा रही है' : 'Information being updated',
      ward: i18n.language === 'hi' ? 'वार्ड नंबर 3' : 'Ward No. 3'
    }
  ];

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

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl w-full border-l-8 border-blue-400 mt-8 mb-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="panchayat" className="text-4xl">🏛️</span>
            {lang === 'hi' ? 'बैरियाडीह ग्राम पंचायत' : 'Bairiyadih Gram Panchayat'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-villagegreen-dark to-villageyellow-dark rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'बैरियाडीह ग्राम पंचायत गाँव के विकास और प्रशासन के लिए जिम्मेदार है। यह स्थानीय स्वशासन की सबसे छोटी इकाई है।' 
              : 'Bairiyadih Gram Panchayat is responsible for village development and administration. It is the smallest unit of local self-government.'}
          </p>
        </div>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'पंचायत सदस्य' : 'Panchayat Members'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👑</span>
                    </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'सरपंच' : 'Sarpanch'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'कोई डेटा उपलब्ध नहीं' : 'No data available'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'मोबाइल: कोई डेटा उपलब्ध नहीं' : 'Mobile: No data available'}
                </div>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'उप सरपंच' : 'Deputy Sarpanch'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'कोई डेटा उपलब्ध नहीं' : 'No data available'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'मोबाइल: कोई डेटा उपलब्ध नहीं' : 'Mobile: No data available'}
                </div>
              </div>
            </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'पंचायत सचिव' : 'Panchayat Secretary'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'कोई डेटा उपलब्ध नहीं' : 'No data available'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'मोबाइल: कोई डेटा उपलब्ध नहीं' : 'Mobile: No data available'}
                </div>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'पंचायत समितियां' : 'Panchayat Committees'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏗️</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'विकास समिति' : 'Development Committee'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'ग्राम विकास योजनाएं' : 'Village development plans'}
                  </p>
                    </div>
                  </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>👥 {i18n.language === 'hi' ? 'सदस्य: 5 लोग' : 'Members: 5 people'}</li>
                <li>👨‍💼 {i18n.language === 'hi' ? 'अध्यक्ष: कोई डेटा उपलब्ध नहीं' : 'Chairman: No data available'}</li>
                <li>📅 {i18n.language === 'hi' ? 'बैठक: हर महीने' : 'Meeting: Every month'}</li>
                <li>🎯 {i18n.language === 'hi' ? 'फोकस: सड़क, पानी, बिजली' : 'Focus: Roads, water, electricity'}</li>
              </ul>
                    </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'वित्त समिति' : 'Finance Committee'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'बजट और खर्च प्रबंधन' : 'Budget and expense management'}
                  </p>
                    </div>
                  </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>👥 {i18n.language === 'hi' ? 'सदस्य: 3 लोग' : 'Members: 3 people'}</li>
                <li>👨‍💼 {i18n.language === 'hi' ? 'अध्यक्ष: कोई डेटा उपलब्ध नहीं' : 'Chairman: No data available'}</li>
                <li>📅 {i18n.language === 'hi' ? 'बैठक: हर 15 दिन' : 'Meeting: Every 15 days'}</li>
                <li>🎯 {i18n.language === 'hi' ? 'फोकस: बजट, खर्च, आय' : 'Focus: Budget, expenses, income'}</li>
              </ul>
                    </div>
                  </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'पीएम आवास योजना' : 'PM Awas Yojana'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'मकान बनाने की सहायता' : 'House construction assistance'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'लाभार्थी: 25 परिवार' : 'Beneficiaries: 25 families'}
                    </div>
                  </div>
                    </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚽</span>
                    </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'स्वच्छ भारत मिशन' : 'Swachh Bharat Mission'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'शौचालय निर्माण' : 'Toilet construction'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'लाभार्थी: 50 परिवार' : 'Beneficiaries: 50 families'}
                </div>
              </div>
            </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'सौर ऊर्जा योजना' : 'Solar Energy Scheme'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'सौर पैनल वितरण' : 'Solar panel distribution'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? 'लाभार्थी: 30 परिवार' : 'Beneficiaries: 30 families'}
                    </div>
                  </div>
                    </div>
                  </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'पंचायत कार्यालय' : 'Panchayat Office'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏛️</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'कार्यालय जानकारी' : 'Office Information'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'ग्राम पंचायत कार्यालय' : 'Gram Panchayat Office'}
                  </p>
                    </div>
                  </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>📍 {i18n.language === 'hi' ? 'पता: ग्राम चौक, बैरियाडीह' : 'Address: Village Square, Bairiyadih'}</li>
                <li>📞 {i18n.language === 'hi' ? 'फोन: कोई डेटा उपलब्ध नहीं' : 'Phone: No data available'}</li>
                <li>📧 {i18n.language === 'hi' ? 'ईमेल: कोई डेटा उपलब्ध नहीं' : 'Email: No data available'}</li>
                <li>🕒 {i18n.language === 'hi' ? 'समय: सोम-शुक्र 9:00 AM - 5:00 PM' : 'Time: Mon-Fri 9:00 AM - 5:00 PM'}</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'दस्तावेज आवश्यकताएं' : 'Document Requirements'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'सामान्य दस्तावेज' : 'Common documents'}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>🆔 {i18n.language === 'hi' ? 'आधार कार्ड' : 'Aadhaar Card'}</li>
                <li>🏠 {i18n.language === 'hi' ? 'निवास प्रमाण पत्र' : 'Residence Certificate'}</li>
                <li>💰 {i18n.language === 'hi' ? 'आय प्रमाण पत्र' : 'Income Certificate'}</li>
                <li>📸 {i18n.language === 'hi' ? 'पासपोर्ट साइज फोटो' : 'Passport size photo'}</li>
              </ul>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'ग्राम वार्ड विवरण' : 'Village Ward Details'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(22)].slice(0, showAll ? 22 : 3).map((_, idx) => {
              const wardNum = idx + 1;
              let details = {
                member: "कोई डेटा उपलब्ध नहीं",
                mobile: "कोई डेटा उपलब्ध नहीं",
                families: "कोई डेटा उपलब्ध नहीं",
                area: "कोई डेटा उपलब्ध नहीं",
                facilities: "कोई डेटा उपलब्ध नहीं"
              };
              if (wardNum === 5) details = {
                member: "श्रीमती गीता देवी",
                mobile: "9876543218",
                families: "50 घर",
                area: "पंचायत भवन क्षेत्र",
                facilities: "नया भवन निर्माण, ग्राम पुस्तकालय"
              };
              if (wardNum === 6) details = {
                member: "श्री रमेश प्रसाद",
                mobile: "9876543216",
                families: "35 घर",
                area: "मंदिर क्षेत्र",
                facilities: "पक्की सड़क निर्माण, हैंडपंप स्थापना"
              };
              if (wardNum === 7) details = {
                member: "श्री राजेश कुमार",
                mobile: "9876543213",
                families: "45 घर",
                area: "ग्राम चौक से पूर्व",
                facilities: "सड़क निर्माण जारी, 15 नई लाइटें"
              };
              if (wardNum === 8) details = {
                member: "श्रीमती रेखा देवी",
                mobile: "9876543214",
                families: "38 घर",
                area: "प्राथमिक विद्यालय के पास",
                facilities: "नई पाइपलाइन, बच्चों का पार्क निर्माण"
              };
              if (wardNum === 9) details = {
                member: "श्री सुनील कुमार",
                mobile: "9876543215",
                families: "42 घर",
                area: "स्वास्थ्य केंद्र के पास",
                facilities: "नया डिस्पेंसरी, शौचालय निर्माण"
              };
              if (wardNum === 10) details = {
                member: "श्री अमित कुमार",
                mobile: "9876543217",
                families: "40 घर",
                area: "कृषि क्षेत्र",
                facilities: "सिंचाई सुविधा, छोटा बाजार विकास"
              };
              return (
                <div key={wardNum} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{wardNum}</span>
                    </div>
                    <div>
                      <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                        {i18n.language === 'hi' ? `वार्ड नंबर ${wardNum}` : `Ward No. ${wardNum}`}
                      </h4>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>👨‍💼 {i18n.language === 'hi' ? `वार्ड सदस्य: ${details.member}` : `Ward Member: ${details.member}`}</li>
                    <li>📞 {i18n.language === 'hi' ? `मोबाइल: ${details.mobile}` : `Mobile: ${details.mobile}`}</li>
                    <li>👥 {i18n.language === 'hi' ? `परिवार: ${details.families}` : `Families: ${details.families}`}</li>
                    <li>📍 {i18n.language === 'hi' ? `क्षेत्र: ${details.area}` : `Area: ${details.area}`}</li>
                    <li>🏗️ {i18n.language === 'hi' ? `सुविधाएं: ${details.facilities}` : `Facilities: ${details.facilities}`}</li>
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-full shadow hover:scale-105 transition-all duration-200"
              onClick={() => setShowAll(v => !v)}
            >
              {showAll
                ? (i18n.language === 'hi' ? 'कम दिखाएं' : 'Hide')
                : (i18n.language === 'hi' ? 'सभी वार्ड देखें' : 'View All Wards')}
            </button>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? `जुलाई ${currentYear} के बाद के विकास कार्य` : `Development Works After July ${currentYear}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏗️</span>
                </div>
                <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'नए विकास कार्य' : 'New Development Works'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? `जुलाई ${currentYear} के बाद शुरू किए गए` : `Started after July ${currentYear}`}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>🛣️ {i18n.language === 'hi' ? 'सभी वार्डों में पक्की सड़कें' : 'Pucca roads in all wards'}</li>
                <li>💡 {i18n.language === 'hi' ? 'सोलर स्ट्रीट लाइटिंग सिस्टम' : 'Solar street lighting system'}</li>
                <li>🚰 {i18n.language === 'hi' ? 'पाइप्ड जल आपूर्ति नेटवर्क' : 'Piped water supply network'}</li>
                <li>🚽 {i18n.language === 'hi' ? 'सभी घरों में शौचालय' : 'Toilets in all households'}</li>
                <li>🌳 {i18n.language === 'hi' ? 'ग्राम पार्क और बागवानी' : 'Village park and gardening'}</li>
                <li>🏥 {i18n.language === 'hi' ? 'आधुनिक स्वास्थ्य केंद्र' : 'Modern health center'}</li>
              </ul>
            </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'विकास आंकड़े' : 'Development Statistics'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? `जुलाई ${currentYear} के बाद का प्रगति` : `Progress after July ${currentYear}`}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>🏠 {i18n.language === 'hi' ? 'पीएम आवास: 75 नए घर' : 'PM Awas: 75 new houses'}</li>
                <li>💡 {i18n.language === 'hi' ? 'सोलर पैनल: 120 घरों में' : 'Solar panels: 120 households'}</li>
                <li>🚰 {i18n.language === 'hi' ? 'जल कनेक्शन: 100% घरों में' : 'Water connections: 100% households'}</li>
                <li>🚽 {i18n.language === 'hi' ? 'शौचालय: 95% घरों में' : 'Toilets: 95% households'}</li>
                <li>🛣️ {i18n.language === 'hi' ? 'सड़कें: 8 किमी पक्की सड़कें' : 'Roads: 8 km pucca roads'}</li>
                <li>💡 {i18n.language === 'hi' ? 'स्ट्रीट लाइट: 200+ नई लाइटें' : 'Street lights: 200+ new lights'}</li>
              </ul>
                    </div>
                  </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'आगामी योजनाएं' : 'Upcoming Plans'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏫</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'डिजिटल लाइब्रेरी' : 'Digital Library'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'कंप्यूटर और इंटरनेट सुविधा' : 'Computer and internet facility'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? `लक्ष्य: दिसंबर ${currentYear}` : `Target: December ${currentYear}`}
                </div>
                    </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏥</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? '24x7 स्वास्थ्य केंद्र' : '24x7 Health Center'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'रात्रि स्वास्थ्य सेवाएं' : 'Night health services'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? `लक्ष्य: मार्च ${nextYear}` : `Target: March ${nextYear}`}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏪</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {i18n.language === 'hi' ? 'ग्राम बाजार' : 'Village Market'}
                </h4>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'hi' ? 'आधुनिक बाजार परिसर' : 'Modern market complex'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {i18n.language === 'hi' ? `लक्ष्य: जून ${nextYear}` : `Target: June ${nextYear}`}
                </div>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {i18n.language === 'hi' ? 'ग्राम सभा' : 'Gram Sabha'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">👥</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'ग्राम सभा बैठक' : 'Gram Sabha Meeting'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'मासिक ग्राम सभा' : 'Monthly Gram Sabha'}
                  </p>
                    </div>
                  </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>📅 {i18n.language === 'hi' ? 'समय: हर महीने का पहला रविवार' : 'Time: First Sunday of every month'}</li>
                <li>🕒 {i18n.language === 'hi' ? 'समय: सुबह 10:00 AM' : 'Time: Morning 10:00 AM'}</li>
                <li>📍 {i18n.language === 'hi' ? 'स्थान: पंचायत भवन' : 'Location: Panchayat Building'}</li>
                <li>👥 {i18n.language === 'hi' ? 'भागीदारी: सभी वोटर' : 'Participation: All voters'}</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">📢</span>
                </div>
                    <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {i18n.language === 'hi' ? 'बैठक के विषय' : 'Meeting Topics'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'hi' ? 'सामान्य चर्चा के विषय' : 'Common discussion topics'}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>🏗️ {i18n.language === 'hi' ? 'विकास कार्यों की समीक्षा' : 'Review of development works'}</li>
                <li>💰 {i18n.language === 'hi' ? 'बजट और खर्च' : 'Budget and expenses'}</li>
                <li>👥 {i18n.language === 'hi' ? 'शिकायतें और सुझाव' : 'Complaints and suggestions'}</li>
                <li>📋 {i18n.language === 'hi' ? 'योजनाओं की जानकारी' : 'Information about schemes'}</li>
              </ul>
            </div>
          </div>
        </DesignerCardBackground>
      </div>
    </main>
  );
}

export default Panchayat; 