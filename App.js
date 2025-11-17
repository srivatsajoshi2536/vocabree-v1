/**
 * vocabree - Indian Language Learning App
 * Main App Entry Point
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Context Providers
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { ProgressProvider } from './src/context/ProgressContext';
import { ThemeProvider } from './src/context/ThemeContext';

// Services
import audioService from './src/services/audioService';

// Navigators
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

// Theme
import { COLORS } from './src/theme/colors';

// Main App Content (needs access to auth context)
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

// Main App Component
export default function App() {
  // Initialize audio service on app start
  useEffect(() => {
    audioService.initialize().catch((error) => {
      console.error('Failed to initialize audio service:', error);
    });
  }, []);

  return (
    <ThemeProvider>
    <AuthProvider>
      <LanguageProvider>
        <ProgressProvider>
          <AppContent />
          <StatusBar style="auto" />
        </ProgressProvider>
      </LanguageProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
