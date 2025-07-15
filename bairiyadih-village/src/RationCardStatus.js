import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BIHAR_PDS_URL = 'https://epds.bihar.gov.in/MHNetMIS/Reports/Report_Menu.aspx'; // Official Bihar PDS status page

function RationCardStatus() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-green-200 backdrop-blur-md">
      <button
        onClick={handleGoBack}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-yellow-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 font-medium focus:ring-2 focus:ring-yellow-500"
        aria-label="Go Back"
      >
        <span role="img" aria-label="back">⬅️</span>
        {i18n.language === 'hi' ? 'वापस जाएं' : 'Go Back'}
      </button>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">🧾</span>
        <h2 className="text-2xl font-bold text-green-800">
          {i18n.language === 'hi' ? 'राशन कार्ड स्थिति जांचें' : 'Check Ration Card Status'}
        </h2>
      </div>
      <p className="mb-4 text-black">
        {(
          i18n.language === 'hi'
            ? 'यहाँ से आप अपना या अपने परिवार का राशन कार्ड (NFSA) की स्थिति ऑनलाइन देख सकते हैं। नीचे दिए गए फॉर्म में आवश्यक जानकारी भरें या आधिकारिक वेबसाइट पर जाएं।'
            : "Check your or your family's Ration Card (NFSA) status online. Fill in the required details in the form below or visit the official website."
        )}
      </p>
      <div className="mb-4">
        <iframe
          title="Bihar Ration Card Status"
          src={BIHAR_PDS_URL}
          className="w-full h-[480px] rounded-xl border border-green-300 shadow-sm"
        ></iframe>
      </div>
      <div className="text-sm text-gray-500">
        {i18n.language === 'hi'
          ? 'यदि ऊपर दिया गया फॉर्म लोड नहीं हो रहा है, तो आप सीधे बिहार सरकार की वेबसाइट पर जाकर भी स्थिति देख सकते हैं।'
          : 'If the above form does not load, you can also check your status directly on the Bihar government website.'}
        <br />
        <a
          href={BIHAR_PDS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 underline hover:text-green-900"
        >
          {i18n.language === 'hi' ? 'आधिकारिक वेबसाइट देखें' : 'Visit Official Website'}
        </a>
      </div>
    </div>
  );
}

export default RationCardStatus; 