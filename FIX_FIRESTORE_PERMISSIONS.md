# Fix Firestore Permissions

## Problem
User data is not being saved to Firestore after signup. This is likely due to Firestore security rules.

## Solution: Update Firestore Security Rules

### Step 1: Go to Firestore Console

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **bashalearn**
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top

### Step 2: Update Security Rules

Replace the existing rules with these:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can read/write their own data
    match /users/{userId} {
      // Allow read if user is authenticated and it's their own document
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Allow create if user is authenticated and creating their own document
      allow create: if request.auth != null && request.auth.uid == userId;
      
      // Allow update if user is authenticated and it's their own document
      allow update: if request.auth != null && request.auth.uid == userId;
      
      // Don't allow delete (optional - remove this line if you want users to delete their accounts)
      allow delete: if false;
    }
    
    // Progress collection - users can read/write their own progress
    match /progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Lessons collection - everyone can read, only admins can write
    match /lessons/{lessonId} {
      allow read: if true; // Anyone can read lessons
      allow write: if false; // Only through backend/admin
    }
    
    // Any other collections - deny by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 3: Publish Rules

1. Click the **Publish** button at the top
2. Confirm the changes

### Step 4: Test Again

1. Go back to your app
2. Try signing up with a new email
3. Check the terminal for console logs
4. Check Firestore Database → Data tab to see if user was created

## Alternative: Temporary Open Rules (FOR TESTING ONLY!)

If you want to test quickly, you can temporarily use these open rules:

⚠️ **WARNING: These rules allow anyone to read/write. Only use for testing!**

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Remember to change back to secure rules before publishing your app!**

## How to Check if Data is Saved

### Method 1: Firestore Console

1. Go to Firebase Console → Firestore Database
2. Click **Data** tab
3. Look for a `users` collection
4. Click on it to see user documents
5. Each user should have a document with their UID

### Method 2: Check Terminal Logs

After signing up, check your terminal for:
- ✅ "Creating user profile in Firestore..." - means it's trying to save
- ✅ "User profile created successfully!" - means it worked!
- ❌ "Signup error: permission-denied" - means rules are blocking it

## Common Issues

### "Permission denied" error
- **Cause**: Firestore security rules are too restrictive
- **Fix**: Update rules as shown above

### "Network error"
- **Cause**: No internet connection or Firebase is down
- **Fix**: Check internet connection

### User created in Authentication but not in Firestore
- **Cause**: Firestore rules blocking the write
- **Fix**: Update Firestore rules

## Verify It's Working

After updating rules, try this:

1. **Sign up with a new email**
2. **Check terminal** - should see "User profile created successfully!"
3. **Go to Firestore Console** → Data tab
4. **Look for users collection** → Your UID → Should see your profile data

If you see your data in Firestore, it's working! ✅

---

**Next:** Update your Firestore security rules and test signup again!
