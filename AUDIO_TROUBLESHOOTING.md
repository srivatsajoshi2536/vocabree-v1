# Audio Troubleshooting Guide

## Issues Fixed

### 1. **Success/Error Sounds Not Playing**
**Problem**: The success and error sound functions were trying to play empty strings, which doesn't work.

**Fix**: Updated `playSuccessSound()` and `playErrorSound()` to use actual characters (✓ and ✗) with appropriate pitch and rate settings.

### 2. **Volume Set to Zero**
**Problem**: Volume might be initialized to 0 or undefined, causing silent playback.

**Fix**: 
- Added volume validation in `initialize()` to ensure it defaults to 1.0 if not set or invalid
- Added volume checks in `playTTS()` to ensure volume is always between 0.1 and 1.0
- Added logging to track volume settings

### 3. **Audio Not Initialized Properly**
**Problem**: Audio service might not be fully initialized before use.

**Fix**:
- Made `initialize()` more robust with better error handling
- Added proper async/await in `LessonScreen` to ensure audio is initialized before use
- Added initialization logging for debugging

### 4. **TTS Not Working**
**Problem**: Text-to-speech might fail silently or not have proper fallbacks.

**Fix**:
- Added multiple fallback strategies (language-specific → English → default)
- Added better error logging with detailed context
- Added `Speech.stop()` before playing new audio to prevent conflicts
- Improved text extraction from filenames

## How to Test Audio

### 1. Check Console Logs
When you tap the audio button, you should see logs like:
```
Audio initialized: volume=1, enabled=true
Playing TTS: "नमस्ते" in hi-IN (volume: 1, enabled: true)
TTS playback started successfully
```

### 2. Check Settings
1. Go to Profile → Settings
2. Ensure "Sound Effects" toggle is ON
3. Try playing audio again

### 3. Test Different Scenarios

**Test 1: Basic Audio Playback**
- Open a lesson with a listening exercise
- Tap the play button
- You should hear the text-to-speech

**Test 2: Success/Error Sounds**
- Answer a question correctly → should hear success sound
- Answer incorrectly → should hear error sound

**Test 3: Multiple Choice Audio**
- Open a multiple choice question with audio
- Tap the speaker icon next to the question
- Audio should play

**Test 4: Translation Audio**
- Open a translation exercise
- Tap the speaker icon
- Audio should play

## Common Issues and Solutions

### Issue: No Sound at All

**Possible Causes:**
1. Sound is disabled in settings
2. Device volume is muted
3. TTS language not supported on device
4. App permissions not granted

**Solutions:**
1. Check Settings → Sound Effects is ON
2. Check device volume (not muted)
3. Try a different language to test if it's language-specific
4. Check device settings for app permissions

### Issue: Audio Plays but Very Quiet

**Possible Causes:**
1. Volume setting is too low
2. Device volume is low

**Solutions:**
1. Check the volume in audio service (should be 1.0 by default)
2. Increase device volume
3. Check if volume was saved incorrectly in AsyncStorage

### Issue: Audio Cuts Off or Doesn't Finish

**Possible Causes:**
1. Multiple audio requests overlapping
2. Component unmounting before audio finishes

**Solutions:**
1. The code now calls `Speech.stop()` before playing new audio
2. Ensure components properly wait for audio to finish

### Issue: TTS Speaks Wrong Language

**Possible Causes:**
1. Language code mismatch
2. Device doesn't support the language

**Solutions:**
1. Check console logs for the language code being used
2. The code falls back to English if language-specific TTS fails
3. Ensure the language ID matches: 'hindi', 'bengali', 'telugu', 'kannada', 'tamil'

## Debugging Steps

1. **Check Console Logs**
   - Look for "Audio initialized" message
   - Look for "Playing TTS" messages
   - Check for any error messages

2. **Verify Settings**
   ```javascript
   // In console or debugger
   audioService.isSoundEnabled() // Should return true
   audioService.getVolume() // Should return 1.0 (or your set volume)
   ```

3. **Test Directly**
   ```javascript
   // In console or debugger
   await audioService.initialize();
   await audioService.playTTS('Hello', 'hindi');
   ```

4. **Check Device**
   - Ensure device volume is up
   - Check if other apps can play audio
   - Try on a different device

## Technical Details

### Audio Service Initialization
- Sets audio mode for iOS and Android
- Loads volume and sound enabled settings from AsyncStorage
- Defaults to volume=1.0 and enabled=true if not set

### TTS Language Codes
- Hindi: `hi-IN`
- Bengali: `bn-IN`
- Telugu: `te-IN`
- Kannada: `kn-IN`
- Tamil: `ta-IN`

### Volume Range
- Minimum: 0.1 (to ensure audio is audible)
- Maximum: 1.0
- Default: 1.0

## Still Not Working?

If audio still doesn't work after trying these solutions:

1. **Check Expo/React Native Version**
   - Ensure `expo-speech` is properly installed
   - Try: `npx expo install expo-speech`

2. **Check Device Compatibility**
   - Some devices may not support all TTS languages
   - Try testing on a different device

3. **Check Permissions**
   - iOS: May need microphone permissions (even for TTS)
   - Android: Should work without special permissions

4. **Clear App Data**
   - Clear AsyncStorage to reset audio settings
   - Uninstall and reinstall the app

5. **Check for Conflicts**
   - Ensure no other audio is playing
   - Close other apps that might be using audio

## Recent Changes Made

1. ✅ Fixed success/error sounds (now use actual characters)
2. ✅ Added volume validation and defaults
3. ✅ Improved audio initialization
4. ✅ Added better error handling and fallbacks
5. ✅ Added comprehensive logging
6. ✅ Fixed async initialization in LessonScreen
7. ✅ Added Speech.stop() to prevent overlapping audio

## Next Steps

If you're still experiencing issues, please check:
- Console logs for specific error messages
- Device volume and mute settings
- App permissions
- Whether the issue is specific to certain languages or all languages

