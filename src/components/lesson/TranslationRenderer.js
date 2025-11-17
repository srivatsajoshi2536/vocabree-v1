/**
 * Translation Exercise Renderer
 * Word bank construction
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../common/Button';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import audioService from '../../services/audioService';
import { useLanguage } from '../../context/LanguageContext';

const TranslationRenderer = ({ exercise, onAnswer, languageId: propLanguageId }) => {
  const { selectedLanguage } = useLanguage();
  // Use languageId from props (lesson-specific) or fallback to context
  const languageId = propLanguageId || selectedLanguage || 'hindi';
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(exercise.wordBank || []);
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
      } else if (exercise.questionText) {
        // Use TTS for question text
        await audioService.playTTS(exercise.questionText, languageId);
      }
      setTimeout(() => setIsPlayingAudio(false), 3000);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlayingAudio(false);
    }
  };

  const handleWordSelect = (word) => {
    if (showFeedback) return;
    
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((w) => w !== word));
  };

  const handleRemoveWord = (word, index) => {
    if (showFeedback) return;
    
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  const handleCheckAnswer = () => {
    if (showFeedback) return;
    
    const userAnswer = selectedWords.join(' ');
    const isCorrect = userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(isCorrect, exercise, userAnswer);
    }, 2000);
  };

  const handleClear = () => {
    if (showFeedback) return;
    setAvailableWords([...availableWords, ...selectedWords]);
    setSelectedWords([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionLabel}>Translate to English:</Text>
      <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{exercise.questionText}</Text>
        {(exercise.questionAudio || exercise.audioFile || exercise.questionText) && (
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

      {/* Selected Words (Answer Construction Area) */}
      <View style={styles.answerArea}>
        <Text style={styles.answerLabel}>Your Answer:</Text>
        <View style={styles.selectedWordsContainer}>
          {selectedWords.length === 0 ? (
            <Text style={styles.placeholderText}>Tap words below to build your answer</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedWords.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRemoveWord(word, index)}
                  style={styles.selectedWord}
                >
                  <Text style={styles.selectedWordText}>{word}</Text>
                  <Text style={styles.removeIcon}>×</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      {/* Word Bank */}
      <View style={styles.wordBankContainer}>
        <Text style={styles.wordBankLabel}>Word Bank:</Text>
        <View style={styles.wordBank}>
          {availableWords.map((word, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleWordSelect(word)}
              style={styles.wordChip}
            >
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title="Clear"
          variant="outline"
          onPress={handleClear}
          style={styles.clearButton}
        />
        <Button
          title="Check Answer"
          onPress={handleCheckAnswer}
          disabled={selectedWords.length === 0 || showFeedback}
          style={styles.checkButton}
        />
      </View>

      {/* Feedback */}
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text
            style={[
              styles.feedbackText,
              selectedWords.join(' ').toLowerCase().trim() ===
              exercise.correctAnswer.toLowerCase().trim()
                ? styles.correctFeedback
                : styles.incorrectFeedback,
            ]}
          >
            {selectedWords.join(' ').toLowerCase().trim() ===
            exercise.correctAnswer.toLowerCase().trim()
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
    marginBottom: 8,
    color: COLORS.textSecondary,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  questionText: {
    ...TYPOGRAPHY.h2,
    textAlign: 'center',
    fontSize: 32,
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
  answerArea: {
    marginBottom: 24,
  },
  answerLabel: {
    ...TYPOGRAPHY.label,
    marginBottom: 8,
  },
  selectedWordsContainer: {
    minHeight: 60,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  selectedWord: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedWordText: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    marginRight: 6,
  },
  removeIcon: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    fontSize: 20,
    lineHeight: 20,
  },
  wordBankContainer: {
    marginBottom: 24,
  },
  wordBankLabel: {
    ...TYPOGRAPHY.label,
    marginBottom: 12,
  },
  wordBank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordChip: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  wordText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  clearButton: {
    flex: 1,
  },
  checkButton: {
    flex: 2,
  },
  feedbackContainer: {
    marginTop: 16,
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

export default TranslationRenderer;

