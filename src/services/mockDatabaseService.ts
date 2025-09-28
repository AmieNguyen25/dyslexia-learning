// Frontend mock database service using localStorage for development
// This replaces SQLite calls until we set up a proper backend API

interface MockQuizAttempt {
    id: string;
    user_id: string;
    lesson_id: string;
    attempt_number: number;
    score: number;
    max_score: number;
    percentage: number;
    passed: boolean;
    time_taken: number;
    answers: any;
    started_at: string;
    completed_at: string;
}

interface MockLesson {
    id: string;
    title: string;
    course_id: string;
}

interface MockCourse {
    id: string;
    title: string;
}

class MockDatabaseService {
    private static getStorageKey(key: string): string {
        return `dyslexia_learning_${key}`;
    }

    private static getFromStorage<T>(key: string): T[] {
        try {
            const data = localStorage.getItem(this.getStorageKey(key));
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    private static saveToStorage<T>(key: string, data: T[]): void {
        try {
            localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Reset and reinitialize all sample data (for testing/demo purposes)
    static resetSampleData(): void {
        localStorage.removeItem(this.getStorageKey('quiz_attempts'));
        localStorage.removeItem(this.getStorageKey('lessons'));
        localStorage.removeItem(this.getStorageKey('courses'));
        this.initializeSampleData();
    }

    // Initialize with sample data if none exists
    static initializeSampleData(): void {
        const attempts = this.getFromStorage<MockQuizAttempt>('quiz_attempts');
        if (attempts.length === 0) {
            // Add some sample quiz attempts for demonstration
            const sampleAttempts: MockQuizAttempt[] = [
                {
                    id: 'attempt-sample-1',
                    user_id: 'user-1',
                    lesson_id: 'integers-intro',
                    attempt_number: 1,
                    score: 4,
                    max_score: 5,
                    percentage: 80,
                    passed: true,
                    time_taken: 180,
                    answers: [],
                    started_at: new Date(Date.now() - 86400000).toISOString(),
                    completed_at: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: 'attempt-sample-2',
                    user_id: 'user-1',
                    lesson_id: 'integer-operations',
                    attempt_number: 1,
                    score: 3,
                    max_score: 5,
                    percentage: 60,
                    passed: false,
                    time_taken: 240,
                    answers: [],
                    started_at: new Date(Date.now() - 43200000).toISOString(),
                    completed_at: new Date(Date.now() - 43200000).toISOString()
                },
                {
                    id: 'attempt-sample-3',
                    user_id: 'user-1',
                    lesson_id: 'order-of-operations',
                    attempt_number: 1,
                    score: 5,
                    max_score: 5,
                    percentage: 100,
                    passed: true,
                    time_taken: 210,
                    answers: [],
                    started_at: new Date(Date.now() - 21600000).toISOString(),
                    completed_at: new Date(Date.now() - 21600000).toISOString()
                },
                {
                    id: 'attempt-sample-4',
                    user_id: 'user-1',
                    lesson_id: 'understanding-ratios',
                    attempt_number: 1,
                    score: 3,
                    max_score: 4,
                    percentage: 75,
                    passed: true,
                    time_taken: 195,
                    answers: [],
                    started_at: new Date(Date.now() - 7200000).toISOString(),
                    completed_at: new Date(Date.now() - 7200000).toISOString()
                },
                {
                    id: 'attempt-sample-5',
                    user_id: 'user-1',
                    lesson_id: 'algebraic-thinking',
                    attempt_number: 1,
                    score: 4,
                    max_score: 6,
                    percentage: 67,
                    passed: false,
                    time_taken: 275,
                    answers: [],
                    started_at: new Date(Date.now() - 3600000).toISOString(),
                    completed_at: new Date(Date.now() - 3600000).toISOString()
                }
            ];
            this.saveToStorage('quiz_attempts', sampleAttempts);
        }

        const lessons = this.getFromStorage<MockLesson>('lessons');
        if (lessons.length === 0) {
            const sampleLessons: MockLesson[] = [
                // Pre-Algebra Essentials
                { id: 'integers-intro', title: 'Introduction to Integers', course_id: 'pre-algebra-essentials' },
                { id: 'integer-operations', title: 'Integer Operations', course_id: 'pre-algebra-essentials' },
                { id: 'order-of-operations', title: 'Order of Operations (PEMDAS)', course_id: 'pre-algebra-essentials' },
                { id: 'factors-multiples', title: 'Factors and Multiples', course_id: 'pre-algebra-essentials' },
                
                // Ratios & Proportions
                { id: 'understanding-ratios', title: 'Understanding Ratios', course_id: 'ratios-proportions' },
                { id: 'proportions-solving', title: 'Solving Proportions', course_id: 'ratios-proportions' },
                { id: 'fractions-decimals', title: 'Fractions and Decimals', course_id: 'ratios-proportions' },
                { id: 'scale-factors', title: 'Scale Factors and Similarity', course_id: 'ratios-proportions' },
                
                // Equations & Inequalities
                { id: 'algebraic-thinking', title: 'Algebraic Thinking', course_id: 'equations-inequalities' },
                { id: 'one-step-equations', title: 'One-Step Equations', course_id: 'equations-inequalities' },
                { id: 'two-step-equations', title: 'Two-Step Equations', course_id: 'equations-inequalities' },
                { id: 'inequalities-intro', title: 'Introduction to Inequalities', course_id: 'equations-inequalities' },
                
                // Data & Probability
                { id: 'collecting-data', title: 'Collecting and Organizing Data', course_id: 'data-probability' },
                { id: 'graphs-charts', title: 'Graphs and Charts', course_id: 'data-probability' },
                { id: 'measures-center', title: 'Measures of Center', course_id: 'data-probability' },
                { id: 'probability-basics', title: 'Probability Basics', course_id: 'data-probability' },
                
                // Geometry Prep
                { id: 'angles-lines', title: 'Angles and Lines', course_id: 'geometry-prep' },
                { id: 'triangles-polygons', title: 'Triangles and Polygons', course_id: 'geometry-prep' },
                { id: 'circles-basics', title: 'Circles: Radius, Diameter, Circumference', course_id: 'geometry-prep' },
                { id: 'area-perimeter', title: 'Area and Perimeter', course_id: 'geometry-prep' },
                { id: 'volume-intro', title: 'Introduction to Volume', course_id: 'geometry-prep' }
            ];
            this.saveToStorage('lessons', sampleLessons);
        }

        const courses = this.getFromStorage<MockCourse>('courses');
        if (courses.length === 0) {
            const sampleCourses: MockCourse[] = [
                // Middle School Math Courses
                { id: 'pre-algebra-essentials', title: 'Pre-Algebra Essentials' },
                { id: 'ratios-proportions', title: 'Ratios & Proportions' },
                { id: 'equations-inequalities', title: 'Equations & Inequalities' },
                { id: 'data-probability', title: 'Data & Probability' },
                { id: 'geometry-prep', title: 'Geometry Prep' }
            ];
            this.saveToStorage('courses', sampleCourses);
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
            const attempts = this.getFromStorage<MockQuizAttempt>('quiz_attempts');
            
            // Get next attempt number for this lesson
            const existingAttempts = attempts.filter(a => a.user_id === userId && a.lesson_id === lessonId);
            const attemptNumber = existingAttempts.length + 1;
            
            const percentage = (score / maxScore) * 100;
            const now = new Date().toISOString();
            
            const newAttempt: MockQuizAttempt = {
                id: attemptId,
                user_id: userId,
                lesson_id: lessonId,
                attempt_number: attemptNumber,
                score,
                max_score: maxScore,
                percentage,
                passed,
                time_taken: timeTaken,
                answers: JSON.stringify(answers),
                started_at: now,
                completed_at: now
            };
            
            attempts.push(newAttempt);
            this.saveToStorage('quiz_attempts', attempts);
            
            console.log(`📊 Mock DB: Saved quiz attempt ${attemptId} - ${score}/${maxScore} (${percentage}%)`);
            return true;
        } catch (error) {
            console.error('Error recording quiz attempt:', error);
            return false;
        }
    }

    // Get user's overall quiz performance
    static getUserOverallQuizPerformance(userId: string) {
        try {
            const attempts = this.getFromStorage<MockQuizAttempt>('quiz_attempts')
                .filter(a => a.user_id === userId);
            
            if (attempts.length === 0) {
                return {
                    totalQuizzes: 0,
                    averagePercentage: 0,
                    passedQuizzes: 0,
                    failedQuizzes: 0,
                    totalTimeSpent: 0
                };
            }
            
            const totalQuizzes = attempts.length;
            const averagePercentage = Math.round(
                attempts.reduce((sum, a) => sum + a.percentage, 0) / totalQuizzes
            );
            const passedQuizzes = attempts.filter(a => a.passed).length;
            const failedQuizzes = totalQuizzes - passedQuizzes;
            const totalTimeSpent = attempts.reduce((sum, a) => sum + a.time_taken, 0);
            
            return {
                totalQuizzes,
                averagePercentage,
                passedQuizzes,
                failedQuizzes,
                totalTimeSpent
            };
        } catch (error) {
            console.error('Error fetching user performance:', error);
            return {
                totalQuizzes: 0,
                averagePercentage: 0,
                passedQuizzes: 0,
                failedQuizzes: 0,
                totalTimeSpent: 0
            };
        }
    }

    // Get quiz performance by lesson
    static getUserQuizPerformanceByLesson(userId: string) {
        try {
            const attempts = this.getFromStorage<MockQuizAttempt>('quiz_attempts')
                .filter(a => a.user_id === userId);
            const lessons = this.getFromStorage<MockLesson>('lessons');
            
            const lessonStats: { [key: string]: any } = {};
            
            attempts.forEach(attempt => {
                const lessonId = attempt.lesson_id;
                if (!lessonStats[lessonId]) {
                    const lesson = lessons.find(l => l.id === lessonId);
                    lessonStats[lessonId] = {
                        lesson_id: lessonId,
                        lesson_title: lesson?.title || 'Unknown Lesson',
                        attempts: 0,
                        totalPercentage: 0,
                        bestPercentage: 0,
                        worstPercentage: 100,
                        passedAttempts: 0,
                        lastAttempt: attempt.completed_at
                    };
                }
                
                const stats = lessonStats[lessonId];
                stats.attempts += 1;
                stats.totalPercentage += attempt.percentage;
                stats.bestPercentage = Math.max(stats.bestPercentage, attempt.percentage);
                stats.worstPercentage = Math.min(stats.worstPercentage, attempt.percentage);
                if (attempt.passed) stats.passedAttempts += 1;
                
                if (new Date(attempt.completed_at) > new Date(stats.lastAttempt)) {
                    stats.lastAttempt = attempt.completed_at;
                }
            });
            
            return Object.values(lessonStats).map((stats: any) => ({
                ...stats,
                averagePercentage: Math.round(stats.totalPercentage / stats.attempts)
            }));
        } catch (error) {
            console.error('Error fetching lesson performance:', error);
            return [];
        }
    }

    // Get recent quiz attempts
    static getUserRecentQuizAttempts(userId: string, limit: number = 10) {
        try {
            const attempts = this.getFromStorage<MockQuizAttempt>('quiz_attempts')
                .filter(a => a.user_id === userId)
                .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
                .slice(0, limit);
            
            const lessons = this.getFromStorage<MockLesson>('lessons');
            const courses = this.getFromStorage<MockCourse>('courses');
            
            return attempts.map(attempt => {
                const lesson = lessons.find(l => l.id === attempt.lesson_id);
                const course = courses.find(c => c.id === lesson?.course_id);
                
                return {
                    ...attempt,
                    lesson_title: lesson?.title || 'Unknown Lesson',
                    course_title: course?.title || 'Unknown Course'
                };
            });
        } catch (error) {
            console.error('Error fetching recent attempts:', error);
            return [];
        }
    }

    // Get quiz performance by course
    static getUserQuizPerformanceByCourse(userId: string) {
        try {
            const attempts = this.getFromStorage<MockQuizAttempt>('quiz_attempts')
                .filter(a => a.user_id === userId);
            const lessons = this.getFromStorage<MockLesson>('lessons');
            const courses = this.getFromStorage<MockCourse>('courses');
            
            const courseStats: { [key: string]: any } = {};
            
            attempts.forEach(attempt => {
                const lesson = lessons.find(l => l.id === attempt.lesson_id);
                if (!lesson) return;
                
                const courseId = lesson.course_id;
                if (!courseStats[courseId]) {
                    const course = courses.find(c => c.id === courseId);
                    courseStats[courseId] = {
                        course_id: courseId,
                        course_title: course?.title || 'Unknown Course',
                        totalAttempts: 0,
                        totalPercentage: 0,
                        passedAttempts: 0,
                        uniqueLessons: new Set()
                    };
                }
                
                const stats = courseStats[courseId];
                stats.totalAttempts += 1;
                stats.totalPercentage += attempt.percentage;
                if (attempt.passed) stats.passedAttempts += 1;
                stats.uniqueLessons.add(attempt.lesson_id);
            });
            
            return Object.values(courseStats).map((stats: any) => ({
                course_id: stats.course_id,
                course_title: stats.course_title,
                totalAttempts: stats.totalAttempts,
                averagePercentage: Math.round(stats.totalPercentage / stats.totalAttempts),
                passedAttempts: stats.passedAttempts,
                lessonsAttempted: stats.uniqueLessons.size
            }));
        } catch (error) {
            console.error('Error fetching course performance:', error);
            return [];
        }
    }

    // Get user quiz attempts for a specific lesson
    static getUserQuizAttempts(userId: string, lessonId: string) {
        try {
            return this.getFromStorage<MockQuizAttempt>('quiz_attempts')
                .filter(a => a.user_id === userId && a.lesson_id === lessonId)
                .sort((a, b) => b.attempt_number - a.attempt_number);
        } catch (error) {
            console.error('Error fetching quiz attempts:', error);
            return [];
        }
    }
}

export { MockDatabaseService };