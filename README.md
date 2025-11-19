# vocabree - Indian Language Learning App

A mobile language learning application similar to Duolingo, focused on Indian languages (Hindi, Bengali, Telugu, Kannada, Tamil).

## 🚀 Features

- **5 Indian Languages**: Learn Hindi, Bengali, Telugu, Kannada, and Tamil
- **Gamified Learning**: Earn XP, maintain streaks, unlock achievements
- **Multiple Exercise Types**: Translation, Multiple Choice, Listening, Speaking, Matching, Fill in the Blanks
- **Offline Support**: Download lessons and practice anywhere
- **Progress Tracking**: Track your learning progress across all languages
- **Beautiful UI**: Modern, colorful interface with smooth animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Firebase account (free tier)
- iOS Simulator (for Mac) or Android Emulator

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd vocabree
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config
   - Update `src/services/firebase.js` with your Firebase configuration:
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

4. **Set up Firestore Security Rules**
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

## 🏃 Running the App

### Development Mode

```bash
npm start
```

Then:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your phone

### Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build
eas build --platform android
eas build --platform ios
```

## 📁 Project Structure

```
vocabree/
├── src/
│   ├── assets/          # Images, audio, animations, lesson data
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Button, Card, ProgressBar, etc.
│   │   ├── lesson/      # Lesson-specific components
│   │   └── home/        # Home screen components
│   ├── screens/          # Screen components
│   │   ├── auth/        # Login, Signup, Onboarding
│   │   ├── home/        # Home screen
│   │   ├── lesson/      # Lesson and completion screens
│   │   ├── practice/    # Practice mode
│   │   └── profile/     # Profile and settings
│   ├── navigation/      # Navigation configuration
│   ├── services/        # Firebase, audio, etc.
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions, validators
│   └── theme/           # Colors, typography
├── App.js               # Main app entry point
└── package.json
```

## 🎨 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation 7.x
- **State Management**: React Context API
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Local Storage**: AsyncStorage, SecureStore
- **Audio**: Expo AV, Expo Speech
- **Animations**: React Native Reanimated, Lottie

## 📝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow the existing folder structure
- Add comments for complex logic
- Use constants for magic numbers
- Handle errors gracefully

### Adding New Features
1. Create components in appropriate folders
2. Add screens to navigation
3. Update context if needed
4. Test on both iOS and Android

### Adding Lesson Content
1. Create skill JSON in `src/assets/data/{language}/skills.json`
2. Create lesson JSON in `src/assets/data/{language}/lessons/`
3. Follow the existing lesson structure
4. Include audio file references

## 🐛 Troubleshooting

### Firebase Errors
- Check Firebase config is correct
- Verify Firestore security rules
- Ensure Authentication is enabled

### Navigation Issues
- Check screen names match navigator
- Verify navigation prop is passed correctly

### Audio Not Playing
- Check file paths are correct
- Ensure audio files exist in assets
- Verify Audio.setAudioModeAsync is called

## 📄 License

This project is for educational purposes (Final Year Project).

## 👥 Contributors

- SRIVATSA JOSHI
- V AISHWARYA

## 🙏 Acknowledgments

- Inspired by Duolingo
- Built with React Native and Expo
- Uses Firebase for backend services

---

**Note**: This is a work in progress. Many features are still being implemented.

