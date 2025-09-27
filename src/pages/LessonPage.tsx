import React, { useState } from 'react';
import { VisualLesson } from '../components/VisualLesson';
import { AuditoryLesson } from '../components/AuditoryLesson';
import { QuickQuiz } from '../components/QuickQuiz';
import type { LearningPath, VisualStep } from '../types';

interface LessonPageProps {
    fontSize: number;
    lineSpacing: number;
    learningPath: LearningPath;
    timeOnTask: number;
    onSpeakText: (text: string) => void;
}

const visualSteps: VisualStep[] = [
    { step: '2x + 5 = 11', explanation: 'Start with the equation' },
    { step: '2x + 5 - 5 = 11 - 5', explanation: 'Subtract 5 from both sides' },
    { step: '2x = 6', explanation: 'Simplify both sides' },
    { step: 'x = 3', explanation: 'Divide both sides by 2' }
];

export const LessonPage: React.FC<LessonPageProps> = ({
    fontSize,
    lineSpacing,
    learningPath,
    timeOnTask,
    onSpeakText,
}) => {
    const [equationStep, setEquationStep] = useState(0);
    const [rewindCount, setRewindCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [quizScore, setQuizScore] = useState<number | null>(null);
    const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
    const [currentEquation] = useState('2x + 5 = 11');

    const handleNextStep = () => {
        setEquationStep(Math.min(equationStep + 1, visualSteps.length - 1));
    };

    const handlePreviousStep = () => {
        setEquationStep(Math.max(equationStep - 1, 0));
        setRewindCount(prev => prev + 1);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            onSpeakText(`Let's solve the equation ${currentEquation}. First, we need to isolate x by getting rid of the 5 on the left side. We subtract 5 from both sides. This gives us 2x equals 6. Now we divide both sides by 2 to get x equals 3.`);
        }
    };

    const handleRewind = () => {
        setRewindCount(prev => prev + 1);
        onSpeakText(`Let me repeat that. We're solving ${currentEquation}`);
    };

    const handleAnswerSelect = (answer: number) => {
        setQuizScore(answer === 3 ? 100 : 0);
        onSpeakText(answer === 3 ? 'Correct! Great job!' : 'Not quite right. Try again!');
    };

    const handleConfidenceSelect = (level: number) => {
        setConfidenceScore(level);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-sm border p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }}
                        className="font-bold text-gray-800">
                        Solving Linear Equations
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Time: {timeOnTask}s</span>
                        <span>Rewinds: {rewindCount}</span>
                    </div>
                </div>

                {learningPath === 'visual' ? (
                    <VisualLesson
                        fontSize={fontSize}
                        lineSpacing={lineSpacing}
                        visualSteps={visualSteps}
                        equationStep={equationStep}
                        rewindCount={rewindCount}
                        onNextStep={handleNextStep}
                        onPreviousStep={handlePreviousStep}
                        onSpeakText={onSpeakText}
                    />
                ) : (
                    <AuditoryLesson
                        fontSize={fontSize}
                        currentEquation={currentEquation}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        onRewind={handleRewind}
                    />
                )}

                <QuickQuiz
                    fontSize={fontSize}
                    lineSpacing={lineSpacing}
                    quizScore={quizScore}
                    confidenceScore={confidenceScore}
                    onAnswerSelect={handleAnswerSelect}
                    onConfidenceSelect={handleConfidenceSelect}
                />
            </div>
        </div>
    );
};