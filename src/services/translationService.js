/**
 * Translation Service
 * Translates words from English to target language
 * Uses multiple translation strategies:
 * 1. Built-in dictionary for common words (most accurate)
 * 2. MyMemory API (free, no API key required)
 * 3. LibreTranslate API (fallback)
 */

// Built-in dictionary for common words to ensure accuracy
const commonWordsDict = {
  // Pronouns
  'i': { hi: 'मैं', bn: 'আমি', te: 'నేను', kn: 'ನಾನು', ta: 'நான்' },
  'you': { hi: 'आप', bn: 'তুমি', te: 'మీరు', kn: 'ನೀವು', ta: 'நீங்கள்' },
  'he': { hi: 'वह', bn: 'সে', te: 'అతను', kn: 'ಅವನು', ta: 'அவன்' },
  'she': { hi: 'वह', bn: 'সে', te: 'ఆమె', kn: 'ಅವಳು', ta: 'அவள்' },
  'we': { hi: 'हम', bn: 'আমরা', te: 'మేము', kn: 'ನಾವು', ta: 'நாம்' },
  'they': { hi: 'वे', bn: 'তারা', te: 'వారు', kn: 'ಅವರು', ta: 'அவர்கள்' },
  'it': { hi: 'यह', bn: 'এটা', te: 'ఇది', kn: 'ಇದು', ta: 'இது' },
  
  // Common verbs
  'am': { hi: 'हूँ', bn: 'আমি', te: 'నేను', kn: 'ನಾನು', ta: 'நான்' },
  'is': { hi: 'है', bn: 'হয়', te: 'ఉంది', kn: 'ಇದೆ', ta: 'உள்ளது' },
  'are': { hi: 'हैं', bn: 'হয়', te: 'ఉన్నారు', kn: 'ಇದ್ದಾರೆ', ta: 'உள்ளன' },
  'was': { hi: 'था', bn: 'ছিল', te: 'ఉంది', kn: 'ಇತ್ತು', ta: 'இருந்தது' },
  'were': { hi: 'थे', bn: 'ছিল', te: 'ఉన్నారు', kn: 'ಇದ್ದರು', ta: 'இருந்தன' },
  'can': { hi: 'सकता है', bn: 'পারে', te: 'చేయగలరు', kn: 'ಮಾಡಬಹುದು', ta: 'முடியும்' },
  'do': { hi: 'करना', bn: 'করা', te: 'చేయండి', kn: 'ಮಾಡಿ', ta: 'செய்' },
  'have': { hi: 'है', bn: 'আছে', te: 'ఉంది', kn: 'ಇದೆ', ta: 'உள்ளது' },
  'go': { hi: 'जाना', bn: 'যাওয়া', te: 'వెళ్ళు', kn: 'ಹೋಗು', ta: 'போ' },
  'come': { hi: 'आना', bn: 'আসা', te: 'రా', kn: 'ಬಾ', ta: 'வா' },
  'help': { hi: 'मदद', bn: 'সাহায্য', te: 'సహాయం', kn: 'ಸಹಾಯ', ta: 'உதவி' },
  'want': { hi: 'चाहना', bn: 'চাই', te: 'కావాలి', kn: 'ಬೇಕು', ta: 'வேண்டும்' },
  'need': { hi: 'चाहिए', bn: 'প্রয়োজন', te: 'కావాలి', kn: 'ಬೇಕು', ta: 'தேவை' },
  'like': { hi: 'पसंद', bn: 'পছন্দ', te: 'ఇష్టం', kn: 'ಇಷ್ಟ', ta: 'விரும்பு' },
  'read': { hi: 'पढ़ना', bn: 'পড়া', te: 'చదవండి', kn: 'ಓದು', ta: 'படி' },
  
  // Question words
  'what': { hi: 'क्या', bn: 'কি', te: 'ఏమి', kn: 'ಏನು', ta: 'என்ன' },
  'when': { hi: 'कब', bn: 'কখন', te: 'ఎప్పుడు', kn: 'ಯಾವಾಗ', ta: 'எப்போது' },
  'where': { hi: 'कहाँ', bn: 'কোথায়', te: 'ఎక్కడ', kn: 'ಎಲ್ಲಿ', ta: 'எங்கே' },
  'who': { hi: 'कौन', bn: 'কে', te: 'ఎవరు', kn: 'ಯಾರು', ta: 'யார்' },
  'why': { hi: 'क्यों', bn: 'কেন', te: 'ఎందుకు', kn: 'ಯಾಕೆ', ta: 'ஏன்' },
  'how': { hi: 'कैसे', bn: 'কিভাবে', te: 'ఎలా', kn: 'ಹೇಗೆ', ta: 'எப்படி' },
  'which': { hi: 'कौन सा', bn: 'কোনটি', te: 'ఏది', kn: 'ಯಾವುದು', ta: 'எந்த' },
  
  // Common words
  'the': { hi: '', bn: '', te: '', kn: '', ta: '' }, // No direct equivalent
  'a': { hi: 'एक', bn: 'একটি', te: 'ఒక', kn: 'ಒಂದು', ta: 'ஒரு' },
  'an': { hi: 'एक', bn: 'একটি', te: 'ఒక', kn: 'ಒಂದು', ta: 'ஒரு' },
  'and': { hi: 'और', bn: 'এবং', te: 'మరియు', kn: 'ಮತ್ತು', ta: 'மற்றும்' },
  'or': { hi: 'या', bn: 'অথবা', te: 'లేదా', kn: 'ಅಥವಾ', ta: 'அல்லது' },
  'but': { hi: 'लेकिन', bn: 'কিন্তু', te: 'కానీ', kn: 'ಆದರೆ', ta: 'ஆனால்' },
  'in': { hi: 'में', bn: 'মধ্যে', te: 'లో', kn: 'ನಲ್ಲಿ', ta: 'இல்' },
  'on': { hi: 'पर', bn: 'উপর', te: 'పై', kn: 'ಮೇಲೆ', ta: 'மேல்' },
  'at': { hi: 'पर', bn: 'এ', te: 'వద్ద', kn: 'ನಲ್ಲಿ', ta: 'இல்' },
  'to': { hi: 'को', bn: 'থেকে', te: 'కు', kn: 'ಗೆ', ta: 'க்கு' },
  'from': { hi: 'से', bn: 'থেকে', te: 'నుండి', kn: 'ಇಂದ', ta: 'இருந்து' },
  'with': { hi: 'साथ', bn: 'সাথে', te: 'తో', kn: 'ಜೊತೆ', ta: 'உடன்' },
  'for': { hi: 'के लिए', bn: 'জন্য', te: 'కోసం', kn: 'ಗಾಗಿ', ta: 'க்காக' },
  'of': { hi: 'का', bn: 'এর', te: 'యొక్క', kn: 'ನ', ta: 'இன்' },
  'by': { hi: 'द्वारा', bn: 'দ্বারা', te: 'ద్వారా', kn: 'ಮೂಲಕ', ta: 'மூலம்' },
  
  // Time
  'today': { hi: 'आज', bn: 'আজ', te: 'ఈరోజు', kn: 'ಇಂದು', ta: 'இன்று' },
  'tomorrow': { hi: 'कल', bn: 'আগামীকাল', te: 'రేపు', kn: 'ನಾಳೆ', ta: 'நாளை' },
  'yesterday': { hi: 'कल', bn: 'গতকাল', te: 'నిన్న', kn: 'ನಿನ್ನೆ', ta: 'நேற்று' },
  'now': { hi: 'अब', bn: 'এখন', te: 'ఇప్పుడు', kn: 'ಈಗ', ta: 'இப்போது' },
  'after': { hi: 'बाद', bn: 'পরে', te: 'తర్వాత', kn: 'ನಂತರ', ta: 'பின்' },
  
  // Common nouns
  'name': { hi: 'नाम', bn: 'নাম', te: 'పేరు', kn: 'ಹೆಸರು', ta: 'பெயர்' },
  'school': { hi: 'स्कूल', bn: 'স্কুল', te: 'పాఠశాల', kn: 'ಶಾಲೆ', ta: 'பள்ளி' },
  'home': { hi: 'घर', bn: 'ঘর', te: 'ఇల్లు', kn: 'ಮನೆ', ta: 'வீடு' },
  'hobby': { hi: 'शौक', bn: 'শখ', te: 'అభిరుచి', kn: 'ಹವ್ಯಾಸ', ta: 'பொழுதுபோக்கு' },
  'pupil': { hi: 'छात्र', bn: 'ছাত্র', te: 'విద్యార్థి', kn: 'ವಿದ್ಯಾರ್ಥಿ', ta: 'மாணவர்' },
  'form': { hi: 'कक्षा', bn: 'ফর্ম', te: 'తరగతి', kn: 'ತರಗತಿ', ta: 'வகுப்பு' },
  
  // Numbers
  'one': { hi: 'एक', bn: 'এক', te: 'ఒకటి', kn: 'ಒಂದು', ta: 'ஒன்று' },
  'two': { hi: 'दो', bn: 'দুই', te: 'రెండు', kn: 'ಎರಡು', ta: 'இரண்டு' },
  'three': { hi: 'तीन', bn: 'তিন', te: 'మూడు', kn: 'ಮೂರು', ta: 'மூன்று' },
  'four': { hi: 'चार', bn: 'চার', te: 'నాలుగు', kn: 'ನಾಲ್ಕು', ta: 'நான்கு' },
  'fourth': { hi: 'चौथा', bn: 'চতুর্থ', te: 'నాల్గవ', kn: 'ನಾಲ್ಕನೆಯ', ta: 'நான்காவது' },
  'five': { hi: 'पाँच', bn: 'পাঁচ', te: 'ఐదు', kn: 'ಐದು', ta: 'ஐந்து' },
  
  // Common adjectives
  'my': { hi: 'मेरा', bn: 'আমার', te: 'నా', kn: 'ನನ್ನ', ta: 'என்' },
  'your': { hi: 'तुम्हारा', bn: 'তোমার', te: 'మీ', kn: 'ನಿಮ್ಮ', ta: 'உங்கள்' },
  'his': { hi: 'उसका', bn: 'তার', te: 'అతని', kn: 'ಅವನ', ta: 'அவனுடைய' },
  'her': { hi: 'उसका', bn: 'তার', te: 'ఆమె', kn: 'ಅವಳ', ta: 'அவளுடைய' },
};

// Simple in-memory cache to avoid duplicate API calls
const translationCache = new Map();

// Rate limiting: Add delay between requests to avoid hitting API limits
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 300; // 300ms between requests

/**
 * Translate using MyMemory API (more reliable, higher rate limits)
 */
const translateWithMyMemory = async (word, targetLang) => {
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${targetLang}`,
    {
      method: "GET",
      headers: { 
        "Accept": "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new Error(`MyMemory API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data && data.responseData && data.responseData.translatedText) {
    return data.responseData.translatedText;
  }
  
  throw new Error("Invalid MyMemory response format");
};

/**
 * Translate using LibreTranslate API (backup)
 */
const translateWithLibreTranslate = async (word, targetLang) => {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      q: word.trim(),
      source: "en",
      target: targetLang,
      format: "text"
    })
  });

  if (!response.ok) {
    throw new Error(`LibreTranslate API error: ${response.status}`);
  }

  const responseText = await response.text();

  // Check if we got HTML instead of JSON
  if (responseText.trim().startsWith('<')) {
    throw new Error("LibreTranslate returned HTML (service may be rate-limited)");
  }

  const data = JSON.parse(responseText);
  
  if (data && typeof data.translatedText === 'string') {
    return data.translatedText;
  }
  
  throw new Error("Invalid LibreTranslate response format");
};

/**
 * Translate a word from English to target language
 * Automatically tries multiple translation methods with fallback
 * 
 * @param {string} word - Word to translate
 * @param {string} targetLang - Target language code (hi, bn, te, kn, ta)
 * @returns {Promise<string>} Translated word
 */
export const translateWord = async (word, targetLang) => {
  try {
    // Skip translation for empty or very short words
    if (!word || word.trim().length === 0) {
      return word;
    }

    const normalizedWord = word.trim().toLowerCase();
    const cacheKey = `${normalizedWord}_${targetLang}`;

    // Check cache first
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey);
    }

    // Check built-in dictionary first (most accurate for common words)
    if (commonWordsDict[normalizedWord] && commonWordsDict[normalizedWord][targetLang] !== undefined) {
      const translation = commonWordsDict[normalizedWord][targetLang];
      console.log(`✅ Translated "${word}" using dictionary`);
      
      // Cache the result
      translationCache.set(cacheKey, translation);
      
      return translation || word; // Return original if no translation
    }

    // Rate limiting: Wait if needed
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
    }
    lastRequestTime = Date.now();

    let translatedText = null;
    let errors = [];

    // Try MyMemory API first (more reliable)
    try {
      translatedText = await translateWithMyMemory(word, targetLang);
      console.log(`✅ Translated "${word}" using MyMemory API`);
    } catch (myMemoryError) {
      console.warn(`MyMemory API failed for "${word}":`, myMemoryError.message);
      errors.push(`MyMemory: ${myMemoryError.message}`);
      
      // Fallback to LibreTranslate
      try {
        translatedText = await translateWithLibreTranslate(word, targetLang);
        console.log(`✅ Translated "${word}" using LibreTranslate API (fallback)`);
      } catch (libreError) {
        console.warn(`LibreTranslate API failed for "${word}":`, libreError.message);
        errors.push(`LibreTranslate: ${libreError.message}`);
      }
    }

    // If both APIs failed, throw error
    if (!translatedText) {
      throw new Error(
        `All translation services failed for "${word}". Errors: ${errors.join(', ')}`
      );
    }

    // Cache the result
    translationCache.set(cacheKey, translatedText);
    
    // Limit cache size (keep last 200 translations)
    if (translationCache.size > 200) {
      const firstKey = translationCache.keys().next().value;
      translationCache.delete(firstKey);
    }

    return translatedText;
  } catch (error) {
    console.error(`Translation failed for "${word}":`, error.message);
    // Return original word if all translation attempts fail
    // This prevents the whole OCR feature from breaking
    throw error;
  }
};

/**
 * Clear translation cache (useful for testing or memory management)
 */
export const clearTranslationCache = () => {
  translationCache.clear();
  console.log('Translation cache cleared');
};

export default {
  translateWord,
  clearTranslationCache
};
