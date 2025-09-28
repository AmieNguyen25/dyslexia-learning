import OpenAI from 'openai';

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

// Initialize OpenAI client
let openai: OpenAI | null = null;

// Initialize OpenAI only if API key is available
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (apiKey && apiKey !== 'your_openai_api_key_here') {
    openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for development - consider using a backend for production
    });
}

export const getChatResponse = async (message: string, previousMessages: Message[] = []): Promise<string> => {
    // If no API key is configured, use fallback responses
    if (!openai) {
        return getFallbackResponse(message);
    }

    try {
        // Build conversation context from previous messages
        const systemPrompt = `You are a helpful AI learning assistant for a dyslexia-friendly math learning app. Your role is to:

1. Help students understand math concepts in simple, clear language
2. Break down complex problems into smaller, manageable steps
3. Provide encouragement and positive reinforcement
4. Use visual and concrete examples when possible
5. Be patient and understanding of learning difficulties
6. Suggest alternative ways to approach problems if students are struggling
7. Keep responses concise but thorough

Remember that you're helping students who may have dyslexia, so use:
- Clear, simple language
- Short sentences
- Step-by-step explanations
- Encouraging tone
- Concrete examples over abstract concepts`;

        const conversationHistory = previousMessages.slice(-10).map(msg => ({
            role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
            content: msg.text
        }));

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                ...conversationHistory,
                { role: 'user', content: message }
            ],
            max_tokens: 300,
            temperature: 0.7,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        });

        return response.choices[0]?.message?.content ||
            "I'm sorry, I couldn't generate a response. Could you try rephrasing your question?";

    } catch (error) {
        console.error('OpenAI API Error:', error);

        if (error instanceof Error) {
            if (error.message.includes('API key')) {
                return "I need an API key to work properly. Please make sure the OpenAI API key is configured correctly.";
            } else if (error.message.includes('quota')) {
                return "I've reached my usage limit for now. Please try again later or contact support.";
            } else if (error.message.includes('rate limit')) {
                return "I'm getting too many requests right now. Please wait a moment and try again.";
            }
        }

        return "I'm having trouble connecting right now. Please try again in a moment, or feel free to continue with your studies!";
    }
};

// Alternative function for when API key is not available - provides helpful fallback responses
export const getFallbackResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
        return "I understand you need help! Here are some general tips: 1) Break the problem into smaller steps, 2) Draw pictures or diagrams when possible, 3) Try working with concrete examples first, 4) Don't hesitate to ask for clarification. What specific part are you struggling with?";
    }

    if (lowerMessage.includes('algebra') || lowerMessage.includes('equation')) {
        return "Algebra can be tricky, but remember the key rule: whatever you do to one side of an equation, do the same to the other side! Start by identifying what you're solving for, then work step by step to isolate that variable.";
    }

    if (lowerMessage.includes('fraction')) {
        return "Fractions represent parts of a whole! Think of them like pizza slices. The bottom number (denominator) tells you how many equal pieces the whole is divided into, and the top number (numerator) tells you how many pieces you have.";
    }

    if (lowerMessage.includes('geometry') || lowerMessage.includes('shape')) {
        return "Geometry is all about shapes and their properties! Try to visualize the problem or draw it out. Remember that area measures the space inside a shape, while perimeter measures the distance around it.";
    }

    if (lowerMessage.includes('word problem')) {
        return "Word problems can be challenging! Try this approach: 1) Read the problem twice, 2) Identify what you know and what you need to find, 3) Look for key words that tell you what operation to use (like 'total' for addition, 'difference' for subtraction), 4) Set up your equation, 5) Solve step by step.";
    }

    return "That's a great question! While I don't have access to my full knowledge base right now, I encourage you to: 1) Review the relevant lesson materials, 2) Try breaking the problem into smaller parts, 3) Look for similar examples in your coursework, 4) Don't give up - learning takes practice! Is there a specific concept you'd like me to help explain?";
};