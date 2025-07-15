import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      villageName: 'Bairiyadih',
      tagline: 'Bairiyadih – Where Culture Meets Service',
      welcome: 'Welcome to Bairiyadih Village Portal',
      intro: 'This is the digital Gram Panchayat and community portal for villagers, tourists, social workers, and students. Explore our culture, services, and community spirit!',
      location: 'Thana - Harsidhi, Bihar, India',
      district: 'District: Purvi Champaran',
      pin: 'PIN code: 845435',
      station: 'Nearest Railway: Harsidhi',
      footer: 'Made with ❤️ for the people of Bairiyadih. Designed for rural India.'
    }
  },
  hi: {
    translation: {
      villageName: 'बैरियाडीह',
      tagline: 'बैरियाडीह – जहाँ संस्कृति और सेवा मिलती है',
      welcome: 'बैरियाडीह ग्राम पोर्टल में आपका स्वागत है',
      intro: 'यह डिजिटल ग्राम पंचायत और समुदाय पोर्टल है – गाँववासियों, पर्यटकों, समाजसेवियों और छात्रों के लिए। हमारी संस्कृति, सेवाएँ और गाँव की आत्मा जानिए!',
      location: 'थाना - हरसिद्धि, बिहार, भारत',
      district: 'जिला: पूर्वी चंपारण',
      pin: 'पिन कोड: 845435',
      station: 'नजदीकी रेलवे: हरसिद्धि',
      footer: 'गाँव के लोगों के लिए ❤️ से बनाया गया। ग्रामीण भारत के लिए डिज़ाइन।'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'hi',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 