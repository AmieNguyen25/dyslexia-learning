# 🧠 Dyslexia Learning Platform

> An accessible, AI-powered algebra learning platform designed specifically for students with dyslexia

[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-teal)](https://tailwindcss.com/)

## 🌟 Features

### 🎯 **Accessibility-First Design**
- **Dyslexia-friendly typography** with customizable fonts, spacing, and colors
- **Text-to-speech integration** for auditory learning support
- **Multiple learning paths**: Visual, Auditory, Kinesthetic, and Mixed approaches
- **Customizable display settings** for optimal reading experience

### 🤖 **AI-Powered Learning**
- **Intelligent chatbot** powered by Google Gemini AI
- **Personalized recommendations** based on learning patterns
- **Adaptive difficulty adjustment** based on performance
- **Context-aware assistance** for math problems

### 📚 **Comprehensive Curriculum**
- **Elementary to College-level** algebra courses
- **Interactive lessons** with step-by-step explanations
- **Visual and auditory content** for different learning styles
- **Progress tracking and analytics**

### 🎮 **Engaging Experience**
- **Interactive quizzes** with immediate feedback
- **Performance metrics** and progress visualization
- **Achievement system** to motivate learning
- **Study plan generation** based on goals and performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- No database setup required (uses SQLite)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmieNguyen25/dyslexia-learning.git
   cd dyslexia-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional, for AI chatbot)
   ```bash
   cp .env.example .env.local
   # Add your Gemini API key to .env.local
   ```

4. **Initialize the database**
   ```bash
   npm run db:setup
   npm run db:sqlite
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser** to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AccessibilitySettings.tsx
│   ├── Chatbot.tsx
│   ├── QuizComponent.tsx
│   └── ...
├── pages/               # Main application pages
│   ├── Dashboard.tsx
│   ├── LessonPage.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useAccessibilitySettings.ts
│   ├── useSpeechSynthesis.ts
│   └── ...
├── services/            # API and business logic
│   ├── geminiService.ts
│   ├── databaseService.ts
│   └── ...
├── types/               # TypeScript type definitions
└── lib/                 # Utilities and configurations
```

## 🎛️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Database
npm run db:setup        # Initialize database with schema
npm run db:test         # Test database connection
npm run db:sqlite       # Test SQLite operations

# Code Quality
npm run lint            # Run ESLint
```

## 🔧 Configuration

### Accessibility Settings
The app supports extensive customization for dyslexic users:
- **Font size**: 12px - 24px
- **Line spacing**: 1.0x - 2.5x
- **Character spacing**: 1.0x - 2.0x
- **Color themes**: High contrast options
- **Reading speed**: Adjustable for text-to-speech

### AI Chatbot Setup
See [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) for detailed instructions on configuring the Google Gemini AI integration.

### Database
The application uses SQLite for local data storage. See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for more information.

## 🎓 Learning Paths

### Visual Learning Path
- Interactive diagrams and charts
- Color-coded problem steps
- Graphical representations of concepts

### Auditory Learning Path
- Text-to-speech for all content
- Audio explanations
- Verbal problem-solving guides

### Kinesthetic Learning Path
- Interactive drag-and-drop exercises
- Step-by-step manipulation tools
- Hands-on problem-solving activities

## 📊 Demo Accounts

For testing, use these pre-configured accounts:
- **Email**: `demo@example.com`
- **Password**: `password123`

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **Database**: SQLite with Better-SQLite3
- **AI Integration**: Google Gemini AI
- **Icons**: Lucide React
- **Styling**: TailwindCSS with custom dyslexia-friendly themes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- 📚 Check the [documentation](./docs) for detailed guides
- 🐛 Report issues on [GitHub Issues](https://github.com/AmieNguyen25/dyslexia-learning/issues)
- 💬 Join discussions in [GitHub Discussions](https://github.com/AmieNguyen25/dyslexia-learning/discussions)

## 🙏 Acknowledgments

- **Dyslexia research community** for accessibility guidelines
- **Google Gemini AI** for intelligent tutoring capabilities
- **Open source contributors** who made this project possible

---

**Made with ❤️ for accessible education**
