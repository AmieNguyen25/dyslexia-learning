import React from 'react';

interface LoginScreenProps {
    fontSize: number;
    lineSpacing: number;
    onLogin: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
    fontSize,
    lineSpacing,
    onLogin,
}) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
                <h1 style={{ fontSize: `${fontSize + 6}px`, lineHeight: lineSpacing }}
                    className="font-bold text-gray-800 mb-2">
                    Algebraic Concepts
                </h1>
                <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                    className="text-gray-600">
                    Dyslexia-friendly learning platform
                </p>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => onLogin('Alex Student')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl text-lg font-medium transition-colors focus:ring-4 focus:ring-blue-200"
                    style={{ fontSize: `${fontSize}px` }}
                >
                    Login as Alex Student
                </button>

                <button
                    onClick={() => onLogin('Demo User')}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-6 rounded-xl text-lg font-medium transition-colors focus:ring-4 focus:ring-gray-200"
                    style={{ fontSize: `${fontSize}px` }}
                >
                    Demo Login
                </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }}
                    className="text-blue-800 text-center">
                    🧠 Designed for learners with dyslexia<br />
                    📱 Full keyboard navigation support
                </p>
            </div>
        </div>
    </div>
);