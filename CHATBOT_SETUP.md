# AI Chatbot Setup Instructions

## Overview
The AI chatbot feature uses Google's Gemini AI model to provide intelligent, dyslexia-friendly math learning assistance.

## Setup Instructions

### 1. Get a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an account or sign in with your Google account
3. Click "Create API key"
4. Choose "Create API key in new project" or select an existing project
5. Copy the generated API key (keep it secure)

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and replace `your_gemini_api_key_here` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=your-actual-api-key-here
   ```

### 3. Security Considerations

**Important**: This implementation exposes the API key in the frontend, which is only suitable for development and prototyping.

For production, you should:
- Create a backend API endpoint that handles Gemini AI requests
- Store the API key securely on the server side
- Implement proper authentication and rate limiting
- Use environment variables on the server (not client-side)

### 4. Fallback Mode
If no API key is configured, the chatbot will automatically use pre-written fallback responses that still provide helpful learning guidance.

## Chatbot Features

### AI Assistant Capabilities
- **Math Help**: Explains algebra, geometry, fractions, and other math concepts
- **Step-by-Step Guidance**: Breaks down complex problems into manageable steps
- **Dyslexia-Friendly**: Uses clear, simple language and short sentences
- **Encouraging**: Provides positive reinforcement and motivation
- **Adaptive**: Remembers conversation context for better assistance

### User Interface
- **Floating Action Button**: Always accessible chat button in bottom-right
- **Full-Screen Mobile**: Responsive design that works on all devices
- **Voice Integration**: Can read AI responses aloud using text-to-speech
- **Message History**: Maintains conversation context during the session
- **Typing Indicators**: Shows when AI is generating a response

## Usage
1. Click the chat button (💬) in the bottom-right corner
2. Type your math question or request for help
3. Press Enter or click Send
4. The AI will provide personalized, learning-focused assistance
5. Use the speaker button to hear responses read aloud

## Cost Considerations
- Google Gemini AI has generous free tier limits
- Free tier includes up to 15 requests per minute and 1,500 requests per day
- Paid plans available for higher usage
- Monitor usage through Google AI Studio

## Troubleshooting

### Common Issues
1. **"I need an API key to work properly"**: Set up your API key in `.env.local`
2. **"Rate limit exceeded"**: You're making too many requests, wait and try again
3. **"Quota exceeded"**: You've reached your Gemini usage limit, check your account
4. **Connection errors**: Check internet connection and API key validity

### Development Mode
When developing without an API key, the chatbot provides helpful pre-written responses for common math topics and learning scenarios.