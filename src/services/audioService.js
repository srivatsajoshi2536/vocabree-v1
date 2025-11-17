/**
 * Audio Service
 * MP3 audio playback service using Expo AV
 * Supports all 5 Indian languages: Hindi, Bengali, Telugu, Kannada, Tamil
 * 
 * Uses MP3 files from assets/audio/{languageId}/
 * Falls back to TTS if MP3 file not found
 */

import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAudioAsset as getAudioAssetFromIndex } from '../assets/audio/audioIndex';

class AudioService {
  constructor() {
    this.isInitialized = false;
    this.volume = 1.0;
    this.soundEnabled = true;
    this.soundCache = {}; // Cache loaded sounds
    this.currentSound = null; // Currently playing sound
    
    // Language codes for TTS fallback
    this.languageMap = {
      hindi: 'hi-IN',
      bengali: 'bn-IN',
      telugu: 'te-IN',
      kannada: 'kn-IN',
      tamil: 'ta-IN',
    };
    
    // Mapping from native script text to MP3 filenames
    this.audioFileMap = this.buildAudioFileMap();
  }

  /**
   * Build comprehensive mapping from native script to MP3 filenames
   */
  buildAudioFileMap() {
    return {
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
  }

  /**
   * Get MP3 filename from native script text
   */
  getAudioFilename(text, languageId) {
    if (!text) return null;
    
    // If it's already a filename (contains .mp3), return as-is
    if (text.includes('.mp3')) {
      return text;
    }
    
    // Check if it's native script and map to filename
    const languageMap = this.audioFileMap[languageId] || {};
    const filename = languageMap[text];
    
    if (filename) {
      return filename;
    }
    
    // If not found in map, try to generate filename from text
    // Convert native script to transliteration (basic fallback)
    return this.textToFilename(text);
  }

  /**
   * Convert text to filename (basic transliteration)
   */
  textToFilename(text) {
    if (!text) return null;
    
    // Remove special characters, replace spaces with underscores
    let filename = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    
    return filename ? `${filename}.mp3` : null;
  }

  /**
   * Get audio asset path for a language and filename
   * Uses static audio index for React Native bundler compatibility
   */
  getAudioAsset(languageId, filename) {
    if (!filename) return null;
    
    try {
      // Use static audio index (allows React Native bundler to include files)
      const audioAsset = getAudioAssetFromIndex(languageId, filename);
      
      if (!audioAsset) {
        console.log(`📁 Audio file not found in index: ${languageId}/${filename}`);
      }
      
      return audioAsset;
    } catch (error) {
      console.log(`📁 Error loading audio: ${languageId}/${filename}`, error);
      return null;
    }
  }

  /**
   * Initialize audio service
   */
  async initialize() {
    if (this.isInitialized) {
      return;
    }

    try {
      // Set audio mode for proper playback
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        allowsRecordingIOS: false,
        playThroughEarpieceAndroid: false,
      });

      // Load settings from storage
      const savedVolume = await AsyncStorage.getItem('audio_volume');
      const savedSoundEnabled = await AsyncStorage.getItem('sound_enabled');
      
      if (savedVolume !== null) {
        this.volume = parseFloat(savedVolume);
      } else {
        this.volume = 1.0;
        await AsyncStorage.setItem('audio_volume', '1.0');
      }
      
      // Validate volume
      if (isNaN(this.volume) || this.volume < 0 || this.volume > 1) {
        this.volume = 1.0;
        await AsyncStorage.setItem('audio_volume', '1.0');
      }
      
      if (savedSoundEnabled !== null) {
        this.soundEnabled = savedSoundEnabled === 'true';
      } else {
        this.soundEnabled = true;
        await AsyncStorage.setItem('sound_enabled', 'true');
      }

      this.isInitialized = true;
      console.log('✅ Audio service initialized. Sound:', this.soundEnabled, 'Volume:', this.volume);
    } catch (error) {
      console.error('❌ Error initializing audio:', error);
      this.isInitialized = true; // Mark as initialized to prevent infinite retries
    }
  }

  /**
   * Play MP3 audio file
   * @param {string} audioFile - Audio filename or native script text
   * @param {string} languageId - Language ID
   * @param {object} options - Playback options
   */
  async playSound(audioFile, languageId = 'hindi', options = {}) {
    if (!this.soundEnabled) {
      console.log('🔇 Sound disabled, skipping audio');
      return;
    }

    try {
      await this.initialize();

      // Get MP3 filename from text or filename
      const filename = this.getAudioFilename(audioFile, languageId);
      
      if (!filename) {
        console.warn('⚠️ No audio filename found for:', audioFile);
        // Fallback to TTS
        return this.playTTS(audioFile, languageId, options);
      }

      console.log(`🔊 Playing MP3: ${languageId}/${filename}`);

      // Stop any currently playing sound
      if (this.currentSound) {
        try {
          const status = await this.currentSound.getStatusAsync();
          if (status.isLoaded) {
            await this.currentSound.stopAsync();
          }
        } catch (error) {
          // Sound might already be unloaded, ignore
        }
        this.currentSound = null;
      }

      // Get audio asset
      const audioAsset = this.getAudioAsset(languageId, filename);
      
      if (!audioAsset) {
        console.warn(`⚠️ MP3 file not found: ${filename}, falling back to TTS`);
        // Fallback to TTS
        return this.playTTS(audioFile, languageId, options);
      }

      // Check cache first
      const cacheKey = `${languageId}_${filename}`;
      if (this.soundCache[cacheKey]) {
        this.currentSound = this.soundCache[cacheKey];
      } else {
        // Load new sound
        const { sound } = await Audio.Sound.createAsync(
          audioAsset,
          {
            shouldPlay: true,
            volume: this.volume,
            rate: options.rate || 1.0,
            isLooping: false,
          }
        );
        
        this.currentSound = sound;
        this.soundCache[cacheKey] = sound;
      }

      // Set volume
      await this.currentSound.setVolumeAsync(this.volume);
      
      // Set rate if provided
      if (options.rate) {
        await this.currentSound.setRateAsync(options.rate, true);
      }

      // Play sound
      await this.currentSound.playAsync();

      // Wait for playback to finish
      return new Promise((resolve) => {
        this.currentSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            console.log('✅ MP3 playback completed');
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('❌ Error playing MP3:', error);
      // Fallback to TTS
      return this.playTTS(audioFile, languageId, options);
    }
  }

  /**
   * Play audio with slow speed option
   */
  async playSoundSlow(audioFile, languageId = 'hindi', slow = false) {
    const rate = slow ? 0.7 : 1.0;
    return this.playSound(audioFile, languageId, { rate });
  }

  /**
   * Play text directly (converts to MP3 filename first)
   */
  async playText(text, languageId = 'hindi', options = {}) {
    // Try to get MP3 filename from text
    const filename = this.getAudioFilename(text, languageId);
    
    if (filename) {
      return this.playSound(filename, languageId, options);
    }
    
    // Fallback to TTS if no MP3 found
    return this.playTTS(text, languageId, options);
  }

  /**
   * Play text-to-speech (fallback when MP3 not available)
   */
  async playTTS(text, languageId = 'hindi', options = {}) {
    if (!this.soundEnabled) {
      console.log('🔇 Sound disabled, skipping TTS');
      return;
    }

    try {
      await this.initialize();
      
      const ttsLanguage = this.languageMap[languageId] || 'hi-IN';
      const effectiveVolume = Math.max(0.0, Math.min(1.0, this.volume));
      const rate = options.rate || 0.9;

      // Extract text if it's a filename
      let textToSpeak = text;
      if (text.includes('.mp3') || text.includes('_')) {
        textToSpeak = text.replace(/\.(mp3|wav|m4a|aac)$/i, '').replace(/[_-]/g, ' ');
      }

      console.log(`📢 Playing TTS (fallback): "${textToSpeak}" (${ttsLanguage})`);

      return new Promise((resolve) => {
        Speech.speak(textToSpeak, {
          language: ttsLanguage,
          pitch: 1.0,
          rate: rate,
          volume: effectiveVolume,
          onDone: () => {
            console.log('✅ TTS completed');
            resolve();
          },
          onError: (error) => {
            console.error('❌ TTS error:', error);
            resolve();
          },
        });
      });
    } catch (error) {
      console.error('❌ TTS exception:', error);
    }
  }

  /**
   * Play success sound effect
   */
  async playSuccessSound() {
    if (!this.soundEnabled) return;
    try {
      // Use TTS for simple sound effects
      await Speech.speak('ding', {
        pitch: 1.2,
        rate: 2.0,
        volume: this.volume * 0.5,
      });
    } catch (error) {
      console.error('❌ Error playing success sound:', error);
    }
  }

  /**
   * Play error sound effect
   */
  async playErrorSound() {
    if (!this.soundEnabled) return;
    try {
      // Use TTS for simple sound effects
      await Speech.speak('dong', {
        pitch: 0.8,
        rate: 2.0,
        volume: this.volume * 0.5,
      });
    } catch (error) {
      console.error('❌ Error playing error sound:', error);
    }
  }

  /**
   * Stop all playing audio
   */
  async stopAll() {
    try {
      // Stop current sound
      if (this.currentSound) {
        try {
          const status = await this.currentSound.getStatusAsync();
          if (status.isLoaded) {
            await this.currentSound.stopAsync();
          }
        } catch (soundError) {
          // Sound might already be unloaded, ignore
          console.log('Sound already stopped or unloaded');
        }
        this.currentSound = null;
      }
      
      // Stop TTS
      Speech.stop();
      
      console.log('🛑 All audio stopped');
    } catch (error) {
      // Ignore errors when stopping - sound might already be stopped
      console.log('Audio stop completed (some sounds may have been already stopped)');
    }
  }

  /**
   * Unload a specific sound
   */
  async unloadSound(audioFile, languageId = 'hindi') {
    const filename = this.getAudioFilename(audioFile, languageId);
    const cacheKey = `${languageId}_${filename}`;
    
    if (this.soundCache[cacheKey]) {
      try {
        const sound = this.soundCache[cacheKey];
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.unloadAsync();
        }
        delete this.soundCache[cacheKey];
      } catch (error) {
        // Sound might already be unloaded, just remove from cache
        delete this.soundCache[cacheKey];
      }
    }
  }

  /**
   * Unload all sounds
   */
  async unloadAll() {
    try {
      await this.stopAll();
      
      // Unload all cached sounds
      for (const [key, sound] of Object.entries(this.soundCache)) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            await sound.unloadAsync();
          }
        } catch (error) {
          // Sound might already be unloaded, ignore
        }
      }
      
      this.soundCache = {};
    } catch (error) {
      // Ignore errors - sounds might already be unloaded
      this.soundCache = {};
    }
  }

  /**
   * Set volume (0.0 to 1.0)
   */
  async setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    await AsyncStorage.setItem('audio_volume', this.volume.toString());
    
    // Update current sound volume if playing
    if (this.currentSound) {
      try {
        await this.currentSound.setVolumeAsync(this.volume);
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  }

  /**
   * Enable/disable sound
   */
  async setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    await AsyncStorage.setItem('sound_enabled', enabled.toString());
    
    if (!enabled) {
      await this.stopAll();
    } else {
      await this.initialize();
    }
  }

  /**
   * Get current volume
   */
  getVolume() {
    return this.volume;
  }

  /**
   * Check if sound is enabled
   */
  isSoundEnabled() {
    return this.soundEnabled;
  }

  /**
   * Get TTS language code for a language ID
   */
  getLanguageCode(languageId) {
    return this.languageMap[languageId] || 'hi-IN';
  }

  /**
   * Check if language is supported
   */
  isLanguageSupported(languageId) {
    return languageId in this.languageMap;
  }

  /**
   * Get debug info
   */
  getDebugInfo() {
    return {
      isInitialized: this.isInitialized,
      soundEnabled: this.soundEnabled,
      volume: this.volume,
      languageMap: this.languageMap,
      cachedSounds: Object.keys(this.soundCache).length,
    };
  }
}

export default new AudioService();
