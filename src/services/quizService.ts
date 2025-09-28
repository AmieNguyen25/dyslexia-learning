import { getChatResponse } from './geminiService';
import type { QuizQuestion, Lesson, User } from '../types';

export class QuizGenerationService {
    /**
     * Generate 5 dynamic quiz questions based on lesson content and user performance
     */
    static async generateQuiz(
        lesson: Lesson,
        userPerformance: User['performance'],
        userPath: 'visual' | 'auditory'
    ): Promise<QuizQuestion[]> {
        const difficultyLevel = this.determineDifficulty(userPerformance, lesson.difficulty);

        const prompt = this.buildQuizPrompt(lesson, difficultyLevel, userPath);

        try {
            const response = await getChatResponse(prompt);
            const questions = this.parseQuizResponse(response);

            // Ensure we have exactly 5 questions
            if (questions.length !== 5) {
                console.warn(`Generated ${questions.length} questions instead of 5, padding with fallback questions`);
                return this.ensureFiveQuestions(questions, lesson);
            }

            return questions;
        } catch (error) {
            console.error('Error generating quiz with AI:', error);
            return this.generateFallbackQuiz(lesson, difficultyLevel);
        }
    }

    /**
     * Generate explanation for why an answer was incorrect
     */
    static async generateExplanation(
        question: QuizQuestion,
        userAnswer: number,
        lesson: Lesson
    ): Promise<string> {
        const prompt = `
You are a dyslexia-friendly math tutor. A student answered a question incorrectly and needs a clear, encouraging explanation.

LESSON TOPIC: ${lesson.title}
QUESTION: ${question.question}
CORRECT ANSWER: ${question.options[question.correctAnswer]}
STUDENT'S ANSWER: ${question.options[userAnswer]}

Please provide:
1. A gentle acknowledgment that it's okay to make mistakes
2. Clear explanation of why their answer was incorrect
3. Step-by-step explanation of the correct solution
4. An encouraging note to help build confidence

Keep language simple, use short sentences, and be very encouraging.
`;

        try {
            const explanation = await getChatResponse(prompt);
            return explanation;
        } catch (error) {
            console.error('Error generating explanation:', error);
            return this.getFallbackExplanation(question, userAnswer);
        }
    }

    /**
     * Determine quiz difficulty based on user performance and lesson difficulty
     */
    private static determineDifficulty(
        performance: User['performance'],
        lessonDifficulty: string
    ): 'easy' | 'medium' | 'hard' {
        const { avgQuizScore, confidenceLevel } = performance;

        // Base difficulty on lesson level
        let baseDifficulty: 'easy' | 'medium' | 'hard' = 'medium';
        if (lessonDifficulty === 'beginner') baseDifficulty = 'easy';
        if (lessonDifficulty === 'advanced') baseDifficulty = 'hard';

        // Adjust based on performance
        if (avgQuizScore < 60 || confidenceLevel < 3.0) {
            // Lower difficulty for struggling students
            if (baseDifficulty === 'hard') return 'medium';
            if (baseDifficulty === 'medium') return 'easy';
        } else if (avgQuizScore > 85 && confidenceLevel > 4.0) {
            // Increase difficulty for high performers
            if (baseDifficulty === 'easy') return 'medium';
            if (baseDifficulty === 'medium') return 'hard';
        }

        return baseDifficulty;
    }

    /**
     * Build the prompt for AI quiz generation
     */
    private static buildQuizPrompt(
        lesson: Lesson,
        difficulty: 'easy' | 'medium' | 'hard',
        userPath: 'visual' | 'auditory'
    ): string {
        const pathInstructions = userPath === 'visual'
            ? 'Focus on visual representations, diagrams, and spatial reasoning where possible.'
            : 'Focus on step-by-step verbal explanations and logical reasoning.';

        return `
You are creating a math quiz for students with dyslexia. Generate exactly 5 multiple choice questions.

LESSON: ${lesson.title}
DESCRIPTION: ${lesson.description}
TOPICS: ${lesson.topics.join(', ')}
DIFFICULTY: ${difficulty}
LEARNING PATH: ${userPath}

INSTRUCTIONS:
- Create exactly 5 multiple choice questions
- Each question should have 4 answer options (A, B, C, D)
- Questions should test understanding of: ${lesson.topics.join(', ')}
- Difficulty level: ${difficulty}
- ${pathInstructions}
- Use clear, simple language suitable for dyslexic learners
- Avoid trick questions or unnecessarily complex wording
- Include a mix of computational and conceptual questions

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:
QUESTION 1: [Question text]
A) [Option A]
B) [Option B] 
C) [Option C]
D) [Option D]
CORRECT: [A/B/C/D]
EXPLANATION: [Why this is correct]

QUESTION 2: [Question text]
A) [Option A]
B) [Option B]
C) [Option C] 
D) [Option D]
CORRECT: [A/B/C/D]
EXPLANATION: [Why this is correct]

[Continue for all 5 questions...]
`;
    }

    /**
     * Parse AI response into QuizQuestion objects
     */
    private static parseQuizResponse(response: string): QuizQuestion[] {
        const questions: QuizQuestion[] = [];
        const questionBlocks = response.split(/QUESTION \d+:/);

        questionBlocks.slice(1).forEach((block, index) => {
            try {
                const lines = block.trim().split('\n').filter(line => line.trim());
                const questionText = lines[0].trim();

                const options: string[] = [];
                let correctAnswer = 0;
                let explanation = '';

                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.match(/^[A-D]\)/)) {
                        options.push(trimmed.substring(2).trim());
                    } else if (trimmed.startsWith('CORRECT:')) {
                        const answer = trimmed.substring(8).trim().toUpperCase();
                        correctAnswer = answer.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
                    } else if (trimmed.startsWith('EXPLANATION:')) {
                        explanation = trimmed.substring(12).trim();
                    }
                });

                if (options.length === 4 && questionText && explanation) {
                    questions.push({
                        id: `q${index + 1}`,
                        question: questionText,
                        options,
                        correctAnswer,
                        explanation,
                        difficulty: 'medium' // Will be set by calling function
                    });
                }
            } catch (error) {
                console.error(`Error parsing question ${index + 1}:`, error);
            }
        });

        return questions;
    }

    /**
     * Ensure we have exactly 5 questions, padding with fallbacks if needed
     */
    private static ensureFiveQuestions(
        questions: QuizQuestion[],
        lesson: Lesson
    ): QuizQuestion[] {
        const result = [...questions];

        while (result.length < 5) {
            const fallbackQuestion = this.generateFallbackQuestion(
                result.length + 1,
                lesson.topics[0] || 'math'
            );
            result.push(fallbackQuestion);
        }

        return result.slice(0, 5); // Ensure exactly 5 questions
    }

    /**
     * Generate fallback quiz when AI fails
     */
    private static generateFallbackQuiz(
        lesson: Lesson,
        difficulty: 'easy' | 'medium' | 'hard'
    ): QuizQuestion[] {
        const questions: QuizQuestion[] = [];

        for (let i = 1; i <= 5; i++) {
            const question = this.generateFallbackQuestion(i, lesson.topics[0] || 'math');
            question.difficulty = difficulty; // Apply the difficulty level
            questions.push(question);
        }

        return questions;
    }

    /**
     * Generate a single fallback question
     */
    private static generateFallbackQuestion(questionNumber: number, topic: string): QuizQuestion {
        // Simple fallback questions based on common math topics
        const fallbackQuestions = {
            addition: {
                question: "What is 15 + 23?",
                options: ["38", "37", "39", "36"],
                correctAnswer: 0,
                explanation: "15 + 23 = 38. Add the ones place: 5 + 3 = 8. Add the tens place: 1 + 2 = 3. So the answer is 38."
            },
            algebra: {
                question: "If x + 5 = 12, what is x?",
                options: ["7", "6", "8", "5"],
                correctAnswer: 0,
                explanation: "To solve x + 5 = 12, subtract 5 from both sides: x = 12 - 5 = 7."
            },
            fractions: {
                question: "What is 1/2 + 1/4?",
                options: ["3/4", "2/6", "1/3", "2/4"],
                correctAnswer: 0,
                explanation: "To add fractions, find a common denominator. 1/2 = 2/4, so 2/4 + 1/4 = 3/4."
            }
        };

        // Choose question type based on topic
        let questionData = fallbackQuestions.algebra;
        if (topic.toLowerCase().includes('addition') || topic.toLowerCase().includes('counting')) {
            questionData = fallbackQuestions.addition;
        } else if (topic.toLowerCase().includes('fraction')) {
            questionData = fallbackQuestions.fractions;
        }

        return {
            id: `fallback-q${questionNumber}`,
            question: questionData.question,
            options: questionData.options,
            correctAnswer: questionData.correctAnswer,
            explanation: questionData.explanation,
            difficulty: 'medium'
        };
    }

    /**
     * Generate fallback explanation when AI fails
     */
    private static getFallbackExplanation(question: QuizQuestion, userAnswer: number): string {
        return `That's not quite right, but don't worry! The correct answer is "${question.options[question.correctAnswer]}". 

Your answer was "${question.options[userAnswer]}". 

Here's why the correct answer is right: ${question.explanation}

Remember, making mistakes is part of learning. You're doing great by practicing these problems!`;
    }
}