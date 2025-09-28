import React from 'react';
import { BarChart3 } from 'lucide-react';
import type { User } from '../types';

interface PerformanceMetricsProps {
    fontSize: number;
    characterSpacing: number;
    currentUser: User;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
    fontSize,
    characterSpacing,
    currentUser,
}) => (
    <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
                <h4 style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }} className="font-medium text-gray-800">
                    <strong>Quiz Performance</strong>
                </h4>
                <BarChart3 className="text-blue-600" size={24} />
            </div>
            <div style={{ fontSize: `${fontSize + 8}px`, letterSpacing: `${characterSpacing}px` }} className="text-3xl font-bold text-blue-600 mb-2">
                {currentUser?.performance.avgQuizScore}%
            </div>
            <p style={{ fontSize: `${fontSize - 4}px`, letterSpacing: `${characterSpacing}px` }} className="text-gray-600">
                <strong>Average</strong> score
            </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
                <h4 style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }} className="font-medium text-gray-800">
                    <strong>Engagement</strong>
                </h4>
                <div className="text-green-600">⏱️</div>
            </div>
            <div style={{ fontSize: `${fontSize + 8}px`, letterSpacing: `${characterSpacing}px` }} className="text-3xl font-bold text-green-600 mb-2">
                {currentUser?.performance.avgTimeOnTask}s
            </div>
            <p style={{ fontSize: `${fontSize - 4}px`, letterSpacing: `${characterSpacing}px` }} className="text-gray-600">
                <strong>Average time</strong> on task
            </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
                <h4 style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }} className="font-medium text-gray-800">
                    <strong>Confidence</strong>
                </h4>
                <div className="text-purple-600">🎯</div>
            </div>
            <div style={{ fontSize: `${fontSize + 8}px`, letterSpacing: `${characterSpacing}px` }} className="text-3xl font-bold text-purple-600 mb-2">
                {currentUser?.performance.confidenceLevel}/5
            </div>
            <p style={{ fontSize: `${fontSize - 4}px`, letterSpacing: `${characterSpacing}px` }} className="text-gray-600">
                <strong>Self-reported</strong> confidence
            </p>
        </div>
    </div>
);