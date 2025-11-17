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
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileButton: {
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
  },
  headerCenter: {
    alignItems: 'center',
  },
  streakLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpText: {
    ...TYPOGRAPHY.h4,
    marginLeft: 4,
    color: COLORS.textPrimary,
  },
  xpLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  languageSelector: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: COLORS.background,
  },
  languageText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  languageTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  levelContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelLabel: {
    ...TYPOGRAPHY.h4,
  },
  levelProgress: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  levelBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  fabButton: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default HomeScreen;
