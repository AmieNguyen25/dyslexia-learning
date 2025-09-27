import React from 'react';
import { GraduationCap, BookOpen, Target, Star, Volume2 } from 'lucide-react';
import type { OnboardingData } from '../types';

interface GradeComfortScreenProps {
    fontSize: number;
    lineSpacing: number;
    selectedGrade?: OnboardingData['gradeLevel'];
    selectedComfort?: OnboardingData['comfortLevel'];
    onSelectionChange: (data: Partial<OnboardingData>) => void;
    onSpeakText: (text: string) => void;
}

export const GradeComfortScreen: React.FC<GradeComfortScreenProps> = ({
    fontSize,
    lineSpacing,
    selectedGrade,
    selectedComfort,
    onSelectionChange,
    onSpeakText,
}) => {
    const gradeOptions = [
        {
            key: 'elementary' as const,
            title: 'Elementary',
            subtitle: 'Grades K-5',
            description: 'Learning basic math concepts',
            icon: '🎨',
            color: 'from-pink-100 to-red-100 border-pink-300',
            selectedColor: 'from-pink-200 to-red-200 border-pink-500 ring-4 ring-pink-200',
        },
        {
            key: 'middle' as const,
            title: 'Middle School',
            subtitle: 'Grades 6-8',
            description: 'Pre-algebra and introductory concepts',
            icon: '📚',
            color: 'from-blue-100 to-indigo-100 border-blue-300',
            selectedColor: 'from-blue-200 to-indigo-200 border-blue-500 ring-4 ring-blue-200',
        },
        {
            key: 'high' as const,
            title: 'High School',
            subtitle: 'Grades 9-12',
            description: 'Algebra I, II, and advanced topics',
            icon: '🎓',
            color: 'from-green-100 to-emerald-100 border-green-300',
            selectedColor: 'from-green-200 to-emerald-200 border-green-500 ring-4 ring-green-200',
        },
        {
            key: 'college' as const,
            title: 'College/Adult',
            subtitle: 'Higher education or review',
            description: 'Advanced algebra and college prep',
            icon: '🏛️',
            color: 'from-purple-100 to-violet-100 border-purple-300',
            selectedColor: 'from-purple-200 to-violet-200 border-purple-500 ring-4 ring-purple-200',
        },
    ];

    const comfortOptions = [
        {
            key: 'beginner' as const,
            title: 'Just Starting',
            description: 'New to algebra or need lots of help',
            icon: <BookOpen className="text-orange-600" size={32} />,
            color: 'from-orange-100 to-amber-100 border-orange-300',
            selectedColor: 'from-orange-200 to-amber-200 border-orange-500 ring-4 ring-orange-200',
        },
        {
            key: 'some-experience' as const,
            title: 'Some Experience',
            description: 'Know basics but need practice',
            icon: <Target className="text-blue-600" size={32} />,
            color: 'from-blue-100 to-sky-100 border-blue-300',
            selectedColor: 'from-blue-200 to-sky-200 border-blue-500 ring-4 ring-blue-200',
        },
        {
            key: 'comfortable' as const,
            title: 'Pretty Comfortable',
            description: 'Good with most concepts, want to improve',
            icon: <GraduationCap className="text-green-600" size={32} />,
            color: 'from-green-100 to-emerald-100 border-green-300',
            selectedColor: 'from-green-200 to-emerald-200 border-green-500 ring-4 ring-green-200',
        },
        {
            key: 'advanced' as const,
            title: 'Advanced',
            description: 'Strong skills, looking for challenges',
            icon: <Star className="text-purple-600" size={32} />,
            color: 'from-purple-100 to-violet-100 border-purple-300',
            selectedColor: 'from-purple-200 to-violet-200 border-purple-500 ring-4 ring-purple-200',
        },
    ];

    const handleGradeSelect = (grade: OnboardingData['gradeLevel']) => {
        onSelectionChange({ gradeLevel: grade });
    };

    const handleComfortSelect = (comfort: OnboardingData['comfortLevel']) => {
        onSelectionChange({ comfortLevel: comfort });
    };

    return (
        <div className="space-y-8">
            {/* Grade Level Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 
                        style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }}
                        className="font-bold text-gray-800"
                    >
                        📚 What's your current grade level?
                    </h2>
                    <button
                        onClick={() => onSpeakText('Select your current grade level. This helps us match content to your learning level.')}
                        className="text-indigo-600 hover:text-indigo-700 p-2 rounded-lg hover:bg-indigo-50 transition-colors focus:ring-4 focus:ring-indigo-200"
                        aria-label="Listen to grade level instructions"
                    >
                        <Volume2 size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gradeOptions.map((option) => (
                        <button
                            key={option.key}
                            onClick={() => handleGradeSelect(option.key)}
                            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
                                selectedGrade === option.key
                                    ? `bg-gradient-to-br ${option.selectedColor}`
                                    : `bg-gradient-to-br ${option.color} hover:shadow-lg`
                            }`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-4xl">{option.icon}</div>
                                <div className="flex-1">
                                    <h3 
                                        style={{ fontSize: `${fontSize + 2}px` }}
                                        className="font-bold text-gray-800 mb-1"
                                    >
                                        {option.title}
                                    </h3>
                                    <p 
                                        style={{ fontSize: `${fontSize - 2}px` }}
                                        className="text-gray-600 font-medium mb-2"
                                    >
                                        {option.subtitle}
                                    </p>
                                    <p 
                                        style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }}
                                        className="text-gray-500"
                                    >
                                        {option.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Comfort Level Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 
                        style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }}
                        className="font-bold text-gray-800"
                    >
                        💪 How comfortable are you with algebra?
                    </h2>
                    <button
                        onClick={() => onSpeakText('Tell us how comfortable you feel with algebra topics. This helps us adjust the difficulty level.')}
                        className="text-indigo-600 hover:text-indigo-700 p-2 rounded-lg hover:bg-indigo-50 transition-colors focus:ring-4 focus:ring-indigo-200"
                        aria-label="Listen to comfort level instructions"
                    >
                        <Volume2 size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comfortOptions.map((option) => (
                        <button
                            key={option.key}
                            onClick={() => handleComfortSelect(option.key)}
                            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
                                selectedComfort === option.key
                                    ? `bg-gradient-to-br ${option.selectedColor}`
                                    : `bg-gradient-to-br ${option.color} hover:shadow-lg`
                            }`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">{option.icon}</div>
                                <div className="flex-1">
                                    <h3 
                                        style={{ fontSize: `${fontSize + 2}px` }}
                                        className="font-bold text-gray-800 mb-2"
                                    >
                                        {option.title}
                                    </h3>
                                    <p 
                                        style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                                        className="text-gray-600"
                                    >
                                        {option.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selection Summary */}
            {(selectedGrade || selectedComfort) && (
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                    <h3 
                        style={{ fontSize: `${fontSize}px` }}
                        className="font-medium text-gray-700 mb-2"
                    >
                        Your Selection:
                    </h3>
                    <div className="space-y-1">
                        {selectedGrade && (
                            <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                                📚 Grade Level: <span className="font-medium">
                                    {gradeOptions.find(g => g.key === selectedGrade)?.title}
                                </span>
                            </p>
                        )}
                        {selectedComfort && (
                            <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                                💪 Comfort Level: <span className="font-medium">
                                    {comfortOptions.find(c => c.key === selectedComfort)?.title}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};