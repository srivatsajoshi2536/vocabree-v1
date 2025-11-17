/**
 * Progress Context
 * Manages user learning progress, XP, streaks, and achievements
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { calculateLevel, shouldMaintainStreak } from '../utils/helpers';
import { XP_REWARDS } from '../utils/constants';
import previewService from '../services/previewService';

// We'll use a callback to reload userProfile after XP updates
let reloadUserProfileCallback = null;
export const setReloadUserProfileCallback = (callback) => {
  reloadUserProfileCallback = callback;
};

const ProgressContext = createContext({});

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState({}); // { languageId: progressData }
  const [loading, setLoading] = useState(false);

  /**
   * Load progress for a specific language
   */
  const loadProgress = async (languageId) => {
    if (!user) return null;

    try {
      setLoading(true);
      
      // Check if preview mode
      const isPreviewMode = await previewService.checkPreviewMode();
      if (isPreviewMode) {
        const mockProgress = previewService.getMockProgress(languageId);
        if (mockProgress) {
          setProgress((prev) => ({
            ...prev,
            [languageId]: mockProgress,
          }));
          return mockProgress;
        } else {
          // Initialize new progress in preview mode
          const newProgress = {
            userId: user.uid,
            languageId,
            level: 1,
            totalXP: 0,
            currentStreak: 0,
            longestStreak: 0,
            skills: {},
            vocabulary: [],
            lastActiveDate: null,
          };
          previewService.updateMockProgress(languageId, newProgress);
          setProgress((prev) => ({
            ...prev,
            [languageId]: newProgress,
          }));
          return newProgress;
        }
      }

      // Normal mode - use Firebase
      const progressId = `${user.uid}_${languageId}`;
      const progressDoc = await getDoc(doc(db, 'progress', progressId));

      if (progressDoc.exists()) {
        const progressData = progressDoc.data();
        setProgress((prev) => ({
          ...prev,
          [languageId]: progressData,
        }));

        // Cache locally
        await AsyncStorage.setItem(
          `progress_${languageId}`,
          JSON.stringify(progressData)
        );

        return progressData;
      } else {
        // Initialize new progress
        const newProgress = {
          userId: user.uid,
          languageId,
          level: 1,
          totalXP: 0,
          currentStreak: 0,
          longestStreak: 0,
          skills: {},
          vocabulary: [],
          lastActiveDate: null,
        };

        await setDoc(doc(db, 'progress', progressId), newProgress);
        setProgress((prev) => ({
          ...prev,
          [languageId]: newProgress,
        }));

        return newProgress;
      }
    } catch (err) {
      console.error('Error loading progress:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Award XP and update progress
   */
  const awardXP = async (languageId, xp, bonusXP = 0) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      // Check if preview mode
      const isPreviewMode = await previewService.checkPreviewMode();
      if (isPreviewMode) {
        const result = previewService.awardXP(languageId, xp, bonusXP);
        if (result) {
          const updatedProgress = previewService.getMockProgress(languageId);
          setProgress((prev) => ({
            ...prev,
            [languageId]: updatedProgress,
          }));
          // Update mock userProfile totalXP by aggregating all language XP
          const allMockProgress = Object.values(previewService.mockProgress || {});
          const totalMockXP = allMockProgress.reduce((sum, p) => sum + (p?.totalXP || 0), 0);
          previewService.updateMockUserProfile({ totalXP: totalMockXP });
          
          // Also update AuthContext's userProfile if it's using preview mode
          // This will be handled by AuthContext when it checks preview mode
        }
        return result || { success: false };
      }

      // Normal mode - use Firebase
      const progressId = `${user.uid}_${languageId}`;
      const currentProgress = progress[languageId] || await loadProgress(languageId);
      
      const totalXP = (currentProgress?.totalXP || 0) + xp + bonusXP;
      const newLevel = calculateLevel(totalXP);
      const oldLevel = currentProgress?.level || 1;

      const updates = {
        totalXP,
        level: newLevel,
        lastActiveDate: new Date(),
      };

      // Update streak
      const streakUpdated = await updateStreak(languageId);
      if (streakUpdated) {
        updates.currentStreak = streakUpdated.currentStreak;
        updates.longestStreak = streakUpdated.longestStreak;
      }

      await updateDoc(doc(db, 'progress', progressId), updates);

      // Update userProfile totalXP by aggregating all language XP
      try {
        // Get all progress documents to calculate total XP
        const allProgressDocs = await Promise.all(
          ['hindi', 'bengali', 'telugu', 'kannada', 'tamil'].map(async (lang) => {
            const langProgressId = `${user.uid}_${lang}`;
            const langDoc = await getDoc(doc(db, 'progress', langProgressId));
            return langDoc.exists() ? langDoc.data().totalXP || 0 : 0;
          })
        );
        const aggregatedTotalXP = allProgressDocs.reduce((sum, xp) => sum + xp, 0);
        
        // Update userProfile totalXP
        await updateDoc(doc(db, 'users', user.uid), {
          totalXP: aggregatedTotalXP,
          updatedAt: new Date(),
        });
        
        // Reload userProfile to reflect updated totalXP
        if (reloadUserProfileCallback) {
          reloadUserProfileCallback();
        }
      } catch (err) {
        console.error('Error updating userProfile totalXP:', err);
        // Don't fail the XP award if userProfile update fails
      }

      // Update local state
      setProgress((prev) => ({
        ...prev,
        [languageId]: {
          ...currentProgress,
          ...updates,
        },
      }));

      // Cache locally
      await AsyncStorage.setItem(
        `progress_${languageId}`,
        JSON.stringify({ ...currentProgress, ...updates })
      );

      return {
        success: true,
        leveledUp: newLevel > oldLevel,
        newLevel,
        totalXP,
      };
    } catch (err) {
      console.error('Error awarding XP:', err);
      return { success: false, error: err.message };
    }
  };

  /**
   * Update streak
   */
  const updateStreak = async (languageId) => {
    if (!user) return null;

    try {
      const currentProgress = progress[languageId] || await loadProgress(languageId);
      if (!currentProgress) return null;

      const lastActiveDate = currentProgress.lastActiveDate?.toDate();
      const shouldMaintain = shouldMaintainStreak(lastActiveDate);
      
      let currentStreak = currentProgress.currentStreak || 0;
      let longestStreak = currentProgress.longestStreak || 0;

      if (shouldMaintain) {
        // Check if already completed today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDate = lastActiveDate ? new Date(lastActiveDate) : null;
        if (lastDate) {
          lastDate.setHours(0, 0, 0, 0);
          if (lastDate.getTime() === today.getTime()) {
            // Already completed today, don't increment
            return { currentStreak, longestStreak };
          }
        }
        // Increment streak
        currentStreak += 1;
      } else {
        // Reset streak
        currentStreak = 1;
      }

      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }

      return { currentStreak, longestStreak };
    } catch (err) {
      console.error('Error updating streak:', err);
      return null;
    }
  };

  /**
   * Update skill progress
   */
  const updateSkillProgress = async (languageId, skillId, level, lessonId) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      // Check if preview mode
      const isPreviewMode = await previewService.checkPreviewMode();
      if (isPreviewMode) {
        const result = previewService.updateSkillProgress(languageId, skillId, level, lessonId);
        if (result.success) {
          const updatedProgress = previewService.getMockProgress(languageId);
          setProgress((prev) => ({
            ...prev,
            [languageId]: updatedProgress,
          }));
        }
        return result;
      }

      // Normal mode - use Firebase
      const progressId = `${user.uid}_${languageId}`;
      const currentProgress = progress[languageId] || await loadProgress(languageId);

      const skills = currentProgress?.skills || {};
      const skillProgress = skills[skillId] || {
        level: 0,
        completedLessons: [],
        lastPracticed: null,
      };

      // Update skill level if higher
      if (level > skillProgress.level) {
        skillProgress.level = level;
      }

      // Add lesson if not already completed
      if (!skillProgress.completedLessons.includes(lessonId)) {
        skillProgress.completedLessons.push(lessonId);
      }

      skillProgress.lastPracticed = new Date();

      const updates = {
        skills: {
          ...skills,
          [skillId]: skillProgress,
        },
      };

      await updateDoc(doc(db, 'progress', progressId), updates);

      // Update local state
      setProgress((prev) => ({
        ...prev,
        [languageId]: {
          ...currentProgress,
          ...updates,
        },
      }));

      return { success: true };
    } catch (err) {
      console.error('Error updating skill progress:', err);
      return { success: false, error: err.message };
    }
  };

  /**
   * Get progress for a language
   */
  const getProgress = (languageId) => {
    return progress[languageId] || null;
  };

  /**
   * Get total XP across all languages
   */
  const getTotalXP = () => {
    let total = 0;
    Object.values(progress).forEach((langProgress) => {
      if (langProgress?.totalXP) {
        total += langProgress.totalXP;
      }
    });
    return total;
  };

  /**
   * Check if skill is unlocked
   */
  const isSkillUnlocked = (languageId, skillId, requiredSkills = []) => {
    // Skills with no required skills are always unlocked (e.g., basics_1)
    if (!requiredSkills || requiredSkills.length === 0) {
      return true;
    }

    const currentProgress = progress[languageId];
    if (!currentProgress) {
      // No progress yet, so skill is locked if it has requirements
      return false;
    }

    // Check if all required skills are completed (level >= 1)
    const skills = currentProgress.skills || {};
    return requiredSkills.every((reqSkillId) => {
      const reqSkill = skills[reqSkillId];
      return reqSkill && reqSkill.level >= 1;
    });
  };

  const value = {
    progress,
    loading,
    loadProgress,
    awardXP,
    updateStreak,
    updateSkillProgress,
    getProgress,
    getTotalXP,
    isSkillUnlocked,
  };

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
};

export default ProgressContext;

