import React, { useState } from 'react';
import { Calendar, Clock, Target, Plus, Trash2, Edit3, BookOpen, CheckCircle, Volume2, Save, Sparkles, Loader } from 'lucide-react';
import type { StudyPlan as StudyPlanType, StudyGoal, WeeklySchedule, OnboardingData, AIStudyPlanRequest } from '../types';
import { generateAIStudyPlan } from '../services/geminiService';

interface StudyPlanProps {
    fontSize: number;
    lineSpacing: number;
    characterSpacing: number;
    onSpeakText: (text: string) => void;
    onboardingData?: OnboardingData | null;
}

export const StudyPlan: React.FC<StudyPlanProps> = ({
    fontSize,
    lineSpacing,
    characterSpacing,
    onSpeakText,
    onboardingData,
}) => {
    const [currentPlan, setCurrentPlan] = useState<StudyPlanType>({
        id: 'plan-1',
        title: '',
        description: '',
        goals: [],
        weeklySchedule: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        },
        targetCompletionDate: '',
        created: new Date(),
        progress: 0
    });

    const [isEditing, setIsEditing] = useState(false);
    const [newGoal, setNewGoal] = useState<Partial<StudyGoal>>({
        title: '',
        description: '',
        priority: 'medium',
        estimatedHours: 1,
        completed: false
    });
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
    const [showAIButton, setShowAIButton] = useState(!!onboardingData);

    const daysOfWeek: (keyof WeeklySchedule)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const priorityColors = {
        high: 'from-red-100 to-pink-100 border-red-300 text-red-800',
        medium: 'from-yellow-100 to-orange-100 border-yellow-300 text-orange-800',
        low: 'from-green-100 to-emerald-100 border-green-300 text-green-800'
    };

    const handleSavePlan = () => {
        console.log('Saving study plan:', currentPlan);
        setIsEditing(false);
        onSpeakText('Study plan saved successfully');
    };

    const handleGenerateAIStudyPlan = async () => {
        if (!onboardingData) {
            onSpeakText('No onboarding data available for AI study plan generation.');
            return;
        }

        setIsGeneratingPlan(true);
        onSpeakText('Generating your personalized study plan with AI...');

        try {
            const aiRequest: AIStudyPlanRequest = {
                learningGoals: onboardingData.learningGoals,
                gradeLevel: onboardingData.gradeLevel,
                comfortLevel: onboardingData.comfortLevel,
                accessibilityPrefs: onboardingData.accessibilityPrefs
            };

            const aiGeneratedPlan = await generateAIStudyPlan(aiRequest);

            // Update the current plan with AI-generated content
            setCurrentPlan(aiGeneratedPlan);
            setIsEditing(false);
            setShowAIButton(false); // Hide the AI button after use

            onSpeakText('Your personalized AI study plan has been created successfully!');
        } catch (error) {
            console.error('Error generating AI study plan:', error);
            onSpeakText('There was an error generating your study plan. Please try again or create one manually.');
        } finally {
            setIsGeneratingPlan(false);
        }
    };

    const handleAddGoal = () => {
        if (newGoal.title && newGoal.description) {
            const goal: StudyGoal = {
                id: `goal-${Date.now()}`,
                title: newGoal.title,
                description: newGoal.description,
                priority: newGoal.priority as 'high' | 'medium' | 'low',
                estimatedHours: newGoal.estimatedHours || 1,
                completed: false,
                createdAt: new Date()
            };

            setCurrentPlan(prev => ({
                ...prev,
                goals: [...prev.goals, goal]
            }));

            setNewGoal({
                title: '',
                description: '',
                priority: 'medium',
                estimatedHours: 1,
                completed: false
            });
            setShowGoalForm(false);
        }
    };

    const handleDeleteGoal = (goalId: string) => {
        setCurrentPlan(prev => ({
            ...prev,
            goals: prev.goals.filter(goal => goal.id !== goalId)
        }));
    };

    const handleToggleGoal = (goalId: string) => {
        setCurrentPlan(prev => ({
            ...prev,
            goals: prev.goals.map(goal =>
                goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
            )
        }));
    };

    const completedGoals = currentPlan.goals.filter(goal => goal.completed).length;
    const totalGoals = currentPlan.goals.length;
    const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl">
                                <Target className="text-white" size={32} />
                            </div>
                            <div>
                                <h1 style={{ fontSize: `${fontSize + 8}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                    className="font-bold text-gray-800">
                                    <strong>Create Study Plan</strong>
                                </h1>
                                <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                    className="text-gray-600">
                                    <strong>Design</strong> your personalized <strong>learning journey</strong>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => onSpeakText('Create your personalized study plan by setting goals, scheduling study sessions, and tracking your progress.')}
                                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-3 rounded-lg transition-colors focus:ring-4 focus:ring-indigo-300"
                                aria-label="Listen to study plan instructions"
                            >
                                <Volume2 size={20} />
                            </button>

                            {showAIButton && (
                                <button
                                    onClick={handleGenerateAIStudyPlan}
                                    disabled={isGeneratingPlan}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-purple-300"
                                >
                                    {isGeneratingPlan ? (
                                        <Loader className="animate-spin" size={20} />
                                    ) : (
                                        <Sparkles size={20} />
                                    )}
                                    <span style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}>
                                        <strong>{isGeneratingPlan ? 'Generating...' : 'Generate AI Plan'}</strong>
                                    </span>
                                </button>
                            )}

                            <button
                                onClick={handleSavePlan}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-green-300"
                            >
                                <Save size={20} />
                                <span style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}>
                                    <strong>Save Plan</strong>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Progress Overview */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                className="font-bold text-green-800">
                                📊 <strong>Progress Overview</strong>
                            </h2>
                            <div className="text-2xl font-bold text-green-600">
                                {progressPercentage}%
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    className="text-gray-700">
                                    <strong>Goals Completed:</strong> {completedGoals} / {totalGoals}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Study Plan Information */}
                {showAIButton && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                                <Sparkles className="text-white" size={24} />
                            </div>
                            <h3 style={{ fontSize: `${fontSize + 2}px`, letterSpacing: `${characterSpacing}px` }}
                                className="font-bold text-purple-800">
                                🤖 <strong>AI-Powered Study Plan Available!</strong>
                            </h3>
                        </div>
                        <p style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                            className="text-purple-700 mb-4">
                            Based on your onboarding goals and preferences, our AI can create a personalized study plan tailored specifically for you. Click the <strong>"Generate AI Plan"</strong> button above to get started!
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-purple-100">
                            <p style={{ fontSize: `${fontSize - 2}px`, letterSpacing: `${characterSpacing}px` }}
                                className="text-gray-600">
                                <strong>Your Goals:</strong> {onboardingData?.learningGoals.join(', ') || 'Not specified'}<br />
                                <strong>Grade Level:</strong> {onboardingData?.gradeLevel || 'Not specified'}<br />
                                <strong>Comfort Level:</strong> {onboardingData?.comfortLevel || 'Not specified'}
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Plan Details */}
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                className="font-bold text-gray-800">
                                📋 <strong>Plan Details</strong>
                            </h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                            >
                                <Edit3 size={18} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Plan Title */}
                            <div>
                                <label style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    className="block text-gray-700 font-medium mb-2">
                                    <strong>Plan Title</strong>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={currentPlan.title}
                                        onChange={(e) => setCurrentPlan(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                                        placeholder="Enter your study plan title..."
                                        style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    />
                                ) : (
                                    <div style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                        className="text-gray-800 p-3 bg-gray-50 rounded-lg">
                                        {currentPlan.title || 'Untitled Study Plan'}
                                    </div>
                                )}
                            </div>

                            {/* Plan Description */}
                            <div>
                                <label style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    className="block text-gray-700 font-medium mb-2">
                                    <strong>Description</strong>
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={currentPlan.description}
                                        onChange={(e) => setCurrentPlan(prev => ({ ...prev, description: e.target.value }))}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                                        placeholder="Describe your study plan goals and objectives..."
                                        style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    />
                                ) : (
                                    <div style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                        className="text-gray-800 p-3 bg-gray-50 rounded-lg min-h-[100px]">
                                        {currentPlan.description || 'No description provided'}
                                    </div>
                                )}
                            </div>

                            {/* Target Completion Date */}
                            <div>
                                <label style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    className="block text-gray-700 font-medium mb-2">
                                    <strong>Target Completion Date</strong>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        value={currentPlan.targetCompletionDate}
                                        onChange={(e) => setCurrentPlan(prev => ({ ...prev, targetCompletionDate: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                                        style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    />
                                ) : (
                                    <div style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                        className="text-gray-800 p-3 bg-gray-50 rounded-lg flex items-center space-x-2">
                                        <Calendar size={18} />
                                        <span>{currentPlan.targetCompletionDate || 'No target date set'}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Study Goals */}
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                                className="font-bold text-gray-800">
                                🎯 <strong>Study Goals</strong>
                            </h2>
                            <button
                                onClick={() => setShowGoalForm(true)}
                                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors focus:ring-4 focus:ring-green-300"
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        {/* Add Goal Form */}
                        {showGoalForm && (
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Goal title..."
                                        value={newGoal.title}
                                        onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                                        style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    />
                                    <textarea
                                        placeholder="Goal description..."
                                        value={newGoal.description}
                                        onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                                        style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    />
                                    <div className="flex items-center space-x-4">
                                        <select
                                            value={newGoal.priority}
                                            onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                                            style={{ fontSize: `${fontSize - 2}px`, letterSpacing: `${characterSpacing}px` }}
                                        >
                                            <option value="high">High Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="low">Low Priority</option>
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="Hours"
                                            min="1"
                                            max="100"
                                            value={newGoal.estimatedHours}
                                            onChange={(e) => setNewGoal(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) }))}
                                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                                            style={{ fontSize: `${fontSize - 2}px` }}
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleAddGoal}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                            style={{ fontSize: `${fontSize - 2}px`, letterSpacing: `${characterSpacing}px` }}
                                        >
                                            <strong>Add Goal</strong>
                                        </button>
                                        <button
                                            onClick={() => setShowGoalForm(false)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                                            style={{ fontSize: `${fontSize - 2}px`, letterSpacing: `${characterSpacing}px` }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Goals List */}
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {currentPlan.goals.map((goal) => (
                                <div
                                    key={goal.id}
                                    className={`p-4 rounded-lg border-2 transition-colors ${goal.completed
                                            ? 'bg-green-50 border-green-300'
                                            : `bg-gradient-to-r ${priorityColors[goal.priority]} border-2`
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <button
                                                    onClick={() => handleToggleGoal(goal.id)}
                                                    className={`p-1 rounded-full transition-colors ${goal.completed
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-gray-300 hover:bg-gray-400 text-gray-600'
                                                        }`}
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                                <h3 style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                                    className={`font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                                    <strong>{goal.title}</strong>
                                                </h3>
                                            </div>
                                            <p style={{ fontSize: `${fontSize - 2}px`, letterSpacing: `${characterSpacing}px` }}
                                                className={`${goal.completed ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                                                {goal.description}
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm">
                                                <span className="flex items-center space-x-1">
                                                    <Clock size={14} />
                                                    <span style={{ fontSize: `${fontSize - 4}px`, letterSpacing: `${characterSpacing}px` }}>
                                                        {goal.estimatedHours}h
                                                    </span>
                                                </span>
                                                <span style={{ fontSize: `${fontSize - 4}px`, letterSpacing: `${characterSpacing}px` }}
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${goal.priority === 'high'
                                                            ? 'bg-red-100 text-red-800'
                                                            : goal.priority === 'medium'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-green-100 text-green-800'
                                                        }`}>
                                                    {goal.priority.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteGoal(goal.id)}
                                            className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {currentPlan.goals.length === 0 && (
                            <div className="text-center py-12">
                                <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
                                <p style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    className="text-gray-500">
                                    No <strong>study goals</strong> added yet. <br />
                                    Click the <strong>+ button</strong> to add your first goal!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Weekly Schedule */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing, letterSpacing: `${characterSpacing}px` }}
                            className="font-bold text-gray-800">
                            📅 <strong>Weekly Schedule</strong>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-7 gap-4">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="bg-gray-50 p-4 rounded-lg">
                                <h3 style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}
                                    className="font-medium text-gray-800 mb-3 text-center">
                                    <strong>{day.charAt(0).toUpperCase() + day.slice(1)}</strong>
                                </h3>
                                <div className="space-y-2">
                                    {currentPlan.weeklySchedule[day].map((session) => (
                                        <div
                                            key={session.id}
                                            className="bg-white p-2 rounded border border-blue-200 text-center"
                                        >
                                            <div style={{ fontSize: `${fontSize - 4}px`, letterSpacing: `${characterSpacing}px` }}
                                                className="font-medium text-blue-800">
                                                {session.subject}
                                            </div>
                                            <div style={{ fontSize: `${fontSize - 6}px`, letterSpacing: `${characterSpacing}px` }}
                                                className="text-gray-600">
                                                {session.startTime} - {session.endTime}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {currentPlan.weeklySchedule[day].length === 0 && (
                                    <div style={{ fontSize: `${fontSize - 4}px`, letterSpacing: `${characterSpacing}px` }}
                                        className="text-gray-400 text-center py-4">
                                        No sessions
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};