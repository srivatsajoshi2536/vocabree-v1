/**
 * Home Screen
 * Main screen with skill tree and user stats
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import SkillTree from '../../components/home/SkillTree';
import StreakDisplay from '../../components/home/StreakDisplay';
import Button from '../../components/common/Button';
import { COLORS, getLanguageColor } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { calculateLevel, getLevelProgress } from '../../utils/helpers';

const HomeScreen = ({ navigation }) => {
  const { userProfile } = useAuth();
  const { selectedLanguage, selectLanguage } = useLanguage();
  const { progress, loadProgress, getProgress, getTotalXP } = useProgress();
  const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage || 'hindi');

  // Sync currentLanguage with selectedLanguage when it changes
  useEffect(() => {
    if (selectedLanguage && selectedLanguage !== currentLanguage) {
      setCurrentLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (currentLanguage) {
      loadProgress(currentLanguage);
    }
  }, [currentLanguage]);

  const languageProgress = getProgress(currentLanguage);
  const languageColor = getLanguageColor(currentLanguage);
  // Calculate total XP from all languages (fallback to userProfile if available)
  const totalXP = getTotalXP() || userProfile?.totalXP || 0;
  const userLevel = totalXP ? calculateLevel(totalXP) : 1;
  const levelProgress = totalXP ? getLevelProgress(totalXP, userLevel) : 0;

  const handleStartLesson = () => {
    // Find first unlocked skill or current skill
    if (languageProgress?.skills) {
      const skills = Object.keys(languageProgress.skills);
      if (skills.length > 0) {
        navigation.navigate('Lesson', {
          skillId: skills[0],
          languageId: currentLanguage,
        });
      }
    } else {
      // Start with first skill
      navigation.navigate('Lesson', {
        skillId: 'basics_1',
        languageId: currentLanguage,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
        >
          <View style={[styles.avatar, { backgroundColor: languageColor }]}>
            <Text style={styles.avatarText}>
              {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <StreakDisplay
            streak={userProfile?.currentStreak || 0}
            size="medium"
          />
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.xpContainer}>
            <Ionicons name="star" size={20} color={COLORS.xpGold} />
            <Text style={styles.xpText}>{totalXP}</Text>
          </View>
          <Text style={styles.xpLabel}>Total XP</Text>
        </View>
      </View>

      {/* Language Selector */}
      <View style={styles.languageSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['hindi', 'bengali', 'telugu', 'kannada', 'tamil'].map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => {
                setCurrentLanguage(lang);
                selectLanguage(lang);
              }}
              style={[
                styles.languageButton,
                currentLanguage === lang && {
                  backgroundColor: getLanguageColor(lang),
                },
              ]}
            >
              <Text
                style={[
                  styles.languageText,
                  currentLanguage === lang && styles.languageTextActive,
                ]}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Level Progress */}
      <View style={styles.levelContainer}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelLabel}>Level {userLevel}</Text>
          <Text style={styles.levelProgress}>{Math.round(levelProgress)}%</Text>
        </View>
        <View style={styles.levelBar}>
          <View
            style={[
              styles.levelBarFill,
              { width: `${levelProgress}%`, backgroundColor: languageColor },
            ]}
          />
        </View>
      </View>

      {/* Skill Tree */}
      <SkillTree
        navigation={navigation}
        onSkillPress={(skill) => {
          navigation.navigate('Lesson', {
            skillId: skill.id,
            skillName: skill.name,
            languageId: currentLanguage,
          });
        }}
      />

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <Button
          title="Continue Learning"
          onPress={handleStartLesson}
          style={styles.fabButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 4, // Thick border
    borderBottomColor: COLORS.border,
  },
  profileButton: {
    alignItems: 'center',
  },
  avatar: {
    width: 56, // Bigger for neobrutalism
    height: 56,
    borderRadius: 0, // Square avatar - playful!
    borderWidth: 4,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  avatarText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
    fontWeight: '900',
  },
  headerCenter: {
    alignItems: 'center',
  },
  streakLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 6,
    fontWeight: '700',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.border,
  },
  xpText: {
    ...TYPOGRAPHY.h4,
    marginLeft: 6,
    color: COLORS.textPrimary,
    fontWeight: '900',
  },
  xpLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 6,
    fontWeight: '700',
  },
  languageSelector: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.border,
  },
  languageButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 0, // No rounded corners
    marginHorizontal: 8,
    backgroundColor: COLORS.background,
    borderWidth: 3,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  languageText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  languageTextActive: {
    color: COLORS.white,
    fontWeight: '900',
  },
  levelContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.border,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  levelLabel: {
    ...TYPOGRAPHY.h4,
    fontWeight: '900',
  },
  levelProgress: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  levelBar: {
    height: 16, // Thicker bar
    backgroundColor: COLORS.background,
    borderRadius: 0, // No rounded corners
    overflow: 'visible',
    borderWidth: 3,
    borderColor: COLORS.border,
  },
  levelBarFill: {
    height: '100%',
    borderRadius: 0,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  fabButton: {
    // Neobrutalism shadow already in Button component
  },
});

export default HomeScreen;
