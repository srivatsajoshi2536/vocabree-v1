/**
 * Streak Display Component
 * Shows current streak with fire emoji
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

const StreakDisplay = ({ streak = 0, size = 'medium' }) => {
  const isLarge = size === 'large';
  const iconSize = isLarge ? 28 : 20;
  const fontSize = isLarge ? 24 : 18;

  return (
    <View style={styles.container}>
      <Ionicons
        name="flame"
        size={iconSize}
        color={COLORS.streakFire}
        style={styles.icon}
      />
      <Text style={[styles.streakText, { fontSize }]}>{streak}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 4,
  },
  streakText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.streakFire,
    fontWeight: '700',
  },
});

export default StreakDisplay;

