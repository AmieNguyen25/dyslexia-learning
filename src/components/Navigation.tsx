import React from 'react';
import { User, LogOut, Home, BookOpen, Calendar } from 'lucide-react';
import type { User as UserType, CurrentPage, Course } from '../types';

interface NavigationProps {
    currentUser: UserType;
    currentPage: CurrentPage;
    fontSize: number;
    onPageChange: (page: CurrentPage) => void;
    onLogout: () => void;
    selectedCourse?: Course | null;
}

export const Navigation: React.FC<NavigationProps> = ({
    currentUser,
    currentPage,
    fontSize,
    onPageChange,
    onLogout,
    selectedCourse,
}) => (
    <nav className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                    <h1 style={{ fontSize: `${fontSize + 2}px` }} className="font-bold text-gray-800">
                        Algebraic Concepts
                    </h1>
                    {selectedCourse && currentPage === 'lesson' && (
                        <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-lg">
                            <span className="text-lg">{selectedCourse.icon}</span>
                            <span style={{ fontSize: `${fontSize - 2}px` }} className="text-blue-700 font-medium">
                                {selectedCourse.title}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => onPageChange('dashboard')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:ring-4 focus:ring-blue-200 ${currentPage === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Home size={18} />
                        <span style={{ fontSize: `${fontSize - 2}px` }}>Dashboard</span>
                    </button>

                    <button
                        onClick={() => onPageChange('lesson')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:ring-4 focus:ring-green-200 ${currentPage === 'lesson' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <BookOpen size={18} />
                        <span style={{ fontSize: `${fontSize - 2}px` }}>Lesson</span>
                    </button>

                    <button
                        onClick={() => onPageChange('study-plan')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:ring-4 focus:ring-purple-200 ${currentPage === 'study-plan' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Calendar size={18} />
                        <span style={{ fontSize: `${fontSize - 2}px` }}>Study Plan</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                    <User size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}>{currentUser?.name}</span>
                </div>

                <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors focus:ring-4 focus:ring-red-200 px-3 py-2 rounded-lg"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    </nav>
);