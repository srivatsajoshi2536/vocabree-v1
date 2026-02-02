/**
 * Terms of Service Screen
 * Displays the app's terms and conditions
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../../hooks/useColors';
import { TYPOGRAPHY } from '../../theme/typography';

const TermsOfServiceScreen = ({ navigation }) => {
    const colors = useColors();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.white, borderBottomColor: colors.border }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.textPrimary }]}>Terms of Service</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                        Last Updated: January 31, 2026
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        1. Acceptance of Terms
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        By accessing and using Vocabree, you accept and agree to be bound by the terms and
                        provision of this agreement. If you do not agree to these terms, please do not use
                        this application.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        2. Use of Service
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Vocabree is a language learning application designed to help users learn Indian
                        languages. You agree to use this service only for lawful purposes and in accordance
                        with these Terms of Service.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        3. User Accounts
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        • You are responsible for maintaining the confidentiality of your account credentials{'\n'}
                        • You agree to provide accurate and complete information when creating your account{'\n'}
                        • You are responsible for all activities that occur under your account{'\n'}
                        • You must notify us immediately of any unauthorized use of your account
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        4. User Content and Progress
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        • Your learning progress and achievements are stored securely{'\n'}
                        • You retain ownership of any content you create within the app{'\n'}
                        • We reserve the right to remove content that violates our terms{'\n'}
                        • Your progress data may be used to improve the learning experience
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        5. Intellectual Property
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        All content, features, and functionality of Vocabree, including but not limited to
                        text, graphics, logos, icons, images, audio clips, and software, are the exclusive
                        property of Vocabree and are protected by copyright, trademark, and other intellectual
                        property laws.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        6. Prohibited Activities
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        You agree not to:{'\n'}
                        • Use the app for any illegal purpose{'\n'}
                        • Attempt to gain unauthorized access to any part of the app{'\n'}
                        • Interfere with or disrupt the app's functionality{'\n'}
                        • Reverse engineer or attempt to extract the source code{'\n'}
                        • Use automated systems to access the app without permission{'\n'}
                        • Harass, abuse, or harm other users
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        7. Subscription and Payments
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        • Some features may require a subscription or payment{'\n'}
                        • Subscription fees are charged in advance on a recurring basis{'\n'}
                        • You can cancel your subscription at any time{'\n'}
                        • Refunds are handled according to the app store's refund policy{'\n'}
                        • We reserve the right to change subscription prices with notice
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        8. Privacy and Data Protection
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Your privacy is important to us. Our Privacy Policy explains how we collect, use,
                        and protect your personal information. By using Vocabree, you consent to our
                        collection and use of personal data as outlined in our Privacy Policy.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        9. Disclaimers and Limitations
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        • The app is provided "as is" without warranties of any kind{'\n'}
                        • We do not guarantee uninterrupted or error-free service{'\n'}
                        • We are not responsible for any loss of data or progress{'\n'}
                        • Language learning results may vary by individual{'\n'}
                        • We are not liable for any indirect or consequential damages
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        10. Termination
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        We reserve the right to terminate or suspend your account and access to the app at
                        our sole discretion, without notice, for conduct that we believe violates these
                        Terms of Service or is harmful to other users, us, or third parties, or for any
                        other reason.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        11. Changes to Terms
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        We reserve the right to modify these terms at any time. We will notify users of any
                        material changes by updating the "Last Updated" date. Your continued use of the app
                        after changes constitutes acceptance of the new terms.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        12. Governing Law
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        These Terms of Service shall be governed by and construed in accordance with the
                        laws of India, without regard to its conflict of law provisions.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        13. Contact Information
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        If you have any questions about these Terms of Service, please contact us at:{'\n\n'}
                        Email: support@vocabree.com{'\n'}
                        Website: www.vocabree.com
                    </Text>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                            By using Vocabree, you acknowledge that you have read, understood, and agree to
                            be bound by these Terms of Service.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 8,
    },
    title: {
        ...TYPOGRAPHY.h2,
    },
    placeholder: {
        width: 40,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    content: {
        flex: 1,
    },
    lastUpdated: {
        ...TYPOGRAPHY.bodySmall,
        fontStyle: 'italic',
        marginBottom: 24,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h3,
        marginTop: 20,
        marginBottom: 12,
        fontWeight: '600',
    },
    paragraph: {
        ...TYPOGRAPHY.body,
        lineHeight: 24,
        marginBottom: 16,
    },
    footer: {
        marginTop: 32,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    footerText: {
        ...TYPOGRAPHY.bodySmall,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default TermsOfServiceScreen;
