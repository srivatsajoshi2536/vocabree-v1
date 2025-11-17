/**
 * Listening Exercise Renderer
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../common/Button';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import audioService from '../../services/audioService';
import { useLanguage } from '../../context/LanguageContext';

const ListeningRenderer = ({ exercise, onAnswer, languageId: propLanguageId }) => {
  const { selectedLanguage } = useLanguage();
  // Use languageId from props (lesson-specific) or fallback to context
  const languageId = propLanguageId || selectedLanguage || 'hindi';
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(false);

  // Auto-play audio when component mounts
  useEffect(() => {
    if (exercise.questionAudio || exercise.audioFile) {
      handlePlay();
    }
    
    // Cleanup on unmount
    return () => {
      audioService.stopAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlay = async () => {
    if (isPlaying) {
      // Stop if already playing
      await audioService.stopAll();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    
    try {
      // Check if exercise has audioText (native script) or audioFile
      const audioText = exercise.audioText || exercise.questionAudio || exercise.audioFile;
      
      if (audioText) {
        // If it's native script text (not a filename), use playText
        const isNativeScript = /[^\x00-\x7F]/.test(audioText) && !audioText.includes('.mp3');
        
        if (isNativeScript) {
          await audioService.playText(
            audioText,
            languageId,
            { rate: isSlowMode ? 0.7 : 0.9 }
          );
        } else {
          await audioService.playSoundSlow(
            audioText,
            languageId,
            isSlowMode
          );
        }
        
        // Wait a bit for playback to finish (approximate)
        // In production, you'd listen to playback status
        setTimeout(() => {
          setIsPlaying(false);
        }, 3000);
      } else {
        // Fallback: use question text for TTS
        await audioService.playTTS(
          exercise.question || exercise.questionText,
          languageId,
          { rate: isSlowMode ? 0.7 : 0.9 }
        );
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const handleSlowToggle = () => {
    setIsSlowMode(!isSlowMode);
    if (isPlaying) {
      handlePlay(); // Restart with new speed
    }
  };

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
      <Text style={styles.question}>{exercise.question}</Text>

      {/* Audio Player */}
      <View style={styles.audioContainer}>
        <TouchableOpacity
          onPress={handlePlay}
          style={[styles.playButton, isPlaying && styles.playingButton]}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <View style={styles.audioControls}>
        <Text style={styles.audioLabel}>
          {isPlaying ? 'Playing...' : 'Tap to play audio'}
        </Text>
          <TouchableOpacity
            onPress={handleSlowToggle}
            style={[styles.slowButton, isSlowMode && styles.slowButtonActive]}
          >
            <Text style={[styles.slowButtonText, isSlowMode && styles.slowButtonTextActive]}>
              🐢 Slow
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {exercise.options ? (
          exercise.options.map((option, index) => {
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
          })
        ) : (
          <View style={styles.textInputContainer}>
            <Text style={styles.inputLabel}>Type what you heard:</Text>
            <Text style={styles.placeholderInput}>
              {selectedOption || 'Enter your answer here'}
            </Text>
            <Button
              title="Check Answer"
              onPress={() => {
                // For demo, accept any answer
                setShowFeedback(true);
                setTimeout(() => {
                  onAnswer(true, exercise);
                }, 1500);
              }}
              style={styles.checkButton}
            />
          </View>
        )}
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
  question: {
    ...TYPOGRAPHY.h3,
    marginBottom: 24,
    textAlign: 'center',
  },
  audioContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  playingButton: {
    backgroundColor: COLORS.success,
  },
  audioControls: {
    alignItems: 'center',
    marginTop: 8,
  },
  audioLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  slowButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  slowButtonActive: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  slowButtonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  slowButtonTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
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
  textInputContainer: {
    marginTop: 16,
  },
  inputLabel: {
    ...TYPOGRAPHY.label,
    marginBottom: 8,
  },
  placeholderInput: {
    ...TYPOGRAPHY.body,
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    minHeight: 50,
    color: COLORS.textSecondary,
  },
  checkButton: {
    marginTop: 8,
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

export default ListeningRenderer;

