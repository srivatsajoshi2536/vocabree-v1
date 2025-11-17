/**
 * Typography system for vocabree app
 * Uses system fonts for optimal performance
 */

import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const TYPOGRAPHY = {
  // Heading styles
  h1: {
    fontFamily,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: '#212121',
  },
  h2: {
    fontFamily,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: '#212121',
  },
  h3: {
    fontFamily,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: '#212121',
  },
  h4: {
    fontFamily,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: '#212121',
  },
  
  // Body styles
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#212121',
  },
  bodySmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#757575',
  },
  
  // Special styles
  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#FFFFFF',
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#757575',
  },
  label: {
    fontFamily,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#212121',
  },
};

export default TYPOGRAPHY;

