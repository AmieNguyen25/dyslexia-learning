import React from 'react';
import { Volume2, Eye } from 'lucide-react';
import type { LearningPath } from '../types';

interface LearningPathSelectorProps {
    fontSize: number;
    lineSpacing: number;
    characterSpacing: number;
    learningPath: LearningPath;
    onPathChange: (path: LearningPath) => void;
}

export const LearningPathSelector: React.FC<LearningPathSelectorProps> = ({
    fontSize,
    lineSpacing,
    characterSpacing,
    learningPath,
    onPathChange,
}) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
            className="font-semibold mb-4 text-gray-800">
            🎨 <strong>Your Learning Style</strong>
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
            <button
                onClick={() => onPathChange('visual')}
                className={`p-6 rounded-xl border-2 transition-colors focus:ring-4 ${learningPath === 'visual'
                        ? 'border-blue-500 bg-blue-50 focus:ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300 focus:ring-gray-200'
                    }`}
            >
                <Eye className="mx-auto mb-3 text-blue-600" size={32} />
                <h4 style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }} className="font-medium mb-2">
                    <strong>Visual Learning</strong>
                </h4>
                <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                    className="text-gray-600">
                    <strong>Diagrams</strong>, <strong>infographics</strong>, and <strong>step-by-step</strong> visual guides
                </p>
            </button>

            <button
                onClick={() => onPathChange('auditory')}
                className={`p-6 rounded-xl border-2 transition-colors focus:ring-4 ${learningPath === 'auditory'
                        ? 'border-green-500 bg-green-50 focus:ring-green-200'
                        : 'border-gray-200 hover:border-gray-300 focus:ring-gray-200'
                    }`}
            >
                <Volume2 className="mx-auto mb-3 text-green-600" size={32} />
                <h4 style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }} className="font-medium mb-2">
                    <strong>Auditory Learning</strong>
                </h4>
                <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                    className="text-gray-600">
                    <strong>Narrated walkthroughs</strong> with <strong>voice descriptions</strong>
                </p>
            </button>
        </div>
    </div>
);