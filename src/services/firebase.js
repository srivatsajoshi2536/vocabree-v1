/**
 * Firebase configuration and initialization
 * 
 * IMPORTANT: Replace the placeholder values with your actual Firebase config
 * Get your config from Firebase Console > Project Settings > General > Your apps
 */

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHi_c9qaQEK8QyoMWR3AqZ4qMUakjra6M",
  authDomain: "bashalearn.firebaseapp.com",
  projectId: "bashalearn",
  storageBucket: "bashalearn.firebasestorage.app",
  messagingSenderId: "438861089388",
  appId: "1:438861089388:web:8f3aecf133890ff3cd2649",
  measurementId: "G-FXPQ0NR14R"
};

// Initialize Firebase with error handling
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Auth with AsyncStorage persistence
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (error) {
    // If initializeAuth fails (e.g., already initialized), use getAuth
    console.warn('initializeAuth failed, using getAuth:', error.message);
    const { getAuth } = require('firebase/auth');
    auth = getAuth(app);
  }

  // Initialize Firestore
  db = getFirestore(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw new Error(`Firebase initialization failed: ${error.message}. Please check your Firebase configuration or use Preview Mode.`);
}

export { auth, db };

// Storage is not currently used, but can be added later if needed:
// import { getStorage } from 'firebase/storage';
// export const storage = getStorage(app);

export default app;

