/**
 * Practice Screen
 * Review mode for previously learned material
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { COLORS, getLanguageColor } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import SkillItem from '../../components/home/SkillItem';
import lessonService from '../../services/lessonService';
// Import skills data for all languages
import hindiSkills from '../../assets/data/hindi/skills.json';
import bengaliSkills from '../../assets/data/bengali/skills.json';
import tamilSkills from '../../assets/data/tamil/skills.json';
import kannadaSkills from '../../assets/data/kannada/skills.json';
import teluguSkills from '../../assets/data/telugu/skills.json';

const skillsMap = {
  hindi: hindiSkills,
  bengali: bengaliSkills,
  tamil: tamilSkills,
  kannada: kannadaSkills,
  telugu: teluguSkills,
};

const PracticeScreen = ({ navigation }) => {
  const { selectedLanguage } = useLanguage();
  const { progress, getProgress, loadProgress } = useProgress();
  const [skills, setSkills] = useState([]);
  const [practiceMode, setPracticeMode] = useState(null); // 'general' or skillId

  const languageId = selectedLanguage || 'hindi';

  useEffect(() => {
    loadSkills();
    loadUserProgress();
  }, [languageId]);

  const loadSkills = () => {
    // Load language-specific skills.json file
    const languageSkills = skillsMap[languageId] || hindiSkills;
    const skillsData = languageSkills.skills || [];
    setSkills(skillsData.sort((a, b) => a.position - b.position));
  };

  const loadUserProgress = async () => {
    if (languageId) {
      await loadProgress(languageId);
    }
  };

  const languageProgress = getProgress(languageId);

  // Get skills that need practice - prioritize weak skills (low accuracy, not practiced recently)
  const getSkillsNeedingPractice = () => {
    const skillsObj = languageProgress?.skills || {};

    return skills
      .map((skill) => {
        // Check if skill is unlocked
        const isUnlocked =
          !skill.requiredSkills ||
          skill.requiredSkills.length === 0 ||
          skill.requiredSkills.every(
            (reqId) => skillsObj[reqId]?.level >= 1
          );
        
        if (!isUnlocked) return null;
        
        const skillProgress = skillsObj[skill.id];
        
        // Calculate priority score (higher = more needs practice)
        let priority = 0;
        
        // If skill hasn't been started (level 0), it needs practice (especially basics_1)
        if (!skillProgress || skillProgress.level === 0) {
          // Give higher priority to basics_1 if not started
          priority = skill.id === 'basics_1' ? 20 : 10;
          return { skill, priority, skillProgress: null };
        }
        
        // Skills not at max level need practice
        if (skillProgress.level < skill.levels) {
          priority += 10;
        }
        
        // Skills not practiced recently need practice
      if (skillProgress.lastPracticed) {
        const lastPracticed = new Date(skillProgress.lastPracticed);
        const daysSince = (Date.now() - lastPracticed.getTime()) / (1000 * 60 * 60 * 24);
          if (daysSince > 7) {
            priority += 5 + Math.min(10, daysSince - 7); // More days = higher priority
          }
        } else {
          priority += 5; // Never practiced
        }
        
        // Skills with low accuracy need more practice
        if (skillProgress.accuracy !== undefined && skillProgress.accuracy < 70) {
          priority += 15 - skillProgress.accuracy / 5; // Lower accuracy = higher priority
        }
        
        // If skill has been started but priority is 0, still give it some priority
        if (priority === 0 && skillProgress.level > 0) {
          priority = 1; // At least some priority if skill has been started
        }
        
        return { skill, priority, skillProgress };
      })
      .filter((item) => item !== null && item.priority > 0)
      .sort((a, b) => b.priority - a.priority) // Sort by priority (highest first)
      .map((item) => item.skill);
  };

  const handleStartGeneralPractice = () => {
    const skillsNeedingPractice = getSkillsNeedingPractice();
    if (skillsNeedingPractice.length === 0) {
      alert('No skills need practice! Great job!');
      return;
    }

    // Start practice with first skill that needs practice
    const skill = skillsNeedingPractice[0];
    startPractice(skill.id);
  };

  const startPractice = (skillId) => {
    const skill = skills.find((s) => s.id === skillId);
    if (!skill) return;

    const skillProgress = languageProgress?.skills?.[skillId];
    // If skill hasn't been started, use level 1. Otherwise use current level
    const currentLevel = skillProgress?.level || 1;

    // Practice uses current level or highest completed level
    const practiceLevel = Math.max(1, Math.min(currentLevel, 5));
    
    // Get previously incorrect exercises from progress (if stored)
    const incorrectExercises = skillProgress?.incorrectExercises || [];
    
    // Generate practice lesson (5-7 exercises, includes mistakes)
    const practiceLesson = lessonService.generatePracticeLesson(
      languageId,
      skillId,
      practiceLevel,
      incorrectExercises
    );

    navigation.navigate('Lesson', {
      skillId,
      skillName: skill.name,
      languageId,
      level: practiceLevel,
      isPractice: true,
      lessonData: practiceLesson,
    });
  };

  const skillsNeedingPractice = getSkillsNeedingPractice();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice</Text>
        <Text style={styles.subtitle}>
          Review what you've learned to strengthen your skills
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* General Practice */}
        <Card style={styles.practiceCard}>
          <View style={styles.practiceHeader}>
            <Ionicons name="refresh" size={32} color={COLORS.primary} />
            <View style={styles.practiceInfo}>
              <Text style={styles.practiceTitle}>General Practice</Text>
              <Text style={styles.practiceDescription}>
                Review material from all your skills
              </Text>
            </View>
          </View>
          <Button
            title="Start Practice"
            onPress={handleStartGeneralPractice}
            style={styles.practiceButton}
          />
          <Text style={styles.practiceNote}>
            {skillsNeedingPractice.length > 0
              ? `${skillsNeedingPractice.length} skills need practice`
              : 'All skills are up to date!'}
          </Text>
        </Card>

        {/* Skills Needing Practice */}
        {skillsNeedingPractice.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Skills Needing Practice</Text>
            {skillsNeedingPractice.map((skill) => {
              const skillProgress = languageProgress?.skills?.[skill.id];
              return (
                <TouchableOpacity
                  key={skill.id}
                  onPress={() => startPractice(skill.id)}
                >
                  <Card style={styles.skillCard}>
                    <View style={styles.skillRow}>
                      <Text style={styles.skillIcon}>{skill.icon}</Text>
                      <View style={styles.skillInfo}>
                        <Text style={styles.skillName}>{skill.name}</Text>
                        <Text style={styles.skillLevel}>
                          Level {skillProgress?.level || 0} / {skill.levels}
                        </Text>
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={COLORS.textSecondary}
                      />
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* All Skills */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Practice Specific Skill</Text>
          {skills.map((skill) => {
            const skillProgress = languageProgress?.skills?.[skill.id];
            const isUnlocked =
              !skill.requiredSkills ||
              skill.requiredSkills.length === 0 ||
              skill.requiredSkills.every(
                (reqId) => languageProgress?.skills?.[reqId]?.level >= 1
              );

            if (!isUnlocked) return null;

            return (
              <TouchableOpacity
                key={skill.id}
                onPress={() => startPractice(skill.id)}
                disabled={!isUnlocked}
              >
                <Card style={styles.skillCard}>
                  <View style={styles.skillRow}>
                    <Text style={styles.skillIcon}>{skill.icon}</Text>
                    <View style={styles.skillInfo}>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      <Text style={styles.skillLevel}>
                        Level {skillProgress?.level || 0} / {skill.levels}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={COLORS.textSecondary}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Practice Info */}
        <Card style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>About Practice Mode</Text>
          <Text style={styles.infoText}>
              • Shorter sessions (5-7 exercises) for quick review{'\n'}
              • Focuses on skills you need to strengthen{'\n'}
              • Includes exercises you got wrong before{'\n'}
              • Earns reduced XP (5 XP) but strengthens skills{'\n'}
              • Prevents skill decay and maintains progress
          </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h1,
    marginBottom: 8,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  practiceCard: {
    padding: 20,
    marginBottom: 24,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  practiceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  practiceTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: 4,
  },
  practiceDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  practiceButton: {
    marginBottom: 12,
  },
  practiceNote: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  skillsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: 12,
  },
  skillCard: {
    padding: 16,
    marginBottom: 12,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    ...TYPOGRAPHY.h4,
    marginBottom: 4,
  },
  skillLevel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  infoCard: {
    padding: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    ...TYPOGRAPHY.h4,
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  infoText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default PracticeScreen;
