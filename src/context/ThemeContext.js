/**
 * Theme Context
 * Manages dark mode and theme preferences
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext({});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themePreference, setThemePreference] = useState('system'); // 'light', 'dark', 'system'

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    // Update dark mode based on preference
    if (themePreference === 'system') {
      setIsDarkMode(systemColorScheme === 'dark');
    } else {
      setIsDarkMode(themePreference === 'dark');
    }
  }, [themePreference, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem('themePreference');
      if (saved) {
        setThemePreference(saved);
      }
    } catch (err) {
      console.error('Error loading theme preference:', err);
    }
  };

  const toggleDarkMode = async (preference) => {
    try {
      setThemePreference(preference);
      await AsyncStorage.setItem('themePreference', preference);
    } catch (err) {
      console.error('Error saving theme preference:', err);
    }
  };

  const value = {
    isDarkMode,
    themePreference,
    toggleDarkMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;

