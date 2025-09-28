import React, { useState, useEffect } from 'react';
import { 
    TrendingUp, 
    Clock, 
    Target, 
    BookOpen, 
    BarChart3, 
    Trophy,
    Brain,
    CheckCircle,
    XCircle,
    RefreshCw
} from 'lucide-react';
import { MockDatabaseService } from '../services/mockDatabaseService';

interface QuizPerformanceProps {
    userId: string;
    fontSize?: number;
}

interface PerformanceStats {
    totalQuizzes: number;
    averagePercentage: number;
    passedQuizzes: number;
    failedQuizzes: number;
    totalTimeSpent: number;
}

interface LessonPerformance {
    lesson_id: string;
    lesson_title: string;
    attempts: number;
    averagePercentage: number;
    bestPercentage: number;
    worstPercentage: number;
    passedAttempts: number;
    lastAttempt: string;
}

interface RecentAttempt {
    id: string;
    lesson_title: string;
    course_title: string;
    percentage: number;
    passed: boolean;
    completed_at: string;
    time_taken: number;
}

export const QuizPerformance: React.FC<QuizPerformanceProps> = ({ 
    userId, 
    fontSize = 16 
}) => {
    const [overallStats, setOverallStats] = useState<PerformanceStats | null>(null);
    const [lessonPerformance, setLessonPerformance] = useState<LessonPerformance[]>([]);
    const [recentAttempts, setRecentAttempts] = useState<RecentAttempt[]>([]);
    const [coursePerformance, setCoursePerformance] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'recent' | 'courses'>('overview');

    useEffect(() => {
        loadPerformanceData();

        // Listen for new quiz attempts and auto-refresh
        const handleQuizRecorded = (event: any) => {
            console.log('🔄 New quiz attempt detected, refreshing performance data...', event.detail);
            setTimeout(() => loadPerformanceData(), 500); // Small delay to ensure data is saved
        };

        window.addEventListener('quizAttemptRecorded', handleQuizRecorded);
        
        return () => {
            window.removeEventListener('quizAttemptRecorded', handleQuizRecorded);
        };
    }, [userId]);

    const loadPerformanceData = async () => {
        try {
            setLoading(true);
            
            // Initialize with updated sample data
            MockDatabaseService.resetSampleData();
            
            // Load all performance data
            const stats = MockDatabaseService.getUserOverallQuizPerformance(userId);
            const lessonData = MockDatabaseService.getUserQuizPerformanceByLesson(userId);
            const recentData = MockDatabaseService.getUserRecentQuizAttempts(userId, 10);
            const courseData = MockDatabaseService.getUserQuizPerformanceByCourse(userId);

            console.log('📊 Performance Data Loaded:', {
                stats,
                lessonData: lessonData.length,
                recentData: recentData.length,
                courseData: courseData.length,
                rawLessonData: lessonData,
                rawRecentData: recentData,
                rawCourseData: courseData
            });

            setOverallStats(stats);
            setLessonPerformance(lessonData);
            setRecentAttempts(recentData);
            setCoursePerformance(courseData);
        } catch (error) {
            console.error('Error loading performance data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number): string => {
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPerformanceColor = (percentage: number): string => {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 80) return 'text-blue-600';
        if (percentage >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getPerformanceBgColor = (percentage: number): string => {
        if (percentage >= 90) return 'bg-green-50 border-green-200';
        if (percentage >= 80) return 'bg-blue-50 border-blue-200';
        if (percentage >= 70) return 'bg-yellow-50 border-yellow-200';
        return 'bg-red-50 border-red-200';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <Brain className="animate-pulse mx-auto mb-4 text-blue-500" size={48} />
                    <p style={{ fontSize: `${fontSize}px` }} className="text-gray-600">
                        Loading quiz performance data...
                    </p>
                </div>
            </div>
        );
    }

    if (!overallStats || overallStats.totalQuizzes === 0) {
        return (
            <div className="text-center p-8">
                <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 style={{ fontSize: `${fontSize + 4}px` }} className="font-semibold text-gray-700 mb-2">
                    No Quiz Data Yet
                </h3>
                <p style={{ fontSize: `${fontSize}px` }} className="text-gray-500">
                    Take some quizzes to see your performance statistics here!
                </p>
            </div>
        );
    }

    const passRate = overallStats.totalQuizzes > 0 ? 
        (overallStats.passedQuizzes / overallStats.totalQuizzes) * 100 : 0;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 style={{ fontSize: `${fontSize + 8}px` }} className="font-bold text-gray-800 mb-2 flex items-center">
                            <BarChart3 className="mr-3 text-blue-600" size={28} />
                            Quiz Performance Dashboard
                        </h2>
                        <p style={{ fontSize: `${fontSize}px` }} className="text-gray-600">
                            Track your learning progress and identify areas for improvement
                        </p>
                    </div>
                    <button
                        onClick={loadPerformanceData}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                        style={{ fontSize: `${fontSize - 2}px` }}
                        disabled={loading}
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                {[
                    { key: 'overview', label: 'Overview', icon: Target },
                    { key: 'lessons', label: 'By Lesson', icon: BookOpen },
                    { key: 'recent', label: 'Recent', icon: Clock },
                    { key: 'courses', label: 'By Course', icon: Trophy }
                ].map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key as any)}
                        className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
                            activeTab === key
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        <Icon size={18} className="mr-2" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Overall Average */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between mb-4">
                            <Trophy className="text-blue-600" size={24} />
                            <span className={`text-2xl font-bold ${getPerformanceColor(overallStats.averagePercentage)}`}>
                                {overallStats.averagePercentage}%
                            </span>
                        </div>
                        <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold text-gray-700 mb-1">
                            Average Score
                        </h3>
                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-500">
                            Across all {overallStats.totalQuizzes} quizzes
                        </p>
                    </div>

                    {/* Pass Rate */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-4">
                            <CheckCircle className="text-green-600" size={24} />
                            <span className="text-2xl font-bold text-green-600">
                                {Math.round(passRate)}%
                            </span>
                        </div>
                        <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold text-gray-700 mb-1">
                            Pass Rate
                        </h3>
                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-500">
                            {overallStats.passedQuizzes} of {overallStats.totalQuizzes} passed
                        </p>
                    </div>

                    {/* Total Time */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between mb-4">
                            <Clock className="text-purple-600" size={24} />
                            <span className="text-2xl font-bold text-purple-600">
                                {formatTime(overallStats.totalTimeSpent)}
                            </span>
                        </div>
                        <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold text-gray-700 mb-1">
                            Study Time
                        </h3>
                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-500">
                            Total time on quizzes
                        </p>
                    </div>

                    {/* Improvement Trend */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                        <div className="flex items-center justify-between mb-4">
                            <TrendingUp className="text-orange-600" size={24} />
                            <span className="text-2xl font-bold text-orange-600">
                                {overallStats.totalQuizzes}
                            </span>
                        </div>
                        <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold text-gray-700 mb-1">
                            Total Quizzes
                        </h3>
                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-500">
                            Quizzes completed
                        </p>
                    </div>
                </div>
            )}

            {/* Lessons Tab */}
            {activeTab === 'lessons' && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <h3 style={{ fontSize: `${fontSize + 4}px` }} className="font-semibold text-gray-800">
                            Performance by Lesson
                        </h3>
                    </div>
                    {lessonPerformance.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th style={{ fontSize: `${fontSize}px` }} className="px-6 py-3 text-left font-semibold text-gray-700">Lesson</th>
                                        <th style={{ fontSize: `${fontSize}px` }} className="px-6 py-3 text-center font-semibold text-gray-700">Attempts</th>
                                        <th style={{ fontSize: `${fontSize}px` }} className="px-6 py-3 text-center font-semibold text-gray-700">Average</th>
                                        <th style={{ fontSize: `${fontSize}px` }} className="px-6 py-3 text-center font-semibold text-gray-700">Best</th>
                                        <th style={{ fontSize: `${fontSize}px` }} className="px-6 py-3 text-center font-semibold text-gray-700">Pass Rate</th>
                                        <th style={{ fontSize: `${fontSize}px` }} className="px-6 py-3 text-center font-semibold text-gray-700">Last Attempt</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {lessonPerformance.map((lesson) => (
                                        <tr key={lesson.lesson_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div style={{ fontSize: `${fontSize}px` }} className="font-medium text-gray-900">
                                                        {lesson.lesson_title}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-gray-700">
                                                    {lesson.attempts}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span style={{ fontSize: `${fontSize}px` }} className={`font-semibold ${getPerformanceColor(lesson.averagePercentage)}`}>
                                                    {lesson.averagePercentage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span style={{ fontSize: `${fontSize}px` }} className={`font-semibold ${getPerformanceColor(lesson.bestPercentage)}`}>
                                                    {lesson.bestPercentage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-gray-700">
                                                    {Math.round((lesson.passedAttempts / lesson.attempts) * 100)}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-500">
                                                    {formatDate(lesson.lastAttempt)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <p style={{ fontSize: `${fontSize}px` }} className="text-gray-500">
                                No lesson data available yet.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Recent Tab */}
            {activeTab === 'recent' && (
                <div className="bg-white rounded-xl shadow-lg">
                    <div className="p-6 border-b">
                        <h3 style={{ fontSize: `${fontSize + 4}px` }} className="font-semibold text-gray-800">
                            Recent Quiz Attempts
                        </h3>
                    </div>
                    <div className="p-6">
                        {recentAttempts.length > 0 ? (
                            <div className="space-y-4">
                                {recentAttempts.map((attempt) => (
                                    <div key={attempt.id} className={`p-4 rounded-lg border ${getPerformanceBgColor(attempt.percentage)}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <div className="mr-3">
                                                        {attempt.passed ? (
                                                            <CheckCircle size={20} className="text-green-600" />
                                                        ) : (
                                                            <XCircle size={20} className="text-red-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium text-gray-900">
                                                            {attempt.lesson_title}
                                                        </h4>
                                                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                                                            {attempt.course_title} • {formatDate(attempt.completed_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div style={{ fontSize: `${fontSize + 2}px` }} className={`font-bold ${getPerformanceColor(attempt.percentage)}`}>
                                                    {attempt.percentage}%
                                                </div>
                                                <div style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-500">
                                                    {formatTime(attempt.time_taken)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p style={{ fontSize: `${fontSize}px` }} className="text-gray-500">
                                    No recent quiz attempts.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
                <div className="bg-white rounded-xl shadow-lg">
                    <div className="p-6 border-b">
                        <h3 style={{ fontSize: `${fontSize + 4}px` }} className="font-semibold text-gray-800">
                            Performance by Course
                        </h3>
                    </div>
                    <div className="p-6">
                        {coursePerformance.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {coursePerformance.map((course) => (
                                    <div key={course.course_id} className="border rounded-lg p-6">
                                        <h4 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold text-gray-900 mb-4">
                                            {course.course_title}
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-gray-600">Average Score:</span>
                                                <span style={{ fontSize: `${fontSize}px` }} className={`font-semibold ${getPerformanceColor(course.averagePercentage)}`}>
                                                    {course.averagePercentage}%
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-gray-600">Total Attempts:</span>
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-gray-900">
                                                    {course.totalAttempts}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-gray-600">Lessons Completed:</span>
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-gray-900">
                                                    {course.lessonsAttempted}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-gray-600">Pass Rate:</span>
                                                <span style={{ fontSize: `${fontSize}px` }} className="text-green-600">
                                                    {Math.round((course.passedAttempts / course.totalAttempts) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p style={{ fontSize: `${fontSize}px` }} className="text-gray-500">
                                    No course data available yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};