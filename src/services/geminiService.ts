import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIStudyPlanRequest, StudyPlan, StudyGoal } from '../types';

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

// Initialize Gemini AI client
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

// Initialize Gemini only if API key is available
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
}

export const getChatResponse = async (message: string, previousMessages: Message[] = []): Promise<string> => {
    // If no API key is configured, use fallback responses
    if (!model) {
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

        // Build conversation history
        let conversationContext = systemPrompt + "\n\n";

        // Include recent conversation history (last 10 messages)
        const recentMessages = previousMessages.slice(-10);
        for (const msg of recentMessages) {
            conversationContext += `${msg.sender === 'user' ? 'Student' : 'Assistant'}: ${msg.text}\n`;
        }

        conversationContext += `Student: ${message}\nAssistant:`;

        const result = await model.generateContent(conversationContext);
        const response = await result.response;
        const text = response.text();

        return text || "I'm sorry, I couldn't generate a response. Could you try rephrasing your question?";

    } catch (error) {
        console.error('Gemini AI Error:', error);

        if (error instanceof Error) {
            if (error.message.includes('API_KEY')) {
                return "I need an API key to work properly. Please make sure the Gemini API key is configured correctly.";
            } else if (error.message.includes('quota') || error.message.includes('QUOTA_EXCEEDED')) {
                return "I've reached my usage limit for now. Please try again later or contact support.";
            } else if (error.message.includes('rate') || error.message.includes('RATE_LIMIT')) {
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

export const generateAIStudyPlan = async (request: AIStudyPlanRequest): Promise<StudyPlan> => {
    // If no API key is configured, use fallback study plan generation
    if (!model) {
        return generateFallbackStudyPlan(request);
    }

    try {
        const systemPrompt = `You are an AI educational assistant specialized in creating personalized study plans for students with dyslexia. Your role is to create a comprehensive, accessible, and effective study plan based on the student's specific needs and goals.

Given the student's information, create a detailed study plan that includes:
1. A clear, motivating title and description
2. 3-5 specific, actionable study goals with realistic time estimates
3. Goals should be prioritized based on the student's learning objectives
4. Consider the student's grade level and comfort level when setting expectations
5. Make the plan dyslexia-friendly with clear, simple language and manageable chunks

Learning Goals Mapping:
- homework-help: Focus on daily assignment support and practice problems
- test-prep: Emphasize practice tests, review sessions, and exam strategies
- concept-review: Target fundamental concept reinforcement and understanding
- skill-building: Advanced problem-solving and new technique development
- confidence-boost: Achievable milestones and positive reinforcement activities

Grade Level Considerations:
- elementary: Basic concepts, visual aids, short study sessions
- middle: Foundational algebra, step-by-step approaches, moderate complexity
- high: Advanced algebra, test preparation, college readiness
- college: Complex problem-solving, independent study strategies

Comfort Level Adjustments:
- beginner: Start with fundamentals, provide extensive support
- some-experience: Build on existing knowledge, moderate challenges
- comfortable: Regular practice with some advanced topics
- advanced: Challenging problems and accelerated learning

Please respond with a JSON object containing the study plan structure.`;

        const userPrompt = `Create a personalized study plan for a student with the following characteristics:

Learning Goals: ${request.learningGoals.join(', ')}
Grade Level: ${request.gradeLevel}
Comfort Level: ${request.comfortLevel}
Accessibility Preferences: 
- Audio enabled: ${request.accessibilityPrefs.audioEnabled}
- High contrast: ${request.accessibilityPrefs.highContrast}
- Reduced motion: ${request.accessibilityPrefs.reducedMotion}

Create a study plan with:
1. An inspiring title and description
2. 3-5 specific study goals that align with their learning objectives
3. Each goal should have a title, description, priority level (high/medium/low), and estimated hours
4. Goals should be appropriate for their grade level and comfort level
5. Consider dyslexia-friendly approaches in the goal descriptions

Return the response as a JSON object with this structure:
{
  "title": "Study Plan Title",
  "description": "Detailed plan description",
  "goals": [
    {
      "title": "Goal Title",
      "description": "Goal description with specific, actionable steps",
      "priority": "high|medium|low",
      "estimatedHours": number
    }
  ]
}`;

        const fullPrompt = systemPrompt + "\n\n" + userPrompt;
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        // Try to parse the JSON response
        try {
            const aiResponse = JSON.parse(text);

            // Create the study plan object
            const studyPlan: StudyPlan = {
                id: `ai-plan-${Date.now()}`,
                title: aiResponse.title || 'AI Generated Study Plan',
                description: aiResponse.description || 'Personalized study plan created by AI',
                goals: aiResponse.goals?.map((goal: any, index: number) => ({
                    id: `goal-${Date.now()}-${index}`,
                    title: goal.title || 'Study Goal',
                    description: goal.description || 'Study goal description',
                    priority: goal.priority || 'medium',
                    estimatedHours: goal.estimatedHours || 2,
                    completed: false,
                    createdAt: new Date()
                })) || [],
                weeklySchedule: {
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: [],
                    sunday: []
                },
                targetCompletionDate: '',
                created: new Date(),
                progress: 0
            };

            return studyPlan;
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', parseError);
            return generateFallbackStudyPlan(request);
        }

    } catch (error) {
        console.error('Gemini AI Error in study plan generation:', error);
        return generateFallbackStudyPlan(request);
    }
};

export const generateFallbackStudyPlan = (request: AIStudyPlanRequest): StudyPlan => {
    const { learningGoals, gradeLevel, comfortLevel } = request;

    // Create fallback goals based on learning objectives
    const fallbackGoals: StudyGoal[] = [];

    if (learningGoals.includes('homework-help')) {
        fallbackGoals.push({
            id: `goal-${Date.now()}-hw`,
            title: 'Daily Homework Support',
            description: 'Set up a structured approach to tackle daily math assignments with step-by-step problem solving and review sessions.',
            priority: 'high',
            estimatedHours: 1,
            completed: false,
            createdAt: new Date()
        });
    }

    if (learningGoals.includes('test-prep')) {
        fallbackGoals.push({
            id: `goal-${Date.now()}-test`,
            title: 'Test Preparation Strategy',
            description: 'Develop effective study techniques for upcoming exams, including practice tests and time management skills.',
            priority: 'high',
            estimatedHours: 3,
            completed: false,
            createdAt: new Date()
        });
    }

    if (learningGoals.includes('concept-review')) {
        fallbackGoals.push({
            id: `goal-${Date.now()}-concept`,
            title: 'Foundation Concept Review',
            description: 'Strengthen understanding of key algebraic concepts through visual aids and interactive practice exercises.',
            priority: 'medium',
            estimatedHours: 2,
            completed: false,
            createdAt: new Date()
        });
    }

    if (learningGoals.includes('skill-building')) {
        fallbackGoals.push({
            id: `goal-${Date.now()}-skill`,
            title: 'Advanced Problem-Solving Skills',
            description: 'Build confidence with challenging problems and learn new techniques for complex algebraic equations.',
            priority: 'medium',
            estimatedHours: 2,
            completed: false,
            createdAt: new Date()
        });
    }

    if (learningGoals.includes('confidence-boost')) {
        fallbackGoals.push({
            id: `goal-${Date.now()}-confidence`,
            title: 'Confidence Building Activities',
            description: 'Practice with achievable challenges and celebrate progress to build mathematical confidence and reduce anxiety.',
            priority: 'low',
            estimatedHours: 1,
            completed: false,
            createdAt: new Date()
        });
    }

    // If no specific goals selected, add a general goal
    if (fallbackGoals.length === 0) {
        fallbackGoals.push({
            id: `goal-${Date.now()}-general`,
            title: 'General Math Improvement',
            description: 'Improve overall mathematical understanding and problem-solving abilities through regular practice and review.',
            priority: 'medium',
            estimatedHours: 2,
            completed: false,
            createdAt: new Date()
        });
    }

    const levelDescriptions = {
        elementary: 'elementary-level concepts with visual aids and simple explanations',
        middle: 'middle school algebra fundamentals with step-by-step guidance',
        high: 'high school algebra topics with college preparation focus',
        college: 'advanced algebraic concepts with independent study strategies'
    };

    const comfortDescriptions = {
        beginner: 'starting from the basics with plenty of support',
        'some-experience': 'building on your existing knowledge',
        comfortable: 'advancing your current skills',
        advanced: 'tackling challenging problems and advanced techniques'
    };

    return {
        id: `fallback-plan-${Date.now()}`,
        title: `Personalized ${gradeLevel.charAt(0).toUpperCase() + gradeLevel.slice(1)} Math Study Plan`,
        description: `A customized study plan designed for ${levelDescriptions[gradeLevel]}, ${comfortDescriptions[comfortLevel]}. This plan focuses on ${learningGoals.join(', ').replace(/,([^,]*)$/, ', and$1')} to help you achieve your learning objectives.`,
        goals: fallbackGoals,
        weeklySchedule: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        },
        targetCompletionDate: '',
        created: new Date(),
        progress: 0
    };
};