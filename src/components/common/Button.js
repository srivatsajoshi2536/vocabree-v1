/**
 * Reusable Button component
 * Supports primary, secondary, and outline variants
 * 
 * Note: Using TouchableOpacity instead of Reanimated for Expo Go compatibility
 * For production builds, switch to Reanimated version for better animations
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[variant]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${variant}Text`]];
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? COLORS.white : COLORS.primary}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56, // Taller for neobrutalism
    minWidth: 120,
    borderRadius: 0, // No rounded corners - neobrutalism!
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    borderWidth: 4, // Thick border
    borderColor: COLORS.border,
    // Offset shadow for neobrutalism effect
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 6, height: 6 }, // Offset shadow
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0, // Use shadow instead
  },
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.border,
  },
  secondary: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.border,
  },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.border,
    shadowOffset: { width: 4, height: 4 },
  },
  disabled: {
    backgroundColor: COLORS.skillLocked,
    borderColor: COLORS.border,
    opacity: 0.7,
  },
  text: {
    ...TYPOGRAPHY.button,
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
});

export default Button;
