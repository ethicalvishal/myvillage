import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DesignerCardBackground from './DesignerCardBackground';
import { useNavigate } from 'react-router-dom';

function Education() {
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

  const schools = [
    {
      icon: '🏫',
      hi: 'सरकारी प्राथमिक विद्यालय',
      en: 'Government Primary School',
      descHi: 'कक्षा 1-5 तक की शिक्षा',
      descEn: 'Education from Class 1-5',
      details: {
        hi: {
          location: 'गाँव चौक के पास, बैरियाडीह',
          address: 'बैरियाडीह, थाना हरसिद्धि, पूर्वी चंपारण, बिहार - 845435',
          principal: 'जानकारी अपडेट की जा रही है',
          contact: 'जानकारी अपडेट की जा रही है',
          facilities: ['कंप्यूटर लैब', 'खेल मैदान', 'पुस्तकालय', 'मिड-डे मील', 'स्वच्छ पेयजल'],
          achievements: [`${currentYear} में 100% परिणाम`, 'राज्य स्तर पर खेल प्रतियोगिता में पुरस्कार'],
          nearby: 'जानकारी अपडेट की जा रही है',
          year: currentYear.toString()
        },
        en: {
          location: 'Near Village Square, Bairiyadih',
          address: 'Bairiyadih, Thana Harsidhi, East Champaran, Bihar - 845435',
          principal: 'Information being updated',
          contact: 'Information being updated',
          facilities: ['Computer lab', 'Playground', 'Library', 'Mid-day meal', 'Clean drinking water'],
          achievements: [`100% result in ${currentYear}`, 'State-level sports competition award'],
          nearby: 'Information being updated',
          year: currentYear.toString()
        }
      }
    },
    {
      icon: '🎓',
      hi: 'सरकारी मिडिल स्कूल',
      en: 'Government Middle School',
      descHi: 'कक्षा 6-8 तक की शिक्षा',
      descEn: 'Education from Class 6-8',
      details: {
        hi: {
          location: 'वार्ड नंबर 8, बैरियाडीह',
          address: 'बैरियाडीह, थाना हरसिद्धि, पूर्वी चंपारण, बिहार - 845435',
          principal: 'श्री बलिंद्र सिंह',
          contact: '+91 8340442470, 9955475759',
          facilities: ['विज्ञान प्रयोगशाला', 'कंप्यूटर लैब', 'खेल मैदान', 'पुस्तकालय', 'स्मार्ट क्लास'],
          achievements: [`${currentYear} में 2 राज्य स्तर टॉपर`, 'विज्ञान प्रदर्शनी में पुरस्कार'],
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'Ward No. 8, Bairiyadih',
          address: 'Bairiyadih, Thana Harsidhi, East Champaran, Bihar - 845435',
          principal: 'Shri Balindra Singh',
          contact: '+91 8340442470, 9955475759',
          facilities: ['Science lab', 'Computer lab', 'Playground', 'Library', 'Smart class'],
          achievements: [`2 state toppers in ${currentYear}`, 'Science exhibition award'],
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    }
  ];

  const teachers = [
    {
      icon: '👨‍��',
      hi: 'श्री बलिंद्र सिंह',
      en: 'Shri Balindra Singh',
      descHi: 'शिक्षक, मिडिल स्कूल',
      descEn: 'Teacher, Middle School',
      details: {
        hi: {
          location: 'सरकारी मिडिल स्कूल, वार्ड नंबर 8',
          timing: 'सुबह 9-शाम 3',
          contact: '+91 8340442470, 9955475759',
          experience: '12 वर्ष',
          qualification: 'B.Ed, M.A (हिंदी)',
          special: 'हिंदी और सामाजिक विज्ञान',
          nearby: 'बैरियाडीह, वार्ड नंबर 8, बलियाघाट शिव मंदिर के पास, घर नंबर 2',
          year: currentYear.toString()
        },
        en: {
          location: 'Government Middle School, Ward No. 8',
          timing: '9AM-3PM',
          contact: '+91 8340442470, 9955475759',
          experience: '12 years',
          qualification: 'B.Ed, M.A (Hindi)',
          special: 'Hindi and Social Studies',
          nearby: 'Bairiyadih, Ward No. 8, Near Baliyaghat Shiv Mandir, House No. 2',
          year: currentYear.toString()
        }
      }
    },
    {
      icon: '👩‍🏫',
      hi: 'श्रीमती सीमा सिंह',
      en: 'Smt. Seema Singh',
      descHi: 'शिक्षिका, मिडिल स्कूल',
      descEn: 'Teacher, Middle School',
      details: {
        hi: {
          location: 'सरकारी मिडिल स्कूल, वार्ड नंबर 8',
          timing: 'सुबह 9-3',
          contact: 'कोई डेटा उपलब्ध नहीं',
          experience: '8 वर्ष',
          qualification: 'B.Ed, M.Sc (गणित)',
          special: 'गणित और विज्ञान',
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'Government Middle School, Ward No. 8',
          timing: '9AM-3PM',
          contact: 'No data available',
          experience: '8 years',
          qualification: 'B.Ed, M.Sc (Mathematics)',
          special: 'Mathematics and Science',
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    }
  ];

  const anganwadi = [
    {
      icon: '👶',
      hi: 'आंगनबाड़ी केंद्र',
      en: 'Anganwadi Center',
      descHi: 'बच्चों और महिलाओं के लिए',
      descEn: 'For children and women',
      details: {
        hi: {
          location: 'वार्ड नंबर 8, बैरियाडीह',
          timing: 'सुबह 9-2',
          sevika: 'श्रीमती रेखा देवी',
          sahayika: 'श्रीमती संगीता देवी',
          contact: 'कोई डेटा उपलब्ध नहीं',
          services: ['पोषण आहार', 'प्रारंभिक शिक्षा', 'टीकाकरण', 'स्वास्थ्य जांच', 'महिला सशक्तिकरण'],
          achievements: [`${currentYear} में 25 बच्चों का पोषण`, '100% टीकाकरण'],
          nearby: 'कोई डेटा उपलब्ध नहीं',
          year: currentYear.toString()
        },
        en: {
          location: 'Ward No. 8, Bairiyadih',
          timing: '9AM-2PM',
          sevika: 'Smt. Rekha Devi',
          sahayika: 'Smt. Sangita Devi',
          contact: 'No data available',
          services: ['Nutrition food', 'Early education', 'Vaccination', 'Health checkup', 'Women empowerment'],
          achievements: [`Nutrition for 25 children in ${currentYear}`, '100% vaccination'],
          nearby: 'No data available',
          year: currentYear.toString()
        }
      }
    }
  ];

  const scholarships = [
    { icon: '💰', hi: 'छात्रवृत्ति योजनाएं', en: 'Scholarship Schemes', descHi: 'सरकारी छात्रवृत्ति', descEn: 'Government scholarships' },
    { icon: '📚', hi: 'पुस्तक वितरण', en: 'Book Distribution', descHi: 'मुफ्त पुस्तकें', descEn: 'Free books' },
    { icon: '🎒', hi: 'स्कूल बैग', en: 'School Bags', descHi: 'मुफ्त स्कूल बैग', descEn: 'Free school bags' },
    { icon: '👕', hi: 'यूनिफॉर्म', en: 'Uniforms', descHi: 'मुफ्त यूनिफॉर्म', descEn: 'Free uniforms' }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderDetails = (details, lang) => {
    if (!details) return null;
    const data = details[lang];
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{lang === 'hi' ? 'स्थान और संपर्क' : 'Location & Contact'}</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>📍 {data.location}</li>
              <li>🏠 {data.address}</li>
              <li>📞 {data.contact}</li>
              {data.timing && <li>🕒 {data.timing}</li>}
              {data.principal && <li>👨‍💼 {lang === 'hi' ? 'प्रधानाध्यापक: ' : 'Principal: '}{data.principal}</li>}
              {data.sevika && <li>👩‍💼 {lang === 'hi' ? 'सेविका: ' : 'Sevika: '}{data.sevika}</li>}
              {data.sahayika && <li>👩‍💼 {lang === 'hi' ? 'सहायिका: ' : 'Sahayika: '}{data.sahayika}</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{lang === 'hi' ? 'सुविधाएं और उपलब्धियां' : 'Facilities & Achievements'}</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {data.facilities && data.facilities.map((facility, idx) => (
                <li key={idx}>✅ {facility}</li>
              ))}
              {data.services && data.services.map((service, idx) => (
                <li key={idx}>✅ {service}</li>
              ))}
              {data.achievements && data.achievements.map((achievement, idx) => (
                <li key={idx}>🏆 {achievement}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{lang === 'hi' ? 'निकटतम: ' : 'Nearby: '}</span>
            {data.nearby}
          </p>
        </div>
      </div>
    );
  };

  // Example data for some wards
  const wardEducationData = {
    5: {
      school: lang === 'hi' ? 'प्राथमिक विद्यालय' : 'Primary School',
      students: lang === 'hi' ? '120 छात्र' : '120 students',
      teachers: lang === 'hi' ? '2 शिक्षक' : '2 teachers',
      achievement: lang === 'hi' ? '2025 में 100% रिजल्ट' : '100% result in 2025',
      scholarship: lang === 'hi' ? '5 छात्रवृत्ति प्राप्त' : '5 scholarships awarded',
    },
    7: {
      school: lang === 'hi' ? 'मिडिल स्कूल' : 'Middle School',
      students: lang === 'hi' ? '80 छात्र' : '80 students',
      teachers: lang === 'hi' ? '3 शिक्षक' : '3 teachers',
      achievement: lang === 'hi' ? '2025 में 2 राज्य स्तर टॉपर' : '2 state toppers in 2025',
      scholarship: lang === 'hi' ? '3 छात्रवृत्ति प्राप्त' : '3 scholarships awarded',
    },
    8: {
      school: lang === 'hi' ? 'सरकारी मिडिल स्कूल + आंगनबाड़ी' : 'Government Middle School + Anganwadi',
      students: lang === 'hi' ? '95 छात्र + 25 बच्चे' : '95 students + 25 children',
      teachers: lang === 'hi' ? 'Shri Balindra Singh, Smt. Seema Singh (School) + 1 Sevika, Smt. Sangita Devi (Sahayika)' : 'Shri Balindra Singh, Smt. Seema Singh (School) + 1 Sevika, Smt. Sangita Devi (Sahayika)',
      achievement: lang === 'hi' ? '2025 में उत्कृष्ट शैक्षिक प्रदर्शन' : 'Excellent academic performance in 2025',
      scholarship: lang === 'hi' ? '4 छात्रवृत्ति प्राप्त' : '4 scholarships awarded',
    },
    9: {
      school: lang === 'hi' ? 'आंगनबाड़ी केंद्र' : 'Anganwadi Center',
      students: lang === 'hi' ? '35 बच्चे' : '35 children',
      teachers: lang === 'hi' ? '1 सेविका' : '1 worker',
      achievement: lang === 'hi' ? '2025 में पोषण अभियान' : 'Nutrition campaign in 2025',
      scholarship: lang === 'hi' ? 'N/A' : 'N/A',
    },
  };

  return (
    <main className="flex flex-col items-center mt-8 px-4 relative">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl w-full border-l-8 border-blue-400 mt-8 mb-8 relative z-10 overflow-hidden">
        {/* Subtle SVG Rural Motif */}
        <svg className="absolute bottom-0 left-0 w-full h-24 opacity-10 pointer-events-none select-none" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="100" rx="120" ry="20" fill="#dbeafe" />
          <ellipse cx="600" cy="110" rx="180" ry="25" fill="#fef3c7" />
          <ellipse cx="1200" cy="100" rx="140" ry="18" fill="#e0e7ff" />
          <rect x="1000" y="90" width="40" height="20" rx="6" fill="#fcd34d" />
          <rect x="1020" y="100" width="10" height="10" fill="#fde68a" />
          <rect x="300" y="95" width="30" height="15" rx="4" fill="#dbeafe" />
          <rect x="310" y="105" width="10" height="7" fill="#3b82f6" />
        </svg>
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="education" className="text-4xl">🎓</span>
            {lang === 'hi' ? 'शिक्षा' : 'Education'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-black leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'बैरियाडीह गाँव में उच्च गुणवत्ता की शिक्षा। ज्ञान ही शक्ति है!' 
              : 'Quality education in Bairiyadih village. Knowledge is power!'}
          </p>
        </div>

        {/* Educational Institutions Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
          {lang === 'hi' ? 'शैक्षिक संस्थान' : 'Educational Institutions'}
              </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {schools.map((school, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                  <span className="text-2xl">{school.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${lang === 'hi' ? 'hindi-text' : ''}`}>
                  {school[lang]}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{school[lang === 'hi' ? 'descHi' : 'descEn']}</p>
                <button
                  onClick={() => toggleSection(`school-${index}`)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  {expandedSection === `school-${index}` 
                    ? (lang === 'hi' ? 'कम देखें' : 'Show Less') 
                    : (lang === 'hi' ? 'विस्तार से देखें' : 'View Details')}
                </button>
              </div>
              {expandedSection === `school-${index}` && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="space-y-2 text-sm text-black">
                    {renderDetails(school.details, lang)}
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>

        {/* Teachers Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
          {lang === 'hi' ? 'शिक्षक' : 'Teachers'}
              </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{teacher.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-2 text-lg ${lang === 'hi' ? 'hindi-text' : ''}`}>
                  {teacher[lang]}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{teacher[lang === 'hi' ? 'descHi' : 'descEn']}</p>
                <button
                  onClick={() => toggleSection(`teacher-${index}`)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                  {expandedSection === `teacher-${index}` 
                    ? (lang === 'hi' ? 'कम देखें' : 'Show Less') 
                    : (lang === 'hi' ? 'विस्तार से देखें' : 'View Details')}
                </button>
                    </div>
              {expandedSection === `teacher-${index}` && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="space-y-2 text-sm text-black">
                    {renderDetails(teacher.details, lang)}
                  </div>
                </div>
              )}
                    </div>
          ))}
                  </div>

        {/* Anganwadi Centers Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
          {lang === 'hi' ? 'आंगनबाड़ी केंद्र' : 'Anganwadi Centers'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {anganwadi.map((center, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                  <span className="text-2xl">{center.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 ${lang === 'hi' ? 'hindi-text' : ''}`}>
                  {center[lang]}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{center[lang === 'hi' ? 'descHi' : 'descEn']}</p>
                <button
                  onClick={() => toggleSection(`anganwadi-${index}`)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                >
                  {expandedSection === `anganwadi-${index}` 
                    ? (lang === 'hi' ? 'कम देखें' : 'Show Less') 
                    : (lang === 'hi' ? 'विस्तार से देखें' : 'View Details')}
                </button>
              </div>
              {expandedSection === `anganwadi-${index}` && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="space-y-2 text-sm text-black">
                    {renderDetails(center.details, lang)}
                  </div>
                </div>
              )}
                    </div>
          ))}
                  </div>

        {/* Government Schemes Section */}
        <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
          {lang === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {scholarships.map((scheme, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">{scheme.icon}</span>
                </div>
                <h4 className={`font-semibold text-gray-800 mb-1 text-sm ${lang === 'hi' ? 'hindi-text' : ''}`}>
                  {scheme[lang]}
                </h4>
                <p className="text-xs text-gray-600">
                  {scheme[lang === 'hi' ? 'descHi' : 'descEn']}
                </p>
                    </div>
                  </div>
          ))}
              </div>
            </div>

      <DesignerCardBackground variant="default">
        <div className="text-center mb-8">
          <span className="text-6xl mb-2" role="img" aria-label="education">🎓</span>
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow-lg tracking-tight leading-[1.2] hindi-heading">
            {lang === 'hi' ? 'शिक्षा (वार्ड अनुसार)' : 'Education (Ward-wise)'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            {lang === 'hi'
              ? 'हर वार्ड के लिए शिक्षा से जुड़ी जानकारी।'
              : 'Education details for each ward.'}
          </p>
                    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(22)].slice(0, showAllWards ? 22 : 3).map((_, idx) => {
            const wardNum = idx + 1;
            const data = wardEducationData[wardNum];
            return (
              <div key={wardNum} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500 enhanced-card hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
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
                    <li>🏫 {lang === 'hi' ? `विद्यालय: ${data.school}` : `School: ${data.school}`}</li>
                    <li>👦 {lang === 'hi' ? `छात्र: ${data.students}` : `Students: ${data.students}`}</li>
                    <li>👩‍🏫 {lang === 'hi' ? `शिक्षक: ${data.teachers}` : `Teachers: ${data.teachers}`}</li>
                    <li>🏅 {lang === 'hi' ? `उपलब्धि: ${data.achievement}` : `Achievement: ${data.achievement}`}</li>
                    <li>🎓 {lang === 'hi' ? `छात्रवृत्ति: ${data.scholarship}` : `Scholarship: ${data.scholarship}`}</li>
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
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-full shadow hover:scale-105 transition-all duration-200"
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

export default Education; 