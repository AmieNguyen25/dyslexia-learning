import React from 'react';
import { Play, Clock, Star, CheckCircle, Lock, Volume2, Palette } from 'lucide-react';
import { useProgressTracking } from '../hooks';
import type { Course, Lesson } from '../types';

interface ElementaryCoursesProps {
    fontSize: number;
    lineSpacing: number;
    onCourseSelect: (course: Course) => void;
    onSpeakText: (text: string) => void;
    userProgress?: { [courseId: string]: number };
}

export const ElementaryCourses: React.FC<ElementaryCoursesProps> = ({
    fontSize,
    lineSpacing,
    onCourseSelect,
    onSpeakText,
    userProgress = {}
}) => {
    const { getCoursesWithProgress } = useProgressTracking();

    // Helper function to add default properties to lessons
    const enhanceLesson = (lesson: any): Lesson => ({
        ...lesson,
        examples: lesson.examples || [],
        quizAttempts: lesson.quizAttempts || [],
        passRequiredScore: lesson.passRequiredScore || 3
    });
    const baseCourses = [
        {
            id: 'elem-foundations-1',
            title: 'Math Foundations 1',
            description: 'Numbers, addition & subtraction within 100',
            icon: '🔢',
            color: 'from-blue-400 to-blue-600',
            level: 'elementary',
            estimatedHours: 12,
            progress: userProgress['elem-foundations-1'] || 0,
            lessons: [
                {
                    id: 'counting-basics',
                    title: 'Counting to 100',
                    description: 'Learn to count by 1s, 2s, 5s, and 10s',
                    duration: 25,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Counting', 'Number recognition', 'Skip counting']
                },
                {
                    id: 'addition-within-20',
                    title: 'Addition Within 20',
                    description: 'Adding single digits and teen numbers',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Addition facts', 'Mental math', 'Number bonds']
                },
                {
                    id: 'subtraction-within-20',
                    title: 'Subtraction Within 20',
                    description: 'Taking away and finding differences',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Subtraction facts', 'Mental math', 'Number relationships']
                },
                {
                    id: 'two-digit-addition',
                    title: 'Two-Digit Addition',
                    description: 'Adding numbers up to 100 with and without regrouping',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Regrouping', 'Place value', 'Column addition']
                },
                {
                    id: 'two-digit-subtraction',
                    title: 'Two-Digit Subtraction',
                    description: 'Subtracting numbers within 100',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Borrowing', 'Place value', 'Column subtraction']
                }
            ]
        },
        {
            id: 'elem-foundations-2',
            title: 'Math Foundations 2',
            description: 'Multiplication tables, division basics, fractions',
            icon: '✖️',
            color: 'from-green-400 to-green-600',
            level: 'elementary',
            estimatedHours: 15,
            progress: userProgress['elem-foundations-2'] || 0,
            prerequisites: ['elem-foundations-1'],
            lessons: [
                {
                    id: 'intro-multiplication',
                    title: 'Introduction to Multiplication',
                    description: 'Understanding multiplication as repeated addition',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Arrays', 'Repeated addition', 'Groups']
                },
                {
                    id: 'times-tables-2-5-10',
                    title: 'Times Tables: 2, 5, 10',
                    description: 'Learning the easiest multiplication facts',
                    duration: 35,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Skip counting', 'Pattern recognition', 'Fact fluency']
                },
                {
                    id: 'times-tables-3-4-6',
                    title: 'Times Tables: 3, 4, 6',
                    description: 'Building on basic multiplication facts',
                    duration: 40,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Fact strategies', 'Mental math', 'Pattern recognition']
                },
                {
                    id: 'intro-division',
                    title: 'Introduction to Division',
                    description: 'Division as sharing and grouping',
                    duration: 30,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Equal groups', 'Sharing', 'Inverse operations']
                },
                {
                    id: 'fractions-halves-quarters',
                    title: 'Fractions: Halves and Quarters',
                    description: 'Understanding parts of a whole',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Parts of whole', 'Fair sharing', 'Fraction notation']
                }
            ]
        },
        {
            id: 'shapes-space',
            title: 'Shapes & Space',
            description: 'Geometry basics: 2D/3D shapes, symmetry',
            icon: '🔺',
            color: 'from-purple-400 to-purple-600',
            level: 'elementary',
            estimatedHours: 10,
            progress: userProgress['shapes-space'] || 0,
            lessons: [
                {
                    id: '2d-shapes',
                    title: '2D Shapes Explorer',
                    description: 'Circles, squares, triangles, rectangles and their properties',
                    duration: 25,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Shape recognition', 'Properties', 'Sides and corners']
                },
                {
                    id: '3d-shapes',
                    title: '3D Shapes Adventure',
                    description: 'Cubes, spheres, cylinders and their properties',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['3D visualization', 'Faces, edges, vertices', 'Real-world objects']
                },
                {
                    id: 'symmetry-patterns',
                    title: 'Symmetry & Patterns',
                    description: 'Finding lines of symmetry and creating patterns',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Line symmetry', 'Pattern completion', 'Transformations']
                },
                {
                    id: 'measurement-basics',
                    title: 'Measurement Basics',
                    description: 'Length, weight, and capacity with fun activities',
                    duration: 30,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Units of measurement', 'Comparing', 'Estimation']
                }
            ]
        },
        {
            id: 'math-everyday-life',
            title: 'Math in Everyday Life',
            description: 'Word problems with money, time, and measurement',
            icon: '🏪',
            color: 'from-orange-400 to-red-500',
            level: 'elementary',
            estimatedHours: 8,
            progress: userProgress['math-everyday-life'] || 0,
            lessons: [
                {
                    id: 'money-math',
                    title: 'Money Math',
                    description: 'Counting coins, making change, and shopping problems',
                    duration: 30,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Coin values', 'Making change', 'Money problems']
                },
                {
                    id: 'telling-time',
                    title: 'Telling Time',
                    description: 'Reading clocks and solving time problems',
                    duration: 25,
                    difficulty: 'beginner',
                    completed: false,
                    locked: false,
                    topics: ['Analog clocks', 'Digital time', 'Elapsed time']
                },
                {
                    id: 'word-problems',
                    title: 'Word Problem Strategies',
                    description: 'Reading, understanding, and solving story problems',
                    duration: 35,
                    difficulty: 'intermediate',
                    completed: false,
                    locked: true,
                    topics: ['Problem solving', 'Key words', 'Multi-step problems']
                }
            ]
        }
    ];

    // Create enhanced courses with properly typed lessons
    const elementaryCourses: Course[] = baseCourses.map(course => ({
        ...course,
        level: 'elementary' as const,
        lessons: course.lessons.map(enhanceLesson)
    }));

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
                    <div className="text-6xl">🎨</div>
                    <div>
                        <h1
                            style={{ fontSize: `${fontSize + 8}px`, lineHeight: lineSpacing }}
                            className="font-bold text-gray-800"
                        >
                            Elementary Math Courses
                        </h1>
                        <p
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="text-gray-600"
                        >
                            <strong>Grades K-5</strong> • Building Strong <strong>Math Foundations</strong>
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onSpeakText('Welcome to Elementary Math Courses! These courses are designed for grades K through 5, focusing on building strong math foundations through fun, interactive lessons.')}
                    className="mb-6 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-blue-300 mx-auto"
                >
                    <Volume2 size={18} />
                    <span style={{ fontSize: `${fontSize - 2}px` }}><strong>Listen to Overview</strong></span>
                </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {getCoursesWithProgress(elementaryCourses).map((course) => (
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
                                        <strong>Progress:</strong> {course.progress}%
                                    </span>
                                    <span style={{ fontSize: `${fontSize - 4}px` }} className="opacity-90">
                                        <strong>{course.estimatedHours}</strong> hours
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
                                <div className="flex items-center space-x-2">
                                    <Star size={16} className="opacity-75" />
                                    <span style={{ fontSize: `${fontSize - 4}px` }} className="opacity-75">
                                        Requires completion of previous courses
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
                                <Palette className="mr-2 text-indigo-600" size={20} />
                                Lessons ({course.lessons.length})
                            </h4>

                            <div className="space-y-3">
                                {course.lessons.slice(0, 3).map((lesson, index) => (
                                    <div
                                        key={lesson.id}
                                        className={`p-4 rounded-xl border-2 transition-all ${lesson.locked
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
                                className={`w-full mt-6 py-4 px-6 rounded-xl font-bold transition-all duration-200 focus:ring-4 ${course.prerequisites && course.progress === 0
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : course.progress > 0
                                            ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-200'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-200'
                                    }`}
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                {course.prerequisites && course.progress === 0
                                    ? <strong>Complete Prerequisites First</strong>
                                    : course.progress > 0
                                        ? <strong>Continue Course</strong>
                                        : <strong>Start Course</strong>
                                }
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Learning Tips */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
                <h3
                    style={{ fontSize: `${fontSize + 4}px` }}
                    className="font-bold text-gray-800 mb-4 flex items-center"
                >
                    💡 <strong>Elementary Learning Tips</strong>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700 mb-2">
                            🎮 <strong>Make it Fun:</strong> Use manipulatives, games, and visual aids
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700">
                            📚 <strong>Short Sessions:</strong> 15-20 minute lessons work best
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700 mb-2">
                            🏆 <strong>Celebrate Success:</strong> Acknowledge every small victory
                        </p>
                        <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} className="text-gray-700">
                            🔄 <strong>Practice Daily:</strong> Regular, short practice builds confidence
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};