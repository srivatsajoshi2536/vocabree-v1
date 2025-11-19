/**
 * Onboarding Screen
 * First screen shown to new users
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import previewService from '../../services/previewService';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const handlePreviewMode = async () => {
    await previewService.enablePreviewMode();
    // Navigate to login and auto-login with preview mode
    navigation.navigate('Login');
  };

  const features = [
    {
      icon: '📚',
      title: 'Learn 5 Languages',
      description: 'Hindi, Bengali, Telugu, Kannada, and Tamil',
    },
    {
      icon: '🎮',
      title: 'Gamified Learning',
      description: 'Earn XP, maintain streaks, and unlock achievements',
    },
    {
      icon: '🎯',
      title: 'Interactive Exercises',
      description: 'Practice with translation, listening, and speaking',
    },
    {
      icon: '📱',
      title: 'Learn Offline',
      description: 'Download lessons and practice anywhere',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>📖</Text>
          <Text style={styles.title}>Welcome to vocabree</Text>
          <Text style={styles.subtitle}>
            Master Indian languages with fun, interactive lessons
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Signup')}
          style={styles.primaryButton}
        />
        <Button
          title="Already have an account?"
          variant="outline"
          onPress={() => navigation.navigate('Login')}
          style={styles.secondaryButton}
        />
        <TouchableOpacity
          onPress={handlePreviewMode}
          style={styles.previewButton}
        >
          <Text style={styles.previewText}>
            🎮 Try Preview Mode (No Firebase Required)
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 48,
    padding: 24,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  logo: {
    fontSize: 96, // Bigger emoji
    marginBottom: 24,
  },
  title: {
    ...TYPOGRAPHY.h1,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '900',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 0, // No rounded corners
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  featureIcon: {
    fontSize: 56, // Bigger icons
    marginBottom: 16,
  },
  featureTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '900',
  },
  featureDescription: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  footer: {
    padding: 28,
    paddingBottom: 48,
    backgroundColor: COLORS.white,
    borderTopWidth: 4,
    borderTopColor: COLORS.border,
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    marginTop: 0,
  },
  previewButton: {
    marginTop: 20,
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 3,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  previewText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;

