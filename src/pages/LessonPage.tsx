import React, { useState } from 'react';
import { Play, Clock, Star, CheckCircle, Lock, ArrowLeft, BookOpen } from 'lucide-react';
import { VisualLesson } from '../components/VisualLesson';
import { AuditoryLesson } from '../components/AuditoryLesson';
import { QuickQuiz } from '../components/QuickQuiz';
import type { LearningPath, VisualStep, Course, Lesson } from '../types';

interface LessonPageProps {
    fontSize: number;
    lineSpacing: number;
    characterSpacing: number;
    learningPath: LearningPath;
    timeOnTask: number;
    onSpeakText: (text: string) => void;
    selectedCourse?: Course | null;
    onBackToDashboard?: () => void;
}

const visualSteps: VisualStep[] = [
    { step: '2x + 5 = 11', explanation: 'Start with the equation' },
    { step: '2x + 5 - 5 = 11 - 5', explanation: 'Subtract 5 from both sides' },
    { step: '2x = 6', explanation: 'Simplify both sides' },
    { step: 'x = 3', explanation: 'Divide both sides by 2' }
];

export const LessonPage: React.FC<LessonPageProps> = ({
    fontSize,
    lineSpacing,
    characterSpacing,
    learningPath,
    timeOnTask,
    onSpeakText,
    selectedCourse,
    onBackToDashboard,
}) => {
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [equationStep, setEquationStep] = useState(0);
    const [rewindCount, setRewindCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [quizScore, setQuizScore] = useState<number | null>(null);
    const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
    const [currentEquation] = useState('2x + 5 = 11');

    const handleNextStep = () => {
        setEquationStep(Math.min(equationStep + 1, visualSteps.length - 1));
    };

    const handlePreviousStep = () => {
        setEquationStep(Math.max(equationStep - 1, 0));
        setRewindCount(prev => prev + 1);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            onSpeakText(`Let's solve the equation ${currentEquation}. First, we need to isolate x by getting rid of the 5 on the left side. We subtract 5 from both sides. This gives us 2x equals 6. Now we divide both sides by 2 to get x equals 3.`);
        }
    };

    const handleRewind = () => {
        setRewindCount(prev => prev + 1);
        onSpeakText(`Let me repeat that. We're solving ${currentEquation}`);
    };

    const handleAnswerSelect = (answer: number) => {
        setQuizScore(answer === 3 ? 100 : 0);
        onSpeakText(answer === 3 ? 'Correct! Great job!' : 'Not quite right. Try again!');
    };

    const handleConfidenceSelect = (level: number) => {
        setConfidenceScore(level);
    };

    // If no course is selected, show course selection message
    if (!selectedCourse) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
                    <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                    <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                        className="font-bold text-gray-800 mb-4">
                        No Course Selected
                    </h2>
                    <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                        className="text-gray-600 mb-6">
                        Please select a <strong>course</strong> from the <strong>dashboard</strong> to view its <strong>lessons</strong>.
                    </p>
                    {onBackToDashboard && (
                        <button
                            onClick={onBackToDashboard}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            Back to Dashboard
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // If a lesson is selected, show the lesson content
    if (selectedLesson) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-sm border p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSelectedLesson(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Back to Course Lessons"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                className="font-bold text-gray-800">
                                {selectedLesson.title}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span><strong>Time:</strong> {timeOnTask}s</span>
                            <span><strong>Rewinds:</strong> {rewindCount}</span>
                        </div>
                    </div>

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                            className="text-blue-800">
                            {selectedLesson.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-blue-600">
                            <span className="flex items-center"><Clock size={16} className="mr-1" /> <strong>{selectedLesson.duration} min</strong></span>
                            <span className="capitalize"><strong>{selectedLesson.difficulty}</strong></span>
                        </div>
                    </div>

                    {learningPath === 'visual' ? (
                        <VisualLesson
                            fontSize={fontSize}
                            lineSpacing={lineSpacing}
                            visualSteps={visualSteps}
                            equationStep={equationStep}
                            rewindCount={rewindCount}
                            onNextStep={handleNextStep}
                            onPreviousStep={handlePreviousStep}
                            onSpeakText={onSpeakText}
                        />
                    ) : (
                        <AuditoryLesson
                            fontSize={fontSize}
                            currentEquation={currentEquation}
                            isPlaying={isPlaying}
                            onPlayPause={handlePlayPause}
                            onRewind={handleRewind}
                        />
                    )}

                    <QuickQuiz
                        fontSize={fontSize}
                        lineSpacing={lineSpacing}
                        quizScore={quizScore}
                        confidenceScore={confidenceScore}
                        onAnswerSelect={handleAnswerSelect}
                        onConfidenceSelect={handleConfidenceSelect}
                    />
                </div>
            </div>
        );
    }

    // Show course lessons list
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header with back button */}
                <div className="flex items-center space-x-4 mb-6">
                    {onBackToDashboard && (
                        <button
                            onClick={onBackToDashboard}
                            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow focus:ring-4 focus:ring-blue-200"
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Dashboard</span>
                        </button>
                    )}
                    <h1 style={{ fontSize: `${fontSize + 8}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                        className="font-bold text-gray-800">
                        {selectedCourse.icon} {selectedCourse.title}
                    </h1>
                </div>

                {/* Course Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                className="text-gray-700 mb-4">
                                {selectedCourse.description}
                            </p>
                            <div className="flex items-center space-x-6 text-gray-600">
                                <span className="flex items-center">
                                    <BookOpen size={16} className="mr-2" />
                                    <strong>{selectedCourse.lessons.length}</strong> lessons
                                </span>
                                <span className="flex items-center">
                                    <Clock size={16} className="mr-2" />
                                    ~<strong>{selectedCourse.estimatedHours}</strong> hours
                                </span>
                                <span className="flex items-center">
                                    <Star size={16} className="mr-2 text-yellow-500" />
                                    <strong>{selectedCourse.level}</strong> level
                                </span>
                            </div>
                        </div>
                        <div className="ml-6">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl">
                                <div style={{ fontSize: `${fontSize - 2}px` }} className="text-center">
                                    <div className="font-bold text-lg">{selectedCourse.progress}%</div>
                                    <div className="text-sm opacity-90"><strong>Complete</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedCourse.lessons.map((lesson, index) => (
                        <div
                            key={lesson.id}
                            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${
                                lesson.locked ? 'opacity-75' : 'hover:-translate-y-1 cursor-pointer'
                            }`}
                            onClick={() => !lesson.locked && setSelectedLesson(lesson)}
                        >
                            {/* Lesson Header */}
                            <div className={`h-2 bg-gradient-to-r ${
                                lesson.completed 
                                    ? 'from-green-400 to-green-600' 
                                    : lesson.locked 
                                    ? 'from-gray-300 to-gray-400'
                                    : 'from-blue-400 to-blue-600'
                            }`} />
                            
                            <div className="p-6">
                                {/* Lesson Number & Status */}
                                <div className="flex items-center justify-between mb-3">
                                    <span 
                                        style={{ fontSize: `${fontSize - 4}px` }}
                                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium"
                                    >
                                        <strong>Lesson {index + 1}</strong>
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        {lesson.completed && <CheckCircle size={20} className="text-green-600" />}
                                        {lesson.locked && <Lock size={20} className="text-gray-400" />}
                                        {!lesson.completed && !lesson.locked && <Play size={20} className="text-blue-600" />}
                                    </div>
                                </div>

                                {/* Lesson Title */}
                                <h3 style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                    className="font-bold text-gray-800 mb-3">
                                    {lesson.title}
                                </h3>

                                {/* Lesson Description */}
                                <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                    className="text-gray-600 mb-4 line-clamp-2">
                                    {lesson.description}
                                </p>

                                {/* Lesson Meta */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3 text-gray-500">
                                        <span className="flex items-center text-sm">
                                            <Clock size={14} className="mr-1" />
                                            <strong>{lesson.duration} min</strong>
                                        </span>
                                        <span className="text-sm capitalize"><strong>{lesson.difficulty}</strong></span>
                                    </div>
                                </div>

                                {/* Topics */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {lesson.topics.slice(0, 2).map((topic, topicIndex) => (
                                        <span
                                            key={topicIndex}
                                            style={{ fontSize: `${fontSize - 4}px` }}
                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                    {lesson.topics.length > 2 && (
                                        <span
                                            style={{ fontSize: `${fontSize - 4}px` }}
                                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                        >
                                            +{lesson.topics.length - 2} more
                                        </span>
                                    )}
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!lesson.locked) {
                                            setSelectedLesson(lesson);
                                            onSpeakText(`Starting lesson: ${lesson.title}`);
                                        }
                                    }}
                                    disabled={lesson.locked}
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                                        lesson.locked
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : lesson.completed
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                    style={{ fontSize: `${fontSize - 2}px` }}
                                >
                                    {lesson.locked 
                                        ? <strong>Locked</strong>
                                        : lesson.completed 
                                        ? <strong>Review Lesson</strong>
                                        : <strong>Start Lesson</strong>
                                    }
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Course Progress Summary */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                    <h3 style={{ fontSize: `${fontSize + 4}px` }}
                        className="font-bold text-gray-800 mb-4">
                        📊 Course Progress
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div style={{ fontSize: `${fontSize + 6}px` }} className="font-bold text-blue-600">
                                {selectedCourse.lessons.filter(l => l.completed).length}
                            </div>
                            <div style={{ fontSize: `${fontSize}px` }} className="text-gray-600">
                                <strong>Completed</strong> Lessons
                            </div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div style={{ fontSize: `${fontSize + 6}px` }} className="font-bold text-green-600">
                                {selectedCourse.lessons.filter(l => !l.locked && !l.completed).length}
                            </div>
                            <div style={{ fontSize: `${fontSize}px` }} className="text-gray-600">
                                <strong>Available</strong> Now
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div style={{ fontSize: `${fontSize + 6}px` }} className="font-bold text-gray-600">
                                {selectedCourse.lessons.filter(l => l.locked).length}
                            </div>
                            <div style={{ fontSize: `${fontSize}px` }} className="text-gray-600">
                                <strong>Locked</strong> Lessons
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};