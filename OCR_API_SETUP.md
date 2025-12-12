# OCR API Setup Guide

The OCR (Optical Character Recognition) feature requires an API key from OCR.space to extract text from images.

## Quick Setup

### Step 1: Get Your Free API Key

1. Visit **https://ocr.space/ocrapi**
2. Click **"Sign Up"** or **"Get API Key"**
3. Create a free account (no credit card required)
4. Copy your API key from the dashboard

### Step 2: Add API Key to Your App

1. Open `src/services/ocrService.js`
2. Find this line near the top:
   ```javascript
   const OCR_SPACE_API_KEY = 'YOUR_OCR_SPACE_API_KEY_HERE';
   ```
3. Replace `'YOUR_OCR_SPACE_API_KEY_HERE'` with your actual API key:
   ```javascript
   const OCR_SPACE_API_KEY = 'helloworld'; // Your actual key
   ```

### Step 3: Test It

1. Run your app
2. Navigate to the Image Translator screen
3. Take a photo or select an image with text
4. The OCR should now work!

## Free Tier Limits

- **25,000 requests per month** (free tier)
- Perfect for development and small-scale usage
- Upgrade available if you need more

## Alternative: Google Cloud Vision API

If you prefer to use Google Cloud Vision API instead:

1. Get a Google Cloud Vision API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Use the `extractTextWithGoogleVision` function in `ocrService.js`
3. Pass your API key as a parameter when calling the function

## Troubleshooting

### Error: "API Key is not specified"
- Make sure you've replaced `YOUR_OCR_SPACE_API_KEY_HERE` with your actual API key
- Check that there are no extra spaces or quotes around your key

### Error: "Invalid API Key"
- Verify your API key is correct
- Make sure you're using the key from your OCR.space dashboard
- Check if your free tier limit has been reached

### Error: 403 Forbidden
- Your API key might be invalid or expired
- Get a new API key from https://ocr.space/ocrapi

## Security Note

⚠️ **Important**: For production apps, consider:
- Using environment variables instead of hardcoding the API key
- Storing the API key securely (e.g., using `expo-secure-store`)
- Setting up API key restrictions in OCR.space dashboard

