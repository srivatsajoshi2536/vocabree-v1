/**
 * Color scheme for vocabree app
 * Language-specific colors and common UI colors
 * Supports both light and dark modes
 */

// Light mode colors
export const LIGHT_COLORS = {
  // Language-specific colors
  hindi: '#FF9933',
  bengali: '#DC143C',
  telugu: '#FFD700',
  kannada: '#FF6B6B',
  tamil: '#B22222',
  
  // Common colors
  primary: '#2196F3',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  
  // Neutrals
  white: '#FFFFFF',
  background: '#F5F5F5',
  textPrimary: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  cardBackground: '#FFFFFF',
  
  // Gamification
  xpGold: '#FFD700',
  streakFire: '#FF6B35',
  levelPurple: '#9C27B0',
  
  // Skill states
  skillLocked: '#CCCCCC',
  skillUnlocked: '#4CAF50',
  skillCurrent: '#2196F3',
  
  // Exercise feedback
  correct: '#4CAF50',
  incorrect: '#F44336',
  neutral: '#757575',
};

// Dark mode colors
export const DARK_COLORS = {
  // Language-specific colors (same as light)
  hindi: '#FF9933',
  bengali: '#DC143C',
  telugu: '#FFD700',
  kannada: '#FF6B6B',
  tamil: '#B22222',
  
  // Common colors (same as light)
  primary: '#42A5F5',
  success: '#66BB6A',
  error: '#EF5350',
  warning: '#FFB74D',
  
  // Neutrals (dark mode)
  white: '#121212',
  background: '#000000',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
  cardBackground: '#1E1E1E',
  
  // Gamification (same as light)
  xpGold: '#FFD700',
  streakFire: '#FF6B35',
  levelPurple: '#BA68C8',
  
  // Skill states
  skillLocked: '#555555',
  skillUnlocked: '#66BB6A',
  skillCurrent: '#42A5F5',
  
  // Exercise feedback
  correct: '#66BB6A',
  incorrect: '#EF5350',
  neutral: '#B0B0B0',
};

// Default to light mode (will be overridden by ThemeContext)
export const COLORS = LIGHT_COLORS;

/**
 * Get colors based on theme mode
 */
export const getColors = (isDarkMode = false) => {
  return isDarkMode ? DARK_COLORS : LIGHT_COLORS;
};

/**
 * Get color for a specific language
 */
export const getLanguageColor = (languageId, isDarkMode = false) => {
  const colors = getColors(isDarkMode);
  const colorMap = {
    hindi: colors.hindi,
    bengali: colors.bengali,
    telugu: colors.telugu,
    kannada: colors.kannada,
    tamil: colors.tamil,
  };
  return colorMap[languageId] || colors.primary;
};

export default COLORS;

