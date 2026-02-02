/**
 * Authentication Context
 * Manages user authentication state and operations
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail, validatePassword } from '../utils/validators';
import previewService from '../services/previewService';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Expose reload function for ProgressContext
  useEffect(() => {
    const { setReloadUserProfileCallback } = require('./ProgressContext');
    setReloadUserProfileCallback(() => {
      if (user && !previewService.isPreviewMode) {
        loadUserProfile(user.uid);
      } else if (previewService.isPreviewMode) {
        const updatedProfile = previewService.getMockUserProfile();
        if (updatedProfile) {
          setUserProfile(updatedProfile);
        }
      }
    });
  }, [user]);

  // Check for preview mode and listen to auth state changes
  useEffect(() => {
    const initializeAuth = async () => {
      const isPreviewMode = await previewService.checkPreviewMode();

      if (isPreviewMode) {
        // Preview mode - use mock data
        const mockUser = previewService.getMockUser();
        const mockProfile = previewService.getMockUserProfile();
        setUser(mockUser);
        setUserProfile(mockProfile);
        setLoading(false);
      } else {
        // Normal mode - use Firebase
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser);
            // Load user profile from Firestore
            await loadUserProfile(firebaseUser.uid);
          } else {
            setUser(null);
            setUserProfile(null);
            await AsyncStorage.removeItem('user');
          }
          setLoading(false);
        });

        return unsubscribe;
      }
    };

    initializeAuth();
  }, []);

  /**
   * Load user profile from Firestore
   */
  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const profileData = { id: uid, ...userDoc.data() };
        setUserProfile(profileData);
        await AsyncStorage.setItem('user', JSON.stringify(profileData));
      }
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError(err.message);
    }
  };

  /**
   * Sign up with email and password
   */
  const signup = async (email, password, displayName) => {
    try {
      setError(null);

      // Validate inputs
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.error);
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Create user profile in Firestore
      const userData = {
        email,
        displayName: displayName || email.split('@')[0],
        createdAt: new Date(),
        currentStreak: 0,
        longestStreak: 0,
        totalXP: 0,
        dailyXPGoal: 20,
        languages: [],
        achievements: [],
        settings: {
          soundEnabled: true,
          speakingEnabled: true,
          notificationsEnabled: true,
          notificationTime: '20:00',
        },
      };

      console.log('Creating user profile in Firestore...', userCredential.user.uid);
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      console.log('User profile created successfully!');

      await loadUserProfile(userCredential.user.uid);

      return { success: true };
    } catch (err) {
      let errorMessage = 'Failed to create account';

      console.error('Signup error:', err);

      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection or try Preview Mode.';
      } else if (err.code === 'auth/invalid-api-key') {
        errorMessage = 'Firebase configuration error. Please use Preview Mode or check Firebase setup.';
      } else if (err.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check Firestore security rules.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.error('Signup error:', err.code, err.message);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign in with email and password
   */
  const login = async (email, password) => {
    try {
      setError(null);

      // Check if preview mode
      const isPreviewMode = await previewService.checkPreviewMode();
      if (isPreviewMode) {
        // In preview mode, accept any credentials
        const mockUser = previewService.getMockUser();
        const mockProfile = previewService.getMockUserProfile();
        setUser(mockUser);
        setUserProfile(mockProfile);
        return { success: true };
      }

      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }

      if (!password || password.trim() === '') {
        throw new Error('Password is required');
      }

      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      let errorMessage = 'Failed to sign in';

      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection or try Preview Mode.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (err.code === 'auth/invalid-api-key') {
        errorMessage = 'Firebase configuration error. Please use Preview Mode or check Firebase setup.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.error('Login error:', err.code, err.message);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign in with Google using Expo AuthSession
   */
  const signInWithGoogle = async () => {
    try {
      setError(null);

      // Check if preview mode
      const isPreviewMode = await previewService.checkPreviewMode();
      if (isPreviewMode) {
        const mockUser = previewService.getMockUser();
        const mockProfile = previewService.getMockUserProfile();
        setUser(mockUser);
        setUserProfile(mockProfile);
        return { success: true };
      }

      // This will be called from the UI component that has the Google auth hook
      // For now, return an error asking to use the hook properly
      return {
        success: false,
        error: 'Google Sign-In must be initiated from the login screen'
      };
    } catch (err) {
      let errorMessage = 'Failed to sign in with Google';

      if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.error('Google Sign-In error:', err.code, err.message);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Complete Google Sign-In with ID token
   * This is called after getting the token from Expo AuthSession
   */
  const completeGoogleSignIn = async (idToken) => {
    try {
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await signInWithCredential(auth, googleCredential);

      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

      if (!userDoc.exists()) {
        // Create user profile in Firestore for new Google users
        const userData = {
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || userCredential.user.email.split('@')[0],
          photoURL: userCredential.user.photoURL || null,
          createdAt: new Date(),
          currentStreak: 0,
          longestStreak: 0,
          totalXP: 0,
          dailyXPGoal: 20,
          languages: [],
          achievements: [],
          settings: {
            soundEnabled: true,
            speakingEnabled: true,
            notificationsEnabled: true,
            notificationTime: '20:00',
          },
        };

        await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      }

      await loadUserProfile(userCredential.user.uid);
      return { success: true };
    } catch (err) {
      let errorMessage = 'Failed to complete Google sign-in';

      if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.error('Complete Google Sign-In error:', err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign out
   */
  const logout = async () => {
    try {
      const isPreviewMode = await previewService.checkPreviewMode();
      if (isPreviewMode) {
        // In preview mode, just clear state
        setUser(null);
        setUserProfile(null);
        return { success: true };
      }

      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      await AsyncStorage.removeItem('user');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Reset password
   */
  const resetPassword = async (email) => {
    try {
      setError(null);

      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }

      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      let errorMessage = 'Failed to send password reset email';

      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Update user profile
   */
  const updateUserProfile = async (updates) => {
    try {
      if (!user) throw new Error('User not authenticated');

      await setDoc(
        doc(db, 'users', user.uid),
        { ...updates, updatedAt: new Date() },
        { merge: true }
      );

      await loadUserProfile(user.uid);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    signup,
    login,
    signInWithGoogle,
    completeGoogleSignIn,
    logout,
    resetPassword,
    updateUserProfile,
    setError,
    isPreviewMode: previewService.isPreviewMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

