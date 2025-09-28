import React from 'react';
import { Play, Clock, CheckCircle, Lock, Volume2, BookOpen } from 'lucide-react';
import type { Course, Lesson } from '../types';

interface CollegeAdultCoursesProps {
    fontSize: number;
    lineSpacing: number;
    onCourseSelect: (course: Course) => void;
    onSpeakText: (text: string) => void;
    userProgress?: { [courseId: string]: number };
}

export const CollegeAdultCourses: React.FC<CollegeAdultCoursesProps> = ({
    fontSize,
    lineSpacing,
    onCourseSelect,
    onSpeakText,
    userProgress = {}
}) => {
    const collegeAdultCourses: Course[] = [
        {
            id: 'advanced-algebra-functions',
            title: 'Advanced Algebra & Functions',
            description: 'Rational functions, complex numbers, sequences & series',
            icon: '🎯',
            color: 'from-indigo-700 to-purple-800',
            level: 'college',
            estimatedHours: 45,
            progress: userProgress['advanced-algebra-functions'] || 0,
            lessons: [
                {
                    id: 'rational-functions',
                    title: 'Rational Functions',
                    description: 'Graphing rational functions, asymptotes, and discontinuities',
                    duration: 60,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Asymptotes', 'Holes', 'End behavior', 'Domain restrictions']
                },
                {
                    id: 'complex-numbers',
                    title: 'Complex Numbers',
                    description: 'Operations with complex numbers and polar form',
                    duration: 50,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Imaginary unit', 'Complex plane', 'Polar form', 'De Moivre\'s theorem']
                },
                {
                    id: 'sequences-series',
                    title: 'Sequences and Series',
                    description: 'Arithmetic, geometric, and infinite series',
                    duration: 55,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Arithmetic sequences', 'Geometric series', 'Convergence tests']
                }
            ]
        },
        {
            id: 'pre-calculus-prep',
            title: 'Pre-Calculus Prep',
            description: 'Trig identities, polar coordinates, conics',
            icon: '📐',
            color: 'from-blue-700 to-indigo-800',
            level: 'college',
            estimatedHours: 50,
            progress: userProgress['pre-calculus-prep'] || 0,
            lessons: [
                {
                    id: 'trig-identities',
                    title: 'Trigonometric Identities',
                    description: 'Fundamental identities and proof techniques',
                    duration: 60,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Pythagorean identities', 'Sum/difference formulas', 'Double angle']
                },
                {
                    id: 'polar-coordinates',
                    title: 'Polar Coordinates',
                    description: 'Converting between rectangular and polar forms',
                    duration: 45,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Polar equations', 'Graphing polar curves', 'Coordinate conversion']
                },
                {
                    id: 'conic-sections',
                    title: 'Conic Sections',
                    description: 'Parabolas, ellipses, hyperbolas, and their properties',
                    duration: 55,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Standard forms', 'Graphing conics', 'Eccentricity', 'Applications']
                }
            ]
        },
        {
            id: 'calculus-readiness',
            title: 'Calculus Readiness',
            description: 'Limits, derivatives intro, integrals intro',
            icon: '∞',
            color: 'from-green-700 to-emerald-800',
            level: 'college',
            estimatedHours: 40,
            progress: userProgress['calculus-readiness'] || 0,
            prerequisites: ['pre-calculus-prep'],
            lessons: [
                {
                    id: 'limits-intro',
                    title: 'Introduction to Limits',
                    description: 'Limit concept, notation, and basic calculations',
                    duration: 50,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Limit definition', 'One-sided limits', 'Infinite limits', 'Continuity']
                },
                {
                    id: 'derivatives-basics',
                    title: 'Derivative Basics',
                    description: 'Definition of derivative and basic differentiation rules',
                    duration: 55,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Derivative definition', 'Power rule', 'Product rule', 'Chain rule']
                },
                {
                    id: 'integrals-intro',
                    title: 'Introduction to Integration',
                    description: 'Antiderivatives and basic integration techniques',
                    duration: 50,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Antiderivatives', 'Basic integration', 'Fundamental theorem']
                }
            ]
        },
        {
            id: 'applied-math-real-life',
            title: 'Applied Math for Real Life',
            description: 'Statistics, financial math, logic, matrices',
            icon: '💼',
            color: 'from-orange-700 to-red-700',
            level: 'college',
            estimatedHours: 35,
            progress: userProgress['applied-math-real-life'] || 0,
            lessons: [
                {
                    id: 'advanced-statistics',
                    title: 'Advanced Statistics',
                    description: 'Hypothesis testing, confidence intervals, regression analysis',
                    duration: 60,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Hypothesis testing', 'Confidence intervals', 'ANOVA', 'Chi-square']
                },
                {
                    id: 'financial-mathematics',
                    title: 'Financial Mathematics',
                    description: 'Compound interest, annuities, loans, and investment analysis',
                    duration: 45,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Compound interest', 'Annuities', 'Loan calculations', 'ROI']
                },
                {
                    id: 'logic-proofs',
                    title: 'Logic and Proofs',
                    description: 'Mathematical logic, proof techniques, and reasoning',
                    duration: 40,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Propositional logic', 'Proof methods', 'Mathematical induction']
                },
                {
                    id: 'matrix-operations',
                    title: 'Matrix Operations',
                    description: 'Matrix arithmetic, determinants, and system solving',
                    duration: 50,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Matrix arithmetic', 'Determinants', 'Inverse matrices', 'Systems']
                }
            ]
        },
        {
            id: 'math-data-tech',
            title: 'Math for Data & Tech',
            description: 'Probability, discrete math, linear algebra basics',
            icon: '💻',
            color: 'from-teal-700 to-cyan-800',
            level: 'college',
            estimatedHours: 42,
            progress: userProgress['math-data-tech'] || 0,
            lessons: [
                {
                    id: 'advanced-probability',
                    title: 'Advanced Probability',
                    description: 'Conditional probability, Bayes\' theorem, distributions',
                    duration: 55,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Conditional probability', 'Bayes\' theorem', 'Distributions', 'Expected value']
                },
                {
                    id: 'discrete-mathematics',
                    title: 'Discrete Mathematics',
                    description: 'Combinatorics, graph theory, and discrete structures',
                    duration: 50,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Combinatorics', 'Graph theory', 'Set theory', 'Boolean algebra']
                },
                {
                    id: 'linear-algebra-basics',
                    title: 'Linear Algebra Basics',
                    description: 'Vector spaces, linear transformations, eigenvalues',
                    duration: 60,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Vector spaces', 'Linear transformations', 'Eigenvalues', 'Eigenvectors']
                }
            ]
        }
    ];

    const getDifficultyColor = (difficulty: Lesson['difficulty']) => {
        switch (difficulty) {
            case 'beginner': return 'text-green-600 bg-green-100';
            case 'intermediate': return 'text-yellow-600 bg-yellow-100';
            case 'advanced': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const formatDuration = (minutes: number) => {
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="text-6xl">🏛️</div>
                    <div>
                        <h1 
                            style={{ fontSize: `${fontSize + 8}px`, lineHeight: lineSpacing }}
                            className="font-bold text-gray-800"
                        >
                            College/Adult Math Courses
                        </h1>
                        <p 
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="text-gray-600"
                        >
                            Advanced Mathematics for Higher Education & Professional Development
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onSpeakText('Welcome to College and Adult Math Courses! These advanced courses cover pre-calculus, calculus readiness, applied mathematics, and specialized topics for higher education and professional development.')}
                    className="mb-6 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-indigo-300 mx-auto"
                >
                    <Volume2 size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}>Listen to Overview</span>
                </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {collegeAdultCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Course Header */}
                        <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="text-4xl">{course.icon}</div>
                                    <div>
                                        <h3 
                                            style={{ fontSize: `${fontSize + 4}px` }}
                                            className="font-bold mb-2"
                                        >
                                            {course.title}
                                        </h3>
                                        <p 
                                            style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                                            className="opacity-90"
                                        >
                                            {course.description}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onSpeakText(`${course.title}: ${course.description}. This advanced course has ${course.lessons.length} lessons and takes about ${course.estimatedHours} hours to complete.`)}
                                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
                                >
                                    <Volume2 size={16} />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span style={{ fontSize: `${fontSize - 4}px` }} className="opacity-90">
                                        Progress: {course.progress}%
                                    </span>
                                    <span style={{ fontSize: `${fontSize - 4}px` }} className="opacity-90">
                                        {course.estimatedHours} hours
                                    </span>
                                </div>
                                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                                    <div 
                                        className="bg-white h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Prerequisites */}
                            {course.prerequisites && (
                                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                                    <span style={{ fontSize: `${fontSize - 4}px` }} className="opacity-90">
                                        📚 Prerequisites: Advanced mathematical background required
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Lessons List */}
                        <div className="p-6">
                            <h4 
                                style={{ fontSize: `${fontSize + 2}px` }}
                                className="font-bold text-gray-800 mb-4 flex items-center"
                            >
                                <BookOpen className="mr-2 text-indigo-600" size={20} />
                                Lessons ({course.lessons.length})
                            </h4>

                            <div className="space-y-3">
                                {course.lessons.slice(0, 3).map((lesson, index) => (
                                    <div
                                        key={lesson.id}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            lesson.locked 
                                                ? 'bg-gray-50 border-gray-200 opacity-60' 
                                                : 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <span className="text-lg font-bold text-gray-400">
                                                        {index + 1}
                                                    </span>
                                                    {lesson.completed ? (
                                                        <CheckCircle className="text-green-500" size={20} />
                                                    ) : lesson.locked ? (
                                                        <Lock className="text-gray-400" size={16} />
                                                    ) : (
                                                        <Play className="text-indigo-500" size={16} />
                                                    )}
                                                    <h5 
                                                        style={{ fontSize: `${fontSize}px` }}
                                                        className="font-medium text-gray-800"
                                                    >
                                                        {lesson.title}
                                                    </h5>
                                                </div>

                                                <p 
                                                    style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }}
                                                    className="text-gray-600 mb-2 ml-8"
                                                >
                                                    {lesson.description}
                                                </p>

                                                <div className="flex items-center space-x-4 ml-8">
                                                    <div className="flex items-center space-x-1">
                                                        <Clock size={14} className="text-gray-400" />
                                                        <span 
                                                            style={{ fontSize: `${fontSize - 6}px` }}
                                                            className="text-gray-500"
                                                        >
                                                            {formatDuration(lesson.duration)}
                                                        </span>
                                                    </div>
                                                    <span 
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}
                                                        style={{ fontSize: `${fontSize - 8}px` }}
                                                    >
                                                        {lesson.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {course.lessons.length > 3 && (
                                    <div className="text-center">
                                        <span 
                                            style={{ fontSize: `${fontSize - 4}px` }}
                                            className="text-gray-500"
                                        >
                                            +{course.lessons.length - 3} more lessons
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Course Action Button */}
                            <button
                                onClick={() => onCourseSelect(course)}
                                disabled={course.prerequisites && course.progress === 0}
                                className={`w-full mt-6 py-4 px-6 rounded-xl font-bold transition-all duration-200 focus:ring-4 ${
                                    course.prerequisites && course.progress === 0
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : course.progress > 0
                                        ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-200'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-200'
                                }`}
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                {course.prerequisites && course.progress === 0
                                    ? 'Complete Prerequisites First'
                                    : course.progress > 0
                                    ? 'Continue Course'
                                    : 'Start Course'
                                }
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Learning Tips */}
            <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-6 rounded-2xl border border-gray-200">
                <h3 
                    style={{ fontSize: `${fontSize + 4}px` }}
                    className="font-bold text-gray-800 mb-4 flex items-center"
                >
                    💡 College/Adult Learning Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700 mb-2">
                            📚 <strong>Self-Paced Learning:</strong> Set your own schedule and learning goals
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700">
                            💻 <strong>Use Technology:</strong> Leverage online tools and computational software
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700 mb-2">
                            🎯 <strong>Application Focus:</strong> Connect concepts to real-world applications
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700">
                            🔄 <strong>Review Prerequisites:</strong> Brush up on foundational concepts as needed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};