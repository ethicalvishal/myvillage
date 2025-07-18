import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';
import ConfirmDialog from './ConfirmDialog';
import DesignerCardBackground from './DesignerCardBackground';

// Traditional Indian Border Component
const DesiBorder = ({ children, variant = 'default' }) => {
  const borderStyles = {
    default: 'border-4 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50',
    success: 'border-4 border-green-600 bg-gradient-to-br from-green-50 to-emerald-50',
    warning: 'border-4 border-red-500 bg-gradient-to-br from-red-50 to-pink-50',
    info: 'border-4 border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50'
  };
  
  return (
    <div className={`${borderStyles[variant]} rounded-2xl shadow-xl relative overflow-hidden`}>
      {/* Traditional corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-orange-500 rounded-br-full"></div>
      <div className="absolute top-0 right-0 w-8 h-8 bg-orange-500 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-orange-500 rounded-tr-full"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-tl-full"></div>
      
      {/* Inner content with padding to avoid corner decorations */}
      <div className="p-6 relative z-10">
        {children}
      </div>
    </div>
  );
};

// Traditional Indian Sidebar Icon Component
const DesiSidebarIcon = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
      active 
        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105' 
        : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-700'
    }`}
  >
    {/* Traditional pattern overlay */}
    <div className={`absolute inset-0 opacity-10 ${active ? 'bg-white' : 'bg-orange-200'}`}></div>
    
    <span className="text-2xl relative z-10">{icon}</span>
    <span className="font-bold relative z-10">{label}</span>
    
    {/* Active indicator */}
    {active && (
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
      </div>
    )}
  </button>
);

// Traditional Indian Header Component
const DesiHeader = ({ title, subtitle, icon }) => (
  <div className="text-center mb-8 relative">
    {/* Background decorative elements */}
    <div className="absolute inset-0 flex items-center justify-center opacity-5">
      <span className="text-8xl">🕉️</span>
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="text-5xl animate-pulse">{icon}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      
      {/* Traditional divider */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-1 w-16 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
        <span className="text-2xl">🌺</span>
        <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
      </div>
      
      <p className="text-xl text-gray-700 font-medium">{subtitle}</p>
    </div>
  </div>
);

// Traditional Indian Card Component
const DesiCard = ({ children, title, icon, variant = 'default' }) => {
  const cardStyles = {
    default: 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300',
    success: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400',
    warning: 'bg-gradient-to-br from-red-50 to-pink-50 border-red-400',
    info: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400'
  };
  
  return (
    <div className={`${cardStyles[variant]} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

function AdminDashboard() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();
  
  // Auth state (simple password-based for now)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // UI state
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Data state
  const [news, setNews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [events, setEvents] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [pendingAds, setPendingAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(false);
  const [actionMsg, setActionMsg] = useState('');
  const [pendingServices, setPendingServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [serviceMsg, setServiceMsg] = useState('');
  const [pendingPDFPurchases, setPendingPDFPurchases] = useState([]);
  const [loadingPDFPurchases, setLoadingPDFPurchases] = useState(false);
  const [pdfPurchaseMsg, setPDFPurchaseMsg] = useState('');
  const [pdfsMap, setPDFsMap] = useState({});
  
  // Form states
  const [showForm, setShowForm] = useState('');
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  
  // Dialog states
  const [showConfirm, setShowConfirm] = useState(false);

  // Modern responsive sidebar modules
  const modules = [
    { id: 'dashboard', icon: '🏛️', label: lang === 'hi' ? 'प्रशासन केंद्र' : 'Admin Center' },
    { id: 'news', icon: '📰', label: lang === 'hi' ? 'समाचार प्रबंधन' : 'News Management' },
    { id: 'gallery', icon: '🖼️', label: lang === 'hi' ? 'तस्वीर प्रबंधन' : 'Gallery Management' },
    { id: 'schemes', icon: '📚', label: lang === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes' },
    { id: 'events', icon: '📅', label: lang === 'hi' ? 'कार्यक्रम प्रबंधन' : 'Event Management' },
    { id: 'profiles', icon: '👥', label: lang === 'hi' ? 'लोगों का प्रोफाइल' : 'People Profiles' },
    { id: 'feedback', icon: '📩', label: lang === 'hi' ? 'जनता की राय' : 'Public Feedback' },
    { id: 'videos', icon: '🎥', label: lang === 'hi' ? 'वीडियो प्रबंधन' : 'Video Management' },
    { id: 'live', icon: '🔴', label: lang === 'hi' ? 'लाइव सेशन' : 'Live Sessions' },
    { id: 'users', icon: '🧑‍💼', label: lang === 'hi' ? 'यूज़र प्रबंधन' : 'User Management' },
    { id: 'analytics', icon: '📊', label: lang === 'hi' ? 'एनालिटिक्स' : 'Analytics' },
    { id: 'settings', icon: '⚙️', label: lang === 'hi' ? 'सिस्टम सेटिंग्स' : 'System Settings' }
  ];

  // Move loadModuleData definition above all useEffect calls
  const loadModuleData = useCallback(async () => {
    try {
      switch (activeModule) {
        case 'news':
          const newsQuery = query(collection(db, 'news'), orderBy('timestamp', 'desc'));
          const newsSnapshot = await getDocs(newsQuery);
          setNews(newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          break;
        case 'gallery':
          const galleryQuery = query(collection(db, 'gallery'), orderBy('timestamp', 'desc'));
          const gallerySnapshot = await getDocs(galleryQuery);
          setGallery(gallerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          break;
        case 'schemes':
          const schemesQuery = query(collection(db, 'schemes'), orderBy('timestamp', 'desc'));
          const schemesSnapshot = await getDocs(schemesQuery);
          setSchemes(schemesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          break;
        case 'events':
          const eventsQuery = query(collection(db, 'events'), orderBy('date', 'desc'));
          const eventsSnapshot = await getDocs(eventsQuery);
          setEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          break;
        case 'profiles':
          const profilesQuery = query(collection(db, 'profiles'), orderBy('timestamp', 'desc'));
          const profilesSnapshot = await getDocs(profilesQuery);
          setProfiles(profilesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          break;
        case 'feedback':
          const feedbackQuery = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
          const feedbackSnapshot = await getDocs(feedbackQuery);
          setFeedback(feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          break;
        default:
          // No action needed for unknown module
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, [activeModule]);

  useEffect(() => {
    if (isAuthenticated) {
      loadModuleData();
    }
  }, [isAuthenticated, loadModuleData]);

  useEffect(() => {
    async function fetchPendingAds() {
      setLoadingAds(true);
      const q = query(collection(db, 'local_ads'), where('status', '==', 'pending'));
      const snap = await getDocs(q);
      setPendingAds(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingAds(false);
    }
    fetchPendingAds();
  }, []);

  useEffect(() => {
    async function fetchPendingServices() {
      setLoadingServices(true);
      const q = query(collection(db, 'service_requests'), where('status', '==', 'pending'));
      const snap = await getDocs(q);
      setPendingServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingServices(false);
    }
    fetchPendingServices();
  }, []);

  useEffect(() => {
    async function fetchPendingPDFPurchases() {
      setLoadingPDFPurchases(true);
      const snap = await getDocs(query(collection(db, 'pdf_purchases'), where('status', '==', 'pending')));
      setPendingPDFPurchases(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingPDFPurchases(false);
    }
    async function fetchPDFsMap() {
      const snap = await getDocs(collection(db, 'premium_pdfs'));
      const map = {};
      snap.docs.forEach(doc => { map[doc.id] = doc.data(); });
      setPDFsMap(map);
    }
    fetchPendingPDFPurchases();
    fetchPDFsMap();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setAdminPassword('');
    } else {
      alert(lang === 'hi' ? 'गलत पासवर्ड' : 'Wrong password');
    }
  };

  const handleAdAction = async (adId, action) => {
    setActionMsg('');
    try {
      await updateDoc(doc(db, 'local_ads', adId), { status: action });
      setPendingAds(pendingAds.filter(ad => ad.id !== adId));
      setActionMsg(i18n.language === 'hi'
        ? (action === 'approved' ? 'विज्ञापन स्वीकृत!' : 'विज्ञापन अस्वीकृत!')
        : (action === 'approved' ? 'Ad approved!' : 'Ad rejected!'));
    } catch (err) {
      setActionMsg(i18n.language === 'hi' ? 'कुछ गलत हो गया।' : 'Something went wrong.');
    }
  };

  const handleServiceAction = async (reqId, action) => {
    setServiceMsg('');
    let response = '';
    if (window && (action === 'approved' || action === 'rejected')) {
      response = window.prompt(
        i18n.language === 'hi'
          ? (action === 'approved' ? 'एडमिन उत्तर (वैकल्पिक): सेवा स्वीकृति के लिए संदेश लिखें' : 'एडमिन उत्तर (वैकल्पिक): अस्वीकृति का कारण लिखें')
          : (action === 'approved' ? 'Admin Response (optional): Message for approval' : 'Admin Response (optional): Reason for rejection'),
        ''
      ) || '';
    }
    try {
      await updateDoc(doc(db, 'service_requests', reqId), { status: action, adminResponse: response });
      setPendingServices(pendingServices.filter(req => req.id !== reqId));
      setServiceMsg(i18n.language === 'hi'
        ? (action === 'approved' ? 'सेवा अनुरोध स्वीकृत!' : 'सेवा अनुरोध अस्वीकृत!')
        : (action === 'approved' ? 'Service request approved!' : 'Service request rejected!'));
    } catch (err) {
      setServiceMsg(i18n.language === 'hi' ? 'कुछ गलत हो गया।' : 'Something went wrong.');
    }
  };

  const handlePDFPurchaseAction = async (purchaseId, action) => {
    setPDFPurchaseMsg('');
    let response = '';
    if (window && (action === 'approved' || action === 'rejected')) {
      response = window.prompt(
        i18n.language === 'hi'
          ? (action === 'approved' ? 'एडमिन उत्तर (वैकल्पिक): स्वीकृति के लिए संदेश लिखें' : 'एडमिन उत्तर (वैकल्पिक): अस्वीकृति का कारण लिखें')
          : (action === 'approved' ? 'Admin Response (optional): Message for approval' : 'Admin Response (optional): Reason for rejection'),
        ''
      ) || '';
    }
    try {
      await updateDoc(doc(db, 'pdf_purchases', purchaseId), { status: action, adminResponse: response });
      setPendingPDFPurchases(pendingPDFPurchases.filter(p => p.id !== purchaseId));
      setPDFPurchaseMsg(i18n.language === 'hi'
        ? (action === 'approved' ? 'खरीद स्वीकृत!' : 'खरीद अस्वीकृत!')
        : (action === 'approved' ? 'Purchase approved!' : 'Purchase rejected!'));
    } catch (err) {
      setPDFPurchaseMsg(i18n.language === 'hi' ? 'कुछ गलत हो गया।' : 'Something went wrong.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <AdminLogin onLogin={() => setIsAuthenticated(true)} adminPassword={adminPassword} setAdminPassword={setAdminPassword} lang={lang} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none z-0">
        {/* SVG pattern or festive emoji here */}
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="#fde68a" />
          <circle cx="100" cy="100" r="60" fill="#fca5a5" opacity="0.3" />
          <circle cx="100" cy="100" r="40" fill="#bbf7d0" opacity="0.2" />
        </svg>
        <div className="absolute bottom-4 right-4 text-6xl opacity-20">🪔</div>
      </div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gradient-to-b from-orange-200/80 via-yellow-100/80 to-green-100/80 border-r-4 border-orange-400 shadow-2xl min-h-screen flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0 overflow-y-auto max-h-screen`}>
          <div className="flex items-center justify-center py-6 border-b-2 border-orange-300">
            <span className="text-4xl">🪔</span>
            <span className="ml-2 font-extrabold text-orange-700 text-xl">ग्राम प्रशासन</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {modules.map(mod => (
              <button
                key={mod.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200
                  ${activeModule === mod.id ? 'bg-gradient-to-r from-orange-400 to-yellow-300 text-white shadow-lg scale-105' : 'hover:bg-orange-100 text-orange-800'}`}
                onClick={() => { setActiveModule(mod.id); setSidebarOpen(false); }}
              >
                <span className="text-2xl">{mod.icon}</span>
                <span>{mod.label}</span>
                {activeModule === mod.id && <span className="ml-auto text-lg animate-bounce">🌸</span>}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t-2 border-orange-300 text-center text-orange-600 text-xs">
            सेवा परमो धर्मः <span className="text-lg">🕉️</span>
          </div>
        </aside>
        {/* Overlay for mobile */}
        {sidebarOpen && <div className="fixed inset-0 bg-black opacity-30 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex items-center justify-between bg-gradient-to-r from-orange-100/80 via-yellow-50/80 to-green-100/80 shadow-lg px-4 py-2 w-full border-b-4 border-orange-400">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="md:hidden ml-0 rounded-full bg-gradient-to-br from-orange-200 via-yellow-100 to-green-100 border-2 border-orange-400 shadow-lg p-2 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl relative"
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none text-3xl">🪔</span>
              <span className="relative z-10 flex flex-col gap-1">
                <span className="block w-7 h-1 bg-orange-500 rounded-full"></span>
                <span className="block w-7 h-1 bg-orange-500 rounded-full"></span>
                <span className="block w-7 h-1 bg-orange-500 rounded-full"></span>
              </span>
            </button>
            <span className="font-extrabold text-2xl text-orange-700 flex items-center gap-2">
              <span className="text-3xl">🏛️</span>
              Admin Dashboard
              <span className="text-2xl animate-bounce">🌺</span>
            </span>
            <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded shadow hover:from-red-600 hover:to-orange-600 transition font-bold">
              Logout
            </button>
          </header>
          <main className="flex-1 overflow-y-auto p-4">
            {activeModule === 'dashboard' && <DashboardOverview lang={lang} setShowForm={setShowForm} showForm={showForm} setActiveModule={setActiveModule} />}
            {activeModule === 'news' && <NewsManager news={news} onRefresh={loadModuleData} lang={lang} setShowForm={setShowForm} showForm={showForm} formData={formData} setFormData={setFormData} />}
            {activeModule === 'gallery' && <GalleryManager gallery={gallery} onRefresh={loadModuleData} lang={lang} setShowForm={setShowForm} showForm={showForm} formData={formData} setFormData={setFormData} uploading={uploading} setUploading={setUploading} />}
            {activeModule === 'schemes' && <SchemesManager schemes={schemes} onRefresh={loadModuleData} lang={lang} setShowForm={setShowForm} showForm={showForm} formData={formData} setFormData={setFormData} uploading={uploading} setUploading={setUploading} />}
            {activeModule === 'events' && <EventsManager events={events} onRefresh={loadModuleData} lang={lang} setShowForm={setShowForm} showForm={showForm} formData={formData} setFormData={setFormData} />}
            {activeModule === 'profiles' && <ProfilesManager profiles={profiles} onRefresh={loadModuleData} lang={lang} setShowForm={setShowForm} showForm={showForm} formData={formData} setFormData={setFormData} uploading={uploading} setUploading={setUploading} />}
            {activeModule === 'feedback' && <FeedbackManager feedback={feedback} onRefresh={loadModuleData} lang={lang} />}
            {/* Placeholders for new modules */}
            {activeModule === 'videos' && <div>Video Management (Coming Soon)</div>}
            {activeModule === 'live' && <div>Live Session Management (Coming Soon)</div>}
            {activeModule === 'users' && <div>User Management (Coming Soon)</div>}
            {activeModule === 'analytics' && <div>Analytics/Quick Stats (Coming Soon)</div>}
            {activeModule === 'settings' && <SettingsManager lang={lang} />}
          </main>
        </div>
      </div>
    </div>
  );
}

// Admin Login Component with Desi Styling
function AdminLogin({ onLogin, adminPassword, setAdminPassword, lang }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Traditional background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 font-semibold"
        >
          <span role="img" aria-label="back">⬅️</span>
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Traditional Indian Login Card */}
        <DesiBorder variant="default">
          {/* Traditional Header */}
          <DesiHeader 
            title={lang === 'hi' ? 'प्रशासक लॉगिन' : 'Admin Login'}
            subtitle={lang === 'hi' ? 'ग्राम प्रशासन केंद्र में प्रवेश' : 'Enter Village Administration Center'}
            icon="🔐"
          />

          {/* Login Form */}
          <form onSubmit={onLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">
                {lang === 'hi' ? 'प्रशासक पासवर्ड' : 'Admin Password'}
              </label>
              <div className="relative">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder={lang === 'hi' ? 'पासवर्ड दर्ज करें' : 'Enter password'}
                  className="w-full p-4 border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-black font-medium bg-white/80 backdrop-blur-sm"
                  required
              />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-2xl">🔒</span>
            </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <span role="img" aria-label="login">🚪</span>
                {lang === 'hi' ? 'प्रवेश करें' : 'Enter'}
              </span>
            </button>
          </form>

          {/* Traditional Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
              <span className="text-2xl">🕉️</span>
              <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
        </div>
            <p className="text-sm text-gray-600 font-medium">
              {lang === 'hi' ? 'सेवा परमो धर्मः' : 'Service is Supreme Duty'}
            </p>
          </div>
        </DesiBorder>
      </div>
    </div>
  );
}

// Dashboard Overview Component
function DashboardOverview({ lang, setShowForm, showForm, setActiveModule }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {lang === 'hi' ? 'स्वागत है!' : 'Welcome!'}
        </h2>
        <p className="text-gray-600">
          {lang === 'hi' ? 'बैरियाडीह गाँव पोर्टल का प्रबंधन करें' : 'Manage Bairiyadih Village Portal'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📰</span>
            <div>
              <h3 className="font-semibold text-gray-800">
                {lang === 'hi' ? 'समाचार' : 'News'}
              </h3>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🖼️</span>
            <div>
              <h3 className="font-semibold text-gray-800">
                {lang === 'hi' ? 'गैलरी' : 'Gallery'}
              </h3>
              <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <div>
              <h3 className="font-semibold text-gray-800">
                {lang === 'hi' ? 'कार्यक्रम' : 'Events'}
              </h3>
              <p className="text-2xl font-bold text-purple-600">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📩</span>
            <div>
              <h3 className="font-semibold text-gray-800">
                {lang === 'hi' ? 'फीडबैक' : 'Feedback'}
              </h3>
              <p className="text-2xl font-bold text-orange-600">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur shadow-xl rounded-xl border border-yellow-200 p-8 max-w-3xl mx-auto mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          {lang === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => { setActiveModule('news'); setShowForm('news'); }}
            className="relative group p-6 bg-gradient-to-br from-green-100/80 to-yellow-100/80 border border-green-200 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <span className="text-3xl mb-2 block">📰</span>
            <h4 className="font-semibold text-gray-800 text-lg">
              {lang === 'hi' ? 'नया समाचार जोड़ें' : 'Add News'}
            </h4>
            <span className="absolute left-1/2 top-1/2 w-0 h-0 bg-green-200 opacity-0 group-active:opacity-40 group-active:w-32 group-active:h-32 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"></span>
          </button>
          <button
            onClick={() => { setActiveModule('gallery'); setShowForm('gallery'); }}
            className="relative group p-6 bg-gradient-to-br from-blue-100/80 to-cyan-100/80 border border-blue-200 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="text-3xl mb-2 block">🖼️</span>
            <h4 className="font-semibold text-gray-800 text-lg">
              {lang === 'hi' ? 'फोटो अपलोड करें' : 'Upload Photo'}
            </h4>
            <span className="absolute left-1/2 top-1/2 w-0 h-0 bg-blue-200 opacity-0 group-active:opacity-40 group-active:w-32 group-active:h-32 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"></span>
          </button>
          <button
            onClick={() => { setActiveModule('events'); setShowForm('events'); }}
            className="relative group p-6 bg-gradient-to-br from-orange-100/80 to-yellow-100/80 border border-orange-200 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <span className="text-3xl mb-2 block">📅</span>
            <h4 className="font-semibold text-gray-800 text-lg">
              {lang === 'hi' ? 'कार्यक्रम जोड़ें' : 'Add Event'}
            </h4>
            <span className="absolute left-1/2 top-1/2 w-0 h-0 bg-orange-200 opacity-0 group-active:opacity-40 group-active:w-32 group-active:h-32 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

// News Manager Component
function NewsManager({ news, onRefresh, lang, setShowForm, showForm, formData, setFormData }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'news'), {
        title,
        content,
        status,
        timestamp: serverTimestamp(),
        language: lang
      });
      setTitle('');
      setContent('');
      setStatus('active');
      setShowForm('');
      onRefresh();
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'news', id));
      onRefresh();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'hi' ? 'समाचार प्रबंधन' : 'News Management'}
        </h2>
        <button 
          onClick={() => setShowForm(showForm === 'news' ? '' : 'news')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {showForm === 'news' ? (lang === 'hi' ? 'बंद करें' : 'Close') : (lang === 'hi' ? 'नया समाचार' : 'Add News')}
        </button>
      </div>

      {showForm === 'news' && (
        <div className="bg-white/80 backdrop-blur shadow-xl rounded-xl border border-gray-200 p-8 max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">��</span>
            <h3 className="text-lg font-semibold text-gray-800">
            {lang === 'hi' ? 'नया समाचार जोड़ें' : 'Add News'}
          </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'शीर्षक' : 'Title'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'शीर्षक दर्ज करें' : 'Enter title'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'विवरण' : 'Description'} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-32 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'विवरण दर्ज करें' : 'Enter description'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'स्थिति' : 'Status'}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 shadow-sm"
              >
                <option value="active">{lang === 'hi' ? 'सक्रिय' : 'Active'}</option>
                <option value="inactive">{lang === 'hi' ? 'निष्क्रिय' : 'Inactive'}</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white py-3 px-6 rounded-lg shadow-md hover:from-green-600 hover:to-yellow-500 font-bold text-lg tracking-wide transition-all duration-200"
            >
              {lang === 'hi' ? 'जोड़ें' : 'Add'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {lang === 'hi' ? 'मौजूदा समाचार' : 'Existing News'}
        </h3>
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 mt-1">{item.content}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>{item.timestamp?.toDate?.()?.toLocaleDateString() || 'N/A'}</span>
                    <span className={`px-2 py-1 rounded ${
                      item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'active' ? (lang === 'hi' ? 'सक्रिय' : 'Active') : (lang === 'hi' ? 'निष्क्रिय' : 'Inactive')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  {lang === 'hi' ? 'हटाएं' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
          {news.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              {lang === 'hi' ? 'कोई समाचार नहीं मिला' : 'No news found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Gallery Manager Component
function GalleryManager({ gallery, onRefresh, lang, setShowForm, showForm, formData, setFormData, uploading, setUploading }) {
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'gallery'), {
        caption,
        category,
        imageUrl: downloadURL,
        timestamp: serverTimestamp(),
        language: lang
      });

      setCaption('');
      setCategory('');
      setImageFile(null);
      setShowForm('');
      onRefresh();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'gallery', id));
      
      // Delete from Storage
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      
      onRefresh();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'hi' ? 'गैलरी प्रबंधन' : 'Gallery Management'}
        </h2>
        <button 
          onClick={() => setShowForm(showForm === 'gallery' ? '' : 'gallery')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm === 'gallery' ? (lang === 'hi' ? 'बंद करें' : 'Close') : (lang === 'hi' ? 'फोटो अपलोड' : 'Upload Photo')}
        </button>
      </div>

      {showForm === 'gallery' && (
        <div className="bg-white/80 backdrop-blur shadow-xl rounded-xl border border-gray-200 p-8 max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🖼️</span>
            <h3 className="text-lg font-semibold text-gray-800">
            {lang === 'hi' ? 'फोटो अपलोड करें' : 'Upload Photo'}
          </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'फोटो चुनें' : 'Select Photo'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'कैप्शन' : 'Caption'}
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'श्रेणी' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">{lang === 'hi' ? 'श्रेणी चुनें' : 'Select Category'}</option>
                <option value="village">{lang === 'hi' ? 'गाँव' : 'Village'}</option>
                <option value="events">{lang === 'hi' ? 'कार्यक्रम' : 'Events'}</option>
                <option value="people">{lang === 'hi' ? 'लोग' : 'People'}</option>
                <option value="nature">{lang === 'hi' ? 'प्रकृति' : 'Nature'}</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 px-6 rounded-lg shadow-md hover:from-blue-600 hover:to-cyan-500 font-bold text-lg tracking-wide transition-all duration-200"
            >
              {uploading ? (lang === 'hi' ? 'अपलोड हो रहा है...' : 'Uploading...') : (lang === 'hi' ? 'अपलोड करें' : 'Upload')}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {lang === 'hi' ? 'गैलरी फोटो' : 'Gallery Photos'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.caption}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">{item.caption}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                <button
                  onClick={() => handleDelete(item.id, item.imageUrl)}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  {lang === 'hi' ? 'हटाएं' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
          {gallery.length === 0 && (
            <p className="text-gray-500 text-center py-8 col-span-full">
              {lang === 'hi' ? 'कोई फोटो नहीं मिला' : 'No photos found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Schemes Manager Component
function SchemesManager({ schemes, onRefresh, lang, setShowForm, showForm, formData, setFormData, uploading, setUploading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'schemes'), {
        title,
        description,
        status,
        timestamp: serverTimestamp(),
        language: lang
      });
      setTitle('');
      setDescription('');
      setStatus('active');
      setShowForm('');
      onRefresh();
    } catch (error) {
      console.error('Error adding scheme:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'hi' ? 'योजनाएं प्रबंधन' : 'Schemes Management'}
        </h2>
        <button 
          onClick={() => setShowForm(showForm === 'schemes' ? '' : 'schemes')}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          {showForm === 'schemes' ? (lang === 'hi' ? 'बंद करें' : 'Close') : (lang === 'hi' ? 'योजना जोड़ें' : 'Add Scheme')}
        </button>
      </div>
      {showForm === 'schemes' && (
        <div className="bg-white/80 backdrop-blur shadow-xl rounded-xl border border-gray-200 p-8 max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📚</span>
            <h3 className="text-lg font-semibold text-gray-800">
          {lang === 'hi' ? 'योजना जोड़ें' : 'Add Scheme'}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'शीर्षक' : 'Title'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'शीर्षक दर्ज करें' : 'Enter title'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'विवरण' : 'Description'} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-32 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'विवरण दर्ज करें' : 'Enter description'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'स्थिति' : 'Status'}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 shadow-sm"
              >
                <option value="active">{lang === 'hi' ? 'सक्रिय' : 'Active'}</option>
                <option value="inactive">{lang === 'hi' ? 'निष्क्रिय' : 'Inactive'}</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-400 text-white py-3 px-6 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-500 font-bold text-lg tracking-wide transition-all duration-200"
            >
              {lang === 'hi' ? 'जोड़ें' : 'Add'}
        </button>
          </form>
      </div>
      )}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {lang === 'hi' ? 'मौजूदा योजनाएं' : 'Existing Schemes'}
        </h3>
        <div className="space-y-4">
          {schemes.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>{item.timestamp?.toDate?.()?.toLocaleDateString() || 'N/A'}</span>
                    <span className={`px-2 py-1 rounded ${
                      item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'active' ? (lang === 'hi' ? 'सक्रिय' : 'Active') : (lang === 'hi' ? 'निष्क्रिय' : 'Inactive')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {schemes.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              {lang === 'hi' ? 'कोई योजना नहीं मिली' : 'No schemes found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function EventsManager({ events, onRefresh, lang, setShowForm, showForm, formData, setFormData }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'events'), {
        name,
        date,
        description,
        timestamp: serverTimestamp(),
        language: lang
      });
      setName('');
      setDate('');
      setDescription('');
      setShowForm('');
      onRefresh();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'hi' ? 'कार्यक्रम प्रबंधन' : 'Events Management'}
        </h2>
        <button 
          onClick={() => setShowForm(showForm === 'events' ? '' : 'events')}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          {showForm === 'events' ? (lang === 'hi' ? 'बंद करें' : 'Close') : (lang === 'hi' ? 'कार्यक्रम जोड़ें' : 'Add Event')}
        </button>
      </div>
      {showForm === 'events' && (
        <div className="bg-white/80 backdrop-blur shadow-xl rounded-xl border border-gray-200 p-8 max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📅</span>
            <h3 className="text-lg font-semibold text-gray-800">
          {lang === 'hi' ? 'कार्यक्रम जोड़ें' : 'Add Event'}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'नाम' : 'Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'नाम दर्ज करें' : 'Enter name'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'तारीख' : 'Date'} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'तारीख दर्ज करें' : 'Enter date'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'विवरण' : 'Description'} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-32 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'विवरण दर्ज करें' : 'Enter description'}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-3 px-6 rounded-lg shadow-md hover:from-orange-600 hover:to-yellow-500 font-bold text-lg tracking-wide transition-all duration-200"
            >
              {lang === 'hi' ? 'जोड़ें' : 'Add'}
        </button>
          </form>
      </div>
      )}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {lang === 'hi' ? 'मौजूदा कार्यक्रम' : 'Existing Events'}
        </h3>
        <div className="space-y-4">
          {events.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>{item.date || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              {lang === 'hi' ? 'कोई कार्यक्रम नहीं मिला' : 'No events found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfilesManager({ profiles, onRefresh, lang, setShowForm, showForm, formData, setFormData, uploading, setUploading }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let photoUrl = '';
      if (photoFile) {
        const storageRef = ref(storage, `profiles/${Date.now()}_${photoFile.name}`);
        const snapshot = await uploadBytes(storageRef, photoFile);
        photoUrl = await getDownloadURL(snapshot.ref);
      }
      await addDoc(collection(db, 'profiles'), {
        name,
        role,
        bio,
        photoUrl,
        timestamp: serverTimestamp(),
        language: lang
      });
      setName('');
      setRole('');
      setBio('');
      setPhotoFile(null);
      setShowForm('');
      onRefresh();
    } catch (error) {
      console.error('Error adding profile:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'hi' ? 'प्रोफाइल प्रबंधन' : 'Profiles Management'}
        </h2>
        <button 
          onClick={() => setShowForm(showForm === 'profiles' ? '' : 'profiles')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {showForm === 'profiles' ? (lang === 'hi' ? 'बंद करें' : 'Close') : (lang === 'hi' ? 'प्रोफाइल जोड़ें' : 'Add Profile')}
        </button>
      </div>
      {showForm === 'profiles' && (
        <div className="bg-white/80 backdrop-blur shadow-xl rounded-xl border border-gray-200 p-8 max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">👥</span>
            <h3 className="text-lg font-semibold text-gray-800">
          {lang === 'hi' ? 'प्रोफाइल जोड़ें' : 'Add Profile'}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'नाम' : 'Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'नाम दर्ज करें' : 'Enter name'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'भूमिका' : 'Role'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'भूमिका दर्ज करें' : 'Enter role'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'फोटो' : 'Photo'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'बायो' : 'Bio'}
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-24 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 shadow-sm"
                required
                placeholder={lang === 'hi' ? 'बायो दर्ज करें' : 'Enter bio'}
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-400 text-white py-3 px-6 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-500 font-bold text-lg tracking-wide transition-all duration-200"
            >
              {uploading ? (lang === 'hi' ? 'अपलोड हो रहा है...' : 'Uploading...') : (lang === 'hi' ? 'जोड़ें' : 'Add')}
        </button>
          </form>
      </div>
      )}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {lang === 'hi' ? 'मौजूदा प्रोफाइल' : 'Existing Profiles'}
        </h3>
        <div className="space-y-4">
          {profiles.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex gap-4 items-center">
              {item.photoUrl && (
                <img src={item.photoUrl} alt={item.name} className="w-16 h-16 rounded-full object-cover border" />
              )}
              <div>
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-gray-600 mt-1">{item.role}</p>
                <p className="text-gray-700 mt-2">{item.bio}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>{item.timestamp?.toDate?.()?.toLocaleDateString() || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
          {profiles.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              {lang === 'hi' ? 'कोई प्रोफाइल नहीं मिली' : 'No profiles found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function FeedbackManager({ feedback, onRefresh, lang }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'hi' ? 'फीडबैक प्रबंधन' : 'Feedback Management'}
        </h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          {feedback.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 mt-1">{item.email}</p>
                  <p className="text-gray-700 mt-2">{item.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {item.timestamp?.toDate?.()?.toLocaleDateString() || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {feedback.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              {lang === 'hi' ? 'कोई फीडबैक नहीं मिला' : 'No feedback found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsManager({ lang }) {
  const [language, setLanguage] = React.useState(lang);
  const [darkMode, setDarkMode] = React.useState(false);
  const [showLabels, setShowLabels] = React.useState(true);
  const [festive, setFestive] = React.useState(true);

  // Language toggle handler
  function handleLangChange(lng) {
    setLanguage(lng);
    if (window.i18n) window.i18n.changeLanguage(lng);
  }

  // Theme toggle handler
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Module list for display
  const moduleList = [
    { id: 'dashboard', hi: 'प्रशासन केंद्र', en: 'Admin Center', desc: 'Dashboard overview and quick stats.' },
    { id: 'news', hi: 'समाचार प्रबंधन', en: 'News Management', desc: 'Manage village news and updates.' },
    { id: 'gallery', hi: 'तस्वीर प्रबंधन', en: 'Gallery Management', desc: 'Manage and organize photo gallery.' },
    { id: 'schemes', hi: 'सरकारी योजनाएं', en: 'Government Schemes', desc: 'Manage government schemes and info.' },
    { id: 'events', hi: 'कार्यक्रम प्रबंधन', en: 'Event Management', desc: 'Manage village events and programs.' },
    { id: 'profiles', hi: 'लोगों का प्रोफाइल', en: 'People Profiles', desc: 'Manage villagers profiles.' },
    { id: 'feedback', hi: 'जनता की राय', en: 'Public Feedback', desc: 'View and respond to feedback.' },
    { id: 'videos', hi: 'वीडियो प्रबंधन', en: 'Video Management', desc: 'Approve, edit, and manage videos.' },
    { id: 'live', hi: 'लाइव सेशन', en: 'Live Sessions', desc: 'Manage and approve live sessions.' },
    { id: 'users', hi: 'यूज़र प्रबंधन', en: 'User Management', desc: 'Manage user accounts and permissions.' },
    { id: 'analytics', hi: 'एनालिटिक्स', en: 'Analytics', desc: 'View site analytics and stats.' },
    { id: 'settings', hi: 'सिस्टम सेटिंग्स', en: 'System Settings', desc: 'Configure dashboard settings.' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? 'सेटिंग्स' : 'Settings'}
        </h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        {/* Language Toggle */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-800">{language === 'hi' ? 'भाषा' : 'Language'}:</span>
          <button
            className={`px-4 py-1 rounded-full font-bold border-2 ${language === 'hi' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-orange-700 border-orange-300'}`}
            onClick={() => handleLangChange('hi')}
          >हिन्दी</button>
          <button
            className={`px-4 py-1 rounded-full font-bold border-2 ${language === 'en' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-orange-700 border-orange-300'}`}
            onClick={() => handleLangChange('en')}
          >English</button>
        </div>
        {/* Theme Toggle */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-800">{language === 'hi' ? 'थीम' : 'Theme'}:</span>
          <label className="flex items-center gap-2 cursor-pointer text-gray-800">
            <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
            <span>{darkMode ? (language === 'hi' ? 'डार्क मोड' : 'Dark Mode') : (language === 'hi' ? 'लाइट मोड' : 'Light Mode')}</span>
          </label>
        </div>
        {/* Sidebar Label Toggle */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-800">{language === 'hi' ? 'साइडबार लेबल' : 'Sidebar Labels'}:</span>
          <label className="flex items-center gap-2 cursor-pointer text-gray-800">
            <input type="checkbox" checked={showLabels} onChange={e => setShowLabels(e.target.checked)} />
            <span>{showLabels ? (language === 'hi' ? 'दिखाएँ' : 'Show') : (language === 'hi' ? 'छुपाएँ' : 'Hide')}</span>
          </label>
        </div>
        {/* Festive Decorations Toggle */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-800">{language === 'hi' ? 'फेस्टिव सजावट' : 'Festive Decorations'}:</span>
          <label className="flex items-center gap-2 cursor-pointer text-gray-800">
            <input type="checkbox" checked={festive} onChange={e => setFestive(e.target.checked)} />
            <span>{festive ? (language === 'hi' ? 'सक्रिय' : 'Enabled') : (language === 'hi' ? 'निष्क्रिय' : 'Disabled')}</span>
          </label>
        </div>
      </div>
      {/* Module List Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'hi' ? 'डैशबोर्ड मॉड्यूल्स' : 'Dashboard Modules'}</h3>
        <ul className="space-y-2">
          {moduleList.map(mod => (
            <li key={mod.id} className="border-b pb-2">
              <span className="font-semibold text-gray-900">{language === 'hi' ? mod.hi : mod.en}</span>
              <span className="ml-2 text-gray-600 text-sm">{mod.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard; 