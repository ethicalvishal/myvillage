import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DesignerCardBackground from './DesignerCardBackground';

function TransportDashboard() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'hi';
  const navigate = useNavigate();

  // State management
  const [trainData, setTrainData] = useState([]);
  const [busData, setBusData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState('motihari-patna');
  const [fareEstimate, setFareEstimate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for demonstration (replace with real API calls)
  const mockTrainData = [
    {
      id: 1,
      trainNumber: '15273',
      trainName: 'Bapudham Motihari - Patna MEMU',
      departure: '06:15',
      arrival: '07:45',
      duration: '1h 30m',
      status: 'on-time',
      platform: '1',
      delay: 0
    },
    {
      id: 2,
      trainNumber: '15274',
      trainName: 'Patna - Bapudham Motihari MEMU',
      departure: '08:30',
      arrival: '10:00',
      duration: '1h 30m',
      status: 'delayed',
      platform: '2',
      delay: 15
    },
    {
      id: 3,
      trainNumber: '15275',
      trainName: 'Bapudham Motihari - Patna MEMU',
      departure: '12:45',
      arrival: '14:15',
      duration: '1h 30m',
      status: 'on-time',
      platform: '1',
      delay: 0
    },
    {
      id: 4,
      trainNumber: '15276',
      trainName: 'Patna - Bapudham Motihari MEMU',
      departure: '16:20',
      arrival: '17:50',
      duration: '1h 30m',
      status: 'cancelled',
      platform: '2',
      delay: 0
    },
    {
      id: 5,
      trainNumber: '15277',
      trainName: 'Bapudham Motihari - Patna MEMU',
      departure: '19:30',
      arrival: '21:00',
      duration: '1h 30m',
      status: 'on-time',
      platform: '1',
      delay: 0
    }
  ];

  const mockBusData = [
    {
      id: 1,
      busNumber: 'BR-01',
      operator: 'Bihar State Road Transport',
      departure: '05:30',
      arrival: '09:00',
      duration: '3h 30m',
      fare: 220,
      status: 'running',
      type: 'AC Sleeper',
      seats: 45
    },
    {
      id: 2,
      busNumber: 'BR-02',
      operator: 'Private Operator',
      departure: '07:00',
      arrival: '10:30',
      duration: '3h 30m',
      fare: 250,
      status: 'running',
      type: 'Non-AC',
      seats: 52
    },
    {
      id: 3,
      busNumber: 'BR-03',
      operator: 'Bihar State Road Transport',
      departure: '09:30',
      arrival: '13:00',
      duration: '3h 30m',
      fare: 220,
      status: 'delayed',
      type: 'AC Sleeper',
      seats: 45
    },
    {
      id: 4,
      busNumber: 'BR-04',
      operator: 'Private Operator',
      departure: '12:00',
      arrival: '15:30',
      duration: '3h 30m',
      fare: 250,
      status: 'running',
      type: 'Non-AC',
      seats: 52
    },
    {
      id: 5,
      busNumber: 'BR-05',
      operator: 'Bihar State Road Transport',
      departure: '14:30',
      arrival: '18:00',
      duration: '3h 30m',
      fare: 220,
      status: 'running',
      type: 'AC Sleeper',
      seats: 45
    }
  ];

  const mockAlerts = [
    {
      id: 1,
      type: 'delay',
      message: 'Train 15274 is delayed by 15 minutes due to technical issues',
      severity: 'warning',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 2,
      type: 'cancellation',
      message: 'Train 15276 has been cancelled due to maintenance work',
      severity: 'error',
      timestamp: new Date(Date.now() - 60 * 60 * 1000)
    }
  ];

  // Bus routes and stops
  const busRoutes = {
    'motihari-patna': {
      name: lang === 'hi' ? 'मोतिहारी - पटना' : 'Motihari - Patna',
      stops: [
        'Motihari Bus Stand',
        'Harsidhi',
        'Sugauli',
        'Raxaul',
        'Bettiah',
        'Muzaffarpur',
        'Hajipur',
        'Patna Junction'
      ],
      baseFare: 220,
      distance: '150 km',
      duration: '3.5-5 hours'
    },
    'motihari-darbhanga': {
      name: lang === 'hi' ? 'मोतिहारी - दरभंगा' : 'Motihari - Darbhanga',
      stops: [
        'Motihari Bus Stand',
        'Harsidhi',
        'Sugauli',
        'Raxaul',
        'Bettiah',
        'Muzaffarpur',
        'Darbhanga Junction'
      ],
      baseFare: 180,
      distance: '120 km',
      duration: '3-4 hours'
    }
  };

  // Fetch train data (mock implementation)
  const fetchTrainData = useCallback(async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTrainData(mockTrainData);
    } catch (error) {
      console.error('Error fetching train data:', error);
    }
  }, []);

  // Fetch bus data (mock implementation)
  const fetchBusData = useCallback(async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBusData(mockBusData);
    } catch (error) {
      console.error('Error fetching bus data:', error);
    }
  }, []);

  // Calculate fare estimate
  const calculateFare = useCallback((route) => {
    const selectedRouteData = busRoutes[route];
    if (!selectedRouteData) return null;

    // Add some variation based on time and demand
    const timeVariation = Math.random() * 0.2 + 0.9; // ±10% variation
    const estimatedFare = Math.round(selectedRouteData.baseFare * timeVariation);
    
    return {
      base: selectedRouteData.baseFare,
      estimated: estimatedFare,
      variation: Math.round((estimatedFare - selectedRouteData.baseFare) / selectedRouteData.baseFare * 100)
    };
  }, []);

  // Update data periodically
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchTrainData(), fetchBusData()]);
      setLoading(false);
      setLastUpdated(new Date());
    };

    fetchData();

    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchTrainData, fetchBusData]);

  // Calculate fare when route changes
  useEffect(() => {
    const fare = calculateFare(selectedRoute);
    setFareEstimate(fare);
  }, [selectedRoute, calculateFare]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time': return '🟢';
      case 'delayed': return '🟡';
      case 'cancelled': return '🔴';
      case 'running': return '🟢';
      default: return '⚪';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'on-time': return lang === 'hi' ? 'समय पर' : 'On Time';
      case 'delayed': return lang === 'hi' ? 'देरी' : 'Delayed';
      case 'cancelled': return lang === 'hi' ? 'रद्द' : 'Cancelled';
      case 'running': return lang === 'hi' ? 'चल रहा' : 'Running';
      default: return lang === 'hi' ? 'अज्ञात' : 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
      case 'running': return 'text-green-600 bg-green-100';
      case 'delayed': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <main className="flex flex-col items-center mt-8 px-4 relative min-h-screen">
      {/* Back Button */}
      <div className="w-full max-w-7xl mb-4 relative z-10">
        <button 
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <span role="img" aria-label="back">⬅️</span>
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>

      {/* Real-time Alert Banner */}
      {alerts.length > 0 && (
        <div className="w-full max-w-7xl mb-6">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <h4 className="font-bold text-lg">
                    {lang === 'hi' ? 'यातायात सूचना' : 'Transport Alert'}
                  </h4>
                  <p className="text-sm opacity-90">
                    {alerts[0].message}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setAlerts(alerts.slice(1))}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-7xl w-full border-l-8 border-green-400 mb-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-3 flex items-center justify-center gap-3">
            <span role="img" aria-label="transport" className="text-5xl">🚄</span>
            {lang === 'hi' ? 'बैरियाडीह गाँव यातायात डैशबोर्ड' : 'Bairiyadih Village Transport Dashboard'}
          </h1>
          <div className="h-1 w-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {lang === 'hi'
              ? 'वास्तविक समय की ट्रेन और बस जानकारी, लाइव ट्रैकिंग और यात्रा योजना'
              : 'Real-time train and bus information, live tracking, and travel planning'}
          </p>
          
          {/* Last Updated */}
          <div className="mt-4 text-sm text-gray-500">
            {lang === 'hi' ? 'अंतिम अपडेट:' : 'Last Updated:'} {lastUpdated.toLocaleTimeString()}
            {loading && (
              <span className="ml-2 text-blue-500 animate-pulse">
                {lang === 'hi' ? 'अपडेट हो रहा है...' : 'Updating...'}
              </span>
            )}
          </div>
        </div>

        {/* Live Train Widget */}
        <DesignerCardBackground variant="default">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
              🚄 {lang === 'hi' ? 'लाइव ट्रेन जानकारी' : 'Live Train Information'}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {lang === 'hi' ? 'सेमरा → मोतिहारी' : 'Semra → Motihari'}
              </span>
              <button 
                onClick={() => window.open('https://www.railyatri.in/trains-between-stations/semra-sra-to-bapudham-motihari-bmki', '_blank')}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                {lang === 'hi' ? 'ट्रैक करें' : 'Track'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">
                {lang === 'hi' ? 'ट्रेन जानकारी लोड हो रही है...' : 'Loading train information...'}
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-green-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      {lang === 'hi' ? 'ट्रेन' : 'Train'}
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      {lang === 'hi' ? 'प्रस्थान' : 'Departure'}
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      {lang === 'hi' ? 'आगमन' : 'Arrival'}
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      {lang === 'hi' ? 'अवधि' : 'Duration'}
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      {lang === 'hi' ? 'स्थिति' : 'Status'}
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      {lang === 'hi' ? 'प्लेटफॉर्म' : 'Platform'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainData.slice(0, 5).map((train) => (
                    <tr key={train.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-semibold text-gray-800">{train.trainNumber}</div>
                          <div className="text-sm text-gray-600">{train.trainName}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">{train.departure}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{train.arrival}</td>
                      <td className="px-4 py-3 text-gray-600">{train.duration}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(train.status)}`}>
                          {getStatusIcon(train.status)} {getStatusText(train.status)}
                          {train.delay > 0 && ` (+${train.delay}m)`}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{train.platform}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DesignerCardBackground>

        {/* Live Bus Information */}
        <DesignerCardBackground variant="default">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
              🚌 {lang === 'hi' ? 'लाइव बस जानकारी' : 'Live Bus Information'}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {lang === 'hi' ? 'मोतिहारी → पटना' : 'Motihari → Patna'}
              </span>
              <button 
                onClick={() => window.open('https://www.redbus.in/bus-tickets/motihari-to-patna', '_blank')}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                {lang === 'hi' ? 'बुक करें' : 'Book'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <span className="ml-2 text-gray-600">
                {lang === 'hi' ? 'बस जानकारी लोड हो रही है...' : 'Loading bus information...'}
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {busData.slice(0, 6).map((bus) => (
                <div key={bus.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🚌</span>
                      <div>
                        <div className="font-semibold text-black">{bus.busNumber}</div>
                        <div className="text-xs text-black">{bus.operator}</div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bus.status)}`}>
                      {getStatusIcon(bus.status)} {getStatusText(bus.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black">{lang === 'hi' ? 'प्रस्थान:' : 'Departure:'}</span>
                      <span className="font-medium text-black">{bus.departure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">{lang === 'hi' ? 'आगमन:' : 'Arrival:'}</span>
                      <span className="font-medium text-black">{bus.arrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">{lang === 'hi' ? 'किराया:' : 'Fare:'}</span>
                      <span className="font-medium text-green-600">₹{bus.fare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">{lang === 'hi' ? 'प्रकार:' : 'Type:'}</span>
                      <span className="font-medium text-black">{bus.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DesignerCardBackground>

        {/* Google Maps Integration */}
        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
            🗺️ {lang === 'hi' ? 'गाँव का नक्शा और मार्ग' : 'Village Map & Routes'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Embed */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">
                {lang === 'hi' ? 'बैरियाडीह गाँव का नक्शा' : 'Bairiyadih Village Map'}
              </h4>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🗺️</span>
                  <p className="text-gray-600 mb-2">
                    {lang === 'hi' ? 'Google Maps एम्बेड' : 'Google Maps Embed'}
                  </p>
                  <button 
                    onClick={() => window.open('https://maps.google.com/?q=Bairiyadih+Harsidhi+Purvi+Champaran+Bihar+845435', '_blank')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {lang === 'hi' ? 'मैप खोलें' : 'Open Map'}
                  </button>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">
                {lang === 'hi' ? 'मुख्य मार्ग' : 'Key Routes'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-2xl">🚆</span>
                  <div>
                    <div className="font-medium text-gray-800">Bairiyadih → Semra Station</div>
                    <div className="text-sm text-gray-600">5 km • 15-20 minutes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl">🚌</span>
                  <div>
                    <div className="font-medium text-gray-800">Bairiyadih → Motihari Bus Stand</div>
                    <div className="text-sm text-gray-600">25 km • 45-60 minutes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-2xl">✈️</span>
                  <div>
                    <div className="font-medium text-gray-800">Bairiyadih → Patna Airport</div>
                    <div className="text-sm text-gray-600">150 km • 3.5-4 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        {/* Fare Calculator */}
        <DesignerCardBackground variant="default">
          <h3 className={`text-2xl font-bold mb-6 gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
            🧮 {lang === 'hi' ? 'किराया कैलकुलेटर' : 'Fare Calculator'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Route Selection */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">
                {lang === 'hi' ? 'मार्ग चुनें' : 'Select Route'}
              </h4>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {Object.entries(busRoutes).map(([key, route]) => (
                  <option key={key} value={key}>
                    {route.name}
                  </option>
                ))}
              </select>
              
              {fareEstimate && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    {lang === 'hi' ? 'किराया अनुमान' : 'Fare Estimate'}
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black">{lang === 'hi' ? 'आधार किराया:' : 'Base Fare:'}</span>
                      <span className="font-medium text-black">₹{fareEstimate.base}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">{lang === 'hi' ? 'अनुमानित किराया:' : 'Estimated Fare:'}</span>
                      <span className="font-medium text-green-600">₹{fareEstimate.estimated}</span>
                    </div>
                    {fareEstimate.variation !== 0 && (
                      <div className="flex justify-between">
                        <span className="text-black">{lang === 'hi' ? 'भिन्नता:' : 'Variation:'}</span>
                        <span className={`font-medium ${fareEstimate.variation > 0 ? 'text-red-600' : 'text-green-600'}`}>{fareEstimate.variation > 0 ? '+' : ''}{fareEstimate.variation}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bus Stops */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">
                {lang === 'hi' ? 'बस स्टॉप' : 'Bus Stops'}
              </h4>
              <div className="space-y-2">
                {busRoutes[selectedRoute]?.stops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-black">{stop}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DesignerCardBackground>

        {/* Quick Links */}
        <DesignerCardBackground variant="default">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold gradient-text ${lang === 'hi' ? 'hindi-heading' : ''}`}>
              🔗 {lang === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
            </h3>
            <button
              onClick={() => navigate('/transport-admin')}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
            >
              🔐 {lang === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="https://www.irctc.co.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-center"
            >
              <span className="text-2xl block mb-2">🚆</span>
              <div className="font-semibold">IRCTC</div>
              <div className="text-xs opacity-90">{lang === 'hi' ? 'ट्रेन बुकिंग' : 'Train Booking'}</div>
            </a>
            
            <a 
              href="https://www.redbus.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-center"
            >
              <span className="text-2xl block mb-2">🚌</span>
              <div className="font-semibold">RedBus</div>
              <div className="text-xs opacity-90">{lang === 'hi' ? 'बस बुकिंग' : 'Bus Booking'}</div>
            </a>
            
            <a 
              href="https://www.railyatri.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 text-center"
            >
              <span className="text-2xl block mb-2">📱</span>
              <div className="font-semibold">RailYatri</div>
              <div className="text-xs opacity-90">{lang === 'hi' ? 'ट्रेन ट्रैकिंग' : 'Train Tracking'}</div>
            </a>
            
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-center"
            >
              <span className="text-2xl block mb-2">🗺️</span>
              <div className="font-semibold">Google Maps</div>
              <div className="text-xs opacity-90">{lang === 'hi' ? 'मार्गदर्शन' : 'Navigation'}</div>
            </a>
          </div>
        </DesignerCardBackground>
      </div>

      {/* Subtle Background SVG Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="transport-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-green-400"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#transport-pattern)"/>
        </svg>
      </div>
    </main>
  );
}

export default TransportDashboard; 