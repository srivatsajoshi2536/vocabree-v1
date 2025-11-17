/**
 * Multiple Choice Exercise Renderer
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../common/Button';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import audioService from '../../services/audioService';
import { useLanguage } from '../../context/LanguageContext';

const MultipleChoiceRenderer = ({ exercise, onAnswer, languageId: propLanguageId }) => {
  const { selectedLanguage } = useLanguage();
  // Use languageId from props (lesson-specific) or fallback to context
  const languageId = propLanguageId || selectedLanguage || 'hindi';
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = async () => {
    if (isPlayingAudio) {
      await audioService.stopAll();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    try {
      // Check if exercise has audioText (native script) or audioFile
      const audioText = exercise.audioText || exercise.questionAudio || exercise.audioFile;
      
      if (audioText) {
        // If it's native script text (not a filename), use playText
        const isNativeScript = /[^\x00-\x7F]/.test(audioText) && !audioText.includes('.mp3');
        
        if (isNativeScript) {
          await audioService.playText(audioText, languageId);
        } else {
          await audioService.playSound(audioText, languageId);
        }
      } else if (exercise.question) {
        // Use TTS for question text
        await audioService.playTTS(exercise.question, languageId);
      }
      setTimeout(() => setIsPlayingAudio(false), 3000);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlayingAudio(false);
    }
  };

  const handleSelect = (option) => {
    if (showFeedback) return; // Prevent selection after answer
    
    setSelectedOption(option);
    const isCorrect = option === exercise.correctAnswer;
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(isCorrect, exercise, selectedOption);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
      <Text style={styles.question}>{exercise.question}</Text>
        {(exercise.questionAudio || exercise.audioFile || exercise.question) && (
          <TouchableOpacity
            onPress={handlePlayAudio}
            style={[styles.audioButton, isPlayingAudio && styles.audioButtonPlaying]}
          >
            <Ionicons
              name={isPlayingAudio ? 'pause' : 'volume-high'}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
      </View>
      
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
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  question: {
    ...TYPOGRAPHY.h3,
    textAlign: 'center',
    flex: 1,
  },
  audioButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  audioButtonPlaying: {
    backgroundColor: COLORS.primary,
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

export default MultipleChoiceRenderer;

