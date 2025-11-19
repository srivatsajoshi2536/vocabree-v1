/**
 * Signup Screen
 * User registration with email/password
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { validateEmail, validatePassword, validatePasswordConfirmation } from '../../utils/validators';

const SignupScreen = ({ navigation }) => {
  const { signup, loading, error, setError } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignup = async () => {
    // Reset errors
    setErrors({});
    setError(null);

    // Validate all fields
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validatePasswordConfirmation(password, confirmPassword);

    const newErrors = {};
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await signup(email.trim(), password, displayName.trim() || undefined);
    if (!result.success) {
      if (result.error.includes('email')) {
        setErrors({ email: result.error });
      } else {
        setErrors({ password: result.error });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your language learning journey</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.textSecondary}
                value={displayName}
                onChangeText={(text) => {
                  setDisplayName(text);
                  setErrors({ ...errors, displayName: '' });
                }}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.textSecondary}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: '' });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput, errors.password && styles.inputError]}
                  placeholder="At least 8 characters"
                  placeholderTextColor={COLORS.textSecondary}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors({ ...errors, password: '' });
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput, errors.confirmPassword && styles.inputError]}
                  placeholder="Re-enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors({ ...errors, confirmPassword: '' });
                  }}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            {error && !Object.keys(errors).length ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <Button
              title="Sign Up"
              onPress={handleSignup}
              loading={loading}
              style={styles.signupButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 32,
    marginBottom: 48,
    padding: 20,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  backButton: {
    marginBottom: 20,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  title: {
    ...TYPOGRAPHY.h1,
    marginBottom: 12,
    fontWeight: '900',
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    ...TYPOGRAPHY.label,
    marginBottom: 10,
    fontWeight: '800',
  },
  input: {
    ...TYPOGRAPHY.body,
    backgroundColor: COLORS.white,
    borderRadius: 0,
    padding: 18,
    borderWidth: 4,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 0,
    borderWidth: 4,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  passwordInput: {
    ...TYPOGRAPHY.body,
    flex: 1,
    padding: 18,
  },
  eyeIcon: {
    padding: 18,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 5,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: 8,
    fontWeight: '800',
  },
  signupButton: {
    marginBottom: 28,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    padding: 16,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  footerLink: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '900',
    marginLeft: 4,
  },
});

export default SignupScreen;

