import { executeSQLiteQuery } from '../lib/sqliteDatabase';

export interface DatabaseUser {
    id: string;
    name: string;
    email: string;
    learning_path: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    preferences?: string; // JSON string
    created_at?: string;
    updated_at?: string;
    last_login?: string;
    is_active?: boolean;
}

export interface DatabaseUserSettings {
    id?: number;
    user_id: string;
    font_size: number;
    line_spacing: number;
    character_spacing: number;
    background_color: string;
    text_color: string;
    reading_speed: number;
    preferred_voice: string;
    created_at?: string;
    updated_at?: string;
}

export interface DatabaseCourse {
    id: string;
    title: string;
    description?: string;
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    estimated_duration?: number;
    category?: string;
    prerequisites?: string; // JSON string
    learning_objectives?: string;
    created_at?: string;
    updated_at?: string;
    is_active?: boolean;
}

export interface DatabaseLesson {
    id: string;
    course_id: string;
    title: string;
    description?: string;
    content?: string;
    lesson_order: number;
    estimated_duration?: number;
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    learning_objectives?: string; // JSON string
    prerequisites?: string; // JSON string
    pass_required_score: number;
    max_attempts: number;
    created_at?: string;
    updated_at?: string;
    is_active?: boolean;
}

export class SQLiteUserService {
    
    // Get user by ID
    static getUserById(userId: string): DatabaseUser | null {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM users WHERE id = ? AND is_active = 1',
                [userId]
            ) as DatabaseUser[];
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }

    // Get user by email
    static getUserByEmail(email: string): DatabaseUser | null {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM users WHERE email = ? AND is_active = 1',
                [email]
            ) as DatabaseUser[];
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    }

    // Get user settings
    static getUserSettings(userId: string): DatabaseUserSettings | null {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM user_settings WHERE user_id = ?',
                [userId]
            ) as DatabaseUserSettings[];
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching user settings:', error);
            throw error;
        }
    }

    // Update user settings
    static saveUserSettings(settings: Omit<DatabaseUserSettings, 'id' | 'created_at' | 'updated_at'>): boolean {
        try {
            executeSQLiteQuery(
                `INSERT OR REPLACE INTO user_settings 
                 (user_id, font_size, line_spacing, character_spacing, background_color, text_color, reading_speed, preferred_voice) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    settings.user_id,
                    settings.font_size,
                    settings.line_spacing,
                    settings.character_spacing,
                    settings.background_color,
                    settings.text_color,
                    settings.reading_speed,
                    settings.preferred_voice
                ]
            );
            return true;
        } catch (error) {
            console.error('Error saving user settings:', error);
            throw error;
        }
    }

    // Get all courses
    static getAllCourses(): DatabaseCourse[] {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM courses WHERE is_active = 1 ORDER BY title',
                []
            ) as DatabaseCourse[];
            return result;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    }

    // Get course by ID
    static getCourseById(courseId: string): DatabaseCourse | null {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM courses WHERE id = ? AND is_active = 1',
                [courseId]
            ) as DatabaseCourse[];
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching course by ID:', error);
            throw error;
        }
    }

    // Get lessons for a course
    static getLessonsByCourse(courseId: string): DatabaseLesson[] {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM lessons WHERE course_id = ? AND is_active = 1 ORDER BY lesson_order',
                [courseId]
            ) as DatabaseLesson[];
            return result;
        } catch (error) {
            console.error('Error fetching lessons for course:', error);
            throw error;
        }
    }

    // Get lesson by ID
    static getLessonById(lessonId: string): DatabaseLesson | null {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM lessons WHERE id = ? AND is_active = 1',
                [lessonId]
            ) as DatabaseLesson[];
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching lesson by ID:', error);
            throw error;
        }
    }

    // Get user enrollment for a course
    static getUserEnrollment(userId: string, courseId: string): any | null {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM user_enrollments WHERE user_id = ? AND course_id = ?',
                [userId, courseId]
            ) as any[];
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching user enrollment:', error);
            throw error;
        }
    }

    // Create user enrollment
    static createEnrollment(userId: string, courseId: string): boolean {
        try {
            executeSQLiteQuery(
                `INSERT OR IGNORE INTO user_enrollments (user_id, course_id, status, progress_percentage) 
                 VALUES (?, ?, 'enrolled', 0.00)`,
                [userId, courseId]
            );
            return true;
        } catch (error) {
            console.error('Error creating enrollment:', error);
            throw error;
        }
    }

    // Update enrollment progress
    static updateEnrollmentProgress(userId: string, courseId: string, progress: number): boolean {
        try {
            executeSQLiteQuery(
                `UPDATE user_enrollments 
                 SET progress_percentage = ?, 
                     status = CASE WHEN ? >= 100 THEN 'completed' ELSE 'in_progress' END,
                     last_accessed = CURRENT_TIMESTAMP
                 WHERE user_id = ? AND course_id = ?`,
                [progress, progress, userId, courseId]
            );
            return true;
        } catch (error) {
            console.error('Error updating enrollment progress:', error);
            throw error;
        }
    }

    // Record quiz attempt
    static recordQuizAttempt(
        attemptId: string,
        userId: string, 
        lessonId: string, 
        score: number, 
        maxScore: number, 
        passed: boolean,
        timeTaken: number,
        answers: any[]
    ): boolean {
        try {
            const percentage = (score / maxScore) * 100;
            
            executeSQLiteQuery(
                `INSERT INTO quiz_attempts 
                 (id, user_id, lesson_id, attempt_number, score, max_score, percentage, passed, time_taken, answers, started_at, completed_at) 
                 VALUES (?, ?, ?, 
                         (SELECT COALESCE(MAX(attempt_number), 0) + 1 FROM quiz_attempts WHERE user_id = ? AND lesson_id = ?), 
                         ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
                [attemptId, userId, lessonId, userId, lessonId, score, maxScore, percentage, passed ? 1 : 0, timeTaken, JSON.stringify(answers)]
            );
            return true;
        } catch (error) {
            console.error('Error recording quiz attempt:', error);
            throw error;
        }
    }

    // Get user's quiz attempts for a lesson
    static getUserQuizAttempts(userId: string, lessonId: string): any[] {
        try {
            const result = executeSQLiteQuery(
                'SELECT * FROM quiz_attempts WHERE user_id = ? AND lesson_id = ? ORDER BY attempt_number DESC',
                [userId, lessonId]
            ) as any[];
            return result;
        } catch (error) {
            console.error('Error fetching quiz attempts:', error);
            throw error;
        }
    }

    // Log learning activity
    static logActivity(
        userId: string, 
        activityType: string, 
        lessonId?: string, 
        courseId?: string, 
        duration?: number, 
        details?: any
    ): boolean {
        try {
            executeSQLiteQuery(
                `INSERT INTO learning_analytics 
                 (user_id, session_id, activity_type, lesson_id, course_id, duration, details) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    userId, 
                    `session-${Date.now()}`, 
                    activityType, 
                    lessonId || null, 
                    courseId || null, 
                    duration || null, 
                    details ? JSON.stringify(details) : null
                ]
            );
            return true;
        } catch (error) {
            console.error('Error logging activity:', error);
            throw error;
        }
    }

    // ==================== QUIZ PERFORMANCE ANALYTICS ====================

    // Get overall quiz performance percentage for a user
    static getUserOverallQuizPerformance(userId: string): {
        totalQuizzes: number;
        averagePercentage: number;
        passedQuizzes: number;
        failedQuizzes: number;
        totalTimeSpent: number;
    } {
        try {
            const result = executeSQLiteQuery(
                `SELECT 
                    COUNT(*) as totalQuizzes,
                    ROUND(AVG(percentage), 2) as averagePercentage,
                    SUM(CASE WHEN passed = 1 THEN 1 ELSE 0 END) as passedQuizzes,
                    SUM(CASE WHEN passed = 0 THEN 1 ELSE 0 END) as failedQuizzes,
                    SUM(time_taken) as totalTimeSpent
                 FROM quiz_attempts 
                 WHERE user_id = ?`,
                [userId]
            ) as any[];

            const stats = result[0] || {};
            return {
                totalQuizzes: stats.totalQuizzes || 0,
                averagePercentage: stats.averagePercentage || 0,
                passedQuizzes: stats.passedQuizzes || 0,
                failedQuizzes: stats.failedQuizzes || 0,
                totalTimeSpent: stats.totalTimeSpent || 0
            };
        } catch (error) {
            console.error('Error fetching user quiz performance:', error);
            return {
                totalQuizzes: 0,
                averagePercentage: 0,
                passedQuizzes: 0,
                failedQuizzes: 0,
                totalTimeSpent: 0
            };
        }
    }

    // Get quiz performance by lesson for a user
    static getUserQuizPerformanceByLesson(userId: string): any[] {
        try {
            const result = executeSQLiteQuery(
                `SELECT 
                    qa.lesson_id,
                    l.title as lesson_title,
                    COUNT(*) as attempts,
                    ROUND(AVG(qa.percentage), 2) as averagePercentage,
                    MAX(qa.percentage) as bestPercentage,
                    MIN(qa.percentage) as worstPercentage,
                    SUM(CASE WHEN qa.passed = 1 THEN 1 ELSE 0 END) as passedAttempts,
                    MAX(qa.completed_at) as lastAttempt
                 FROM quiz_attempts qa
                 LEFT JOIN lessons l ON qa.lesson_id = l.id
                 WHERE qa.user_id = ?
                 GROUP BY qa.lesson_id, l.title
                 ORDER BY MAX(qa.completed_at) DESC`,
                [userId]
            ) as any[];
            
            return result || [];
        } catch (error) {
            console.error('Error fetching quiz performance by lesson:', error);
            return [];
        }
    }

    // Get recent quiz attempts for a user (last 10)
    static getUserRecentQuizAttempts(userId: string, limit: number = 10): any[] {
        try {
            const result = executeSQLiteQuery(
                `SELECT 
                    qa.*,
                    l.title as lesson_title,
                    c.title as course_title
                 FROM quiz_attempts qa
                 LEFT JOIN lessons l ON qa.lesson_id = l.id
                 LEFT JOIN courses c ON l.course_id = c.id
                 WHERE qa.user_id = ?
                 ORDER BY qa.completed_at DESC
                 LIMIT ?`,
                [userId, limit]
            ) as any[];
            
            return result || [];
        } catch (error) {
            console.error('Error fetching recent quiz attempts:', error);
            return [];
        }
    }

    // Get quiz performance trends over time
    static getUserQuizPerformanceTrend(userId: string, days: number = 30): any[] {
        try {
            const result = executeSQLiteQuery(
                `SELECT 
                    DATE(completed_at) as date,
                    COUNT(*) as attempts,
                    ROUND(AVG(percentage), 2) as averagePercentage,
                    SUM(CASE WHEN passed = 1 THEN 1 ELSE 0 END) as passedAttempts
                 FROM quiz_attempts
                 WHERE user_id = ? 
                   AND completed_at >= datetime('now', '-${days} days')
                 GROUP BY DATE(completed_at)
                 ORDER BY date ASC`,
                [userId]
            ) as any[];
            
            return result || [];
        } catch (error) {
            console.error('Error fetching quiz performance trend:', error);
            return [];
        }
    }

    // Get course-level quiz performance for a user
    static getUserQuizPerformanceByCourse(userId: string): any[] {
        try {
            const result = executeSQLiteQuery(
                `SELECT 
                    c.id as course_id,
                    c.title as course_title,
                    COUNT(*) as totalAttempts,
                    ROUND(AVG(qa.percentage), 2) as averagePercentage,
                    SUM(CASE WHEN qa.passed = 1 THEN 1 ELSE 0 END) as passedAttempts,
                    COUNT(DISTINCT qa.lesson_id) as lessonsAttempted
                 FROM quiz_attempts qa
                 JOIN lessons l ON qa.lesson_id = l.id
                 JOIN courses c ON l.course_id = c.id
                 WHERE qa.user_id = ?
                 GROUP BY c.id, c.title
                 ORDER BY COUNT(*) DESC`,
                [userId]
            ) as any[];
            
            return result || [];
        } catch (error) {
            console.error('Error fetching quiz performance by course:', error);
            return [];
        }
    }
}