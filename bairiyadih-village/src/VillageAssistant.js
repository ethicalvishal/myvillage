import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const mockAnswers = [
  {
    hi: 'प्रधानमंत्री आवास योजना के लिए ऑनलाइन आवेदन epanchayat पोर्टल या नजदीकी CSC केंद्र पर करें।',
    en: 'Apply for PM Awas Yojana online via the ePanchayat portal or at your nearest CSC center.'
  },
  {
    hi: 'आवश्यक दस्तावेज़: आधार कार्ड, बैंक पासबुक, राशन कार्ड, फोटो।',
    en: 'Required documents: Aadhaar card, bank passbook, ration card, photo.'
  },
  {
    hi: 'कृपया अपना सवाल स्पष्ट रूप से लिखें, मैं मदद करने की कोशिश करूंगा।',
    en: 'Please write your question clearly, I will try to help.'
  }
];

function VillageAssistant() {
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: i18n.language === 'hi' ? 'नमस्ते! मैं गाँव सहायक हूँ। सरकारी योजनाओं, फॉर्म या दस्तावेज़ से जुड़ा सवाल पूछें।' : 'Hello! I am your Village Assistant. Ask me about government schemes, forms, or documents.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleSend = e => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      // Pick a random mock answer
      const ans = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
      setMessages(msgs => [
        ...msgs,
        { sender: 'bot', text: i18n.language === 'hi' ? ans.hi : ans.en }
      ]);
      setLoading(false);
    }, 1200);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-green-200 backdrop-blur-md flex flex-col h-[70vh]">
      <button
        onClick={handleGoBack}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium focus:ring-2 focus:ring-green-500"
        aria-label="Go Back"
      >
        <span role="img" aria-label="back">⬅️</span>
        {i18n.language === 'hi' ? 'वापस जाएं' : 'Go Back'}
      </button>
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-2">🤖</span>
        <h2 className="text-2xl font-bold text-green-800">
          {i18n.language === 'hi' ? 'गाँव सहायक' : 'Village Assistant'}
        </h2>
      </div>
      <p className="mb-4 text-green-800">
        {i18n.language === 'hi'
          ? 'सरकारी योजनाओं, फॉर्म या दस्तावेज़ से जुड़ा सवाल पूछें।'
          : 'Ask about government schemes, forms, or documents.'}
      </p>
      <div className="flex-1 overflow-y-auto bg-green-50 rounded-xl p-3 mb-4 border border-green-100">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-green-200 text-right text-green-900 font-semibold' : 'bg-white border border-green-200 text-green-800 font-medium'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-2 flex justify-start">
            <div className="px-3 py-2 rounded-lg bg-white border border-green-200 animate-pulse">{i18n.language === 'hi' ? 'सोच रहा हूँ...' : 'Thinking...'}</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-green-300"
          placeholder={i18n.language === 'hi' ? 'अपना सवाल लिखें...' : 'Type your question...'}
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition focus:ring focus:ring-green-300"
          disabled={loading}
        >
          {i18n.language === 'hi' ? 'भेजें' : 'Send'}
        </button>
      </form>
      <div className="text-xs text-black mt-3">
        {i18n.language === 'hi'
          ? 'यह डेमो चैटबॉट है। जल्द ही AI (ChatGPT) से जोड़ा जाएगा।'
          : 'This is a demo chatbot. AI (ChatGPT) integration coming soon.'}
      </div>
    </div>
  );
}

export default VillageAssistant; 