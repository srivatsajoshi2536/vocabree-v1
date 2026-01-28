/**
 * OCR Translate Screen
 * Google Lens-style image translation feature
 * Take a photo → Extract text → Translate word-by-word → Play audio
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { tokenizeSentence } from '../../utils/helpers';
import { translateWord } from '../../services/translationService';
import { extractTextFromImage } from '../../services/ocrService';
import audioService from '../../services/audioService';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { COLORS, getLanguageColor } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

export default function OcrTranslateScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [detectedText, setDetectedText] = useState('');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [playingAll, setPlayingAll] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const { selectedLanguage } = useLanguage();
  const languageColor = getLanguageColor(selectedLanguage || 'hindi');

  const mapLanguageToCode = (langId) => {
    switch (langId) {
      case 'hindi': return { translate: 'hi', tts: 'hi-IN', name: 'Hindi' };
      case 'bengali': return { translate: 'bn', tts: 'bn-IN', name: 'Bengali' };
      case 'telugu': return { translate: 'te', tts: 'te-IN', name: 'Telugu' };
      case 'kannada': return { translate: 'kn', tts: 'kn-IN', name: 'Kannada' };
      case 'tamil': return { translate: 'ta', tts: 'ta-IN', name: 'Tamil' };
      default: return { translate: 'hi', tts: 'hi-IN', name: 'Hindi' };
    }
  };

  const pickImage = async (useCamera = true) => {
    try {
      const permission = useCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        alert(`${useCamera ? 'Camera' : 'Gallery'} permission is required`);
        return;
      }

      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          quality: 1,
        })
        : await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          quality: 1,
        });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        setDetectedText('');
        setTranslations({});
        await handleOcr(uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image');
    }
  };

  const handleOcr = async (uri) => {
    try {
      setLoading(true);
      setProcessingStep('📸 Extracting text from image...');

      const text = await extractTextFromImage(uri);

      if (!text.trim()) {
        alert('No text detected in the image. Please try another image.');
        setLoading(false);
        return;
      }

      setDetectedText(text);
      await handleTranslate(text);
    } catch (err) {
      console.error('OCR error:', err);
      alert(err.message || 'Failed to read text from image. Please try again.');
    } finally {
      setLoading(false);
      setProcessingStep('');
    }
  };

  const handleTranslate = async (text) => {
    const { translate } = mapLanguageToCode(selectedLanguage);
    const words = tokenizeSentence(text);
    const result = {};

    setProcessingStep(`🔤 Translating ${words.length} words...`);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (!word.trim()) continue;

      try {
        setProcessingStep(`🔤 Translating: ${word} (${i + 1}/${words.length})`);
        const translated = await translateWord(word, translate);
        result[word] = translated;
      } catch (e) {
        console.error('Translation error for word:', word, e);
        result[word] = '❌ Failed';
      }
    }

    setTranslations(result);
  };

  const handleSpeak = async (text, wordKey = null) => {
    if (!text || text === '❌ Failed') return;

    try {
      setCurrentlyPlaying(wordKey);
      await audioService.playTTS(text, selectedLanguage || 'hindi', { rate: 0.9 });
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setCurrentlyPlaying(null);
    }
  };

  const handlePlayAll = async () => {
    if (Object.keys(translations).length === 0) return;

    setPlayingAll(true);
    const translationEntries = Object.entries(translations);

    for (let i = 0; i < translationEntries.length; i++) {
      const [original, translated] = translationEntries[i];
      if (translated && translated !== '❌ Failed') {
        setCurrentlyPlaying(original);
        try {
          await audioService.playTTS(translated, selectedLanguage || 'hindi', { rate: 0.9 });
          // Small delay between words for clarity
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
          console.error(`Error playing audio for "${translated}":`, error);
        }
      }
    }

    setCurrentlyPlaying(null);
    setPlayingAll(false);
  };

  const handleReset = () => {
    setImageUri(null);
    setDetectedText('');
    setTranslations({});
  };

  const languageInfo = mapLanguageToCode(selectedLanguage);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Image Translator</Text>
          <Text style={styles.headerSubtitle}>
            Translate to {languageInfo.name}
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Instructions Card */}
        {!imageUri && (
          <Card style={styles.instructionsCard}>
            <Text style={styles.instructionsIcon}>📸</Text>
            <Text style={styles.instructionsTitle}>How it works</Text>
            <Text style={styles.instructionsText}>
              1. Select an image from gallery{'\n'}
              2. We'll extract all text from the image{'\n'}
              3. Each word gets translated to {languageInfo.name}{'\n'}
              4. Tap 🔊 to hear the pronunciation
            </Text>
          </Card>
        )}

        {/* Action Buttons */}
        {!imageUri && (
          <View style={styles.buttonContainer}>
            <Button
              title="🖼️ Choose from Gallery"
              onPress={() => pickImage(false)}
              style={[styles.actionButton, { backgroundColor: languageColor }]}
            />
          </View>
        )}

        {/* Image Preview */}
        {imageUri && (
          <Card style={styles.imageCard}>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={handleReset}
              style={styles.resetButton}
            >
              <Ionicons name="close-circle" size={32} color={COLORS.error} />
            </TouchableOpacity>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Card style={styles.loadingCard}>
            <ActivityIndicator size="large" color={languageColor} />
            <Text style={styles.loadingText}>{processingStep}</Text>
          </Card>
        )}

        {/* Detected Text */}
        {detectedText && !loading && (
          <Card style={styles.detectedTextCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text" size={24} color={languageColor} />
              <Text style={styles.sectionTitle}>Detected Text</Text>
            </View>
            <Text style={styles.detectedText}>{detectedText}</Text>
          </Card>
        )}

        {/* Translations */}
        {Object.keys(translations).length > 0 && !loading && (
          <Card style={styles.translationsCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="language" size={24} color={languageColor} />
              <Text style={styles.sectionTitle}>Word-by-Word Translation</Text>
            </View>
            <View style={styles.translationHeaderRow}>
              <Text style={styles.translationCount}>
                {Object.keys(translations).length} words translated
              </Text>
              <TouchableOpacity
                onPress={handlePlayAll}
                disabled={playingAll}
                style={[
                  styles.playAllButton,
                  { backgroundColor: playingAll ? COLORS.border : languageColor },
                ]}
              >
                <Ionicons
                  name={playingAll ? "pause" : "play"}
                  size={18}
                  color={COLORS.white}
                />
                <Text style={styles.playAllText}>
                  {playingAll ? 'Playing...' : 'Play All'}
                </Text>
              </TouchableOpacity>
            </View>

            {Object.entries(translations).map(([original, translated], index) => (
              <View
                key={`${original}-${index}`}
                style={[
                  styles.translationItem,
                  { borderLeftColor: languageColor },
                ]}
              >
                <View style={styles.translationTextContainer}>
                  <Text style={styles.originalWord}>{original}</Text>
                  <Ionicons name="arrow-forward" size={16} color={COLORS.textSecondary} />
                  <Text style={[styles.translatedWord, { color: languageColor }]}>
                    {translated}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleSpeak(translated, original)}
                  disabled={playingAll || currentlyPlaying === original}
                  style={[
                    styles.speakButton,
                    {
                      backgroundColor: currentlyPlaying === original
                        ? languageColor
                        : languageColor + '20',
                      opacity: playingAll ? 0.5 : 1,
                    }
                  ]}
                >
                  <Ionicons
                    name={currentlyPlaying === original ? "pause" : "volume-high"}
                    size={20}
                    color={currentlyPlaying === original ? COLORS.white : languageColor}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </Card>
        )}

        {/* Try Another Button */}
        {imageUri && !loading && (
          <Button
            title="📸 Translate Another Image"
            onPress={handleReset}
            variant="outline"
            style={styles.tryAnotherButton}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    fontWeight: '900',
  },
  headerSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  instructionsCard: {
    alignItems: 'center',
    padding: 32,
    marginBottom: 24,
  },
  instructionsIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  instructionsTitle: {
    ...TYPOGRAPHY.h2,
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionsText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    color: COLORS.textSecondary,
    lineHeight: 24,
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 16,
  },
  actionButton: {
    marginBottom: 0,
  },
  imageCard: {
    padding: 0,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  resetButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: COLORS.border,
  },
  loadingCard: {
    alignItems: 'center',
    padding: 32,
    marginBottom: 20,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    marginTop: 16,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  detectedTextCard: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    marginLeft: 12,
    fontWeight: '900',
  },
  detectedText: {
    ...TYPOGRAPHY.body,
    lineHeight: 24,
    fontWeight: '600',
  },
  translationsCard: {
    marginBottom: 20,
  },
  translationHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  translationCount: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  playAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  playAllText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: '700',
  },
  translationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.background,
    borderLeftWidth: 4,
    borderWidth: 3,
    borderColor: COLORS.border,
  },
  translationTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  originalWord: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
  },
  translatedWord: {
    ...TYPOGRAPHY.body,
    fontWeight: '900',
  },
  speakButton: {
    width: 44,
    height: 44,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.border,
  },
  tryAnotherButton: {
    marginTop: 8,
  },
});