import React, { useState, useEffect } from 'react';
import { db, storage, auth } from './firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import DesignerCardBackground from './DesignerCardBackground';

const MODULES = [
  {
    key: 'gallery',
    icon: '🎞️',
    hi: 'वीडियो गैलरी',
    en: 'Video Gallery',
  },
  {
    key: 'live',
    icon: '🔴',
    hi: 'लाइव सेशन',
    en: 'Live Session',
  },
  {
    key: 'upload',
    icon: '⬆️',
    hi: 'अपना वीडियो अपलोड करें',
    en: 'Upload Video',
  },
];

const DEMO_VIDEOS = [
  {
    id: '1',
    youtubeId: 'dQw4w9WgXcQ',
    title: { hi: 'कृषि जागरूकता', en: 'Farming Awareness' },
    desc: { hi: 'खेती के नए तरीके सीखें।', en: 'Learn new farming techniques.' },
    category: 'farming',
    views: 1200,
    emoji: '🧑‍🌾',
  },
  {
    id: '2',
    youtubeId: 'M7lc1UVf-VE',
    title: { hi: 'शैक्षिक वीडियो', en: 'Educational Video' },
    desc: { hi: 'गणित और विज्ञान के लिए।', en: 'For math and science.' },
    category: 'education',
    views: 950,
    emoji: '🎓',
  },
  {
    id: '3',
    youtubeId: 'ysz5S6PUM-U',
    title: { hi: 'भजन संध्या', en: 'Devotional Bhajan' },
    desc: { hi: 'आध्यात्मिक संगीत।', en: 'Spiritual music.' },
    category: 'devotional',
    views: 2100,
    emoji: '🙏',
  },
  {
    id: '4',
    youtubeId: 'ScMzIvxBSi4',
    title: { hi: 'ग्राम उत्सव', en: 'Village Festival' },
    desc: { hi: 'स्थानीय सांस्कृतिक कार्यक्रम।', en: 'Local cultural event.' },
    category: 'events',
    views: 800,
    emoji: '🎉',
  },
];

const DEMO_LIVE = {
  isLive: true,
  embedUrl: 'https://www.youtube.com/embed/5qap5aO4i9A', // Example: YouTube Live
  title: {
    hi: 'ग्राम सभा लाइव',
    en: 'Gram Sabha Live',
  },
  desc: {
    hi: 'ग्राम पंचायत की सीधी प्रसारण।',
    en: 'Live broadcast of Gram Panchayat.'
  },
  scheduled: [
    {
      time: '2024-06-10T18:00:00',
      title: { hi: 'कृषि सलाह लाइव', en: 'Farming Advice Live' },
    },
    {
      time: '2024-06-12T16:00:00',
      title: { hi: 'विद्यालय प्रतियोगिता', en: 'School Competition' },
    },
  ],
};

const DEMO_UPLOADS = [
  {
    id: 'u1',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: { hi: 'गाँव का उत्सव', en: 'Village Festival' },
    desc: { hi: 'स्थानीय मेले की झलक।', en: 'Glimpse of local fair.' },
    category: 'events',
    views: 123,
    thumbnail: '',
    emoji: '🎉',
  },
  {
    id: 'u2',
    url: 'https://www.w3schools.com/html/movie.mp4',
    title: { hi: 'कृषि टिप्स', en: 'Farming Tips' },
    desc: { hi: 'खेती के लिए सुझाव।', en: 'Tips for farming.' },
    category: 'farming',
    views: 88,
    thumbnail: '',
    emoji: '🧑‍🌾',
  },
];

const CATEGORIES = [
  { key: 'all', hi: 'सभी', en: 'All', emoji: '📺' },
  { key: 'education', hi: 'शिक्षा', en: 'Education', emoji: '🎓' },
  { key: 'farming', hi: 'कृषि', en: 'Farming', emoji: '🧑‍🌾' },
  { key: 'events', hi: 'इवेंट्स', en: 'Events', emoji: '🎉' },
  { key: 'devotional', hi: 'भजन', en: 'Devotional', emoji: '🙏' },
];

function Videos() {
  const [lang, setLang] = useState('hi');
  const [active, setActive] = useState('gallery');
  const [galleryCategory, setGalleryCategory] = useState('all');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    desc: '',
    category: 'farming',
    file: null,
    thumbnail: null,
  });
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle | uploading | success | error
  const [uploadError, setUploadError] = useState('');
  const [publishedVideos, setPublishedVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  // Admin flag (for demo; replace with real auth in future)
  const [user, setUser] = useState(null);
  const ADMIN_EMAILS = [
    'admin@bairiyadih.com', // Add your admin emails here
    'bairiyadihportal@gmail.com'
  ];
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);
  const [pendingVideos, setPendingVideos] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [adminActionMsg, setAdminActionMsg] = useState('');

  // YouTube Gallery Firestore integration
  const [ytVideos, setYtVideos] = useState([]);
  const [loadingYt, setLoadingYt] = useState(false);
  const [ytCategory, setYtCategory] = useState('all');
  const [ytAdminForm, setYtAdminForm] = useState({ youtubeId: '', title: '', desc: '', category: 'farming' });
  const [ytAdminMsg, setYtAdminMsg] = useState('');

  // Live Broadcast Firestore integration
  const [liveInfo, setLiveInfo] = useState(null);
  const [loadingLive, setLoadingLive] = useState(false);
  const [liveAdminForm, setLiveAdminForm] = useState({ isLive: false, embedUrl: '', title: '', desc: '', scheduled: [] });
  const [liveAdminMsg, setLiveAdminMsg] = useState('');

  // --- Admin Edit/Delete for YouTube Gallery ---
  const [ytEditId, setYtEditId] = useState(null);
  const [ytEditForm, setYtEditForm] = useState({ youtubeId: '', title: '', desc: '', category: 'farming' });
  async function handleYtEditStart(video) {
    setYtEditId(video.id);
    setYtEditForm({ youtubeId: video.youtubeId, title: video.title, desc: video.desc, category: video.category });
  }
  async function handleYtEditSave(e) {
    e.preventDefault();
    try {
      await import('firebase/firestore').then(({ doc, updateDoc }) =>
        updateDoc(doc(db, 'gram_videos_youtube', ytEditId), ytEditForm)
      );
      setYtEditId(null);
      setYtAdminMsg(lang === 'hi' ? 'वीडियो अपडेट हुआ!' : 'Video updated!');
    } catch (e) {
      setYtAdminMsg(lang === 'hi' ? 'अपडेट फेल।' : 'Update failed.');
    }
  }
  async function handleYtDelete(id) {
    if (!window.confirm(lang === 'hi' ? 'वीडियो हटाएं?' : 'Delete video?')) return;
    try {
      await import('firebase/firestore').then(({ doc, deleteDoc }) =>
        deleteDoc(doc(db, 'gram_videos_youtube', id))
      );
      setYtAdminMsg(lang === 'hi' ? 'वीडियो हटाया गया!' : 'Video deleted!');
    } catch (e) {
      setYtAdminMsg(lang === 'hi' ? 'हटाना फेल।' : 'Delete failed.');
    }
  }
  // --- Admin Edit/Delete for Uploads ---
  const [uploadEditId, setUploadEditId] = useState(null);
  const [uploadEditForm, setUploadEditForm] = useState({ title: '', desc: '', category: 'farming' });
  async function handleUploadEditStart(video) {
    setUploadEditId(video.id);
    setUploadEditForm({ title: video.title, desc: video.desc, category: video.category });
  }
  async function handleUploadEditSave(e) {
    e.preventDefault();
    try {
      await import('firebase/firestore').then(({ doc, updateDoc }) =>
        updateDoc(doc(db, 'gram_videos_uploads', uploadEditId), uploadEditForm)
      );
      setUploadEditId(null);
      setAdminActionMsg(lang === 'hi' ? 'वीडियो अपडेट हुआ!' : 'Video updated!');
    } catch (e) {
      setAdminActionMsg(lang === 'hi' ? 'अपडेट फेल।' : 'Update failed.');
    }
  }
  async function handleUploadDelete(id) {
    if (!window.confirm(lang === 'hi' ? 'वीडियो हटाएं?' : 'Delete video?')) return;
    try {
      await import('firebase/firestore').then(({ doc, deleteDoc }) =>
        deleteDoc(doc(db, 'gram_videos_uploads', id))
      );
      setAdminActionMsg(lang === 'hi' ? 'वीडियो हटाया गया!' : 'Video deleted!');
    } catch (e) {
      setAdminActionMsg(lang === 'hi' ? 'हटाना फेल।' : 'Delete failed.');
    }
  }

  // --- View Counter Logic ---
  async function incrementYtViews(id) {
    try {
      await import('firebase/firestore').then(({ doc, updateDoc, increment }) =>
        updateDoc(doc(db, 'gram_videos_youtube', id), { views: increment(1) })
      );
    } catch {}
  }
  async function incrementUploadViews(id) {
    try {
      await import('firebase/firestore').then(({ doc, updateDoc, increment }) =>
        updateDoc(doc(db, 'gram_videos_uploads', id), { views: increment(1) })
      );
    } catch {}
  }

  // Fetch approved videos from Firestore
  React.useEffect(() => {
    if (active !== 'upload') return;
    setLoadingVideos(true);
    const fetchVideos = async () => {
      try {
        const q = query(collection(db, 'gram_videos_uploads'), where('status', '==', 'approved'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setPublishedVideos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        setPublishedVideos([]);
      }
      setLoadingVideos(false);
    };
    fetchVideos();
  }, [active]);

  // Fetch pending uploads for admin
  React.useEffect(() => {
    if (!isAdmin || active !== 'upload') return;
    setLoadingPending(true);
    const fetchPending = async () => {
      try {
        const q = query(collection(db, 'gram_videos_uploads'), where('status', '==', 'pending'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setPendingVideos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        setPendingVideos([]);
      }
      setLoadingPending(false);
    };
    fetchPending();
  }, [isAdmin, active, adminActionMsg, uploadStatus]);

  // Fetch YouTube videos from Firestore
  React.useEffect(() => {
    if (active !== 'gallery') return;
    setLoadingYt(true);
    const fetchYt = async () => {
      try {
        const q = ytCategory === 'all'
          ? query(collection(db, 'gram_videos_youtube'))
          : query(collection(db, 'gram_videos_youtube'), where('category', '==', ytCategory));
        const snap = await getDocs(q);
        setYtVideos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        setYtVideos([]);
      }
      setLoadingYt(false);
    };
    fetchYt();
  }, [active, ytCategory, ytAdminMsg]);

  // Fetch live info from Firestore (assume single doc with id 'main')
  React.useEffect(() => {
    if (active !== 'live') return;
    setLoadingLive(true);
    const fetchLive = async () => {
      try {
        const docSnap = await import('firebase/firestore').then(({ doc, getDoc }) =>
          getDoc(doc(db, 'gram_videos_live', 'main'))
        );
        if (docSnap.exists()) {
          setLiveInfo({ id: 'main', ...docSnap.data() });
          setLiveAdminForm({ ...docSnap.data() });
        } else {
          setLiveInfo(null);
        }
      } catch (e) {
        setLiveInfo(null);
      }
      setLoadingLive(false);
    };
    fetchLive();
  }, [active, liveAdminMsg]);

  // Upload handler
  async function handleUpload(e) {
    e.preventDefault();
    setUploadStatus('uploading');
    setUploadError('');
    try {
      // Upload video
      const videoRef = ref(storage, `gram_videos_uploads/videos/${Date.now()}_${uploadForm.file.name}`);
      await uploadBytes(videoRef, uploadForm.file);
      const videoUrl = await getDownloadURL(videoRef);
      // Upload thumbnail (optional)
      let thumbnailUrl = '';
      if (uploadForm.thumbnail) {
        const thumbRef = ref(storage, `gram_videos_uploads/thumbnails/${Date.now()}_${uploadForm.thumbnail.name}`);
        await uploadBytes(thumbRef, uploadForm.thumbnail);
        thumbnailUrl = await getDownloadURL(thumbRef);
      }
      // Save meta to Firestore
      await addDoc(collection(db, 'gram_videos_uploads'), {
        title: uploadForm.title,
        desc: uploadForm.desc,
        category: uploadForm.category,
        videoUrl,
        thumbnailUrl,
        status: 'pending',
        views: 0,
        createdAt: serverTimestamp(),
        uploadedBy: user ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        } : null
      });
      setUploadStatus('success');
      setUploadForm({ title: '', desc: '', category: 'farming', file: null, thumbnail: null });
    } catch (err) {
      setUploadStatus('error');
      setUploadError(lang === 'hi' ? 'कुछ गलत हो गया।' : 'Something went wrong.');
    }
  }

  // Approve/Reject handlers
  async function handleAdminAction(id, status) {
    setAdminActionMsg('');
    try {
      const docRef = collection(db, 'gram_videos_uploads');
      const videoDoc = pendingVideos.find(v => v.id === id);
      await import('firebase/firestore').then(({ doc, updateDoc }) =>
        updateDoc(doc(db, 'gram_videos_uploads', id), { status })
      );
      setAdminActionMsg(status === 'approved'
        ? (lang === 'hi' ? 'वीडियो स्वीकृत!' : 'Video approved!')
        : (lang === 'hi' ? 'वीडियो अस्वीकृत।' : 'Video rejected.'));
      // Optionally: remove from local list immediately
      setPendingVideos(pendingVideos.filter(v => v.id !== id));
    } catch (e) {
      setAdminActionMsg(lang === 'hi' ? 'एक्शन फेल।' : 'Action failed.');
    }
  }

  // Admin add video handler
  async function handleYtAdminAdd(e) {
    e.preventDefault();
    setYtAdminMsg('');
    try {
      await addDoc(collection(db, 'gram_videos_youtube'), {
        youtubeId: ytAdminForm.youtubeId,
        title: ytAdminForm.title,
        desc: ytAdminForm.desc,
        category: ytAdminForm.category,
        views: 0,
        createdAt: serverTimestamp(),
      });
      setYtAdminMsg(lang === 'hi' ? 'वीडियो जोड़ा गया!' : 'Video added!');
      setYtAdminForm({ youtubeId: '', title: '', desc: '', category: 'farming' });
    } catch (e) {
      setYtAdminMsg(lang === 'hi' ? 'कुछ गलत हो गया।' : 'Something went wrong.');
    }
  }

  // Admin update live info handler
  async function handleLiveAdminSave(e) {
    e.preventDefault();
    setLiveAdminMsg('');
    try {
      await import('firebase/firestore').then(({ doc, setDoc }) =>
        setDoc(doc(db, 'gram_videos_live', 'main'), liveAdminForm)
      );
      setLiveAdminMsg(lang === 'hi' ? 'लाइव सेटिंग सेव हुई!' : 'Live settings saved!');
    } catch (e) {
      setLiveAdminMsg(lang === 'hi' ? 'कुछ गलत हो गया।' : 'Something went wrong.');
    }
  }
  // Admin add schedule handler
  function handleAddSchedule() {
    setLiveAdminForm(f => ({ ...f, scheduled: [...(f.scheduled || []), { time: '', title: '' }] }));
  }
  // Admin update schedule handler
  function handleScheduleChange(idx, field, value) {
    setLiveAdminForm(f => ({
      ...f,
      scheduled: f.scheduled.map((s, i) => i === idx ? { ...s, [field]: value } : s)
    }));
  }
  // Admin remove schedule handler
  function handleRemoveSchedule(idx) {
    setLiveAdminForm(f => ({
      ...f,
      scheduled: f.scheduled.filter((_, i) => i !== idx)
    }));
  }

  // --- Auth State ---
  function handleLogin() {
    signInWithPopup(auth, new GoogleAuthProvider());
  }
  function handleLogout() {
    signOut(auth);
  }

  const [showLiveForm, setShowLiveForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // 1. Add utility for user avatar (initials or emoji)
  function getUserAvatar(name) {
    if (!name) return '👤';
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase();
    if (initials.length === 1) return initials + '👤';
    return initials.slice(0,2);
  }

  return (
    <main className="flex flex-col items-center mt-8 px-4 relative">
      {/* Language Toggle - REMOVE THIS BLOCK */}
      {/* <div className="flex justify-end w-full max-w-6xl mb-2">
        <div className="inline-flex rounded-full shadow border border-blue-300 bg-white overflow-hidden">
          <button
            className={`px-4 py-1 font-semibold transition-all duration-200 ${lang === 'hi' ? 'bg-blue-500 text-white' : 'text-blue-700 hover:bg-blue-100'}`}
            onClick={() => setLang('hi')}
          >हिन्दी</button>
          <button
            className={`px-4 py-1 font-semibold transition-all duration-200 ${lang === 'en' ? 'bg-blue-500 text-white' : 'text-blue-700 hover:bg-blue-100'}`}
            onClick={() => setLang('en')}
          >English</button>
        </div>
      </div> */}
      <DesignerCardBackground variant="default">
        <div className="text-center mb-8">
          <span className="text-6xl mb-2 animate-bounce" role="img" aria-label="videos">📺</span>
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow-lg tracking-tight leading-[1.2] hindi-heading">
            {lang === 'hi' ? 'वीडियो' : 'Videos'}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            {lang === 'hi'
              ? 'गांव के कार्यक्रम, लाइव, और वीडियो गैलरी।'
              : 'Village events, live sessions, and video gallery.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {MODULES.map((mod, i) => (
            <div
              key={mod.key}
              className={`bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col items-center border-l-8 cursor-pointer transition-all duration-200 ${active === mod.key ? 'border-blue-700 ring-2 ring-blue-300 scale-105 bg-blue-50' : 'border-blue-400 hover:bg-blue-100 hover:scale-105'}`}
              onClick={() => setActive(mod.key)}
              tabIndex={0}
              role="button"
              aria-label={lang === 'hi' ? mod.hi : mod.en}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setActive(mod.key); }}
            >
              <span className="text-4xl mb-2">{mod.icon}</span>
              <div className="font-bold text-xl text-blue-900 mb-1">{lang === 'hi' ? mod.hi : mod.en}</div>
            </div>
          ))}
        </div>
        {/* Existing video/live/upload UI below this point (leave as is, but wrap in matching card/grid if needed) */}
        {active === 'gallery' && (
          <DesignerCardBackground variant="gallery" className="w-full max-w-2xl mx-auto mb-6">
            {isAdmin && (
              <DesignerCardBackground variant="gallery" className="w-full max-w-2xl mx-auto mb-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-green-700"><span>🛡️</span> {lang === 'hi' ? 'एडमिन: YouTube वीडियो जोड़ें' : 'Admin: Add YouTube Video'}</h3>
                <form className="flex flex-col gap-2" onSubmit={handleYtAdminAdd}>
                  <input type="text" required value={ytAdminForm.youtubeId} onChange={e => setYtAdminForm(f => ({ ...f, youtubeId: e.target.value }))} placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)" className="border rounded px-3 py-2 text-black" />
                  <input type="text" required value={ytAdminForm.title} onChange={e => setYtAdminForm(f => ({ ...f, title: e.target.value }))} placeholder={lang === 'hi' ? 'शीर्षक' : 'Title'} className="border rounded px-3 py-2 text-black" />
                  <input type="text" value={ytAdminForm.desc} onChange={e => setYtAdminForm(f => ({ ...f, desc: e.target.value }))} placeholder={lang === 'hi' ? 'विवरण' : 'Description'} className="border rounded px-3 py-2 text-black" />
                  <select value={ytAdminForm.category} onChange={e => setYtAdminForm(f => ({ ...f, category: e.target.value }))} className="border rounded px-3 py-2 text-black">
                    {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                      <option key={cat.key} value={cat.key}>{cat.emoji} {lang === 'hi' ? cat.hi : cat.en}</option>
                    ))}
                  </select>
                  <button type="submit" className="bg-gradient-to-r from-green-400 to-pink-400 text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 transition-all duration-200">{lang === 'hi' ? 'जोड़ें' : 'Add'}</button>
                </form>
                {ytAdminMsg && <div className="text-green-700 font-semibold mt-2">{ytAdminMsg}</div>}
              </DesignerCardBackground>
            )}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setYtCategory(cat.key)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold shadow transition-all duration-200 border-2 text-sm ${ytCategory === cat.key ? 'bg-gradient-to-r from-green-400 to-pink-400 text-white border-pink-400 scale-105' : 'bg-white text-green-800 border-green-200 hover:bg-green-50'}`}
                >
                  <span>{cat.emoji}</span> {lang === 'hi' ? cat.hi : cat.en}
                </button>
              ))}
            </div>
            {loadingYt ? (
              <div className="text-center text-gray-400 py-8">{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ytVideos.map(video => (
                  <DesignerCardBackground key={video.id} variant="gallery" className="p-3 flex flex-col hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden mb-2">
                      <div
                        className="relative w-full h-full"
                        tabIndex={0}
                        onClick={() => incrementYtViews(video.id)}
                        onKeyDown={e => { if (e.key === 'Enter') incrementYtViews(video.id); }}
                        role="button"
                        aria-label="Play YouTube Video"
                      >
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full rounded-xl border-none"
                        ></iframe>
                        <span className="absolute inset-0" style={{cursor:'pointer'}}></span>
                      </div>
                    </div>
                    {isAdmin && ytEditId === video.id ? (
                      <form className="flex flex-col gap-1 mb-2" onSubmit={handleYtEditSave}>
                        <input type="text" value={ytEditForm.youtubeId} onChange={e => setYtEditForm(f => ({ ...f, youtubeId: e.target.value }))} className="border rounded px-2 py-1 text-black" />
                        <input type="text" value={ytEditForm.title} onChange={e => setYtEditForm(f => ({ ...f, title: e.target.value }))} className="border rounded px-2 py-1 text-black" />
                        <input type="text" value={ytEditForm.desc} onChange={e => setYtEditForm(f => ({ ...f, desc: e.target.value }))} className="border rounded px-2 py-1 text-black" />
                        <select value={ytEditForm.category} onChange={e => setYtEditForm(f => ({ ...f, category: e.target.value }))} className="border rounded px-2 py-1 text-black">
                          {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                            <option key={cat.key} value={cat.key}>{cat.emoji} {lang === 'hi' ? cat.hi : cat.en}</option>
                          ))}
                        </select>
                        <div className="flex gap-2 mt-1">
                          <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-full font-semibold shadow hover:bg-green-600 transition-all duration-200">{lang === 'hi' ? 'सेव' : 'Save'}</button>
                          <button type="button" onClick={() => setYtEditId(null)} className="bg-gray-300 text-gray-800 px-2 py-1 rounded-full font-semibold shadow hover:bg-gray-400 transition-all duration-200">{lang === 'hi' ? 'रद्द' : 'Cancel'}</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">📺</span>
                          <span className="font-bold text-green-800 text-base">{video.title}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{video.desc}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>👁️ {video.views}</span>
                          <span>•</span>
                          <span>YT</span>
                        </div>
                        {isAdmin && (
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => handleYtEditStart(video)} className="bg-blue-500 text-white px-2 py-1 rounded-full font-semibold shadow hover:bg-blue-600 transition-all duration-200">{lang === 'hi' ? 'एडिट' : 'Edit'}</button>
                            <button onClick={() => handleYtDelete(video.id)} className="bg-red-500 text-white px-2 py-1 rounded-full font-semibold shadow hover:bg-red-600 transition-all duration-200">{lang === 'hi' ? 'हटाएं' : 'Delete'}</button>
                          </div>
                        )}
                      </>
                    )}
                  </DesignerCardBackground>
                ))}
                {ytVideos.length === 0 && (
                  <div className="col-span-full text-center text-gray-400 py-8">
                    {lang === 'hi' ? 'कोई वीडियो नहीं मिला।' : 'No videos found.'}
                  </div>
                )}
              </div>
            )}
          </DesignerCardBackground>
        )}
        {active === 'live' && (
          <DesignerCardBackground variant="live" className="w-full max-w-2xl mx-auto mb-4">
            {/* Admin: Pending Live Session Requests */}
            {isAdmin && (
              <DesignerCardBackground variant="live" className="w-full max-w-xl mx-auto mb-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-pink-700"><span>🛡️</span> {lang === 'hi' ? 'लाइव अनुरोध (एडमिन)' : 'Live Requests (Admin)'}</h3>
                <AdminLiveRequests />
              </DesignerCardBackground>
            )}
            {/* User Live Session Request Form Toggle */}
            {!isAdmin && (
              <DesignerCardBackground variant="live" className="w-full max-w-xl mx-auto mb-6">
                <button
                  className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 transition-all duration-200 mb-3"
                  onClick={() => setShowLiveForm(v => !v)}
                >
                  {showLiveForm ? (lang === 'hi' ? 'फॉर्म छुपाएं' : 'Hide Form') : (lang === 'hi' ? 'लाइव अनुरोध करें' : 'Request Live Session')}
                </button>
                {showLiveForm && (
                  <form className="flex flex-col gap-2 animate-fade-in" onSubmit={async e => {
                    e.preventDefault();
                    if (!window.liveReqName || !window.liveReqTitle || !window.liveReqUrl) return;
                    try {
                      await addDoc(collection(db, 'gram_videos_live_requests'), {
                        name: window.liveReqName,
                        title: window.liveReqTitle,
                        desc: window.liveReqDesc || '',
                        embedUrl: window.liveReqUrl,
                        status: 'pending',
                        requestedAt: serverTimestamp(),
                      });
                      window.liveReqName = window.liveReqTitle = window.liveReqDesc = window.liveReqUrl = '';
                      document.getElementById('liveReqForm').reset();
                      alert(lang === 'hi' ? 'अनुरोध भेजा गया! एडमिन अप्रूवल के बाद लाइव होगा।' : 'Request sent! Will go live after admin approval.');
                      setShowLiveForm(false);
                    } catch {
                      alert(lang === 'hi' ? 'कुछ गलत हो गया।' : 'Something went wrong.');
                    }
                  }} id="liveReqForm">
                    <input type="text" required placeholder={lang === 'hi' ? 'आपका नाम' : 'Your Name'} className="border rounded px-3 py-2 text-black" onChange={e => window.liveReqName = e.target.value} />
                    <input type="text" required placeholder={lang === 'hi' ? 'शीर्षक' : 'Title'} className="border rounded px-3 py-2 text-black" onChange={e => window.liveReqTitle = e.target.value} />
                    <input type="text" placeholder={lang === 'hi' ? 'विवरण' : 'Description'} className="border rounded px-3 py-2 text-black" onChange={e => window.liveReqDesc = e.target.value} />
                    <input type="text" required placeholder="YouTube/Facebook/Zoom Embed URL" className="border rounded px-3 py-2 text-black" onChange={e => window.liveReqUrl = e.target.value} />
                    <button type="submit" className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 transition-all duration-200">{lang === 'hi' ? 'अनुरोध भेजें' : 'Send Request'}</button>
                  </form>
                )}
              </DesignerCardBackground>
            )}
            {isAdmin && (
              <DesignerCardBackground variant="live" className="w-full max-w-2xl mx-auto mb-4">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-pink-700"><span>🛡️</span> {lang === 'hi' ? 'एडमिन: लाइव सेटिंग' : 'Admin: Live Settings'}</h3>
                <form className="flex flex-col gap-2" onSubmit={handleLiveAdminSave}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={liveAdminForm.isLive} onChange={e => setLiveAdminForm(f => ({ ...f, isLive: e.target.checked }))} />
                    <span>{lang === 'hi' ? 'LIVE ON' : 'LIVE ON'}</span>
                  </label>
                  <input type="text" value={liveAdminForm.embedUrl} onChange={e => setLiveAdminForm(f => ({ ...f, embedUrl: e.target.value }))} placeholder="YouTube/Facebook/Zoom Embed URL" className="border rounded px-3 py-2 text-black" />
                  <input type="text" value={liveAdminForm.title} onChange={e => setLiveAdminForm(f => ({ ...f, title: e.target.value }))} placeholder={lang === 'hi' ? 'शीर्षक' : 'Title'} className="border rounded px-3 py-2 text-black" />
                  <input type="text" value={liveAdminForm.desc} onChange={e => setLiveAdminForm(f => ({ ...f, desc: e.target.value }))} placeholder={lang === 'hi' ? 'विवरण' : 'Description'} className="border rounded px-3 py-2 text-black" />
                  <div className="mb-2">
                    <div className="font-semibold mb-1">{lang === 'hi' ? 'शेड्यूल' : 'Schedule'}</div>
                    {(liveAdminForm.scheduled || []).map((s, idx) => (
                      <div key={idx} className="flex gap-2 mb-1">
                        <input type="datetime-local" value={s.time} onChange={e => handleScheduleChange(idx, 'time', e.target.value)} className="border rounded px-2 py-1 text-black" />
                        <input type="text" value={s.title} onChange={e => handleScheduleChange(idx, 'title', e.target.value)} placeholder={lang === 'hi' ? 'शीर्षक' : 'Title'} className="border rounded px-2 py-1 text-black" />
                        <button type="button" onClick={() => handleRemoveSchedule(idx)} className="text-red-500 font-bold">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={handleAddSchedule} className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full">+ {lang === 'hi' ? 'शेड्यूल जोड़ें' : 'Add Schedule'}</button>
                  </div>
                  <button type="submit" className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 transition-all duration-200">{lang === 'hi' ? 'सेव करें' : 'Save'}</button>
                </form>
                {liveAdminMsg && <div className="text-pink-700 font-semibold mt-2">{liveAdminMsg}</div>}
              </DesignerCardBackground>
            )}
            {loadingLive ? (
              <div className="text-center text-gray-400 py-8">{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</div>
            ) : liveInfo && liveInfo.isLive ? (
              <DesignerCardBackground variant="live" className="relative rounded-2xl overflow-hidden shadow-xl border border-pink-300 mb-2 w-full max-w-2xl mx-auto">
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="animate-pulse text-red-600 text-lg">🔴</span>
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">LIVE NOW</span>
                </div>
                <iframe
                  src={liveInfo.embedUrl}
                  title={liveInfo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video min-h-[220px] bg-black"
                ></iframe>
                {/* Show requestedBy if present */}
                {liveInfo.requestedBy && (
                  <div className="absolute bottom-3 left-3 bg-white/80 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {lang === 'hi' ? 'अनुरोधकर्ता: ' : 'Requested by: '}{liveInfo.requestedBy}
                  </div>
                )}
              </DesignerCardBackground>
            ) : (
              <DesignerCardBackground variant="live" className="w-full aspect-video min-h-[220px] flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 shadow">
                <span className="text-2xl text-gray-400">{lang === 'hi' ? 'कोई लाइव नहीं' : 'No Live Now'}</span>
              </DesignerCardBackground>
            )}
            <div className="text-center mt-2">
              <h3 className="text-xl font-bold text-pink-700 mb-1 flex items-center justify-center gap-2">
                <span>📺</span> {liveInfo?.title || (lang === 'hi' ? 'लाइव सेशन' : 'Live Session')}
              </h3>
              <div className="text-gray-600 text-sm mb-2">{liveInfo?.desc || ''}</div>
            </div>
            <DesignerCardBackground variant="live" className="w-full max-w-2xl mx-auto">
              <h4 className="font-bold text-pink-700 mb-2 flex items-center gap-2"><span>📅</span> {lang === 'hi' ? 'आगामी लाइव सेशन' : 'Upcoming Live Sessions'}</h4>
              <ul className="space-y-2">
                {(liveInfo?.scheduled || []).map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-pink-600 font-bold">{s.time ? new Date(s.time).toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }) : ''}</span>
                    <span className="text-gray-700">{s.title}</span>
                  </li>
                ))}
                {(liveInfo?.scheduled || []).length === 0 && (
                  <li className="text-gray-400">{lang === 'hi' ? 'कोई शेड्यूल नहीं' : 'No schedule'}</li>
                )}
              </ul>
            </DesignerCardBackground>
          </DesignerCardBackground>
        )}
        {active === 'upload' && (
          <DesignerCardBackground variant="upload" className="w-full max-w-lg">
            <button
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 hover:from-green-600 hover:to-blue-600 transition-all duration-200 mb-3"
              onClick={() => setShowUploadForm(v => !v)}
            >
              {showUploadForm ? (lang === 'hi' ? 'फॉर्म छुपाएं' : 'Hide Form') : (lang === 'hi' ? 'वीडियो अपलोड करें' : 'Upload Video')}
            </button>
            {showUploadForm && (
              <form
                className="bg-white/95 rounded-2xl shadow-2xl p-6 flex flex-col gap-5 border border-blue-100 animate-fade-in"
                onSubmit={handleUpload}
              >
                <div className="flex flex-col gap-1">
                  <label className="font-semibold mb-1 text-black flex items-center gap-2">
                    <span role="img" aria-label="title">📝</span> {lang === 'hi' ? 'शीर्षक' : 'Title'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.title}
                    onChange={e => setUploadForm(f => ({ ...f, title: e.target.value }))}
                    className="border rounded-lg px-3 py-2 text-black placeholder-black focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none"
                    placeholder={lang === 'hi' ? 'वीडियो का शीर्षक' : 'Video title'}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold mb-1 text-black flex items-center gap-2">
                    <span role="img" aria-label="desc">🗒️</span> {lang === 'hi' ? 'विवरण' : 'Description'}
                  </label>
                  <textarea
                    value={uploadForm.desc}
                    onChange={e => setUploadForm(f => ({ ...f, desc: e.target.value }))}
                    className="border rounded-lg px-3 py-2 text-black placeholder-black focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none"
                    rows={2}
                    placeholder={lang === 'hi' ? 'वीडियो का विवरण' : 'Video description'}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold mb-1 text-black flex items-center gap-2">
                    <span role="img" aria-label="category">🏷️</span> {lang === 'hi' ? 'श्रेणी' : 'Category'} *
                  </label>
                  <select
                    value={uploadForm.category}
                    onChange={e => setUploadForm(f => ({ ...f, category: e.target.value }))}
                    className="border rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none"
                    required
                  >
                    {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                      <option key={cat.key} value={cat.key}>{cat.emoji} {lang === 'hi' ? cat.hi : cat.en}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold mb-1 text-black flex items-center gap-2">
                    <span role="img" aria-label="video">🎥</span> {lang === 'hi' ? 'वीडियो फाइल (MP4/MOV)' : 'Video File (MP4/MOV)'} *
                  </label>
                  <input
                    type="file"
                    accept="video/mp4,video/quicktime"
                    required
                    onChange={e => setUploadForm(f => ({ ...f, file: e.target.files[0] }))}
                    className="border rounded-lg px-3 py-2 text-black bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none"
                  />
                  {uploadForm.file && (
                    <span className="text-xs text-green-700 mt-1">{uploadForm.file.name}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold mb-1 text-black flex items-center gap-2">
                    <span role="img" aria-label="thumbnail">🖼️</span> {lang === 'hi' ? 'थंबनेल (वैकल्पिक)' : 'Thumbnail (optional)'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setUploadForm(f => ({ ...f, thumbnail: e.target.files[0] }))}
                    className="border rounded-lg px-3 py-2 text-black bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none"
                  />
                  {uploadForm.thumbnail && (
                    <span className="text-xs text-green-700 mt-1">{uploadForm.thumbnail.name}</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={uploadStatus === 'uploading'}
                >
                  {uploadStatus === 'uploading' && (
                    <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-white border-t-blue-500 rounded-full"></span>
                  )}
                  {uploadStatus === 'uploading'
                    ? (lang === 'hi' ? 'अपलोड हो रहा है...' : 'Uploading...')
                    : (lang === 'hi' ? 'अपलोड करें' : 'Upload')}
                </button>
                {uploadStatus === 'success' && (
                  <div className="bg-green-100 border border-green-300 text-green-800 font-semibold rounded-lg px-4 py-2 mt-2 text-center">
                    {lang === 'hi' ? 'वीडियो सबमिट हुआ! एडमिन अप्रूवल के बाद दिखेगा।' : 'Video submitted! Will appear after admin approval.'}
                  </div>
                )}
                {uploadStatus === 'error' && (
                  <div className="bg-red-100 border border-red-300 text-red-700 font-semibold rounded-lg px-4 py-2 mt-2 text-center">
                    {uploadError}
                  </div>
                )}
              </form>
            )}
          </DesignerCardBackground>
        )}
        {active === 'upload' && (
          <DesignerCardBackground variant="upload" className="w-full max-w-3xl">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-green-700"><span>🖼️</span> {lang === 'hi' ? 'प्रकाशित वीडियो' : 'Published Videos'}</h3>
            {loadingVideos ? (
              <div className="text-center text-gray-400 py-8">{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {publishedVideos.map(video => (
                  <DesignerCardBackground key={video.id} variant="upload" className="p-3 flex flex-col hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden mb-2 bg-black">
                      <video
                        controls
                        poster={video.thumbnailUrl || undefined}
                        className="w-full h-full rounded-xl"
                        onPlay={() => incrementUploadViews(video.id)}
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        {lang === 'hi' ? 'आपका ब्राउज़र वीडियो प्लेयर सपोर्ट नहीं करता।' : 'Your browser does not support the video player.'}
                      </video>
                    </div>
                    {isAdmin && uploadEditId === video.id ? (
                      <form className="flex flex-col gap-1 mb-2" onSubmit={handleUploadEditSave}>
                        <input type="text" value={uploadEditForm.title} onChange={e => setUploadEditForm(f => ({ ...f, title: e.target.value }))} className="border rounded px-2 py-1 text-black" />
                        <input type="text" value={uploadEditForm.desc} onChange={e => setUploadEditForm(f => ({ ...f, desc: e.target.value }))} className="border rounded px-2 py-1 text-black" />
                        <select value={uploadEditForm.category} onChange={e => setUploadEditForm(f => ({ ...f, category: e.target.value }))} className="border rounded px-2 py-1 text-black">
                          {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                            <option key={cat.key} value={cat.key}>{cat.emoji} {lang === 'hi' ? cat.hi : cat.en}</option>
                          ))}
                        </select>
                        <div className="flex gap-2 mt-1">
                          <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-full font-semibold shadow hover:bg-green-600 transition-all duration-200">{lang === 'hi' ? 'सेव' : 'Save'}</button>
                          <button type="button" onClick={() => setUploadEditId(null)} className="bg-gray-300 text-gray-800 px-2 py-1 rounded-full font-semibold shadow hover:bg-gray-400 transition-all duration-200">{lang === 'hi' ? 'रद्द' : 'Cancel'}</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">🖼️</span>
                          <span className="font-bold text-green-800 text-base">{video.title}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{video.desc}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>👁️ {video.views}</span>
                          <span>•</span>
                          <span>MP4</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => handleUploadEditStart(video)} className="bg-blue-500 text-white px-2 py-1 rounded-full font-semibold shadow hover:bg-blue-600 transition-all duration-200">{lang === 'hi' ? 'एडिट' : 'Edit'}</button>
                          <button onClick={() => handleUploadDelete(video.id)} className="bg-red-500 text-white px-2 py-1 rounded-full font-semibold shadow hover:bg-red-600 transition-all duration-200">{lang === 'hi' ? 'हटाएं' : 'Delete'}</button>
                        </div>
                      </>
                    )}
                  </DesignerCardBackground>
                ))}
                {publishedVideos.length === 0 && (
                  <div className="col-span-full text-center text-gray-400 py-8">
                    {lang === 'hi' ? 'कोई वीडियो नहीं मिला।' : 'No videos found.'}
                  </div>
                )}
              </div>
            )}
          </DesignerCardBackground>
        )}
      </DesignerCardBackground>
    </main>
  );
}

export default Videos;

function AdminLiveRequests() {
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [msg, setMsg] = React.useState('');
  React.useEffect(() => {
    setLoading(true);
    import('firebase/firestore').then(({ collection, getDocs, query, where, orderBy }) => {
      const q = query(collection(db, 'gram_videos_live_requests'), where('status', '==', 'pending'), orderBy('requestedAt', 'desc'));
      getDocs(q).then(snap => {
        setRequests(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });
    });
  }, [msg]);

  async function handleApprove(req) {
    setMsg('');
    try {
      // Set as current live session
      await import('firebase/firestore').then(({ doc, setDoc, deleteDoc }) =>
        Promise.all([
          setDoc(doc(db, 'gram_videos_live', 'main'), {
            isLive: true,
            embedUrl: req.embedUrl,
            title: req.title,
            desc: req.desc,
            requestedBy: req.name || '',
            scheduled: [],
          }),
          deleteDoc(doc(db, 'gram_videos_live_requests', req.id))
        ])
      );
      setMsg('Approved!');
    } catch {
      setMsg('Error approving.');
    }
  }
  async function handleReject(req) {
    setMsg('');
    try {
      await import('firebase/firestore').then(({ doc, deleteDoc }) =>
        deleteDoc(doc(db, 'gram_videos_live_requests', req.id))
      );
      setMsg('Rejected!');
    } catch {
      setMsg('Error rejecting.');
    }
  }

  if (loading) return <div className="text-center text-gray-400 py-4">{msg || (window.navigator.language.startsWith('hi') ? 'लोड हो रहा है...' : 'Loading...')}</div>;
  if (requests.length === 0) return <div className="text-center text-gray-400 py-4">{msg || (window.navigator.language.startsWith('hi') ? 'कोई अनुरोध नहीं।' : 'No requests.')}</div>;
  return (
    <div className="space-y-4">
      {requests.map(req => (
        <div key={req.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border-l-4 border-pink-400">
          <div className="font-bold text-pink-700">{req.title}</div>
          <div className="text-gray-700 text-sm">{req.desc}</div>
          <div className="text-xs text-gray-500">{window.navigator.language.startsWith('hi') ? 'नाम' : 'Name'}: <span className="font-semibold">{req.name}</span></div>
          <div className="text-xs text-gray-500 break-all">URL: <span className="font-mono">{req.embedUrl}</span></div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => handleApprove(req)} className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold shadow hover:bg-green-600 transition-all duration-200">{window.navigator.language.startsWith('hi') ? 'स्वीकृत करें' : 'Approve'}</button>
            <button onClick={() => handleReject(req)} className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold shadow hover:bg-red-600 transition-all duration-200">{window.navigator.language.startsWith('hi') ? 'अस्वीकृत' : 'Reject'}</button>
          </div>
        </div>
      ))}
      {msg && <div className="text-center text-green-700 font-semibold mt-2">{msg}</div>}
    </div>
  );
} 