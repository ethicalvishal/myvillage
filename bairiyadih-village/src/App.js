import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';
import People from './People';
import Education from './Education';
import Health from './Health';
import Agriculture from './Agriculture';
import Panchayat from './Panchayat';
import Transport from './Transport';
import TransportDashboard from './TransportDashboard';
import TransportAdminPanel from './TransportAdminPanel';
import Gallery from './Gallery';
import News from './News';
import Contact from './Contact';
import Optional from './Optional';
import AdminDashboard from './AdminDashboard';
import Footer from './Footer';
import RationCardStatus from './RationCardStatus';
import MandiBhav from './MandiBhav';
import RozgarKendra from './RozgarKendra';
import AudioBulletin from './AudioBulletin';
import BloodDirectory from './BloodDirectory';
import VillagePolls from './VillagePolls';
import GrievanceBox from './GrievanceBox';
import VillageAssistant from './VillageAssistant';
import ScholarshipCenter from './ScholarshipCenter';
import LocalAds from './LocalAds';
import DigitalServicesPanel from './DigitalServicesPanel';
import PremiumPDFSection from './PremiumPDFSection';
import JobBoard from './JobBoard';
import GramVideos from './GramVideos';
import i18n from './i18n';

const navLinks = [
  { to: '/', label: { hi: 'होम', en: 'Home' }, exact: true, icon: '🏠' },
  { to: '/about', label: { hi: 'परिचय', en: 'About' }, icon: 'ℹ️' },
  { to: '/people', label: { hi: 'लोग', en: 'People' }, icon: '👥' },
  { to: '/education', label: { hi: 'शिक्षा', en: 'Education' }, icon: '🎓' },
  { to: '/health', label: { hi: 'स्वास्थ्य', en: 'Health' }, icon: '🏥' },
  { to: '/agriculture', label: { hi: 'कृषि', en: 'Agriculture' }, icon: '🌾' },
  { to: '/panchayat', label: { hi: 'पंचायत', en: 'Panchayat' }, icon: '🏛️' },
  { to: '/transport', label: { hi: 'परिवहन', en: 'Transport' }, icon: '🚌' },
  { to: '/gallery', label: { hi: 'गैलरी', en: 'Gallery' }, icon: '📸' },
  { to: '/gram-videos', label: { hi: 'वीडियो', en: 'Videos' }, icon: '📺' },
  { to: '/news', label: { hi: 'समाचार', en: 'News' }, icon: '📰' },
  { to: '/contact', label: { hi: 'संपर्क', en: 'Contact' }, icon: '📞' },
  { to: '/optional', label: { hi: 'वैकल्पिक', en: 'Optional' }, icon: '⚙️' },
];

// Professional Village Header Component
function ModernHeader({ lang, handleLangChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#7bc043] via-[#aee1f9] via-40% via-[#ffe066] to-[#ff914d] border-b-2 border-green-400 shadow-2xl">
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-15 z-0">
        {/* Subtle SVG rural motif: sun, field, sky */}
        <svg width="100%" height="100%" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0">
          <ellipse cx="1200" cy="30" rx="60" ry="20" fill="#ffe066" /> {/* Sun */}
          <ellipse cx="200" cy="110" rx="180" ry="20" fill="#b6e2a1" /> {/* Field */}
          <ellipse cx="800" cy="100" rx="300" ry="30" fill="#aee1f9" /> {/* Sky */}
      </svg>
    </div>
      <div className="relative max-w-7xl mx-auto flex items-center justify-between h-20 px-2 sm:px-6 lg:px-8">
        {/* Left: Logo and Village Name */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-green-200 ring-2 ring-green-300">
            <span className="text-3xl" role="img" aria-label="village">🏡</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold text-green-900 leading-tight drop-shadow-sm">{lang === 'hi' ? 'बैरियाडीह' : 'Bairiyadih'}</span>
          </div>
        </div>
        {/* Center: Navigation */}
        <div className="relative flex-1 mx-4 min-w-0">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 z-20 rounded-l-2xl" style={{background: 'radial-gradient(circle at left, #fff9 80%, transparent 100%)'}}></div>
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 z-20 rounded-r-2xl" style={{background: 'radial-gradient(circle at right, #fff9 80%, transparent 100%)'}}></div>
          <nav className="flex items-center overflow-x-auto whitespace-nowrap bg-green-100/70 backdrop-blur-2xl rounded-2xl px-2 py-2 shadow-2xl border border-green-300 min-w-0 gap-x-1 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent relative transition-all duration-300 touch-pan-x" style={{boxShadow: '0 8px 32px 0 rgba(60,80,40,0.18), 0 2px 16px 0 #b6e2a1'}}>
            {/* Faint SVG pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-10 z-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cellipse cx=\'16\' cy=\'28\' rx=\'12\' ry=\'4\' fill=\'%23b6e2a1\'/%3E%3Cellipse cx=\'8\' cy=\'24\' rx=\'6\' ry=\'2\' fill=\'%23e7d9c1\'/%3E%3Cellipse cx=\'24\' cy=\'26\' rx=\'8\' ry=\'2\' fill=\'%23d0eaff\'/%3E%3C/svg%3E")', backgroundSize: '32px 32px'}}></div>
            {navLinks.map((link) => {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  exact={link.exact}
                  className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                >
                  <div
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-base font-semibold transition-all duration-200
                      hover:text-green-700 active:scale-95`}
                  >
                    <span className="text-2xl flex items-center justify-center transition-all duration-200 group-hover:animate-bounce text-black">{link.icon}</span>
                    <span className="leading-tight select-none text-black">{link.label[lang]}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>
        {/* Right: Language Switcher */}
        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
          <button
            onClick={() => handleLangChange('hi')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border-2 border-green-600 shadow-md focus-visible:ring-2 focus-visible:ring-green-400
              ${lang === 'hi' ? 'bg-green-600 text-white' : 'bg-transparent text-green-700 hover:bg-green-600 hover:text-white'}`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => handleLangChange('en')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border-2 border-green-600 shadow-md focus-visible:ring-2 focus-visible:ring-green-400
              ${lang === 'en' ? 'bg-green-600 text-white' : 'bg-transparent text-green-700 hover:bg-green-600 hover:text-white'}`}
          >
            English
          </button>
        </div>
      </div>
    </header>
  );
}

// Custom NavLink component with active state
function NavLink({ to, exact, children, className }) {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
  
  return (
    <Link
      to={to}
      className={`${className} ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
}

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

// Modern Background Component
function ModernBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Enhanced village-inspired gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6f4ea] via-[#d0eaff] via-30% via-[#ffe066] via-60% to-[#fffbe6]" />
      {/* Faint grid pattern for depth */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #b6e2a1 1px, transparent 0)', backgroundSize: '48px 48px'}}></div>
      {/* Animated SVG rural motif: sun, field, sky */}
      <svg width="100%" height="100%" viewBox="0 0 1440 720" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-full opacity-20 select-none pointer-events-none">
        {/* Animated sun (rising/setting) */}
        <ellipse cx="1200" cy="120" rx="140" ry="48" fill="#ffe066" className="animate-sun" />
        {/* Animated field waves */}
        <ellipse cx="300" cy="700" rx="420" ry="70" fill="#b6e2a1" className="animate-field" />
        <ellipse cx="900" cy="650" rx="650" ry="90" fill="#aee1f9" /> {/* Sky (bigger) */}
      </svg>
      {/* Animated clouds layer */}
      <svg className="absolute top-20 left-0 w-full h-32 opacity-30 animate-clouds pointer-events-none select-none" viewBox="0 0 1440 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="64" rx="80" ry="24" fill="#fff" />
        <ellipse cx="400" cy="48" rx="60" ry="18" fill="#fff" />
        <ellipse cx="700" cy="80" rx="100" ry="28" fill="#fff" />
        <ellipse cx="1100" cy="60" rx="90" ry="22" fill="#fff" />
      </svg>
      <style>{`
        @keyframes clouds {
          0% { transform: translateX(0); }
          100% { transform: translateX(120px); }
        }
        .animate-clouds { animation: clouds 40s linear infinite alternate; }
        @keyframes sunUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(30px); }
        }
        .animate-sun { animation: sunUpDown 18s ease-in-out infinite alternate; }
        @keyframes fieldWave {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(-4deg); }
        }
        .animate-field { animation: fieldWave 12s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('hi');

  const handleLangChange = (lng) => {
    setLang(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen relative">
        <ModernBackground />
        <ModernHeader lang={lang} handleLangChange={handleLangChange} />
        
        {/* Main Content with top padding for fixed header */}
        <main className="pt-20 lg:pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bairiyadih-village" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/people" element={<People />} />
          <Route path="/education" element={<Education />} />
          <Route path="/health" element={<Health />} />
          <Route path="/agriculture" element={<Agriculture />} />
          <Route path="/panchayat" element={<Panchayat />} />
          <Route path="/transport" element={<Transport />} />
            <Route path="/transport-dashboard" element={<TransportDashboard />} />
            <Route path="/transport-admin" element={<TransportAdminPanel />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/optional" element={<Optional />} />
          <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/ration-card-status" element={<RationCardStatus />} />
            <Route path="/mandi-bhav" element={<MandiBhav />} />
            <Route path="/rozgar-kendra" element={<RozgarKendra />} />
            <Route path="/audio-bulletin" element={<AudioBulletin />} />
            <Route path="/blood-directory" element={<BloodDirectory />} />
            <Route path="/village-polls" element={<VillagePolls />} />
            <Route path="/grievance-box" element={<GrievanceBox />} />
            <Route path="/village-assistant" element={<VillageAssistant />} />
            <Route path="/scholarship-center" element={<ScholarshipCenter />} />
            <Route path="/local-ads" element={<LocalAds />} />
            <Route path="/digital-services" element={<DigitalServicesPanel />} />
            <Route path="/premium-pdfs" element={<PremiumPDFSection />} />
            <Route path="/job-board" element={<JobBoard />} />
            <Route path="/gram-videos" element={<GramVideos />} />
        </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
