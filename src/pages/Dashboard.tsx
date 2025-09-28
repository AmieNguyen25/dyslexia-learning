import React, { useState } from 'react';
import { Volume2, BookOpen, ArrowLeft, MessageSquare } from 'lucide-react';
import { LearningPathSelector } from '../components/LearningPathSelector';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { AccessibilitySettings } from '../components/AccessibilitySettings';
import { CourseSelector } from '../components/CourseSelector';
import { Chatbot } from '../components/Chatbot';
import type { User, LearningPath, Course, OnboardingData } from '../types';

interface DashboardProps {
    fontSize: number;
    lineSpacing: number;
    currentUser: User;
    learningPath: LearningPath;
    onLearningPathChange: (path: LearningPath) => void;
    onFontSizeChange: (size: number) => void;
    onLineSpacingChange: (spacing: number) => void;
    onSpeakText: (text: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
    fontSize,
    lineSpacing,
    currentUser,
    learningPath,
    onLearningPathChange,
    onFontSizeChange,
    onLineSpacingChange,
    onSpeakText,
}) => {
    const [showCourses, setShowCourses] = useState(false);
    const [selectedGradeLevel, setSelectedGradeLevel] = useState<OnboardingData['gradeLevel']>('middle');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleCourseSelect = (course: Course) => {
        onSpeakText(`Selected ${course.title}. This course covers ${course.description}`);
        // Here you could navigate to the lesson page or show course details
    };

    const handleGradeLevelChange = (level: OnboardingData['gradeLevel']) => {
        setSelectedGradeLevel(level);
    };

    if (showCourses) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Back to Dashboard Button */}
                    <button
                        onClick={() => setShowCourses(false)}
                        className="mb-6 flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow focus:ring-4 focus:ring-blue-200"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Dashboard</span>
                    </button>

                    {/* Grade Level Selector */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                        <h3
                            style={{ fontSize: `${fontSize + 4}px` }}
                            className="font-bold text-gray-800 mb-4"
                        >
                            📚 Select Your Grade Level
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { key: 'elementary' as const, label: 'Elementary (K-5)', icon: '🎨' },
                                { key: 'middle' as const, label: 'Middle School (6-8)', icon: '📚' },
                                { key: 'high' as const, label: 'High School (9-12)', icon: '🎓' },
                                { key: 'college' as const, label: 'College/Adult', icon: '🏛️' },
                            ].map((level) => (
                                <button
                                    key={level.key}
                                    onClick={() => handleGradeLevelChange(level.key)}
                                    className={`p-4 rounded-xl border-2 transition-all ${selectedGradeLevel === level.key
                                            ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-200'
                                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                        }`}
                                >
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">{level.icon}</div>
                                        <div
                                            style={{ fontSize: `${fontSize - 2}px` }}
                                            className="font-medium text-gray-800"
                                        >
                                            {level.label}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Course Selector */}
                    <CourseSelector
                        fontSize={fontSize}
                        lineSpacing={lineSpacing}
                        gradeLevel={selectedGradeLevel}
                        onCourseSelect={handleCourseSelect}
                        onSpeakText={onSpeakText}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl">
                <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }}
                    className="font-bold mb-2">
                    Welcome back, {currentUser?.name}! 🎯
                </h2>
                <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}>
                    Ready to continue your algebra journey?
                </p>

                <button
                    onClick={() => onSpeakText(`Welcome back ${currentUser?.name}! Ready to continue your algebra journey?`)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-blue-300"
                >
                    <Volume2 size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}>Listen</span>
                </button>
            </div>

            {/* Learning Path Selector */}
            <LearningPathSelector
                fontSize={fontSize}
                lineSpacing={lineSpacing}
                learningPath={learningPath}
                onPathChange={onLearningPathChange}
            />

            {/* Performance Metrics */}
            <PerformanceMetrics
                fontSize={fontSize}
                currentUser={currentUser}
            />

            {/* Accessibility Settings */}
            <AccessibilitySettings
                fontSize={fontSize}
                lineSpacing={lineSpacing}
                onFontSizeChange={onFontSizeChange}
                onLineSpacingChange={onLineSpacingChange}
            />

            {/* Browse Courses Section */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h3
                            style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }}
                            className="font-bold mb-2 flex items-center"
                        >
                            <BookOpen className="mr-3" size={28} />
                            Explore Math Courses
                        </h3>
                        <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}>
                            Choose from courses designed for all grade levels - from elementary to college
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCourses(true)}
                        className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors focus:ring-4 focus:ring-white focus:ring-opacity-50"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        Browse Courses →
                    </button>
                </div>

                <button
                    onClick={() => onSpeakText('Explore our comprehensive math courses designed for all grade levels. From elementary counting to college calculus, find the perfect course for your learning needs.')}
                    className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Volume2 size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}>Listen to Course Info</span>
                </button>
            </div>

            {/* AI Chatbot */}
            {isChatOpen && (
                <Chatbot
                    onClose={() => setIsChatOpen(false)}
                    fontSize={fontSize}
                    onSpeakText={onSpeakText}
                />
            )}

            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 z-40"
                aria-label="Open AI support chat"
            >
                <MessageSquare size={28} />
            </button>
        </div>
    );
};