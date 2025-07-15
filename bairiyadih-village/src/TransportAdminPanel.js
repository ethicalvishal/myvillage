import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DesignerCardBackground from './DesignerCardBackground';

function TransportAdminPanel() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();

  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overrides');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Override data
  const [trainOverrides, setTrainOverrides] = useState([]);
  const [busOverrides, setBusOverrides] = useState([]);
  const [currentTrains, setCurrentTrains] = useState([]);
  const [currentBuses, setCurrentBuses] = useState([]);

  // Alert settings
  const [alertSettings, setAlertSettings] = useState({
    smsEnabled: false,
    emailEnabled: false,
    smsRecipients: '',
    emailRecipients: '',
    delayThreshold: 30
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const authenticate = () => {
    if (adminPassword.length < 6) {
      showMessage('Password must be at least 6 characters', 'error');
      return;
    }
    setIsAuthenticated(true);
    fetchCurrentData();
  };

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const fetchCurrentData = async () => {
    setLoading(true);
    try {
      const [trainsRes, busesRes] = await Promise.all([
        fetch('http://localhost:5000/api/transport/trains'),
        fetch('http://localhost:5000/api/transport/buses')
      ]);
      
      const trainsData = await trainsRes.json();
      const busesData = await busesRes.json();
      
      setCurrentTrains(trainsData.data || []);
      setCurrentBuses(busesData.data || []);
      setTrainOverrides(trainsData.data || []);
      setBusOverrides(busesData.data || []);
    } catch (error) {
      showMessage('Error fetching current data', 'error');
    }
    setLoading(false);
  };

  const saveOverride = async (type) => {
    setLoading(true);
    try {
      const data = type === 'trains' ? trainOverrides : busOverrides;
      const response = await fetch(`http://localhost:5000/api/transport/admin/override/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, data })
      });
      
      const result = await response.json();
      if (result.success) {
        showMessage(`${type} override saved successfully`);
      } else {
        showMessage(result.error || 'Failed to save override', 'error');
      }
    } catch (error) {
      showMessage('Error saving override', 'error');
    }
    setLoading(false);
  };

  const clearOverride = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/transport/admin/clear/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      
      const result = await response.json();
      if (result.success) {
        showMessage(`${type} override cleared`);
        if (type === 'trains') setTrainOverrides(currentTrains);
        if (type === 'buses') setBusOverrides(currentBuses);
      } else {
        showMessage(result.error || 'Failed to clear override', 'error');
      }
    } catch (error) {
      showMessage('Error clearing override', 'error');
    }
    setLoading(false);
  };

  const addTrainOverride = () => {
    const newTrain = {
      id: trainOverrides.length + 1,
      trainNumber: '',
      trainName: '',
      departure: '',
      arrival: '',
      duration: '',
      status: 'on-time',
      platform: '1',
      delay: 0
    };
    setTrainOverrides([...trainOverrides, newTrain]);
  };

  const addBusOverride = () => {
    const newBus = {
      id: busOverrides.length + 1,
      busNumber: '',
      operator: '',
      departure: '',
      arrival: '',
      duration: '',
      fare: 0,
      status: 'running',
      type: 'Non-AC',
      seats: 50
    };
    setBusOverrides([...busOverrides, newBus]);
  };

  const updateTrainOverride = (index, field, value) => {
    const updated = [...trainOverrides];
    updated[index] = { ...updated[index], [field]: value };
    setTrainOverrides(updated);
  };

  const updateBusOverride = (index, field, value) => {
    const updated = [...busOverrides];
    updated[index] = { ...updated[index], [field]: value };
    setBusOverrides(updated);
  };

  const removeTrainOverride = (index) => {
    setTrainOverrides(trainOverrides.filter((_, i) => i !== index));
  };

  const removeBusOverride = (index) => {
    setBusOverrides(busOverrides.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col items-center mt-8 px-4 relative">
        <div className="w-full max-w-6xl mb-4 relative z-10">
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <span role="img" aria-label="back">⬅️</span>
            {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
          </button>
        </div>

        <DesignerCardBackground variant="default">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-800 mb-6 flex items-center justify-center gap-3">
              <span role="img" aria-label="admin" className="text-4xl">🔐</span>
              {lang === 'hi' ? 'यातायात प्रशासन पैनल' : 'Transport Admin Panel'}
            </h2>
            <p className="text-gray-600 mb-6">
              {lang === 'hi' 
                ? 'सिस्टम प्रशासक के लिए सुरक्षित पहुंच'
                : 'Secure access for system administrators'
              }
            </p>
            
            <div className="max-w-md mx-auto">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder={lang === 'hi' ? 'प्रशासक पासवर्ड दर्ज करें' : 'Enter admin password'}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && authenticate()}
              />
              <button
                onClick={authenticate}
                className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg text-lg"
              >
                {lang === 'hi' ? 'प्रवेश करें' : 'Access Panel'}
              </button>
            </div>
          </div>
        </DesignerCardBackground>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center mt-8 px-4 relative">
      <div className="w-full max-w-7xl mb-4 relative z-10">
        <button 
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <span role="img" aria-label="back">⬅️</span>
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>

      {message && (
        <div className={`w-full max-w-7xl mb-6 p-4 rounded-2xl ${
          messageType === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-7xl w-full border-l-8 border-red-400 mb-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="admin" className="text-5xl">🔐</span>
            {lang === 'hi' ? 'यातायात प्रशासन पैनल' : 'Transport Admin Panel'}
          </h1>
          <div className="h-1 w-40 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">
            {lang === 'hi' ? 'सिस्टम प्रबंधन और ओवरराइड' : 'System Management & Overrides'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('overrides')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'overrides' 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              {lang === 'hi' ? 'ओवरराइड' : 'Overrides'}
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'alerts' 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              {lang === 'hi' ? 'अलर्ट' : 'Alerts'}
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'system' 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              {lang === 'hi' ? 'सिस्टम' : 'System'}
            </button>
          </div>
        </div>

        {/* Overrides Tab */}
        {activeTab === 'overrides' && (
          <div className="space-y-6">
            {/* Train Overrides */}
            <DesignerCardBackground variant="default">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  🚆 {lang === 'hi' ? 'ट्रेन ओवरराइड' : 'Train Overrides'}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => clearOverride('trains')}
                    disabled={loading}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    {lang === 'hi' ? 'क्लियर' : 'Clear'}
                  </button>
                  <button
                    onClick={() => saveOverride('trains')}
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {lang === 'hi' ? 'सेव' : 'Save'}
                  </button>
                  <button
                    onClick={addTrainOverride}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left">Train #</th>
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Departure</th>
                      <th className="px-3 py-2 text-left">Arrival</th>
                      <th className="px-3 py-2 text-left">Status</th>
                      <th className="px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainOverrides.map((train, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={train.trainNumber}
                            onChange={(e) => updateTrainOverride(index, 'trainNumber', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={train.trainName}
                            onChange={(e) => updateTrainOverride(index, 'trainName', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={train.departure}
                            onChange={(e) => updateTrainOverride(index, 'departure', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={train.arrival}
                            onChange={(e) => updateTrainOverride(index, 'arrival', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={train.status}
                            onChange={(e) => updateTrainOverride(index, 'status', e.target.value)}
                            className="w-full p-1 border rounded"
                          >
                            <option value="on-time">On Time</option>
                            <option value="delayed">Delayed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeTrainOverride(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DesignerCardBackground>

            {/* Bus Overrides */}
            <DesignerCardBackground variant="default">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  🚌 {lang === 'hi' ? 'बस ओवरराइड' : 'Bus Overrides'}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => clearOverride('buses')}
                    disabled={loading}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    {lang === 'hi' ? 'क्लियर' : 'Clear'}
                  </button>
                  <button
                    onClick={() => saveOverride('buses')}
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {lang === 'hi' ? 'सेव' : 'Save'}
                  </button>
                  <button
                    onClick={addBusOverride}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left">Bus #</th>
                      <th className="px-3 py-2 text-left">Operator</th>
                      <th className="px-3 py-2 text-left">Departure</th>
                      <th className="px-3 py-2 text-left">Fare</th>
                      <th className="px-3 py-2 text-left">Status</th>
                      <th className="px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {busOverrides.map((bus, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={bus.busNumber}
                            onChange={(e) => updateBusOverride(index, 'busNumber', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={bus.operator}
                            onChange={(e) => updateBusOverride(index, 'operator', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={bus.departure}
                            onChange={(e) => updateBusOverride(index, 'departure', e.target.value)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={bus.fare}
                            onChange={(e) => updateBusOverride(index, 'fare', parseInt(e.target.value) || 0)}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={bus.status}
                            onChange={(e) => updateBusOverride(index, 'status', e.target.value)}
                            className="w-full p-1 border rounded"
                          >
                            <option value="running">Running</option>
                            <option value="delayed">Delayed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeBusOverride(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DesignerCardBackground>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <DesignerCardBackground variant="default">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              🔔 {lang === 'hi' ? 'अलर्ट सेटिंग्स' : 'Alert Settings'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">SMS Alerts</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alertSettings.smsEnabled}
                      onChange={(e) => setAlertSettings({...alertSettings, smsEnabled: e.target.checked})}
                      className="mr-2"
                    />
                    {lang === 'hi' ? 'SMS अलर्ट सक्षम करें' : 'Enable SMS Alerts'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'hi' ? 'फोन नंबर (कॉमा से अलग)' : 'Phone numbers (comma separated)'}
                    value={alertSettings.smsRecipients}
                    onChange={(e) => setAlertSettings({...alertSettings, smsRecipients: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Email Alerts</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alertSettings.emailEnabled}
                      onChange={(e) => setAlertSettings({...alertSettings, emailEnabled: e.target.checked})}
                      className="mr-2"
                    />
                    {lang === 'hi' ? 'ईमेल अलर्ट सक्षम करें' : 'Enable Email Alerts'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'hi' ? 'ईमेल (कॉमा से अलग)' : 'Emails (comma separated)'}
                    value={alertSettings.emailRecipients}
                    onChange={(e) => setAlertSettings({...alertSettings, emailRecipients: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'hi' ? 'देरी सीमा (मिनट)' : 'Delay Threshold (minutes)'}
              </label>
              <input
                type="number"
                value={alertSettings.delayThreshold}
                onChange={(e) => setAlertSettings({...alertSettings, delayThreshold: parseInt(e.target.value) || 30})}
                className="w-full p-3 border rounded-lg"
                min="5"
                max="120"
              />
            </div>
            
            <button
              onClick={() => showMessage('Alert settings saved', 'success')}
              className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              {lang === 'hi' ? 'सेटिंग्स सेव करें' : 'Save Settings'}
            </button>
          </DesignerCardBackground>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <DesignerCardBackground variant="default">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              ⚙️ {lang === 'hi' ? 'सिस्टम प्रबंधन' : 'System Management'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  {lang === 'hi' ? 'डेटा रिफ्रेश' : 'Data Refresh'}
                </h4>
                <button
                  onClick={() => showMessage('Data refresh initiated', 'success')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {lang === 'hi' ? 'अभी रिफ्रेश करें' : 'Refresh Now'}
                </button>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  {lang === 'hi' ? 'सिस्टम स्थिति' : 'System Status'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{lang === 'hi' ? 'API कनेक्शन:' : 'API Connection:'}</span>
                    <span className="text-green-600">✓ {lang === 'hi' ? 'सक्रिय' : 'Active'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'hi' ? 'अंतिम अपडेट:' : 'Last Update:'}</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'hi' ? 'सक्रिय अलर्ट:' : 'Active Alerts:'}</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </DesignerCardBackground>
        )}
      </div>
    </main>
  );
}

export default TransportAdminPanel; 