import React from 'react';
import { Settings } from 'lucide-react';

interface AccessibilitySettingsProps {
    fontSize: number;
    lineSpacing: number;
    characterSpacing: number;
    onFontSizeChange: (size: number) => void;
    onLineSpacingChange: (spacing: number) => void;
    onCharacterSpacingChange: (spacing: number) => void;
}

export const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({
    fontSize,
    lineSpacing,
    characterSpacing,
    onFontSizeChange,
    onLineSpacingChange,
    onCharacterSpacingChange,
}) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing }}
            className="font-semibold mb-4 text-gray-800 flex items-center">
            <Settings className="mr-2" size={20} />
            <strong>Accessibility Settings</strong>
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
            <div>
                <label style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }} className="block text-gray-700 mb-2">
                    <strong>Font Size:</strong> {fontSize}px
                </label>
                <input
                    type="range"
                    min="14"
                    max="24"
                    value={fontSize}
                    onChange={(e) => onFontSizeChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:ring-4 focus:ring-blue-200"
                />
            </div>

            <div>
                <label style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }} className="block text-gray-700 mb-2">
                    <strong>Line Spacing:</strong> {lineSpacing}x
                </label>
                <input
                    type="range"
                    min="1.2"
                    max="2.0"
                    step="0.1"
                    value={lineSpacing}
                    onChange={(e) => onLineSpacingChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:ring-4 focus:ring-blue-200"
                />
            </div>

            <div>
                <label style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }} className="block text-gray-700 mb-2">
                    <strong>Character Spacing:</strong> {characterSpacing}px
                </label>
                <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={characterSpacing}
                    onChange={(e) => onCharacterSpacingChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:ring-4 focus:ring-blue-200"
                />
            </div>
        </div>
    </div>
);