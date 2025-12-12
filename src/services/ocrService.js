/**
 * OCR Service
 * Handles text extraction from images using cloud-based OCR
 * Works with Expo Go (no native modules required)
 * 
 * SETUP REQUIRED: Get a free API key from https://ocr.space/ocrapi
 * 1. Visit https://ocr.space/ocrapi
 * 2. Sign up for a free account
 * 3. Copy your API key
 * 4. Replace the OCR_SPACE_API_KEY value below with your key
 */

import * as FileSystem from 'expo-file-system/legacy';

// OCR.space API Key - Get yours at https://ocr.space/ocrapi
// Free tier: 25,000 requests/month
const OCR_SPACE_API_KEY = 'K85621316988957';

/**
 * Extract text from image using OCR.space API
 * Uses base64 encoding which works better with Expo
 * 
 * @param {string} imageUri - URI of the image to process
 * @param {string} apiKey - Optional API key (overrides default if provided)
 */
export const extractTextFromImage = async (imageUri, apiKey = null) => {
    try {
        console.log('🔍 Starting OCR extraction for:', imageUri);

        // Use provided API key or fall back to default
        const apiKeyToUse = apiKey || OCR_SPACE_API_KEY;

        // Check if API key is configured
        if (!apiKeyToUse || apiKeyToUse === 'YOUR_OCR_SPACE_API_KEY_HERE') {
            throw new Error(
                'OCR API key not configured. Please get a free API key from https://ocr.space/ocrapi and update OCR_SPACE_API_KEY in src/services/ocrService.js'
            );
        }

        // Convert image to base64
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: 'base64', // Use string instead of FileSystem.EncodingType.Base64
        });

        console.log('📦 Image converted to base64, length:', base64.length);

        // Create form data with base64
        const formData = new FormData();
        formData.append('base64Image', `data:image/jpeg;base64,${base64}`);
        formData.append('language', 'eng');
        formData.append('isOverlayRequired', 'false');
        formData.append('detectOrientation', 'true');
        formData.append('scale', 'true');
        formData.append('OCREngine', '2');
        formData.append('apikey', apiKeyToUse); // Add API key to request

        console.log('📤 Sending request to OCR.space API...');

        // Call OCR.space API
        const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            body: formData,
        });

        console.log('📥 OCR API Response status:', ocrResponse.status);

        const responseText = await ocrResponse.text();
        console.log('📄 Raw response:', responseText.substring(0, 500)); // Log first 500 chars

        // Check for HTTP errors (like 403 Forbidden)
        if (ocrResponse.status === 403) {
            throw new Error(
                'OCR API key is invalid or not provided. Please get a free API key from https://ocr.space/ocrapi and update OCR_SPACE_API_KEY in src/services/ocrService.js'
            );
        }

        if (!ocrResponse.ok) {
            throw new Error(`OCR API request failed with status ${ocrResponse.status}`);
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('❌ Failed to parse JSON response');
            throw new Error('Invalid response from OCR service');
        }

        console.log('📊 OCR Result status:', result.OCRExitCode, result.IsErroredOnProcessing);

        // Check for errors in response
        if (result.IsErroredOnProcessing) {
            const errorMsg = Array.isArray(result.ErrorMessage)
                ? result.ErrorMessage[0]
                : result.ErrorMessage || 'OCR processing failed';
            console.error('❌ OCR processing error:', errorMsg);
            
            // Provide helpful message for API key errors
            if (errorMsg.includes('API Key') || errorMsg.includes('apikey')) {
                throw new Error(
                    'OCR API key error. Please get a free API key from https://ocr.space/ocrapi and update OCR_SPACE_API_KEY in src/services/ocrService.js'
                );
            }
            
            throw new Error(errorMsg);
        }

        // Check if we have results
        if (!result.ParsedResults || result.ParsedResults.length === 0) {
            console.error('❌ No parsed results returned');
            throw new Error('No text detected in image');
        }

        // Extract text from all parsed results
        const extractedText = result.ParsedResults
            .map((parsed) => parsed.ParsedText || '')
            .join(' ')
            .trim();

        console.log('✅ Extracted text length:', extractedText.length);
        if (extractedText) {
            console.log('✅ Extracted text preview:', extractedText.substring(0, 200));
        }

        if (!extractedText) {
            throw new Error('No text found in the image. Please try an image with clear text.');
        }

        return extractedText;
    } catch (error) {
        console.error('❌ OCR extraction error:', error);

        // Provide more helpful error messages
        if (error.message && error.message.includes('Network request failed')) {
            throw new Error('Network error. Please check your internet connection.');
        }

        if (error.message && error.message.includes('No text')) {
            throw new Error('No text detected. Please try an image with clear, readable text.');
        }

        throw new Error(error.message || 'Failed to extract text from image. Please try again.');
    }
};

/**
 * Alternative: Extract text using Google Cloud Vision API
 * Requires API key - set GOOGLE_VISION_API_KEY
 */
export const extractTextWithGoogleVision = async (imageUri, apiKey) => {
    try {
        console.log('🔍 Starting Google Vision OCR for:', imageUri);

        // Convert image to base64
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: 'base64',
        });

        console.log('📤 Sending request to Google Vision API...');

        // Call Google Cloud Vision API
        const visionResponse = await fetch(
            `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requests: [
                        {
                            image: {
                                content: base64,
                            },
                            features: [
                                {
                                    type: 'TEXT_DETECTION',
                                    maxResults: 1,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        const result = await visionResponse.json();
        console.log('📄 Google Vision Result:', JSON.stringify(result, null, 2));

        if (result.responses?.[0]?.error) {
            throw new Error(result.responses[0].error.message);
        }

        const textAnnotations = result.responses?.[0]?.textAnnotations;
        if (!textAnnotations || textAnnotations.length === 0) {
            throw new Error('No text detected in image');
        }

        // First annotation contains the full text
        const extractedText = textAnnotations[0].description.trim();
        console.log('✅ Extracted text:', extractedText);

        return extractedText;
    } catch (error) {
        console.error('❌ Google Vision OCR error:', error);
        throw new Error(error.message || 'Failed to extract text using Google Vision');
    }
};

export default {
    extractTextFromImage,
    extractTextWithGoogleVision,
};
