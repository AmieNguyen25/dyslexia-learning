import React from 'react';
import { HelpCircle, Trophy, RefreshCw, TrendingUp, Heart, Volume2, Check } from 'lucide-react';
import type { OnboardingData } from '../types';

interface LearningGoalScreenProps {
    fontSize: number;
    lineSpacing: number;
    selectedGoals: OnboardingData['learningGoals'];
    onGoalsChange: (data: Partial<OnboardingData>) => void;
    onSpeakText: (text: string) => void;
}

export const LearningGoalScreen: React.FC<LearningGoalScreenProps> = ({
    fontSize,
    lineSpacing,
    selectedGoals,
    onGoalsChange,
    onSpeakText,
}) => {
    const goalOptions = [
        {
            key: 'homework-help' as const,
            title: 'Homework Help',
            description: 'Get help with current assignments and daily math work',
            icon: <HelpCircle className="text-blue-600" size={36} />,
            color: 'from-blue-100 to-sky-100 border-blue-300',
            selectedColor: 'from-blue-200 to-sky-200 border-blue-500 ring-4 ring-blue-200',
            benefit: 'Step-by-step guidance for assignments',
        },
        {
            key: 'test-prep' as const,
            title: 'Test Preparation',
            description: 'Prepare for upcoming exams, quizzes, and standardized tests',
            icon: <Trophy className="text-yellow-600" size={36} />,
            color: 'from-yellow-100 to-amber-100 border-yellow-300',
            selectedColor: 'from-yellow-200 to-amber-200 border-yellow-500 ring-4 ring-yellow-200',
            benefit: 'Focused practice for better test scores',
        },
        {
            key: 'concept-review' as const,
            title: 'Concept Review',
            description: 'Review and strengthen understanding of algebra fundamentals',
            icon: <RefreshCw className="text-green-600" size={36} />,
            color: 'from-green-100 to-emerald-100 border-green-300',
            selectedColor: 'from-green-200 to-emerald-200 border-green-500 ring-4 ring-green-200',
            benefit: 'Build solid foundation in key concepts',
        },
        {
            key: 'skill-building' as const,
            title: 'Skill Building',
            description: 'Develop new problem-solving techniques and advanced skills',
            icon: <TrendingUp className="text-purple-600" size={36} />,
            color: 'from-purple-100 to-violet-100 border-purple-300',
            selectedColor: 'from-purple-200 to-violet-200 border-purple-500 ring-4 ring-purple-200',
            benefit: 'Advance to more challenging problems',
        },
        {
            key: 'confidence-boost' as const,
            title: 'Confidence Building',
            description: 'Overcome math anxiety and build confidence in your abilities',
            icon: <Heart className="text-pink-600" size={36} />,
            color: 'from-pink-100 to-rose-100 border-pink-300',
            selectedColor: 'from-pink-200 to-rose-200 border-pink-500 ring-4 ring-pink-200',
            benefit: 'Feel more confident about math',
        },
    ];

    const handleGoalToggle = (goal: OnboardingData['learningGoals'][0]) => {
        const newGoals = selectedGoals.includes(goal)
            ? selectedGoals.filter(g => g !== goal)
            : [...selectedGoals, goal];
        
        onGoalsChange({ learningGoals: newGoals });
    };

    const isSelected = (goal: OnboardingData['learningGoals'][0]) => {
        return selectedGoals.includes(goal);
    };

    return (
        <div className="space-y-8">
            {/* Instructions */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 
                        style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }}
                        className="font-bold text-gray-800"
                    >
                        🎯 What would you like to achieve?
                    </h2>
                    <button
                        onClick={() => onSpeakText('Select one or more learning goals that match what you want to accomplish. You can choose multiple goals.')}
                        className="text-indigo-600 hover:text-indigo-700 p-2 rounded-lg hover:bg-indigo-50 transition-colors focus:ring-4 focus:ring-indigo-200"
                        aria-label="Listen to learning goal instructions"
                    >
                        <Volume2 size={18} />
                    </button>
                </div>

                <p 
                    style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                    className="text-gray-600 mb-6"
                >
                    Choose one or more goals that match what you want to accomplish. We'll personalize your learning path based on your selections.
                </p>
            </div>

            {/* Goal Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goalOptions.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => handleGoalToggle(option.key)}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-200 text-left hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
                            isSelected(option.key)
                                ? `bg-gradient-to-br ${option.selectedColor}`
                                : `bg-gradient-to-br ${option.color} hover:shadow-lg`
                        }`}
                    >
                        {/* Selection Indicator */}
                        {isSelected(option.key) && (
                            <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-1">
                                <Check size={16} />
                            </div>
                        )}

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">{option.icon}</div>
                            <div className="flex-1">
                                <h3 
                                    style={{ fontSize: `${fontSize + 2}px` }}
                                    className="font-bold text-gray-800 mb-3"
                                >
                                    {option.title}
                                </h3>
                                <p 
                                    style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                                    className="text-gray-600 mb-3"
                                >
                                    {option.description}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <p 
                                        style={{ fontSize: `${fontSize - 4}px` }}
                                        className="text-green-700 font-medium"
                                    >
                                        {option.benefit}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Selection Summary */}
            {selectedGoals.length > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-green-500 text-white rounded-full p-2">
                            <Check size={20} />
                        </div>
                        <h3 
                            style={{ fontSize: `${fontSize + 2}px` }}
                            className="font-bold text-gray-800"
                        >
                            Your Learning Goals ({selectedGoals.length} selected)
                        </h3>
                    </div>
                    
                    <div className="space-y-2">
                        {selectedGoals.map((goalKey) => {
                            const goal = goalOptions.find(g => g.key === goalKey);
                            return goal ? (
                                <div key={goalKey} className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <p 
                                        style={{ fontSize: `${fontSize - 2}px` }}
                                        className="text-gray-700"
                                    >
                                        <span className="font-medium">{goal.title}:</span> {goal.benefit}
                                    </p>
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="mt-4 p-3 bg-white bg-opacity-70 rounded-lg">
                        <p 
                            style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }}
                            className="text-gray-600 text-center"
                        >
                            💡 <span className="font-medium">Perfect!</span> We'll create a personalized learning path that focuses on these goals.
                        </p>
                    </div>
                </div>
            )}

            {/* Helper Text */}
            <div className="text-center">
                <p 
                    style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }}
                    className="text-gray-500"
                >
                    💡 Tip: You can always change your goals later in your settings
                </p>
            </div>
        </div>
    );
};