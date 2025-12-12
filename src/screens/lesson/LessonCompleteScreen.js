/**
 * Lesson Complete Screen
 * Shows XP earned, accuracy, and celebration
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import achievementService from '../../services/achievementService';
import { calculateLevel } from '../../utils/helpers';

const LessonCompleteScreen = ({ route, navigation }) => {
  const { userProfile, updateUserProfile } = useAuth();
  const { 
    xpEarned = 10, 
    accuracy = 85, 
    totalExercises = 10, 
    correctAnswers = 8, 
    leveledUp = false,
    incorrectExercises = [],
    skillId,
    skillName,
    languageId,
    level,
    isPractice = false,
  } = route.params || {};
  
  const [newAchievements, setNewAchievements] = useState([]);
  const [showLevelUp, setShowLevelUp] = useState(leveledUp);
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    checkAchievements();
  }, []);

  const checkAchievements = async () => {
    if (!userProfile) return;

    const achievements = achievementService.checkAchievements(
      userProfile,
      null,
      true // lesson completed
    );

    if (achievements.length > 0) {
      setNewAchievements(achievements);
      setShowAchievement(true);

      // Update user profile with new achievements
      const updatedAchievements = [
        ...(userProfile.achievements || []),
        ...achievements,
      ];
      await updateUserProfile({ achievements: updatedAchievements });
    }
  };

  const oldLevel = userProfile?.totalXP
    ? calculateLevel(userProfile.totalXP - xpEarned)
    : 1;
  const newLevel = userProfile?.totalXP
    ? calculateLevel(userProfile.totalXP)
    : 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration Header */}
        <View style={styles.celebrationContainer}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.celebrationTitle}>
            {isPractice ? 'Practice Complete!' : 'Lesson Complete!'}
          </Text>
          <Text style={styles.celebrationSubtitle}>
            {isPractice ? 'You strengthened your skills!' : 'Great job!'}
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Ionicons name="star" size={32} color={COLORS.xpGold} />
            <Text style={styles.statValue}>{xpEarned}</Text>
            <Text style={styles.statLabel}>XP Earned</Text>
          </Card>

          <Card style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={32} color={COLORS.success} />
            <Text style={styles.statValue}>{Math.round(accuracy)}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </Card>

          <Card style={styles.statCard}>
            <Ionicons name="trophy" size={32} color={COLORS.warning} />
            <Text style={styles.statValue}>
              {correctAnswers}/{totalExercises}
            </Text>
            <Text style={styles.statLabel}>Correct</Text>
          </Card>
        </View>

        {/* Accuracy Details */}
        <Card style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Lesson Summary</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Exercises Completed:</Text>
            <Text style={styles.detailsValue}>{totalExercises}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Correct Answers:</Text>
            <Text style={styles.detailsValue}>{correctAnswers}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Accuracy:</Text>
            <Text style={[styles.detailsValue, { color: COLORS.success }]}>
              {Math.round(accuracy)}%
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>XP Earned:</Text>
            <Text style={[styles.detailsValue, { color: COLORS.xpGold }]}>
              {xpEarned} XP
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <Button
          title="Continue Learning"
          onPress={() => {
            // Navigate to MainTabs and then to Home tab
            navigation.navigate('MainTabs', { screen: 'Home' });
          }}
          style={styles.continueButton}
        />
        {incorrectExercises && incorrectExercises.length > 0 && (
        <Button
          title="Review Mistakes"
          variant="outline"
          onPress={() => {
              navigation.navigate('ReviewMistakes', {
                incorrectExercises,
                skillId,
                skillName,
                languageId,
                level,
              });
          }}
          style={styles.reviewButton}
        />
        )}
      </View>

      {/* Level Up Modal */}
      <Modal
        visible={showLevelUp}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLevelUp(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.levelUpCard}>
            <Text style={styles.levelUpEmoji}>🎉</Text>
            <Text style={styles.levelUpTitle}>Level Up!</Text>
            <Text style={styles.levelUpText}>
              You reached Level {newLevel}!
            </Text>
            <Button
              title="Awesome!"
              onPress={() => setShowLevelUp(false)}
              style={styles.levelUpButton}
            />
          </Card>
        </View>
      </Modal>

      {/* Achievement Modal */}
      <Modal
        visible={showAchievement}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAchievement(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.achievementCard}>
            {newAchievements.length > 0 && (
              <>
                <Text style={styles.achievementEmoji}>
                  {achievementService.getAchievement(newAchievements[0])?.icon || '🏆'}
                </Text>
                <Text style={styles.achievementTitle}>Achievement Unlocked!</Text>
                <Text style={styles.achievementName}>
                  {achievementService.getAchievement(newAchievements[0])?.name}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievementService.getAchievement(newAchievements[0])?.description}
                </Text>
                <Button
                  title="Awesome!"
                  onPress={() => setShowAchievement(false)}
                  style={styles.achievementButton}
                />
              </>
            )}
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  celebrationContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  celebrationEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  celebrationTitle: {
    ...TYPOGRAPHY.h1,
    marginBottom: 8,
  },
  celebrationSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
  },
  statValue: {
    ...TYPOGRAPHY.h2,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  detailsCard: {
    padding: 20,
  },
  detailsTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailsLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  detailsValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  continueButton: {
    marginBottom: 12,
  },
  reviewButton: {
    marginBottom: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  levelUpCard: {
    width: '100%',
    maxWidth: 400,
    padding: 32,
    alignItems: 'center',
  },
  levelUpEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  levelUpTitle: {
    ...TYPOGRAPHY.h1,
    marginBottom: 8,
  },
  levelUpText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  levelUpButton: {
    width: '100%',
  },
  achievementCard: {
    width: '100%',
    maxWidth: 400,
    padding: 32,
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  achievementTitle: {
    ...TYPOGRAPHY.h2,
    marginBottom: 8,
    color: COLORS.xpGold,
  },
  achievementName: {
    ...TYPOGRAPHY.h3,
    marginBottom: 8,
  },
  achievementDescription: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  achievementButton: {
    width: '100%',
  },
});

export default LessonCompleteScreen;
