/**
 * Forgot Password Screen
 * Allows users to reset their password via email
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
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

const ForgotPasswordScreen = ({ navigation }) => {
    const { resetPassword, loading, error, setError } = useAuth();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleResetPassword = async () => {
        // Reset errors
        setEmailError('');
        setError(null);

        // Validate email
        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address');
            return;
        }

        const result = await resetPassword(email.trim());

        if (result.success) {
            setEmailSent(true);
            Alert.alert(
                'Email Sent!',
                `Password reset instructions have been sent to ${email}. Please check your inbox and spam folder.`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } else {
            setEmailError(result.error);
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
                        <Text style={styles.title}>Reset Password</Text>
                        <Text style={styles.subtitle}>
                            Enter your email address and we'll send you instructions to reset your password
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={[styles.input, emailError && styles.inputError]}
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.textSecondary}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError('');
                                    setEmailSent(false);
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {emailError ? (
                                <Text style={styles.errorText}>{emailError}</Text>
                            ) : null}
                        </View>

                        {error && !emailError ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}

                        <Button
                            title="Send Reset Link"
                            onPress={handleResetPassword}
                            loading={loading}
                            disabled={emailSent}
                            style={styles.resetButton}
                        />

                        <View style={styles.infoBox}>
                            <Ionicons name="information-circle" size={20} color={COLORS.primary} />
                            <Text style={styles.infoText}>
                                You'll receive an email with a link to reset your password. The link will expire in 1 hour.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Remember your password? </Text>
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
        lineHeight: 22,
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
    resetButton: {
        marginBottom: 28,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: COLORS.primaryLight,
        padding: 16,
        borderWidth: 3,
        borderColor: COLORS.primary,
        marginBottom: 28,
    },
    infoText: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textPrimary,
        marginLeft: 12,
        flex: 1,
        fontWeight: '600',
        lineHeight: 20,
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

export default ForgotPasswordScreen;
