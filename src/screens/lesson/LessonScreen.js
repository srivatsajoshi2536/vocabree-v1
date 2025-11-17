/**
 * Lesson Screen
 * Core learning experience with exercises
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
import ProgressBar from '../../components/common/ProgressBar';
import HeartIndicator from '../../components/lesson/HeartIndicator';
import MultipleChoiceRenderer from '../../components/lesson/MultipleChoiceRenderer';
import TranslationRenderer from '../../components/lesson/TranslationRenderer';
import ListeningRenderer from '../../components/lesson/ListeningRenderer';
import MatchingRenderer from '../../components/lesson/MatchingRenderer';
import FillInBlankRenderer from '../../components/lesson/FillInBlankRenderer';
import { COLORS, getLanguageColor } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { useProgress } from '../../context/ProgressContext';
import lessonService from '../../services/lessonService';
import audioService from '../../services/audioService';

const LessonScreen = ({ route, navigation }) => {
  const { skillId, skillName, languageId, level = 1, isPractice = false } = route.params || {};
  const { awardXP, updateSkillProgress } = useProgress();
  // Use languageId from route params, fallback to selectedLanguage from context if needed
  const lessonLanguageId = languageId || 'hindi';
  const [currentExercise, setCurrentExercise] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lessonData, setLessonData] = useState(null);
  const [lessonFailed, setLessonFailed] = useState(false);
  const [incorrectExercises, setIncorrectExercises] = useState([]);

  useEffect(() => {
    loadLessonData();
    // Initialize audio service
    audioService.initialize();
    
    // Cleanup on unmount
    return () => {
      audioService.stopAll();
    };
  }, []);

  const loadLessonData = () => {
    // If practice mode and lessonData is provided, use it (from practice generator)
    if (isPractice && route.params?.lessonData) {
      setLessonData(route.params.lessonData);
    } else {
    const lesson = lessonService.getLesson(languageId || 'hindi', skillId || 'basics_1', level);
    setLessonData(lesson);
    }
  };

  const exercises = lessonData?.exercises || [];
  const totalExercises = exercises.length;
  const progress = totalExercises > 0 ? ((currentExercise + 1) / totalExercises) * 100 : 0;
  const currentExerciseData = exercises[currentExercise];

  const handleAnswer = async (isCorrect, exercise, userAnswer = null) => {
    // Play feedback sound
    if (isCorrect) {
      await audioService.playSuccessSound();
      setCorrectAnswers(correctAnswers + 1);
    } else {
      await audioService.playErrorSound();
      const newHearts = hearts - 1;
      setHearts(newHearts);

      // Track incorrect exercise
      setIncorrectExercises(prev => [...prev, {
        ...exercise,
        userAnswer: userAnswer || 'N/A',
        correctAnswer: exercise.correctAnswer || exercise.answer || 'N/A',
      }]);

      if (newHearts === 0) {
        // Lesson failed
        setLessonFailed(true);
        return;
      }
    }

    // Move to next exercise
    if (currentExercise < totalExercises - 1) {
      setTimeout(() => {
        setCurrentExercise(currentExercise + 1);
      }, 2000);
    } else {
      // Lesson complete
      completeLesson();
    }
  };

  const completeLesson = async () => {
    // Practice mode gives reduced XP (5 XP) vs regular lessons (10 XP)
    const baseXP = isPractice ? 5 : (lessonData?.xpReward || 10);
    const accuracy = (correctAnswers / totalExercises) * 100;
    const bonusXP = accuracy === 100 ? (isPractice ? 2 : 5) : 0; // Reduced bonus for practice
    const xpEarned = baseXP + bonusXP;

    // Award XP and check for level up
    const xpResult = await awardXP(languageId || 'hindi', baseXP, bonusXP);
    const leveledUp = xpResult?.leveledUp || false;

    // Update skill progress - practice strengthens skills (prevents decay)
    const skillLevel = Math.min(5, Math.floor((correctAnswers / totalExercises) * 5) + 1);
    await updateSkillProgress(
      languageId || 'hindi',
      skillId || 'basics_1',
      skillLevel,
      lessonData?.lessonId || 'basics_1_l1'
    );

    // Navigate to completion screen
    navigation.replace('LessonComplete', {
      xpEarned: xpEarned,
      accuracy,
      totalExercises,
      correctAnswers,
      skillId,
      skillName,
      leveledUp,
      incorrectExercises,
      languageId: languageId || 'hindi',
      level,
      isPractice,
    });
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setHearts(3);
    setCorrectAnswers(0);
    setLessonFailed(false);
    setIncorrectExercises([]);
  };

  const renderExercise = () => {
    if (!currentExerciseData) {
      return (
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseText}>Loading exercise...</Text>
        </View>
      );
    }

    const exerciseType = currentExerciseData.type;

    switch (exerciseType) {
      case 'multipleChoice':
        return (
          <MultipleChoiceRenderer
            exercise={currentExerciseData}
            onAnswer={handleAnswer}
            languageId={lessonLanguageId}
          />
        );
      case 'translation':
        return (
          <TranslationRenderer
            exercise={currentExerciseData}
            onAnswer={handleAnswer}
            languageId={lessonLanguageId}
          />
        );
      case 'listening':
        return (
          <ListeningRenderer
            exercise={currentExerciseData}
            onAnswer={handleAnswer}
            languageId={lessonLanguageId}
          />
        );
      case 'matching':
        return (
          <MatchingRenderer
            exercise={currentExerciseData}
            onAnswer={handleAnswer}
            languageId={lessonLanguageId}
          />
        );
      case 'fillInBlank':
        return (
          <FillInBlankRenderer
            exercise={currentExerciseData}
            onAnswer={handleAnswer}
            languageId={lessonLanguageId}
          />
        );
      default:
        return (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseText}>
              Unknown exercise type: {exerciseType}
            </Text>
          </View>
        );
    }
  };

  if (lessonFailed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.failedContainer}>
          <Ionicons name="heart-dislike" size={64} color={COLORS.error} />
          <Text style={styles.failedTitle}>Lesson Failed</Text>
          <Text style={styles.failedText}>
            You ran out of hearts! Don't worry, you can try again.
          </Text>
          <View style={styles.failedActions}>
            <TouchableOpacity
              onPress={handleRestart}
              style={styles.restartButton}
            >
              <Text style={styles.restartButtonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.exitButton}
            >
              <Text style={styles.exitButtonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="close" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{skillName || 'Lesson'}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={progress}
          height={8}
          color={getLanguageColor(languageId || 'hindi')}
        />
        <Text style={styles.progressText}>
          {currentExercise + 1} / {totalExercises}
        </Text>
      </View>

      {/* Hearts */}
      <View style={styles.heartsContainer}>
        <HeartIndicator hearts={hearts} />
      </View>

      {/* Exercise Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderExercise()}
      </ScrollView>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    marginTop: 8,
    color: COLORS.textSecondary,
  },
  heartsContainer: {
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  exerciseContainer: {
    padding: 24,
    alignItems: 'center',
  },
  exerciseText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  failedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  failedTitle: {
    ...TYPOGRAPHY.h1,
    marginTop: 24,
    marginBottom: 12,
  },
  failedText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  failedActions: {
    width: '100%',
    gap: 12,
  },
  restartButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  restartButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  exitButton: {
    backgroundColor: COLORS.border,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  exitButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textPrimary,
  },
});

export default LessonScreen;
