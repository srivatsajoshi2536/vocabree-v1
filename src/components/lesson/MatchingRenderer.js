/**
 * Matching Exercise Renderer
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../common/Button';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import lessonService from '../../services/lessonService';
import { useLanguage } from '../../context/LanguageContext';

const MatchingRenderer = ({ exercise, onAnswer, languageId: propLanguageId, isPractice = false, skillId = null, level = null }) => {
  const { selectedLanguage } = useLanguage();
  const languageId = propLanguageId || selectedLanguage || 'hindi';
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs([]);
    setShowFeedback(false);
  }, [exercise.id]);

  const pairs = exercise.pairs || [];
  const leftItems = pairs.map((p) => p.hindi || p.left);
  const rightItems = pairs.map((p) => p.english || p.right);

  const handleLeftSelect = (item, index) => {
    if (showFeedback) return;
    if (matchedPairs.some((p) => p.leftIndex === index)) return; // Already matched
    
    setSelectedLeft({ item, index });
    if (selectedRight !== null) {
      checkMatch(selectedRight.item, selectedRight.index, item, index);
    }
  };

  const handleRightSelect = (item, index) => {
    if (showFeedback) return;
    if (matchedPairs.some((p) => p.rightIndex === index)) return; // Already matched
    
    setSelectedRight({ item, index });
    if (selectedLeft !== null) {
      checkMatch(item, index, selectedLeft.item, selectedLeft.index);
    }
  };

  const checkMatch = (rightItem, rightIndex, leftItem, leftIndex) => {
    const pair = pairs.find(
      (p) =>
        (p.hindi === leftItem || p.left === leftItem) &&
        (p.english === rightItem || p.right === rightItem)
    );

    if (pair) {
      // Correct match - use functional update to avoid stale closure
      setMatchedPairs((prevMatchedPairs) => {
        const newMatchedPairs = [
          ...prevMatchedPairs,
          { leftIndex, rightIndex, leftItem, rightItem },
        ];
        
        // Check if all pairs matched
        if (newMatchedPairs.length === pairs.length) {
          setShowFeedback(true);
          setTimeout(() => {
            onAnswer(true, exercise, JSON.stringify(newMatchedPairs));
          }, 1500);
        }
        
        return newMatchedPairs;
      });
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      // Incorrect match - reset selection
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const isMatched = (leftIndex, rightIndex) => {
    return matchedPairs.some(
      (p) => p.leftIndex === leftIndex && p.rightIndex === rightIndex
    );
  };

  const isLeftSelected = (index) => {
    return selectedLeft?.index === index;
  };

  const isRightSelected = (index) => {
    return selectedRight?.index === index;
  };

  const isLeftMatched = (index) => {
    return matchedPairs.some((p) => p.leftIndex === index);
  };

  const isRightMatched = (index) => {
    return matchedPairs.some((p) => p.rightIndex === index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{exercise.question}</Text>
      <Text style={styles.instruction}>
        Tap a word on the left, then tap its match on the right
      </Text>

      <View style={styles.matchingContainer}>
        {/* Left Column */}
        <View style={styles.column}>
          {leftItems.map((item, index) => {
            // Get English translation for native script items (only in lessons, not practice)
            let displayText = item;
            if (!isPractice) {
              const isNativeScript = /[^\x00-\x7F]/.test(item);
              if (isNativeScript) {
                const englishTranslation = lessonService.getEnglishTranslation(
                  item,
                  languageId,
                  skillId,
                  level
                );
                if (englishTranslation) {
                  displayText = `${item} (${englishTranslation})`;
                }
              }
            }

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleLeftSelect(item, index)}
                style={[
                  styles.matchItem,
                  styles.leftItem,
                  isLeftSelected(index) && styles.selectedItem,
                  isLeftMatched(index) && styles.matchedItem,
                ]}
                disabled={isLeftMatched(index) || showFeedback}
              >
                <Text style={styles.matchText}>{displayText}</Text>
                {isLeftMatched(index) && (
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {rightItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRightSelect(item, index)}
              style={[
                styles.matchItem,
                styles.rightItem,
                isRightSelected(index) && styles.selectedItem,
                isRightMatched(index) && styles.matchedItem,
              ]}
              disabled={isRightMatched(index) || showFeedback}
            >
              <Text style={styles.matchText}>{item}</Text>
              {isRightMatched(index) && (
                <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {matchedPairs.length} / {pairs.length} matched
        </Text>
      </View>

      {/* Feedback */}
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.correctFeedback}>✓ All pairs matched correctly!</Text>
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
    marginBottom: 8,
    textAlign: 'center',
  },
  instruction: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  matchingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  matchItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftItem: {
    marginRight: 8,
  },
  rightItem: {
    marginLeft: 8,
  },
  selectedItem: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '20',
  },
  matchedItem: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '20',
  },
  matchText: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  progressText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  feedbackContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  correctFeedback: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.success,
    marginBottom: 8,
  },
  explanation: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
});

export default MatchingRenderer;

