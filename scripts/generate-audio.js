/**
 * Generate Audio Files Script
 * Uses Google Text-to-Speech to generate MP3 files for all words/phrases
 * 
 * Run: node scripts/generate-audio.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Language codes for Google TTS
const languageCodes = {
  hindi: 'hi',
  bengali: 'bn',
  telugu: 'te',
  kannada: 'kn',
  tamil: 'ta',
};

// Audio file mapping (extracted from audioService.js)
const audioFileMap = {
  hindi: {
    'नमस्ते': 'namaste.mp3',
    'धन्यवाद': 'dhanyavad.mp3',
    'अलविदा': 'alvida.mp3',
    'हाँ': 'haan.mp3',
    'नहीं': 'nahi.mp3',
    'कैसे हो': 'kaise_ho.mp3',
    'ठीक हूँ': 'theek_hoon.mp3',
    'माफ करें': 'maaf_karen.mp3',
    'कृपया': 'kripaya.mp3',
    'स्वागत': 'swagat.mp3',
    'मेरा नाम': 'mera_naam.mp3',
    'आपका नाम': 'aapka_naam.mp3',
    'मिलकर खुशी हुई': 'milkar_khushi_hui.mp3',
    'फिर मिलेंगे': 'phir_milenge.mp3',
    'शुभ रात्रि': 'shubh_raatri.mp3',
    'शुभ प्रभात': 'shubh_prabhat.mp3',
    'शुभ दोपहर': 'shubh_dopahar.mp3',
    'शुभ संध्या': 'shubh_sandhya.mp3',
    'कहाँ': 'kahan.mp3',
    'कब': 'kab.mp3',
    'कौन': 'kaun.mp3',
    'क्या': 'kya.mp3',
    'क्यों': 'kyon.mp3',
    'कैसे': 'kaise.mp3',
    'कितना': 'kitna.mp3',
    'एक': 'ek.mp3',
    'दो': 'do.mp3',
    'तीन': 'teen.mp3',
    'चार': 'chaar.mp3',
    'पाँच': 'paanch.mp3',
    'छह': 'chhah.mp3',
    'सात': 'saat.mp3',
    'आठ': 'aath.mp3',
    'नौ': 'nau.mp3',
    'दस': 'das.mp3',
    'पिता': 'pita.mp3',
    'माता': 'mata.mp3',
    'भाई': 'bhai.mp3',
    'बहन': 'behan.mp3',
    'बेटा': 'beta.mp3',
    'बेटी': 'beti.mp3',
    'रोटी': 'roti.mp3',
    'चावल': 'chawal.mp3',
    'दाल': 'daal.mp3',
    'सब्जी': 'sabzi.mp3',
    'पानी': 'paani.mp3',
    'दूध': 'doodh.mp3',
    'चाय': 'chai.mp3',
    'कॉफी': 'coffee.mp3',
    'फल': 'phal.mp3',
  },
  bengali: {
    'নমস্কার': 'namaskar.mp3',
    'ধন্যবাদ': 'dhonnobad.mp3',
    'বিদায়': 'bida.mp3',
    'হ্যাঁ': 'ha.mp3',
    'না': 'na.mp3',
    'কেমন আছেন': 'kemon_achen.mp3',
    'ভালো': 'bhalo.mp3',
    'ক্ষমা করুন': 'kshama_koren.mp3',
    'অনুগ্রহ করে': 'onugroho_kore.mp3',
    'স্বাগতম': 'swagotom.mp3',
    'আমার নাম': 'amar_naam.mp3',
    'আপনার নাম': 'apnar_naam.mp3',
    'দেখে ভালো লাগল': 'dekhe_bhalo_laglo.mp3',
    'আবার দেখা হবে': 'abar_dekha_hobe.mp3',
    'শুভ রাত্রি': 'shubh_ratri.mp3',
    'সুপ্রভাত': 'suprobhat.mp3',
    'শুভ দুপুর': 'shubh_dupur.mp3',
    'শুভ সন্ধ্যা': 'shubh_sandhya.mp3',
    'কোথায়': 'kothay.mp3',
    'কখন': 'kokhon.mp3',
    'কে': 'ke.mp3',
    'কী': 'ki.mp3',
    'কেন': 'ken.mp3',
    'কীভাবে': 'kibhabe.mp3',
    'কত': 'koto.mp3',
    'এক': 'ek.mp3',
    'দুই': 'dui.mp3',
    'তিন': 'tin.mp3',
    'চার': 'char.mp3',
    'পাঁচ': 'panch.mp3',
    'বাবা': 'baba.mp3',
    'মা': 'ma.mp3',
    'ভাই': 'bhai.mp3',
    'বোন': 'bon.mp3',
    'ছেলে': 'chele.mp3',
    'মেয়ে': 'meye.mp3',
    'রুটি': 'ruti.mp3',
    'ভাত': 'bhat.mp3',
    'ডাল': 'dal.mp3',
    'তরকারি': 'torkari.mp3',
    'পানি': 'pani.mp3',
    'দুধ': 'dudh.mp3',
    'চা': 'cha.mp3',
    'কফি': 'kofi.mp3',
    'ফল': 'phol.mp3',
  },
  telugu: {
    'నమస్కారం': 'namaskaram.mp3',
    'ధన్యవాదాలు': 'dhanyavadalu.mp3',
    'సెలవు': 'selavu.mp3',
    'అవును': 'avunu.mp3',
    'కాదు': 'kadu.mp3',
    'ఎలా ఉన్నారు': 'ela_unnaru.mp3',
    'బాగున్నాను': 'bagunnanu.mp3',
    'క్షమించండి': 'kshaminchandi.mp3',
    'దయచేసి': 'dayachesi.mp3',
    'స్వాగతం': 'swagatam.mp3',
    'నా పేరు': 'na_peru.mp3',
    'మీ పేరు': 'mee_peru.mp3',
    'మిమ్మల్ని కలవడం ఆనందంగా ఉంది': 'mimmalni_kalavadam_anandanga_undi.mp3',
    'మళ్లీ కలుద్దాం': 'malli_kaluddham.mp3',
    'శుభ రాత్రి': 'shubha_ratri.mp3',
    'శుభోదయం': 'shubhodayam.mp3',
    'శుభ మధ్యాహ్నం': 'shubha_madhyahnam.mp3',
    'శుభ సాయంత్రం': 'shubha_sayantram.mp3',
    'ఎక్కడ': 'ekkada.mp3',
    'ఎప్పుడు': 'eppudu.mp3',
    'ఎవరు': 'evaru.mp3',
    'ఏమి': 'emi.mp3',
    'ఎందుకు': 'enduku.mp3',
    'ఎలా': 'ela.mp3',
    'ఎంత': 'enta.mp3',
    'ఒకటి': 'okati.mp3',
    'రెండు': 'rendu.mp3',
    'మూడు': 'mudu.mp3',
    'నాలుగు': 'nalugu.mp3',
    'ఐదు': 'aidu.mp3',
    'తండ్రి': 'tandri.mp3',
    'తల్లి': 'talli.mp3',
    'సోదరుడు': 'sodarudu.mp3',
    'సోదరి': 'sodari.mp3',
    'కుమారుడు': 'kumarudu.mp3',
    'కుమార్తె': 'kumarte.mp3',
    'రొట్టె': 'rotte.mp3',
    'బియ్యం': 'biyyam.mp3',
    'పప్పు': 'pappu.mp3',
    'కూర': 'kura.mp3',
    'నీరు': 'neeru.mp3',
    'పాలు': 'palu.mp3',
    'టీ': 'ti.mp3',
    'కాఫీ': 'kafi.mp3',
    'పండు': 'pandu.mp3',
  },
  kannada: {
    'ನಮಸ್ಕಾರ': 'namaskara.mp3',
    'ಧನ್ಯವಾದಗಳು': 'dhanyavadagalu.mp3',
    'ವಿದಾಯ': 'vida.mp3',
    'ಹೌದು': 'houdu.mp3',
    'ಅಲ್ಲ': 'alla.mp3',
    'ಹೇಗೆ ಇದ್ದೀರ': 'hege_iddira.mp3',
    'ಚೆನ್ನಾಗಿದ್ದೇನೆ': 'chennagiddenne.mp3',
    'ಕ್ಷಮಿಸಿ': 'kshamisi.mp3',
    'ದಯವಿಟ್ಟು': 'dayavittu.mp3',
    'ಸ್ವಾಗತ': 'swagata.mp3',
    'ನನ್ನ ಹೆಸರು': 'nanna_hesaru.mp3',
    'ನಿಮ್ಮ ಹೆಸರು': 'nimm_hesaru.mp3',
    'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಲು ಸಂತೋಷ': 'nimmannu_bhetiyagalu_santosha.mp3',
    'ಮತ್ತೆ ಭೇಟಿಯಾಗೋಣ': 'matte_bhetiyagon.mp3',
    'ಶುಭ ರಾತ್ರಿ': 'shubha_ratri.mp3',
    'ಶುಭೋದಯ': 'shubhodaya.mp3',
    'ಶುಭ ಮಧ್ಯಾಹ್ನ': 'shubha_madhyahna.mp3',
    'ಶುಭ ಸಂಜೆ': 'shubha_sanje.mp3',
    'ಎಲ್ಲಿ': 'elli.mp3',
    'ಎಂದು': 'endu.mp3',
    'ಯಾರು': 'yaru.mp3',
    'ಏನು': 'enu.mp3',
    'ಏಕೆ': 'eke.mp3',
    'ಹೇಗೆ': 'hege.mp3',
    'ಎಷ್ಟು': 'eshtu.mp3',
    'ಒಂದು': 'ondu.mp3',
    'ಎರಡು': 'eradu.mp3',
    'ಮೂರು': 'muru.mp3',
    'ನಾಲ್ಕು': 'nalku.mp3',
    'ಐದು': 'aidu.mp3',
    'ತಂದೆ': 'tande.mp3',
    'ತಾಯಿ': 'tayi.mp3',
    'ಸಹೋದರ': 'sahodara.mp3',
    'ಸಹೋದರಿ': 'sahodari.mp3',
    'ಮಗ': 'maga.mp3',
    'ಮಗಳು': 'magalu.mp3',
    'ರೊಟ್ಟಿ': 'rotti.mp3',
    'ಅಕ್ಕಿ': 'akki.mp3',
    'ದಾಲ್': 'dal.mp3',
    'ತರಕಾರಿ': 'tarakari.mp3',
    'ನೀರು': 'neeru.mp3',
    'ಹಾಲು': 'halu.mp3',
    'ಚಹಾ': 'chaha.mp3',
    'ಕಾಫಿ': 'kafi.mp3',
    'ಹಣ್ಣು': 'hannu.mp3',
  },
  tamil: {
    'வணக்கம்': 'vanakkam.mp3',
    'நன்றி': 'nandri.mp3',
    'போயிட்டு வரேன்': 'poyitu_varen.mp3',
    'ஆம்': 'aam.mp3',
    'இல்லை': 'illai.mp3',
    'எப்படி இருக்கீங்க': 'eppadi_irukkeenga.mp3',
    'நன்றாக இருக்கிறேன்': 'nandraga_irukkiren.mp3',
    'மன்னிக்கவும்': 'mannikkavum.mp3',
    'தயவு செய்து': 'thayavu_seythu.mp3',
    'வரவேற்கிறோம்': 'varaverkkirom.mp3',
    'என் பெயர்': 'en_peyar.mp3',
    'உங்கள் பெயர்': 'ungal_peyar.mp3',
    'உங்களை சந்தித்ததில் மகிழ்ச்சி': 'ungala_sandhithathil_magizhchi.mp3',
    'மீண்டும் சந்திப்போம்': 'meendum_sandhippom.mp3',
    'நல்ல இரவு': 'nalla_iravu.mp3',
    'காலை வணக்கம்': 'kalai_vanakkam.mp3',
    'மதிய வணக்கம்': 'mathiya_vanakkam.mp3',
    'மாலை வணக்கம்': 'malai_vanakkam.mp3',
    'எங்கே': 'enge.mp3',
    'எப்போது': 'eppothu.mp3',
    'யார்': 'yar.mp3',
    'என்ன': 'enna.mp3',
    'ஏன்': 'en.mp3',
    'எப்படி': 'eppadi.mp3',
    'எவ்வளவு': 'evvalavu.mp3',
    'ஒன்று': 'ondru.mp3',
    'இரண்டு': 'irandu.mp3',
    'மூன்று': 'moondru.mp3',
    'நான்கு': 'naanku.mp3',
    'ஐந்து': 'ainthu.mp3',
    'தந்தை': 'thanthai.mp3',
    'தாய்': 'thay.mp3',
    'சகோதரன்': 'sagodharan.mp3',
    'சகோதரி': 'sagodhari.mp3',
    'மகன்': 'magan.mp3',
    'மகள்': 'magal.mp3',
    'ரொட்டி': 'rotti.mp3',
    'அரிசி': 'arisi.mp3',
    'பருப்பு': 'paruppu.mp3',
    'காய்கறி': 'kaykari.mp3',
    'தண்ணீர்': 'thanneer.mp3',
    'பால்': 'pal.mp3',
    'தேநீர்': 'theneer.mp3',
    'காபி': 'kapi.mp3',
    'பழம்': 'pazham.mp3',
  },
};

// Base directory for audio files
const audioBaseDir = path.join(__dirname, '..', 'src', 'assets', 'audio');

// Ensure directories exist
function ensureDirectories() {
  Object.keys(audioFileMap).forEach(lang => {
    const langDir = path.join(audioBaseDir, lang);
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
      console.log(`✅ Created directory: ${langDir}`);
    }
  });
}

// Generate audio file using Google TTS API
async function generateAudioFile(text, filename, languageId) {
  return new Promise((resolve, reject) => {
    try {
      const langCode = languageCodes[languageId];
      if (!langCode) {
        reject(new Error(`Unknown language: ${languageId}`));
        return;
      }

      const outputPath = path.join(audioBaseDir, languageId, filename);
      
      // Use Google TTS API (free, no API key needed for basic usage)
      // Format: https://translate.google.com/translate_tts?ie=UTF-8&tl=LANG&client=tw-ob&q=TEXT
      const encodedText = encodeURIComponent(text);
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=tw-ob&q=${encodedText}`;
      
      const file = fs.createWriteStream(outputPath);
      
      https.get(ttsUrl, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            console.log(`✅ Generated: ${languageId}/${filename}`);
            resolve(outputPath);
          });
        } else {
          file.close();
          fs.unlinkSync(outputPath); // Delete empty file
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        }
      }).on('error', (error) => {
        file.close();
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Generate all audio files
async function generateAllAudio() {
  console.log('🎵 Starting audio file generation...\n');
  
  ensureDirectories();
  
  let totalFiles = 0;
  let successCount = 0;
  let errorCount = 0;
  
  for (const [languageId, mappings] of Object.entries(audioFileMap)) {
    console.log(`\n📁 Processing ${languageId}...`);
    
    for (const [text, filename] of Object.entries(mappings)) {
      totalFiles++;
      
      try {
        // Check if file already exists
        const filePath = path.join(audioBaseDir, languageId, filename);
        if (fs.existsSync(filePath)) {
          console.log(`⏭️  Skipping (exists): ${languageId}/${filename}`);
          successCount++;
          continue;
        }
        
        await generateAudioFile(text, filename, languageId);
        successCount++;
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`❌ Error generating ${languageId}/${filename}:`, error.message);
        errorCount++;
      }
    }
  }
  
  console.log(`\n\n📊 Summary:`);
  console.log(`   Total files: ${totalFiles}`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Skipped (already exist): ${totalFiles - successCount - errorCount}`);
  
  if (errorCount === 0) {
    console.log('\n✅ All audio files generated successfully!');
    console.log('\n📝 Next step: Update src/assets/audio/audioIndex.js with require() statements');
  } else {
    console.log(`\n⚠️  ${errorCount} files failed to generate. Please check errors above.`);
  }
}

// Run the script
if (require.main === module) {
  generateAllAudio().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { generateAllAudio, generateAudioFile };

