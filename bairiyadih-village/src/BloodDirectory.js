import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const donors = [
  { name: 'No data available', name_hi: 'कोई डेटा उपलब्ध नहीं', group: 'A+', contact: 'No data available', approved: true },
  { name: 'No data available', name_hi: 'कोई डेटा उपलब्ध नहीं', group: 'B+', contact: 'No data available', approved: true },
  { name: 'No data available', name_hi: 'कोई डेटा उपलब्ध नहीं', group: 'O+', contact: 'No data available', approved: false },
  { name: 'No data available', name_hi: 'कोई डेटा उपलब्ध नहीं', group: 'AB+', contact: 'No data available', approved: true }
];

function BloodDirectory() {
  const { i18n } = useTranslation();
  const [groupFilter, setGroupFilter] = useState('');
  const navigate = useNavigate();

  const bloodGroups = [...new Set(donors.map(d => d.group))];
  const filtered = donors.filter(d => !groupFilter || d.group === groupFilter);
  const grouped = bloodGroups
    .filter(bg => !groupFilter || bg === groupFilter)
    .map(bg => ({
      group: bg,
      donors: filtered.filter(d => d.group === bg),
    }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-red-200 backdrop-blur-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
      >
        <span className="text-xl">⬅️</span> Go Back
      </button>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">🩸</span>
        <h2 className="text-2xl font-bold text-red-800">
          {i18n.language === 'hi' ? 'रक्त समूह निर्देशिका' : 'Blood Group Directory'}
        </h2>
      </div>
      <p className="mb-4 text-gray-700">
        {i18n.language === 'hi'
          ? 'गाँव के रक्तदाताओं की सूची यहाँ देखें। रक्त समूह से खोजें।'
          : 'See the list of blood donors in the village. Search by blood group.'}
      </p>
      <div className="mb-4">
        <select
          className="border rounded px-3 py-1"
          value={groupFilter}
          onChange={e => setGroupFilter(e.target.value)}
        >
          <option value="">{i18n.language === 'hi' ? 'सभी रक्त समूह' : 'All Blood Groups'}</option>
          {bloodGroups.map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </div>
      <div className="space-y-6">
        {grouped.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {i18n.language === 'hi' ? 'कोई रक्तदाता नहीं मिला' : 'No donors found'}
          </div>
        ) : (
          grouped.map((g, idx) => (
            <div key={idx} className="bg-red-50 rounded-xl p-4 shadow border border-red-100">
              <h3 className="font-bold text-red-700 text-lg mb-2">{g.group}</h3>
              <ul className="divide-y divide-red-100">
                {g.donors.map((d, i) => (
                  <li key={i} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="font-semibold text-red-800">
                      {i18n.language === 'hi' ? d.name_hi : d.name}
                    </span>
                    <span className="text-gray-700">{d.contact ? d.contact : (i18n.language === 'hi' ? 'संपर्क उपलब्ध नहीं' : 'No contact')}</span>
                    <span className={`text-xs ml-2 ${d.approved ? 'text-green-600' : 'text-yellow-600'}`}>
                      {d.approved
                        ? (i18n.language === 'hi' ? 'स्वीकृत' : 'Approved')
                        : (i18n.language === 'hi' ? 'प्रतीक्षारत' : 'Pending')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <div className="text-xs text-gray-500 mt-3">
        {i18n.language === 'hi'
          ? 'यह डेमो डेटा है। जल्द ही रक्तदाता जोड़ने और एडमिन स्वीकृति की सुविधा उपलब्ध होगी।'
          : 'This is demo data. Donor submission and admin approval will be available soon.'}
      </div>
    </div>
  );
}

export default BloodDirectory; 