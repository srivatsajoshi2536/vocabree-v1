# Google Sign-In Setup Guide for Expo + Firebase

This guide will help you set up Google Sign-In authentication for your Vocabree app using Expo and Firebase.

## Prerequisites

- Firebase project already created (bashalearn)
- Expo account
- Google Cloud Console access

## Step 1: Get Your OAuth 2.0 Client IDs from Firebase

### 1.1 Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **bashalearn**
3. Go to **Authentication** → **Sign-in method**
4. Click on **Google** provider
5. Enable it if not already enabled
6. You'll see a **Web SDK configuration** section

### 1.2 Get Web Client ID
1. In the Google provider settings, you'll see **Web client ID**
2. Copy this ID - it looks like: `438861089388-xxxxxxxxxxxxx.apps.googleusercontent.com`
3. This is your **webClientId**

## Step 2: Set Up Google Cloud Console OAuth Credentials

### 2.1 Access Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (it should be the same project)
3. Go to **APIs & Services** → **Credentials**

### 2.2 Create OAuth 2.0 Client IDs

You need to create **3 separate OAuth client IDs**:

#### A. Android Client ID

1. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **Android**
3. Name: `Vocabree Android`
4. Package name: Get this from your `app.json` - it's usually `com.yourcompany.vocabree`
   - To find it, check: `/home/joshi/Desktop/work/vocabree_v1-main/app.json`
5. SHA-1 certificate fingerprint:
   ```bash
   # For development, get your debug keystore SHA-1:
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
   Copy the SHA-1 fingerprint
6. Click **CREATE**
7. Copy the **Client ID** - this is your **androidClientId**

#### B. iOS Client ID

1. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **iOS**
3. Name: `Vocabree iOS`
4. Bundle ID: Get this from your `app.json` - same as package name
5. Click **CREATE**
6. Copy the **Client ID** - this is your **iosClientId**

#### C. Web Client ID (Already exists from Firebase)

You already have this from Step 1.2

## Step 3: Configure Expo App

### 3.1 Update app.json

Add the following to your `app.json`:

```json
{
  "expo": {
    "scheme": "vocabree",
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist",
      "bundleIdentifier": "com.yourcompany.vocabree"
    }
  }
}
```

### 3.2 Download Google Services Files

#### For Android:
1. Go to Firebase Console → Project Settings
2. Under "Your apps", find your Android app
3. Download `google-services.json`
4. Place it in the root of your project: `/home/joshi/Desktop/work/vocabree_v1-main/google-services.json`

#### For iOS:
1. Go to Firebase Console → Project Settings
2. Under "Your apps", find your iOS app
3. Download `GoogleService-Info.plist`
4. Place it in the root of your project

## Step 4: Update Your Code with Client IDs

### 4.1 Update LoginScreen.js

Replace the placeholder client IDs in `/home/joshi/Desktop/work/vocabree_v1-main/src/screens/auth/LoginScreen.js`:

```javascript
const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: 'YOUR_ANDROID_CLIENT_ID_FROM_STEP_2A.apps.googleusercontent.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID_FROM_STEP_2B.apps.googleusercontent.com',
  webClientId: 'YOUR_WEB_CLIENT_ID_FROM_STEP_1.apps.googleusercontent.com',
});
```

### 4.2 Update SignupScreen.js

Do the same for `/home/joshi/Desktop/work/vocabree_v1-main/src/screens/auth/SignupScreen.js`

## Step 5: Add Authorized Redirect URIs

### 5.1 For Expo Go (Development)

1. Go back to Google Cloud Console → Credentials
2. Click on your **Web client ID**
3. Under **Authorized redirect URIs**, add:
   ```
   https://auth.expo.io/@YOUR_EXPO_USERNAME/vocabree
   ```
   Replace `YOUR_EXPO_USERNAME` with your actual Expo username

### 5.2 Get Your Expo Username

Run this command to find your Expo username:
```bash
npx expo whoami
```

## Step 6: Test the Implementation

### 6.1 Restart Expo
```bash
# Stop the current server (Ctrl+C)
npm start
```

### 6.2 Test on Device
1. Open Expo Go app on your phone
2. Scan the QR code
3. Navigate to Login screen
4. Click "Continue with Google"
5. You should see the Google account picker

## Troubleshooting

### Error: "400: redirect_uri_mismatch"
- Make sure you added the correct redirect URI in Step 5
- The URI should match: `https://auth.expo.io/@YOUR_EXPO_USERNAME/vocabree`

### Error: "Developer Error"
- Check that your client IDs are correct
- Verify SHA-1 fingerprint for Android

### Error: "API not enabled"
- Go to Google Cloud Console → APIs & Services → Library
- Search for "Google+ API" and enable it

## Quick Reference: File Locations

- **LoginScreen**: `/home/joshi/Desktop/work/vocabree_v1-main/src/screens/auth/LoginScreen.js`
- **SignupScreen**: `/home/joshi/Desktop/work/vocabree_v1-main/src/screens/auth/SignupScreen.js`
- **AuthContext**: `/home/joshi/Desktop/work/vocabree_v1-main/src/context/AuthContext.js`
- **app.json**: `/home/joshi/Desktop/work/vocabree_v1-main/app.json`

## Next Steps After Setup

Once you have all the client IDs:

1. Update both LoginScreen.js and SignupScreen.js with the real client IDs
2. Add the redirect URI to Google Cloud Console
3. Restart your Expo server
4. Test the Google Sign-In flow

## Important Notes

- **For Production**: You'll need to create a standalone build (not Expo Go)
- **Expo Go Limitations**: Some features may not work perfectly in Expo Go
- **Alternative**: Consider using `expo-google-sign-in` or building with EAS Build for better production support

## Support

If you encounter issues:
1. Check Firebase Console logs
2. Check Expo logs in terminal
3. Verify all client IDs are correct
4. Ensure redirect URIs are properly configured
