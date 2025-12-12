# Software Requirements Specification (SRS)
## Indian Language Learning Application

**Version:** 1.0  
**Date:** November 16, 2025  
**Project Type:** Final Year Project  
**Development Stack:** Expo, React Native

---

## 1. INTRODUCTION

### 1.1 Purpose
This document specifies the functional and non-functional requirements for an Indian language learning mobile application. The app aims to make learning Hindi, Bengali, Telugu, Kannada, and Tamil accessible, engaging, and effective through gamified lessons and interactive exercises.

### 1.2 Scope
The application will provide:
- Interactive language lessons with gamification elements
- Support for 5 major Indian languages: Hindi, Bengali, Telugu, Kannada, Tamil
- Progress tracking and streak maintenance
- Adaptive learning paths based on user performance
- Offline capability for downloaded lessons
- Cross-platform support (iOS and Android)

### 1.3 Intended Audience
- Language learners (beginners to intermediate)
- Students interested in Indian regional languages
- Professionals relocating within India
- Heritage language learners
- Educators and language enthusiasts

### 1.4 Project Objectives
- Provide free, accessible language education for Indian languages
- Create an engaging, gamified learning experience
- Support learners from script basics to conversational fluency
- Build a scalable, maintainable mobile application
- Complete a production-ready final year project

---

## 2. OVERALL DESCRIPTION

### 2.1 Product Perspective
A standalone mobile application inspired by Duolingo but focused exclusively on Indian languages, addressing the gap in quality digital resources for regional language learning.

### 2.2 Product Features Summary
- Multi-language support (5 Indian languages)
- Gamified lesson structure with XP and levels
- Multiple exercise types (translation, listening, speaking, matching)
- Daily streak tracking and reminders
- Progress dashboard with statistics
- Achievement and badge system
- Leaderboards (optional social feature)
- Offline lesson access
- Profile customization

### 2.3 User Classes and Characteristics

#### 2.3.1 Beginner Learners
- No prior knowledge of the target language
- Need script learning and pronunciation basics
- Require simple, guided lessons

#### 2.3.2 Intermediate Learners
- Basic familiarity with the language
- Want to improve vocabulary and grammar
- Seek conversation practice

#### 2.3.3 Heritage Speakers
- Understand spoken language but can't read/write
- Need script and formal grammar instruction
- Want to reconnect with cultural roots

### 2.4 Operating Environment
- **Mobile OS:** iOS 13+ and Android 8.0+
- **Framework:** React Native with Expo SDK 52+
- **Backend:** Firebase (free tier)
- **Storage:** AsyncStorage for local data
- **Audio:** Expo AV for sound playback

### 2.5 Design and Implementation Constraints
- Must use free services only (Firebase free tier, Expo)
- Backend costs limited to $0/month
- Must work offline for core features
- React Native and Expo development constraints
- Limited to mobile platforms (iOS/Android)

### 2.6 Assumptions and Dependencies
- Users have smartphones with internet connectivity for initial setup
- Users grant necessary permissions (microphone for speaking exercises)
- Firebase free tier limits are sufficient for user base
- Content can be bundled with the app or cached locally

---

## 3. SYSTEM FEATURES AND REQUIREMENTS

### 3.1 User Authentication and Profile Management

#### 3.1.1 User Registration
**Priority:** High  
**Description:** Users can create accounts to save progress across devices.

**Functional Requirements:**
- FR-1.1: System shall allow registration via email/password
- FR-1.2: System shall support Google Sign-In integration
- FR-1.3: System shall validate email format and password strength (min 8 characters)
- FR-1.4: System shall send email verification (optional)
- FR-1.5: System shall create default user profile on registration

#### 3.1.2 User Login
**Priority:** High

**Functional Requirements:**
- FR-1.6: System shall authenticate users via email/password
- FR-1.7: System shall support Google Sign-In
- FR-1.8: System shall provide "Forgot Password" functionality
- FR-1.9: System shall maintain user session until logout
- FR-1.10: System shall allow guest mode with local storage only

#### 3.1.3 Profile Management
**Priority:** Medium

**Functional Requirements:**
- FR-1.11: Users shall be able to upload/change profile picture
- FR-1.12: Users shall set learning goals (daily XP target, time commitment)
- FR-1.13: Users shall be able to change password
- FR-1.14: Users shall view account statistics (join date, total XP, languages learning)
- FR-1.15: System shall allow users to delete their account

### 3.2 Language Selection and Course Structure

#### 3.2.1 Language Selection
**Priority:** High

**Functional Requirements:**
- FR-2.1: Users shall select primary language to learn from 5 options (Hindi, Bengali, Telugu, Kannada, Tamil)
- FR-2.2: Users shall be able to learn multiple languages simultaneously
- FR-2.3: System shall support English as the base/instruction language
- FR-2.4: Users shall be able to add/remove languages from their learning list
- FR-2.5: Each language shall have independent progress tracking

#### 3.2.2 Skill Tree Structure
**Priority:** High

**Functional Requirements:**
- FR-2.6: Each language shall have a structured skill tree with 40-50 skills
- FR-2.7: Skills shall be organized into 5-7 sections (Basics, Greetings, Food, Travel, etc.)
- FR-2.8: Each skill shall contain 4-6 levels
- FR-2.9: Skills shall unlock sequentially (linear progression)
- FR-2.10: System shall display skill progress (0-5 crowns/levels)

#### 3.2.3 Lesson Content
**Priority:** High

**Functional Requirements:**
- FR-2.11: Each lesson shall contain 10-15 exercises
- FR-2.12: Lessons shall progressively introduce 3-8 new words/concepts
- FR-2.13: System shall include grammar tips before relevant lessons
- FR-2.14: Lessons shall review previously learned material
- FR-2.15: Each skill level shall end with a mini-test

### 3.3 Exercise Types and Interactions

#### 3.3.1 Translation Exercises
**Priority:** High

**Functional Requirements:**
- FR-3.1: System shall present text in target language for translation to English
- FR-3.2: System shall present English text for translation to target language
- FR-3.3: Users shall construct answers from word bank
- FR-3.4: Users shall type answers using on-screen keyboard
- FR-3.5: System shall accept multiple correct answers where applicable

#### 3.3.2 Multiple Choice Questions
**Priority:** High

**Functional Requirements:**
- FR-3.6: System shall display questions with 3-4 answer options
- FR-3.7: Questions shall test vocabulary, grammar, and comprehension
- FR-3.8: System shall provide immediate feedback on selection
- FR-3.9: System shall highlight correct answer if user answers incorrectly

#### 3.3.3 Listening Exercises
**Priority:** High

**Functional Requirements:**
- FR-3.10: System shall play audio of target language words/sentences
- FR-3.11: Users shall select correct translation or transcription
- FR-3.12: System shall provide slow playback option
- FR-3.13: Audio shall be clear, native speaker quality
- FR-3.14: System shall support replay unlimited times

#### 3.3.4 Speaking Exercises
**Priority:** Medium

**Functional Requirements:**
- FR-3.15: System shall prompt users to speak target language phrases
- FR-3.16: System shall use speech recognition to evaluate pronunciation
- FR-3.17: Users shall be able to skip speaking exercises
- FR-3.18: System shall provide option to see correct pronunciation text
- FR-3.19: System shall allow users to retry speaking exercises

#### 3.3.5 Matching Exercises
**Priority:** Medium

**Functional Requirements:**
- FR-3.20: Users shall match target language words with English translations
- FR-3.21: Users shall match images with words
- FR-3.22: Exercises shall have 5-8 matching pairs
- FR-3.23: System shall support drag-and-drop or tap-to-match interaction

#### 3.3.6 Fill in the Blanks
**Priority:** Medium

**Functional Requirements:**
- FR-3.24: System shall present sentences with missing words
- FR-3.25: Users shall select correct word from options to complete sentence
- FR-3.26: Exercises shall test grammar and context understanding

### 3.4 Gamification and Motivation

#### 3.4.1 XP and Leveling System
**Priority:** High

**Functional Requirements:**
- FR-4.1: Users shall earn XP for completing lessons (10-20 XP per lesson)
- FR-4.2: System shall maintain cumulative XP per language
- FR-4.3: Users shall level up based on XP thresholds
- FR-4.4: System shall display level progress with visual indicator
- FR-4.5: XP shall be awarded based on accuracy (bonus for perfect lessons)

#### 3.4.2 Streak Tracking
**Priority:** High

**Functional Requirements:**
- FR-4.6: System shall track consecutive days of learning
- FR-4.7: Streak shall increment when user completes at least one lesson per day
- FR-4.8: System shall display current streak prominently on home screen
- FR-4.9: System shall show streak freeze option (limited saves)
- FR-4.10: System shall send reminders to maintain streaks

#### 3.4.3 Achievement System
**Priority:** Medium

**Functional Requirements:**
- FR-4.11: System shall award badges for milestones (7-day streak, first lesson complete, etc.)
- FR-4.12: System shall have 30-50 unique achievements
- FR-4.13: Users shall view achievement gallery with locked/unlocked status
- FR-4.14: System shall notify users when achievements are earned
- FR-4.15: Achievements shall have bronze, silver, gold tiers

#### 3.4.4 Leaderboards
**Priority:** Low

**Functional Requirements:**
- FR-4.16: System shall display weekly XP leaderboard (optional feature)
- FR-4.17: Users shall compete with friends or global users
- FR-4.18: Leaderboards shall reset weekly
- FR-4.19: Users shall be able to opt out of leaderboards

### 3.5 Progress Tracking and Analytics

#### 3.5.1 Progress Dashboard
**Priority:** High

**Functional Requirements:**
- FR-5.1: System shall display overall learning statistics
- FR-5.2: Dashboard shall show current streak, total XP, lessons completed
- FR-5.3: System shall visualize progress per language (skill tree completion %)
- FR-5.4: Dashboard shall display daily XP goal progress
- FR-5.5: System shall show calendar heatmap of learning activity

#### 3.5.2 Detailed Statistics
**Priority:** Medium

**Functional Requirements:**
- FR-5.6: Users shall view time spent learning (daily, weekly, total)
- FR-5.7: System shall track accuracy rates per skill
- FR-5.8: Users shall view vocabulary learned count
- FR-5.9: System shall identify weak skills for review
- FR-5.10: Statistics shall be exportable or shareable

### 3.6 Practice and Review

#### 3.6.1 Practice Mode
**Priority:** High

**Functional Requirements:**
- FR-6.1: Users shall access general practice mode
- FR-6.2: Practice shall review previously learned material
- FR-6.3: System shall prioritize weak skills in practice
- FR-6.4: Practice shall earn reduced XP compared to new lessons
- FR-6.5: Users shall practice specific skills directly

#### 3.6.2 Timed Challenges
**Priority:** Low

**Functional Requirements:**
- FR-6.6: System shall offer timed practice mode (20 questions, 30 seconds each)
- FR-6.7: Users shall earn bonus XP for successful timed challenges
- FR-6.8: Timed mode shall test knowledge across all learned skills

### 3.7 Content Management

#### 3.7.1 Offline Support
**Priority:** High

**Functional Requirements:**
- FR-7.1: Core lesson content shall be bundled with the app
- FR-7.2: Users shall download audio files for offline use
- FR-7.3: Progress shall sync when internet connection is restored
- FR-7.4: System shall indicate offline mode status
- FR-7.5: Downloaded content shall be stored efficiently

#### 3.7.2 Content Updates
**Priority:** Medium

**Functional Requirements:**
- FR-7.6: System shall check for content updates on app launch
- FR-7.7: New lessons shall be downloadable without app update
- FR-7.8: Users shall receive notifications for new content
- FR-7.9: System shall display "New" badges on updated content

### 3.8 Notifications and Reminders

**Priority:** Medium

**Functional Requirements:**
- FR-8.1: System shall send daily learning reminders at user-set time
- FR-8.2: Users shall be able to customize notification preferences
- FR-8.3: System shall send streak reminder before midnight
- FR-8.4: Notifications shall be non-intrusive and encouraging
- FR-8.5: Users shall be able to disable all notifications

### 3.9 Settings and Preferences

**Priority:** Medium

**Functional Requirements:**
- FR-9.1: Users shall toggle sound effects on/off
- FR-9.2: Users shall enable/disable speaking exercises
- FR-9.3: Users shall adjust daily XP goal (10, 20, 50, 100 XP)
- FR-9.4: Users shall select notification time
- FR-9.5: System shall provide option to reset progress
- FR-9.6: Users shall view terms of service and privacy policy
- FR-9.7: System shall display app version and credits

---

## 4. UI/UX DESIGN REQUIREMENTS

### 4.1 Design Principles
- **Colorful and Engaging:** Use vibrant colors to make learning fun
- **Clean and Minimal:** Avoid clutter, focus on content
- **Intuitive Navigation:** Clear hierarchy, easy to find features
- **Consistent:** Maintain design language across all screens
- **Accessible:** Readable fonts, good contrast, large touch targets
- **Delightful:** Micro-interactions, animations, celebrations

### 4.2 Color Scheme
**Primary Colors:**
- **Hindi:** Saffron/Orange (#FF9933)
- **Bengali:** Red (#DC143C)
- **Telugu:** Yellow (#FFD700)
- **Kannada:** Red/Yellow (#FF6B6B)
- **Tamil:** Red (#B22222)
- **Accent:** Bright Blue (#2196F3)
- **Success:** Green (#4CAF50)
- **Error:** Red (#F44336)

**Neutral Colors:**
- Background: White (#FFFFFF)
- Secondary Background: Light Gray (#F5F5F5)
- Text Primary: Dark Gray (#212121)
- Text Secondary: Medium Gray (#757575)

### 4.3 Typography
- **Primary Font:** Inter or System Default (SF Pro for iOS, Roboto for Android)
- **Heading Sizes:** 24px (Large), 20px (Medium), 16px (Small)
- **Body Text:** 16px (regular), 14px (small)
- **Font Weights:** Regular (400), Medium (500), Bold (700)

### 4.4 Screen Layouts

#### 4.4.1 Home Screen
**Components:**
- Top bar: Profile picture, streak counter, XP today
- Language selector (horizontal scroll if multiple languages)
- Skill tree (vertical scroll)
- Bottom navigation: Home, Practice, Leaderboard, Profile
- Floating action button: Start next lesson

**Design Details:**
- Skill icons should be colorful, illustrative
- Progress indicators on each skill (circular progress)
- Locked skills appear grayed out with lock icon
- Current skill highlighted with glow/border
- Animated mascot character for encouragement

#### 4.4.2 Lesson Screen
**Components:**
- Top progress bar (showing lesson completion)
- Heart/lives indicator (3 hearts, lose one per mistake)
- Question area (large, centered)
- Answer options (buttons/word bank)
- Bottom: Skip button, Report button

**Design Details:**
- Large, readable text for questions
- Smooth transitions between exercises
- Immediate visual feedback (green for correct, red for incorrect)
- Celebratory animations on correct answers
- Explanation modal for incorrect answers

#### 4.4.3 Progress Dashboard
**Components:**
- Header: User name, level, total XP
- Streak calendar (heatmap visualization)
- Daily goal progress (circular chart)
- Statistics cards (lessons completed, time spent, accuracy)
- Language-wise breakdown

**Design Details:**
- Use charts and graphs (recharts library)
- Color-coded statistics
- Achievement showcase section
- Motivational messages based on progress

#### 4.4.4 Profile Screen
**Components:**
- Profile picture (editable)
- User stats (level, XP, streak)
- Achievement gallery
- Settings button
- Languages learning section
- Logout button

**Design Details:**
- Grid layout for achievements
- Badges with shine/glow effects
- Clean, organized settings menu
- Profile customization options

### 4.5 UI Components Library

#### 4.5.1 Buttons
- **Primary:** Rounded, bright green, white text, elevation shadow
- **Secondary:** Outlined, no fill, colored border
- **Disabled:** Gray, reduced opacity
- **Size:** Minimum 48px height for accessibility
- **Feedback:** Scale animation on press

#### 4.5.2 Cards
- White background, subtle shadow (elevation 2)
- Rounded corners (8px border radius)
- Padding: 16px
- Used for skill items, achievement cards, stat cards

#### 4.5.3 Progress Indicators
- Circular progress for skills (stroke-based)
- Linear progress bar for lessons
- Animated transitions
- Color changes based on completion percentage

#### 4.5.4 Modals and Overlays
- Centered, max 80% screen width
- Dimmed background (semi-transparent black)
- Close button (X) in top right
- Animations: fade in/slide up

#### 4.5.5 Icons
- Use Lucide React Native icons or Expo vector icons
- Consistent size (24px standard)
- Match color scheme
- Examples: Home, Star, Trophy, Settings, Check, X

### 4.6 Animations and Interactions

**Micro-interactions:**
- Button press: Scale down to 0.95
- Correct answer: Confetti animation, success sound
- Incorrect answer: Shake animation, error sound
- Level up: Full-screen celebration with fireworks
- Skill complete: Crown animation

**Screen Transitions:**
- Slide left/right for navigation
- Fade for modals
- Duration: 200-300ms
- Easing: ease-in-out

### 4.7 Accessibility
- Minimum touch target: 44x44 points
- Text contrast ratio: 4.5:1 minimum
- Support for screen readers
- Adjustable font sizes
- Color-blind friendly (don't rely solely on color)
- Voice-over support for exercises

---

## 5. TECHNICAL REQUIREMENTS

### 5.1 Technology Stack

#### 5.1.1 Frontend
- **Framework:** React Native (0.76.x)
- **Development Tool:** Expo SDK 52+
- **Navigation:** React Navigation 6.x
- **State Management:** React Context API + Hooks (useState, useReducer)
- **UI Components:** React Native Paper or Native Base (optional)
- **Icons:** @expo/vector-icons or lucide-react-native
- **Animations:** React Native Reanimated 3.x, Lottie React Native

#### 5.1.2 Backend
- **Authentication:** Firebase Authentication (free tier)
- **Database:** Firebase Firestore (free tier - 1GB storage, 50K reads/day)
- **Storage:** Firebase Storage (free tier - 5GB storage)
- **Analytics:** Firebase Analytics (free)
- **Notifications:** Expo Notifications + Firebase Cloud Messaging

#### 5.1.3 Local Storage
- **Primary:** AsyncStorage (Expo)
- **Secure Storage:** Expo SecureStore (for sensitive data)
- **File System:** Expo FileSystem (for audio/image caching)

#### 5.1.4 Audio
- **Playback:** Expo AV
- **Speech Recognition:** Expo Speech (for speaking exercises)
- **Text-to-Speech:** Expo Speech (for pronunciation)

#### 5.1.5 Additional Libraries
- **Charts:** react-native-chart-kit or victory-native
- **Calendar Heatmap:** react-native-calendar-heatmap
- **Progress Circles:** react-native-circular-progress
- **Animations:** lottie-react-native
- **Date/Time:** date-fns or dayjs

### 5.2 Architecture

#### 5.2.1 Application Structure
```
/src
  /assets
    /images
    /audio
    /animations
  /components
    /common (Button, Card, ProgressBar, etc.)
    /lesson (Question, AnswerOption, etc.)
    /home (SkillTree, SkillItem, etc.)
  /screens
    /auth (Login, Signup, ForgotPassword)
    /home (HomeScreen)
    /lesson (LessonScreen, LessonComplete)
    /profile (ProfileScreen, SettingsScreen)
    /practice (PracticeScreen)
  /navigation
    AppNavigator.js
  /services
    firebase.js
    authService.js
    lessonService.js
  /context
    AuthContext.js
    ProgressContext.js
    LanguageContext.js
  /utils
    validators.js
    helpers.js
  /data
    /lessons (JSON files for each language)
    /skills
  /hooks
    useAuth.js
    useProgress.js
  App.js
```

#### 5.2.2 Data Models

**User Model:**
```json
{
  "uid": "string",
  "email": "string",
  "displayName": "string",
  "photoURL": "string",
  "createdAt": "timestamp",
  "currentStreak": "number",
  "longestStreak": "number",
  "totalXP": "number",
  "dailyXPGoal": "number",
  "languages": ["array of language IDs"],
  "achievements": ["array of achievement IDs"],
  "settings": {
    "soundEnabled": "boolean",
    "speakingEnabled": "boolean",
    "notificationsEnabled": "boolean",
    "notificationTime": "string"
  }
}
```

**Progress Model (per language):**
```json
{
  "userId": "string",
  "languageId": "string",
  "level": "number",
  "totalXP": "number",
  "skills": {
    "skillId": {
      "level": "number (0-5)",
      "completedLessons": ["array"],
      "lastPracticed": "timestamp"
    }
  },
  "vocabulary": ["array of learned word IDs"],
  "lastActiveDate": "timestamp"
}
```

**Lesson Model:**
```json
{
  "id": "string",
  "skillId": "string",
  "level": "number",
  "exercises": [
    {
      "type": "translation|multipleChoice|listening|speaking|matching",
      "question": "string",
      "questionAudio": "string (URL)",
      "options": ["array"],
      "correctAnswer": "string|array",
      "explanation": "string",
      "newWords": ["array of word objects"]
    }
  ]
}
```

**Skill Model:**
```json
{
  "id": "string",
  "languageId": "string",
  "name": "string",
  "description": "string",
  "icon": "string",
  "position": "number",
  "requiredSkills": ["array"],
  "levels": "number (usually 5)",
  "lessonsPerLevel": "number"
}
```

### 5.3 Firebase Configuration

#### 5.3.1 Firestore Collections
- **users:** User profiles and settings
- **progress:** Learning progress per user per language
- **leaderboards:** Weekly XP scores (optional)
- **achievements:** Achievement definitions
- **app_config:** App-wide settings and feature flags

#### 5.3.2 Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /progress/{progressId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    match /leaderboards/{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // Server-side only
    }
  }
}
```

#### 5.3.3 Firebase Storage Structure
```
/audio
  /{languageId}
    /{wordId}.mp3
    /{sentenceId}.mp3
/images
  /profile_pictures
    /{userId}.jpg
```

### 5.4 Content Storage Strategy

**Bundled Content:**
- Skill tree structure (JSON files)
- Lesson content (JSON files)
- Essential audio files (frequently used words)
- Images and icons
- Store in `/assets` folder, included in app bundle

**Remote Content:**
- User-generated data (progress, achievements)
- Leaderboard data
- Additional audio files (lazy load)
- App configuration

**Caching Strategy:**
- Cache audio files after first play
- Store in Expo FileSystem
- Implement cache management (clear old files)

### 5.5 Offline Functionality

**Requirements:**
- Users can complete lessons offline
- Progress syncs when back online
- Audio must be pre-cached for offline play
- Graceful degradation for features requiring internet

**Implementation:**
- Use NetInfo to detect connectivity
- Queue actions (lesson completion, XP gain) locally
- Sync queue when connection restored
- Show offline indicator in UI

### 5.6 Performance Requirements
- App launch time: < 3 seconds
- Screen navigation: < 300ms
- Lesson loading: < 1 second
- Audio playback latency: < 200ms
- Smooth animations: 60 FPS
- App size: < 100 MB (bundled content)

### 5.7 Security Requirements
- Secure password storage (Firebase handles this)
- No hardcoded API keys (use environment variables)
- Input validation on all user inputs
- Secure storage for sensitive data (SecureStore)
- HTTPS for all network requests

---

## 6. NON-FUNCTIONAL REQUIREMENTS

### 6.1 Usability
- Intuitive interface requiring minimal learning curve
- Consistent UI patterns across all screens
- Clear visual hierarchy and information architecture
- Helpful onboarding tutorial for first-time users
- Error messages should be clear and actionable

### 6.2 Reliability
- App uptime: 99.5% (dependent on Firebase)
- Crash-free rate: > 99%
- Graceful error handling for network failures
- Automatic data backup and recovery

### 6.3 Performance
- Support for devices from 2GB RAM onwards
- Battery efficient (minimal background activity)
- Efficient memory usage (< 200MB average)
- Fast response times as specified in section 5.6

### 6.4 Scalability
- Support for 10,000+ concurrent users (Firebase free tier limit)
- Ability to add new languages without major refactoring
- Modular content structure for easy expansion
- Database queries optimized for large datasets

### 6.5 Maintainability
- Well-documented code with comments
- Modular architecture with separation of concerns
- Version control using Git
- Automated testing for critical functions
- Configuration-based feature flags

### 6.6 Portability
- Cross-platform support (iOS and Android) from single codebase
- Responsive design for various screen sizes
- Support for tablets as well as phones

### 6.7 Localization
- Support for multiple instruction languages (future scope)
- Date/time formatting based on user locale
- Right-to-left text support if needed

---

## 7. SYSTEM CONSTRAINTS

### 7.1 Budget Constraints
- Zero recurring costs (free tier services only)
- Firebase free tier limits:
  - Firestore: 1GB storage, 50K reads/day, 20K writes/day
  - Storage: 5GB total, 1GB/day downloads
  - Authentication: Unlimited users
- Expo free tier for development and deployment

### 7.2 Development Constraints
- Development time: 4-6 months (final year project timeline)
- Team size: 1-4 developers
- Must use React Native with Expo (no native code)
- Cannot use paid APIs or services

### 7.3 Technical Constraints
- Limited to features supported by Expo managed workflow
- Cannot implement advanced native features without ejecting
- Speech recognition accuracy limited by device capabilities
- Offline storage limited by device capacity

---

## 8. TESTING REQUIREMENTS

### 8.1 Unit Testing
- Test utility functions and business logic
- Use Jest for unit testing
- Minimum 70% code coverage for critical modules
- Test data models and validation logic

### 8.2 Integration Testing
- Test Firebase integration (auth, database, storage)
- Test navigation flows
- Test state management across components
- Use React Testing Library

### 8.3 UI Testing
- Test user interactions on key screens
- Verify responsive layouts on different screen sizes
- Test accessibility features
- Manual testing on iOS and Android devices

### 8.4 User Acceptance Testing
- Beta testing with 20-50 users
- Gather feedback on UX and content quality
- Test on various devices (budget phones, flagships)
- Measure engagement metrics (completion rates, retention)

### 8.5 Performance Testing
- Load testing with simulated users
- Memory profiling to detect leaks
- Battery consumption testing
- Network performance testing (slow 3G simulation)

---

## 9. DEPLOYMENT AND MAINTENANCE

### 9.1 Deployment Strategy
- **Development:** Expo Go app for testing
- **Staging:** Expo EAS Build for internal testing
- **Production:** 
  - Android: Google Play Store (APK/AAB)
  - iOS: Apple App Store (TestFlight beta → public release)

### 9.2 Version Control
- Git repository (GitHub/GitLab)
- Branching strategy: main, develop, feature branches
- Regular commits with descriptive messages
- Code reviews before merging

### 9.3 CI/CD Pipeline
- Automated builds using EAS Build
- Automated testing on commit
- Staged rollout for updates
- Monitoring with Firebase Crashlytics

### 9.4 Maintenance Plan
- Bug fixes: Priority-based (critical < 24hrs)
- Content updates: Monthly new lessons/skills
- Feature updates: Quarterly major releases
- Security patches: As needed
- User support: In-app feedback form

---

## 10. PROJECT TIMELINE

### Phase 1: Planning and Design (Weeks 1-3)
- Requirements finalization
- UI/UX design and mockups
- Database schema design
- Technology setup

### Phase 2: Core Development (Weeks 4-12)
- Authentication system
- Lesson engine and exercise types
- Skill tree and navigation
- Progress tracking
- Gamification features

### Phase 3: Content Creation (Weeks 8-14)
- Create lessons for all 5 languages
- Record/source audio files
- Create images and illustrations
- Write grammar tips and explanations

### Phase 4: Testing and Refinement (Weeks 13-16)
- Unit and integration testing
- Bug fixes
- Performance optimization
- Beta testing

### Phase 5: Deployment (Weeks 17-18)
- App store submission
- Documentation
- Final presentation preparation

