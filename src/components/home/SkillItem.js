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
    marginBottom: 16, // More spacing
    padding: 20,
  },
  currentSkill: {
    borderWidth: 5, // Thicker border for current skill
    borderColor: COLORS.primary,
    shadowOffset: { width: 8, height: 8 }, // More pronounced shadow
  },
  lockedSkill: {
    opacity: 0.7,
    backgroundColor: COLORS.background,
  },
  skillContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64, // Bigger icon
    height: 64,
    borderRadius: 0, // Square icon - playful!
    borderWidth: 4,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  iconEmoji: {
    fontSize: 32, // Bigger emoji
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    ...TYPOGRAPHY.h4,
    marginBottom: 6,
    fontWeight: '900',
  },
  skillDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 12,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 12, // Thicker progress bar
    backgroundColor: COLORS.background,
    borderRadius: 0, // No rounded corners
    marginRight: 12,
    overflow: 'visible',
    borderWidth: 3,
    borderColor: COLORS.border,
  },
  progressFill: {
    height: '100%',
    borderRadius: 0,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    minWidth: 50,
    fontWeight: '800',
  },
  crownContainer: {
    flexDirection: 'row',
    marginLeft: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  crown: {
    marginLeft: 4,
  },
});

export default SkillItem;

