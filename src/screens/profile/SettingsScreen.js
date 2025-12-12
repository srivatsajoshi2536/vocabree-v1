/**
 * Settings Screen
 * App settings and preferences
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useColors } from '../../hooks/useColors';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { DAILY_XP_GOALS } from '../../utils/constants';
import previewService from '../../services/previewService';
import audioService from '../../services/audioService';

const SettingsScreen = ({ navigation }) => {
  const { userProfile, updateUserProfile, isPreviewMode } = useAuth();
  const { isDarkMode, themePreference, toggleDarkMode } = useTheme();
  const colors = useColors();
  const [soundEnabled, setSoundEnabled] = useState(
    userProfile?.settings?.soundEnabled ?? true
  );
  const [speakingEnabled, setSpeakingEnabled] = useState(
    userProfile?.settings?.speakingEnabled ?? true
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    userProfile?.settings?.notificationsEnabled ?? true
  );
  const [dailyXPGoal, setDailyXPGoal] = useState(
    userProfile?.dailyXPGoal || 20
  );

  // Sync audio service with settings on mount
  useEffect(() => {
    audioService.setSoundEnabled(soundEnabled);
  }, []);

  const handleSoundToggle = async (value) => {
    setSoundEnabled(value);
    // Update audio service
    await audioService.setSoundEnabled(value);
    
    if (!isPreviewMode) {
      await updateUserProfile({
        settings: {
          ...userProfile?.settings,
          soundEnabled: value,
        },
      });
    }
  };

  const handleSpeakingToggle = async (value) => {
    setSpeakingEnabled(value);
    if (!isPreviewMode) {
      await updateUserProfile({
        settings: {
          ...userProfile?.settings,
          speakingEnabled: value,
        },
      });
    }
  };

  const handleNotificationsToggle = async (value) => {
    setNotificationsEnabled(value);
    if (!isPreviewMode) {
      await updateUserProfile({
        settings: {
          ...userProfile?.settings,
          notificationsEnabled: value,
        },
      });
    }
  };

  const handleXPGoalChange = async (goal) => {
    setDailyXPGoal(goal);
    if (!isPreviewMode) {
      await updateUserProfile({ dailyXPGoal: goal });
    }
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Reset Progress', 'Progress reset feature coming soon!');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Delete Account', 'Account deletion feature coming soon!');
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, description, children, onPress }) => {
    const colors = useColors();
    return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.settingItem}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
          <Ionicons name={icon} size={24} color={colors.primary} />
        <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>{title}</Text>
          {description && (
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{description}</Text>
          )}
        </View>
      </View>
      {children}
    </TouchableOpacity>
  );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.white, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Learning Goals */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goal</Text>
          <Text style={styles.sectionDescription}>
            Set your daily XP target
          </Text>
          <View style={styles.goalButtons}>
            {DAILY_XP_GOALS.map((goal) => (
              <TouchableOpacity
                key={goal}
                onPress={() => handleXPGoalChange(goal)}
                style={[
                  styles.goalButton,
                  dailyXPGoal === goal && styles.goalButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.goalButtonText,
                    dailyXPGoal === goal && styles.goalButtonTextActive,
                  ]}
                >
                  {goal} XP
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Preferences */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Preferences</Text>
          
          <SettingItem
            icon={isDarkMode ? "moon" : "sunny"}
            title="Dark Mode"
            description={themePreference === 'system' ? 'Follow system' : themePreference === 'dark' ? 'Dark mode enabled' : 'Light mode enabled'}
          >
            <View style={styles.themeOptions}>
              <TouchableOpacity
                onPress={() => toggleDarkMode('light')}
                style={[
                  styles.themeOption,
                  themePreference === 'light' && { backgroundColor: colors.primary }
                ]}
              >
                <Ionicons name="sunny" size={16} color={themePreference === 'light' ? colors.white : colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleDarkMode('dark')}
                style={[
                  styles.themeOption,
                  themePreference === 'dark' && { backgroundColor: colors.primary }
                ]}
              >
                <Ionicons name="moon" size={16} color={themePreference === 'dark' ? colors.white : colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleDarkMode('system')}
                style={[
                  styles.themeOption,
                  themePreference === 'system' && { backgroundColor: colors.primary }
                ]}
              >
                <Ionicons name="phone-portrait" size={16} color={themePreference === 'system' ? colors.white : colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </SettingItem>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <SettingItem
            icon="volume-high"
            title="Sound Effects"
            description="Enable sound effects for correct/incorrect answers"
          >
            <Switch
              value={soundEnabled}
              onValueChange={handleSoundToggle}
              trackColor={{
                false: colors.border,
                true: colors.success,
              }}
            />
          </SettingItem>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <SettingItem
            icon="mic"
            title="Speaking Exercises"
            description="Enable speaking exercises in lessons"
          >
            <Switch
              value={speakingEnabled}
              onValueChange={handleSpeakingToggle}
              trackColor={{
                false: colors.border,
                true: colors.success,
              }}
            />
          </SettingItem>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <SettingItem
            icon="notifications"
            title="Notifications"
            description="Receive daily learning reminders"
          >
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{
                false: colors.border,
                true: colors.success,
              }}
            />
          </SettingItem>
        </Card>

        {/* Account */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem
            icon="lock-closed"
            title="Change Password"
            description="Update your account password"
            onPress={() => Alert.alert('Change Password', 'Feature coming soon!')}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </SettingItem>

          <View style={styles.divider} />

          <SettingItem
            icon="refresh"
            title="Reset Progress"
            description="Start over with all lessons"
            onPress={handleResetProgress}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </SettingItem>

          <View style={styles.divider} />

          <SettingItem
            icon="trash"
            title="Delete Account"
            description="Permanently delete your account"
            onPress={handleDeleteAccount}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.error}
            />
          </SettingItem>
        </Card>

        {/* About */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <SettingItem
            icon="information-circle"
            title="App Version"
            description="1.0.0"
          />
          <View style={styles.divider} />
          <SettingItem
            icon="document-text"
            title="Privacy Policy"
            description="Read our privacy policy"
            onPress={() => Alert.alert('Privacy Policy', 'Coming soon!')}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </SettingItem>
          <View style={styles.divider} />
          <SettingItem
            icon="document-text"
            title="Terms of Service"
            description="Read our terms of service"
            onPress={() => Alert.alert('Terms of Service', 'Coming soon!')}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </SettingItem>
        </Card>

        {/* Preview Mode Indicator */}
        {isPreviewMode && (
          <Card style={[styles.section, styles.previewCard]}>
            <View style={styles.previewContent}>
              <Ionicons name="information-circle" size={24} color={COLORS.warning} />
              <View style={styles.previewText}>
                <Text style={styles.previewTitle}>Preview Mode Active</Text>
                <Text style={styles.previewDescription}>
                  You're currently using preview mode with mock data. Set up
                  Firebase to use real features.
                </Text>
              </View>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  themeOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  title: {
    ...TYPOGRAPHY.h2,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: 8,
  },
  sectionDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  goalButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  goalButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  goalButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  goalButtonTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  previewCard: {
    backgroundColor: COLORS.warning + '20',
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  previewContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  previewText: {
    flex: 1,
    marginLeft: 12,
  },
  previewTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 4,
    color: COLORS.warning,
  },
  previewDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
});

export default SettingsScreen;
