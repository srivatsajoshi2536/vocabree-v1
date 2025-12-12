# Preview Mode Guide

## What is Preview Mode?

Preview Mode allows you to test all features of vocabree **without setting up Firebase**. It uses mock data stored locally, so you can explore the app's functionality before configuring your Firebase project.

## How to Enable Preview Mode

### Option 1: From Onboarding Screen
1. Open the app
2. On the welcome screen, tap **"🎮 Try Preview Mode (No Firebase Required)"**
3. You'll be automatically logged in with demo data

### Option 2: From Login Screen
1. Navigate to Login screen
2. Enter any email and password (they're accepted in preview mode)
3. Tap "Sign In"
4. You'll be logged in with demo data

## What's Included in Preview Mode?

### Mock User Data
- **Email**: demo@vocabree.com
- **Name**: Demo User
- **Total XP**: 450
- **Current Streak**: 5 days
- **Longest Streak**: 12 days
- **Level**: 3

### Mock Progress Data
- **Language**: Hindi
- **Skills Completed**:
  - Basics 1: Level 3 (3 lessons completed)
  - Basics 2: Level 1 (1 lesson completed)
- **Vocabulary**: 4 words learned

## Features Available in Preview Mode

✅ **All features work** including:
- Viewing skill tree
- Starting lessons
- Earning XP
- Tracking streaks
- Viewing progress
- Profile and settings

## How to Disable Preview Mode

1. Go to **Settings** (when implemented)
2. Toggle off "Preview Mode"
3. Or clear app data and restart

## Switching to Real Firebase

When you're ready to use Firebase:

1. Set up your Firebase project
2. Update `src/services/firebase.js` with your config
3. Disable preview mode
4. Sign up with a real account

## Notes

- Preview mode data is stored locally and won't sync
- Progress made in preview mode won't transfer to Firebase
- Preview mode is perfect for testing UI and features
- All mock data resets when you disable preview mode

---

**Enjoy exploring vocabree!** 🚀

