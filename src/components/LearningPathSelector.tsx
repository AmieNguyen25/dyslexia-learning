import React from 'react';
import { Volume2, Eye } from 'lucide-react';
import type { LearningPath } from '../types';

interface LearningPathSelectorProps {
    fontSize: number;
    lineSpacing: number;
    learningPath: LearningPath;
    onPathChange: (path: LearningPath) => void;
}

export const LearningPathSelector: React.FC<LearningPathSelectorProps> = ({
    fontSize,
    lineSpacing,
    learningPath,
    onPathChange,
}) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing }}
            className="font-semibold mb-4 text-gray-800">
            🎨 Your Learning Style
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
                <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium mb-2">
                    Visual Learning
                </h4>
                <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                    className="text-gray-600">
                    Diagrams, infographics, and step-by-step visual guides
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
                <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium mb-2">
                    Auditory Learning
                </h4>
                <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                    className="text-gray-600">
                    Narrated walkthroughs with voice descriptions
                </p>
            </button>
        </div>
    </div>
);