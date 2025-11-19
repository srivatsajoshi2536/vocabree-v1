/**
 * Reusable Card component
 * Used for skill items, achievement cards, stat cards, etc.
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';

const Card = ({
  children,
  style,
  onPress,
  pressable = false,
  ...props
}) => {
  const Component = pressable || onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={pressable || onPress ? 0.7 : 1}
      {...props}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 0, // No rounded corners - neobrutalism!
    padding: 20,
    borderWidth: 4, // Thick black border
    borderColor: COLORS.border,
    // Offset shadow for neobrutalism effect
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 6, height: 6 }, // Offset shadow
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0, // Use shadow instead
  },
});

export default Card;

