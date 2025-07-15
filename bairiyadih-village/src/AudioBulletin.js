import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const bulletins = [
  {
    title: 'मुखिया जी का संदेश',
    title_en: 'Message from Mukhiya Ji',
    desc: 'गाँव के विकास के लिए सभी का सहयोग जरूरी है।',
    desc_en: 'Everyone\'s support is needed for the village\'s progress.',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    date: '2024-06-01',
  },
  {
    title: 'ग्राम सभा सूचना',
    title_en: 'Gram Sabha Notice',
    desc: 'आगामी ग्राम सभा की बैठक की सूचना।',
    desc_en: 'Notice for the upcoming Gram Sabha meeting.',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    date: '2024-06-05',
  },
];

function AudioBulletin() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white/80 rounded-2xl shadow-xl border border-pink-200 backdrop-blur-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
      >
        <span className="text-xl">⬅️</span> Go Back
      </button>
      <div className="flex flex-col items-center mb-4">
        <span className="text-4xl mb-1">🔊</span>
        <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
          {i18n.language === 'hi' ? 'ग्रामवाणी रेडियो' : 'Audio Bulletin'}
        </h2>
        <div className="h-1 w-24 mx-auto mb-2 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full"></div>
      </div>
      <p className="mb-4 text-gray-700">
        {i18n.language === 'hi'
          ? 'यहाँ ग्राम पंचायत द्वारा जारी ऑडियो संदेश सुनें।'
          : 'Listen to audio messages issued by the Gram Panchayat.'}
      </p>
      <div className="space-y-6">
        {bulletins.map((b, idx) => (
          <div key={idx} className="bg-pink-50 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center gap-4 border border-pink-100 transition-all duration-300 hover:shadow-2xl">
            <div className="flex-1">
              <h3 className="font-bold text-pink-700 text-lg mb-1">{i18n.language === 'hi' ? b.title : b.title_en}</h3>
              <p className="text-gray-700 mb-1">{i18n.language === 'hi' ? b.desc : b.desc_en}</p>
              <div className="text-xs text-gray-500 mb-2">{b.date}</div>
              <audio controls className="w-full">
                <source src={b.url} type="audio/mp3" />
                {i18n.language === 'hi' ? 'आपका ब्राउज़र ऑडियो प्लेयर सपोर्ट नहीं करता।' : 'Your browser does not support the audio player.'}
              </audio>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-3">
        {i18n.language === 'hi'
          ? 'यह डेमो डेटा है। जल्द ही एडमिन द्वारा ऑडियो संदेश जोड़े जा सकेंगे।'
          : 'This is demo data. Admin will be able to upload audio soon.'}
      </div>
    </div>
  );
}

export default AudioBulletin; 