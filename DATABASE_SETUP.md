# Database Setup Instructions

## 🎯 **Quick Start (Recommended)**

Your database is now set up and ready to use! **No additional software installation required.**

### ✅ **Already Completed:**
```bash
# Database is ready!
npm run db:sqlite
```

## 📊 **What's Included**

### **Sample Data:**
- 👥 **2 Demo Users**: `demo@example.com`, `test@example.com` (password: `password123`)
- 📚 **Sample Courses**: Algebra Fundamentals, Visual Geometry
- 📖 **Sample Lessons**: Solving Linear Equations, Graphing Lines
- ⚙️ **User Settings**: Font sizes, learning preferences

### **Database Location:**
- 📁 **File**: `database/dyslexia_learning.db`
- 🔧 **Type**: SQLite (no server required)
- 💾 **Size**: ~50KB with sample data

## 🛠️ **Available Scripts**

```bash
# Test SQLite connection (already working)
npm run db:sqlite

# Test MySQL connection (if you want to use MySQL instead)
npm run db:test

# View your database
# Option 1: Install DB Browser for SQLite
# Option 2: Use VS Code SQLTools extension
```

## 📋 **VS Code Integration**

### **Option 1: SQLite Browser (Recommended)**
1. Download [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Open `database/dyslexia_learning.db`
3. Browse and edit your data visually

### **Option 2: VS Code SQLTools Extension**
1. Install **SQLTools** extension
2. Install **SQLTools SQLite** driver
3. Create connection:
   - **Connection Type**: SQLite
   - **Database File**: `./database/dyslexia_learning.db`

## 🔄 **Using in Your React App**

### **Import Database Service:**
```typescript
import { SQLiteUserService } from './src/services/databaseService';

// Get all courses
const courses = SQLiteUserService.getAllCourses();

// Get user settings
const settings = SQLiteUserService.getUserSettings('user-1');

// Record quiz attempt
SQLiteUserService.recordQuizAttempt(
  'attempt-123', 'user-1', 'lesson-1', 
  85, 100, true, 180, answers
);
```

## 🔄 **Switch to MySQL (Optional)**

If you prefer MySQL over SQLite:

### **1. Install MySQL Server**
- **Windows**: Download from [mysql.com](https://dev.mysql.com/downloads/mysql/)
- **Mac**: `brew install mysql && brew services start mysql`
- **Linux**: `sudo apt install mysql-server && sudo systemctl start mysql`

### **2. Update Environment**
Edit `.env.local`:
```bash
# Uncomment MySQL settings
DATABASE_URL=mysql://root:password@localhost:3306/dyslexia_learning
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dyslexia_learning
DB_USER=root
DB_PASSWORD=your_mysql_password

# Comment out SQLite settings
# DATABASE_URL=sqlite:./database/dyslexia_learning.db
# DATABASE_TYPE=sqlite
```

### **3. Run MySQL Setup**
```bash
npm run db:setup
```

## 🎯 **Database Schema Features**

- **Users & Accessibility Settings** - Font sizes, colors, learning paths
- **Courses & Lessons** - Structured learning content
- **Quiz System** - Questions, attempts, scoring
- **Progress Tracking** - User enrollments, completion rates
- **Learning Analytics** - Activity logging, performance metrics
- **AI Integration** - Support for generated content and images

## 🚀 **Next Steps**

1. ✅ **Database is ready** - No action needed
2. 🔌 **Integrate with React** - Use `SQLiteUserService` in your components
3. 🧠 **Add AI Features** - Store generated quiz questions and images
4. 📊 **Build Analytics** - Track user learning patterns
5. 🔐 **Add Authentication** - Implement user login/registration

## 🆘 **Troubleshooting**

### **SQLite Issues:**
- Ensure write permissions in the `database/` folder
- File automatically created on first run
- No server installation required

### **Performance:**
- SQLite handles thousands of records efficiently
- Consider MySQL for production with >10,000+ users
- Database file grows ~1MB per 1000 quiz attempts

### **Backup:**
```bash
# Backup your database
cp database/dyslexia_learning.db database/backup_$(date +%Y%m%d).db
```

## ✨ **Ready to Use!**

Your dyslexia learning app now has a fully functional database with sample data. Start building your features! 🚀