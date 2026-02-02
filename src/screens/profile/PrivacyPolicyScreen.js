/**
 * Privacy Policy Screen
 * Displays the app's privacy policy
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

const PrivacyPolicyScreen = ({ navigation }) => {
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
                <Text style={[styles.title, { color: colors.textPrimary }]}>Privacy Policy</Text>
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

                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        At Vocabree, we are committed to protecting your privacy and ensuring the security
                        of your personal information. This Privacy Policy explains how we collect, use,
                        disclose, and safeguard your information when you use our mobile application.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        1. Information We Collect
                    </Text>

                    <Text style={[styles.subSectionTitle, { color: colors.textPrimary }]}>
                        Personal Information
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        • Name and email address (when you create an account){'\n'}
                        • Profile picture (optional){'\n'}
                        • Language preferences and learning goals{'\n'}
                        • Account credentials (securely encrypted)
                    </Text>

                    <Text style={[styles.subSectionTitle, { color: colors.textPrimary }]}>
                        Learning Data
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        • Lesson progress and completion status{'\n'}
                        • Quiz scores and exercise results{'\n'}
                        • Daily streak information{'\n'}
                        • XP points and achievements{'\n'}
                        • Practice session history
                    </Text>

                    <Text style={[styles.subSectionTitle, { color: colors.textPrimary }]}>
                        Device Information
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        • Device type and operating system{'\n'}
                        • App version and settings{'\n'}
                        • Language and region settings{'\n'}
                        • Crash reports and error logs
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        2. How We Use Your Information
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        We use the collected information to:{'\n\n'}
                        • Provide and maintain the language learning service{'\n'}
                        • Personalize your learning experience{'\n'}
                        • Track your progress and achievements{'\n'}
                        • Send you notifications about your learning goals{'\n'}
                        • Improve app functionality and user experience{'\n'}
                        • Analyze usage patterns to enhance our content{'\n'}
                        • Provide customer support{'\n'}
                        • Prevent fraud and ensure security
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        3. Data Storage and Security
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        • Your data is stored securely using Firebase services{'\n'}
                        • We use industry-standard encryption for data transmission{'\n'}
                        • Passwords are encrypted and never stored in plain text{'\n'}
                        • We implement regular security updates and monitoring{'\n'}
                        • Access to personal data is restricted to authorized personnel only
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        4. Data Sharing and Disclosure
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        We do not sell, trade, or rent your personal information to third parties. We may
                        share your information only in the following circumstances:{'\n\n'}
                        • With your explicit consent{'\n'}
                        • To comply with legal obligations{'\n'}
                        • To protect our rights and prevent fraud{'\n'}
                        • With service providers who assist in app operations (under strict confidentiality){'\n'}
                        • In case of business transfer or merger (with prior notice)
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        5. Your Rights and Choices
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        You have the right to:{'\n\n'}
                        • Access your personal data{'\n'}
                        • Correct inaccurate information{'\n'}
                        • Delete your account and associated data{'\n'}
                        • Export your learning progress{'\n'}
                        • Opt-out of notifications{'\n'}
                        • Withdraw consent for data processing{'\n'}
                        • Request data portability
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        6. Children's Privacy
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Vocabree is designed for users of all ages. For users under 13 years of age, we
                        require parental consent before collecting personal information. We do not knowingly
                        collect data from children without parental permission. If you believe a child has
                        provided us with personal information without consent, please contact us.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        7. Cookies and Tracking
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        We use local storage and session management to:{'\n'}
                        • Remember your preferences{'\n'}
                        • Keep you logged in{'\n'}
                        • Track your learning progress{'\n'}
                        • Analyze app usage patterns{'\n\n'}
                        You can manage these settings through your device preferences.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        8. Third-Party Services
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Our app uses the following third-party services:{'\n\n'}
                        • Firebase (Google) - Authentication and data storage{'\n'}
                        • Expo - App development and deployment{'\n\n'}
                        These services have their own privacy policies. We encourage you to review them.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        9. Data Retention
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        We retain your personal information for as long as your account is active or as
                        needed to provide services. If you delete your account, we will delete your personal
                        data within 30 days, except where we are required to retain it for legal purposes.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        10. International Data Transfers
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Your information may be transferred to and stored on servers located outside your
                        country of residence. We ensure appropriate safeguards are in place to protect your
                        data in accordance with this Privacy Policy.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        11. Changes to Privacy Policy
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        We may update this Privacy Policy from time to time. We will notify you of any
                        significant changes by updating the "Last Updated" date and, where appropriate,
                        sending you a notification. We encourage you to review this policy periodically.
                    </Text>

                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        12. Contact Us
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        If you have questions or concerns about this Privacy Policy or our data practices,
                        please contact us at:{'\n\n'}
                        Email: privacy@vocabree.com{'\n'}
                        Support: support@vocabree.com{'\n'}
                        Website: www.vocabree.com
                    </Text>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                            By using Vocabree, you acknowledge that you have read and understood this Privacy
                            Policy and agree to its terms.
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
    subSectionTitle: {
        ...TYPOGRAPHY.body,
        marginTop: 12,
        marginBottom: 8,
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

export default PrivacyPolicyScreen;
