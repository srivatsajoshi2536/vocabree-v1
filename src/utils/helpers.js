/**
 * Utility helper functions
 */

import { format, isToday, isYesterday, differenceInDays } from 'date-fns';

/**
 * Format date for display
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  
  let dateObj;
  if (date instanceof Date) {
    dateObj = date;
  } else if (date && typeof date.toDate === 'function') {
    dateObj = date.toDate();
  } else {
    // Try to convert to Date if possible
    dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return ''; // Invalid date
    }
  }
  
  if (isToday(dateObj)) return 'Today';
  if (isYesterday(dateObj)) return 'Yesterday';
  
  return format(dateObj, formatStr);
};

/**
 * Calculate level from total XP
 * Formula: Level = floor(sqrt(totalXP / 100))
 */
export const calculateLevel = (totalXP) => {
  return Math.floor(Math.sqrt(totalXP / 100)) || 1;
};

/**
 * Calculate XP needed for next level
 */
export const getXPForNextLevel = (currentLevel) => {
  if (!currentLevel || currentLevel < 1) {
    currentLevel = 1;
  }
  const nextLevelXP = Math.pow(currentLevel + 1, 2) * 100;
  const currentLevelXP = Math.pow(currentLevel, 2) * 100;
  return nextLevelXP - currentLevelXP;
};

/**
 * Calculate progress percentage for current level
 */
export const getLevelProgress = (totalXP, currentLevel) => {
  if (!totalXP || totalXP < 0) totalXP = 0;
  if (!currentLevel || currentLevel < 1) currentLevel = 1;
  
  const currentLevelXP = Math.pow(currentLevel, 2) * 100;
  const nextLevelXP = Math.pow(currentLevel + 1, 2) * 100;
  const progressXP = totalXP - currentLevelXP;
  const neededXP = nextLevelXP - currentLevelXP;
  
  if (neededXP <= 0) return 100; // Prevent division by zero
  
  return Math.min(100, Math.max(0, (progressXP / neededXP) * 100));
};

/**
 * Check if streak should be maintained
 */
export const shouldMaintainStreak = (lastActiveDate) => {
  if (!lastActiveDate) return false;
  
  let lastDate;
  if (lastActiveDate instanceof Date) {
    lastDate = lastActiveDate;
  } else if (lastActiveDate && typeof lastActiveDate.toDate === 'function') {
    lastDate = lastActiveDate.toDate();
  } else {
    // Try to convert to Date if possible
    lastDate = new Date(lastActiveDate);
    if (isNaN(lastDate.getTime())) {
      return false; // Invalid date
    }
  }
  
  const daysDiff = differenceInDays(new Date(), lastDate);
  return daysDiff <= 1; // Within 24 hours
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export default {
  formatDate,
  calculateLevel,
  getXPForNextLevel,
  getLevelProgress,
  shouldMaintainStreak,
  truncateText,
  isValidEmail,
  isValidPassword,
  generateId,
  shuffleArray,
  calculateAccuracy,
};

// src/utils/helpers.js

export const tokenizeSentence = (sentence) => {
  if (!sentence) return [];
  return sentence
    .replace(/[.,!?;:"()]/g, "")
    .split(/\s+/)
    .map(word => word.toLowerCase())
    .filter(Boolean);
};