export interface User {
    name: string;
    email?: string;
    preferredPath: 'visual' | 'auditory';
    adaptationHistory: string[];
    performance: {
        avgQuizScore: number;
        avgTimeOnTask: number;
        confidenceLevel: number;
    };
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    preferredPath: 'visual' | 'auditory';
}

export interface VisualStep {
    step: string;
    explanation: string;
}

export interface AccessibilitySettings {
    fontSize: number;
    lineSpacing: number;
}

export interface OnboardingData {
    gradeLevel: 'elementary' | 'middle' | 'high' | 'college';
    comfortLevel: 'beginner' | 'some-experience' | 'comfortable' | 'advanced';
    learningGoals: ('homework-help' | 'test-prep' | 'concept-review' | 'skill-building' | 'confidence-boost')[];
    accessibilityPrefs: {
        fontSize: number;
        highContrast: boolean;
        audioEnabled: boolean;
        reducedMotion: boolean;
    };
}

export type LearningPath = 'visual' | 'auditory';
export type CurrentPage = 'dashboard' | 'lesson' | 'onboarding';