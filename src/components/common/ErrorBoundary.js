/**
 * Error Boundary Component
 * Catches React errors and displays a fallback UI
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.toString() || 'An unexpected error occurred'}
          </Text>
          {__DEV__ && this.state.errorInfo && (
            <Text style={styles.stack}>
              {this.state.errorInfo.componentStack}
            </Text>
          )}
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    ...TYPOGRAPHY.h2,
    marginBottom: 16,
    color: COLORS.error,
  },
  message: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  stack: {
    ...TYPOGRAPHY.caption,
    textAlign: 'left',
    marginBottom: 20,
    color: COLORS.textSecondary,
    maxHeight: 200,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
});

export default ErrorBoundary;
