/**
 * Utility helper functions
 */

import { format, isToday, isYesterday, differenceInDays } from 'date-fns';

/**
 * Format date for display
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : date.toDate();
  
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
  const nextLevelXP = Math.pow(currentLevel + 1, 2) * 100;
  const currentLevelXP = Math.pow(currentLevel, 2) * 100;
  return nextLevelXP - currentLevelXP;
};

/**
 * Calculate progress percentage for current level
 */
export const getLevelProgress = (totalXP, currentLevel) => {
  const currentLevelXP = Math.pow(currentLevel, 2) * 100;
  const nextLevelXP = Math.pow(currentLevel + 1, 2) * 100;
  const progressXP = totalXP - currentLevelXP;
  const neededXP = nextLevelXP - currentLevelXP;
  
  return Math.min(100, Math.max(0, (progressXP / neededXP) * 100));
};

/**
 * Check if streak should be maintained
 */
export const shouldMaintainStreak = (lastActiveDate) => {
  if (!lastActiveDate) return false;
  
  const lastDate = lastActiveDate instanceof Date 
    ? lastActiveDate 
    : lastActiveDate.toDate();
  
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
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
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

