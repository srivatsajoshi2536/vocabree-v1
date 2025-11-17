/**
 * Skill Item Component
 * Displays individual skill with progress, lock state, and crown levels
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import { COLORS, getLanguageColor } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

const SkillItem = ({
  skill,
  progress = null,
  isUnlocked = true,
  isCurrent = false,
  onPress,
  languageId = 'hindi',
}) => {
  const skillProgress = progress?.skills?.[skill.id] || { level: 0 };
  const skillLevel = skillProgress.level || 0;
  const progressPercent = (skillLevel / skill.levels) * 100;
  const languageColor = getLanguageColor(languageId);

  const getSkillStatus = () => {
    if (!isUnlocked) return 'locked';
    if (skillLevel === skill.levels) return 'completed';
    if (skillLevel > 0) return 'in_progress';
    return 'new';
  };

  const status = getSkillStatus();

  return (
    <TouchableOpacity
      onPress={isUnlocked ? onPress : null}
      disabled={!isUnlocked}
      activeOpacity={isUnlocked ? 0.7 : 1}
    >
      <Card
        style={[
          styles.skillCard,
          isCurrent && styles.currentSkill,
          status === 'locked' && styles.lockedSkill,
        ]}
      >
        <View style={styles.skillContent}>
          {/* Skill Icon */}
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  status === 'locked'
                    ? COLORS.skillLocked
                    : status === 'completed'
                    ? COLORS.success
                    : languageColor + '20',
              },
            ]}
          >
            {status === 'locked' ? (
              <Ionicons name="lock-closed" size={24} color={COLORS.textSecondary} />
            ) : (
              <Text style={styles.iconEmoji}>{skill.icon}</Text>
            )}
          </View>

          {/* Skill Info */}
          <View style={styles.skillInfo}>
            <Text style={styles.skillName}>{skill.name}</Text>
            <Text style={styles.skillDescription} numberOfLines={1}>
              {skill.description}
            </Text>

            {/* Progress Bar */}
            {isUnlocked && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progressPercent}%`,
                        backgroundColor: languageColor,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {skillLevel}/{skill.levels}
                </Text>
              </View>
            )}
          </View>

          {/* Crowns/Level Indicator */}
          {isUnlocked && (
            <View style={styles.crownContainer}>
              {Array.from({ length: skill.levels }).map((_, index) => (
                <Ionicons
                  key={index}
                  name="star"
                  size={16}
                  color={
                    index < skillLevel
                      ? COLORS.xpGold
                      : COLORS.border
                  }
                  style={styles.crown}
                />
              ))}
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  skillCard: {
    marginBottom: 12,
    padding: 16,
  },
  currentSkill: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 4,
  },
  lockedSkill: {
    opacity: 0.6,
  },
  skillContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconEmoji: {
    fontSize: 28,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    ...TYPOGRAPHY.h4,
    marginBottom: 4,
  },
  skillDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    minWidth: 40,
  },
  crownContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  crown: {
    marginLeft: 2,
  },
});

export default SkillItem;

