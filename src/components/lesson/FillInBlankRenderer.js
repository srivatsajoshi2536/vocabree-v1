/**
 * Fill in the Blank Exercise Renderer
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../common/Button';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

const FillInBlankRenderer = ({ exercise, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Split question to show blank
  const questionParts = exercise.question.split('___');
  const hasBlank = questionParts.length > 1;

  const handleSelect = (option) => {
    if (showFeedback) return;
    
    setSelectedOption(option);
    const isCorrect = option === exercise.correctAnswer;
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(isCorrect, exercise, selectedOption);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionLabel}>Complete the sentence:</Text>
      
      {/* Question with blank */}
      <View style={styles.questionContainer}>
        {hasBlank ? (
          <Text style={styles.questionText}>
            {questionParts[0]}
            <Text style={styles.blank}>
              {selectedOption ? ` ${selectedOption} ` : ' _____ '}
            </Text>
            {questionParts[1]}
          </Text>
        ) : (
          <Text style={styles.questionText}>{exercise.question}</Text>
        )}
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {exercise.options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === exercise.correctAnswer;
          const showCorrect = showFeedback && isCorrect;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <Button
              key={index}
              title={option}
              variant="outline"
              onPress={() => handleSelect(option)}
              style={[
                styles.option,
                showCorrect && styles.correctOption,
                showIncorrect && styles.incorrectOption,
              ]}
              textStyle={[
                showCorrect && styles.correctText,
                showIncorrect && styles.incorrectText,
              ]}
            />
          );
        })}
      </View>

      {/* Feedback */}
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text
            style={[
              styles.feedbackText,
              selectedOption === exercise.correctAnswer
                ? styles.correctFeedback
                : styles.incorrectFeedback,
            ]}
          >
            {selectedOption === exercise.correctAnswer
              ? '✓ Correct!'
              : `✗ Incorrect. Correct answer: ${exercise.correctAnswer}`}
          </Text>
          {exercise.explanation && (
            <Text style={styles.explanation}>{exercise.explanation}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  questionLabel: {
    ...TYPOGRAPHY.label,
    marginBottom: 16,
    color: COLORS.textSecondary,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    ...TYPOGRAPHY.h3,
    textAlign: 'center',
    lineHeight: 40,
  },
  blank: {
    backgroundColor: COLORS.primary + '20',
    color: COLORS.primary,
    fontWeight: '600',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    marginBottom: 8,
  },
  correctOption: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  incorrectOption: {
    backgroundColor: COLORS.error + '20',
    borderColor: COLORS.error,
  },
  correctText: {
    color: COLORS.white,
  },
  incorrectText: {
    color: COLORS.error,
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  feedbackText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 8,
  },
  correctFeedback: {
    color: COLORS.success,
  },
  incorrectFeedback: {
    color: COLORS.error,
  },
  explanation: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
});

export default FillInBlankRenderer;

