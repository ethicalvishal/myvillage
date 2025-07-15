import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db, storage } from './firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function PremiumPDFSection() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    pdfFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [pdfs, setPdfs] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [purchaseForm, setPurchaseForm] = useState({ name: '', phone: '', paymentProof: null });
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState('');
  const [purchaseError, setPurchaseError] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    async function fetchPDFs() {
      setFetching(true);
      const snap = await getDocs(collection(db, 'premium_pdfs'));
      setPdfs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setFetching(false);
    }
    fetchPDFs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((f) => ({ ...f, [name]: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      let pdfUrl = '';
      if (form.pdfFile) {
        const pdfRef = ref(storage, `premium_pdfs/${Date.now()}_${form.pdfFile.name}`);
        await uploadBytes(pdfRef, form.pdfFile);
        pdfUrl = await getDownloadURL(pdfRef);
      }
      await addDoc(collection(db, 'premium_pdfs'), {
        title: form.title,
        description: form.description,
        price: form.price,
        pdfUrl,
        uploadedAt: serverTimestamp(),
      });
      setSuccess(i18n.language === 'hi' ? 'PDF सफलतापूर्वक अपलोड हुआ!' : 'PDF uploaded successfully!');
      setForm({ title: '', description: '', price: '', pdfFile: null });
    } catch (err) {
      setError(i18n.language === 'hi' ? 'कुछ गलत हो गया, कृपया पुनः प्रयास करें।' : 'Something went wrong, please try again.');
    }
    setLoading(false);
  };

  // Fetch user's purchases by phone
  const handleFetchPurchases = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, 'pdf_purchases'), where('phone', '==', userPhone), where('status', '==', 'approved'));
      const snap = await getDocs(q);
      setUserPurchases(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      // ignore
    }
  };

  // Check if user has access to a PDF
  const userHasAccess = (pdfId) => userPurchases.some(p => p.pdfId === pdfId && p.status === 'approved');

  // Handle purchase request
  const handlePurchase = (pdf) => {
    setSelectedPdf(pdf);
    setShowPurchaseModal(true);
    setPurchaseForm({ name: '', phone: '', paymentProof: null });
    setPurchaseSuccess('');
    setPurchaseError('');
  };

  const handlePurchaseChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setPurchaseForm((f) => ({ ...f, [name]: files[0] }));
    } else {
      setPurchaseForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    setPurchaseLoading(true);
    setPurchaseError('');
    setPurchaseSuccess('');
    try {
      let paymentProofUrl = '';
      if (purchaseForm.paymentProof) {
        const payRef = ref(storage, `pdf_purchases/payments/${Date.now()}_${purchaseForm.paymentProof.name}`);
        await uploadBytes(payRef, purchaseForm.paymentProof);
        paymentProofUrl = await getDownloadURL(payRef);
      }
      await addDoc(collection(db, 'pdf_purchases'), {
        pdfId: selectedPdf.id,
        name: purchaseForm.name,
        phone: purchaseForm.phone,
        paymentProofUrl,
        status: 'pending',
        requestedAt: serverTimestamp(),
      });
      setPurchaseSuccess(i18n.language === 'hi' ? 'खरीद अनुरोध सबमिट हुआ! स्वीकृति के बाद डाउनलोड उपलब्ध होगा।' : 'Purchase request submitted! Download will be available after approval.');
      setPurchaseForm({ name: '', phone: '', paymentProof: null });
    } catch (err) {
      setPurchaseError(i18n.language === 'hi' ? 'कुछ गलत हो गया, कृपया पुनः प्रयास करें।' : 'Something went wrong, please try again.');
    }
    setPurchaseLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white/90 rounded-2xl shadow-xl border border-yellow-200 backdrop-blur-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
      >
        <span className="text-xl">⬅️</span> {i18n.language === 'hi' ? 'वापस जाएं' : 'Go Back'}
      </button>
      <h2 className="text-3xl font-bold text-yellow-800 mb-4 flex items-center gap-2 justify-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
        <span role="img" aria-label="pdf">📄</span>
        {i18n.language === 'hi' ? 'प्रीमियम पीडीएफ / गाइड्स डाउनलोड' : 'Premium PDFs / Guides Download'}
      </h2>
      <div className="h-1 w-24 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"></div>
      {/* Admin Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'शीर्षक' : 'Title'} *</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'विवरण' : 'Description'}</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={2} />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'मूल्य (₹)' : 'Price (₹)'} *</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required className="w-full border rounded px-3 py-2" min="1" />
        </div>
        <div>
          <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'PDF फाइल अपलोड करें' : 'Upload PDF File'} *</label>
          <input type="file" name="pdfFile" accept="application/pdf" onChange={handleChange} required className="w-full" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium">
          {loading ? (i18n.language === 'hi' ? 'अपलोड कर रहे हैं...' : 'Uploading...') : (i18n.language === 'hi' ? 'PDF अपलोड करें' : 'Upload PDF')}
        </button>
        {success && <div className="text-green-700 font-semibold mt-2">{success}</div>}
        {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
      </form>
      {/* List of Premium PDFs */}
      <h3 className="text-xl font-bold text-yellow-700 mb-2">{i18n.language === 'hi' ? 'उपलब्ध प्रीमियम पीडीएफ' : 'Available Premium PDFs'}</h3>
      <form onSubmit={handleFetchPurchases} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="tel"
          value={userPhone}
          onChange={e => setUserPhone(e.target.value)}
          placeholder={i18n.language === 'hi' ? 'अपना फोन नंबर डालें (खरीदी देखने के लिए)' : 'Enter your phone number (to view purchases)'}
          className="flex-1 border rounded px-3 py-2"
          required
        />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 font-medium">
          {i18n.language === 'hi' ? 'खरीदी देखें' : 'View Purchases'}
        </button>
      </form>
      {fetching ? (
        <div className="text-gray-500 mb-2">{i18n.language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</div>
      ) : pdfs.length === 0 ? (
        <div className="text-gray-500 mb-2">{i18n.language === 'hi' ? 'कोई पीडीएफ उपलब्ध नहीं है।' : 'No PDFs available yet.'}</div>
      ) : (
        <div className="space-y-4">
          {pdfs.map(pdf => (
            <div key={pdf.id} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-left shadow-xl flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 hover:shadow-2xl mb-4">
              <div className="font-bold text-yellow-800 text-lg mb-1">{pdf.title}</div>
              <div className="text-sm text-gray-700 mb-1">{pdf.description}</div>
              <div className="text-xs text-yellow-700 mb-1">{i18n.language === 'hi' ? 'मूल्य:' : 'Price:'} ₹{pdf.price}</div>
              {userHasAccess(pdf.id) && pdf.pdfUrl ? (
                <a href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs mb-2">
                  {i18n.language === 'hi' ? 'PDF डाउनलोड करें' : 'Download PDF'}
                </a>
              ) : (
                <button onClick={() => handlePurchase(pdf)} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 text-sm mt-2">
                  {i18n.language === 'hi' ? 'एक्सेस के लिए अनुरोध करें' : 'Request Access'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {userPurchases.length > 0 && (
        <div className="space-y-4 mb-6">
          {userPurchases.map(p => {
            const pdf = pdfs.find(pdf => pdf.id === p.pdfId);
            return (
              <div key={p.id} className="bg-yellow-100 border border-yellow-300 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 hover:shadow-2xl mb-4">
                <div className="font-bold text-yellow-800 text-lg mb-1">{pdf?.title || 'PDF'}</div>
                <div className="text-sm text-gray-700 mb-1">{pdf?.description}</div>
                <div className="text-xs text-yellow-700 mb-1">{i18n.language === 'hi' ? 'स्थिति:' : 'Status:'} {i18n.language === 'hi'
                  ? (p.status === 'pending' ? 'लंबित' : p.status === 'approved' ? 'स्वीकृत' : 'अस्वीकृत')
                  : p.status.charAt(0).toUpperCase() + p.status.slice(1)}</div>
                {p.adminResponse && (
                  <div className="text-xs text-blue-700 mt-1">{i18n.language === 'hi' ? 'एडमिन उत्तर:' : 'Admin Response:'} {p.adminResponse}</div>
                )}
                {p.status === 'approved' && pdf?.pdfUrl && (
                  <a href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs mt-2 block">
                    {i18n.language === 'hi' ? 'PDF डाउनलोड करें' : 'Download PDF'}
                  </a>
                )}
                {p.status === 'pending' && (
                  <div className="text-xs text-yellow-700 mt-2">{i18n.language === 'hi' ? 'प्रशासन की स्वीकृति की प्रतीक्षा कर रहा है।' : 'Waiting for admin approval.'}</div>
                )}
                {p.status === 'rejected' && (
                  <div className="text-xs text-red-700 mt-2">{i18n.language === 'hi' ? 'खरीद अस्वीकृत।' : 'Purchase rejected.'}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full relative">
            <button onClick={() => setShowPurchaseModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✕</button>
            <h4 className="text-lg font-bold text-yellow-800 mb-2">{i18n.language === 'hi' ? 'खरीद अनुरोध' : 'Purchase Request'}</h4>
            <form onSubmit={handlePurchaseSubmit} className="space-y-3">
              <div>
                <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'नाम' : 'Name'} *</label>
                <input type="text" name="name" value={purchaseForm.name} onChange={handlePurchaseChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'फोन नंबर' : 'Phone Number'} *</label>
                <input type="tel" name="phone" value={purchaseForm.phone} onChange={handlePurchaseChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">{i18n.language === 'hi' ? 'भुगतान स्क्रीनशॉट (₹' + selectedPdf.price + ')' : 'Payment Screenshot (₹' + selectedPdf.price + ')'} *</label>
                <input type="file" name="paymentProof" accept="image/*" onChange={handlePurchaseChange} required className="w-full" />
              </div>
              <button type="submit" disabled={purchaseLoading} className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 font-medium">
                {purchaseLoading ? (i18n.language === 'hi' ? 'सबमिट कर रहे हैं...' : 'Submitting...') : (i18n.language === 'hi' ? 'अनुरोध भेजें' : 'Submit Request')}
              </button>
              {purchaseSuccess && <div className="text-green-700 font-semibold mt-2">{purchaseSuccess}</div>}
              {purchaseError && <div className="text-red-600 font-semibold mt-2">{purchaseError}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PremiumPDFSection; 