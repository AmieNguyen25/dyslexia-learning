import React, { useState, useEffect } from 'react';
import { User, Volume2, Eye, RotateCcw, Play, Pause, Settings, LogOut, Home, BookOpen, BarChart3 } from 'lucide-react';

const DyslexiaAlgebraApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [learningPath, setLearningPath] = useState('visual'); // 'visual' or 'auditory'
  const [fontSize, setFontSize] = useState(18);
  const [lineSpacing, setLineSpacing] = useState(1.6);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [timeOnTask, setTimeOnTask] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [currentEquation, setCurrentEquation] = useState('2x + 5 = 11');
  const [equationStep, setEquationStep] = useState(0);
  const [rewindCount, setRewindCount] = useState(0);

  // Simulate timer
  useEffect(() => {
    if (currentPage === 'lesson' && isLoggedIn) {
      const timer = setInterval(() => {
        setTimeOnTask(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentPage, isLoggedIn]);

  const handleLogin = (username) => {
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
    setTimeOnTask(0);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const visualSteps = [
    { step: '2x + 5 = 11', explanation: 'Start with the equation' },
    { step: '2x + 5 - 5 = 11 - 5', explanation: 'Subtract 5 from both sides' },
    { step: '2x = 6', explanation: 'Simplify both sides' },
    { step: 'x = 3', explanation: 'Divide both sides by 2' }
  ];

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 style={{ fontSize: `${fontSize + 6}px`, lineHeight: lineSpacing }} 
              className="font-bold text-gray-800 mb-2">
            Algebraic Concepts
          </h1>
          <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} 
             className="text-gray-600">
            Dyslexia-friendly learning platform
          </p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('Alex Student')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl text-lg font-medium transition-colors focus:ring-4 focus:ring-blue-200"
            style={{ fontSize: `${fontSize}px` }}
          >
            Login as Alex Student
          </button>
          
          <button 
            onClick={() => handleLogin('Demo User')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-6 rounded-xl text-lg font-medium transition-colors focus:ring-4 focus:ring-gray-200"
            style={{ fontSize: `${fontSize}px` }}
          >
            Demo Login
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }} 
             className="text-blue-800 text-center">
            🧠 Designed for learners with dyslexia<br/>
            📱 Full keyboard navigation support
          </p>
        </div>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-6">
          <h1 style={{ fontSize: `${fontSize + 2}px` }} className="font-bold text-gray-800">
            Algebraic Concepts
          </h1>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:ring-4 focus:ring-blue-200 ${
                currentPage === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home size={18} />
              <span style={{ fontSize: `${fontSize - 2}px` }}>Dashboard</span>
            </button>
            
            <button 
              onClick={() => setCurrentPage('lesson')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:ring-4 focus:ring-green-200 ${
                currentPage === 'lesson' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen size={18} />
              <span style={{ fontSize: `${fontSize - 2}px` }}>Lesson</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <User size={18} />
            <span style={{ fontSize: `${fontSize - 2}px` }}>{currentUser?.name}</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors focus:ring-4 focus:ring-red-200 px-3 py-2 rounded-lg"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );

  const Dashboard = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl">
        <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }} 
            className="font-bold mb-2">
          Welcome back, {currentUser?.name}! 🎯
        </h2>
        <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}>
          Ready to continue your algebra journey?
        </p>
        
        <button 
          onClick={() => speakText(`Welcome back ${currentUser?.name}! Ready to continue your algebra journey?`)}
          className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-white focus:ring-opacity-30"
        >
          <Volume2 size={18} />
          <span style={{ fontSize: `${fontSize - 2}px` }}>Listen</span>
        </button>
      </div>

      {/* Learning Path Selector */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing }} 
            className="font-semibold mb-4 text-gray-800">
          🎨 Your Learning Style
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setLearningPath('visual')}
            className={`p-6 rounded-xl border-2 transition-colors focus:ring-4 ${
              learningPath === 'visual' 
                ? 'border-blue-500 bg-blue-50 focus:ring-blue-200' 
                : 'border-gray-200 hover:border-gray-300 focus:ring-gray-200'
            }`}
          >
            <Eye className="mx-auto mb-3 text-blue-600" size={32} />
            <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium mb-2">
              Visual Learning
            </h4>
            <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} 
               className="text-gray-600">
              Diagrams, infographics, and step-by-step visual guides
            </p>
          </button>
          
          <button
            onClick={() => setLearningPath('auditory')}
            className={`p-6 rounded-xl border-2 transition-colors focus:ring-4 ${
              learningPath === 'auditory' 
                ? 'border-green-500 bg-green-50 focus:ring-green-200' 
                : 'border-gray-200 hover:border-gray-300 focus:ring-gray-200'
            }`}
          >
            <Volume2 className="mx-auto mb-3 text-green-600" size={32} />
            <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium mb-2">
              Auditory Learning
            </h4>
            <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} 
               className="text-gray-600">
              Narrated walkthroughs with voice descriptions
            </p>
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium text-gray-800">
              Quiz Performance
            </h4>
            <BarChart3 className="text-blue-600" size={24} />
          </div>
          <div style={{ fontSize: `${fontSize + 8}px` }} className="text-3xl font-bold text-blue-600 mb-2">
            {currentUser?.performance.avgQuizScore}%
          </div>
          <p style={{ fontSize: `${fontSize - 4}px` }} className="text-gray-600">
            Average score
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium text-gray-800">
              Engagement
            </h4>
            <div className="text-green-600">⏱️</div>
          </div>
          <div style={{ fontSize: `${fontSize + 8}px` }} className="text-3xl font-bold text-green-600 mb-2">
            {currentUser?.performance.avgTimeOnTask}s
          </div>
          <p style={{ fontSize: `${fontSize - 4}px` }} className="text-gray-600">
            Average time on task
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium text-gray-800">
              Confidence
            </h4>
            <div className="text-purple-600">🎯</div>
          </div>
          <div style={{ fontSize: `${fontSize + 8}px` }} className="text-3xl font-bold text-purple-600 mb-2">
            {currentUser?.performance.confidenceLevel}/5
          </div>
          <p style={{ fontSize: `${fontSize - 4}px` }} className="text-gray-600">
            Self-reported confidence
          </p>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 style={{ fontSize: `${fontSize + 2}px`, lineHeight: lineSpacing }} 
            className="font-semibold mb-4 text-gray-800 flex items-center">
          <Settings className="mr-2" size={20} />
          Accessibility Settings
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label style={{ fontSize: `${fontSize}px` }} className="block text-gray-700 mb-2">
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="14"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:ring-4 focus:ring-blue-200"
            />
          </div>
          
          <div>
            <label style={{ fontSize: `${fontSize}px` }} className="block text-gray-700 mb-2">
              Line Spacing: {lineSpacing}x
            </label>
            <input
              type="range"
              min="1.2"
              max="2.0"
              step="0.1"
              value={lineSpacing}
              onChange={(e) => setLineSpacing(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:ring-4 focus:ring-blue-200"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const LessonPage = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ fontSize: `${fontSize + 4}px`, lineHeight: lineSpacing }} 
              className="font-bold text-gray-800">
            Solving Linear Equations
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Time: {timeOnTask}s</span>
            <span>Rewinds: {rewindCount}</span>
          </div>
        </div>

        {learningPath === 'visual' ? (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold mb-4 text-blue-800">
                📊 Visual Step-by-Step Solution
              </h3>
              
              <div className="space-y-4">
                {visualSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      index <= equationStep ? 'border-blue-300 bg-white' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div style={{ fontSize: `${fontSize + 2}px`, fontFamily: 'monospace' }} 
                           className="font-bold text-gray-800">
                        {step.step}
                      </div>
                      <button
                        onClick={() => speakText(`${step.explanation}. The equation is: ${step.step}`)}
                        className="text-blue-600 hover:text-blue-700 focus:ring-4 focus:ring-blue-200 p-2 rounded"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                    <p style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }} 
                       className="text-gray-600 mt-2">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setEquationStep(Math.min(equationStep + 1, visualSteps.length - 1))}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg focus:ring-4 focus:ring-blue-200"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  Next Step
                </button>
                <button
                  onClick={() => {
                    setEquationStep(Math.max(equationStep - 1, 0));
                    setRewindCount(prev => prev + 1);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg focus:ring-4 focus:ring-gray-200 flex items-center space-x-2"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  <RotateCcw size={18} />
                  <span>Previous</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold mb-4 text-green-800 flex items-center">
                🎧 Audio Walkthrough
              </h3>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="text-center mb-6">
                  <div style={{ fontSize: `${fontSize + 4}px`, fontFamily: 'monospace' }} 
                       className="font-bold text-gray-800 mb-4">
                    {currentEquation}
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        if (!isPlaying) {
                          speakText(`Let's solve the equation ${currentEquation}. First, we need to isolate x by getting rid of the 5 on the left side. We subtract 5 from both sides. This gives us 2x equals 6. Now we divide both sides by 2 to get x equals 3.`);
                        }
                      }}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg focus:ring-4 ${
                        isPlaying 
                          ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-200' 
                          : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-200'
                      }`}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      <span style={{ fontSize: `${fontSize}px` }}>
                        {isPlaying ? 'Pause' : 'Play Walkthrough'}
                      </span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setRewindCount(prev => prev + 1);
                        speakText(`Let me repeat that. We're solving ${currentEquation}`);
                      }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg focus:ring-4 focus:ring-gray-200"
                    >
                      <RotateCcw size={20} />
                      <span style={{ fontSize: `${fontSize}px` }}>Rewind</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Quiz */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
          <h3 style={{ fontSize: `${fontSize + 2}px` }} className="font-semibold mb-4 text-gray-800">
            Quick Understanding Check
          </h3>
          <p style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }} className="mb-4">
            What is the value of x in the equation 2x + 5 = 11?
          </p>
          
          <div className="space-y-2">
            {[1, 2, 3, 4].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setQuizScore(option === 3 ? 100 : 0);
                  speakText(option === 3 ? 'Correct! Great job!' : 'Not quite right. Try again!');
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors focus:ring-4 ${
                  quizScore !== null && option === 3 
                    ? 'border-green-500 bg-green-50 focus:ring-green-200' 
                    : quizScore !== null && quizScore === 0 
                    ? 'border-red-500 bg-red-50 focus:ring-red-200'
                    : 'border-gray-200 hover:border-gray-300 focus:ring-gray-200'
                }`}
                style={{ fontSize: `${fontSize}px` }}
              >
                x = {option}
              </button>
            ))}
          </div>
          
          {quizScore !== null && (
            <div className="mt-4 p-4 bg-white rounded-lg">
              <h4 style={{ fontSize: `${fontSize}px` }} className="font-medium mb-2">
                How confident do you feel about this concept? (1-5)
              </h4>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setConfidenceScore(level)}
                    className={`w-12 h-12 rounded-lg border-2 transition-colors focus:ring-4 ${
                      confidenceScore === level 
                        ? 'border-blue-500 bg-blue-500 text-white focus:ring-blue-200' 
                        : 'border-gray-300 hover:border-gray-400 focus:ring-gray-200'
                    }`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'OpenDyslexic, Arial, sans-serif' }}>
      <Navigation />
      {currentPage === 'dashboard' ? <Dashboard /> : <LessonPage />}
    </div>
  );
};

export default DyslexiaAlgebraApp;