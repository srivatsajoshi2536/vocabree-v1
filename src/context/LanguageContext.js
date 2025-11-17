/**
 * Language Context
 * Manages selected language and language-related state
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGES } from '../utils/constants';
import previewService from '../services/previewService';

const LanguageContext = createContext({});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [userLanguages, setUserLanguages] = useState([]);

  // Load saved language preference
  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const loadLanguagePreference = async () => {
    try {
      // Check if preview mode - auto-select Hindi
      const isPreviewMode = await previewService.checkPreviewMode();
      if (isPreviewMode) {
        setSelectedLanguage('hindi');
        setUserLanguages(['hindi']);
        await AsyncStorage.setItem('selectedLanguage', 'hindi');
        await AsyncStorage.setItem('userLanguages', JSON.stringify(['hindi']));
        return;
      }

      const saved = await AsyncStorage.getItem('selectedLanguage');
      if (saved) {
        setSelectedLanguage(saved);
      } else {
        // Default to Hindi if nothing saved
        setSelectedLanguage('hindi');
        await AsyncStorage.setItem('selectedLanguage', 'hindi');
      }
      
      const savedLanguages = await AsyncStorage.getItem('userLanguages');
      if (savedLanguages) {
        setUserLanguages(JSON.parse(savedLanguages));
      } else {
        setUserLanguages(['hindi']);
        await AsyncStorage.setItem('userLanguages', JSON.stringify(['hindi']));
      }
    } catch (err) {
      console.error('Error loading language preference:', err);
      // Default to Hindi on error
      setSelectedLanguage('hindi');
      setUserLanguages(['hindi']);
    }
  };

  /**
   * Set selected language
   */
  const selectLanguage = async (languageId) => {
    if (!LANGUAGES[languageId]) {
      throw new Error('Invalid language ID');
    }

    setSelectedLanguage(languageId);
    await AsyncStorage.setItem('selectedLanguage', languageId);

    // Add to user languages if not already present
    if (!userLanguages.includes(languageId)) {
      const updated = [...userLanguages, languageId];
      setUserLanguages(updated);
      await AsyncStorage.setItem('userLanguages', JSON.stringify(updated));
    }
  };

  /**
   * Add language to user's learning list
   */
  const addLanguage = async (languageId) => {
    if (!LANGUAGES[languageId]) {
      throw new Error('Invalid language ID');
    }

    if (!userLanguages.includes(languageId)) {
      const updated = [...userLanguages, languageId];
      setUserLanguages(updated);
      await AsyncStorage.setItem('userLanguages', JSON.stringify(updated));
    }
  };

  /**
   * Remove language from user's learning list
   */
  const removeLanguage = async (languageId) => {
    const updated = userLanguages.filter((id) => id !== languageId);
    setUserLanguages(updated);
    await AsyncStorage.setItem('userLanguages', JSON.stringify(updated));

    // If removed language was selected, select first available or null
    if (selectedLanguage === languageId) {
      const newSelected = updated.length > 0 ? updated[0] : null;
      setSelectedLanguage(newSelected);
      if (newSelected) {
        await AsyncStorage.setItem('selectedLanguage', newSelected);
      } else {
        await AsyncStorage.removeItem('selectedLanguage');
      }
    }
  };

  /**
   * Get language info
   */
  const getLanguageInfo = (languageId) => {
    return LANGUAGES[languageId] || null;
  };

  const value = {
    selectedLanguage,
    userLanguages,
    selectLanguage,
    addLanguage,
    removeLanguage,
    getLanguageInfo,
    allLanguages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export default LanguageContext;

