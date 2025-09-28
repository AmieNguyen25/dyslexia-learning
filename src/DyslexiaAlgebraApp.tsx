import { useState } from 'react';
import { Navigation, OnboardingWizard, Chatbot } from './components';
import { Dashboard, LessonPage, StudyPlan, Login, Register } from './pages';
import { useSpeechSynthesis, useTimer, useAccessibilitySettings, useProgressTracking } from './hooks';
import { MessageSquare } from 'lucide-react';
import type { User, LearningPath, CurrentPage, OnboardingData, Course, QuizAttempt } from './types';


const DyslexiaAlgebraApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('dashboard');
  const [learningPath, setLearningPath] = useState<LearningPath>('visual');
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Custom hooks
  const { fontSize, lineSpacing, characterSpacing, setFontSize, setLineSpacing, setCharacterSpacing } = useAccessibilitySettings();
  const { speakText } = useSpeechSynthesis();
  const { timeOnTask, resetTimer } = useTimer(currentPage === 'lesson' && isLoggedIn);
  const { completeLesson, getCoursesWithProgress, enhanceCourseWithProgress } = useProgressTracking();

  const handleLogin = (username: string, _password: string) => {
    setIsLoggedIn(true);
    setCurrentUser({
      name: username,
      preferredPath: 'visual',
      adaptationHistory: ['Started with Visual path', 'High engagement in visual mode'],
      performance: { avgQuizScore: 82, avgTimeOnTask: 45, confidenceLevel: 4.2 }
    });
  };

  const handleRegister = (userData: any) => {
    setCurrentUser({
      name: userData.username,
      email: userData.email,
      preferredPath: userData.preferredPath,
      adaptationHistory: ['New user registered'],
      performance: { avgQuizScore: 0, avgTimeOnTask: 0, confidenceLevel: 3.0 }
    });
    setShowOnboarding(true); // Show onboarding after registration
  };

  const handleOnboardingComplete = (onboardingData: OnboardingData) => {
    // Update user preferences based on onboarding data
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        preferredPath: onboardingData.learningGoals.includes('concept-review') ? 'visual' : 'auditory',
        adaptationHistory: [
          ...currentUser.adaptationHistory,
          `Completed onboarding - Grade: ${onboardingData.gradeLevel}, Comfort: ${onboardingData.comfortLevel}`,
          `Learning goals: ${onboardingData.learningGoals.join(', ')}`
        ]
      });
    }

    // Apply accessibility settings
    setFontSize(onboardingData.accessibilityPrefs.fontSize);

    // Complete the flow
    setShowOnboarding(false);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('dashboard');
    setSelectedCourse(null);
    resetTimer();
  };

  const handlePageChange = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('lesson');
    speakText(`Starting ${course.title}. This course has ${course.lessons.length} lessons.`);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    // Keep selectedCourse so user can return to their course
  };

  const handleLessonComplete = (lessonId: string, attempt: QuizAttempt) => {
    // Update progress tracking
    if (selectedCourse && attempt) {
      completeLesson(selectedCourse.id, lessonId, attempt);

      // Update the selected course with new progress
      const updatedCourse = enhanceCourseWithProgress(selectedCourse);
      setSelectedCourse(updatedCourse);
    }

    // Update user performance based on quiz results
    if (currentUser && attempt) {
      const newAvgScore = (currentUser.performance.avgQuizScore + attempt.score * 20) / 2; // Convert to percentage
      const newConfidence = attempt.passed
        ? Math.min(currentUser.performance.confidenceLevel + 0.2, 5.0)
        : Math.max(currentUser.performance.confidenceLevel - 0.1, 1.0);

      setCurrentUser({
        ...currentUser,
        performance: {
          ...currentUser.performance,
          avgQuizScore: newAvgScore,
          confidenceLevel: newConfidence
        },
        adaptationHistory: [
          ...currentUser.adaptationHistory,
          `Completed lesson ${lessonId} with score ${attempt.score}/5 (${attempt.passed ? 'passed' : 'failed'})`
        ]
      });
    }

    // Show congratulations or encouragement
    const message = attempt.passed
      ? `Great job! You completed the lesson with ${attempt.score} out of 5 correct answers!`
      : `Good effort! You got ${attempt.score} out of 5. Review the examples and try again when you're ready.`;

    speakText(message);
  };

  // Show onboarding wizard after registration
  if (showOnboarding && currentUser && !isLoggedIn) {
    return (
      <OnboardingWizard
        fontSize={fontSize}
        lineSpacing={lineSpacing}
        onComplete={handleOnboardingComplete}
        onSpeakText={speakText}
      />
    );
  }

  // Show authentication pages
  if (!isLoggedIn) {
    if (authPage === 'login') {
      return (
        <Login
          fontSize={fontSize}
          lineSpacing={lineSpacing}
          onLogin={handleLogin}
          onNavigateToRegister={() => setAuthPage('register')}
          onSpeakText={speakText}
        />
      );
    } else {
      return (
        <Register
          fontSize={fontSize}
          lineSpacing={lineSpacing}
          onRegister={handleRegister}
          onNavigateToLogin={() => setAuthPage('login')}
          onSpeakText={speakText}
        />
      );
    }
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'OpenDyslexic, Arial, sans-serif' }}>
      <Navigation
        currentUser={currentUser}
        currentPage={currentPage}
        fontSize={fontSize}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
        selectedCourse={selectedCourse}
      />

      {currentPage === 'dashboard' ? (
        <Dashboard
          fontSize={fontSize}
          lineSpacing={lineSpacing}
          characterSpacing={characterSpacing}
          currentUser={currentUser}
          learningPath={learningPath}
          onLearningPathChange={setLearningPath}
          onFontSizeChange={setFontSize}
          onLineSpacingChange={setLineSpacing}
          onCharacterSpacingChange={setCharacterSpacing}
          onSpeakText={speakText}
          timeOnTask={timeOnTask}
          selectedCourse={selectedCourse}
          onCourseSelect={handleCourseSelect}
        />
      ) : currentPage === 'study-plan' ? (
        <StudyPlan
          fontSize={fontSize}
          lineSpacing={lineSpacing}
          characterSpacing={characterSpacing}
          onSpeakText={speakText}
        />
      ) : (
        <LessonPage
          fontSize={fontSize}
          lineSpacing={lineSpacing}
          characterSpacing={characterSpacing}
          learningPath={learningPath}
          timeOnTask={timeOnTask}
          onSpeakText={speakText}
          selectedCourse={selectedCourse}
          onBackToDashboard={handleBackToDashboard}
          currentUser={currentUser}
          onLessonComplete={handleLessonComplete}
        />
      )}

      {/* Global AI Chatbot - Available on all pages after login */}
      {isLoggedIn && (
        <>
          {isChatOpen && (
            <Chatbot
              onClose={() => setIsChatOpen(false)}
              fontSize={fontSize}
              characterSpacing={characterSpacing}
              onSpeakText={speakText}
            />
          )}

          {/* Floating Chatbot Toggle Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 z-40"
            aria-label="Open AI support chat"
          >
            <MessageSquare size={28} />
          </button>
        </>
      )}
    </div>
  );
};

export default DyslexiaAlgebraApp;