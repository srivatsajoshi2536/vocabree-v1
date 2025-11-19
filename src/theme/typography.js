/**
 * Neobrutalism Typography System
 * Bold, playful, chunky fonts with high contrast
 */

import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const TYPOGRAPHY = {
  // Heading styles - EXTRA BOLD for neobrutalism
  h1: {
    fontFamily,
    fontSize: 36,
    fontWeight: '900', // Extra bold
    lineHeight: 44,
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
    color: '#1A1A1A',
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    color: '#1A1A1A',
    letterSpacing: -0.2,
  },
  h4: {
    fontFamily,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: '#1A1A1A',
    letterSpacing: 0,
  },
  
  // Body styles - bold and readable
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '600', // Bolder than usual
    lineHeight: 24,
    color: '#1A1A1A',
    letterSpacing: 0.1,
  },
  bodySmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#4A4A4A',
    letterSpacing: 0.1,
  },
  
  // Special styles
  button: {
    fontFamily,
    fontSize: 18,
    fontWeight: '800', // Very bold for buttons
    lineHeight: 24,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: '#4A4A4A',
    letterSpacing: 0.2,
  },
  label: {
    fontFamily,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: '#1A1A1A',
    letterSpacing: 0.2,
  },
};

export default TYPOGRAPHY;

