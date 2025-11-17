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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(app);

// Storage is not currently used, but can be added later if needed:
// import { getStorage } from 'firebase/storage';
// export const storage = getStorage(app);

export default app;

