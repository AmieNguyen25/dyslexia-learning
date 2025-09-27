import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AuditoryLessonProps {
    fontSize: number;
    currentEquation: string;
    isPlaying: boolean;
    onPlayPause: () => void;
    onRewind: () => void;
}

export const AuditoryLesson: React.FC<AuditoryLessonProps> = ({
    fontSize,
    currentEquation,
    isPlaying,
    onPlayPause,
    onRewind,
}) => (
    <div className="bg-green-50 p-6 rounded-xl">
        <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold mb-4 text-green-800 flex items-center">
            🎧 Audio Walkthrough
        </h3>

        <div className="bg-white p-6 rounded-lg border">
            <div className="text-center mb-6">
                <div style={{ fontSize: `${fontSize + 4}px`, fontFamily: 'monospace' }}
                    className="font-bold text-gray-800 mb-4">
                    {currentEquation}
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onPlayPause}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg focus:ring-4 ${isPlaying
                                ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-200'
                                : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-200'
                            }`}
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        <span style={{ fontSize: `${fontSize}px` }}>
                            {isPlaying ? 'Pause' : 'Play Walkthrough'}
                        </span>
                    </button>

                    <button
                        onClick={onRewind}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg focus:ring-4 focus:ring-gray-200"
                    >
                        <RotateCcw size={20} />
                        <span style={{ fontSize: `${fontSize}px` }}>Rewind</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);