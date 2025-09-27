import { useState } from 'react';
import { Navigation, LoginScreen } from './components';
import { Dashboard, LessonPage } from './pages';
import { useSpeechSynthesis, useTimer, useAccessibilitySettings } from './hooks';
import type { User, LearningPath, CurrentPage } from './types';

const DyslexiaAlgebraApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('dashboard');
  const [learningPath, setLearningPath] = useState<LearningPath>('visual');

  // Custom hooks
  const { fontSize, lineSpacing, setFontSize, setLineSpacing } = useAccessibilitySettings();
  const { speakText } = useSpeechSynthesis();
  const { timeOnTask, resetTimer } = useTimer(currentPage === 'lesson' && isLoggedIn);

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setCurrentUser({
      name: username,
      preferredPath: 'visual',
      adaptationHistory: ['Started with Visual path', 'High engagement in visual mode'],
      performance: { avgQuizScore: 82, avgTimeOnTask: 45, confidenceLevel: 4.2 }
    });
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

  if (!isLoggedIn) {
    return (
      <LoginScreen
        fontSize={fontSize}
        lineSpacing={lineSpacing}
        onLogin={handleLogin}
      />
    );
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