# Audio Files Directory

This directory contains audio files for pronunciation in each language.

## Structure

```
audio/
├── hindi/
│   ├── namaste.mp3
│   ├── dhanyavad.mp3
│   ├── alvida.mp3
│   ├── haan.mp3
│   ├── main_theek_hoon.mp3
│   └── ...
├── bengali/
├── telugu/
├── kannada/
└── tamil/
```

## Audio File Requirements

- **Format**: MP3
- **Bitrate**: 64kbps (for smaller file size)
- **Quality**: Native speaker pronunciation
- **Naming**: Use lowercase with underscores (e.g., `namaste.mp3`, `main_theek_hoon.mp3`)

## Adding Audio Files

1. Record or source pronunciation audio for each word/phrase
2. Convert to MP3 format at 64kbps
3. Place in the appropriate language folder
4. Reference in lesson JSON files using `audioFile` or `questionAudio` fields

## Text-to-Speech Fallback

If an audio file is not found, the app will automatically use Expo Speech (TTS) as a fallback. This ensures all exercises have audio even if files are missing.

## Example Usage in Lesson JSON

```json
{
  "id": "ex1",
  "type": "multipleChoice",
  "question": "How do you say 'Hello' in Hindi?",
  "audioFile": "namaste.mp3",
  "options": ["नमस्ते", "धन्यवाद", "अलविदा"],
  "correctAnswer": "नमस्ते"
}
```

## Current Audio Files Needed

Based on existing lesson data, we need:

### Hindi
- namaste.mp3
- dhanyavad.mp3
- alvida.mp3
- haan.mp3
- main_theek_hoon.mp3

### Other Languages
- Audio files will be added as lesson content is created

