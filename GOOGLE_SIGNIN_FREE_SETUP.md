# FREE Google Sign-In Setup (No Payment Required!)

## 🎉 Good News: It's 100% FREE!

Google Cloud Console OAuth is **completely free**. You do NOT need to add billing or payment info for Google Sign-In to work.

## 🚀 Simple Free Setup (5 minutes)

### Step 1: Add Redirect URI (MOST IMPORTANT!)

This is the **only** step you need to fix the 400 error:

1. Go to [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials)
2. Select project: **bashalearn**
3. Click on your **Web client** (the one ending in `...minlvsmjb`)
4. Scroll down to **Authorized redirect URIs**
5. Click **+ ADD URI**
6. Paste: `https://auth.expo.io/@srivatsajoshi2005/vocabree`
7. Click **SAVE** at the bottom

**That's it!** This will fix your 400 error.

### Step 2: Test Without Android/iOS Client IDs

For **Expo Go testing**, you can use JUST the Web Client ID! You don't need Android or iOS client IDs yet.

The current configuration will work because:
- ✅ Web Client ID is configured
- ✅ Redirect URI will be added (Step 1)
- ✅ Expo handles the OAuth flow

## 🧪 Test Now (After Step 1)

1. **Restart Expo server**:
   ```bash
   # Press Ctrl+C
   npm start
   ```

2. **Open app in Expo Go**

3. **Click "Continue with Google"**

4. **It should work!** 🎉

## ❓ If Google Cloud Asks for Billing

If you see a billing prompt:

1. **Click "Skip" or "Cancel"** - billing is NOT required for OAuth
2. **Or click "X"** to close the billing dialog
3. Continue with the setup

OAuth credentials are in the **free tier** and don't require billing.

## 🔧 Alternative: Use Only Web Client (Simplest)

Since you're testing in Expo Go, you can actually skip creating Android/iOS clients entirely!

**Current setup works with:**
- Web Client ID: `438861089388-k4ht1fmc08ac36vsd097hcqminlvsmjb.apps.googleusercontent.com`
- Redirect URI: `https://auth.expo.io/@srivatsajoshi2005/vocabree`

That's all you need for Expo Go!

## 📝 What About the Placeholder IDs?

The placeholder Android and iOS client IDs in your code won't be used when testing in Expo Go. Expo's AuthSession uses the **Web Client ID** for the OAuth flow.

So your current code is fine:
```javascript
const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: '438861089388-YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com', // Not used in Expo Go
  iosClientId: '438861089388-YOUR_IOS_CLIENT_ID.apps.googleusercontent.com', // Not used in Expo Go
  webClientId: '438861089388-k4ht1fmc08ac36vsd097hcqminlvsmjb.apps.googleusercontent.com', // ✅ This is used!
});
```

## ✅ Final Checklist

- [ ] Add redirect URI to Web Client in Google Cloud Console
- [ ] Click SAVE
- [ ] Restart Expo server (`npm start`)
- [ ] Test Google Sign-In
- [ ] Celebrate! 🎉

## 🎯 Summary

**You only need to do ONE thing:**
1. Add the redirect URI to your Web Client (Step 1 above)

**You do NOT need:**
- ❌ Billing/payment info
- ❌ Android OAuth client (for Expo Go testing)
- ❌ iOS OAuth client (for Expo Go testing)

**Cost:** $0.00 (FREE!)

---

**Next Action:** Add the redirect URI and test! It should work immediately.
