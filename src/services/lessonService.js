/**
 * Lesson Service
 * Handles loading and managing lesson data
 */

// Import lesson data - only Hindi has actual lessons for now
const hindiBasics1Level1 = require('../assets/data/hindi/lessons/basics_1_level_1.json');
const hindiBasics1Level2 = require('../assets/data/hindi/lessons/basics_1_level_2.json');

class LessonService {
  constructor() {
    this.lessonsCache = {};
  }

  /**
   * Get lesson by skill ID and level
   */
  getLesson(languageId, skillId, level) {
    const lessonKey = `${languageId}_${skillId}_${level}`;

    // Return cached lesson if available
    if (this.lessonsCache[lessonKey]) {
      return this.lessonsCache[lessonKey];
    }

    // Return actual Hindi lessons if available
    if (languageId === 'hindi' && skillId === 'basics_1') {
      if (level === 1) {
        this.lessonsCache[lessonKey] = hindiBasics1Level1;
        return hindiBasics1Level1;
      }
      if (level === 2) {
        this.lessonsCache[lessonKey] = hindiBasics1Level2;
        return hindiBasics1Level2;
      }
    }

    // Generate language-specific placeholder lesson for other languages/skills/levels
    const lesson = this.generatePlaceholderLesson(languageId, skillId, level);
    this.lessonsCache[lessonKey] = lesson;
    return lesson;
  }

  /**
   * Get vocabulary for a skill and level
   * Returns language-specific vocabulary based on skill and level
   */
  getVocabulary(languageId, skillId, level) {
    const vocabularies = {
      basics_1: {
        1: {
          hindi: { word1: 'नमस्ते', word2: 'धन्यवाद', word3: 'हाँ', word4: 'नहीं', word5: 'अलविदा' },
          bengali: { word1: 'নমস্কার', word2: 'ধন্যবাদ', word3: 'হ্যাঁ', word4: 'না', word5: 'বিদায়' },
          telugu: { word1: 'నమస్కారం', word2: 'ధన్యవాదాలు', word3: 'అవును', word4: 'కాదు', word5: 'సెలవు' },
          kannada: { word1: 'ನಮಸ್ಕಾರ', word2: 'ಧನ್ಯವಾದಗಳು', word3: 'ಹೌದು', word4: 'ಅಲ್ಲ', word5: 'ವಿದಾಯ' },
          tamil: { word1: 'வணக்கம்', word2: 'நன்றி', word3: 'ஆம்', word4: 'இல்லை', word5: 'போயிட்டு வரேன்' },
          english: { word1: 'Hello', word2: 'Thank you', word3: 'Yes', word4: 'No', word5: 'Goodbye' },
        },
        2: {
          hindi: { word1: 'कैसे हो', word2: 'ठीक हूँ', word3: 'माफ करें', word4: 'कृपया', word5: 'स्वागत' },
          bengali: { word1: 'কেমন আছেন', word2: 'ভালো', word3: 'ক্ষমা করুন', word4: 'অনুগ্রহ করে', word5: 'স্বাগতম' },
          telugu: { word1: 'ఎలా ఉన్నారు', word2: 'బాగున్నాను', word3: 'క్షమించండి', word4: 'దయచేసి', word5: 'స్వాగతం' },
          kannada: { word1: 'ಹೇಗೆ ಇದ್ದೀರ', word2: 'ಚೆನ್ನಾಗಿದ್ದೇನೆ', word3: 'ಕ್ಷಮಿಸಿ', word4: 'ದಯವಿಟ್ಟು', word5: 'ಸ್ವಾಗತ' },
          tamil: { word1: 'எப்படி இருக்கீங்க', word2: 'நன்றாக இருக்கிறேன்', word3: 'மன்னிக்கவும்', word4: 'தயவு செய்து', word5: 'வரவேற்கிறோம்' },
          english: { word1: 'How are you', word2: 'I am fine', word3: 'Sorry', word4: 'Please', word5: 'Welcome' },
        },
        3: {
          hindi: { word1: 'मेरा नाम', word2: 'आपका नाम', word3: 'मिलकर खुशी हुई', word4: 'फिर मिलेंगे', word5: 'शुभ रात्रि' },
          bengali: { word1: 'আমার নাম', word2: 'আপনার নাম', word3: 'দেখে ভালো লাগল', word4: 'আবার দেখা হবে', word5: 'শুভ রাত্রি' },
          telugu: { word1: 'నా పేరు', word2: 'మీ పేరు', word3: 'మిమ్మల్ని కలవడం ఆనందంగా ఉంది', word4: 'మళ్లీ కలుద్దాం', word5: 'శుభ రాత్రి' },
          kannada: { word1: 'ನನ್ನ ಹೆಸರು', word2: 'ನಿಮ್ಮ ಹೆಸರು', word3: 'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಲು ಸಂತೋಷ', word4: 'ಮತ್ತೆ ಭೇಟಿಯಾಗೋಣ', word5: 'ಶುಭ ರಾತ್ರಿ' },
          tamil: { word1: 'என் பெயர்', word2: 'உங்கள் பெயர்', word3: 'உங்களை சந்தித்ததில் மகிழ்ச்சி', word4: 'மீண்டும் சந்திப்போம்', word5: 'நல்ல இரவு' },
          english: { word1: 'My name', word2: 'Your name', word3: 'Nice to meet you', word4: 'See you again', word5: 'Good night' },
        },
        4: {
          hindi: { word1: 'शुभ प्रभात', word2: 'शुभ दोपहर', word3: 'शुभ संध्या', word4: 'कहाँ', word5: 'कब' },
          bengali: { word1: 'সুপ্রভাত', word2: 'শুভ দুপুর', word3: 'শুভ সন্ধ্যা', word4: 'কোথায়', word5: 'কখন' },
          telugu: { word1: 'శుభోదయం', word2: 'శుభ మధ్యాహ్నం', word3: 'శుభ సాయంత్రం', word4: 'ఎక్కడ', word5: 'ఎప్పుడు' },
          kannada: { word1: 'ಶುಭೋದಯ', word2: 'ಶುಭ ಮಧ್ಯಾಹ್ನ', word3: 'ಶುಭ ಸಂಜೆ', word4: 'ಎಲ್ಲಿ', word5: 'ಎಂದು' },
          tamil: { word1: 'காலை வணக்கம்', word2: 'மதிய வணக்கம்', word3: 'மாலை வணக்கம்', word4: 'எங்கே', word5: 'எப்போது' },
          english: { word1: 'Good morning', word2: 'Good afternoon', word3: 'Good evening', word4: 'Where', word5: 'When' },
        },
        5: {
          hindi: { word1: 'कौन', word2: 'क्या', word3: 'क्यों', word4: 'कैसे', word5: 'कितना' },
          bengali: { word1: 'কে', word2: 'কী', word3: 'কেন', word4: 'কীভাবে', word5: 'কত' },
          telugu: { word1: 'ఎవరు', word2: 'ఏమి', word3: 'ఎందుకు', word4: 'ఎలా', word5: 'ఎంత' },
          kannada: { word1: 'ಯಾರು', word2: 'ಏನು', word3: 'ಏಕೆ', word4: 'ಹೇಗೆ', word5: 'ಎಷ್ಟು' },
          tamil: { word1: 'யார்', word2: 'என்ன', word3: 'ஏன்', word4: 'எப்படி', word5: 'எவ்வளவு' },
          english: { word1: 'Who', word2: 'What', word3: 'Why', word4: 'How', word5: 'How much' },
        },
      },
      basics_2: {
        1: {
          hindi: { word1: 'मुझे', word2: 'आपको', word3: 'हमें', word4: 'उन्हें', word5: 'इसे' },
          bengali: { word1: 'আমাকে', word2: 'আপনাকে', word3: 'আমাদের', word4: 'তাদের', word5: 'এটা' },
          telugu: { word1: 'నాకు', word2: 'మీకు', word3: 'మాకు', word4: 'వారికి', word5: 'దీన్ని' },
          kannada: { word1: 'ನನಗೆ', word2: 'ನಿಮಗೆ', word3: 'ನಮಗೆ', word4: 'ಅವರಿಗೆ', word5: 'ಇದನ್ನು' },
          tamil: { word1: 'எனக்கு', word2: 'உங்களுக்கு', word3: 'எங்களுக்கு', word4: 'அவர்களுக்கு', word5: 'இதை' },
          english: { word1: 'To me', word2: 'To you', word3: 'To us', word4: 'To them', word5: 'This' },
        },
        2: {
          hindi: { word1: 'यहाँ', word2: 'वहाँ', word3: 'यह', word4: 'वह', word5: 'कौन सा' },
          bengali: { word1: 'এখানে', word2: 'সেখানে', word3: 'এটা', word4: 'সেটা', word5: 'কোনটি' },
          telugu: { word1: 'ఇక్కడ', word2: 'అక్కడ', word3: 'ఇది', word4: 'అది', word5: 'ఏది' },
          kannada: { word1: 'ಇಲ್ಲಿ', word2: 'ಅಲ್ಲಿ', word3: 'ಇದು', word4: 'ಅದು', word5: 'ಏನು' },
          tamil: { word1: 'இங்கே', word2: 'அங்கே', word3: 'இது', word4: 'அது', word5: 'எது' },
          english: { word1: 'Here', word2: 'There', word3: 'This', word4: 'That', word5: 'Which' },
        },
        3: {
          hindi: { word1: 'मैं', word2: 'तुम', word3: 'वह', word4: 'हम', word5: 'वे' },
          bengali: { word1: 'আমি', word2: 'তুমি', word3: 'সে', word4: 'আমরা', word5: 'তারা' },
          telugu: { word1: 'నేను', word2: 'నీవు', word3: 'అతను', word4: 'మేము', word5: 'వారు' },
          kannada: { word1: 'ನಾನು', word2: 'ನೀನು', word3: 'ಅವನು', word4: 'ನಾವು', word5: 'ಅವರು' },
          tamil: { word1: 'நான்', word2: 'நீ', word3: 'அவன்', word4: 'நாங்கள்', word5: 'அவர்கள்' },
          english: { word1: 'I', word2: 'You', word3: 'He/She', word4: 'We', word5: 'They' },
        },
        4: {
          hindi: { word1: 'होना', word2: 'करना', word3: 'जाना', word4: 'आना', word5: 'देखना' },
          bengali: { word1: 'হওয়া', word2: 'করা', word3: 'যাওয়া', word4: 'আসা', word5: 'দেখা' },
          telugu: { word1: 'అవ్వడం', word2: 'చేయడం', word3: 'వెళ్ళడం', word4: 'వచ్చడం', word5: 'చూడడం' },
          kannada: { word1: 'ಇರುವುದು', word2: 'ಮಾಡುವುದು', word3: 'ಹೋಗುವುದು', word4: 'ಬರುವುದು', word5: 'ನೋಡುವುದು' },
          tamil: { word1: 'இருக்க', word2: 'செய்ய', word3: 'செல்ல', word4: 'வா', word5: 'பார்' },
          english: { word1: 'To be', word2: 'To do', word3: 'To go', word4: 'To come', word5: 'To see' },
        },
        5: {
          hindi: { word1: 'खाना', word2: 'पीना', word3: 'सोना', word4: 'उठना', word5: 'बैठना' },
          bengali: { word1: 'খাওয়া', word2: 'পান করা', word3: 'ঘুমানো', word4: 'ওঠা', word5: 'বসা' },
          telugu: { word1: 'తినడం', word2: 'తాగడం', word3: 'నిద్రించడం', word4: 'లేవడం', word5: 'కూర్చోవడం' },
          kannada: { word1: 'ತಿನ್ನುವುದು', word2: 'ಕುಡಿಯುವುದು', word3: 'ನಿದ್ರೆ', word4: 'ಎದ್ದೇಳುವುದು', word5: 'ಕುಳಿತುಕೊಳ್ಳುವುದು' },
          tamil: { word1: 'சாப்பிட', word2: 'குடி', word3: 'தூங்க', word4: 'எழுந்திரு', word5: 'உட்கார்' },
          english: { word1: 'To eat', word2: 'To drink', word3: 'To sleep', word4: 'To wake up', word5: 'To sit' },
        },
      },
      numbers: {
        1: {
          hindi: { word1: 'एक', word2: 'दो', word3: 'तीन', word4: 'चार', word5: 'पाँच' },
          bengali: { word1: 'এক', word2: 'দুই', word3: 'তিন', word4: 'চার', word5: 'পাঁচ' },
          telugu: { word1: 'ఒకటి', word2: 'రెండు', word3: 'మూడు', word4: 'నాలుగు', word5: 'ఐదు' },
          kannada: { word1: 'ಒಂದು', word2: 'ಎರಡು', word3: 'ಮೂರು', word4: 'ನಾಲ್ಕು', word5: 'ಐದು' },
          tamil: { word1: 'ஒன்று', word2: 'இரண்டு', word3: 'மூன்று', word4: 'நான்கு', word5: 'ஐந்து' },
          english: { word1: 'One', word2: 'Two', word3: 'Three', word4: 'Four', word5: 'Five' },
        },
        2: {
          hindi: { word1: 'छह', word2: 'सात', word3: 'आठ', word4: 'नौ', word5: 'दस' },
          bengali: { word1: 'ছয়', word2: 'সাত', word3: 'আট', word4: 'নয়', word5: 'দশ' },
          telugu: { word1: 'ఆరు', word2: 'ఏడు', word3: 'ఎనిమిది', word4: 'తొమ్మిది', word5: 'పది' },
          kannada: { word1: 'ಆರು', word2: 'ಏಳು', word3: 'ಎಂಟು', word4: 'ಒಂಬತ್ತು', word5: 'ಹತ್ತು' },
          tamil: { word1: 'ஆறு', word2: 'ஏழு', word3: 'எட்டு', word4: 'ஒன்பது', word5: 'பத்து' },
          english: { word1: 'Six', word2: 'Seven', word3: 'Eight', word4: 'Nine', word5: 'Ten' },
        },
        3: {
          hindi: { word1: 'ग्यारह', word2: 'बीस', word3: 'तीस', word4: 'चालीस', word5: 'पचास' },
          bengali: { word1: 'এগারো', word2: 'বিশ', word3: 'তিরিশ', word4: 'চল্লিশ', word5: 'পঞ্চাশ' },
          telugu: { word1: 'పదకొండు', word2: 'ఇరవై', word3: 'ముప్పై', word4: 'నలభై', word5: 'యాభై' },
          kannada: { word1: 'ಹನ್ನೊಂದು', word2: 'ಇಪ್ಪತ್ತು', word3: 'ಮೂವತ್ತು', word4: 'ನಲವತ್ತು', word5: 'ಐವತ್ತು' },
          tamil: { word1: 'பதினொன்று', word2: 'இருபது', word3: 'முப்பது', word4: 'நாற்பது', word5: 'ஐம்பது' },
          english: { word1: 'Eleven', word2: 'Twenty', word3: 'Thirty', word4: 'Forty', word5: 'Fifty' },
        },
        4: {
          hindi: { word1: 'साठ', word2: 'सत्तर', word3: 'अस्सी', word4: 'नब्बे', word5: 'सौ' },
          bengali: { word1: 'ষাট', word2: 'সত্তর', word3: 'আশি', word4: 'নব্বই', word5: 'একশ' },
          telugu: { word1: 'అరవై', word2: 'డెబ్బై', word3: 'ఎనభై', word4: 'తొంభై', word5: 'వంద' },
          kannada: { word1: 'ಅರವತ್ತು', word2: 'ಎಪ್ಪತ್ತು', word3: 'ಎಂಬತ್ತು', word4: 'ತೊಂಬತ್ತು', word5: 'ನೂರು' },
          tamil: { word1: 'அறுபது', word2: 'எழுபது', word3: 'எண்பது', word4: 'தொண்ணூறு', word5: 'நூறு' },
          english: { word1: 'Sixty', word2: 'Seventy', word3: 'Eighty', word4: 'Ninety', word5: 'Hundred' },
        },
        5: {
          hindi: { word1: 'हज़ार', word2: 'लाख', word3: 'करोड़', word4: 'पहला', word5: 'दूसरा' },
          bengali: { word1: 'হাজার', word2: 'লাখ', word3: 'কোটি', word4: 'প্রথম', word5: 'দ্বিতীয়' },
          telugu: { word1: 'వెయ్యి', word2: 'లక్ష', word3: 'కోటి', word4: 'మొదటి', word5: 'రెండవ' },
          kannada: { word1: 'ಸಾವಿರ', word2: 'ಲಕ್ಷ', word3: 'ಕೋಟಿ', word4: 'ಮೊದಲನೆಯ', word5: 'ಎರಡನೆಯ' },
          tamil: { word1: 'ஆயிரம்', word2: 'லட்சம்', word3: 'கோடி', word4: 'முதல்', word5: 'இரண்டாவது' },
          english: { word1: 'Thousand', word2: 'Lakh', word3: 'Crore', word4: 'First', word5: 'Second' },
        },
      },
      family: {
        1: {
          hindi: { word1: 'पिता', word2: 'माता', word3: 'भाई', word4: 'बहन', word5: 'बेटा' },
          bengali: { word1: 'বাবা', word2: 'মা', word3: 'ভাই', word4: 'বোন', word5: 'ছেলে' },
          telugu: { word1: 'తండ్రి', word2: 'తల్లి', word3: 'సోదరుడు', word4: 'సోదరి', word5: 'కుమారుడు' },
          kannada: { word1: 'ತಂದೆ', word2: 'ತಾಯಿ', word3: 'ಸಹೋದರ', word4: 'ಸಹೋದರಿ', word5: 'ಮಗ' },
          tamil: { word1: 'தந்தை', word2: 'தாய்', word3: 'சகோதரன்', word4: 'சகோதரி', word5: 'மகன்' },
          english: { word1: 'Father', word2: 'Mother', word3: 'Brother', word4: 'Sister', word5: 'Son' },
        },
        2: {
          hindi: { word1: 'बेटी', word2: 'दादा', word3: 'दादी', word4: 'नाना', word5: 'नानी' },
          bengali: { word1: 'মেয়ে', word2: 'দাদা', word3: 'দাদি', word4: 'নানা', word5: 'নানী' },
          telugu: { word1: 'కుమార్తె', word2: 'తాత', word3: 'అమ్మమ్మ', word4: 'నాన్న', word5: 'నాన్నమ్మ' },
          kannada: { word1: 'ಮಗಳು', word2: 'ಅಜ್ಜ', word3: 'ಅಜ್ಜಿ', word4: 'ಅಜ್ಜ', word5: 'ಅಜ್ಜಿ' },
          tamil: { word1: 'மகள்', word2: 'தாத்தா', word3: 'பாட்டி', word4: 'தாத்தா', word5: 'பாட்டி' },
          english: { word1: 'Daughter', word2: 'Grandfather (paternal)', word3: 'Grandmother (paternal)', word4: 'Grandfather (maternal)', word5: 'Grandmother (maternal)' },
        },
        3: {
          hindi: { word1: 'चाचा', word2: 'चाची', word3: 'मामा', word4: 'मामी', word5: 'भतीजा' },
          bengali: { word1: 'কাকা', word2: 'কাকি', word3: 'মামা', word4: 'মামি', word5: 'ভাইপো' },
          telugu: { word1: 'పిన్ని', word2: 'పిన్ని', word3: 'మామ', word4: 'మామి', word5: 'మేనల్లుడు' },
          kannada: { word1: 'ಚಿಕ್ಕಪ್ಪ', word2: 'ಚಿಕ್ಕಮ್ಮ', word3: 'ಮಾವ', word4: 'ಮಾವಿ', word5: 'ಮೊಮ್ಮಗ' },
          tamil: { word1: 'சித்தப்பா', word2: 'சித்தி', word3: 'மாமா', word4: 'மாமி', word5: 'மருமகன்' },
          english: { word1: 'Uncle (paternal)', word2: 'Aunt (paternal)', word3: 'Uncle (maternal)', word4: 'Aunt (maternal)', word5: 'Nephew' },
        },
        4: {
          hindi: { word1: 'भतीजी', word2: 'भांजा', word3: 'भांजी', word4: 'चचेरा भाई', word5: 'चचेरी बहन' },
          bengali: { word1: 'ভাইঝি', word2: 'ভাগ্নে', word3: 'ভাগ্নি', word4: 'চাচাতো ভাই', word5: 'চাচাতো বোন' },
          telugu: { word1: 'మేనకోడలు', word2: 'మేనల్లుడు', word3: 'మేనకోడలు', word4: 'సోదరుడు', word5: 'సోదరి' },
          kannada: { word1: 'ಮೊಮ್ಮಗಳು', word2: 'ಮೊಮ್ಮಗ', word3: 'ಮೊಮ್ಮಗಳು', word4: 'ಸಹೋದರ', word5: 'ಸಹೋದರಿ' },
          tamil: { word1: 'மருமகள்', word2: 'மருமகன்', word3: 'மருமகள்', word4: 'சகோதரன்', word5: 'சகோதரி' },
          english: { word1: 'Niece', word2: 'Nephew', word3: 'Niece', word4: 'Cousin (male)', word5: 'Cousin (female)' },
        },
        5: {
          hindi: { word1: 'पति', word2: 'पत्नी', word3: 'ससुर', word4: 'सास', word5: 'साला' },
          bengali: { word1: 'স্বামী', word2: 'স্ত্রী', word3: 'শ্বশুর', word4: 'শাশুড়ি', word5: 'শালা' },
          telugu: { word1: 'భర్త', word2: 'భార్య', word3: 'మామ', word4: 'అత్త', word5: 'బావ' },
          kannada: { word1: 'ಗಂಡ', word2: 'ಹೆಂಡತಿ', word3: 'ಮಾವ', word4: 'ಅತ್ತೆ', word5: 'ಬಾವ' },
          tamil: { word1: 'கணவன்', word2: 'மனைவி', word3: 'மாமனார்', word4: 'அம்மாள்', word5: 'மைத்துனன்' },
          english: { word1: 'Husband', word2: 'Wife', word3: 'Father-in-law', word4: 'Mother-in-law', word5: 'Brother-in-law' },
        },
      },
      food: {
        1: {
          hindi: { word1: 'रोटी', word2: 'चावल', word3: 'दाल', word4: 'सब्जी', word5: 'पानी' },
          bengali: { word1: 'রুটি', word2: 'ভাত', word3: 'ডাল', word4: 'তরকারি', word5: 'পানি' },
          telugu: { word1: 'రొట్టె', word2: 'బియ్యం', word3: 'పప్పు', word4: 'కూర', word5: 'నీరు' },
          kannada: { word1: 'ರೊಟ್ಟಿ', word2: 'ಅಕ್ಕಿ', word3: 'ದಾಲ್', word4: 'ತರಕಾರಿ', word5: 'ನೀರು' },
          tamil: { word1: 'ரொட்டி', word2: 'அரிசி', word3: 'பருப்பு', word4: 'காய்கறி', word5: 'தண்ணீர்' },
          english: { word1: 'Bread', word2: 'Rice', word3: 'Lentils', word4: 'Vegetable', word5: 'Water' },
        },
        2: {
          hindi: { word1: 'दूध', word2: 'चाय', word3: 'कॉफी', word4: 'फल', word5: 'सब्जी' },
          bengali: { word1: 'দুধ', word2: 'চা', word3: 'কফি', word4: 'ফল', word5: 'সবজি' },
          telugu: { word1: 'పాలు', word2: 'టీ', word3: 'కాఫీ', word4: 'పండు', word5: 'కూరగాయలు' },
          kannada: { word1: 'ಹಾಲು', word2: 'ಚಹಾ', word3: 'ಕಾಫಿ', word4: 'ಹಣ್ಣು', word5: 'ತರಕಾರಿ' },
          tamil: { word1: 'பால்', word2: 'தேநீர்', word3: 'காபி', word4: 'பழம்', word5: 'காய்கறி' },
          english: { word1: 'Milk', word2: 'Tea', word3: 'Coffee', word4: 'Fruit', word5: 'Vegetable' },
        },
        3: {
          hindi: { word1: 'सेब', word2: 'केला', word3: 'संतरा', word4: 'आम', word5: 'अंगूर' },
          bengali: { word1: 'আপেল', word2: 'কলা', word3: 'কমলা', word4: 'আম', word5: 'আঙ্গুর' },
          telugu: { word1: 'ఆపిల్', word2: 'బాదం', word3: 'నారింజ', word4: 'మామిడి', word5: 'ద్రాక్ష' },
          kannada: { word1: 'ಸೇಬು', word2: 'ಬಾಳೆಹಣ್ಣು', word3: 'ಕಿತ್ತಳೆ', word4: 'ಮಾವು', word5: 'ದ್ರಾಕ್ಷಿ' },
          tamil: { word1: 'ஆப்பிள்', word2: 'வாழை', word3: 'ஆரஞ்சு', word4: 'மாம்பழம்', word5: 'திராட்சை' },
          english: { word1: 'Apple', word2: 'Banana', word3: 'Orange', word4: 'Mango', word5: 'Grapes' },
        },
        4: {
          hindi: { word1: 'मांस', word2: 'मछली', word3: 'अंडा', word4: 'पनीर', word5: 'मक्खन' },
          bengali: { word1: 'মাংস', word2: 'মাছ', word3: 'ডিম', word4: 'পনির', word5: 'মাখন' },
          telugu: { word1: 'మాంసం', word2: 'చేప', word3: 'గుడ్డు', word4: 'పనీర్', word5: 'వెన్న' },
          kannada: { word1: 'ಮಾಂಸ', word2: 'ಮೀನು', word3: 'ಮೊಟ್ಟೆ', word4: 'ಪನೀರ್', word5: 'ಬೆಣ್ಣೆ' },
          tamil: { word1: 'இறைச்சி', word2: 'மீன்', word3: 'முட்டை', word4: 'பனீர்', word5: 'வெண்ணெய்' },
          english: { word1: 'Meat', word2: 'Fish', word3: 'Egg', word4: 'Cheese', word5: 'Butter' },
        },
        5: {
          hindi: { word1: 'नमक', word2: 'चीनी', word3: 'तेल', word4: 'मसाला', word5: 'मिठाई' },
          bengali: { word1: 'লবণ', word2: 'চিনি', word3: 'তেল', word4: 'মসলা', word5: 'মিষ্টি' },
          telugu: { word1: 'ఉప్పు', word2: 'చక్కెర', word3: 'నూనె', word4: 'మసాలా', word5: 'మిఠాయి' },
          kannada: { word1: 'ಉಪ್ಪು', word2: 'ಸಕ್ಕರೆ', word3: 'ಎಣ್ಣೆ', word4: 'ಮಸಾಲೆ', word5: 'ಮಿಠಾಯಿ' },
          tamil: { word1: 'உப்பு', word2: 'சர்க்கரை', word3: 'எண்ணெய்', word4: 'மசாலா', word5: 'மிட்டாய்' },
          english: { word1: 'Salt', word2: 'Sugar', word3: 'Oil', word4: 'Spice', word5: 'Sweet' },
        },
      },
    };

    const skillVocab = vocabularies[skillId];
    if (!skillVocab) {
      // Fallback to basics_1 if skill not found
      return vocabularies.basics_1[1].english || vocabularies.basics_1[1].hindi;
    }

    const levelVocab = skillVocab[level] || skillVocab[1];
    
    // If requesting English, return the english key from levelVocab
    if (languageId === 'english') {
      return levelVocab.english || levelVocab.hindi;
    }
    
    // Return language-specific vocabulary
    return levelVocab[languageId] || levelVocab.hindi;
  }

  /**
   * Generate placeholder lesson for testing
   * Creates language-specific content based on languageId, skillId, and level
   * Generates comprehensive lessons with 10 exercises for all languages
   */
  generatePlaceholderLesson(languageId, skillId, level) {
    const skillNames = {
      basics_1: 'Basics 1',
      basics_2: 'Basics 2',
      numbers: 'Numbers',
      family: 'Family',
      food: 'Food & Drinks',
    };

    const skillName = skillNames[skillId] || skillId;
    const languageName = languageId.charAt(0).toUpperCase() + languageId.slice(1);

    // Get vocabulary for this skill and level
    const vocab = this.getVocabulary(languageId, skillId, level);
    const englishVocab = this.getVocabulary('english', skillId, level);

    // Create exercises based on skill type - comprehensive set of 10 exercises
    const exercises = [];

    // Exercise 1: Multiple Choice - word1
    exercises.push({
      id: 'ex1',
      type: 'multipleChoice',
      question: `How do you say "${englishVocab.word1}" in ${languageName}?`,
      questionAudio: vocab.word1,
      audioText: vocab.word1,
      options: [vocab.word1, vocab.word2, vocab.word3, vocab.word4],
      correctAnswer: vocab.word1,
      explanation: `"${vocab.word1}" means "${englishVocab.word1}" in ${languageName}.`,
    });

    // Exercise 2: Translation - word2
    exercises.push({
      id: 'ex2',
      type: 'translation',
      questionText: vocab.word2,
      questionAudio: vocab.word2,
      audioText: vocab.word2,
      wordBank: [englishVocab.word1, englishVocab.word2, englishVocab.word3, englishVocab.word4, englishVocab.word5],
      correctAnswer: englishVocab.word2,
      explanation: `"${vocab.word2}" means "${englishVocab.word2}" in ${languageName}.`,
    });

    // Exercise 3: Multiple Choice - word3 (reverse)
    exercises.push({
      id: 'ex3',
      type: 'multipleChoice',
      question: `What does "${vocab.word3}" mean?`,
      questionAudio: vocab.word3,
      audioText: vocab.word3,
      options: [englishVocab.word1, englishVocab.word2, englishVocab.word3, englishVocab.word4],
      correctAnswer: englishVocab.word3,
      explanation: `"${vocab.word3}" means "${englishVocab.word3}" in ${languageName}.`,
    });

    // Exercise 4: Listening - word4
    exercises.push({
      id: 'ex4',
      type: 'listening',
      question: 'Listen and select what you hear',
      questionAudio: vocab.word4,
      audioText: vocab.word4,
      options: [englishVocab.word1, englishVocab.word2, englishVocab.word4, englishVocab.word5],
      correctAnswer: englishVocab.word4,
      explanation: `You heard "${vocab.word4}" which means "${englishVocab.word4}" in ${languageName}.`,
    });

    // Exercise 5: Matching
    exercises.push({
      id: 'ex5',
      type: 'matching',
      question: `Match the ${languageName} words with their English translations`,
      pairs: [
        { left: vocab.word1, right: englishVocab.word1 },
        { left: vocab.word2, right: englishVocab.word2 },
        { left: vocab.word3, right: englishVocab.word3 },
        { left: vocab.word4, right: englishVocab.word4 },
      ],
      explanation: 'Match each word with its correct translation.',
    });

    // Exercise 6: Fill in the Blank - word5
    exercises.push({
      id: 'ex6',
      type: 'fillInBlank',
      question: `"${vocab.word5}" means ___ in English.`,
      options: [englishVocab.word1, englishVocab.word2, englishVocab.word3, englishVocab.word5],
      correctAnswer: englishVocab.word5,
      explanation: `"${vocab.word5}" means "${englishVocab.word5}" in ${languageName}.`,
    });

    // Exercise 7: Multiple Choice - word2
    exercises.push({
      id: 'ex7',
      type: 'multipleChoice',
      question: `How do you say "${englishVocab.word2}" in ${languageName}?`,
      questionAudio: vocab.word2,
      audioText: vocab.word2,
      options: [vocab.word1, vocab.word2, vocab.word4, vocab.word5],
      correctAnswer: vocab.word2,
      explanation: `"${vocab.word2}" means "${englishVocab.word2}" in ${languageName}.`,
    });

    // Exercise 8: Translation - word1
    exercises.push({
      id: 'ex8',
      type: 'translation',
      questionText: vocab.word1,
      questionAudio: vocab.word1,
      audioText: vocab.word1,
      wordBank: [englishVocab.word1, englishVocab.word3, englishVocab.word4, englishVocab.word5, 'Hello', 'Thank'],
      correctAnswer: englishVocab.word1,
      explanation: `"${vocab.word1}" means "${englishVocab.word1}" in ${languageName}.`,
    });

    // Exercise 9: Listening - word5
    exercises.push({
      id: 'ex9',
      type: 'listening',
      question: 'Listen and select the correct translation',
      questionAudio: vocab.word5,
      audioText: vocab.word5,
      options: [englishVocab.word2, englishVocab.word3, englishVocab.word4, englishVocab.word5],
      correctAnswer: englishVocab.word5,
      explanation: `You heard "${vocab.word5}" which means "${englishVocab.word5}" in ${languageName}.`,
    });

    // Exercise 10: Multiple Choice - word4
    exercises.push({
      id: 'ex10',
      type: 'multipleChoice',
      question: `What is the ${languageName} word for "${englishVocab.word4}"?`,
      questionAudio: vocab.word4,
      audioText: vocab.word4,
      options: [vocab.word1, vocab.word3, vocab.word4, vocab.word5],
      correctAnswer: vocab.word4,
      explanation: `"${vocab.word4}" means "${englishVocab.word4}" in ${languageName}.`,
    });

    return {
      lessonId: `${languageId}_${skillId}_l${level}`,
      skillId,
      level,
      xpReward: 10,
      exercises,
    };
  }

  /**
   * Get next lesson for a skill
   */
  getNextLesson(languageId, skillId, currentLevel) {
    const maxLevel = 5; // Each skill has 5 levels
    if (currentLevel < maxLevel) {
      return this.getLesson(languageId, skillId, currentLevel + 1);
    }
    return null; // Skill completed
  }

  /**
   * Get all lessons for a skill
   */
  getAllLessonsForSkill(languageId, skillId) {
    const lessons = [];
    for (let level = 1; level <= 5; level++) {
      lessons.push(this.getLesson(languageId, skillId, level));
    }
    return lessons;
  }

  /**
   * Generate practice lesson - shorter session (5-7 exercises) with mixed types
   * Includes previously incorrect exercises if available
   */
  generatePracticeLesson(languageId, skillId, level, incorrectExercises = []) {
    const fullLesson = this.getLesson(languageId, skillId, level);
    const allExercises = fullLesson.exercises || [];
    
    // Practice session: 5-7 exercises
    const practiceExerciseCount = Math.min(7, Math.max(5, Math.floor(allExercises.length * 0.6)));
    
    // Prioritize incorrect exercises (if available)
    let practiceExercises = [];
    if (incorrectExercises.length > 0) {
      // Include up to 3 incorrect exercises
      const incorrectCount = Math.min(3, incorrectExercises.length);
      practiceExercises = incorrectExercises.slice(0, incorrectCount);
    }
    
    // Fill remaining slots with random exercises, ensuring variety
    const remainingCount = practiceExerciseCount - practiceExercises.length;
    const availableExercises = allExercises.filter(
      ex => !practiceExercises.some(pe => pe.id === ex.id)
    );
    
    // Shuffle and select diverse exercise types
    const shuffled = [...availableExercises].sort(() => Math.random() - 0.5);
    const exerciseTypes = new Set();
    
    for (const exercise of shuffled) {
      if (practiceExercises.length >= practiceExerciseCount) break;
      // Prefer exercises of types we haven't included yet
      if (!exerciseTypes.has(exercise.type) || practiceExercises.length < remainingCount) {
        practiceExercises.push(exercise);
        exerciseTypes.add(exercise.type);
      }
    }
    
    // If still not enough, add more random exercises
    while (practiceExercises.length < practiceExerciseCount && shuffled.length > 0) {
      const next = shuffled.find(ex => !practiceExercises.some(pe => pe.id === ex.id));
      if (next) {
        practiceExercises.push(next);
      } else {
        break;
      }
    }
    
    // Shuffle final exercises for variety
    practiceExercises = practiceExercises.sort(() => Math.random() - 0.5);
    
    return {
      lessonId: `${languageId}_${skillId}_practice_${Date.now()}`,
      skillId,
      level,
      xpReward: 5, // Reduced XP for practice
      exercises: practiceExercises,
      isPractice: true,
    };
  }
}

export default new LessonService();
