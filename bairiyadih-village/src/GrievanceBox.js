import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function GrievanceBox() {
  const { i18n } = useTranslation();
  const [form, setForm] = useState({ subject: '', message: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setSubmitted(true);
    setForm({ subject: '', message: '', phone: '' });
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
      >
        <span className="text-xl">⬅️</span> Go Back
      </button>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">📝</span>
        <h2 className="text-2xl font-bold text-gray-800">
          {i18n.language === 'hi' ? 'सुझाव/शिकायत बॉक्स' : 'Grievance Box'}
        </h2>
      </div>
      <p className="mb-4 text-gray-700">
        {i18n.language === 'hi'
          ? 'गाँव के विकास या समस्याओं के लिए अपना सुझाव या शिकायत गुमनाम रूप से भेजें।'
          : 'Submit your suggestion or complaint for village development or issues anonymously.'}
      </p>
      {submitted ? (
        <div className="bg-green-100 border border-green-300 text-green-800 rounded p-4 text-center">
          {i18n.language === 'hi'
            ? 'आपका सुझाव/शिकायत सफलतापूर्वक भेज दिया गया है।'
            : 'Your suggestion/complaint has been submitted successfully.'}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">
              {i18n.language === 'hi' ? 'विषय (ऐच्छिक)' : 'Subject (Optional)'}
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-gray-300"
              placeholder={i18n.language === 'hi' ? 'विषय लिखें' : 'Enter subject'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              {i18n.language === 'hi' ? 'संदेश (आवश्यक)' : 'Message (Required)'}
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-gray-300"
              rows={4}
              required
              placeholder={i18n.language === 'hi' ? 'अपना सुझाव या शिकायत लिखें' : 'Write your suggestion or complaint'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              {i18n.language === 'hi' ? 'फोन नंबर (ऐच्छिक)' : 'Phone Number (Optional)'}
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-gray-300"
              placeholder={i18n.language === 'hi' ? 'फोन नंबर (यदि आप चाहें)' : 'Phone number (if you wish)'}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-bold py-2 rounded hover:bg-gray-900 transition"
          >
            {i18n.language === 'hi' ? 'भेजें' : 'Submit'}
          </button>
        </form>
      )}
      <div className="text-xs text-gray-500 mt-3">
        {i18n.language === 'hi'
          ? 'यह फॉर्म गुमनाम है। जल्द ही एडमिन पैनल में सुझाव/शिकायत देखने और व्हाट्सएप अलर्ट की सुविधा उपलब्ध होगी।'
          : 'This form is anonymous. Admin panel and WhatsApp alert integration coming soon.'}
      </div>
    </div>
  );
}

export default GrievanceBox; 