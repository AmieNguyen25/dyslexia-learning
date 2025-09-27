export interface User {
    name: string;
    preferredPath: 'visual' | 'auditory';
    adaptationHistory: string[];
    performance: {
        avgQuizScore: number;
        avgTimeOnTask: number;
        confidenceLevel: number;
    };
}

export interface VisualStep {
    step: string;
    explanation: string;
}

export interface AccessibilitySettings {
    fontSize: number;
    lineSpacing: number;
}

export type LearningPath = 'visual' | 'auditory';
export type CurrentPage = 'dashboard' | 'lesson';