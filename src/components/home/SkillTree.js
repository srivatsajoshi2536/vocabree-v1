/**
 * Skill Tree Component
 * Displays all skills in a vertical scrollable list
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import SkillItem from './SkillItem';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

// Import skills data for all languages
const hindiSkills = require('../../assets/data/hindi/skills.json');
const bengaliSkills = require('../../assets/data/bengali/skills.json');
const tamilSkills = require('../../assets/data/tamil/skills.json');
const kannadaSkills = require('../../assets/data/kannada/skills.json');
const teluguSkills = require('../../assets/data/telugu/skills.json');

const skillsMap = {
  hindi: hindiSkills,
  bengali: bengaliSkills,
  tamil: tamilSkills,
  kannada: kannadaSkills,
  telugu: teluguSkills,
};

const SkillTree = ({ onSkillPress, navigation }) => {
  const { selectedLanguage } = useLanguage();
  const { progress, loadProgress, isSkillUnlocked, getProgress } = useProgress();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const languageId = selectedLanguage || 'hindi';

  useEffect(() => {
    loadSkillsData();
    loadUserProgress();
  }, [languageId]);

  const loadSkillsData = async () => {
    try {
      setLoading(true);
      // Load language-specific skills.json file
      const languageSkills = skillsMap[languageId] || hindiSkills;
      const skillsData = languageSkills.skills || [];
      
      // Skills are the same structure for all languages
      // The languageId is passed to lessons, which will generate language-specific content
      setSkills(skillsData.sort((a, b) => a.position - b.position));
    } catch (error) {
      console.error('Error loading skills:', error);
      // Fallback to Hindi skills if language-specific file fails
      const skillsData = hindiSkills.skills || [];
      setSkills(skillsData.sort((a, b) => a.position - b.position));
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    if (languageId) {
      await loadProgress(languageId);
    }
  };

  const handleSkillPress = (skill) => {
    if (onSkillPress) {
      onSkillPress(skill);
    } else {
      // Default: navigate to lesson screen
      navigation?.navigate('Lesson', {
        skillId: skill.id,
        skillName: skill.name,
        languageId,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (skills.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No skills available</Text>
      </View>
    );
  }

  const currentProgress = getProgress(languageId);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.sectionSubtitle}>
          Complete lessons to unlock new skills
        </Text>
      </View>

      {skills.map((skill, index) => {
        const isUnlocked = isSkillUnlocked(
          languageId,
          skill.id,
          skill.requiredSkills || []
        );
        const isCurrent =
          isUnlocked &&
          currentProgress?.skills?.[skill.id]?.level > 0 &&
          currentProgress?.skills?.[skill.id]?.level < skill.levels;

        return (
          <SkillItem
            key={skill.id}
            skill={skill}
            progress={currentProgress}
            isUnlocked={isUnlocked}
            isCurrent={isCurrent}
            onPress={() => handleSkillPress(skill)}
            languageId={languageId}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  header: {
    marginBottom: 20,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    marginBottom: 8,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
});

export default SkillTree;

