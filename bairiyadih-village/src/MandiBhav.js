import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const sampleData = [
  { crop: 'Wheat', crop_hi: 'गेहूं', market: 'Motihari', district: 'Purvi Champaran', price: 2100, date: '2024-06-01' },
  { crop: 'Rice', crop_hi: 'धान', market: 'Chakia', district: 'Purvi Champaran', price: 1850, date: '2024-06-01' },
  { crop: 'Maize', crop_hi: 'मक्का', market: 'Harsidhi', district: 'Purvi Champaran', price: 1600, date: '2024-06-01' },
];

function MandiBhav() {
  const { i18n } = useTranslation();
  const [cropFilter, setCropFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const navigate = useNavigate();

  const crops = [...new Set(sampleData.map(d => i18n.language === 'hi' ? d.crop_hi : d.crop))];
  const districts = [...new Set(sampleData.map(d => d.district))];

  const filteredData = sampleData.filter(d =>
    (!cropFilter || (i18n.language === 'hi' ? d.crop_hi : d.crop) === cropFilter) &&
    (!districtFilter || d.district === districtFilter)
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-yellow-200 backdrop-blur-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
      >
        <span className="text-xl">⬅️</span> Go Back
      </button>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">🌾</span>
        <h2 className="text-2xl font-bold text-yellow-800">
          {i18n.language === 'hi' ? 'मंडी भाव' : 'Mandi Bhav (Market Rates)'}
        </h2>
      </div>
      <p className="mb-4 text-gray-700">
        {i18n.language === 'hi'
          ? 'यहाँ प्रमुख फसलों के ताज़ा मंडी भाव देखें। फसल या जिला चुनकर भाव देखें।'
          : 'See the latest market rates for key crops. Filter by crop or district.'}
      </p>
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border rounded px-3 py-1"
          value={cropFilter}
          onChange={e => setCropFilter(e.target.value)}
        >
          <option value="">{i18n.language === 'hi' ? 'सभी फसलें' : 'All Crops'}</option>
          {crops.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-1"
          value={districtFilter}
          onChange={e => setDistrictFilter(e.target.value)}
        >
          <option value="">{i18n.language === 'hi' ? 'सभी जिले' : 'All Districts'}</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-yellow-100">
              <th className="px-4 py-2 text-gray-800">{i18n.language === 'hi' ? 'फसल' : 'Crop'}</th>
              <th className="px-4 py-2 text-gray-800">{i18n.language === 'hi' ? 'मंडी' : 'Market'}</th>
              <th className="px-4 py-2 text-gray-800">{i18n.language === 'hi' ? 'जिला' : 'District'}</th>
              <th className="px-4 py-2 text-gray-800">{i18n.language === 'hi' ? 'भाव (₹/क्विंटल)' : 'Price (₹/Quintal)'}</th>
              <th className="px-4 py-2 text-gray-800">{i18n.language === 'hi' ? 'तारीख' : 'Date'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  {i18n.language === 'hi' ? 'कोई डेटा नहीं मिला' : 'No data found'}
                </td>
              </tr>
            ) : (
              filteredData.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2 text-gray-700">{i18n.language === 'hi' ? d.crop_hi : d.crop}</td>
                  <td className="px-4 py-2 text-gray-700">{d.market}</td>
                  <td className="px-4 py-2 text-gray-700">{d.district}</td>
                  <td className="px-4 py-2 font-semibold text-green-700">₹{d.price}</td>
                  <td className="px-4 py-2 text-gray-700">{d.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-gray-500 mt-3">
        {i18n.language === 'hi'
          ? 'यह डेटा डेमो के लिए है। जल्द ही लाइव मंडी भाव API से जोड़ा जाएगा।'
          : 'This is demo data. Live market rates will be integrated soon via API.'}
      </div>
    </div>
  );
}

export default MandiBhav; 