# Firebase Console Setup - FREE & Simple! 🎉

## ✅ What You Already Have
- Web Client ID: `438861089388-k4ht1fmc08ac36vsd097hcqminlvsmjb.apps.googleusercontent.com`
- Code is already updated and ready!

## 🚀 Simple 3-Step Setup (5 minutes, 100% FREE)

### Step 1: Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click on your project: **bashalearn**
3. In the left sidebar, click **Authentication**
4. Click the **Sign-in method** tab at the top
5. Find **Google** in the list
6. Click on **Google**
7. Toggle the **Enable** switch to ON (if not already enabled)
8. You should see your Web Client ID already there
9. Click **Save**

### Step 2: Add Authorized Domain

Still in the same Google provider settings:

1. Scroll down to **Authorized domains**
2. You should see domains like:
   - `localhost`
   - `bashalearn.firebaseapp.com`
   - `bashalearn.web.app`
3. Click **Add domain**
4. Type: `auth.expo.io`
5. Click **Add**
6. Click **Save** at the bottom

### Step 3: Test It!

1. **Restart your Expo server:**
   ```bash
   # Press Ctrl+C in terminal to stop
   npm start
   ```

2. **Open your app** in Expo Go on your phone

3. **Go to Login screen**

4. **Click "Continue with Google"**

5. **Select your Google account**

6. **Done!** You should be logged in! 🎉

## 🎯 That's It!

No credit card needed. No Google Cloud Console. No billing. Completely FREE!

## 🐛 If You Still Get Errors

### Error: "auth.expo.io is not authorized"
- Make sure you added `auth.expo.io` to Authorized domains in Step 2
- Wait 1-2 minutes for changes to take effect
- Restart Expo server

### Error: "popup_closed_by_user"
- This is normal if you close the Google sign-in popup
- Just try again

### Error: "network_error"
- Check your internet connection
- Try again

## ✅ What We Did

I've already updated your code to work with just the Web Client ID:
- ✅ LoginScreen.js - Updated
- ✅ SignupScreen.js - Updated
- ✅ Using `expoClientId` for Expo Go compatibility

## 📱 Testing Checklist

- [ ] Firebase Console: Google sign-in enabled
- [ ] Firebase Console: `auth.expo.io` added to authorized domains
- [ ] Expo server restarted
- [ ] Tested on real device with Expo Go
- [ ] Successfully signed in with Google account

## 🎊 Success!

Once you complete these 3 simple steps, your users will be able to:
- Sign in with their Google accounts
- Sign up with Google
- No need to remember passwords
- Faster onboarding experience

All completely FREE! 🚀

---

**Next:** Complete the 3 steps above and test!
