import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const langRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const langOptions = [
    { code: 'hi', label: 'हिन्दी', icon: <span role="img" aria-label="hi">🇮🇳</span> },
    { code: 'en', label: 'English', icon: <span role="img" aria-label="en">🇬🇧</span> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#7bc043] via-[#aee1f9] via-40% via-[#ffe066] to-[#ff914d] border-b-2 border-green-400 shadow-2xl md:rounded-b-3xl md:backdrop-blur-xl md:shadow-lg md:border-b-4 md:border-green-600 md:border-double md:border-t-0 md:pt-4 md:pb-2 md:px-6 md:bg-[url('data:image/svg+xml,%3Csvg width=\'320\' height=\'60\' viewBox=\'0 0 320 60\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cellipse cx=\'160\' cy=\'50\' rx=\'150\' ry=\'10\' fill=\'%23ffe066\' fill-opacity=\'0.12\'/%3E%3Ccircle cx=\'40\' cy=\'20\' r=\'6\' fill=\'%23ff9933\'/%3E%3Ccircle cx=\'280\' cy=\'20\' r=\'6\' fill=\'%23138808\'/%3E%3C/svg%3E')] transition-all duration-300">
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-15 z-0">
        {/* Subtle SVG rural motif: sun, field, sky */}
        <svg width="100%" height="100%" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0">
          <ellipse cx="1200" cy="30" rx="60" ry="20" fill="#ffe066" /> {/* Sun */}
          <ellipse cx="200" cy="110" rx="180" ry="20" fill="#b6e2a1" /> {/* Field */}
          <ellipse cx="800" cy="100" rx="300" ry="30" fill="#aee1f9" /> {/* Sky */}
      </svg>
    </div>
      <div className="relative max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-0 sm:px-2 lg:px-4">
        {/* Left: Hamburger for mobile */}
        <div className="flex md:hidden mr-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation"
            className={`relative inline-flex items-center justify-center rounded-full border-4 shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 bg-white hover:bg-yellow-100 active:scale-95 hover:scale-110 hover:shadow-[0_8px_32px_0_rgba(255,152,0,0.25),0_2px_16px_0_#43a04755] hover:border-orange-400`}
            style={{ width: 40, height: 40, boxShadow: '0 4px 24px 0 #43a04733' }}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            {/* Animated gradient border */}
            <span className="absolute inset-0 rounded-full pointer-events-none z-0"
              style={{
                background: 'conic-gradient(from 0deg, #ff9800, #fff, #43a047, #ff9800)',
                padding: 2,
                WebkitMaskImage: 'radial-gradient(circle, white 90%, transparent 100%)'
              }}
            ></span>
            {/* Animated chakra/rangoli motif */}
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 animate-spin-slow">
              <svg width="32" height="32" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" stroke="#ff9800" strokeWidth="2" fill="none" />
                <circle cx="18" cy="18" r="9" stroke="#43a047" strokeWidth="1.5" fill="none" />
                <circle cx="18" cy="18" r="3" fill="#43a047" />
              </svg>
            </span>
            {/* Triple line hamburger */}
            <svg className="h-5 w-5 text-green-900 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <rect x="4" y="7" width="16" height="2.2" rx="1" fill="currentColor" />
                  <rect x="4" y="11" width="16" height="2.2" rx="1" fill="currentColor" />
                  <rect x="4" y="15" width="16" height="2.2" rx="1" fill="currentColor" />
                </>
              )}
            </svg>
            <style>{`
              .animate-spin-slow {
                animation: spin 3s linear infinite;
              }
              @keyframes spin {
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </button>
        </div>
        {/* Left: Logo and Village Name */}
        <div className="flex items-center space-x-3 flex-shrink-0 md:ml-2">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 rounded-full shadow-2xl flex items-center justify-center border-4 border-orange-500 ring-4 ring-orange-300 md:border-orange-400 md:ring-4 md:ring-offset-2 md:ring-offset-[#ffe066] relative overflow-hidden">
            {/* Enhanced desi rangoli pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'16\' stroke=\'%23ff9933\' stroke-width=\'1.5\' fill=\'none\' opacity=\'0.5\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'10\' stroke=\'%23ff6b35\' stroke-width=\'1\' fill=\'none\' opacity=\'0.4\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'4\' fill=\'%23ff9933\' opacity=\'0.3\'/%3E%3Cpath d=\'M20 4 L20 36 M4 20 L36 20\' stroke=\'%23ff6b35\' stroke-width=\'0.5\' opacity=\'0.3\'/%3E%3Cpath d=\'M20 8 L20 32 M8 20 L32 20\' stroke=\'%23ff9933\' stroke-width=\'0.3\' opacity=\'0.2\'/%3E%3C/svg%3E')] bg-center bg-no-repeat opacity-60"></div>
            {/* Multiple shine effects */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-90 shadow-sm"></div>
            <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-200 rounded-full opacity-70"></div>
            {/* Village house emoji with enhanced styling */}
            <span className="text-2xl md:text-3xl relative z-10 drop-shadow-lg transform hover:scale-110 transition-transform duration-200 animate-pulse" role="img" aria-label="village">🏡</span>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-transparent opacity-20 rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-green-900 leading-tight drop-shadow-sm md:drop-shadow-lg md:tracking-wide md:font-extrabold md:text-orange-800 relative">
              {lang === 'hi' ? 'बैरियाडीह' : 'Bairiyadih'}
              {/* Enhanced underline effect */}
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full opacity-70 shadow-sm"></div>
              {/* Decorative dots */}
              <div className="absolute -bottom-3 left-1 w-1 h-1 bg-orange-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-3 right-1 w-1 h-1 bg-green-400 rounded-full opacity-80"></div>
            </span>
          </div>
        </div>
        {/* Center: Navigation Bar (desktop only) */}
        <div className="hidden md:flex flex-1 mx-4 min-w-0">
          <nav className="flex items-center overflow-x-auto whitespace-nowrap bg-green-100/70 backdrop-blur-2xl rounded-xl px-2 py-1 shadow-md border border-green-300 min-w-0 gap-x-1 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent relative transition-all duration-300 touch-pan-x
            bg-[url('data:image/svg+xml,%3Csvg width=\'120\' height=\'40\' viewBox=\'0 0 120 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cellipse cx=\'60\' cy=\'20\' rx=\'58\' ry=\'16\' fill=\'%23ffe066\' fill-opacity=\'0.18\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'4\' fill=\'%23ff9933\'/%3E%3Ccircle cx=\'100\' cy=\'20\' r=\'4\' fill=\'%23138808\'/%3E%3C/svg%3E')] bg-no-repeat bg-center">
            {/* nav links */}
            {navLinks.map((link) => {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  exact={link.exact}
                  className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                >
                  <div
                    className={`flex items-center space-x-2 px-2 py-1 rounded-full text-sm font-semibold transition-all duration-200
                      hover:text-green-700 active:scale-95`}
                  >
                    <span className="text-xl flex items-center justify-center transition-all duration-200 group-hover:animate-bounce text-black drop-shadow-sm">{link.icon}</span>
                    <span className="leading-tight select-none text-black font-bold text-sm tracking-wide">{link.label[lang]}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>
        {/* Right: Language Buttons (desktop: both, mobile: toggle) */}
        <div className="ml-auto flex-shrink-0 md:mr-6">
          {/* Mobile: single toggle button */}
          <button
            onClick={() => handleLangChange(lang === 'hi' ? 'en' : 'hi')}
            className={`flex items-center gap-2 rounded-lg font-semibold border-2 border-green-600 shadow-md bg-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-green-400 text-black hover:bg-yellow-100 hover:border-orange-400 hover:scale-105
              ${lang === 'en' ? 'px-3 py-1.5 text-xs md:hidden' : 'px-4 py-2 text-sm md:hidden'}`}
            aria-label="Switch language"
          >
            <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>
            <span className="text-black">{lang === 'hi' ? 'हिन्दी' : 'English'}</span>
          </button>
          {/* Desktop: both buttons grouped together (modern pill toggle) */}
          <div className="hidden md:flex bg-white/90 rounded-full border-2 border-green-400 shadow-md gap-0 p-1 items-center">
            <button
              onClick={() => handleLangChange('hi')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-green-400
                ${lang === 'hi' ? 'bg-green-600 text-white shadow-sm scale-105 z-10' : 'bg-transparent text-green-700 hover:bg-green-50'}`}
              aria-label="हिन्दी"
            >
              <span>हिन्दी</span>
            </button>
            <button
              onClick={() => handleLangChange('en')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-green-400
                ${lang === 'en' ? 'bg-green-600 text-white shadow-sm scale-105 z-10' : 'bg-transparent text-green-700 hover:bg-green-50'}`}
              aria-label="English"
            >
              <span>English</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile nav menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-50 border-b border-green-200 shadow-lg">
          <nav className="flex flex-col gap-1 py-2 px-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                exact={link.exact}
                className="flex items-center space-x-2 py-2 px-3 rounded-lg text-lg font-semibold hover:bg-green-100 active:scale-95"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-2xl text-black">{link.icon}</span>
                <span className="text-black">{link.label[lang]}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// Custom NavLink component with active state
function NavLink({ to, exact, children, className, onClick }) {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`${className} ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    // Always scroll to the very top of the page
    window.scrollTo(0, 0);
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
    <Router basename="/myvillage">
      <ScrollToTop />
      <div className="min-h-screen relative">
        <ModernBackground />
        <ModernHeader lang={lang} handleLangChange={handleLangChange} />

        {/* Main Content with top padding for fixed header */}
        <main className="pt-20 lg:pt-24">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
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
          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<Home />} />
        </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
