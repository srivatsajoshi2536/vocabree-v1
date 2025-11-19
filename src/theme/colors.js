/**
 * Neobrutalism color scheme with neon grey and white
 * Playful, bold, high-contrast design
 */

// Neobrutalism colors - neon grey and white theme
export const LIGHT_COLORS = {
  // Language-specific colors (vibrant, playful)
  hindi: '#FF6B9D', // Hot pink
  bengali: '#00F5FF', // Cyan
  telugu: '#FFD93D', // Bright yellow
  kannada: '#6BCF7F', // Neon green
  tamil: '#FF8C42', // Orange
  
  // Common colors
  primary: '#2D2D2D', // Dark grey (almost black)
  success: '#00FF88', // Neon green
  error: '#FF1744', // Bright red
  warning: '#FFB800', // Bright yellow
  
  // Neutrals - neon grey and white theme
  white: '#FFFFFF',
  background: '#E8E8E8', // Light grey (neon grey)
  textPrimary: '#1A1A1A', // Almost black
  textSecondary: '#4A4A4A', // Medium grey
  border: '#1A1A1A', // Black borders for neobrutalism
  cardBackground: '#FFFFFF',
  
  // Gamification (playful, vibrant)
  xpGold: '#FFD700',
  streakFire: '#FF4444',
  levelPurple: '#9D4EDD',
  
  // Skill states
  skillLocked: '#B0B0B0',
  skillUnlocked: '#00FF88',
  skillCurrent: '#2D2D2D',
  
  // Exercise feedback
  correct: '#00FF88',
  incorrect: '#FF1744',
  neutral: '#4A4A4A',
  
  // Neobrutalism specific
  accent: '#00F5FF', // Cyan accent
  shadow: '#1A1A1A', // Black shadow for offset effect
};

// Dark mode (still neobrutalism but inverted)
export const DARK_COLORS = {
  // Language-specific colors (same vibrant colors)
  hindi: '#FF6B9D',
  bengali: '#00F5FF',
  telugu: '#FFD93D',
  kannada: '#6BCF7F',
  tamil: '#FF8C42',
  
  // Common colors
  primary: '#FFFFFF',
  success: '#00FF88',
  error: '#FF1744',
  warning: '#FFB800',
  
  // Neutrals (inverted)
  white: '#1A1A1A',
  background: '#2D2D2D',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#FFFFFF',
  cardBackground: '#1A1A1A',
  
  // Gamification
  xpGold: '#FFD700',
  streakFire: '#FF4444',
  levelPurple: '#9D4EDD',
  
  // Skill states
  skillLocked: '#4A4A4A',
  skillUnlocked: '#00FF88',
  skillCurrent: '#FFFFFF',
  
  // Exercise feedback
  correct: '#00FF88',
  incorrect: '#FF1744',
  neutral: '#B0B0B0',
  
  // Neobrutalism specific
  accent: '#00F5FF',
  shadow: '#FFFFFF',
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

