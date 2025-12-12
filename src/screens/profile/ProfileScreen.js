/**
 * Profile Screen
 * User profile, stats, and achievements
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useColors } from '../../hooks/useColors';
import Card from '../../components/common/Card';
import StreakDisplay from '../../components/home/StreakDisplay';
import AvatarSelector from '../../components/profile/AvatarSelector';
import Button from '../../components/common/Button';
import { COLORS, getLanguageColor } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { calculateLevel } from '../../utils/helpers';
import previewService from '../../services/previewService';
import achievementService from '../../services/achievementService';

const ProfileScreen = ({ navigation }) => {
  const { user, userProfile, updateUserProfile, logout, isPreviewMode } = useAuth();
  const { progress, getProgress, getTotalXP } = useProgress();
  const { selectedLanguage, userLanguages } = useLanguage();
  const { isDarkMode } = useTheme();
  const colors = useColors();

  const languageProgress = getProgress(selectedLanguage || 'hindi');
  // Calculate total XP from all languages (fallback to userProfile if available)
  const totalXP = getTotalXP() || userProfile?.totalXP || 0;
  const userLevel = totalXP ? calculateLevel(totalXP) : 1;

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState(userProfile?.displayName || 'User');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const selectedAvatar = userProfile?.avatar || null;

  const handleSaveUsername = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    try {
      await updateUserProfile({ displayName: username.trim() });
      setIsEditingUsername(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update username');
    }
  };

  const handleSelectAvatar = async (avatarId) => {
    try {
      await updateUserProfile({ avatar: avatarId });
    } catch (error) {
      Alert.alert('Error', 'Failed to update avatar');
    }
  };

  const getAvatarDisplay = () => {
    if (selectedAvatar === 'pokemon') return '⚡';
    if (selectedAvatar === 'spiderman') return '🕷️';
    if (selectedAvatar === 'doremon') return '🔵';
    if (selectedAvatar === 'ironman') return '🦾';
    // Default: show first letter of username
    return (userProfile?.displayName?.[0]?.toUpperCase() || 'U');
  };

  const getAvatarColor = () => {
    if (selectedAvatar === 'pokemon') return '#FFD700';
    if (selectedAvatar === 'spiderman') return '#DC143C';
    if (selectedAvatar === 'doremon') return '#2196F3';
    if (selectedAvatar === 'ironman') return '#FF6B35';
    return getLanguageColor(selectedLanguage || 'hindi', isDarkMode);
  };

  const handleLogout = async () => {
    if (isPreviewMode) {
      await previewService.disablePreviewMode();
    }
    await logout();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              onPress={() => setShowAvatarSelector(true)}
              style={styles.avatarTouchable}
            >
            <View
              style={[
                styles.avatar,
                  { backgroundColor: getAvatarColor() },
              ]}
            >
              <Text style={styles.avatarText}>
                  {getAvatarDisplay()}
              </Text>
            </View>
              <View style={[styles.editAvatarBadge, { backgroundColor: colors.primary }]}>
                <Ionicons name="camera" size={16} color={colors.white} />
              </View>
            </TouchableOpacity>
            {isPreviewMode && (
              <View style={styles.previewBadge}>
                <Text style={styles.previewBadgeText}>Preview</Text>
              </View>
            )}
          </View>
          
          {isEditingUsername ? (
            <View style={styles.usernameEditContainer}>
              <TextInput
                style={[styles.usernameInput, { 
                  color: colors.textPrimary,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                }]}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor={colors.textSecondary}
                autoFocus
                maxLength={30}
              />
              <View style={styles.usernameEditActions}>
                <TouchableOpacity
                  onPress={() => {
                    setUsername(userProfile?.displayName || 'User');
                    setIsEditingUsername(false);
                  }}
                  style={styles.cancelButton}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSaveUsername}
                  style={[styles.saveButton, { backgroundColor: colors.primary }]}
                >
                  <Text style={[styles.saveButtonText, { color: colors.white }]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingUsername(true)}
              style={styles.usernameContainer}
            >
              <Text style={[styles.userName, { color: colors.textPrimary }]}>
            {userProfile?.displayName || 'User'}
              </Text>
              <Ionicons name="create-outline" size={18} color={colors.textSecondary} style={styles.editIcon} />
            </TouchableOpacity>
          )}
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {userProfile?.email || user?.email}
          </Text>
          <Text style={[styles.userLevel, { color: colors.primary }]}>Level {userLevel}</Text>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Ionicons name="star" size={24} color={COLORS.xpGold} />
            <Text style={styles.statValue}>{totalXP}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </Card>

          <Card style={styles.statCard}>
            <StreakDisplay streak={userProfile?.currentStreak || 0} size="small" />
            <Text style={styles.statLabel}>Day Streak</Text>
          </Card>

          <Card style={styles.statCard}>
            <Ionicons name="trophy" size={24} color={COLORS.warning} />
            <Text style={styles.statValue}>
              {userProfile?.longestStreak || 0}
            </Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </Card>

          <Card style={styles.statCard}>
            <Ionicons name="book" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>
              {languageProgress?.skills
                ? Object.keys(languageProgress.skills).length
                : 0}
            </Text>
            <Text style={styles.statLabel}>Skills</Text>
          </Card>
        </View>

        {/* Languages Learning */}
        <Card style={styles.languagesCard}>
          <Text style={styles.sectionTitle}>Languages Learning</Text>
          {userLanguages.length > 0 ? (
            userLanguages.map((langId) => {
              const langProgress = getProgress(langId);
              const completedSkills = langProgress?.skills
                ? Object.values(langProgress.skills).filter(
                    (s) => s.level >= 5
                  ).length
                : 0;
              const totalSkills = 5; // From skills.json

              return (
                <View key={langId} style={styles.languageItem}>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>
                      {langId.charAt(0).toUpperCase() + langId.slice(1)}
                    </Text>
                    <Text style={styles.languageProgress}>
                      {completedSkills}/{totalSkills} skills completed
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.languageIndicator,
                      { backgroundColor: getLanguageColor(langId) },
                    ]}
                  />
                </View>
              );
            })
          ) : (
            <Text style={styles.emptyText}>No languages added yet</Text>
          )}
        </Card>

        {/* Achievements */}
        <Card style={styles.achievementsCard}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {userProfile?.achievements && userProfile.achievements.length > 0 ? (
            <View style={styles.achievementsGrid}>
              {userProfile.achievements.map((achievementId, index) => {
                const achievement = achievementService.getAchievement(achievementId);
                if (!achievement) return null;
                
                return (
                  <View key={index} style={styles.achievementBadge}>
                    <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                    <Text style={styles.achievementName} numberOfLines={2}>
                      {achievement.name}
                    </Text>
                    <View
                      style={[
                        styles.tierBadge,
                        {
                          backgroundColor:
                            achievement.tier === 'gold'
                              ? COLORS.xpGold
                              : achievement.tier === 'silver'
                              ? '#C0C0C0'
                              : '#CD7F32',
                        },
                      ]}
                    >
                      <Text style={styles.tierText}>
                        {achievement.tier.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text style={styles.emptyText}>No achievements yet</Text>
          )}
          
          {/* Show locked achievements */}
          {userProfile?.achievements && userProfile.achievements.length < 8 && (
            <View style={styles.lockedSection}>
              <Text style={styles.lockedTitle}>Locked Achievements</Text>
              <View style={styles.achievementsGrid}>
                {achievementService
                  .getLockedAchievements(userProfile)
                  .slice(0, 3)
                  .map((achievement, index) => (
                    <View
                      key={index}
                      style={[styles.achievementBadge, styles.lockedBadge]}
                    >
                      <Text style={styles.achievementIconLocked}>🔒</Text>
                      <Text
                        style={[styles.achievementName, styles.lockedName]}
                        numberOfLines={2}
                      >
                        {achievement.name}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          )}
        </Card>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
          <Text style={styles.logoutText}>
            {isPreviewMode ? 'EXIT PREVIEW MODE' : 'LOGOUT'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Avatar Selector Modal */}
      <AvatarSelector
        visible={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        selectedAvatar={selectedAvatar}
        onSelect={handleSelectAvatar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontWeight: '900',
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarTouchable: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 0, // Square avatar - neobrutalism!
    borderWidth: 4,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  avatarText: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
    fontSize: 40,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  usernameEditContainer: {
    width: '100%',
    marginBottom: 4,
  },
  usernameInput: {
    ...TYPOGRAPHY.h2,
    borderWidth: 4,
    borderRadius: 0,
    padding: 16,
    marginBottom: 12,
    textAlign: 'center',
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  usernameEditActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  cancelButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  saveButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.white,
  },
  editIcon: {
    marginLeft: 8,
  },
  previewBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  previewBadgeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: '600',
  },
  userName: {
    ...TYPOGRAPHY.h2,
    marginBottom: 4,
  },
  userEmail: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  userLevel: {
    ...TYPOGRAPHY.h4,
    color: COLORS.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    marginHorizontal: -4,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    margin: 4,
  },
  statValue: {
    ...TYPOGRAPHY.h3,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  languagesCard: {
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  languageProgress: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  languageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  achievementsCard: {
    padding: 20,
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  achievementBadge: {
    alignItems: 'center',
    width: '30%',
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
    minHeight: 120,
  },
  achievementIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  achievementIconLocked: {
    fontSize: 40,
    marginBottom: 8,
    opacity: 0.5,
  },
  achievementName: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  lockedBadge: {
    opacity: 0.6,
  },
  lockedName: {
    color: COLORS.textSecondary,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  tierText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  lockedSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  lockedTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  emptyText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 0,
    marginTop: 20,
    borderWidth: 4,
    borderColor: COLORS.error,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    minHeight: 56,
  },
  logoutText: {
    ...TYPOGRAPHY.button,
    color: COLORS.error,
    marginLeft: 10,
    fontWeight: '800',
    fontSize: 16,
  },
});

export default ProfileScreen;
