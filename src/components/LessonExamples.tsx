import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Eye, BookOpen, Play } from 'lucide-react';
import type { LessonExample, LearningPath } from '../types';

interface LessonExamplesProps {
    examples: LessonExample[];
    fontSize: number;
    lineSpacing: number;
    learningPath: LearningPath;
    onSpeakText: (text: string) => void;
    onExamplesComplete: () => void;
}

export const LessonExamples: React.FC<LessonExamplesProps> = ({
    examples,
    fontSize,
    lineSpacing,
    learningPath,
    onSpeakText,
    onExamplesComplete
}) => {
    const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [stepsRevealed, setStepsRevealed] = useState<number[]>([]);

    const currentExample = examples[currentExampleIndex];
    const isLastExample = currentExampleIndex === examples.length - 1;

    const handleNext = () => {
        if (isLastExample) {
            onExamplesComplete();
        } else {
            setCurrentExampleIndex(currentExampleIndex + 1);
            setShowSolution(false);
            setCurrentStepIndex(0);
            setStepsRevealed([]);
        }
    };

    const handlePrevious = () => {
        if (currentExampleIndex > 0) {
            setCurrentExampleIndex(currentExampleIndex - 1);
            setShowSolution(false);
            setCurrentStepIndex(0);
            setStepsRevealed([]);
        }
    };

    const handleShowSolution = () => {
        setShowSolution(true);
    };

    const handleRevealStep = (stepIndex: number) => {
        if (!stepsRevealed.includes(stepIndex)) {
            setStepsRevealed([...stepsRevealed, stepIndex]);
        }
    };

    const handleRevealAllSteps = () => {
        if (currentExample.steps) {
            setStepsRevealed(currentExample.steps.map((_, index) => index));
        }
        setShowSolution(true);
    };

    const speakStep = (step: string, stepNumber: number) => {
        onSpeakText(`Step ${stepNumber + 1}: ${step}`);
    };

    const speakExample = () => {
        if (learningPath === 'auditory') {
            // For auditory learners, speak the entire example
            const text = `Example ${currentExampleIndex + 1}: ${currentExample.title}. 
            Problem: ${currentExample.problem}. 
            ${showSolution ? `Solution: ${currentExample.solution}. Explanation: ${currentExample.explanation}` : ''}`;
            onSpeakText(text);
        } else {
            // For visual learners, just speak the current state
            const text = `Example ${currentExampleIndex + 1}: ${currentExample.title}. Problem: ${currentExample.problem}.`;
            onSpeakText(text);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center mb-4">
                    <BookOpen className="text-blue-600 mr-3" size={32} />
                    <h2
                        style={{ fontSize: `${fontSize + 6}px` }}
                        className="font-bold text-gray-800"
                    >
                        Learn from Examples
                    </h2>
                </div>
                <p
                    style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                    className="text-gray-600"
                >
                    Study these {examples.length} examples carefully before taking the quiz
                </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                        Example {currentExampleIndex + 1} of {examples.length}
                    </span>
                    <div className="flex space-x-1">
                        {examples.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full ${index === currentExampleIndex ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentExampleIndex + 1) / examples.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Example Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                {/* Example Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3
                                style={{ fontSize: `${fontSize + 4}px` }}
                                className="font-bold mb-2"
                            >
                                {currentExample.title}
                            </h3>
                            <div className="flex items-center space-x-2 opacity-90">
                                <Eye size={16} />
                                <span style={{ fontSize: `${fontSize - 2}px` }}>
                                    Example {currentExampleIndex + 1}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={speakExample}
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-lg transition-colors"
                        >
                            <Volume2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Problem Section */}
                <div className="p-6 border-b border-gray-100">
                    <h4
                        style={{ fontSize: `${fontSize + 2}px` }}
                        className="font-semibold text-gray-800 mb-4 flex items-center"
                    >
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">
                            Problem
                        </span>
                        Let's solve this step by step
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p
                            style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing }}
                            className="text-gray-800 font-medium"
                        >
                            {currentExample.problem}
                        </p>
                    </div>

                    {/* Visual Aid */}
                    {currentExample.visualAid && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p
                                style={{ fontSize: `${fontSize}px` }}
                                className="text-blue-800"
                            >
                                💡 Visual Hint: {currentExample.visualAid}
                            </p>
                        </div>
                    )}

                    {/* Learning Path Specific Solution Display */}
                    {learningPath === 'visual' ? (
                        // Visual Learning: Step-by-step revelation
                        <div className="mt-6">
                            {currentExample.steps && currentExample.steps.length > 0 ? (
                                <div className="space-y-3">
                                    <h4
                                        style={{ fontSize: `${fontSize + 1}px` }}
                                        className="font-semibold text-gray-800 mb-4"
                                    >
                                        📝 Step-by-Step Solution:
                                    </h4>
                                    {currentExample.steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                                                stepsRevealed.includes(index)
                                                    ? 'border-green-300 bg-green-50'
                                                    : 'border-gray-200 bg-gray-50 opacity-60'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    {stepsRevealed.includes(index) ? (
                                                        <p
                                                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                                                            className="text-gray-800"
                                                        >
                                                            <strong>Step {index + 1}:</strong> {step}
                                                        </p>
                                                    ) : (
                                                        <p
                                                            style={{ fontSize: `${fontSize}px` }}
                                                            className="text-gray-500"
                                                        >
                                                            <strong>Step {index + 1}:</strong> Click to reveal
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2">
                                                    {stepsRevealed.includes(index) && (
                                                        <button
                                                            onClick={() => speakStep(step, index)}
                                                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                                                            aria-label={`Listen to step ${index + 1}`}
                                                        >
                                                            <Volume2 size={16} />
                                                        </button>
                                                    )}
                                                    {!stepsRevealed.includes(index) && (
                                                        <button
                                                            onClick={() => handleRevealStep(index)}
                                                            className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                                            style={{ fontSize: `${fontSize - 2}px` }}
                                                        >
                                                            Reveal
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {/* Show All Steps Button */}
                                    {stepsRevealed.length < currentExample.steps.length && (
                                        <div className="text-center mt-4">
                                            <button
                                                onClick={handleRevealAllSteps}
                                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                                style={{ fontSize: `${fontSize}px` }}
                                            >
                                                Show All Steps
                                            </button>
                                        </div>
                                    )}

                                    {/* Final Answer (shown when all steps revealed) */}
                                    {stepsRevealed.length === currentExample.steps.length && (
                                        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
                                            <p
                                                style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing }}
                                                className="text-green-800 font-bold text-center"
                                            >
                                                🎉 Final Answer: {currentExample.solution}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Fallback if no steps available
                                <div className="text-center">
                                    <button
                                        onClick={handleShowSolution}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                        style={{ fontSize: `${fontSize}px` }}
                                    >
                                        Show Solution
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Auditory Learning: Traditional approach with full audio support
                        <div className="mt-6">
                            {!showSolution ? (
                                <div className="text-center space-y-4">
                                    <button
                                        onClick={handleShowSolution}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors block mx-auto"
                                        style={{ fontSize: `${fontSize}px` }}
                                    >
                                        Show Solution
                                    </button>
                                    <button
                                        onClick={speakExample}
                                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
                                        style={{ fontSize: `${fontSize}px` }}
                                    >
                                        <Volume2 size={20} />
                                        <span>🎧 Listen to Full Explanation</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h4
                                        style={{ fontSize: `${fontSize + 2}px` }}
                                        className="font-semibold text-gray-800 mb-4 flex items-center"
                                    >
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">
                                            Solution
                                        </span>
                                        Here's how to solve it
                                        <button
                                            onClick={speakExample}
                                            className="ml-4 bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                                            aria-label="Listen to complete solution"
                                        >
                                            <Volume2 size={18} />
                                        </button>
                                    </h4>

                                    {/* Solution */}
                                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                                        <p
                                            style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing }}
                                            className="text-green-800 font-bold"
                                        >
                                            Answer: {currentExample.solution}
                                        </p>
                                    </div>

                                    {/* Explanation */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h5
                                            style={{ fontSize: `${fontSize + 1}px` }}
                                            className="font-semibold text-gray-700 mb-2"
                                        >
                                            Step-by-Step Explanation:
                                        </h5>
                                        <p
                                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                                            className="text-gray-700 whitespace-pre-line"
                                        >
                                            {currentExample.explanation}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Traditional Solution Section (backup) */}
                {showSolution && learningPath === 'visual' && (!currentExample.steps || currentExample.steps.length === 0) && (
                    <div className="p-6">
                        <h4
                            style={{ fontSize: `${fontSize + 2}px` }}
                            className="font-semibold text-gray-800 mb-4 flex items-center"
                        >
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">
                                Solution
                            </span>
                            Here's how to solve it
                        </h4>

                        {/* Solution */}
                        <div className="bg-green-50 rounded-lg p-4 mb-4">
                            <p
                                style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing }}
                                className="text-green-800 font-bold"
                            >
                                Answer: {currentExample.solution}
                            </p>
                        </div>

                        {/* Explanation */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h5
                                style={{ fontSize: `${fontSize + 1}px` }}
                                className="font-semibold text-gray-700 mb-2"
                            >
                                Step-by-Step Explanation:
                            </h5>
                            <p
                                style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                                className="text-gray-700 whitespace-pre-line"
                            >
                                {currentExample.explanation}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    disabled={currentExampleIndex === 0}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${currentExampleIndex === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-600 hover:bg-gray-700 text-white'
                        }`}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    <ChevronLeft size={20} className="mr-2" />
                    Previous
                </button>

                <div className="text-center">
                    <p
                        style={{ fontSize: `${fontSize - 2}px` }}
                        className="text-gray-600"
                    >
                        {learningPath === 'visual'
                            ? (currentExample.steps && stepsRevealed.length === currentExample.steps.length 
                                ? 'Great! You\'ve seen all the steps. Ready for the next example?' 
                                : 'Click to reveal each step at your own pace')
                            : (showSolution 
                                ? 'Great! Ready for the next example?' 
                                : 'Take your time to understand the problem')
                        }
                    </p>
                </div>

                <button
                    onClick={handleNext}
                    disabled={learningPath === 'visual' 
                        ? (currentExample.steps && currentExample.steps.length > 0 
                            ? stepsRevealed.length < currentExample.steps.length 
                            : !showSolution)
                        : !showSolution
                    }
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                        (learningPath === 'visual' 
                            ? (currentExample.steps && currentExample.steps.length > 0 
                                ? stepsRevealed.length < currentExample.steps.length 
                                : !showSolution)
                            : !showSolution)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : isLastExample
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {isLastExample ? 'Take Quiz' : 'Next'}
                    <ChevronRight size={20} className="ml-2" />
                </button>
            </div>

            {/* Encouragement Message */}
            <div className="mt-8 text-center p-4 bg-blue-50 rounded-lg">
                <p
                    style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                    className="text-blue-800"
                >
                    {learningPath === 'visual' 
                        ? '👀 💪 Excellent! Taking it step-by-step helps you understand better. You\'re ready for the quiz!'
                        : '🎧 💪 Great listening! Understanding these explanations will help you succeed on the quiz.'
                    }
                </p>
            </div>
        </div>
    );
};