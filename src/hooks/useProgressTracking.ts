import { useState, useEffect } from 'react';
import type { Course, QuizAttempt, CourseProgress } from '../types';

const STORAGE_KEY_PROGRESS = 'dyslexia-app-progress';

interface LessonProgress {
    lessonId: string;
    courseId: string;
    completed: boolean;
    attempts: QuizAttempt[];
    bestScore: number;
    timeSpent: number;
    completedAt?: Date;
}

interface ProgressState {
    lessons: { [lessonId: string]: LessonProgress };
    courses: { [courseId: string]: CourseProgress };
}

const defaultProgress: ProgressState = {
    lessons: {},
    courses: {}
};

export const useProgressTracking = () => {
    const [progress, setProgress] = useState<ProgressState>(defaultProgress);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load progress from localStorage on mount
    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
            if (savedProgress) {
                const parsed = JSON.parse(savedProgress);
                // Convert date strings back to Date objects
                Object.values(parsed.lessons).forEach((lesson: any) => {
                    if (lesson.completedAt) {
                        lesson.completedAt = new Date(lesson.completedAt);
                    }
                    lesson.attempts?.forEach((attempt: any) => {
                        attempt.completedAt = new Date(attempt.completedAt);
                    });
                });
                Object.values(parsed.courses).forEach((course: any) => {
                    if (course.lastAccessed) {
                        course.lastAccessed = new Date(course.lastAccessed);
                    }
                });
                setProgress(parsed);
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save progress to localStorage whenever it changes
    const saveProgress = (newProgress: ProgressState) => {
        setProgress(newProgress);
        localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(newProgress));
    };

    // Complete a lesson
    const completeLesson = (courseId: string, lessonId: string, attempt: QuizAttempt) => {
        const newProgress = { ...progress };

        // Update lesson progress
        const existingLesson = newProgress.lessons[lessonId] || {
            lessonId,
            courseId,
            completed: false,
            attempts: [],
            bestScore: 0,
            timeSpent: 0
        };

        const updatedLesson: LessonProgress = {
            ...existingLesson,
            completed: attempt.passed,
            attempts: [...existingLesson.attempts, attempt],
            bestScore: Math.max(existingLesson.bestScore, attempt.score),
            timeSpent: existingLesson.timeSpent + attempt.timeSpent,
            completedAt: attempt.passed ? attempt.completedAt : existingLesson.completedAt
        };

        newProgress.lessons[lessonId] = updatedLesson;

        // Update course progress
        const courseProgress = calculateCourseProgress(courseId, newProgress.lessons);
        newProgress.courses[courseId] = {
            courseId,
            completedLessons: courseProgress.completedLessons,
            currentLesson: courseProgress.currentLesson,
            timeSpent: courseProgress.totalTimeSpent,
            lastAccessed: new Date()
        };

        saveProgress(newProgress);
        return updatedLesson;
    };

    // Calculate course progress based on completed lessons
    const calculateCourseProgress = (courseId: string, lessonProgress: { [lessonId: string]: LessonProgress }) => {
        const courseLessons = Object.values(lessonProgress).filter(lesson => lesson.courseId === courseId);
        const completedLessons = courseLessons.filter(lesson => lesson.completed).map(lesson => lesson.lessonId);
        const totalTimeSpent = courseLessons.reduce((total, lesson) => total + lesson.timeSpent, 0);

        // Find current lesson (first incomplete lesson)
        const incompleteLessons = courseLessons.filter(lesson => !lesson.completed);
        const currentLesson = incompleteLessons.length > 0 ? incompleteLessons[0].lessonId : null;

        return {
            completedLessons,
            currentLesson,
            totalTimeSpent
        };
    };

    // Get progress percentage for a course
    const getCourseProgressPercentage = (course: Course): number => {
        if (!course.lessons || course.lessons.length === 0) return 0;

        const completedCount = course.lessons.filter(lesson =>
            progress.lessons[lesson.id]?.completed || false
        ).length;

        return Math.round((completedCount / course.lessons.length) * 100);
    };

    // Get lesson progress
    const getLessonProgress = (lessonId: string): LessonProgress | null => {
        return progress.lessons[lessonId] || null;
    };

    // Check if lesson is completed
    const isLessonCompleted = (lessonId: string): boolean => {
        return progress.lessons[lessonId]?.completed || false;
    };

    // Get course progress
    const getCourseProgress = (courseId: string): CourseProgress | null => {
        return progress.courses[courseId] || null;
    };

    // Get overall statistics
    const getOverallStats = () => {
        const totalLessons = Object.keys(progress.lessons).length;
        const completedLessons = Object.values(progress.lessons).filter(lesson => lesson.completed).length;
        const totalTimeSpent = Object.values(progress.lessons).reduce((total, lesson) => total + lesson.timeSpent, 0);
        const averageScore = Object.values(progress.lessons)
            .filter(lesson => lesson.completed)
            .reduce((total, lesson, _, array) => total + lesson.bestScore / array.length, 0);

        return {
            totalLessons,
            completedLessons,
            completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
            totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
            averageScore: Math.round(averageScore) || 0
        };
    };

    // Update course with enhanced lesson data including completion status
    const enhanceCourseWithProgress = (course: Course): Course => {
        const enhancedLessons = course.lessons.map(lesson => ({
            ...lesson,
            completed: isLessonCompleted(lesson.id),
            locked: false // We'll handle locking logic elsewhere
        }));

        return {
            ...course,
            lessons: enhancedLessons,
            progress: getCourseProgressPercentage(course)
        };
    };

    // Reset progress (for testing or user request)
    const resetProgress = () => {
        saveProgress(defaultProgress);
    };

    // Get courses with progress data
    const getCoursesWithProgress = (courses: Course[]): Course[] => {
        return courses.map(course => enhanceCourseWithProgress(course));
    };

    return {
        progress,
        isLoaded,
        completeLesson,
        getCourseProgressPercentage,
        getLessonProgress,
        isLessonCompleted,
        getCourseProgress,
        getOverallStats,
        enhanceCourseWithProgress,
        getCoursesWithProgress,
        resetProgress
    };
};