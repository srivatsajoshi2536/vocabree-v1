/**
 * Animated Progress Bar component
 * Used in lessons and skill tree
 * 
 * Note: Using React Native Animated API for Expo Go compatibility
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

const ProgressBar = ({
  progress = 0, // 0-100
  height = 8,
  showLabel = false,
  color = COLORS.success,
  backgroundColor = COLORS.border,
  style,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: Math.max(0, Math.min(100, progress)),
      duration: 300,
      useNativeDriver: false, // width animation doesn't support native driver
    }).start();
  }, [progress]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height }, style]}>
      <View style={[styles.track, { height, backgroundColor }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: color,
              width: widthInterpolated,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={styles.label}>{Math.round(progress)}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 4,
  },
  label: {
    ...TYPOGRAPHY.caption,
    marginTop: 4,
    textAlign: 'right',
  },
});

export default ProgressBar;
