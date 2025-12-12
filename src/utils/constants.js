/**
 * App-wide constants
 */

export const LANGUAGES = {
  hindi: {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
  },
  bengali: {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
  },
  telugu: {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
  },
  kannada: {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
  },
  tamil: {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
  },
};

export const EXERCISE_TYPES = {
  MULTIPLE_CHOICE: 'multipleChoice',
  TRANSLATION: 'translation',
  LISTENING: 'listening',
  SPEAKING: 'speaking',
  MATCHING: 'matching',
  FILL_IN_BLANK: 'fillInBlank',
};

export const XP_REWARDS = {
  LESSON_COMPLETE: 10,
  PERFECT_LESSON: 5, // Bonus
  PRACTICE: 5,
  DAILY_GOAL_BONUS: 10,
};

export const STREAK_FREEZE_COST = 50; // XP cost to freeze streak

export const DAILY_XP_GOALS = [10, 20, 50, 100];

export const HEARTS_PER_LESSON = 3;

export const SKILL_LEVELS = 5; // Crowns per skill

export const ACHIEVEMENTS = {
  FIRST_LESSON: 'first_lesson',
  WEEK_WARRIOR: 'week_warrior',
  POLYGLOT: 'polyglot',
  PERFECT_STUDENT: 'perfect_student',
  EARLY_BIRD: 'early_bird',
  NIGHT_OWL: 'night_owl',
  MONTH_MASTER: 'month_master',
  VOCAB_MASTER: 'vocab_master',
};

export default {
  LANGUAGES,
  EXERCISE_TYPES,
  XP_REWARDS,
  STREAK_FREEZE_COST,
  DAILY_XP_GOALS,
  HEARTS_PER_LESSON,
  SKILL_LEVELS,
  ACHIEVEMENTS,
};

