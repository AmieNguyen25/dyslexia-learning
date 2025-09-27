import { useState } from 'react';
import { Navigation, OnboardingWizard } from './components';
import { Dashboard, LessonPage, Login, Register } from './pages';
import { useSpeechSynthesis, useTimer, useAccessibilitySettings } from './hooks';
import type { User, LearningPath, CurrentPage, OnboardingData } from './types';


const DyslexiaAlgebraApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('dashboard');
  const [learningPath, setLearningPath] = useState<LearningPath>('visual');
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Custom hooks
  const { fontSize, lineSpacing, setFontSize, setLineSpacing } = useAccessibilitySettings();
  const { speakText } = useSpeechSynthesis();
  const { timeOnTask, resetTimer } = useTimer(currentPage === 'lesson' && isLoggedIn);

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
    resetTimer();
  };

  const handlePageChange = (page: CurrentPage) => {
    setCurrentPage(page);
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
      />

      {currentPage === 'dashboard' ? (
        <Dashboard
          fontSize={fontSize}
          lineSpacing={lineSpacing}
          currentUser={currentUser}
          learningPath={learningPath}
          onLearningPathChange={setLearningPath}
          onFontSizeChange={setFontSize}
          onLineSpacingChange={setLineSpacing}
          onSpeakText={speakText}
        />
      ) : (
        <LessonPage
          fontSize={fontSize}
          lineSpacing={lineSpacing}
          learningPath={learningPath}
          timeOnTask={timeOnTask}
          onSpeakText={speakText}
        />
      )}
    </div>
  );
};

export default DyslexiaAlgebraApp;