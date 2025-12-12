# Firestore Security Rules Setup

## Quick Fix for Permission Errors

You're getting "Missing or insufficient permissions" because Firestore security rules aren't set up yet.

## Step 1: Open Firestore Rules in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **bashalearn**
3. Click **Firestore Database** in the left sidebar
4. Click on the **Rules** tab

## Step 2: Copy and Paste These Rules

### For Testing/Development (Temporary - allows all authenticated users)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Progress documents: format is {userId}_{languageId}
    // Users can only access their own progress
    match /progress/{progressId} {
      allow read, write: if request.auth != null && 
        (progressId.matches(request.auth.uid + '_.*') || 
         resource.data.userId == request.auth.uid ||
         request.resource.data.userId == request.auth.uid);
    }
  }
}
```

### For Production (More Secure - Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false; // Prevent deletion
    }
    
    // Progress documents: format is {userId}_{languageId}
    match /progress/{progressId} {
      // Allow read if the progressId starts with the user's uid
      allow read: if request.auth != null && 
        progressId.matches(request.auth.uid + '_.*');
      
      // Allow write if creating/updating their own progress
      allow create: if request.auth != null && 
        progressId.matches(request.auth.uid + '_.*') &&
        request.resource.data.userId == request.auth.uid;
      
      allow update: if request.auth != null && 
        progressId.matches(request.auth.uid + '_.*') &&
        resource.data.userId == request.auth.uid;
      
      allow delete: if false; // Prevent deletion
    }
  }
}
```

## Step 3: Publish the Rules

1. Click **Publish** button at the top
2. Wait a few seconds for the rules to deploy

## Step 4: Test Your App

After publishing, try your app again. The permission errors should be gone!

## Troubleshooting

### Still getting errors?

1. **Make sure you're logged in** - The rules require `request.auth != null`
2. **Check the document ID format** - Progress documents should be `${userId}_${languageId}`
3. **Verify the userId field** - Progress documents should have a `userId` field matching the authenticated user's uid

### Test Mode (Temporary - NOT for production)

If you want to test quickly without rules, you can temporarily use test mode:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

⚠️ **WARNING**: This allows anyone to read/write your database. Only use for testing and change it back immediately!

## Understanding the Rules

- `request.auth != null` - User must be authenticated
- `request.auth.uid == userId` - User can only access their own data
- `progressId.matches(request.auth.uid + '_.*')` - Progress document ID must start with user's uid
- `resource.data.userId` - The userId field in the existing document
- `request.resource.data.userId` - The userId field in the document being created/updated

