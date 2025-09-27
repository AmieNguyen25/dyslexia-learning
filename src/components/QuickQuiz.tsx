import React from 'react';

interface QuickQuizProps {
    fontSize: number;
    lineSpacing: number;
    quizScore: number | null;
    confidenceScore: number | null;
    onAnswerSelect: (answer: number) => void;
    onConfidenceSelect: (level: number) => void;
}

export const QuickQuiz: React.FC<QuickQuizProps> = ({
    fontSize,
    lineSpacing,
    quizScore,
    confidenceScore,
    onAnswerSelect,
    onConfidenceSelect,
}) => (
    <div className="mt-8 bg-gray-50 p-6 rounded-xl">
        <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold mb-4 text-gray-800">
            Quick Understanding Check
        </h3>
        <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }} className="mb-4">
            What is the value of x in the equation 2x + 5 = 11?
        </p>

        <div className="space-y-2">
            {[1, 2, 3, 4].map((option) => (
                <button
                    key={option}
                    onClick={() => onAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors focus:ring-4 ${quizScore !== null && option === 3
                            ? 'border-green-500 bg-green-50 focus:ring-green-200'
                            : quizScore !== null && quizScore === 0
                                ? 'border-red-500 bg-red-50 focus:ring-red-200'
                                : 'border-gray-200 hover:border-gray-300 focus:ring-gray-200'
                        }`}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    x = {option}
                </button>
            ))}
        </div>

        {quizScore !== null && (
            <div className="mt-4 p-4 bg-white rounded-lg">
                <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium mb-2">
                    How confident do you feel about this concept? (1-5)
                </h4>
                <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                        <button
                            key={level}
                            onClick={() => onConfidenceSelect(level)}
                            className={`w-12 h-12 rounded-lg border-2 transition-colors focus:ring-4 ${confidenceScore === level
                                    ? 'border-blue-500 bg-blue-500 text-white focus:ring-blue-200'
                                    : 'border-gray-300 hover:border-gray-400 focus:ring-gray-200'
                                }`}
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>
);