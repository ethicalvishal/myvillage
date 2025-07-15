import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const scholarships = [
  {
    name: 'NSP Pre-Matric Scholarship',
    name_hi: 'एनएसपी प्री-मैट्रिक छात्रवृत्ति',
    eligibility: 'Class 1-10, Minority students',
    eligibility_hi: 'कक्षा 1-10, अल्पसंख्यक छात्र',
    amount: '₹10,000/year',
    deadline: '2024-07-15',
    howto: 'Apply online at scholarships.gov.in',
    howto_hi: 'scholarships.gov.in पर ऑनलाइन आवेदन करें',
    pdf: '',
  },
  {
    name: 'Bihar Board Post-Matric Scholarship',
    name_hi: 'बिहार बोर्ड पोस्ट-मैट्रिक छात्रवृत्ति',
    eligibility: 'Class 11-12, Bihar Board',
    eligibility_hi: 'कक्षा 11-12, बिहार बोर्ड',
    amount: '₹12,000/year',
    deadline: '2024-08-01',
    howto: 'Apply via medhasoft.bih.nic.in',
    howto_hi: 'medhasoft.bih.nic.in पर आवेदन करें',
    pdf: '',
  },
];

function ScholarshipCenter() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-yellow-200 backdrop-blur-md">
      <button
        onClick={handleGoBack}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium focus:ring-2 focus:ring-blue-500"
        aria-label="Go Back"
      >
        <span role="img" aria-label="back">⬅️</span>
        {i18n.language === 'hi' ? 'वापस जाएं' : 'Go Back'}
      </button>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">🎓</span>
        <h2 className="text-2xl font-bold text-yellow-800">
          {i18n.language === 'hi' ? 'छात्रवृत्ति एवं छात्र सहायता केंद्र' : 'Scholarship & Student Help Center'}
        </h2>
      </div>
      <p className="mb-4 text-black">
        {i18n.language === 'hi'
          ? 'यहाँ राज्य/राष्ट्रीय छात्रवृत्तियों की जानकारी, पात्रता, आवेदन प्रक्रिया और गाइड देखें।'
          : 'Find information, eligibility, application process, and guides for state/national scholarships here.'}
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-yellow-100">
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'छात्रवृत्ति' : 'Scholarship'}</th>
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'पात्रता' : 'Eligibility'}</th>
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'राशि' : 'Amount'}</th>
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'अंतिम तिथि' : 'Deadline'}</th>
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'आवेदन कैसे करें' : 'How to Apply'}</th>
              <th className="px-4 py-2">PDF</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  {i18n.language === 'hi' ? 'कोई छात्रवृत्ति उपलब्ध नहीं है' : 'No scholarships available'}
                </td>
              </tr>
            ) : (
              scholarships.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2 font-semibold text-yellow-700">{i18n.language === 'hi' ? s.name_hi : s.name}</td>
                  <td className="px-4 py-2">{i18n.language === 'hi' ? s.eligibility_hi : s.eligibility}</td>
                  <td className="px-4 py-2">{s.amount}</td>
                  <td className="px-4 py-2">{s.deadline}</td>
                  <td className="px-4 py-2">{i18n.language === 'hi' ? s.howto_hi : s.howto}</td>
                  <td className="px-4 py-2">
                    {s.pdf ? (
                      <a href={s.pdf} target="_blank" rel="noopener noreferrer" className="text-yellow-700 underline hover:text-yellow-900">
                        PDF
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-gray-500 mt-3">
        {i18n.language === 'hi'
          ? 'यह डेमो डेटा है। जल्द ही एडमिन द्वारा छात्रवृत्तियाँ और गाइड जोड़ी जा सकेंगी।'
          : 'This is demo data. Admin will be able to add scholarships and guides soon.'}
      </div>
    </div>
  );
}

export default ScholarshipCenter; 