# Adding MP3 Audio Files

## Overview

The app now uses MP3 audio files for all exercises instead of TTS. The audio service automatically maps native script text (like "नमस्ते") to MP3 filenames (like "namaste.mp3").

## How It Works

1. **Automatic Mapping**: The `audioService.js` has a comprehensive mapping from native script text to MP3 filenames for all 5 languages.

2. **Static Audio Index**: React Native requires static `require()` statements. All audio files must be registered in `audioIndex.js`.

3. **Fallback to TTS**: If an MP3 file is not found, the service automatically falls back to TTS.

## Adding New Audio Files

### Step 1: Add the MP3 File

Place your MP3 file in the appropriate language folder:
- `src/assets/audio/hindi/namaste.mp3`
- `src/assets/audio/bengali/namaskar.mp3`
- `src/assets/audio/telugu/namaskaram.mp3`
- etc.

**File Requirements:**
- Format: MP3
- Bitrate: 64kbps (recommended for smaller file size)
- Quality: Native speaker pronunciation
- Naming: Use lowercase with underscores (e.g., `namaste.mp3`, `main_theek_hoon.mp3`)

### Step 2: Register in audioIndex.js

Add a `require()` statement in `src/assets/audio/audioIndex.js`:

```javascript
// Hindi audio files
const hindiAudio = {
  'namaste.mp3': require('./hindi/namaste.mp3'),
  'dhanyavad.mp3': require('./hindi/dhanyavad.mp3'),
  // Add more files here...
};
```

**Important**: All `require()` statements must be static (no template strings or variables).

### Step 3: Update Mapping (if needed)

If you're adding a new word/phrase that's not in the existing mapping, add it to `audioService.js` in the `buildAudioFileMap()` method:

```javascript
hindi: {
  'नमस्ते': 'namaste.mp3',
  'धन्यवाद': 'dhanyavad.mp3',
  // Add new mappings here...
}
```

## Current Audio Files Needed

Based on the vocabulary in `lessonService.js`, you need to add MP3 files for all words/phrases used in exercises. The mapping in `audioService.js` shows all the expected filenames.

### Example: Hindi Basics 1 Level 1

- `namaste.mp3` - नमस्ते
- `dhanyavad.mp3` - धन्यवाद
- `haan.mp3` - हाँ
- `nahi.mp3` - नहीं
- `alvida.mp3` - अलविदा

### Example: Bengali Basics 1 Level 1

- `namaskar.mp3` - নমস্কার
- `dhonnobad.mp3` - ধন্যবাদ
- `ha.mp3` - হ্যাঁ
- `na.mp3` - না
- `bida.mp3` - বিদায়

## Testing

1. Add the MP3 file to the appropriate folder
2. Register it in `audioIndex.js`
3. Test in the app - the audio should play automatically
4. If the file is missing, check console logs for: `📁 Audio file not found in index`
5. The service will fall back to TTS if MP3 is not available

## Bulk Adding Files

If you have many audio files to add:

1. Add all MP3 files to the language folders
2. Update `audioIndex.js` with all `require()` statements
3. Ensure filenames match the mapping in `audioService.js`
4. Test a few files to ensure they work
5. The service will automatically use MP3 files when available

## Notes

- **EAS Builds**: All audio files must be registered in `audioIndex.js` before building, or they won't be included in the bundle.
- **File Size**: Keep files small (64kbps) to reduce app size.
- **Fallback**: TTS will be used if MP3 files are missing, so the app will still work.

