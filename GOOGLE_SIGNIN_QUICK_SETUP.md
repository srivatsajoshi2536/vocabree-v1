# Quick Google Sign-In Configuration

## Your Project Information

- **Package Name (Android)**: `com.srivatsajoshi2005.vocabree`
- **Bundle ID (iOS)**: `com.srivatsajoshi2005.vocabree`
- **Expo Username**: `srivatsajoshi2005`
- **Redirect URI**: `https://auth.expo.io/@srivatsajoshi2005/vocabree`

## Step-by-Step Setup (15 minutes)

### Step 1: Get Your Web Client ID from Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **bashalearn**
3. Go to **Authentication** → **Sign-in method**
4. Click **Google** provider
5. Copy the **Web client ID** (looks like: `438861089388-xxxxx.apps.googleusercontent.com`)
6. **Save this ID** - you'll need it in Step 4

### Step 2: Create Android OAuth Client ID

1. Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)
2. Make sure you're in the **bashalearn** project
3. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
4. Application type: **Android**
5. Name: `Vocabree Android`
6. Package name: `com.srivatsajoshi2005.vocabree`
7. SHA-1 certificate fingerprint:
   - **For Expo Go (testing)**: Leave blank or use: `E7:DE:99:5E:8F:6D:24:AB:16:3F:0A:F3:97:D9:3D:5B:EA:C7:F2:1C`
   - **For production**: You'll need to generate this later
8. Click **CREATE**
9. **Copy the Client ID** - save it for Step 4

### Step 3: Create iOS OAuth Client ID

1. In Google Cloud Console, click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **iOS**
3. Name: `Vocabree iOS`
4. Bundle ID: `com.srivatsajoshi2005.vocabree`
5. Click **CREATE**
6. **Copy the Client ID** - save it for Step 4

### Step 4: Add Redirect URI to Web Client

1. In Google Cloud Console → Credentials
2. Find your **Web client** (the one from Firebase)
3. Click on it to edit
4. Under **Authorized redirect URIs**, click **+ ADD URI**
5. Add: `https://auth.expo.io/@srivatsajoshi2005/vocabree`
6. Click **SAVE**

### Step 5: Update Your Code

#### Update LoginScreen.js

Open: `/home/joshi/Desktop/work/vocabree_v1-main/src/screens/auth/LoginScreen.js`

Find this section (around line 34):

```javascript
const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: '438861089388-YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: '438861089388-YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  webClientId: '438861089388-YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
});
```

Replace with your actual client IDs from Steps 1, 2, and 3:

```javascript
const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: 'PASTE_ANDROID_CLIENT_ID_FROM_STEP_2',
  iosClientId: 'PASTE_IOS_CLIENT_ID_FROM_STEP_3',
  webClientId: 'PASTE_WEB_CLIENT_ID_FROM_STEP_1',
});
```

#### Update SignupScreen.js

Open: `/home/joshi/Desktop/work/vocabree_v1-main/src/screens/auth/SignupScreen.js`

Do the same replacement (around line 33)

### Step 6: Restart and Test

1. Stop your Expo server (Ctrl+C in terminal)
2. Start it again:
   ```bash
   npm start
   ```
3. Open the app in Expo Go
4. Try clicking "Continue with Google"

## Troubleshooting

### Still Getting 400 Error?

**Check these:**

1. ✅ Did you add the redirect URI in Step 4?
   - It must be exactly: `https://auth.expo.io/@srivatsajoshi2005/vocabree`

2. ✅ Did you update BOTH LoginScreen.js AND SignupScreen.js?

3. ✅ Did you restart the Expo server after making changes?

4. ✅ Are all three client IDs correct?
   - They should all end with `.apps.googleusercontent.com`
   - They should all start with `438861089388-`

### Error: "redirect_uri_mismatch"

This means the redirect URI is not configured correctly. Double-check Step 4.

### Error: "invalid_client"

This means one of your client IDs is wrong. Double-check Step 5.

## Quick Test Checklist

- [ ] Web Client ID copied from Firebase
- [ ] Android Client ID created and copied
- [ ] iOS Client ID created and copied
- [ ] Redirect URI added to Web Client
- [ ] LoginScreen.js updated with all 3 client IDs
- [ ] SignupScreen.js updated with all 3 client IDs
- [ ] Expo server restarted
- [ ] Tested on device

## Need Help?

If you're still stuck:

1. Check the Firebase Console logs
2. Check the terminal for Expo errors
3. Make sure you're testing on a real device (not simulator for first test)
4. Verify your Firebase project is **bashalearn**

## Important Note for Production

When you build a standalone app (not using Expo Go), you'll need to:

1. Generate a production SHA-1 fingerprint
2. Add it to your Android OAuth client
3. Rebuild the app

For now, focus on getting it working in Expo Go for development.
