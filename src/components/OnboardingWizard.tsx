import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GradeComfortScreen } from './GradeComfortScreen';
import { LearningGoalScreen } from './LearningGoalScreen';
import { AccessibilityScreen } from './AccessibilityScreen';
import type { OnboardingData } from '../types';

interface OnboardingWizardProps {
    fontSize: number;
    lineSpacing: number;
    onComplete: (data: OnboardingData) => void;
    onSpeakText: (text: string) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
    fontSize,
    lineSpacing,
    onComplete,
    onSpeakText,
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
        accessibilityPrefs: {
            fontSize: fontSize,
            highContrast: false,
            audioEnabled: true,
            reducedMotion: false,
        }
    });

    const totalSteps = 3;

    const updateOnboardingData = (stepData: Partial<OnboardingData>) => {
        setOnboardingData(prev => ({ ...prev, ...stepData }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Complete onboarding
            onComplete(onboardingData as OnboardingData);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const isStepComplete = (): boolean => {
        switch (currentStep) {
            case 1:
                return !!(onboardingData.gradeLevel && onboardingData.comfortLevel);
            case 2:
                return !!(onboardingData.learningGoals && onboardingData.learningGoals.length > 0);
            case 3:
                return !!onboardingData.accessibilityPrefs;
            default:
                return false;
        }
    };

    const getStepTitle = (): string => {
        switch (currentStep) {
            case 1:
                return "Let's get to know you! 👋";
            case 2:
                return "What would you like to achieve? 🎯";
            case 3:
                return "Make it comfortable for you! ⚙️";
            default:
                return "Welcome!";
        }
    };

    const getStepDescription = (): string => {
        switch (currentStep) {
            case 1:
                return "Tell us about your current math level so we can personalize your experience";
            case 2:
                return "Choose your learning goals to help us create the perfect path for you";
            case 3:
                return "Customize your accessibility settings for the best learning experience";
            default:
                return "";
        }
    };

    const welcomeText = `Welcome to your personalized algebra learning journey! This quick setup will help us create the perfect learning experience for you. ${getStepDescription()}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center space-x-4 mb-4">
                        <div className="text-4xl">🎓</div>
                        <h1 
                            style={{ fontSize: `${fontSize + 8}px`, lineHeight: lineSpacing }}
                            className="font-bold text-gray-800"
                        >
                            {getStepTitle()}
                        </h1>
                    </div>
                    
                    <p 
                        style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                        className="text-gray-600 mb-6"
                    >
                        {getStepDescription()}
                    </p>

                    <button
                        onClick={() => onSpeakText(welcomeText)}
                        className="mb-6 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-indigo-300 mx-auto"
                        aria-label="Listen to instructions"
                    >
                        <Volume2 size={18} />
                        <span style={{ fontSize: `${fontSize - 2}px` }}>Listen to Instructions</span>
                    </button>

                    {/* Progress Indicator */}
                    <div className="flex justify-center space-x-2 mb-8">
                        {[1, 2, 3].map((step) => (
                            <div
                                key={step}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    step === currentStep
                                        ? 'bg-indigo-600'
                                        : step < currentStep
                                        ? 'bg-green-500'
                                        : 'bg-gray-300'
                                }`}
                                aria-label={`Step ${step} ${
                                    step === currentStep ? 'current' : step < currentStep ? 'completed' : 'upcoming'
                                }`}
                            />
                        ))}
                    </div>

                    <p 
                        style={{ fontSize: `${fontSize - 4}px` }}
                        className="text-gray-500"
                    >
                        Step {currentStep} of {totalSteps}
                    </p>
                </div>

                {/* Step Content */}
                <div className="mb-8">
                    {currentStep === 1 && (
                        <GradeComfortScreen
                            fontSize={fontSize}
                            lineSpacing={lineSpacing}
                            selectedGrade={onboardingData.gradeLevel}
                            selectedComfort={onboardingData.comfortLevel}
                            onSelectionChange={updateOnboardingData}
                            onSpeakText={onSpeakText}
                        />
                    )}
                    
                    {currentStep === 2 && (
                        <LearningGoalScreen
                            fontSize={fontSize}
                            lineSpacing={lineSpacing}
                            selectedGoals={onboardingData.learningGoals || []}
                            onGoalsChange={updateOnboardingData}
                            onSpeakText={onSpeakText}
                        />
                    )}
                    
                    {currentStep === 3 && (
                        <AccessibilityScreen
                            fontSize={fontSize}
                            lineSpacing={lineSpacing}
                            preferences={onboardingData.accessibilityPrefs!}
                            onPreferencesChange={updateOnboardingData}
                            onSpeakText={onSpeakText}
                        />
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors focus:ring-4 ${
                            currentStep === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-200'
                        }`}
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isStepComplete()}
                        className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-colors focus:ring-4 ${
                            !isStepComplete()
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : currentStep === totalSteps
                                ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-200'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-200'
                        }`}
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        <span>
                            {currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
                        </span>
                        {currentStep < totalSteps && <ChevronRight size={20} />}
                        {currentStep === totalSteps && <span className="text-xl">🚀</span>}
                    </button>
                </div>

                {/* Skip Option */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => onComplete({
                            gradeLevel: 'middle',
                            comfortLevel: 'some-experience',
                            learningGoals: ['concept-review'],
                            accessibilityPrefs: {
                                fontSize: fontSize,
                                highContrast: false,
                                audioEnabled: true,
                                reducedMotion: false,
                            }
                        })}
                        className="text-gray-500 hover:text-gray-700 underline focus:outline-none focus:ring-2 focus:ring-gray-300 rounded px-2 py-1"
                        style={{ fontSize: `${fontSize - 4}px` }}
                    >
                        Skip setup and use defaults
                    </button>
                </div>
            </div>
        </div>
    );
};