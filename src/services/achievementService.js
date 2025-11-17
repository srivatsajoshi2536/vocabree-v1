/**
 * Achievement Service
 * Manages achievements and badges
 */

import { ACHIEVEMENTS } from '../utils/constants';

const ACHIEVEMENT_DEFINITIONS = {
  [ACHIEVEMENTS.FIRST_LESSON]: {
    id: ACHIEVEMENTS.FIRST_LESSON,
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    tier: 'bronze',
  },
  [ACHIEVEMENTS.WEEK_WARRIOR]: {
    id: ACHIEVEMENTS.WEEK_WARRIOR,
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    tier: 'silver',
  },
  [ACHIEVEMENTS.POLYGLOT]: {
    id: ACHIEVEMENTS.POLYGLOT,
    name: 'Polyglot',
    description: 'Start learning 3 languages',
    icon: '🌍',
    tier: 'gold',
  },
  [ACHIEVEMENTS.PERFECT_STUDENT]: {
    id: ACHIEVEMENTS.PERFECT_STUDENT,
    name: 'Perfect Student',
    description: 'Complete 10 lessons with 100% accuracy',
    icon: '⭐',
    tier: 'gold',
  },
  [ACHIEVEMENTS.EARLY_BIRD]: {
    id: ACHIEVEMENTS.EARLY_BIRD,
    name: 'Early Bird',
    description: 'Complete a lesson before 8 AM',
    icon: '🌅',
    tier: 'bronze',
  },
  [ACHIEVEMENTS.NIGHT_OWL]: {
    id: ACHIEVEMENTS.NIGHT_OWL,
    name: 'Night Owl',
    description: 'Complete a lesson after 10 PM',
    icon: '🦉',
    tier: 'bronze',
  },
  [ACHIEVEMENTS.MONTH_MASTER]: {
    id: ACHIEVEMENTS.MONTH_MASTER,
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '👑',
    tier: 'gold',
  },
  [ACHIEVEMENTS.VOCAB_MASTER]: {
    id: ACHIEVEMENTS.VOCAB_MASTER,
    name: 'Vocabulary Master',
    description: 'Learn 100 words',
    icon: '📚',
    tier: 'silver',
  },
};

class AchievementService {
  /**
   * Check for new achievements based on user progress
   */
  checkAchievements(userProfile, progress, lessonResult) {
    const newAchievements = [];
    const currentAchievements = userProfile?.achievements || [];

    // First Lesson
    if (
      !currentAchievements.includes(ACHIEVEMENTS.FIRST_LESSON) &&
      lessonResult
    ) {
      newAchievements.push(ACHIEVEMENTS.FIRST_LESSON);
    }

    // Week Warrior
    if (
      !currentAchievements.includes(ACHIEVEMENTS.WEEK_WARRIOR) &&
      userProfile?.currentStreak >= 7
    ) {
      newAchievements.push(ACHIEVEMENTS.WEEK_WARRIOR);
    }

    // Month Master
    if (
      !currentAchievements.includes(ACHIEVEMENTS.MONTH_MASTER) &&
      userProfile?.currentStreak >= 30
    ) {
      newAchievements.push(ACHIEVEMENTS.MONTH_MASTER);
    }

    // Polyglot
    if (
      !currentAchievements.includes(ACHIEVEMENTS.POLYGLOT) &&
      userProfile?.languages?.length >= 3
    ) {
      newAchievements.push(ACHIEVEMENTS.POLYGLOT);
    }

    // Early Bird
    if (
      !currentAchievements.includes(ACHIEVEMENTS.EARLY_BIRD) &&
      lessonResult
    ) {
      const hour = new Date().getHours();
      if (hour < 8) {
        newAchievements.push(ACHIEVEMENTS.EARLY_BIRD);
      }
    }

    // Night Owl
    if (
      !currentAchievements.includes(ACHIEVEMENTS.NIGHT_OWL) &&
      lessonResult
    ) {
      const hour = new Date().getHours();
      if (hour >= 22) {
        newAchievements.push(ACHIEVEMENTS.NIGHT_OWL);
      }
    }

    return newAchievements;
  }

  /**
   * Get achievement definition
   */
  getAchievement(achievementId) {
    return ACHIEVEMENT_DEFINITIONS[achievementId] || null;
  }

  /**
   * Get all achievements
   */
  getAllAchievements() {
    return Object.values(ACHIEVEMENT_DEFINITIONS);
  }

  /**
   * Get user's unlocked achievements
   */
  getUnlockedAchievements(userProfile) {
    const unlockedIds = userProfile?.achievements || [];
    return unlockedIds
      .map((id) => this.getAchievement(id))
      .filter((a) => a !== null);
  }

  /**
   * Get locked achievements
   */
  getLockedAchievements(userProfile) {
    const unlockedIds = userProfile?.achievements || [];
    const allAchievements = this.getAllAchievements();
    return allAchievements.filter(
      (achievement) => !unlockedIds.includes(achievement.id)
    );
  }
}

export default new AchievementService();

