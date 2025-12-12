/**
 * Review Mistakes Screen
 * Displays all incorrect exercises from a completed lesson
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import audioService from '../../services/audioService';
import { useLanguage } from '../../context/LanguageContext';

const ReviewMistakesScreen = ({ route, navigation }) => {
  const { incorrectExercises = [], skillId, skillName, languageId, level } = route.params || {};
  const { selectedLanguage } = useLanguage();
  const reviewLanguageId = languageId || selectedLanguage || 'hindi';

  const handlePlayAudio = async (exercise) => {
    try {
      const audioText = exercise.audioText || exercise.questionAudio || exercise.audioFile;
      if (audioText) {
        const isNativeScript = /[^\x00-\x7F]/.test(audioText) && !audioText.includes('.mp3');
        if (isNativeScript) {
          await audioService.playText(audioText, reviewLanguageId);
        } else {
          await audioService.playSound(audioText, reviewLanguageId);
        }
      } else if (exercise.question) {
        await audioService.playTTS(exercise.question, reviewLanguageId);
      } else if (exercise.questionText) {
        await audioService.playTTS(exercise.questionText, reviewLanguageId);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const getExerciseTypeLabel = (type) => {
    const labels = {
      multipleChoice: 'Multiple Choice',
      translation: 'Translation',
      listening: 'Listening',
      matching: 'Matching',
      fillInBlank: 'Fill in the Blank',
    };
    return labels[type] || type;
  };

  const renderExercise = (exercise, index) => {
    const hasAudio = exercise.audioText || exercise.questionAudio || exercise.audioFile || exercise.question || exercise.questionText;

    return (
      <Card key={index} style={styles.exerciseCard}>
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseNumber}>
            <Text style={styles.exerciseNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.exerciseType}>{getExerciseTypeLabel(exercise.type)}</Text>
          {hasAudio && (
            <TouchableOpacity
              onPress={() => handlePlayAudio(exercise)}
              style={styles.audioButton}
            >
              <Ionicons name="volume-high" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Question:</Text>
          <Text style={styles.questionText}>
            {exercise.question || exercise.questionText || 'N/A'}
          </Text>
        </View>

        {/* User Answer */}
        <View style={styles.answerContainer}>
          <View style={styles.answerRow}>
            <Ionicons name="close-circle" size={20} color={COLORS.error} />
            <Text style={styles.answerLabel}>Your Answer:</Text>
          </View>
          <Text style={styles.userAnswer}>{exercise.userAnswer || 'N/A'}</Text>
        </View>

        {/* Correct Answer */}
        <View style={styles.answerContainer}>
          <View style={styles.answerRow}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.answerLabel}>Correct Answer:</Text>
          </View>
          <Text style={styles.correctAnswer}>{exercise.correctAnswer || 'N/A'}</Text>
        </View>

        {/* Explanation */}
        {exercise.explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationLabel}>Explanation:</Text>
            <Text style={styles.explanationText}>{exercise.explanation}</Text>
          </View>
        )}

        {/* Options (for multiple choice) */}
        {exercise.options && exercise.type === 'multipleChoice' && (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsLabel}>Options:</Text>
            {exercise.options.map((option, optIndex) => {
              const isCorrect = option === exercise.correctAnswer;
              const isUserAnswer = option === exercise.userAnswer;
              return (
                <View
                  key={optIndex}
                  style={[
                    styles.optionItem,
                    isCorrect && styles.correctOption,
                    isUserAnswer && !isCorrect && styles.incorrectOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isCorrect && styles.correctOptionText,
                      isUserAnswer && !isCorrect && styles.incorrectOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {isCorrect && (
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  )}
                  {isUserAnswer && !isCorrect && (
                    <Ionicons name="close-circle" size={16} color={COLORS.error} />
                  )}
                </View>
              );
            })}
          </View>
        )}
      </Card>
    );
  };

  if (incorrectExercises.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Review Mistakes</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-circle" size={64} color={COLORS.success} />
          <Text style={styles.emptyTitle}>No Mistakes!</Text>
          <Text style={styles.emptyText}>
            Great job! You answered all questions correctly.
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={styles.backButtonStyle}
          />
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
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Mistakes</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Mistakes to Review</Text>
          <Text style={styles.summaryText}>
            You got {incorrectExercises.length} question{incorrectExercises.length !== 1 ? 's' : ''} wrong.
            Review them to improve your understanding.
          </Text>
        </Card>
      </View>

      {/* Exercises List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {incorrectExercises.map((exercise, index) => renderExercise(exercise, index))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="Retry Lesson"
          onPress={() => {
            navigation.navigate('Lesson', {
              skillId,
              skillName,
              languageId: reviewLanguageId,
              level,
            });
          }}
          style={styles.retryButton}
        />
        <Button
          title="Continue Learning"
          variant="outline"
          onPress={() => {
            navigation.navigate('MainTabs', { screen: 'Home' });
          }}
          style={styles.continueButton}
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
  },
  placeholder: {
    width: 40,
  },
  summaryContainer: {
    padding: 16,
  },
  summaryCard: {
    padding: 16,
  },
  summaryTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: 8,
  },
  summaryText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  exerciseCard: {
    marginBottom: 16,
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.error + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.error,
  },
  exerciseType: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    flex: 1,
  },
  audioButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  questionContainer: {
    marginBottom: 16,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  questionText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  answerContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  answerLabel: {
    ...TYPOGRAPHY.label,
    fontWeight: '600',
  },
  userAnswer: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    fontWeight: '600',
  },
  correctAnswer: {
    ...TYPOGRAPHY.body,
    color: COLORS.success,
    fontWeight: '600',
  },
  explanationContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.primary + '10',
    borderRadius: 8,
  },
  explanationLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    marginBottom: 4,
    fontWeight: '600',
  },
  explanationText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  optionsContainer: {
    marginTop: 12,
  },
  optionsLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  correctOption: {
    backgroundColor: COLORS.success + '20',
    borderColor: COLORS.success,
  },
  incorrectOption: {
    backgroundColor: COLORS.error + '20',
    borderColor: COLORS.error,
  },
  optionText: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },
  correctOptionText: {
    color: COLORS.success,
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: COLORS.error,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  retryButton: {
    marginBottom: 12,
  },
  continueButton: {
    marginBottom: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h2,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  backButtonStyle: {
    width: '100%',
    maxWidth: 300,
  },
});

export default ReviewMistakesScreen;

