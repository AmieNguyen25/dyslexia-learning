import React from 'react';
import { Play, Clock, Star, CheckCircle, Lock, Volume2, Calculator } from 'lucide-react';
import type { Course, Lesson } from '../types';

interface MiddleSchoolCoursesProps {
    fontSize: number;
    lineSpacing: number;
    onCourseSelect: (course: Course) => void;
    onSpeakText: (text: string) => void;
    userProgress?: { [courseId: string]: number };
}

export const MiddleSchoolCourses: React.FC<MiddleSchoolCoursesProps> = ({
    fontSize,
    lineSpacing,
    onCourseSelect,
    onSpeakText,
    userProgress = {}
}) => {
    const middleSchoolCourses: Course[] = [
        {
            id: 'pre-algebra-essentials',
            title: 'Pre-Algebra Essentials',
            description: 'Integers, order of operations, factors & multiples',
            icon: '📊',
            color: 'from-blue-500 to-indigo-600',
            level: 'middle',
            estimatedHours: 20,
            progress: userProgress['pre-algebra-essentials'] || 0,
            lessons: [
                {
                    id: 'integers-intro',
                    title: 'Introduction to Integers',
                    description: 'Positive and negative numbers on the number line',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Number line', 'Positive/negative', 'Absolute value']
                },
                {
                    id: 'integer-operations',
                    title: 'Integer Operations',
                    description: 'Adding, subtracting, multiplying, and dividing integers',
                    duration: 40,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Integer rules', 'Sign rules', 'Mental strategies']
                },
                {
                    id: 'order-of-operations',
                    title: 'Order of Operations (PEMDAS)',
                    description: 'Solving expressions with multiple operations',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['PEMDAS', 'Parentheses', 'Exponents', 'Complex expressions']
                },
                {
                    id: 'factors-multiples',
                    title: 'Factors and Multiples',
                    description: 'Prime numbers, GCF, and LCM',
                    duration: 45,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Prime factorization', 'GCF', 'LCM', 'Divisibility rules']
                }
            ]
        },
        {
            id: 'ratios-proportions',
            title: 'Ratios & Proportions',
            description: 'Fractions, percentages, scale factors',
            icon: '📏',
            color: 'from-green-500 to-emerald-600',
            level: 'middle',
            estimatedHours: 18,
            progress: userProgress['ratios-proportions'] || 0,
            lessons: [
                {
                    id: 'understanding-ratios',
                    title: 'Understanding Ratios',
                    description: 'Comparing quantities and writing ratios',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Ratio notation', 'Equivalent ratios', 'Part-to-part', 'Part-to-whole']
                },
                {
                    id: 'proportions-solving',
                    title: 'Solving Proportions',
                    description: 'Cross multiplication and proportion problems',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Cross multiplication', 'Proportion setup', 'Real-world problems']
                },
                {
                    id: 'fractions-decimals',
                    title: 'Fractions and Decimals',
                    description: 'Converting between fractions, decimals, and percentages',
                    duration: 40,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Decimal conversion', 'Percentage conversion', 'Fraction operations']
                },
                {
                    id: 'scale-factors',
                    title: 'Scale Factors and Similarity',
                    description: 'Working with similar figures and scale drawings',
                    duration: 35,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Similar figures', 'Scale drawings', 'Maps and models']
                }
            ]
        },
        {
            id: 'equations-inequalities',
            title: 'Equations & Inequalities',
            description: 'Solving one-step and two-step equations',
            icon: '⚖️',
            color: 'from-purple-500 to-violet-600',
            level: 'middle',
            estimatedHours: 16,
            progress: userProgress['equations-inequalities'] || 0,
            lessons: [
                {
                    id: 'algebraic-thinking',
                    title: 'Algebraic Thinking',
                    description: 'Variables, expressions, and algebraic language',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Variables', 'Expressions', 'Algebraic language', 'Substitution']
                },
                {
                    id: 'one-step-equations',
                    title: 'One-Step Equations',
                    description: 'Solving equations with addition, subtraction, multiplication, division',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Inverse operations', 'Balance method', 'Checking solutions']
                },
                {
                    id: 'two-step-equations',
                    title: 'Two-Step Equations',
                    description: 'Solving more complex equations step by step',
                    duration: 40,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Multi-step solving', 'Combining operations', 'Word problems']
                },
                {
                    id: 'inequalities-intro',
                    title: 'Introduction to Inequalities',
                    description: 'Solving and graphing simple inequalities',
                    duration: 35,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['Inequality symbols', 'Number line graphs', 'Solution sets']
                }
            ]
        },
        {
            id: 'data-probability',
            title: 'Data & Probability',
            description: 'Graphs, mean/median/mode, probability experiments',
            icon: '📈',
            color: 'from-orange-500 to-red-500',
            level: 'middle',
            estimatedHours: 14,
            progress: userProgress['data-probability'] || 0,
            lessons: [
                {
                    id: 'collecting-data',
                    title: 'Collecting and Organizing Data',
                    description: 'Surveys, tables, and data organization',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Data collection', 'Tables', 'Frequency charts', 'Surveys']
                },
                {
                    id: 'graphs-charts',
                    title: 'Graphs and Charts',
                    description: 'Bar graphs, line plots, histograms, and circle graphs',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Bar graphs', 'Line plots', 'Histograms', 'Circle graphs']
                },
                {
                    id: 'measures-center',
                    title: 'Measures of Center',
                    description: 'Mean, median, mode, and range',
                    duration: 30,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Mean calculation', 'Finding median', 'Mode identification', 'Range']
                },
                {
                    id: 'probability-basics',
                    title: 'Probability Basics',
                    description: 'Simple probability and probability experiments',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Probability notation', 'Experimental vs theoretical', 'Outcomes']
                }
            ]
        },
        {
            id: 'geometry-prep',
            title: 'Geometry Prep',
            description: 'Angles, triangles, circles, area & volume',
            icon: '📐',
            color: 'from-teal-500 to-cyan-600',
            level: 'middle',
            estimatedHours: 22,
            progress: userProgress['geometry-prep'] || 0,
            lessons: [
                {
                    id: 'angles-lines',
                    title: 'Angles and Lines',
                    description: 'Types of angles, measuring, and angle relationships',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Angle types', 'Protractor use', 'Complementary/supplementary']
                },
                {
                    id: 'triangles-polygons',
                    title: 'Triangles and Polygons',
                    description: 'Triangle types, polygon properties, and classification',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: false,
                    topics: ['Triangle classification', 'Polygon properties', 'Regular polygons']
                },
                {
                    id: 'circles-basics',
                    title: 'Circles: Radius, Diameter, Circumference',
                    description: 'Circle parts and basic circumference calculations',
                    duration: 30,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Circle parts', 'Pi introduction', 'Circumference formula']
                },
                {
                    id: 'area-perimeter',
                    title: 'Area and Perimeter',
                    description: 'Finding area and perimeter of basic shapes',
                    duration: 40,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Rectangle area', 'Triangle area', 'Composite shapes', 'Perimeter']
                },
                {
                    id: 'volume-intro',
                    title: 'Introduction to Volume',
                    description: 'Volume of rectangular prisms and cubes',
                    duration: 35,
                    difficulty: 'advanced',
                    completed: false,
                    locked: true,
                    topics: ['3D measurement', 'Volume formulas', 'Cubic units']
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
                    <div className="text-6xl">📚</div>
                    <div>
                        <h1 
                            style={{ fontSize: `${fontSize + 8}px`, lineHeight: lineSpacing }}
                            className="font-bold text-gray-800"
                        >
                            Middle School Math Courses
                        </h1>
                        <p 
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="text-gray-600"
                        >
                            Grades 6-8 • Pre-Algebra and Mathematical Reasoning
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onSpeakText('Welcome to Middle School Math Courses! These courses are designed for grades 6 through 8, focusing on pre-algebra skills, mathematical reasoning, and problem-solving strategies.')}
                    className="mb-6 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-indigo-300 mx-auto"
                >
                    <Volume2 size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}>Listen to Overview</span>
                </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {middleSchoolCourses.map((course) => (
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
                        </div>

                        {/* Lessons List */}
                        <div className="p-6">
                            <h4 
                                style={{ fontSize: `${fontSize + 2}px` }}
                                className="font-bold text-gray-800 mb-4 flex items-center"
                            >
                                <Calculator className="mr-2 text-indigo-600" size={20} />
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
                                className={`w-full mt-6 py-4 px-6 rounded-xl font-bold transition-all duration-200 focus:ring-4 ${
                                    course.progress > 0
                                        ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-200'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-200'
                                }`}
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Learning Tips */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200">
                <h3 
                    style={{ fontSize: `${fontSize + 4}px` }}
                    className="font-bold text-gray-800 mb-4 flex items-center"
                >
                    💡 Middle School Learning Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700 mb-2">
                            🧮 <strong>Use Tools:</strong> Calculators and visual aids help with complex problems
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700">
                            📝 <strong>Show Work:</strong> Writing steps helps organize thinking
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700 mb-2">
                            🤝 <strong>Ask Questions:</strong> No question is too small in mathematics
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700">
                            🎯 <strong>Connect to Life:</strong> Look for math patterns in everyday situations
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};