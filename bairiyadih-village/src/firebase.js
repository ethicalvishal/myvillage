// Replace the below config with your own Firebase project config
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXN4xanmzSEJfnXDSFfeXodeZOSZ0qOJU",
  authDomain: "bairiyadihportal.firebaseapp.com",
  projectId: "bairiyadihportal",
  storageBucket: "bairiyadihportal.firebasestorage.app",
  messagingSenderId: "844313352527",
  appId: "1:844313352527:web:214fac13a835c52cb84d3a",
  measurementId: "G-07E9VEXPVJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); 
export const analytics = getAnalytics(app);