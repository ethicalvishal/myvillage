import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const jobs = [
  {
    title: 'Village Data Entry Operator',
    title_hi: 'ग्राम डाटा एंट्री ऑपरेटर',
    eligibility: '12th Pass, Basic Computer',
    eligibility_hi: '12वीं पास, बेसिक कंप्यूटर',
    lastDate: '2024-06-15',
    link: 'https://example.com/apply',
    source: 'Gram Panchayat',
  },
  {
    title: 'Bihar Police Constable',
    title_hi: 'बिहार पुलिस कांस्टेबल',
    eligibility: '10th Pass',
    eligibility_hi: '10वीं पास',
    lastDate: '2024-06-20',
    link: 'https://csbc.bih.nic.in/',
    source: 'CSBC Bihar',
  },
];

function RozgarKendra() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-blue-200 backdrop-blur-md">
      <button
        onClick={handleGoBack}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium focus:ring-2 focus:ring-blue-500"
        aria-label="Go Back"
      >
        <span role="img" aria-label="back">⬅️</span>
        {i18n.language === 'hi' ? 'वापस जाएं' : 'Go Back'}
      </button>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">💼</span>
        <h2 className="text-2xl font-bold text-blue-800">
          {i18n.language === 'hi' ? 'रोजगार केंद्र' : 'Rozgar Kendra (Job Board)'}
        </h2>
      </div>
      <p className="mb-4 text-black">
        {i18n.language === 'hi'
          ? 'गाँव और सरकारी नौकरियों की जानकारी यहाँ देखें।'
          : 'Find local and government job opportunities here.'}
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'पद' : 'Job Title'}</th>
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'योग्यता' : 'Eligibility'}</th>
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'अंतिम तिथि' : 'Last Date'}</th>
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'आवेदन' : 'Apply'}</th>
              <th className="px-4 py-2">{i18n.language === 'hi' ? 'स्रोत' : 'Source'}</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  {i18n.language === 'hi' ? 'कोई नौकरी उपलब्ध नहीं है' : 'No jobs available'}
                </td>
              </tr>
            ) : (
              jobs.map((job, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2 font-semibold text-blue-700">{i18n.language === 'hi' ? job.title_hi : job.title}</td>
                  <td className="px-4 py-2">{i18n.language === 'hi' ? job.eligibility_hi : job.eligibility}</td>
                  <td className="px-4 py-2">{job.lastDate}</td>
                  <td className="px-4 py-2">
                    <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-900 focus:ring-2 focus:ring-blue-500">
                      {i18n.language === 'hi' ? 'आवेदन करें' : 'Apply'}
                    </a>
                  </td>
                  <td className="px-4 py-2">{job.source}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-gray-500 mt-3">
        {i18n.language === 'hi'
          ? 'यह डेमो डेटा है। जल्द ही एडमिन द्वारा नौकरियाँ जोड़ी जा सकेंगी।'
          : 'This is demo data. Admin will be able to add jobs soon.'}
      </div>
    </div>
  );
}

export default RozgarKendra; 