#!/bin/bash

# Google Sign-In Quick Setup Helper
# This script helps you gather the information needed for Google Sign-In setup

echo "========================================="
echo "Google Sign-In Setup Helper for Vocabree"
echo "========================================="
echo ""

# 1. Package Name
echo "✓ Package Name (Android): com.srivatsajoshi2005.vocabree"
echo "✓ Bundle ID (iOS): com.srivatsajoshi2005.vocabree"
echo ""

# 2. Get Expo Username
echo "Getting your Expo username..."
EXPO_USER=$(npx expo whoami 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✓ Expo Username: $EXPO_USER"
    echo "✓ Redirect URI: https://auth.expo.io/@$EXPO_USER/vocabree"
else
    echo "⚠ Could not get Expo username. Run: npx expo whoami"
    echo "  Then use: https://auth.expo.io/@YOUR_USERNAME/vocabree"
fi
echo ""

# 3. Get SHA-1 Fingerprint
echo "Getting SHA-1 fingerprint for Android debug keystore..."
if [ -f ~/.android/debug.keystore ]; then
    echo "✓ Debug keystore found"
    echo ""
    echo "SHA-1 Fingerprint:"
    keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android 2>/dev/null | grep "SHA1:" | cut -d' ' -f3
    echo ""
else
    echo "⚠ Debug keystore not found at ~/.android/debug.keystore"
    echo "  You may need to run your Android app once to generate it"
fi

echo ""
echo "========================================="
echo "Next Steps:"
echo "========================================="
echo ""
echo "1. Go to Google Cloud Console:"
echo "   https://console.cloud.google.com/"
echo ""
echo "2. Create 3 OAuth Client IDs:"
echo "   a) Android - Use package name and SHA-1 above"
echo "   b) iOS - Use bundle ID above"
echo "   c) Web - Get from Firebase Console"
echo ""
echo "3. Add Redirect URI to Web Client:"
echo "   Use the redirect URI shown above"
echo ""
echo "4. Update LoginScreen.js and SignupScreen.js"
echo "   Replace the placeholder client IDs"
echo ""
echo "5. Restart Expo server"
echo ""
echo "For detailed instructions, see:"
echo "  GOOGLE_SIGNIN_SETUP.md"
echo ""
