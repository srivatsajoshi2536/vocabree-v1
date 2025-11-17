# Audio Generation Scripts

These scripts help generate MP3 audio files for all words/phrases in the app.

## Quick Start

1. **Generate all audio files:**
   ```bash
   npm run generate-audio
   ```

2. **Update audio index (after adding files):**
   ```bash
   npm run update-audio-index
   ```

3. **Do both at once:**
   ```bash
   npm run setup-audio
   ```

## Scripts

### `generate-audio.js`

Generates MP3 files using Google Text-to-Speech API for all words/phrases defined in the audio mapping.

**Features:**
- Automatically creates language directories if they don't exist
- Skips files that already exist
- Uses Google TTS API (free, no API key needed)
- Supports all 5 languages: Hindi, Bengali, Telugu, Kannada, Tamil
- Adds delays between requests to avoid rate limiting

**Usage:**
```bash
node scripts/generate-audio.js
```

**Note:** This script uses Google's TTS API which is free but may have rate limits. If you encounter errors, wait a few minutes and try again.

### `update-audio-index.js`

Automatically generates `require()` statements in `audioIndex.js` for all MP3 files found in the audio directories.

**Features:**
- Scans all language directories for MP3 files
- Generates static `require()` statements
- Updates `src/assets/audio/audioIndex.js` automatically

**Usage:**
```bash
node scripts/update-audio-index.js
```

## How It Works

1. **Audio Mapping**: The `generate-audio.js` script reads the audio file mapping from `audioService.js` which maps native script text (e.g., "नमस्ते") to filenames (e.g., "namaste.mp3").

2. **TTS Generation**: For each word/phrase, the script:
   - Calls Google TTS API with the text and language code
   - Downloads the generated MP3 file
   - Saves it to the appropriate language folder

3. **Index Update**: The `update-audio-index.js` script:
   - Scans all language directories
   - Finds all MP3 files
   - Generates `require()` statements
   - Updates `audioIndex.js` automatically

## File Structure

After running the scripts, your audio directory will look like:

```
src/assets/audio/
├── hindi/
│   ├── namaste.mp3
│   ├── dhanyavad.mp3
│   └── ...
├── bengali/
│   ├── namaskar.mp3
│   └── ...
├── telugu/
├── kannada/
├── tamil/
└── audioIndex.js (auto-generated)
```

## Troubleshooting

### Rate Limiting

If you see errors about rate limiting:
- Wait 5-10 minutes and try again
- The script already includes delays between requests
- You can increase the delay in `generate-audio.js` (line with `setTimeout(resolve, 200)`)

### Missing Files

If some files fail to generate:
- Check your internet connection
- Verify the text is valid (no special characters that break URLs)
- Try running the script again (it will skip existing files)

### Audio Index Not Updating

If `audioIndex.js` is not being updated:
- Make sure MP3 files are in the correct directories
- Check file permissions
- Run `update-audio-index.js` manually

## Manual Alternative

If the automated scripts don't work, you can:

1. Use any TTS service (Google Cloud TTS, AWS Polly, Azure TTS, etc.)
2. Generate MP3 files manually
3. Place them in the appropriate language folders
4. Run `npm run update-audio-index` to update the index

## Notes

- **File Size**: Generated files are typically 10-50KB each
- **Quality**: Google TTS provides good quality for Indian languages
- **Total Files**: ~200+ files will be generated (40-50 per language)
- **Time**: Generating all files takes 10-20 minutes due to rate limiting delays

