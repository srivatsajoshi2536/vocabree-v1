/**
 * Update Audio Index Script
 * Automatically generates require() statements for all MP3 files
 * 
 * Run: node scripts/update-audio-index.js
 */

const fs = require('fs');
const path = require('path');

const audioBaseDir = path.join(__dirname, '..', 'src', 'assets', 'audio');
const indexFile = path.join(__dirname, '..', 'src', 'assets', 'audio', 'audioIndex.js');

const languages = ['hindi', 'bengali', 'telugu', 'kannada', 'tamil'];

function getAudioFiles(languageId) {
  const langDir = path.join(audioBaseDir, languageId);
  
  if (!fs.existsSync(langDir)) {
    return [];
  }
  
  return fs.readdirSync(langDir)
    .filter(file => file.endsWith('.mp3'))
    .sort();
}

function generateIndexContent() {
  let content = `/**
 * Audio Index
 * Static mapping of audio filenames to require() statements
 * AUTO-GENERATED - Do not edit manually
 * Run: node scripts/update-audio-index.js to regenerate
 */

`;

  const audioMaps = {};
  
  // Generate require statements for each language
  languages.forEach(lang => {
    const files = getAudioFiles(lang);
    audioMaps[lang] = {};
    
    if (files.length === 0) {
      content += `// ${lang.charAt(0).toUpperCase() + lang.slice(1)} audio files\n`;
      content += `const ${lang}Audio = {\n  // No audio files found\n};\n\n`;
    } else {
      content += `// ${lang.charAt(0).toUpperCase() + lang.slice(1)} audio files\n`;
      content += `const ${lang}Audio = {\n`;
      
      files.forEach(file => {
        const key = `'${file}'`;
        const requirePath = `require('./${lang}/${file}')`;
        content += `  ${key}: ${requirePath},\n`;
        audioMaps[lang][file] = true;
      });
      
      content += `};\n\n`;
    }
  });
  
  // Generate export
  content += `export const audioIndex = {\n`;
  languages.forEach(lang => {
    content += `  ${lang}: ${lang}Audio,\n`;
  });
  content += `};\n\n`;
  
  // Generate getAudioAsset function
  content += `/**
 * Get audio asset for a language and filename
 * Returns null if file not found
 */
export const getAudioAsset = (languageId, filename) => {
  const languageAudio = audioIndex[languageId];
  if (!languageAudio) return null;
  
  return languageAudio[filename] || null;
};
`;

  return content;
}

function updateAudioIndex() {
  console.log('📝 Updating audio index...\n');
  
  let totalFiles = 0;
  
  languages.forEach(lang => {
    const files = getAudioFiles(lang);
    totalFiles += files.length;
    console.log(`   ${lang}: ${files.length} files`);
  });
  
  console.log(`\n   Total: ${totalFiles} audio files\n`);
  
  const content = generateIndexContent();
  
  fs.writeFileSync(indexFile, content, 'utf8');
  
  console.log('✅ Audio index updated successfully!');
  console.log(`   File: ${indexFile}`);
}

if (require.main === module) {
  updateAudioIndex();
}

module.exports = { updateAudioIndex, generateIndexContent };

