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

  // Traditional Indian sidebar modules with cultural icons
  const modules = [
    { id: 'dashboard', icon: '🏛️', label: lang === 'hi' ? 'प्रशासन केंद्र' : 'Admin Center' },
    { id: 'news', icon: '📰', label: lang === 'hi' ? 'समाचार प्रबंधन' : 'News Management' },
    { id: 'gallery', icon: '🖼️', label: lang === 'hi' ? 'तस्वीर प्रबंधन' : 'Gallery Management' },
    { id: 'schemes', icon: '📚', label: lang === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes' },
    { id: 'events', icon: '📅', label: lang === 'hi' ? 'कार्यक्रम प्रबंधन' : 'Event Management' },
    { id: 'profiles', icon: '👥', label: lang === 'hi' ? 'लोगों का प्रोफाइल' : 'People Profiles' },
    { id: 'feedback', icon: '📩', label: lang === 'hi' ? 'जनता की राय' : 'Public Feedback' },
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

  // Main dashboard layout with desi styling
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} adminPassword={adminPassword} setAdminPassword={setAdminPassword} lang={lang} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 relative overflow-hidden">
      {/* Traditional background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="flex relative z-10">
        {/* Traditional Indian Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-orange-600 to-red-600 shadow-2xl min-h-screen relative">
          {/* Traditional border decoration */}
          <div className="absolute inset-0 border-r-4 border-orange-400"></div>
          
          {/* Sidebar header with traditional design */}
          <div className="p-6 border-b-2 border-orange-400">
            <div className="text-center">
              <span className="text-4xl mb-2 block">🏛️</span>
              <h2 className="text-xl font-bold text-white mb-1">
                {lang === 'hi' ? 'ग्राम प्रशासन' : 'Village Admin'}
              </h2>
              <p className="text-orange-200 text-sm">
                {lang === 'hi' ? 'बैरियाडीह गाँव' : 'Bairiyadih Village'}
              </p>
            </div>
          </div>

          {/* Navigation with desi styling */}
          <nav className="p-4 space-y-3">
            {modules.map((module) => (
              <DesiSidebarIcon
                key={module.id}
                icon={module.icon}
                label={module.label}
                active={activeModule === module.id}
                onClick={() => setActiveModule(module.id)}
              />
            ))}
          </nav>

          {/* Traditional footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-orange-400">
            <div className="text-center">
              <span className="text-2xl mb-2 block">🕉️</span>
              <p className="text-orange-200 text-xs">
                {lang === 'hi' ? 'सेवा परमो धर्मः' : 'Service is Supreme Duty'}
              </p>
            </div>
          </div>
        </aside>

        {/* Main content area with desi styling */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Traditional Indian Header */}
          <DesiHeader 
            title={lang === 'hi' ? 'ग्राम प्रशासन केंद्र' : 'Village Administration Center'}
            subtitle={lang === 'hi' ? 'बैरियाडीह गाँव का डिजिटल प्रबंधन' : 'Digital Management of Bairiyadih Village'}
            icon="🏛️"
          />

          {/* Main content with traditional borders */}
          <DesiBorder variant="default">
            {activeModule === 'dashboard' && (
              <DashboardOverview 
                lang={lang}
                setShowForm={setShowForm}
                showForm={showForm}
                setActiveModule={setActiveModule}
              />
            )}
            {activeModule === 'news' && (
              <NewsManager 
                news={news} 
                onRefresh={loadModuleData}
                lang={lang}
                setShowForm={setShowForm}
                showForm={showForm}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {activeModule === 'gallery' && (
              <GalleryManager 
                gallery={gallery} 
                onRefresh={loadModuleData}
                lang={lang}
                setShowForm={setShowForm}
                showForm={showForm}
                formData={formData}
                setFormData={setFormData}
                uploading={uploading}
                setUploading={setUploading}
              />
            )}
            {activeModule === 'schemes' && (
              <SchemesManager 
                schemes={schemes} 
                onRefresh={loadModuleData}
                lang={lang}
                setShowForm={setShowForm}
                showForm={showForm}
                formData={formData}
                setFormData={setFormData}
                uploading={uploading}
                setUploading={setUploading}
              />
            )}
            {activeModule === 'events' && (
              <EventsManager 
                events={events} 
                onRefresh={loadModuleData}
                lang={lang}
                setShowForm={setShowForm}
                showForm={showForm}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {activeModule === 'profiles' && (
              <ProfilesManager 
                profiles={profiles} 
                onRefresh={loadModuleData}
                lang={lang}
                setShowForm={setShowForm}
                showForm={showForm}
                formData={formData}
                setFormData={setFormData}
                uploading={uploading}
                setUploading={setUploading}
              />
            )}
            {activeModule === 'feedback' && (
              <FeedbackManager 
                feedback={feedback} 
                onRefresh={loadModuleData}
                lang={lang}
              />
            )}
            {activeModule === 'settings' && <SettingsManager lang={lang} />}
          </DesiBorder>

          {/* Approval Sections with Traditional Indian Cards */}
          <div className="mt-8 space-y-8">
            {/* Local Ads Approval */}
            <DesiCard title={lang === 'hi' ? 'स्थानीय विज्ञापन अनुमोदन' : 'Local Ads Approval'} icon="📢" variant="success">
              {actionMsg && (
                <div className="mb-4 p-3 bg-green-100 border-2 border-green-400 rounded-xl text-green-800 font-semibold">
                  {actionMsg}
                </div>
              )}
              {loadingAds ? (
                <div className="text-center py-8">
                  <span className="text-3xl animate-spin">⏳</span>
                  <p className="text-gray-600 mt-2">{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
                </div>
              ) : pendingAds.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-2">✅</span>
                  <p className="text-gray-600">{lang === 'hi' ? 'कोई लंबित विज्ञापन नहीं।' : 'No pending ads.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingAds.map(ad => (
                    <div key={ad.id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-300 transition-all duration-300">
                      {ad.imageUrl && (
                        <img src={ad.imageUrl} alt="logo" className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-green-200 mx-auto" />
                      )}
                      <div className="text-center">
                        <div className="font-bold text-green-800 text-lg mb-2">{ad.businessName}</div>
                        <div className="text-sm text-gray-700 mb-2">{ad.shopType}</div>
                        <div className="text-xs text-gray-500 mb-3">{ad.description}</div>
                        <div className="text-xs text-green-700 mb-1">
                          <span className="font-semibold">{lang === 'hi' ? 'मालिक:' : 'Owner:'}</span> {ad.ownerName}
                        </div>
                        <div className="text-xs text-green-700 mb-3">
                          <span className="font-semibold">{lang === 'hi' ? 'फोन:' : 'Phone:'}</span> {ad.phone}
                        </div>
                      {ad.paymentProofUrl && (
                          <a href={ad.paymentProofUrl} target="_blank" rel="noopener noreferrer" 
                             className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs mb-3 hover:bg-blue-200 transition-colors">
                            {lang === 'hi' ? 'भुगतान स्क्रीनशॉट देखें' : 'View Payment Screenshot'}
                        </a>
                      )}
                        <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleAdAction(ad.id, 'approved')}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                        >
                            {lang === 'hi' ? 'स्वीकृत करें' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleAdAction(ad.id, 'rejected')}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                        >
                            {lang === 'hi' ? 'अस्वीकृत करें' : 'Reject'}
                        </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DesiCard>

            {/* Digital Services Approval */}
            <DesiCard title={lang === 'hi' ? 'डिजिटल सेवा अनुरोध अनुमोदन' : 'Digital Service Requests Approval'} icon="💻" variant="info">
              {serviceMsg && (
                <div className="mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-xl text-blue-800 font-semibold">
                  {serviceMsg}
                </div>
              )}
              {loadingServices ? (
                <div className="text-center py-8">
                  <span className="text-3xl animate-spin">⏳</span>
                  <p className="text-gray-600 mt-2">{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
                </div>
              ) : pendingServices.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-2">✅</span>
                  <p className="text-gray-600">{lang === 'hi' ? 'कोई लंबित सेवा अनुरोध नहीं।' : 'No pending service requests.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingServices.map(req => (
                    <div key={req.id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300">
                      <div className="text-center">
                        <div className="font-bold text-blue-800 text-lg mb-2">{req.serviceType}</div>
                        <div className="text-sm text-gray-700 mb-3">{req.details}</div>
                        <div className="text-xs text-blue-700 mb-1">
                          <span className="font-semibold">{lang === 'hi' ? 'नाम:' : 'Name:'}</span> {req.userName}
                        </div>
                        <div className="text-xs text-blue-700 mb-3">
                          <span className="font-semibold">{lang === 'hi' ? 'फोन:' : 'Phone:'}</span> {req.phone}
                        </div>
                      {req.paymentProofUrl && (
                          <a href={req.paymentProofUrl} target="_blank" rel="noopener noreferrer" 
                             className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs mb-3 hover:bg-blue-200 transition-colors">
                            {lang === 'hi' ? 'भुगतान स्क्रीनशॉट देखें' : 'View Payment Screenshot'}
                        </a>
                      )}
                        <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleServiceAction(req.id, 'approved')}
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                        >
                            {lang === 'hi' ? 'स्वीकृत करें' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleServiceAction(req.id, 'rejected')}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                        >
                            {lang === 'hi' ? 'अस्वीकृत करें' : 'Reject'}
                        </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DesiCard>

            {/* Premium PDF Purchases Approval */}
            <DesiCard title={lang === 'hi' ? 'प्रीमियम PDF खरीद अनुमोदन' : 'Premium PDF Purchases Approval'} icon="📄" variant="warning">
              {pdfPurchaseMsg && (
                <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-xl text-yellow-800 font-semibold">
                  {pdfPurchaseMsg}
                </div>
              )}
              {loadingPDFPurchases ? (
                <div className="text-center py-8">
                  <span className="text-3xl animate-spin">⏳</span>
                  <p className="text-gray-600 mt-2">{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
                </div>
              ) : pendingPDFPurchases.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-2">✅</span>
                  <p className="text-gray-600">{lang === 'hi' ? 'कोई लंबित खरीद नहीं।' : 'No pending purchases.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingPDFPurchases.map(p => (
                    <div key={p.id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300">
                      <div className="text-center">
                        <div className="font-bold text-yellow-800 text-lg mb-2">{pdfsMap[p.pdfId]?.title || 'PDF'}</div>
                        <div className="text-xs text-yellow-700 mb-1">
                          <span className="font-semibold">{lang === 'hi' ? 'नाम:' : 'Name:'}</span> {p.name}
                        </div>
                        <div className="text-xs text-yellow-700 mb-3">
                          <span className="font-semibold">{lang === 'hi' ? 'फोन:' : 'Phone:'}</span> {p.phone}
                        </div>
                      {p.paymentProofUrl && (
                          <a href={p.paymentProofUrl} target="_blank" rel="noopener noreferrer" 
                             className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs mb-3 hover:bg-blue-200 transition-colors">
                            {lang === 'hi' ? 'भुगतान स्क्रीनशॉट देखें' : 'View Payment Screenshot'}
                        </a>
                      )}
                        <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handlePDFPurchaseAction(p.id, 'approved')}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                        >
                            {lang === 'hi' ? 'स्वीकृत करें' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handlePDFPurchaseAction(p.id, 'rejected')}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
                        >
                            {lang === 'hi' ? 'अस्वीकृत करें' : 'Reject'}
                        </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DesiCard>
          </div>
        </main>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onConfirm={() => {
          // Handle delete confirmation
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
        title={lang === 'hi' ? 'क्या आप वाकई हटाना चाहते हैं?' : 'Are you sure you want to delete?'}
        message={lang === 'hi' ? 'यह कार्रवाई पूर्ववत नहीं की जा सकती।' : 'This action cannot be undone.'}
        confirmText={lang === 'hi' ? 'हटाएं' : 'Delete'}
        cancelText={lang === 'hi' ? 'रद्द करें' : 'Cancel'}
      />
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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {lang === 'hi' ? 'सेटिंग्स' : 'Settings'}
        </h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-600">
          {lang === 'hi' ? 'सेटिंग्स मॉड्यूल यहाँ आएगा' : 'Settings module will be here'}
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard; 