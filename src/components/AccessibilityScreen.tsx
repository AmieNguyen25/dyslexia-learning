import React from 'react';
import { Type, Palette, Volume2, Zap, Eye, EyeOff, Minus, Plus } from 'lucide-react';
import type { OnboardingData } from '../types';

interface AccessibilityScreenProps {
    fontSize: number;
    lineSpacing: number;
    preferences: OnboardingData['accessibilityPrefs'];
    onPreferencesChange: (data: Partial<OnboardingData>) => void;
    onSpeakText: (text: string) => void;
}

export const AccessibilityScreen: React.FC<AccessibilityScreenProps> = ({
    fontSize,
    lineSpacing,
    preferences,
    onPreferencesChange,
    onSpeakText,
}) => {
    const updatePreference = (key: keyof OnboardingData['accessibilityPrefs'], value: any) => {
        const newPrefs = { ...preferences, [key]: value };
        onPreferencesChange({ accessibilityPrefs: newPrefs });
    };

    const adjustFontSize = (delta: number) => {
        const newSize = Math.max(12, Math.min(32, preferences.fontSize + delta));
        updatePreference('fontSize', newSize);
    };

    const sampleText = "This is how your text will look: 2x + 5 = 15. Solve for x.";

    return (
        <div className="space-y-8">
            {/* Instructions */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 
                        style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }}
                        className="font-bold text-gray-800"
                    >
                        ⚙️ Customize Your Learning Experience
                    </h2>
                    <button
                        onClick={() => onSpeakText('Adjust these accessibility settings to make learning comfortable for you. You can change these anytime.')}
                        className="text-indigo-600 hover:text-indigo-700 p-2 rounded-lg hover:bg-indigo-50 transition-colors focus:ring-4 focus:ring-indigo-200"
                        aria-label="Listen to accessibility instructions"
                    >
                        <Volume2 size={18} />
                    </button>
                </div>

                <p 
                    style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                    className="text-gray-600 mb-6"
                >
                    These settings help make learning more comfortable and accessible for you. Don't worry - you can always change them later!
                </p>
            </div>

            {/* Font Size Control */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <Type className="text-blue-600" size={24} />
                        <h3 
                            style={{ fontSize: `${fontSize + 2}px` }}
                            className="font-bold text-gray-800"
                        >
                            Text Size
                        </h3>
                    </div>
                    <button
                        onClick={() => onSpeakText('Adjust the text size to make it comfortable for reading. Larger text can help reduce eye strain.')}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                        aria-label="Listen to font size help"
                    >
                        <Volume2 size={16} />
                    </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => adjustFontSize(-2)}
                        disabled={preferences.fontSize <= 12}
                        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl border-2 border-gray-300 hover:border-blue-400 transition-colors focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Minus size={16} />
                        <span style={{ fontSize: `${fontSize - 2}px` }}>Smaller</span>
                    </button>

                    <div className="flex items-center space-x-4">
                        <span 
                            style={{ fontSize: `${fontSize - 2}px` }}
                            className="text-gray-600 min-w-[60px] text-center"
                        >
                            {preferences.fontSize}px
                        </span>
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div 
                                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${((preferences.fontSize - 12) / 20) * 100}%` }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => adjustFontSize(2)}
                        disabled={preferences.fontSize >= 32}
                        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl border-2 border-gray-300 hover:border-blue-400 transition-colors focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus size={16} />
                        <span style={{ fontSize: `${fontSize - 2}px` }}>Larger</span>
                    </button>
                </div>

                {/* Sample Text Preview */}
                <div className="mt-4 p-4 bg-white rounded-xl border">
                    <p 
                        style={{ fontSize: `${preferences.fontSize}px`, lineHeight: 1.6 }}
                        className="text-gray-800"
                    >
                        {sampleText}
                    </p>
                </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Palette className="text-orange-600" size={24} />
                        <div>
                            <h3 
                                style={{ fontSize: `${fontSize + 2}px` }}
                                className="font-bold text-gray-800"
                            >
                                High Contrast Mode
                            </h3>
                            <p 
                                style={{ fontSize: `${fontSize - 2}px` }}
                                className="text-gray-600"
                            >
                                Makes text easier to read with stronger color differences
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => onSpeakText('High contrast mode makes text easier to read by using stronger color differences between text and background.')}
                            className="text-orange-600 hover:text-orange-700 p-2 rounded-lg hover:bg-orange-100 transition-colors"
                            aria-label="Listen to high contrast help"
                        >
                            <Volume2 size={16} />
                        </button>
                        <button
                            onClick={() => updatePreference('highContrast', !preferences.highContrast)}
                            className={`relative w-16 h-8 rounded-full transition-colors focus:ring-4 focus:ring-orange-200 ${
                                preferences.highContrast ? 'bg-orange-500' : 'bg-gray-300'
                            }`}
                            aria-label={`High contrast mode ${preferences.highContrast ? 'enabled' : 'disabled'}`}
                        >
                            <div 
                                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                                    preferences.highContrast ? 'transform translate-x-8' : ''
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Audio Assistance Toggle */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {preferences.audioEnabled ? (
                            <Volume2 className="text-green-600" size={24} />
                        ) : (
                            <EyeOff className="text-green-600" size={24} />
                        )}
                        <div>
                            <h3 
                                style={{ fontSize: `${fontSize + 2}px` }}
                                className="font-bold text-gray-800"
                            >
                                Audio Assistance
                            </h3>
                            <p 
                                style={{ fontSize: `${fontSize - 2}px` }}
                                className="text-gray-600"
                            >
                                Hear instructions and content read aloud
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => onSpeakText('Audio assistance reads instructions and content aloud to help with learning. This is especially helpful for auditory learners.')}
                            className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-100 transition-colors"
                            aria-label="Listen to audio assistance help"
                        >
                            <Volume2 size={16} />
                        </button>
                        <button
                            onClick={() => updatePreference('audioEnabled', !preferences.audioEnabled)}
                            className={`relative w-16 h-8 rounded-full transition-colors focus:ring-4 focus:ring-green-200 ${
                                preferences.audioEnabled ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            aria-label={`Audio assistance ${preferences.audioEnabled ? 'enabled' : 'disabled'}`}
                        >
                            <div 
                                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                                    preferences.audioEnabled ? 'transform translate-x-8' : ''
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Zap className="text-purple-600" size={24} />
                        <div>
                            <h3 
                                style={{ fontSize: `${fontSize + 2}px` }}
                                className="font-bold text-gray-800"
                            >
                                Reduce Motion
                            </h3>
                            <p 
                                style={{ fontSize: `${fontSize - 2}px` }}
                                className="text-gray-600"
                            >
                                Minimize animations and transitions for better focus
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => onSpeakText('Reduced motion minimizes animations and transitions that might be distracting or cause discomfort.')}
                            className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-100 transition-colors"
                            aria-label="Listen to reduced motion help"
                        >
                            <Volume2 size={16} />
                        </button>
                        <button
                            onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}
                            className={`relative w-16 h-8 rounded-full transition-colors focus:ring-4 focus:ring-purple-200 ${
                                preferences.reducedMotion ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                            aria-label={`Reduced motion ${preferences.reducedMotion ? 'enabled' : 'disabled'}`}
                        >
                            <div 
                                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                                    preferences.reducedMotion ? 'transform translate-x-8' : ''
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Settings Summary */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200">
                <h3 
                    style={{ fontSize: `${fontSize + 2}px` }}
                    className="font-bold text-gray-800 mb-4 flex items-center"
                >
                    <Eye className="text-indigo-600 mr-3" size={24} />
                    Your Accessibility Settings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                            📝 Text Size: <span className="font-medium">{preferences.fontSize}px</span>
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                            🎨 High Contrast: <span className="font-medium">{preferences.highContrast ? 'On' : 'Off'}</span>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                            🔊 Audio Help: <span className="font-medium">{preferences.audioEnabled ? 'On' : 'Off'}</span>
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                            ⚡ Reduced Motion: <span className="font-medium">{preferences.reducedMotion ? 'On' : 'Off'}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Reminder */}
            <div className="text-center">
                <p 
                    style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }}
                    className="text-gray-500"
                >
                    💡 Remember: You can always adjust these settings later in your profile
                </p>
            </div>
        </div>
    );
};