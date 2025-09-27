import React from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
import type { VisualStep } from '../types';

interface VisualLessonProps {
    fontSize: number;
    lineSpacing: number;
    visualSteps: VisualStep[];
    equationStep: number;
    rewindCount: number;
    onNextStep: () => void;
    onPreviousStep: () => void;
    onSpeakText: (text: string) => void;
}

export const VisualLesson: React.FC<VisualLessonProps> = ({
    fontSize,
    lineSpacing,
    visualSteps,
    equationStep,
    rewindCount,
    onNextStep,
    onPreviousStep,
    onSpeakText,
}) => (
    <div className="bg-blue-50 p-6 rounded-xl">
        <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold mb-4 text-blue-800">
            📊 Visual Step-by-Step Solution
        </h3>

        <div className="space-y-4">
            {visualSteps.map((step, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-colors ${index <= equationStep ? 'border-blue-300 bg-white' : 'border-gray-200 bg-gray-50'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div style={{ fontSize: `${fontSize + 2}px`, fontFamily: 'monospace' }}
                            className="font-bold text-gray-800">
                            {step.step}
                        </div>
                        <button
                            onClick={() => onSpeakText(`${step.explanation}. The equation is: ${step.step}`)}
                            className="text-blue-600 hover:text-blue-700 focus:ring-4 focus:ring-blue-200 p-2 rounded"
                        >
                            <Volume2 size={18} />
                        </button>
                    </div>
                    <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                        className="text-gray-600 mt-2">
                        {step.explanation}
                    </p>
                </div>
            ))}
        </div>

        <div className="flex space-x-4 mt-6">
            <button
                onClick={onNextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg focus:ring-4 focus:ring-blue-200"
                style={{ fontSize: `${fontSize}px` }}
            >
                Next Step
            </button>
            <button
                onClick={onPreviousStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg focus:ring-4 focus:ring-gray-200 flex items-center space-x-2"
                style={{ fontSize: `${fontSize}px` }}
            >
                <RotateCcw size={18} />
                <span>Previous</span>
            </button>
        </div>
    </div>
);