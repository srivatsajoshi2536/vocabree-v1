# Manual Testing Checklist for Vocabree v1

**Date:** 2026-01-28  
**Version:** 1.0.0  
**Tester:** _______________

## ✅ Testing Status Legend
- [ ] Not Tested
- [✓] Passed
- [✗] Failed
- [~] Partially Working

---

## 🔐 Authentication Features

### User Registration
- [ ] Can create new account with email and password
- [ ] Password validation works (minimum length, etc.)
- [ ] Email validation works
- [ ] Error messages display for invalid inputs
- [ ] Duplicate email registration is prevented
- [ ] User is redirected to home after successful signup

### User Login
- [ ] Can login with valid credentials
- [ ] Error shown for invalid email
- [ ] Error shown for incorrect password
- [ ] "Remember me" functionality works (if implemented)
- [ ] User is redirected to home after successful login

### Password Reset
- [ ] Password reset email can be sent
- [ ] Reset link works correctly
- [ ] User can set new password

### Logout
- [ ] User can logout successfully
- [ ] User is redirected to login screen
- [ ] Session is cleared properly

---

## 🏠 Home Screen Features

### Language Selection
- [ ] Can select Hindi
- [ ] Can select Bengali
- [ ] Can select Telugu
- [ ] Can select Kannada
- [ ] Can select Tamil
- [ ] Selected language is highlighted/indicated
- [ ] Language selection persists after app restart

### Dashboard Display
- [ ] Current streak is displayed correctly
- [ ] Total XP is displayed correctly
- [ ] Daily goal progress shows accurately
- [ ] Skills/lessons are visible
- [ ] Locked lessons show lock icon
- [ ] Completed lessons show completion status

### Navigation
- [ ] Can navigate to lesson screen
- [ ] Can navigate to practice mode
- [ ] Can navigate to profile
- [ ] Can navigate to OCR translator
- [ ] Bottom tab navigation works smoothly

---

## 📚 Lesson Features

### Lesson Access
- [ ] Can start an unlocked lesson
- [ ] Cannot start a locked lesson
- [ ] Lesson progress is saved
- [ ] Can resume incomplete lessons

### Exercise Types

#### Translation Exercises
- [ ] Question displays correctly
- [ ] Answer input works
- [ ] Correct answer is validated properly
- [ ] Incorrect answer shows feedback
- [ ] Can proceed to next question

#### Multiple Choice
- [ ] Question displays correctly
- [ ] All options are visible
- [ ] Can select an option
- [ ] Correct answer is highlighted
- [ ] Incorrect answer shows feedback
- [ ] Can proceed to next question

#### Listening Exercises
- [ ] Audio plays when tapped
- [ ] Audio quality is good
- [ ] Can replay audio
- [ ] Answer validation works
- [ ] Transcription is accurate

#### Fill in the Blanks
- [ ] Blank spaces are clearly indicated
- [ ] Can type/select answer
- [ ] Answer validation works
- [ ] Hints work (if implemented)

#### Matching Exercises
- [ ] Can drag/tap to match items
- [ ] Matches are validated correctly
- [ ] Visual feedback for correct/incorrect matches
- [ ] Can complete all matches

### Lesson Completion
- [ ] Completion screen shows after finishing
- [ ] XP earned is displayed correctly
- [ ] XP is added to total
- [ ] Streak is updated
- [ ] Next lesson is unlocked (if applicable)
- [ ] Can return to home screen

---

## 🎯 Practice Mode

- [ ] Can access practice mode
- [ ] Random questions from completed lessons
- [ ] All exercise types work in practice mode
- [ ] XP is earned from practice
- [ ] Can exit practice mode anytime

---

## 📸 OCR Image Translator (Recently Modified)

### Image Selection
- [ ] ~~Cannot access camera (removed feature)~~ ✓
- [ ] Can select image from gallery
- [ ] Image preview displays correctly
- [ ] Can cancel/reset image selection

### Text Extraction
- [ ] Text is extracted from image
- [ ] Extracted text is displayed correctly
- [ ] Loading indicator shows during processing
- [ ] Error message shows if no text detected

### Translation
- [ ] Words are translated to selected language
- [ ] Translations display correctly
- [ ] Word count is accurate
- [ ] Translation errors are handled gracefully

### Audio Playback
- [ ] Can play individual word pronunciation
- [ ] "Play All" button works
- [ ] Audio plays in correct language
- [ ] Can pause/stop audio
- [ ] Audio quality is good

### UI/UX
- [ ] Instructions say "Select an image from gallery" (not "Take photo")
- [ ] Only gallery button is shown (no camera button)
- [ ] Gallery button has proper styling
- [ ] Layout is responsive
- [ ] All text is readable

---

## 👤 Profile Features

### Profile Display
- [ ] User name displays correctly
- [ ] Email displays correctly
- [ ] Profile picture shows (if implemented)
- [ ] Total XP is shown
- [ ] Current streak is shown
- [ ] Languages learned are listed

### Statistics
- [ ] Lessons completed count is accurate
- [ ] Time spent is tracked (if implemented)
- [ ] Achievement badges display
- [ ] Progress charts render correctly

### Settings
- [ ] Can change language preference
- [ ] Can toggle sound effects
- [ ] Can toggle notifications
- [ ] Can change daily goal
- [ ] Settings persist after app restart

### Account Management
- [ ] Can update profile information
- [ ] Can change password
- [ ] Can delete account (if implemented)

---

## 🔊 Audio Features

### Text-to-Speech (TTS)
- [ ] TTS works for Hindi
- [ ] TTS works for Bengali
- [ ] TTS works for Telugu
- [ ] TTS works for Kannada
- [ ] TTS works for Tamil
- [ ] Pronunciation is clear and accurate
- [ ] Playback speed is appropriate

### Audio Files
- [ ] Pre-recorded audio plays correctly
- [ ] No audio glitches or stuttering
- [ ] Volume is consistent across files

---

## 💾 Data Persistence

### Local Storage
- [ ] User preferences are saved
- [ ] Progress is saved locally
- [ ] Offline mode works (if implemented)
- [ ] Data syncs when back online

### Firebase Sync
- [ ] User data syncs to Firestore
- [ ] Progress syncs across devices
- [ ] Real-time updates work
- [ ] No data loss on app restart

---

## 🎨 UI/UX Testing

### Visual Design
- [ ] All colors match theme
- [ ] Fonts are consistent
- [ ] Icons display correctly
- [ ] Images load properly
- [ ] Animations are smooth

### Responsiveness
- [ ] Works on small screens
- [ ] Works on large screens
- [ ] Works in portrait mode
- [ ] Works in landscape mode (if supported)
- [ ] No UI elements are cut off

### Accessibility
- [ ] Text is readable (good contrast)
- [ ] Touch targets are large enough
- [ ] Error messages are clear
- [ ] Loading states are indicated

---

## 🐛 Error Handling

### Network Errors
- [ ] Graceful handling when offline
- [ ] Retry mechanism works
- [ ] Error messages are user-friendly
- [ ] App doesn't crash on network failure

### Input Validation
- [ ] Invalid inputs are caught
- [ ] Helpful error messages shown
- [ ] Form validation works correctly

### Edge Cases
- [ ] Empty states display correctly
- [ ] Handles very long text
- [ ] Handles special characters
- [ ] Handles rapid button taps

---

## ⚡ Performance Testing

### App Performance
- [ ] App launches quickly (< 3 seconds)
- [ ] Smooth scrolling
- [ ] No lag during transitions
- [ ] Images load efficiently
- [ ] Audio loads without delay

### Memory Usage
- [ ] No memory leaks
- [ ] App doesn't crash after extended use
- [ ] Background processes don't drain battery

---

## 🔄 Recent Changes Verification

### OCR Translator Updates (2026-01-28)
- [✓] Camera button removed from UI
- [✓] Instructions updated to "Select an image from gallery"
- [✓] Gallery button is the only option
- [✓] Gallery button has primary styling
- [ ] Feature works end-to-end after changes
- [ ] No regressions in other features

---

## 📱 Platform-Specific Testing

### Android
- [ ] All features work on Android
- [ ] Back button behavior is correct
- [ ] Permissions are requested properly
- [ ] No Android-specific crashes

### iOS
- [ ] All features work on iOS
- [ ] Navigation gestures work
- [ ] Permissions are requested properly
- [ ] No iOS-specific crashes

---

## 🚀 Critical Path Testing

**Complete this flow to verify core functionality:**

1. [ ] Open app
2. [ ] Create new account / Login
3. [ ] Select a language (e.g., Hindi)
4. [ ] Start first lesson
5. [ ] Complete at least 3 different exercise types
6. [ ] Finish lesson and see completion screen
7. [ ] Verify XP was awarded
8. [ ] Navigate to OCR translator
9. [ ] Select image from gallery
10. [ ] Verify text extraction and translation
11. [ ] Play audio for translated words
12. [ ] Navigate to profile
13. [ ] Verify stats are updated
14. [ ] Logout
15. [ ] Login again and verify data persists

---

## 📝 Notes & Issues Found

### Issues Discovered:
```
1. [Date] [Screen/Feature] - Description of issue
   Severity: High/Medium/Low
   Steps to reproduce:
   Expected behavior:
   Actual behavior:

2. 

3. 

```

### Suggestions for Improvement:
```
1. 

2. 

3. 

```

---

## ✅ Final Sign-off

- [ ] All critical features tested
- [ ] All high-priority bugs fixed
- [ ] App is ready for deployment
- [ ] Documentation is updated

**Tested by:** _______________  
**Date:** _______________  
**Overall Status:** ⬜ Pass / ⬜ Fail / ⬜ Pass with Minor Issues
