import React from 'react';
import { Play, Clock, CheckCircle, Lock, Volume2, TrendingUp } from 'lucide-react';
import type { Course, Lesson } from '../types';

interface HighSchoolCoursesProps {
    fontSize: number;
    lineSpacing: number;
    onCourseSelect: (course: Course) => void;
    onSpeakText: (text: string) => void;
    userProgress?: { [courseId: string]: number };
}

export const HighSchoolCourses: React.FC<HighSchoolCoursesProps> = ({
    fontSize,
    lineSpacing,
    onCourseSelect,
    onSpeakText,
    userProgress = {}
}) => {
    const highSchoolCourses: Course[] = [
        {
            id: 'algebra-1-mastery',
            title: 'Algebra I Mastery',
            description: 'Linear equations, slope, systems of equations',
            icon: '📈',
            color: 'from-blue-600 to-indigo-700',
            level: 'high',
            estimatedHours: 35,
            progress: userProgress['algebra-1-mastery'] || 0,
            lessons: [
                {
                    id: 'linear-equations',
                    title: 'Linear Equations',
                    description: 'Solving multi-step linear equations and applications',
                    duration: 45,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Multi-step equations', 'Variables on both sides', 'Applications']
                },
                {
                    id: 'graphing-lines',
                    title: 'Graphing Linear Equations',
                    description: 'Slope-intercept form, point-slope form, and graphing techniques',
                    duration: 50,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Slope-intercept', 'Point-slope', 'Standard form', 'Parallel/perpendicular']
                },
                {
                    id: 'systems-equations',
                    title: 'Systems of Equations',
                    description: 'Solving systems by graphing, substitution, and elimination',
                    duration: 55,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Graphing method', 'Substitution', 'Elimination', 'Word problems']
                },
                {
                    id: 'inequalities-graphing',
                    title: 'Linear Inequalities',
                    description: 'Solving and graphing linear inequalities in one and two variables',
                    duration: 40,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Inequality solving', '2D graphing', 'Compound inequalities']
                },
                {
                    id: 'functions-intro',
                    title: 'Introduction to Functions',
                    description: 'Function notation, domain, range, and function evaluation',
                    duration: 45,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Function notation', 'Domain/range', 'Function evaluation', 'Graphs']
                }
            ]
        },
        {
            id: 'algebra-2-mastery',
            title: 'Algebra II Mastery',
            description: 'Quadratics, polynomials, exponentials, logarithms',
            icon: '📊',
            color: 'from-purple-600 to-violet-700',
            level: 'high',
            estimatedHours: 40,
            progress: userProgress['algebra-2-mastery'] || 0,
            prerequisites: ['algebra-1-mastery'],
            lessons: [
                {
                    id: 'quadratic-functions',
                    title: 'Quadratic Functions',
                    description: 'Graphing parabolas, vertex form, and transformations',
                    duration: 50,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Parabolas', 'Vertex form', 'Transformations', 'Axis of symmetry']
                },
                {
                    id: 'solving-quadratics',
                    title: 'Solving Quadratic Equations',
                    description: 'Factoring, quadratic formula, and completing the square',
                    duration: 55,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Factoring', 'Quadratic formula', 'Completing square', 'Discriminant']
                },
                {
                    id: 'polynomial-operations',
                    title: 'Polynomial Operations',
                    description: 'Adding, subtracting, multiplying, and dividing polynomials',
                    duration: 45,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Polynomial arithmetic', 'Long division', 'Synthetic division']
                },
                {
                    id: 'exponential-functions',
                    title: 'Exponential Functions',
                    description: 'Exponential growth, decay, and function properties',
                    duration: 40,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Exponential growth', 'Decay models', 'Function properties']
                },
                {
                    id: 'logarithms',
                    title: 'Logarithmic Functions',
                    description: 'Properties of logarithms and solving logarithmic equations',
                    duration: 50,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Log properties', 'Change of base', 'Logarithmic equations']
                }
            ]
        },
        {
            id: 'geometry-in-action',
            title: 'Geometry in Action',
            description: 'Proofs, theorems, coordinate geometry',
            icon: '📐',
            color: 'from-green-600 to-emerald-700',
            level: 'high',
            estimatedHours: 30,
            progress: userProgress['geometry-in-action'] || 0,
            lessons: [
                {
                    id: 'geometric-proofs',
                    title: 'Geometric Proofs',
                    description: 'Two-column proofs, paragraph proofs, and logical reasoning',
                    duration: 50,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Two-column proofs', 'Logical reasoning', 'Given statements']
                },
                {
                    id: 'triangle-theorems',
                    title: 'Triangle Theorems',
                    description: 'Congruence, similarity, and triangle properties',
                    duration: 45,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Congruence', 'Similarity', 'Triangle inequality', 'Special triangles']
                },
                {
                    id: 'circles-advanced',
                    title: 'Advanced Circle Geometry',
                    description: 'Circle theorems, inscribed angles, and arc relationships',
                    duration: 40,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Circle theorems', 'Inscribed angles', 'Arc measures', 'Tangents']
                },
                {
                    id: 'coordinate-geometry',
                    title: 'Coordinate Geometry',
                    description: 'Distance, midpoint, and slope in the coordinate plane',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Distance formula', 'Midpoint formula', 'Coordinate proofs']
                }
            ]
        },
        {
            id: 'functions-graphs',
            title: 'Functions & Graphs',
            description: 'Transformations, inverse functions, composite functions',
            icon: '📉',
            color: 'from-orange-600 to-red-600',
            level: 'high',
            estimatedHours: 25,
            progress: userProgress['functions-graphs'] || 0,
            prerequisites: ['algebra-1-mastery'],
            lessons: [
                {
                    id: 'function-transformations',
                    title: 'Function Transformations',
                    description: 'Shifts, stretches, reflections, and combined transformations',
                    duration: 45,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Vertical shifts', 'Horizontal shifts', 'Stretches', 'Reflections']
                },
                {
                    id: 'inverse-functions',
                    title: 'Inverse Functions',
                    description: 'Finding and graphing inverse functions',
                    duration: 40,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Inverse definition', 'Finding inverses', 'Graphing inverses']
                },
                {
                    id: 'composite-functions',
                    title: 'Composite Functions',
                    description: 'Function composition and operations with functions',
                    duration: 35,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Function composition', 'Domain restrictions', 'Operations']
                }
            ]
        },
        {
            id: 'probability-statistics',
            title: 'Probability & Statistics',
            description: 'Standard deviation, normal distribution, data modeling',
            icon: '📊',
            color: 'from-teal-600 to-cyan-700',
            level: 'high',
            estimatedHours: 20,
            progress: userProgress['probability-statistics'] || 0,
            lessons: [
                {
                    id: 'descriptive-statistics',
                    title: 'Descriptive Statistics',
                    description: 'Mean, median, mode, range, and standard deviation',
                    duration: 40,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Central tendency', 'Variability', 'Standard deviation', 'Outliers']
                },
                {
                    id: 'normal-distribution',
                    title: 'Normal Distribution',
                    description: 'Bell curves, z-scores, and standard normal distribution',
                    duration: 45,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Bell curve', 'Z-scores', 'Empirical rule', '68-95-99.7 rule']
                },
                {
                    id: 'data-modeling',
                    title: 'Data Modeling',
                    description: 'Linear regression, correlation, and trend analysis',
                    duration: 50,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Linear regression', 'Correlation coefficient', 'Residuals']
                }
            ]
        },
        {
            id: 'intro-trigonometry',
            title: 'Introduction to Trigonometry',
            description: 'Right triangles, sine/cosine/tangent, unit circle basics',
            icon: '📱',
            color: 'from-indigo-600 to-purple-700',
            level: 'high',
            estimatedHours: 28,
            progress: userProgress['intro-trigonometry'] || 0,
            prerequisites: ['geometry-in-action'],
            lessons: [
                {
                    id: 'right-triangle-trig',
                    title: 'Right Triangle Trigonometry',
                    description: 'SOH CAH TOA and solving right triangles',
                    duration: 45,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['SOH CAH TOA', 'Solving triangles', 'Applications']
                },
                {
                    id: 'unit-circle-intro',
                    title: 'Unit Circle Introduction',
                    description: 'Special angles and coordinate pairs on the unit circle',
                    duration: 50,
                    difficulty: 'advanced',
                    completed: false,
                    locked: false,
                    topics: ['Unit circle', 'Special angles', 'Reference angles']
                },
                {
                    id: 'trig-functions-graphs',
                    title: 'Trigonometric Function Graphs',
                    description: 'Graphing sine, cosine, and tangent functions',
                    duration: 40,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Sine graphs', 'Cosine graphs', 'Period', 'Amplitude']
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
                    <div className="text-6xl">🎓</div>
                    <div>
                        <h1 
                            style={{ fontSize: `${fontSize + 8}px`, lineHeight: lineSpacing }}
                            className="font-bold text-gray-800"
                        >
                            High School Math Courses
                        </h1>
                        <p 
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="text-gray-600"
                        >
                            Grades 9-12 • Advanced Algebra, Geometry, and Beyond
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onSpeakText('Welcome to High School Math Courses! These advanced courses cover Algebra I and II, Geometry, Functions, Statistics, and Trigonometry for grades 9 through 12.')}
                    className="mb-6 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-indigo-300 mx-auto"
                >
                    <Volume2 size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}>Listen to Overview</span>
                </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {highSchoolCourses.map((course) => (
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
                                    onClick={() => onSpeakText(`${course.title}: ${course.description}. This course has ${course.lessons.length} lessons and takes about ${course.estimatedHours} hours to complete.`)}
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
                                        📚 Prerequisites: Complete foundational courses first
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
                                <TrendingUp className="mr-2 text-indigo-600" size={20} />
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
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
                <h3 
                    style={{ fontSize: `${fontSize + 4}px` }}
                    className="font-bold text-gray-800 mb-4 flex items-center"
                >
                    💡 High School Learning Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700 mb-2">
                            📝 <strong>Take Notes:</strong> Write down key formulas and problem-solving steps
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700">
                            🧮 <strong>Use Technology:</strong> Graphing calculators and apps can help visualize concepts
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700 mb-2">
                            👥 <strong>Study Groups:</strong> Explaining concepts to others reinforces understanding
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700">
                            🎯 <strong>Practice Tests:</strong> Regular assessment helps identify areas for improvement
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};