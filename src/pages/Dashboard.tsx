import React, { useState } from 'react';
import { Volume2, BookOpen, ArrowLeft } from 'lucide-react';
import { LearningPathSelector } from '../components/LearningPathSelector';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { AccessibilitySettings } from '../components/AccessibilitySettings';
import { CourseSelector } from '../components/CourseSelector';
import type { User, LearningPath, Course, OnboardingData } from '../types';

interface DashboardProps {
    fontSize: number;
    lineSpacing: number;
    characterSpacing: number;
    currentUser: User;
    learningPath: LearningPath;
    onLearningPathChange: (path: LearningPath) => void;
    onFontSizeChange: (size: number) => void;
    onLineSpacingChange: (spacing: number) => void;
    onCharacterSpacingChange: (spacing: number) => void;
    onSpeakText: (text: string) => void;
    timeOnTask?: number;
    selectedCourse?: Course | null;
    onCourseSelect?: (course: Course) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
    fontSize,
    lineSpacing,
    characterSpacing,
    currentUser,
    learningPath,
    onLearningPathChange,
    onFontSizeChange,
    onLineSpacingChange,
    onCharacterSpacingChange,
    onSpeakText,
    timeOnTask = 0,
    selectedCourse,
    onCourseSelect,
}) => {
    const [showCourses, setShowCourses] = useState(false);
    const [selectedGradeLevel, setSelectedGradeLevel] = useState<OnboardingData['gradeLevel']>('middle');

    const handleCourseSelect = (course: Course) => {
        // Use the parent's course selection handler
        if (onCourseSelect) {
            onCourseSelect(course);
        } else {
            // Fallback: just speak the course selection
            onSpeakText(`Selected ${course.title}. This course covers ${course.description}`);
        }
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
                            📚 <strong>Select Your Grade Level</strong>
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
            {/* Continue Current Course Section */}
            {selectedCourse && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                className="font-bold mb-2 flex items-center">
                                {selectedCourse.icon} <strong>Continue Your Progress</strong>
                            </h3>
                            <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                className="opacity-90 mb-3">
                                <strong>{selectedCourse.title}</strong> - <strong>{selectedCourse.progress}%</strong> Complete
                            </p>
                            <div className="bg-white bg-opacity-20 rounded-full h-2 mb-3">
                                <div 
                                    className="bg-white rounded-full h-2 transition-all duration-300"
                                    style={{ width: `${selectedCourse.progress}%` }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => onCourseSelect && onCourseSelect(selectedCourse)}
                            className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg"
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            <strong>Continue Learning</strong> →
                        </button>
                    </div>
                </div>
            )}

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl">
                <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                    className="font-bold mb-2">
                    Welcome back, <strong>{currentUser?.name}</strong>! 🎯
                </h2>
                <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                    className="opacity-90">
                    Ready to continue your <strong>algebra journey</strong>?
                </p>

                <button
                    onClick={() => onSpeakText(`Welcome back ${currentUser?.name}! Ready to continue your algebra journey?`)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-blue-300"
                >
                    <Volume2 size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}><strong>Listen</strong></span>
                </button>
            </div>

            {/* Learning Path Selector */}
            <LearningPathSelector
                fontSize={fontSize}
                lineSpacing={lineSpacing}
                characterSpacing={characterSpacing}
                learningPath={learningPath}
                onPathChange={onLearningPathChange}
            />

            {/* Performance Metrics */}
            <PerformanceMetrics
                fontSize={fontSize}
                characterSpacing={characterSpacing}
                currentUser={currentUser}
            />

            {/* Accessibility Settings */}
            <AccessibilitySettings
                fontSize={fontSize}
                lineSpacing={lineSpacing}
                characterSpacing={characterSpacing}
                onFontSizeChange={onFontSizeChange}
                onLineSpacingChange={onLineSpacingChange}
                onCharacterSpacingChange={onCharacterSpacingChange}
            />

            {/* Browse Courses Section */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h3
                            style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                            className="font-bold mb-2 flex items-center"
                        >
                            <BookOpen className="mr-3" size={28} />
                            <strong>Explore Math Courses</strong>
                        </h3>
                        <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}>
                            Choose from courses designed for <strong>all grade levels</strong> - from <strong>elementary</strong> to <strong>college</strong>
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCourses(true)}
                        className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors focus:ring-4 focus:ring-white focus:ring-opacity-50"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        <strong>Browse Courses</strong> →
                    </button>
                </div>

                <button
                    onClick={() => onSpeakText('Explore our comprehensive math courses designed for all grade levels. From elementary counting to college calculus, find the perfect course for your learning needs.')}
                    className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Volume2 size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}><strong>Listen to Course Info</strong></span>
                </button>
            </div>
        </div>
    );
};