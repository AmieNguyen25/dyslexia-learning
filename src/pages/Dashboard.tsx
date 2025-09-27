import React from 'react';
import { Volume2 } from 'lucide-react';
import { LearningPathSelector } from '../components/LearningPathSelector';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { AccessibilitySettings } from '../components/AccessibilitySettings';
import type { User, LearningPath } from '../types';

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
}) => (
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
    </div>
);