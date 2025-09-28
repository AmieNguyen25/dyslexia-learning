export interface User {
    id?: string;
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

export interface LessonExample {
    id: string;
    title: string;
    problem: string;
    solution: string;
    explanation: string;
    visualAid?: string; // URL or description for visual representation
    steps?: string[]; // Step-by-step breakdown for visual learners
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // index of correct option
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAttempt {
    attemptId: string;
    lessonId: string;
    questions: QuizQuestion[];
    userAnswers: (number | null)[];
    score: number;
    passed: boolean;
    completedAt: Date;
    timeSpent: number; // in seconds
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: number; // in minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    completed: boolean;
    locked: boolean;
    topics: string[];
    examples: LessonExample[];
    quizAttempts: QuizAttempt[];
    passRequiredScore: number; // minimum score to pass (e.g., 3 out of 5)
}

export interface Course {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    level: 'elementary' | 'middle' | 'high' | 'college';
    lessons: Lesson[];
    progress: number; // percentage completed
    estimatedHours: number;
    prerequisites?: string[];
}

export interface CourseProgress {
    courseId: string;
    completedLessons: string[];
    currentLesson: string | null;
    timeSpent: number; // in minutes
    lastAccessed: Date;
}

export interface StudyGoal {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedHours: number;
    completed: boolean;
    createdAt: Date;
}

export interface StudySession {
    id: string;
    subject: string;
    startTime: string;
    endTime: string;
    topic?: string;
}

export interface WeeklySchedule {
    monday: StudySession[];
    tuesday: StudySession[];
    wednesday: StudySession[];
    thursday: StudySession[];
    friday: StudySession[];
    saturday: StudySession[];
    sunday: StudySession[];
}

export interface StudyPlan {
    id: string;
    title: string;
    description: string;
    goals: StudyGoal[];
    weeklySchedule: WeeklySchedule;
    targetCompletionDate: string;
    created: Date;
    progress: number;
}

export interface AIStudyPlanRequest {
    learningGoals: OnboardingData['learningGoals'];
    gradeLevel: OnboardingData['gradeLevel'];
    comfortLevel: OnboardingData['comfortLevel'];
    accessibilityPrefs: OnboardingData['accessibilityPrefs'];
}

export type LearningPath = 'visual' | 'auditory';
export type CurrentPage = 'dashboard' | 'lesson' | 'study-plan' | 'onboarding';