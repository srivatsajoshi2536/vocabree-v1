/**
 * Avatar Selector Component
 * Allows users to select from predefined avatars
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import { useColors } from '../../hooks/useColors';
import { TYPOGRAPHY } from '../../theme/typography';

const AVATARS = [
  { id: 'pokemon', name: 'Pokemon', emoji: '⚡', color: '#FFD700' },
  { id: 'spiderman', name: 'Spiderman', emoji: '🕷️', color: '#DC143C' },
  { id: 'doremon', name: 'Doremon', emoji: '🔵', color: '#2196F3' },
  { id: 'ironman', name: 'Ironman', emoji: '🦾', color: '#FF6B35' },
];

const AvatarSelector = ({ visible, onClose, selectedAvatar, onSelect }) => {
  const colors = useColors();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <Card style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              Choose Avatar
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.avatarsGrid}
            showsVerticalScrollIndicator={false}
          >
            {AVATARS.map((avatar) => {
              const isSelected = selectedAvatar === avatar.id;
              return (
                <TouchableOpacity
                  key={avatar.id}
                  onPress={() => {
                    onSelect(avatar.id);
                    onClose();
                  }}
                  style={[
                    styles.avatarOption,
                    isSelected && { borderColor: colors.primary, borderWidth: 3 },
                  ]}
                >
                  <View
                    style={[
                      styles.avatarCircle,
                      { backgroundColor: avatar.color + '30' },
                    ]}
                  >
                    <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
                  </View>
                  <Text style={[styles.avatarName, { color: colors.textPrimary }]}>
                    {avatar.name}
                  </Text>
                  {isSelected && (
                    <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                      <Ionicons name="checkmark" size={16} color={colors.white} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    ...TYPOGRAPHY.h2,
  },
  closeButton: {
    padding: 8,
  },
  avatarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 16,
  },
  avatarOption: {
    alignItems: 'center',
    width: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarEmoji: {
    fontSize: 48,
  },
  avatarName: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AvatarSelector;

