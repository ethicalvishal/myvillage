import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DesignerCardBackground from './DesignerCardBackground';

function Transport() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();

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
            <span role="img" aria-label="transport" className="text-4xl">🛣️</span>
            {lang === 'hi' ? 'गांव कैसे पहुंचें?' : 'How to Reach the Village?'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-villagegreen-dark to-villageyellow-dark rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'हमारा गांव Bairiyadih, थाना – Harsidhi, जिला – Purvi Champaran (Bihar) में स्थित है। यह रेल, सड़क और हवाई मार्ग से अच्छी तरह जुड़ा हुआ है।'
              : 'Our village Bairiyadih is located in Harsidhi block, Purvi Champaran (Bihar). It is well connected by rail, road, and air.'}
          </p>
        </div>

        {/* Transport Dashboard Link - MOVED TO TOP */}
        <DesignerCardBackground variant="default">
          <div className="text-center">
            <h3 className={`text-2xl font-bold mb-4 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
              🚄 {lang === 'hi' ? 'लाइव यातायात डैशबोर्ड' : 'Live Transport Dashboard'}
              </h3>
            <p className="text-gray-600 mb-6">
              {lang === 'hi' 
                ? 'वास्तविक समय की ट्रेन और बस जानकारी, लाइव ट्रैकिंग और यात्रा योजना के लिए'
                : 'For real-time train and bus information, live tracking, and travel planning'
              }
            </p>
            <button
              onClick={() => navigate('/transport-dashboard')}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg text-lg flex items-center justify-center gap-3 mx-auto"
            >
              <span role="img" aria-label="dashboard">📊</span>
              {lang === 'hi' ? 'डैशबोर्ड खोलें' : 'Open Dashboard'}
            </button>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'निकटतम रेलवे स्टेशन' : 'Nearest Railway Stations'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">🚆</span>
              <div className="font-semibold text-gray-800">Semra</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '5 किमी' : '5 km'}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">🚆</span>
              <div className="font-semibold text-gray-800">Sagauli Jn</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '9 किमी' : '9 km'}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">🚆</span>
              <div className="font-semibold text-gray-800">Motihari (BMKI)</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '11–12 किमी' : '11–12 km'}</div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'सड़क मार्ग' : 'By Road'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">🚗</span>
              <div className="font-semibold text-gray-800">Motihari</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '25 किमी' : '25 km'}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">🚗</span>
              <div className="font-semibold text-gray-800">Harsidhi</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '9 किमी' : '9 km'}</div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'बस सेवा' : 'Bus Service'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">🚌</span>
              <div className="font-semibold text-gray-800">Motihari Bus Stand</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '25 किमी' : '25 km'}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">🚌</span>
              <div className="font-semibold text-gray-800">Sugauli Bus Stop</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '20 किमी' : '20 km'}</div>
                  </div>
                </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'निकटतम हवाई अड्डा' : 'Nearest Airports'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">✈️</span>
              <div className="font-semibold text-gray-800">Patna Airport</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '150 किमी (3.5–4 घंटे)' : '150 km (3.5–4 hrs)'}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-2">✈️</span>
              <div className="font-semibold text-gray-800">Darbhanga Airport</div>
              <div className="text-sm text-gray-600">{lang === 'hi' ? '145 किमी' : '145 km'}</div>
            </div>
                  </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {lang === 'hi' ? 'साइकिल और ऑटो' : 'Cycles & Autos'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚲</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {lang === 'hi' ? 'साइकिल किराया' : 'Cycle Rental'}
                </h4>
                <p className="text-sm text-gray-600">
                  {lang === 'hi' ? 'गाँव के अंदर' : 'Within village'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {lang === 'hi' ? 'किराया: ₹5/घंटा' : 'Fare: ₹5/hour'}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🛺</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {lang === 'hi' ? 'ऑटो रिक्शा' : 'Auto Rickshaw'}
                </h4>
                <p className="text-sm text-gray-600">
                  {lang === 'hi' ? 'गाँव से शहर' : 'Village to city'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {lang === 'hi' ? 'किराया: ₹50-100' : 'Fare: ₹50-100'}
                </div>
              </div>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚗</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                  {lang === 'hi' ? 'टैक्सी सेवा' : 'Taxi Service'}
                </h4>
                <p className="text-sm text-gray-600">
                  {lang === 'hi' ? 'लंबी दूरी' : 'Long distance'}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {lang === 'hi' ? 'किराया: ₹200-500' : 'Fare: ₹200-500'}
                </div>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'परिवहन समय सारणी' : 'Transport Schedule'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚌</span>
                </div>
                  <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? 'बस समय सारणी' : 'Bus Schedule'}</h4>
                  <p className="text-sm text-gray-600">{lang === 'hi' ? 'मोतिहारी, सुगौली, हरसिद्धि के लिए' : 'For Motihari, Sugauli, Harsidhi'}</p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>🌅 {lang === 'hi' ? 'सुबह: 6:00, 7:30, 9:00' : 'Morning: 6:00, 7:30, 9:00'}</li>
                <li>🌞 {lang === 'hi' ? 'दोपहर: 12:00, 2:00' : 'Afternoon: 12:00, 2:00'}</li>
                <li>🌆 {lang === 'hi' ? 'शाम: 5:00, 6:30' : 'Evening: 5:00, 6:30'}</li>
                <li>🌙 {lang === 'hi' ? 'अंतिम बस: 8:00' : 'Last bus: 8:00'}</li>
              </ul>
                  </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚆</span>
                </div>
                  <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? 'ट्रेन समय सारणी' : 'Train Schedule'}</h4>
                  <p className="text-sm text-gray-600">{lang === 'hi' ? 'सेमरा, सुगौली, मोतिहारी' : 'Semra, Sugauli, Motihari'}</p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>🚆 {lang === 'hi' ? 'सेमरा: 7:10, 13:45, 19:30' : 'Semra: 7:10, 13:45, 19:30'}</li>
                <li>🚆 {lang === 'hi' ? 'सुगौली जं.: 8:00, 15:00, 20:10' : 'Sagauli Jn: 8:00, 15:00, 20:10'}</li>
                <li>🚆 {lang === 'hi' ? 'मोतिहारी (BMKI): 9:30, 16:30, 22:00' : 'Motihari (BMKI): 9:30, 16:30, 22:00'}</li>
                <li>📱 {lang === 'hi' ? 'IRCTC ऐप या enquiry से जांचें' : 'Check via IRCTC app or enquiry'}</li>
              </ul>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {lang === 'hi' ? 'परिवहन संपर्क' : 'Transport Contacts'}
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">📞</span>
                </div>
                  <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {lang === 'hi' ? 'बस डिपो' : 'Bus Depot'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {lang === 'hi' ? 'बैरियाडीह बस स्टॉप' : 'Bairiyadih Bus Stop'}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>📞 {lang === 'hi' ? 'फोन: कोई डेटा उपलब्ध नहीं' : 'Phone: No data available'}</li>
                <li>👨‍💼 {lang === 'hi' ? 'प्रबंधक: कोई डेटा उपलब्ध नहीं' : 'Manager: No data available'}</li>
                <li>🕒 {lang === 'hi' ? 'समय: सुबह 5:00 AM - रात 10:00 PM' : 'Time: Morning 5:00 AM - Night 10:00 PM'}</li>
                <li>📍 {lang === 'hi' ? 'स्थान: ग्राम चौक' : 'Location: Village Square'}</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚕</span>
                </div>
                  <div>
                  <h4 className={`font-semibold text-gray-800 ${i18n.language === 'hi' ? 'hindi-text' : ''}`}>
                    {lang === 'hi' ? 'ऑटो संघ' : 'Auto Union'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {lang === 'hi' ? 'ऑटो रिक्शा चालक संघ' : 'Auto Rickshaw Drivers Union'}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>👨‍💼 {lang === 'hi' ? 'अध्यक्ष: कोई डेटा उपलब्ध नहीं' : 'President: No data available'}</li>
                <li>📱 {lang === 'hi' ? 'मोबाइल: कोई डेटा उपलब्ध नहीं' : 'Mobile: No data available'}</li>
                <li>👥 {lang === 'hi' ? 'सदस्य: 25 ऑटो चालक' : 'Members: 25 auto drivers'}</li>
                <li>🕒 {lang === 'hi' ? 'समय: सुबह 6:00 AM - रात 9:00 PM' : 'Time: Morning 6:00 AM - Night 9:00 PM'}</li>
              </ul>
            </div>
          </div>
        </DesignerCardBackground>

        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${i18n.language === 'hi' ? 'hindi-heading' : ''}`}>
            {lang === 'hi' ? 'यातायात (वार्ड अनुसार)' : 'Transport (Ward-wise)'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(22)].map((_, idx) => {
              const wardNum = idx + 1;
              let data = null;
              
              // Example data for some wards
              if (wardNum === 5) {
                data = {
                  nearestStation: lang === 'hi' ? 'सेमरा (3 किमी)' : 'Semra (3 km)',
                  busStop: lang === 'hi' ? 'ग्राम चौक (0.5 किमी)' : 'Village Square (0.5 km)',
                  transport: lang === 'hi' ? 'ऑटो, साइकिल' : 'Auto, Cycle',
                  roadType: lang === 'hi' ? 'पक्की सड़क' : 'Pucca road',
                  connectivity: lang === 'hi' ? 'उत्कृष्ट' : 'Excellent'
                };
              } else if (wardNum === 7) {
                data = {
                  nearestStation: lang === 'hi' ? 'सगौली (8 किमी)' : 'Sagauli (8 km)',
                  busStop: lang === 'hi' ? 'मुख्य सड़क (1 किमी)' : 'Main Road (1 km)',
                  transport: lang === 'hi' ? 'बस, ऑटो' : 'Bus, Auto',
                  roadType: lang === 'hi' ? 'पक्की सड़क' : 'Pucca road',
                  connectivity: lang === 'hi' ? 'अच्छी' : 'Good'
                };
              } else if (wardNum === 9) {
                data = {
                  nearestStation: lang === 'hi' ? 'मोतिहारी (10 किमी)' : 'Motihari (10 km)',
                  busStop: lang === 'hi' ? 'स्वास्थ्य केंद्र (0.3 किमी)' : 'Health Center (0.3 km)',
                  transport: lang === 'hi' ? 'ऑटो, टैक्सी' : 'Auto, Taxi',
                  roadType: lang === 'hi' ? 'पक्की सड़क' : 'Pucca road',
                  connectivity: lang === 'hi' ? 'बहुत अच्छी' : 'Very Good'
                };
              } else if (wardNum === 10) {
                data = {
                  nearestStation: lang === 'hi' ? 'सेमरा (4 किमी)' : 'Semra (4 km)',
                  busStop: lang === 'hi' ? 'कृषि क्षेत्र (1.5 किमी)' : 'Agriculture Area (1.5 km)',
                  transport: lang === 'hi' ? 'ट्रैक्टर, ऑटो' : 'Tractor, Auto',
                  roadType: lang === 'hi' ? 'कच्ची सड़क' : 'Kutcha road',
                  connectivity: lang === 'hi' ? 'सामान्य' : 'Average'
                };
              }
              
              return (
                <div key={wardNum} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
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
                      <li>🚆 {lang === 'hi' ? `निकटतम स्टेशन: ${data.nearestStation}` : `Nearest Station: ${data.nearestStation}`}</li>
                      <li>🚌 {lang === 'hi' ? `बस स्टॉप: ${data.busStop}` : `Bus Stop: ${data.busStop}`}</li>
                      <li>🚗 {lang === 'hi' ? `परिवहन: ${data.transport}` : `Transport: ${data.transport}`}</li>
                      <li>🛣️ {lang === 'hi' ? `सड़क: ${data.roadType}` : `Road: ${data.roadType}`}</li>
                      <li>📶 {lang === 'hi' ? `कनेक्टिविटी: ${data.connectivity}` : `Connectivity: ${data.connectivity}`}</li>
                    </ul>
                  ) : (
                    <div className="text-gray-400 text-sm text-center py-6">
                      {lang === 'hi' ? 'कोई डेटा उपलब्ध नहीं' : 'No data available'}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        </DesignerCardBackground>
      </div>
    </main>
  );
}

export default Transport; 