/**
 * Preview/Demo Mode Service
 * Provides mock data for testing without Firebase
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock user data
const MOCK_USER = {
  uid: 'preview_user_123',
  email: 'demo@vocabree.com',
  displayName: 'Demo User',
  photoURL: null,
};

const MOCK_USER_PROFILE = {
  id: 'preview_user_123',
  email: 'demo@vocabree.com',
  displayName: 'Demo User',
  createdAt: new Date(),
  currentStreak: 5,
  longestStreak: 12,
  totalXP: 450,
  dailyXPGoal: 20,
  languages: ['hindi'],
  achievements: ['first_lesson', 'week_warrior'],
  settings: {
    soundEnabled: true,
    speakingEnabled: true,
    notificationsEnabled: true,
    notificationTime: '20:00',
  },
};

// Mock progress data
const MOCK_PROGRESS = {
  hindi: {
    userId: 'preview_user_123',
    languageId: 'hindi',
    level: 3,
    totalXP: 450,
    currentStreak: 5,
    longestStreak: 12,
    skills: {
      basics_1: {
        level: 3,
        completedLessons: [
          'basics_1_l1',
          'basics_1_l2',
          'basics_1_l3',
        ],
        lastPracticed: new Date(),
      },
      basics_2: {
        level: 1,
        completedLessons: ['basics_2_l1'],
        lastPracticed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
    },
    vocabulary: ['namaste', 'dhanyavad', 'alvida', 'haan'],
    lastActiveDate: new Date(),
  },
};

class PreviewService {
  constructor() {
    this.isPreviewMode = false;
    this.mockUser = null;
    this.mockUserProfile = null;
    this.mockProgress = {};
  }

  /**
   * Enable preview mode
   */
  async enablePreviewMode() {
    this.isPreviewMode = true;
    this.mockUser = MOCK_USER;
    this.mockUserProfile = MOCK_USER_PROFILE;
    this.mockProgress = { ...MOCK_PROGRESS };
    await AsyncStorage.setItem('preview_mode', 'true');
    return true;
  }

  /**
   * Disable preview mode
   */
  async disablePreviewMode() {
    this.isPreviewMode = false;
    this.mockUser = null;
    this.mockUserProfile = null;
    this.mockProgress = {};
    await AsyncStorage.removeItem('preview_mode');
    return true;
  }

  /**
   * Check if preview mode is enabled
   */
  async checkPreviewMode() {
    const previewMode = await AsyncStorage.getItem('preview_mode');
    this.isPreviewMode = previewMode === 'true';
    if (this.isPreviewMode) {
      this.mockUser = MOCK_USER;
      this.mockUserProfile = MOCK_USER_PROFILE;
      this.mockProgress = { ...MOCK_PROGRESS };
    }
    return this.isPreviewMode;
  }

  /**
   * Get mock user
   */
  getMockUser() {
    return this.mockUser;
  }

  /**
   * Get mock user profile
   */
  getMockUserProfile() {
    return this.mockUserProfile;
  }

  /**
   * Update mock user profile
   */
  updateMockUserProfile(updates) {
    if (!this.mockUserProfile) {
      this.mockUserProfile = { ...MOCK_USER_PROFILE };
    }
    this.mockUserProfile = {
      ...this.mockUserProfile,
      ...updates,
    };
    return this.mockUserProfile;
  }

  /**
   * Get mock progress for a language
   */
  getMockProgress(languageId) {
    return this.mockProgress[languageId] || null;
  }

  /**
   * Update mock progress
   */
  updateMockProgress(languageId, updates) {
    if (!this.mockProgress[languageId]) {
      this.mockProgress[languageId] = {
        userId: 'preview_user_123',
        languageId,
        level: 1,
        totalXP: 0,
        currentStreak: 0,
        longestStreak: 0,
        skills: {},
        vocabulary: [],
        lastActiveDate: null,
      };
    }
    this.mockProgress[languageId] = {
      ...this.mockProgress[languageId],
      ...updates,
    };
    return this.mockProgress[languageId];
  }

  /**
   * Award XP in preview mode
   */
  awardXP(languageId, xp, bonusXP = 0) {
    const progress = this.getMockProgress(languageId);
    if (!progress) return null;

    const totalXP = progress.totalXP + xp + bonusXP;
    const newLevel = Math.floor(Math.sqrt(totalXP / 100)) || 1;
    const oldLevel = progress.level;

    this.updateMockProgress(languageId, {
      totalXP,
      level: newLevel,
      lastActiveDate: new Date(),
    });

    return {
      success: true,
      leveledUp: newLevel > oldLevel,
      newLevel,
      totalXP,
    };
  }

  /**
   * Update skill progress in preview mode
   */
  updateSkillProgress(languageId, skillId, level, lessonId) {
    const progress = this.getMockProgress(languageId);
    if (!progress) return { success: false };

    const skills = progress.skills || {};
    const skillProgress = skills[skillId] || {
      level: 0,
      completedLessons: [],
      lastPracticed: null,
    };

    if (level > skillProgress.level) {
      skillProgress.level = level;
    }

    if (!skillProgress.completedLessons.includes(lessonId)) {
      skillProgress.completedLessons.push(lessonId);
    }

    skillProgress.lastPracticed = new Date();

    const updatedSkills = {
      ...skills,
      [skillId]: skillProgress,
    };

    this.updateMockProgress(languageId, {
      skills: updatedSkills,
    });

    return { success: true };
  }

  /**
   * Update streak in preview mode
   */
  updateStreak(languageId) {
    const progress = this.getMockProgress(languageId);
    if (!progress) return null;

    const lastActiveDate = progress.lastActiveDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = progress.currentStreak || 0;
    let longestStreak = progress.longestStreak || 0;

    if (lastActiveDate) {
      const lastDate = new Date(lastActiveDate);
      lastDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        // Already completed today
        return { currentStreak, longestStreak };
      } else if (daysDiff === 1) {
        // Continue streak
        currentStreak += 1;
      } else {
        // Reset streak
        currentStreak = 1;
      }
    } else {
      // First time
      currentStreak = 1;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    this.updateMockProgress(languageId, {
      currentStreak,
      longestStreak,
      lastActiveDate: new Date(),
    });

    return { currentStreak, longestStreak };
  }
}

export default new PreviewService();

