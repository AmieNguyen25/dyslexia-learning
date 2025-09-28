import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Volume2, Brain, Clock } from 'lucide-react';
import { QuizGenerationService } from '../services/quizService';
import { MockDatabaseService } from '../services/mockDatabaseService';
import type { QuizQuestion, QuizAttempt, Lesson, User } from '../types';

interface QuizComponentProps {
    lesson: Lesson;
    user: User;
    fontSize: number;
    lineSpacing: number;
    onQuizComplete: (attempt: QuizAttempt) => void;
    onSpeakText: (text: string) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
    lesson,
    user,
    fontSize,
    lineSpacing,
    onQuizComplete,
    onSpeakText
}) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [startTime] = useState(Date.now());
    const [attemptId] = useState(`attempt-${Date.now()}`);

    // Load quiz questions when component mounts
    useEffect(() => {
        generateQuiz();
    }, [lesson.id]);

    const generateQuiz = async () => {
        setIsLoadingQuiz(true);
        try {
            const generatedQuestions = await QuizGenerationService.generateQuiz(
                lesson,
                user.performance,
                user.preferredPath
            );
            setQuestions(generatedQuestions);
            setUserAnswers(new Array(5).fill(null));
            setCurrentQuestionIndex(0);
            setQuizCompleted(false);
            setShowExplanation(false);
        } catch (error) {
            console.error('Error generating quiz:', error);
        } finally {
            setIsLoadingQuiz(false);
        }
    };

    const handleAnswerSelect = async (answerIndex: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setUserAnswers(newAnswers);

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = answerIndex === currentQuestion.correctAnswer;

        if (!isCorrect) {
            // Generate explanation for incorrect answer
            setIsLoadingExplanation(true);
            try {
                const aiExplanation = await QuizGenerationService.generateExplanation(
                    currentQuestion,
                    answerIndex,
                    lesson
                );
                setExplanation(aiExplanation);
            } catch (error) {
                console.error('Error getting explanation:', error);
                setExplanation(
                    `That's not quite right. The correct answer is "${currentQuestion.options[currentQuestion.correctAnswer]}". ${currentQuestion.explanation}`
                );
            } finally {
                setIsLoadingExplanation(false);
            }
            setShowExplanation(true);
        } else {
            setShowExplanation(false);
            // Auto-advance to next question after correct answer
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    finishQuiz(newAnswers);
                }
            }, 1000);
        }
    };

    const handleNextQuestion = () => {
        setShowExplanation(false);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishQuiz(userAnswers);
        }
    };

    const finishQuiz = async (answers: (number | null)[]) => {
        const correctAnswers = answers.filter((answer, index) =>
            answer === questions[index]?.correctAnswer
        ).length;

        const finalScore = correctAnswers;
        const passed = correctAnswers >= lesson.passRequiredScore;
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);

        setScore(finalScore);
        setQuizCompleted(true);

        const attempt: QuizAttempt = {
            attemptId,
            lessonId: lesson.id,
            questions,
            userAnswers: answers,
            score: finalScore,
            passed,
            completedAt: new Date(),
            timeSpent
        };

        // Save quiz attempt to database
        try {
            const userId = user.id || user.email || 'user-1'; // Fallback to demo user
            console.log(`🎯 Attempting to save quiz result:`, {
                attemptId,
                userId,
                lessonId: lesson.id,
                score: finalScore,
                maxScore: questions.length,
                passed,
                timeSpent
            });
            
            const saveSuccess = MockDatabaseService.recordQuizAttempt(
                attemptId,
                userId,
                lesson.id,
                finalScore,
                questions.length,
                passed,
                timeSpent,
                answers.map((answer, index) => ({
                    questionIndex: index,
                    question: questions[index]?.question,
                    selectedAnswer: answer,
                    correctAnswer: questions[index]?.correctAnswer,
                    isCorrect: answer === questions[index]?.correctAnswer
                }))
            );
            
            if (saveSuccess) {
                // Trigger event for real-time performance updates
                window.dispatchEvent(new CustomEvent('quizAttemptRecorded', {
                    detail: { userId, lessonId: lesson.id, score: finalScore, passed }
                }));
                
                console.log(`✅ Quiz attempt saved successfully: ${finalScore}/${questions.length} (${Math.round((finalScore/questions.length)*100)}%)`);
            } else {
                console.error('❌ Failed to save quiz attempt - recordQuizAttempt returned false');
            }
        } catch (error) {
            console.error('❌ Failed to save quiz attempt:', error);
        }

        onQuizComplete(attempt);
    };

    const handleRetakeQuiz = () => {
        generateQuiz();
    };

    if (isLoadingQuiz) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <Brain className="animate-pulse mx-auto mb-4 text-blue-500" size={48} />
                    <p style={{ fontSize: `${fontSize}px` }} className="text-gray-600">
                        Generating your personalized quiz...
                    </p>
                </div>
            </div>
        );
    }

    if (quizCompleted) {
        const passed = score >= lesson.passRequiredScore;
        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
                <div className="text-center mb-6">
                    {passed ? (
                        <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
                    ) : (
                        <XCircle className="mx-auto mb-4 text-red-500" size={64} />
                    )}

                    <h2
                        style={{ fontSize: `${fontSize + 6}px` }}
                        className={`font-bold mb-4 ${passed ? 'text-green-700' : 'text-red-700'}`}
                    >
                        {passed ? 'Quiz Completed! 🎉' : 'Quiz Needs Retake'}
                    </h2>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold mb-2">
                            Your Score: {score} out of {questions.length}
                        </p>
                        <p style={{ fontSize: `${fontSize}px` }} className="text-gray-600">
                            {passed
                                ? `Great job! You passed with ${score} correct answers.`
                                : `You need ${lesson.passRequiredScore} correct answers to pass. You got ${score}.`
                            }
                        </p>
                    </div>

                    {!passed && (
                        <div className="mb-6">
                            <p
                                style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                                className="text-gray-700 mb-4"
                            >
                                Don't worry! Learning takes practice. Review the material and try again when you're ready.
                            </p>
                            <button
                                onClick={handleRetakeQuiz}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto"
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                <RotateCcw size={20} className="mr-2" />
                                Retake Quiz
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const hasAnswered = userAnswers[currentQuestionIndex] !== null;

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-600 flex items-center">
                        <Clock size={16} className="mr-1" />
                        Quiz in Progress
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <h3
                        style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }}
                        className="font-bold text-gray-800 flex-1"
                    >
                        {currentQuestion.question}
                    </h3>
                    <button
                        onClick={() => onSpeakText(`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`)}
                        className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Volume2 size={20} />
                    </button>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = userAnswers[currentQuestionIndex] === index;
                        const isCorrect = index === currentQuestion.correctAnswer;
                        const showResult = hasAnswered;

                        let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";

                        if (!hasAnswered) {
                            buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
                        } else if (isSelected && isCorrect) {
                            buttonClass += "border-green-500 bg-green-50 text-green-800";
                        } else if (isSelected && !isCorrect) {
                            buttonClass += "border-red-500 bg-red-50 text-red-800";
                        } else if (isCorrect) {
                            buttonClass += "border-green-500 bg-green-50 text-green-800";
                        } else {
                            buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => !hasAnswered && handleAnswerSelect(index)}
                                disabled={hasAnswered}
                                className={buttonClass}
                                style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            >
                                <div className="flex items-center">
                                    <span className="font-semibold mr-3">
                                        {String.fromCharCode(65 + index)})
                                    </span>
                                    <span>{option}</span>
                                    {showResult && isSelected && (
                                        <span className="ml-auto">
                                            {isCorrect ? (
                                                <CheckCircle size={20} className="text-green-500" />
                                            ) : (
                                                <XCircle size={20} className="text-red-500" />
                                            )}
                                        </span>
                                    )}
                                    {showResult && !isSelected && isCorrect && (
                                        <span className="ml-auto">
                                            <CheckCircle size={20} className="text-green-500" />
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-6 rounded-r-lg">
                    <div className="flex items-start">
                        <div className="flex-1">
                            <h4
                                style={{ fontSize: `${fontSize + 2}px` }}
                                className="font-semibold text-orange-800 mb-2"
                            >
                                Let's learn from this! 📚
                            </h4>
                            {isLoadingExplanation ? (
                                <div className="flex items-center text-orange-700">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-700 mr-2"></div>
                                    <span style={{ fontSize: `${fontSize}px` }}>
                                        Getting explanation...
                                    </span>
                                </div>
                            ) : (
                                <p
                                    style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                                    className="text-orange-700 whitespace-pre-line"
                                >
                                    {explanation}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => onSpeakText(explanation)}
                            className="ml-4 p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                        >
                            <Volume2 size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Next Button */}
            {hasAnswered && (
                <div className="text-center">
                    <button
                        onClick={handleNextQuestion}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                </div>
            )}
        </div>
    );
};