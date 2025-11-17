# vocabree - Complete Documentation

## 📱 App Overview

**vocabree** is a gamified mobile language learning application inspired by Duolingo, specifically designed for learning Indian languages. The app provides an engaging, interactive experience for users to learn Hindi, Bengali, Telugu, Kannada, and Tamil through structured lessons, exercises, and progress tracking.

### Key Highlights
- **5 Indian Languages**: Hindi, Bengali, Telugu, Kannada, Tamil
- **Gamified Learning**: Earn Aura (XP), maintain streaks, unlock achievements
- **Multiple Exercise Types**: Translation, Multiple Choice, Listening, Matching, Fill in the Blanks
- **Progress Tracking**: Track learning progress across all languages
- **Offline Support**: Download lessons and practice anywhere
- **Beautiful UI**: Modern, colorful interface with smooth animations
- **Preview Mode**: Test the app without Firebase setup

---

## 🎯 Core Features

### 1. **Multi-Language Support**
- Learn 5 Indian languages: Hindi, Bengali, Telugu, Kannada, Tamil
- Switch between languages seamlessly
- Language-specific vocabulary and audio

### 2. **Gamification System**
- **Aura (XP)**: Earn points by completing lessons
  - Lesson Complete: 10 Aura
  - Perfect Lesson Bonus: 5 Aura
  - Practice Mode: 5 Aura
  - Daily Goal Bonus: 10 Aura
- **Streaks**: Maintain daily learning streaks
- **Levels**: Progress through levels based on total Aura
- **Achievements**: Unlock achievements for milestones
- **Hearts System**: 3 hearts per lesson (lose one for wrong answers)

### 3. **Exercise Types**
- **Multiple Choice**: Choose the correct translation
- **Translation**: Match words/phrases to their translations
- **Listening**: Listen to audio and select the correct answer
- **Matching**: Match pairs of words
- **Fill in the Blank**: Complete sentences with correct words

### 4. **Skill Tree System**
- Organized learning path with skills (Basics 1, Basics 2, Numbers, Family, Food, etc.)
- Each skill has 5 levels
- Skills unlock progressively based on completion
- Visual skill tree showing progress with crowns

### 5. **Progress Tracking**
- Track progress per language
- Skill-level completion tracking
- Vocabulary mastery tracking
- Daily activity tracking
- Streak maintenance

### 6. **Practice Mode**
- Practice previously learned content
- Review mistakes from previous lessons
- Shorter practice sessions (5-7 exercises)
- Focus on areas needing improvement

### 7. **User Profile**
- Display name and avatar
- Total Aura across all languages
- Current and longest streak
- Achievement badges
- Settings (sound, notifications, etc.)

### 8. **Authentication**
- Email/Password authentication via Firebase
- User registration and login
- Password reset functionality
- Secure session management

---

## 🏗️ Architecture

### Tech Stack

#### Frontend Framework
- **React Native**: 0.81.5
- **Expo SDK**: ~54.0.23
- **React**: 19.1.0

#### Navigation
- **React Navigation**: 7.x
  - `@react-navigation/native`: ^7.1.20
  - `@react-navigation/native-stack`: ^7.6.3
  - `@react-navigation/bottom-tabs`: ^7.8.5

#### State Management
- **React Context API**: For global state
  - `AuthContext`: User authentication and profile
  - `LanguageContext`: Selected language
  - `ProgressContext`: Learning progress and Aura

#### Backend Services
- **Firebase**: 
  - Authentication (Email/Password)
  - Firestore Database (user profiles, progress)
  - Storage (optional, for future file uploads)

#### Local Storage
- **AsyncStorage**: For caching progress and user data
- **SecureStore**: For secure credential storage

#### Audio
- **expo-av**: ~16.0.7 (Audio playback)
- **expo-speech**: ~14.0.7 (Text-to-speech)

#### UI & Animations
- **React Native Reanimated**: ~4.1.1
- **Lottie React Native**: ~7.3.1 (Animations)
- **React Native SVG**: 15.12.1
- **@expo/vector-icons**: ^15.0.3

#### Utilities
- **date-fns**: ^4.1.0 (Date manipulation)
- **react-native-chart-kit**: ^6.12.0 (Charts for progress)
- **react-native-circular-progress**: ^1.4.1

---

## 📁 Project Structure

```
vocabree/
├── App.js                          # Main app entry point
├── index.js                         # Expo entry point
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── babel.config.js                  # Babel configuration
├── metro.config.js                  # Metro bundler config
├── eas.json                         # EAS Build configuration
│
├── assets/                          # Static assets
│   └── icon.png                     # App icon
│
├── src/
│   ├── assets/                      # App assets
│   │   ├── animations/              # Lottie animation files
│   │   ├── audio/                   # Audio files
│   │   │   ├── hindi/               # Hindi audio files
│   │   │   ├── bengali/             # Bengali audio files
│   │   │   ├── telugu/              # Telugu audio files
│   │   │   ├── kannada/             # Kannada audio files
│   │   │   ├── tamil/               # Tamil audio files
│   │   │   └── README.md            # Audio setup guide
│   │   ├── data/                    # Lesson data (JSON)
│   │   │   ├── hindi/
│   │   │   │   ├── skills.json      # Skill definitions
│   │   │   │   └── lessons/         # Lesson JSON files
│   │   │   ├── bengali/
│   │   │   ├── telugu/
│   │   │   ├── kannada/
│   │   │   └── tamil/
│   │   └── images/                  # Image assets
│   │
│   ├── components/                  # Reusable components
│   │   ├── common/                  # Common UI components
│   │   │   ├── Button.js            # Custom button component
│   │   │   ├── Card.js              # Card container
│   │   │   ├── LoadingSpinner.js    # Loading indicator
│   │   │   └── ProgressBar.js       # Progress bar
│   │   ├── home/                    # Home screen components
│   │   │   ├── SkillItem.js         # Skill card/item
│   │   │   ├── SkillTree.js         # Skill tree visualization
│   │   │   └── StreakDisplay.js     # Streak indicator
│   │   ├── lesson/                  # Lesson-specific components
│   │   │   ├── FillInBlankRenderer.js
│   │   │   ├── HeartIndicator.js   # Hearts display
│   │   │   ├── ListeningRenderer.js
│   │   │   ├── MatchingRenderer.js
│   │   │   ├── MultipleChoiceRenderer.js
│   │   │   └── TranslationRenderer.js
│   │   └── profile/                 # Profile components
│   │
│   ├── context/                     # React Context providers
│   │   ├── AuthContext.js           # Authentication state
│   │   ├── LanguageContext.js       # Selected language
│   │   └── ProgressContext.js       # Learning progress
│   │
│   ├── hooks/                       # Custom React hooks
│   │
│   ├── navigation/                  # Navigation configuration
│   │   ├── AppNavigator.js          # Main app navigator
│   │   └── AuthNavigator.js         # Auth flow navigator
│   │
│   ├── screens/                     # Screen components
│   │   ├── auth/                    # Authentication screens
│   │   │   ├── LoginScreen.js
│   │   │   ├── OnboardingScreen.js
│   │   │   └── SignupScreen.js
│   │   ├── home/                    # Home screen
│   │   │   └── HomeScreen.js
│   │   ├── lesson/                  # Lesson screens
│   │   │   ├── LessonScreen.js
│   │   │   ├── LessonCompleteScreen.js
│   │   │   └── ReviewMistakesScreen.js
│   │   ├── practice/                # Practice mode
│   │   │   └── PracticeScreen.js
│   │   └── profile/                 # Profile screens
│   │       ├── ProfileScreen.js
│   │       └── SettingsScreen.js
│   │
│   ├── services/                    # Business logic services
│   │   ├── achievementService.js   # Achievement logic
│   │   ├── audioService.js          # Audio playback service
│   │   ├── firebase.js              # Firebase configuration
│   │   ├── lessonService.js         # Lesson data management
│   │   └── previewService.js        # Preview mode service
│   │
│   ├── theme/                       # Theme configuration
│   │   ├── colors.js                # Color palette
│   │   └── typography.js            # Typography styles
│   │
│   └── utils/                       # Utility functions
│       ├── constants.js             # App constants
│       ├── helpers.js               # Helper functions
│       └── validators.js            # Input validation
│
└── Documentation files:
    ├── README.md                    # Basic setup guide
    ├── DOCUMENTATION.md             # This file (complete documentation)
    ├── FIREBASE_SETUP.md            # Firebase setup guide
    ├── FIRESTORE_RULES_SETUP.md     # Firestore security rules
    ├── AUDIO_IMPLEMENTATION.md      # Audio setup guide
    ├── EAS_BUILD_GUIDE.md           # EAS build instructions
    ├── BUILD_COMMANDS.md            # Build commands reference
    ├── PREVIEW_MODE.md              # Preview mode documentation
    └── IMPLEMENTATION_COMPLETE.md   # Implementation status
```

---

## 🚀 Setup Instructions

### Prerequisites

1. **Node.js**: v16 or higher
2. **npm** or **yarn**: Package manager
3. **Expo CLI**: `npm install -g expo-cli`
4. **Firebase Account**: Free tier account
5. **Development Environment**:
   - iOS: Xcode (Mac only) or Expo Go app
   - Android: Android Studio or Expo Go app

### Installation Steps

#### 1. Clone and Install Dependencies

```bash
cd "language app/vocabree"
npm install
```

#### 2. Firebase Setup

Follow the detailed guide in `FIREBASE_SETUP.md`:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Copy Firebase configuration
5. Update `src/services/firebase.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

6. Set up Firestore security rules (see `FIRESTORE_RULES_SETUP.md`)

#### 3. Run the App

**Development Mode:**
```bash
npm start
```

Then:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your phone

**Preview Mode (No Firebase Required):**
The app supports a preview mode that works without Firebase. See `PREVIEW_MODE.md` for details.

---

## 🔑 Key Components

### Context Providers

#### AuthContext (`src/context/AuthContext.js`)
Manages user authentication and profile data.

**Functions:**
- `signup(email, password, displayName)`: Create new account
- `login(email, password)`: Sign in
- `logout()`: Sign out
- `resetPassword(email)`: Send password reset email
- `updateUserProfile(updates)`: Update user profile

**State:**
- `user`: Firebase user object
- `userProfile`: User profile from Firestore
- `loading`: Loading state
- `error`: Error message
- `isPreviewMode`: Whether preview mode is active

#### LanguageContext (`src/context/LanguageContext.js`)
Manages the currently selected language.

**Functions:**
- `selectLanguage(languageId)`: Change selected language

**State:**
- `selectedLanguage`: Current language ID ('hindi', 'bengali', etc.)

#### ProgressContext (`src/context/ProgressContext.js`)
Manages learning progress, Aura, and streaks.

**Functions:**
- `loadProgress(languageId)`: Load progress for a language
- `awardAura(languageId, aura, bonusAura)`: Award Aura points
- `updateSkillProgress(languageId, skillId, level, lessonId)`: Update skill progress
- `updateStreak(languageId)`: Update daily streak
- `getProgress(languageId)`: Get progress for a language
- `getTotalAura()`: Get total Aura across all languages
- `isSkillUnlocked(languageId, skillId, requiredSkills)`: Check if skill is unlocked

**State:**
- `progress`: Object mapping languageId to progress data
- `loading`: Loading state

### Services

#### Firebase Service (`src/services/firebase.js`)
Firebase configuration and initialization.

**Exports:**
- `auth`: Firebase Auth instance
- `db`: Firestore database instance
- `app`: Firebase app instance

#### Lesson Service (`src/services/lessonService.js`)
Manages lesson data and generation.

**Functions:**
- `getLesson(languageId, skillId, level)`: Get lesson data
- `getVocabulary(languageId, skillId, level)`: Get vocabulary for skill/level
- `generatePlaceholderLesson(languageId, skillId, level)`: Generate placeholder lesson
- `getNextLesson(languageId, skillId, currentLevel)`: Get next lesson
- `generatePracticeLesson(languageId, skillId, level, incorrectExercises)`: Generate practice session

#### Audio Service (`src/services/audioService.js`)
Handles audio playback for lessons.

**Functions:**
- `initialize()`: Initialize audio service
- `playAudio(audioPath)`: Play audio file
- `playTextToSpeech(text, language)`: Text-to-speech
- `playSuccessSound()`: Play success feedback
- `playErrorSound()`: Play error feedback
- `stopAll()`: Stop all audio

#### Preview Service (`src/services/previewService.js`)
Enables preview mode without Firebase.

**Functions:**
- `checkPreviewMode()`: Check if preview mode is active
- `getMockUser()`: Get mock user object
- `getMockUserProfile()`: Get mock user profile
- `getMockProgress(languageId)`: Get mock progress
- `awardAura(languageId, aura, bonusAura)`: Award Aura in preview mode
- `updateSkillProgress(languageId, skillId, level, lessonId)`: Update skill in preview mode

### Navigation

#### AppNavigator (`src/navigation/AppNavigator.js`)
Main navigation structure for authenticated users.

**Tab Navigator:**
- `Home`: Home screen with skill tree
- `Practice`: Practice mode screen
- `Profile`: User profile screen

**Stack Navigator:**
- `MainTabs`: Tab navigator
- `Lesson`: Lesson screen (modal)
- `LessonComplete`: Lesson completion screen (modal)
- `ReviewMistakes`: Review mistakes screen (modal)
- `Settings`: Settings screen (modal)

#### AuthNavigator (`src/navigation/AuthNavigator.js`)
Navigation for authentication flow.

**Screens:**
- `Onboarding`: First-time user onboarding
- `Login`: Login screen
- `Signup`: Sign up screen

---

## 📊 Data Models

### User Profile (Firestore: `users/{userId}`)

```javascript
{
  email: string,
  displayName: string,
  createdAt: Timestamp,
  currentStreak: number,
  longestStreak: number,
  totalAura: number,
  dailyAuraGoal: number,
  languages: string[],
  achievements: string[],
  settings: {
    soundEnabled: boolean,
    speakingEnabled: boolean,
    notificationsEnabled: boolean,
    notificationTime: string
  },
  updatedAt: Timestamp
}
```

### Progress (Firestore: `progress/{userId}_{languageId}`)

```javascript
{
  userId: string,
  languageId: string,
  level: number,
  totalAura: number,
  currentStreak: number,
  longestStreak: number,
  skills: {
    [skillId]: {
      level: number,
      completedLessons: string[],
      lastPracticed: Timestamp
    }
  },
  vocabulary: string[],
  lastActiveDate: Timestamp
}
```

### Lesson Data Structure

```javascript
{
  lessonId: string,
  skillId: string,
  level: number,
  auraReward: number,
  exercises: [
    {
      id: string,
      type: 'multipleChoice' | 'translation' | 'listening' | 'matching' | 'fillInBlank',
      question: string,
      questionAudio?: string,
      audioText?: string,
      options?: string[],
      correctAnswer: string,
      explanation: string,
      // Type-specific fields:
      questionText?: string,      // translation
      wordBank?: string[],        // translation
      pairs?: Array<{left: string, right: string}>, // matching
    }
  ]
}
```

### Skill Definition (`src/assets/data/{language}/skills.json`)

```javascript
{
  "basics_1": {
    "id": "basics_1",
    "name": "Basics 1",
    "description": "Learn basic greetings and phrases",
    "icon": "hand-wave",
    "color": "#FF6B6B",
    "requiredSkills": [],
    "levels": 5
  }
}
```

---

## 🎨 Theme System

### Colors (`src/theme/colors.js`)

```javascript
export const COLORS = {
  // Primary colors
  primary: '#4ECDC4',
  secondary: '#45B7D1',
  success: '#95E1D3',
  warning: '#F38181',
  error: '#FF6B6B',
  
  // Language-specific colors
  hindi: '#FF6B6B',
  bengali: '#4ECDC4',
  telugu: '#95E1D3',
  kannada: '#F38181',
  tamil: '#AA96DA',
  
  // UI colors
  background: '#F5F5F5',
  white: '#FFFFFF',
  textPrimary: '#2C3E50',
  textSecondary: '#7F8C8D',
  border: '#E0E0E0',
  xpGold: '#FFD700'
};
```

### Typography (`src/theme/typography.js`)

```javascript
export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: '600' },
  h4: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  bodySmall: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' }
};
```

---

## 🔧 Development Guidelines

### Code Style

1. **Use Functional Components**: All components use React hooks
2. **Follow Folder Structure**: Place files in appropriate directories
3. **Add Comments**: Document complex logic
4. **Use Constants**: Avoid magic numbers/strings (use `constants.js`)
5. **Error Handling**: Always handle errors gracefully
6. **Type Safety**: Use PropTypes or TypeScript (if migrated)

### Adding New Features

1. **Create Components**: Add reusable components in `src/components/`
2. **Add Screens**: Create screens in `src/screens/`
3. **Update Navigation**: Add routes in `AppNavigator.js` or `AuthNavigator.js`
4. **Update Context**: Modify context providers if needed
5. **Test**: Test on both iOS and Android

### Adding Lesson Content

1. **Create Skill Definition**: Add to `src/assets/data/{language}/skills.json`
2. **Create Lesson JSON**: Add lesson file in `src/assets/data/{language}/lessons/`
3. **Add Audio Files**: Place audio files in `src/assets/audio/{language}/`
4. **Update Lesson Service**: Ensure `lessonService.js` can load the lesson
5. **Test**: Verify lesson loads and exercises work correctly

### Exercise Type Guidelines

When creating exercises, ensure:
- Each exercise has a unique `id`
- `type` matches one of the supported types
- `correctAnswer` is provided
- `explanation` helps users learn
- Audio files are referenced correctly (if using audio)

---

## 🚢 Deployment

### Building for Production

#### Using EAS Build (Recommended)

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure Build**:
   - Edit `eas.json` for build profiles
   - Update `app.json` with app identifiers

4. **Build**:
   ```bash
   # Android
   eas build --platform android
   
   # iOS
   eas build --platform ios
   
   # Both
   eas build --platform all
   ```

5. **Submit to Stores**:
   ```bash
   eas submit --platform android
   eas submit --platform ios
   ```

See `EAS_BUILD_GUIDE.md` for detailed instructions.

#### Manual Build (Expo)

```bash
# Android APK
expo build:android

# iOS (requires Mac and Apple Developer account)
expo build:ios
```

### Pre-Deployment Checklist

- [ ] Update `app.json` with correct app identifiers
- [ ] Configure Firebase for production
- [ ] Set up Firestore security rules for production
- [ ] Test on physical devices
- [ ] Update version number in `app.json` and `package.json`
- [ ] Test all features (auth, lessons, progress, etc.)
- [ ] Verify audio files are included
- [ ] Check app icon and splash screen
- [ ] Review and update privacy policy/terms (if required)

---

## 🐛 Troubleshooting

### Common Issues

#### Firebase Errors

**Problem**: "Firebase: Error (auth/network-request-failed)"
- **Solution**: Check internet connection, verify Firebase config values

**Problem**: "Firebase: Error (auth/invalid-api-key)"
- **Solution**: Double-check API key in `firebase.js`, ensure web app config is used

**Problem**: "Firestore permission denied"
- **Solution**: Check Firestore security rules, ensure user is authenticated

#### Navigation Issues

**Problem**: Screen not found
- **Solution**: Verify screen name matches navigator, check navigation prop is passed

**Problem**: Navigation not working
- **Solution**: Ensure `NavigationContainer` wraps navigators, check screen options

#### Audio Issues

**Problem**: Audio not playing
- **Solution**: 
  - Check file paths are correct
  - Ensure audio files exist in assets
  - Verify `Audio.setAudioModeAsync` is called
  - Check device volume and permissions

**Problem**: Text-to-speech not working
- **Solution**: Check language code is correct, verify `expo-speech` is installed

#### Build Issues

**Problem**: Build fails
- **Solution**: 
  - Check `eas.json` configuration
  - Verify all dependencies are installed
  - Check for syntax errors
  - Review build logs

**Problem**: App crashes on launch
- **Solution**: 
  - Check Firebase config is set
  - Verify all required permissions
  - Review error logs
  - Test in development mode first

### Debugging Tips

1. **Use React Native Debugger**: For debugging React Native code
2. **Check Console Logs**: Use `console.log()` for debugging
3. **Firebase Console**: Check Firebase Console for backend errors
4. **Expo DevTools**: Use Expo DevTools for development
5. **Test on Physical Devices**: Some issues only appear on real devices

---

## 📚 Additional Resources

### Documentation Files

- `README.md`: Basic setup and overview
- `FIREBASE_SETUP.md`: Detailed Firebase setup guide
- `FIRESTORE_RULES_SETUP.md`: Firestore security rules
- `AUDIO_IMPLEMENTATION.md`: Audio setup and implementation
- `EAS_BUILD_GUIDE.md`: EAS Build instructions
- `BUILD_COMMANDS.md`: Build commands reference
- `PREVIEW_MODE.md`: Preview mode documentation
- `IMPLEMENTATION_COMPLETE.md`: Implementation status

### External Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

---

## 🔐 Security Considerations

### Firebase Security Rules

Ensure Firestore security rules are properly configured:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /progress/{progressId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### Best Practices

1. **Never commit Firebase config with real keys** to public repositories
2. **Use environment variables** for sensitive data in production
3. **Validate user input** on both client and server
4. **Implement rate limiting** for authentication endpoints
5. **Use secure storage** for sensitive data (SecureStore)
6. **Keep dependencies updated** to patch security vulnerabilities

---

## 🎯 Future Enhancements

### Planned Features

- [ ] Speaking exercises with voice recognition
- [ ] Social features (leaderboards, friends)
- [ ] Offline lesson downloads
- [ ] Advanced analytics and insights
- [ ] Custom learning paths
- [ ] More languages
- [ ] Community-created content
- [ ] Push notifications for daily reminders
- [ ] Dark mode support
- [ ] Accessibility improvements

### Technical Improvements

- [ ] Migrate to TypeScript
- [ ] Add unit and integration tests
- [ ] Implement code splitting
- [ ] Optimize bundle size
- [ ] Add error tracking (Sentry)
- [ ] Implement analytics (Firebase Analytics)
- [ ] Add performance monitoring

---

## 📄 License

This project is for educational purposes (Final Year Project).

---

## 👥 Support

For issues or questions:
1. Check this documentation
2. Review other documentation files
3. Check Firebase Console for backend issues
4. Review Expo documentation
5. Check React Native documentation

---

## 📝 Changelog

### Version 1.0.0
- Initial release
- 5 Indian languages support
- Gamification system (Aura, streaks, levels)
- Multiple exercise types
- Firebase authentication and Firestore
- Progress tracking
- Practice mode
- Preview mode support

---

**Last Updated**: 2024
**App Name**: vocabree
**Version**: 1.0.0

