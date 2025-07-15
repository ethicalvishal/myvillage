import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const polls = [
  {
    id: 1,
    question: 'गाँव में सबसे जरूरी सुविधा क्या है?',
    question_en: 'What is the most needed facility in the village?',
    options: [
      { text: 'सड़क', text_en: 'Road', votes: 12 },
      { text: 'पानी', text_en: 'Water', votes: 8 },
      { text: 'स्कूल', text_en: 'School', votes: 5 },
      { text: 'स्वास्थ्य केंद्र', text_en: 'Health Center', votes: 3 },
    ],
  },
  {
    id: 2,
    question: 'क्या आप ग्राम सभा में भाग लेते हैं?',
    question_en: 'Do you participate in Gram Sabha meetings?',
    options: [
      { text: 'हाँ', text_en: 'Yes', votes: 10 },
      { text: 'नहीं', text_en: 'No', votes: 7 },
    ],
  },
];

function VillagePolls() {
  const { i18n } = useTranslation();
  const [userVotes, setUserVotes] = useState({});
  const [pollData, setPollData] = useState(polls);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleVote = (pollId, optionIdx) => {
    if (userVotes[pollId]) return; // Prevent multiple votes
    const updatedPolls = pollData.map(p => {
      if (p.id !== pollId) return p;
      const newOptions = p.options.map((opt, idx) =>
        idx === optionIdx ? { ...opt, votes: opt.votes + 1 } : opt
      );
      return { ...p, options: newOptions };
    });
    setPollData(updatedPolls);
    setUserVotes({ ...userVotes, [pollId]: optionIdx });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-green-200 backdrop-blur-md">
      <button
        onClick={handleGoBack}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium focus:ring-2 focus:ring-green-500"
        aria-label="Go Back"
      >
        <span role="img" aria-label="back">⬅️</span>
        {i18n.language === 'hi' ? 'वापस जाएं' : 'Go Back'}
      </button>
      <div className="flex flex-col items-center mb-4">
        <span className="text-4xl mb-1">📊</span>
        <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          {i18n.language === 'hi' ? 'गाँव सर्वे/मतदान' : 'Village Polls/Surveys'}
        </h2>
        <div className="h-1 w-24 mx-auto mb-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
      </div>
      <p className="mb-4 text-black">
        {i18n.language === 'hi'
          ? 'गाँव के लिए अपनी राय दें। मतदान गुमनाम है और परिणाम तुरंत देखें।'
          : 'Share your opinion for the village. Voting is anonymous and results are shown instantly.'}
      </p>
      <div className="space-y-8">
        {pollData.map((poll) => {
          const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
          return (
            <div key={poll.id} className="bg-green-50 rounded-2xl p-6 shadow-xl border border-green-100 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 hover:shadow-2xl">
              <h3 className="font-bold text-green-700 text-lg mb-2">
                {i18n.language === 'hi' ? poll.question : poll.question_en}
              </h3>
              <div className="space-y-2">
                {poll.options.map((opt, idx) => {
                  const percent = totalVotes ? Math.round((opt.votes / totalVotes) * 100) : 0;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <button
                        disabled={userVotes[poll.id] !== undefined}
                        onClick={() => handleVote(poll.id, idx)}
                        className={`px-3 py-1 rounded border ${userVotes[poll.id] === idx ? 'bg-green-600 text-white' : 'bg-white text-green-800 border-green-300 hover:bg-green-100'} transition`}
                      >
                        {i18n.language === 'hi' ? opt.text : opt.text_en}
                      </button>
                      <div className="flex-1 h-3 bg-green-100 rounded overflow-hidden mx-2">
                        <div
                          className="h-3 bg-green-400"
                          style={{ width: percent + '%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-black w-10">{percent}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-xs text-black mt-2">
                {i18n.language === 'hi'
                  ? `कुल वोट: ${totalVotes}`
                  : `Total votes: ${totalVotes}`}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-black mt-3">
        {i18n.language === 'hi'
          ? 'यह डेमो डेटा है। जल्द ही एडमिन द्वारा नए पोल जोड़े जा सकेंगे।'
          : 'This is demo data. Admin will be able to add new polls soon.'}
      </div>
    </div>
  );
}

export default VillagePolls; 