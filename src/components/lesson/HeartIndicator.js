/**
 * Heart Indicator Component
 * Shows remaining hearts/lives
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';

const HeartIndicator = ({ hearts = 3, maxHearts = 3 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxHearts }).map((_, index) => (
        <Ionicons
          key={index}
          name={index < hearts ? 'heart' : 'heart-outline'}
          size={28}
          color={index < hearts ? COLORS.error : COLORS.border}
          style={styles.heart}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    marginHorizontal: 6,
  },
});

export default HeartIndicator;

