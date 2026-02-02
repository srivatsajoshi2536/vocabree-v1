# Fix "Access Blocked: Authorization Error" - FREE Setup

## 🔴 The Problem

Google is blocking access because the OAuth consent screen isn't configured. This is a **one-time setup** and **100% FREE** - no credit card needed!

## ✅ Solution: Configure OAuth Consent Screen (5 minutes)

### Step 1: Go to OAuth Consent Screen

1. Open [Google Cloud Console - OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent)
2. Make sure you're in the **bashalearn** project (check top left)

### Step 2: Choose User Type

You'll see two options:
- **Internal** - Only for Google Workspace users (you probably don't have this)
- **External** - For anyone with a Google account ✅ **Choose this one!**

1. Select **External**
2. Click **CREATE**

**Note:** Don't worry about the "verification" warning - you don't need verification for testing!

### Step 3: Fill in App Information

#### OAuth consent screen (Page 1)

Fill in these required fields:

1. **App name**: `Vocabree` (or any name you want)

2. **User support email**: Select your email from dropdown

3. **App logo**: Skip this for now (optional)

4. **Application home page**: Leave blank or use: `https://vocabree.app`

5. **Application privacy policy link**: Leave blank for testing

6. **Application terms of service link**: Leave blank for testing

7. **Authorized domains**: 
   - Click **+ ADD DOMAIN**
   - Add: `expo.io`
   - Add: `firebaseapp.com`

8. **Developer contact information**: Enter your email address

9. Click **SAVE AND CONTINUE**

### Step 4: Scopes (Page 2)

1. Click **ADD OR REMOVE SCOPES**
2. Find and check these scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
3. Click **UPDATE**
4. Click **SAVE AND CONTINUE**

### Step 5: Test Users (Page 3)

**Important:** While your app is in "Testing" mode, only test users can sign in!

1. Click **+ ADD USERS**
2. Add your email addresses (one per line):
   ```
   vaddeaishwarya26@gmail.com
   your-other-email@gmail.com
   ```
3. Click **ADD**
4. Click **SAVE AND CONTINUE**

### Step 6: Summary (Page 4)

1. Review everything
2. Click **BACK TO DASHBOARD**

### Step 7: Publish App (Optional but Recommended)

To allow ANY Google user to sign in (not just test users):

1. On the OAuth consent screen page, you'll see a button **PUBLISH APP**
2. Click **PUBLISH APP**
3. Click **CONFIRM**

**Note:** Publishing is safe! You don't need Google verification for personal/testing apps.

## 🎯 Now Test Again!

1. **Go back to your app**
2. **Click "Continue with Google"**
3. **Select your Google account**
4. **You might see a warning "Google hasn't verified this app"**
   - Click **Advanced**
   - Click **Go to Vocabree (unsafe)** - this is normal for testing!
5. **Click Allow**
6. **You should be logged in!** 🎉

## 🐛 Troubleshooting

### Still getting "Access blocked"?

**Make sure you:**
- ✅ Added your email to Test Users (Step 5)
- ✅ Selected "External" user type
- ✅ Saved all the pages

### "This app isn't verified" warning

This is **normal** for apps in testing mode! Just click:
1. **Advanced**
2. **Go to Vocabree (unsafe)**
3. **Allow**

### Want to remove the warning?

Either:
- **Option 1:** Add all users as Test Users (up to 100 users)
- **Option 2:** Publish the app (no verification needed for basic scopes)

## 📋 Quick Checklist

- [ ] OAuth consent screen configured
- [ ] User type: External
- [ ] App name: Vocabree
- [ ] Scopes added: email, profile, openid
- [ ] Test users added (your email)
- [ ] App published (optional)
- [ ] Tested Google Sign-In
- [ ] Successfully logged in!

## 💡 Important Notes

1. **No credit card needed** - OAuth consent screen is completely free
2. **No verification needed** - For basic scopes (email, profile)
3. **100 test users allowed** - You can add up to 100 test users
4. **Publishing is safe** - You can publish without verification

---

**Next:** Follow the steps above, then test Google Sign-In again!
