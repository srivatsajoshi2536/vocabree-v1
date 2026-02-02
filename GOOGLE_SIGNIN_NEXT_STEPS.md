# Google Sign-In - Remaining Setup Steps

## ✅ Completed
- [x] Web Client ID configured: `438861089388-k4ht1fmc08ac36vsd097hcqminlvsmjb.apps.googleusercontent.com`
- [x] Updated LoginScreen.js
- [x] Updated SignupScreen.js

## 🔧 Next Steps

### Step 1: Add Redirect URI to Web Client (CRITICAL!)

This is the most important step to fix the 400 error!

1. Go to [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials)
2. Select project: **bashalearn**
3. Find your **Web client** (the one ending in `...minlvsmjb`)
4. Click on it to edit
5. Scroll to **Authorized redirect URIs**
6. Click **+ ADD URI**
7. Paste exactly: `https://auth.expo.io/@srivatsajoshi2005/vocabree`
8. Click **SAVE**

**This should fix your 400 error immediately!**

### Step 2: Create Android OAuth Client (Optional for Expo Go)

For testing in Expo Go, you can skip this for now. But for production:

1. In Google Cloud Console, click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **Android**
3. Name: `Vocabree Android`
4. Package name: `com.srivatsajoshi2005.vocabree`
5. SHA-1 certificate fingerprint: 
   - For Expo Go testing: Use `E7:DE:99:5E:8F:6D:24:AB:16:3F:0A:F3:97:D9:3D:5B:EA:C7:F2:1C`
   - Or leave blank for now
6. Click **CREATE**
7. Copy the Client ID
8. Update LoginScreen.js line 35 and SignupScreen.js line 34

### Step 3: Create iOS OAuth Client (Optional for Expo Go)

For testing in Expo Go, you can skip this for now. But for production:

1. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **iOS**
3. Name: `Vocabree iOS`
4. Bundle ID: `com.srivatsajoshi2005.vocabree`
5. Click **CREATE**
6. Copy the Client ID
7. Update LoginScreen.js line 36 and SignupScreen.js line 35

### Step 4: Test!

1. **Stop your Expo server** (Ctrl+C)
2. **Start it again**: `npm start`
3. Open app in Expo Go
4. Try "Continue with Google"

## 🎯 Quick Test (After Step 1)

After adding the redirect URI, you should be able to test immediately:

```bash
# Restart Expo
npm start
```

Then test Google Sign-In on your device!

## 📝 Current Configuration

**Files Updated:**
- ✅ `/src/screens/auth/LoginScreen.js` - Web Client ID added
- ✅ `/src/screens/auth/SignupScreen.js` - Web Client ID added

**Still Need:**
- ⚠️ Add redirect URI to Google Cloud Console (Step 1 above)
- 🔲 Android Client ID (optional for Expo Go)
- 🔲 iOS Client ID (optional for Expo Go)

## 🐛 Troubleshooting

### Still getting 400 error after Step 1?
- Make sure you clicked **SAVE** in Google Cloud Console
- Wait 1-2 minutes for changes to propagate
- Restart your Expo server
- Clear app cache and reload

### Error: "redirect_uri_mismatch"
- Double-check the redirect URI is exactly: `https://auth.expo.io/@srivatsajoshi2005/vocabree`
- No trailing slash
- No typos in username

## 💡 Pro Tip

For **Expo Go testing**, you only need:
1. ✅ Web Client ID (done!)
2. ⚠️ Redirect URI (do this now!)

The Android and iOS client IDs are only needed when you build a standalone app.

---

**Next Action:** Complete Step 1 (add redirect URI) and test!
