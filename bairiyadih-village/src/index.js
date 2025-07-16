import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';
// import '@fontsource/noto-sans-devanagari';
// import '@fontsource/roboto';

// Modern Loading Component
function LoadingScreen() {
  return (
    <div id="loader" className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <div className="text-center">
        <div className="relative">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-large mb-6 mx-auto animate-pulse-gentle">
            <span className="text-white text-3xl font-bold">🏘️</span>
          </div>
          
          {/* Loading Spinner */}
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            बैरियाडीह ग्राम पोर्टल
          </h2>
          <p className="text-neutral-600">
            Bairiyadih Village Portal
          </p>
          
          {/* Progress Bar */}
          <div className="w-48 h-1 bg-primary-200 rounded-full mt-6 mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Render loading screen first
const loadingRoot = ReactDOM.createRoot(document.getElementById('root'));
loadingRoot.render(<LoadingScreen />);

// Initialize app after a short delay for better UX
setTimeout(() => {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
}, 1500);

// Performance monitoring
reportWebVitals(console.log);

// Automatically unregister all service workers on page load (for development error fix)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service worker unregistered:', registration);
    }
  });
}

// Service worker registration block removed to prevent repeated MIME type errors in development.
