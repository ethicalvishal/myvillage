import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DesignerCardBackground from './DesignerCardBackground';
import { useNavigate } from 'react-router-dom';

function Health() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [showAllWards, setShowAllWards] = useState(false);

  // Dynamic year system - automatically updates
  const getCurrentYear = () => new Date().getFullYear();
  const currentYear = getCurrentYear();
  const lastYear = currentYear - 1;
  const nextYear = currentYear + 1;

  const healthCenters = [
    {
      icon: '🏥',
      hi: 'प्राथमिक स्वास्थ्य केंद्र',
      en: 'Primary Health Center',
      descHi: '24x7 स्वास्थ्य सेवाएँ',
      descEn: '24x7 Health Services',
      details: {
        hi: {
          location: 'बैरियाडीह पंचायत भवन के पास',
          address: 'बैरियाडीह, थाना हरसिद्धि, पूर्वी चंपारण, बिहार - 845435',
          doctor: 'कोई डेटा उपलब्ध नहीं',
          contact: 'कोई डेटा उपलब्ध नहीं',
          facilities: ['24x7 आपातकालीन सेवा', 'मुफ्त दवा वितरण', 'प्रसूति कक्ष', 'टीकाकरण', 'ब्लड प्रेशर/शुगर जांच'],
          achievements: [`${currentYear} में 500+ मरीजों का इलाज`, 'राज्य स्तर पर स्वच्छता पुरस्कार'],
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'Near Panchayat Bhawan, Bairiyadih',
          address: 'Bairiyadih, Thana Harsidhi, East Champaran, Bihar - 845435',
          doctor: 'No data available',
          contact: 'No data available',
          facilities: ['24x7 emergency service', 'Free medicine distribution', 'Maternity ward', 'Vaccination', 'BP/Sugar testing'],
          achievements: [`Treated 500+ patients in ${currentYear}`, 'State-level cleanliness award'],
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    },
    {
      icon: '💉',
      hi: 'टीकाकरण अभियान',
      en: 'Vaccination Drive',
      descHi: 'नियमित टीकाकरण',
      descEn: 'Regular Vaccination',
      details: {
        hi: {
          location: 'प्राथमिक स्वास्थ्य केंद्र, बैरियाडीह',
          schedule: 'हर बुधवार, सुबह 9-12 बजे',
          incharge: 'कोई डेटा उपलब्ध नहीं',
          contact: 'कोई डेटा उपलब्ध नहीं',
          vaccines: ['BCG', 'DPT', 'पोलियो', 'COVID-19', 'MMR'],
          achievements: [`${currentYear} में 100% बच्चों का टीकाकरण`],
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'Primary Health Center, Bairiyadih',
          schedule: 'Every Wednesday, 9AM-12PM',
          incharge: 'No data available',
          contact: 'No data available',
          vaccines: ['BCG', 'DPT', 'Polio', 'COVID-19', 'MMR'],
          achievements: [`100% child vaccination in ${currentYear}`],
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    }
  ];

  const camps = [
    {
      icon: '🏥',
      hi: 'स्वास्थ्य शिविर',
      en: 'Health Camp',
      descHi: 'मुफ्त जांच व दवा वितरण',
      descEn: 'Free checkup & medicine',
      details: {
        hi: {
          location: 'बैरियाडीह स्कूल प्रांगण',
          date: 'हर महीने की 15 तारीख',
          doctors: ['कोई डेटा उपलब्ध नहीं'],
          services: ['ब्लड प्रेशर', 'शुगर', 'आंख/दांत जांच', 'मुफ्त दवा'],
          achievements: [`${currentYear} में 200+ मरीज लाभान्वित`],
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'School campus, Bairiyadih',
          date: '15th of every month',
          doctors: ['No data available'],
          services: ['BP', 'Sugar', 'Eye/Dental checkup', 'Free medicine'],
          achievements: [`200+ patients benefited in ${currentYear}`],
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    },
    {
      icon: '🚑',
      hi: 'एम्बुलेंस सेवा',
      en: 'Ambulance Service',
      descHi: 'आपातकालीन सेवा',
      descEn: 'Emergency Service',
      details: {
        hi: {
          location: 'बैरियाडीह पंचायत भवन',
          contact: '108 (एम्बुलेंस हेल्पलाइन)',
          driver: 'कोई डेटा उपलब्ध नहीं',
          timing: '24x7 उपलब्ध',
          achievements: [`${lastYear}-${currentYear} में 50+ मरीजों को अस्पताल पहुँचाया`],
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'Panchayat Bhawan, Bairiyadih',
          contact: '108 (Ambulance Helpline)',
          driver: 'No data available',
          timing: 'Available 24x7',
          achievements: [`50+ patients transported to hospital in ${lastYear}-${currentYear}`],
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    }
  ];

  const doctors = [
    {
      icon: '👨‍⚕️',
      hi: 'कोई डेटा उपलब्ध नहीं',
      en: 'No data available',
      descHi: 'सामान्य चिकित्सक',
      descEn: 'General Physician',
      details: {
        hi: {
          location: 'प्राथमिक स्वास्थ्य केंद्र, बैरियाडीह',
          timing: 'सुबह 8-2, शाम 4-7',
          contact: 'कोई डेटा उपलब्ध नहीं',
          experience: 'कोई डेटा उपलब्ध नहीं',
          qualification: 'कोई डेटा उपलब्ध नहीं',
          special: 'कोई डेटा उपलब्ध नहीं',
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'Primary Health Center, Bairiyadih',
          timing: '8AM-2PM, 4-7PM',
          contact: 'No data available',
          experience: 'No data available',
          qualification: 'No data available',
          special: 'No data available',
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    },
    {
      icon: '👩‍⚕️',
      hi: 'कोई डेटा उपलब्ध नहीं',
      en: 'No data available',
      descHi: 'महिला चिकित्सक',
      descEn: 'Gynecologist',
      details: {
        hi: {
          location: 'प्राथमिक स्वास्थ्य केंद्र, बैरियाडीह',
          timing: 'सुबह 10-2',
          contact: 'कोई डेटा उपलब्ध नहीं',
          experience: 'कोई डेटा उपलब्ध नहीं',
          qualification: 'कोई डेटा उपलब्ध नहीं',
          special: 'कोई डेटा उपलब्ध नहीं',
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'Primary Health Center, Bairiyadih',
          timing: '10AM-2PM',
          contact: 'No data available',
          experience: 'No data available',
          qualification: 'No data available',
          special: 'No data available',
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    }
  ];

  const medicines = [
    { icon: '💊', hi: 'आवश्यक दवाएं', en: 'Essential Medicines', descHi: 'सभी बीमारियों की दवा', descEn: 'Medicines for all diseases' },
    { icon: '🩹', hi: 'प्राथमिक चिकित्सा', en: 'First Aid', descHi: 'आपातकालीन किट', descEn: 'Emergency kit' },
    { icon: '🩺', hi: 'जांच उपकरण', en: 'Testing Equipment', descHi: 'ब्लड प्रेशर, शुगर टेस्ट', descEn: 'BP, sugar testing' },
    { icon: '🌡️', hi: 'थर्मामीटर', en: 'Thermometer', descHi: 'बुखार की जांच', descEn: 'Fever checking' }
  ];

  const awareness = [
    { icon: '📢', hi: 'स्वास्थ्य जागरूकता', en: 'Health Awareness', descHi: 'नियमित कार्यक्रम', descEn: 'Regular programs' },
    { icon: '🧘', hi: 'योग शिविर', en: 'Yoga Camp', descHi: 'साप्ताहिक योग कक्षाएं', descEn: 'Weekly yoga classes' },
    { icon: '🥗', hi: 'पोषण शिक्षा', en: 'Nutrition Education', descHi: 'संतुलित आहार', descEn: 'Balanced diet' },
    { icon: '🚭', hi: 'धूम्रपान निषेध', en: 'Anti-Smoking', descHi: 'धूम्रपान के नुकसान', descEn: 'Smoking hazards' }
  ];

  const emergency = [
    { icon: '📞', hi: 'आपातकालीन नंबर', en: 'Emergency Number', descHi: '108 एम्बुलेंस', descEn: '108 Ambulance' },
    { icon: '🏥', hi: 'नजदीकी अस्पताल', en: 'Nearby Hospital', descHi: '10 किमी दूर', descEn: '10 km away' },
    { icon: '👨‍⚕️', hi: 'डॉक्टर का नंबर', en: 'Doctor Contact', descHi: '24x7 उपलब्ध', descEn: '24x7 available' },
    { icon: '🚨', hi: 'पुलिस स्टेशन', en: 'Police Station', descHi: 'आपातकालीन सहायता', descEn: 'Emergency help' }
  ];

  const services = [
    { icon: '🩸', hi: 'रक्तदान शिविर', en: 'Blood Donation Camp', descHi: 'मासिक रक्तदान', descEn: 'Monthly blood donation' },
    { icon: '👶', hi: 'मातृत्व देखभाल', en: 'Maternity Care', descHi: 'गर्भवती महिलाओं के लिए', descEn: 'For pregnant women' },
    { icon: '👴', hi: 'वरिष्ठ नागरिक', en: 'Senior Citizens', descHi: 'बुजुर्गों की देखभाल', descEn: 'Elderly care' },
    { icon: '🧠', hi: 'मानसिक स्वास्थ्य', en: 'Mental Health', descHi: 'काउंसलिंग सेवाएं', descEn: 'Counseling services' }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Example data for some wards
  const wardHealthData = {
    9: {
      center: lang === 'hi' ? 'स्वास्थ्य केंद्र' : 'Health Center',
      doctor: lang === 'hi' ? '1 डॉक्टर' : '1 doctor',
      staff: lang === 'hi' ? '2 स्वास्थ्यकर्मी' : '2 health workers',
      camp: lang === 'hi' ? '2025 में 3 स्वास्थ्य शिविर' : '3 health camps in 2025',
      medicine: lang === 'hi' ? 'मुफ्त दवा वितरण' : 'Free medicine distribution',
    },
    5: {
      center: lang === 'hi' ? 'आंगनबाड़ी केंद्र' : 'Anganwadi Center',
      doctor: lang === 'hi' ? 'N/A' : 'N/A',
      staff: lang === 'hi' ? '1 सेविका' : '1 worker',
      camp: lang === 'hi' ? '2025 में टीकाकरण अभियान' : 'Vaccination drive in 2025',
      medicine: lang === 'hi' ? 'बच्चों के लिए पोषण' : 'Nutrition for children',
    },
    7: {
      center: lang === 'hi' ? 'प्राथमिक स्वास्थ्य उपकेंद्र' : 'Primary Health Subcenter',
      doctor: lang === 'hi' ? '1 डॉक्टर' : '1 doctor',
      staff: lang === 'hi' ? '1 नर्स' : '1 nurse',
      camp: lang === 'hi' ? '2025 में मातृ स्वास्थ्य शिविर' : 'Maternal health camp in 2025',
      medicine: lang === 'hi' ? 'आयरन टैबलेट वितरण' : 'Iron tablets distribution',
    },
  };

  return (
    <main className="flex flex-col items-center mt-8 px-4 relative">
      {/* Go Back Button */}
      <div className="w-full max-w-6xl mb-4 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-red-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium focus:ring-2 focus:ring-red-500"
          aria-label="Go Back"
        >
          <span role="img" aria-label="back">⬅️</span>
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl w-full border-l-8 border-red-400 mt-8 mb-8 relative z-10 overflow-hidden">
        {/* Subtle SVG Rural Motif */}
        <svg className="absolute bottom-0 left-0 w-full h-24 opacity-10 pointer-events-none select-none" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="100" rx="120" ry="20" fill="#fecaca" />
          <ellipse cx="600" cy="110" rx="180" ry="25" fill="#fef08a" />
          <ellipse cx="1200" cy="100" rx="140" ry="18" fill="#fca5a5" />
          <rect x="1000" y="90" width="40" height="20" rx="6" fill="#fcd34d" />
          <rect x="1020" y="100" width="10" height="10" fill="#fde68a" />
          <rect x="300" y="95" width="30" height="15" rx="4" fill="#fecaca" />
          <rect x="310" y="105" width="10" height="7" fill="#f87171" />
        </svg>
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-red-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="health" className="text-4xl">🏥</span>
            {lang === 'hi' ? 'स्वास्थ्य सेवाएँ' : 'Health Services'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-black leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'गाँव के स्वास्थ्य केंद्र, शिविर, और टीकाकरण की जानकारी। स्वस्थ गाँव, खुशहाल गाँव!' 
              : 'Info about village health center, camps, and vaccination. Healthy village, happy village!'}
          </p>
        </div>

        {/* Health Centers Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'स्वास्थ्य केंद्र' : 'Health Centers'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {healthCenters.map((h, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                  <span className="text-2xl">{h.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${lang === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? h.hi : h.en}</h4>
                <p className="text-sm text-gray-600 mb-3">{lang === 'hi' ? h.descHi : h.descEn}</p>
                <button
                  onClick={() => toggleSection(`healthCenter-${i}`)}
                  className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-red-600 hover:to-yellow-600 transition-all duration-300"
                >
                  {expandedSection === `healthCenter-${i}` ? (lang === 'hi' ? 'कम देखें' : 'Show Less') : (lang === 'hi' ? 'विस्तार से देखें' : 'View Details')}
                </button>
              </div>
              {expandedSection === `healthCenter-${i}` && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="space-y-2 text-sm text-black">
                    <p><strong>{lang === 'hi' ? 'स्थान:' : 'Location:'}</strong> {lang === 'hi' ? h.details.hi.location : h.details.en.location}</p>
                    <p><strong>{lang === 'hi' ? 'पता:' : 'Address:'}</strong> {lang === 'hi' ? h.details.hi.address : h.details.en.address}</p>
                    <p><strong>{lang === 'hi' ? 'डॉक्टर:' : 'Doctor:'}</strong> {lang === 'hi' ? h.details.hi.doctor : h.details.en.doctor}</p>
                    <p><strong>{lang === 'hi' ? 'संपर्क:' : 'Contact:'}</strong> {lang === 'hi' ? h.details.hi.contact : h.details.en.contact}</p>
                    <p><strong>{lang === 'hi' ? 'सुविधाएं:' : 'Facilities:'}</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      {(lang === 'hi' ? h.details.hi.facilities : h.details.en.facilities).map((facility, idx) => (
                        <li key={idx}>{facility}</li>
                      ))}
                    </ul>
                    <p><strong>{lang === 'hi' ? 'उपलब्धियां:' : 'Achievements:'}</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      {(lang === 'hi' ? h.details.hi.achievements : h.details.en.achievements).map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                    <p><strong>{lang === 'hi' ? 'नजदीकी:' : 'Nearby:'}</strong> {lang === 'hi' ? h.details.hi.nearby : h.details.en.nearby}</p>
                  </div>
                </div>
              )}
                    </div>
          ))}
                  </div>

        {/* Doctors Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'चिकित्सक' : 'Doctors'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {doctors.map((d, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">{d.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 text-sm ${lang === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? d.hi : d.en}</h4>
                <p className="text-xs text-gray-600 mb-3">{lang === 'hi' ? d.descHi : d.descEn}</p>
                <button
                  onClick={() => toggleSection(`doctor-${i}`)}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300"
                >
                  {expandedSection === `doctor-${i}` ? (lang === 'hi' ? 'कम' : 'Less') : (lang === 'hi' ? 'विस्तार' : 'Details')}
                </button>
                    </div>
              {expandedSection === `doctor-${i}` && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="space-y-1 text-xs text-black">
                    <p><strong>{lang === 'hi' ? 'स्थान:' : 'Location:'}</strong> {lang === 'hi' ? d.details.hi.location : d.details.en.location}</p>
                    <p><strong>{lang === 'hi' ? 'समय:' : 'Timing:'}</strong> {lang === 'hi' ? d.details.hi.timing : d.details.en.timing}</p>
                    <p><strong>{lang === 'hi' ? 'संपर्क:' : 'Contact:'}</strong> {lang === 'hi' ? d.details.hi.contact : d.details.en.contact}</p>
                    <p><strong>{lang === 'hi' ? 'अनुभव:' : 'Experience:'}</strong> {lang === 'hi' ? d.details.hi.experience : d.details.en.experience}</p>
                    <p><strong>{lang === 'hi' ? 'योग्यता:' : 'Qualification:'}</strong> {lang === 'hi' ? d.details.hi.qualification : d.details.en.qualification}</p>
                    <p><strong>{lang === 'hi' ? 'विशेषज्ञता:' : 'Specialization:'}</strong> {lang === 'hi' ? d.details.hi.special : d.details.en.special}</p>
                    <p><strong>{lang === 'hi' ? 'नजदीकी:' : 'Nearby:'}</strong> {lang === 'hi' ? d.details.hi.nearby : d.details.en.nearby}</p>
                  </div>
                </div>
              )}
                    </div>
          ))}
                  </div>

        {/* Medicines Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'दवाएं और उपकरण' : 'Medicines & Equipment'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {medicines.map((m, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">{m.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 text-sm ${lang === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? m.hi : m.en}</h4>
                <p className="text-xs text-gray-600">{lang === 'hi' ? m.descHi : m.descEn}</p>
              </div>
            </div>
          ))}
          </div>

        {/* Health Camps Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'स्वास्थ्य शिविर' : 'Health Camps'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {camps.map((c, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                  <span className="text-2xl">{c.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${lang === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? c.hi : c.en}</h4>
                <p className="text-sm text-gray-600 mb-3">{lang === 'hi' ? c.descHi : c.descEn}</p>
                <button
                  onClick={() => toggleSection(`camp-${i}`)}
                  className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-yellow-600 hover:to-red-600 transition-all duration-300"
                >
                  {expandedSection === `camp-${i}` ? (lang === 'hi' ? 'कम देखें' : 'Show Less') : (lang === 'hi' ? 'विस्तार से देखें' : 'View Details')}
                </button>
                    </div>
              {expandedSection === `camp-${i}` && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="space-y-2 text-sm text-black">
                    <p><strong>{lang === 'hi' ? 'स्थान:' : 'Location:'}</strong> {lang === 'hi' ? c.details.hi.location : c.details.en.location}</p>
                    <p><strong>{lang === 'hi' ? 'तारीख:' : 'Date:'}</strong> {lang === 'hi' ? c.details.hi.date : c.details.en.date}</p>
                    <p><strong>{lang === 'hi' ? 'डॉक्टर:' : 'Doctors:'}</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      {(lang === 'hi' ? c.details.hi.doctors : c.details.en.doctors).map((doctor, idx) => (
                        <li key={idx}>{doctor}</li>
                      ))}
                    </ul>
                    <p><strong>{lang === 'hi' ? 'सेवाएं:' : 'Services:'}</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      {(lang === 'hi' ? c.details.hi.services : c.details.en.services).map((service, idx) => (
                        <li key={idx}>{service}</li>
                      ))}
                    </ul>
                    <p><strong>{lang === 'hi' ? 'उपलब्धियां:' : 'Achievements:'}</strong></p>
                    <ul className="list-disc list-inside ml-2">
                      {(lang === 'hi' ? c.details.hi.achievements : c.details.en.achievements).map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                    <p><strong>{lang === 'hi' ? 'नजदीकी:' : 'Nearby:'}</strong> {lang === 'hi' ? c.details.hi.nearby : c.details.en.nearby}</p>
                  </div>
                </div>
              )}
                    </div>
          ))}
                  </div>

        {/* Awareness Programs Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'जागरूकता कार्यक्रम' : 'Awareness Programs'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {awareness.map((a, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">{a.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 text-sm ${lang === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? a.hi : a.en}</h4>
                <p className="text-xs text-gray-600">{lang === 'hi' ? a.descHi : a.descEn}</p>
              </div>
            </div>
          ))}
                    </div>

        {/* Emergency Contacts Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {emergency.map((e, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">{e.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 text-sm ${lang === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? e.hi : e.en}</h4>
                <p className="text-xs text-gray-600">{lang === 'hi' ? e.descHi : e.descEn}</p>
              </div>
            </div>
          ))}
                </div>

        {/* Additional Services Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>{lang === 'hi' ? 'अतिरिक्त सेवाएं' : 'Additional Services'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">{s.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 text-sm ${lang === 'hi' ? 'hindi-text' : ''}`}>{lang === 'hi' ? s.hi : s.en}</h4>
                <p className="text-xs text-gray-600">{lang === 'hi' ? s.descHi : s.descEn}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 relative z-10">
          <span className="text-2xl">🌱</span>
          <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full mx-auto my-2"></div>
          <p className="text-base text-red-700 font-semibold italic">
            {lang === 'hi' ? 'स्वस्थ गाँव, समृद्ध गाँव।' : 'Healthy village, prosperous village.'}
          </p>
          </div>
        {/* Bilingual Rural Quote/Fact at Bottom */}
        <div className="flex justify-center items-center mt-8 mb-2 relative z-10">
          <span className="text-base md:text-lg text-red-800 font-semibold flex items-center gap-2 bg-red-100/60 px-3 py-1 rounded-full border border-red-300/40 shadow-sm">
            <span>🌾</span>
            {lang === 'hi' ? 'स्वास्थ्य है तो सब कुछ है।' : 'Health is true wealth in the village.'}
            <span>🌻</span>
          </span>
        </div>
      </div>
      <DesignerCardBackground variant="default">
        <div className="text-center mb-8">
          <span className="text-6xl mb-2" role="img" aria-label="health">🏥</span>
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow-lg tracking-tight leading-[1.2] hindi-heading">
            {lang === 'hi' ? 'स्वास्थ्य (वार्ड अनुसार)' : 'Health (Ward-wise)'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            {lang === 'hi'
              ? 'हर वार्ड के लिए स्वास्थ्य से जुड़ी जानकारी।'
              : 'Health details for each ward.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(22)].slice(0, showAllWards ? 22 : 3).map((_, idx) => {
            const wardNum = idx + 1;
            const data = wardHealthData[wardNum];
            return (
              <div key={wardNum} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{wardNum}</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold text-gray-800 ${lang === 'hi' ? 'hindi-text' : ''}`}>
                      {lang === 'hi' ? `वार्ड नंबर ${wardNum}` : `Ward No. ${wardNum}`}
                    </h4>
                  </div>
                </div>
                {data ? (
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>🏥 {lang === 'hi' ? `केंद्र: ${data.center}` : `Center: ${data.center}`}</li>
                    <li>👨‍⚕️ {lang === 'hi' ? `डॉक्टर: ${data.doctor}` : `Doctor: ${data.doctor}`}</li>
                    <li>👩‍⚕️ {lang === 'hi' ? `स्टाफ: ${data.staff}` : `Staff: ${data.staff}`}</li>
                    <li>⛑️ {lang === 'hi' ? `शिविर: ${data.camp}` : `Camp: ${data.camp}`}</li>
                    <li>💊 {lang === 'hi' ? `दवा/सेवा: ${data.medicine}` : `Medicine/Service: ${data.medicine}`}</li>
                  </ul>
                ) : (
                  <div className="text-gray-400 text-sm text-center py-6">
                    {lang === 'hi' ? 'जानकारी उपलब्ध नहीं' : 'No data available'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-400 text-white font-semibold rounded-full shadow hover:scale-105 transition-all duration-200"
            onClick={() => setShowAllWards(v => !v)}
          >
            {showAllWards
              ? (lang === 'hi' ? 'कम दिखाएं' : 'Show Less')
              : (lang === 'hi' ? 'सभी वार्ड देखें' : 'See All Wards')}
          </button>
        </div>
      </DesignerCardBackground>
    </main>
  );
}

export default Health; 