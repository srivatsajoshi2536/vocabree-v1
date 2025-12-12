# Firebase Setup Guide for vocabree

This guide will walk you through setting up Firebase for your Expo React Native app.

## Prerequisites
- A Google account
- Firebase CLI (optional, for advanced features)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name: `vocabree` (or your preferred name)
4. Choose whether to enable Google Analytics (optional)
5. Click **"Create project"** and wait for it to initialize

## Step 2: Add Your App to Firebase

### For Web App (Required for Expo)

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register your app with:
   - **App nickname**: `vocabree Web`
   - **Firebase Hosting**: You can skip this for now
3. Click **"Register app"**
4. **Copy the Firebase configuration object** - you'll need this in Step 4

The config will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### For Android (Optional - if you plan to build native Android)

1. Click the **Android icon**
2. Enter your Android package name (check `app.json` for `android.package`)
3. Download `google-services.json` (you'll need this if you eject from Expo)

### For iOS (Optional - if you plan to build native iOS)

1. Click the **iOS icon**
2. Enter your iOS bundle ID (check `app.json` for `ios.bundleIdentifier`)
3. Download `GoogleService-Info.plist` (you'll need this if you eject from Expo)

## Step 3: Enable Firebase Services

### Enable Authentication

1. In Firebase Console, go to **Authentication** in the left sidebar
2. Click **"Get started"** if you haven't enabled it yet
3. Go to the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** and click **"Save"**
6. (Optional) Enable other sign-in methods like Google, Apple, etc.

### Enable Firestore Database

1. Go to **Firestore Database** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development) or **"Start in production mode"** (for production)
   - **Test mode**: Allows read/write for 30 days (good for development)
   - **Production mode**: Requires security rules (better for production)
4. Choose a location closest to your users
5. Click **"Enable"**

### Enable Storage (Optional - if you need file uploads)

1. Go to **Storage** in the left sidebar
2. Click **"Get started"**
3. Choose **"Start in test mode"** or **"Start in production mode"**
4. Choose a location
5. Click **"Done"**

## Step 4: Update Your Firebase Configuration

1. Open `/src/services/firebase.js`
2. Replace the placeholder values in `firebaseConfig` with your actual Firebase config values from Step 2

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",  // Replace YOUR_API_KEY
  authDomain: "vocabree-12345.firebaseapp.com",  // Replace YOUR_AUTH_DOMAIN
  projectId: "vocabree-12345",  // Replace YOUR_PROJECT_ID
  storageBucket: "vocabree-12345.appspot.com",  // Replace YOUR_STORAGE_BUCKET
  messagingSenderId: "123456789012",  // Replace YOUR_MESSAGING_SENDER_ID
  appId: "1:123456789012:web:abcdef123456"  // Replace YOUR_APP_ID
};
```

## Step 5: Test Your Firebase Connection

Create a simple test to verify Firebase is working:

```javascript
// In any component or service file
import { auth, db } from './services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Test authentication
const testAuth = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'test@example.com', 
      'testpassword123'
    );
    console.log('Firebase Auth working!', userCredential.user);
  } catch (error) {
    console.error('Firebase Auth error:', error);
  }
};
```

## Step 6: Set Up Security Rules (Important!)

### Firestore Security Rules

Go to **Firestore Database > Rules** and set up appropriate rules:

**For Development (Test Mode):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 31);
    }
  }
}
```

**For Production (Recommended):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add more specific rules for your collections
    match /progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Security Rules

Go to **Storage > Rules** and set up appropriate rules:

**For Development:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 31);
    }
  }
}
```

**For Production:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 7: Environment Variables (Recommended for Production)

For better security, consider using environment variables:

1. Install `expo-constants` if not already installed:
   ```bash
   npx expo install expo-constants
   ```

2. Create a `.env` file (and add it to `.gitignore`):
   ```
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

3. Update `firebase.js` to use environment variables:
   ```javascript
   import Constants from 'expo-constants';
   
   const firebaseConfig = {
     apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
     authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
     // ... etc
   };
   ```

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/network-request-failed)"**
   - Check your internet connection
   - Verify Firebase config values are correct

2. **"Firebase: Error (auth/invalid-api-key)"**
   - Double-check your API key in `firebase.js`
   - Make sure you copied the web app config, not Android/iOS

3. **"Firestore permission denied"**
   - Check your Firestore security rules
   - Make sure you're authenticated if rules require it

4. **"Storage permission denied"**
   - Check your Storage security rules
   - Verify authentication status

## Next Steps

After setting up Firebase:

1. ✅ Test authentication (sign up, login, logout)
2. ✅ Test Firestore (read/write data)
3. ✅ Test Storage (if using file uploads)
4. ✅ Set up proper security rules for production
5. ✅ Consider setting up Firebase Analytics
6. ✅ Set up Firebase Crashlytics for error tracking

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase React Native Guide](https://firebase.google.com/docs/react-native/get-started)
- [Expo Firebase Guide](https://docs.expo.dev/guides/using-firebase/)
- [Firebase Console](https://console.firebase.google.com/)

## Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Review Firebase documentation
3. Check Expo documentation for Firebase integration
4. Verify all config values are correct

