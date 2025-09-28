import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// SQLite database configuration
const DB_PATH = path.join(process.cwd(), 'database', 'dyslexia_learning.db');

// Ensure database directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection
let db: Database.Database | null = null;

export const getDatabase = (): Database.Database => {
    if (!db) {
        db = new Database(DB_PATH);
        db.pragma('journal_mode = WAL'); // Enable WAL mode for better performance
    }
    return db;
};

// Test database connection
export const testSQLiteConnection = (): boolean => {
    try {
        const database = getDatabase();
        const result = database.prepare('SELECT 1 as test').get();
        console.log('✅ SQLite database connection successful');
        return true;
    } catch (error) {
        console.error('❌ SQLite database connection failed:', error);
        return false;
    }
};

// Execute a single query
export const executeSQLiteQuery = (query: string, params: any[] = []): any => {
    try {
        const database = getDatabase();
        
        if (query.trim().toUpperCase().startsWith('SELECT')) {
            return database.prepare(query).all(params);
        } else {
            return database.prepare(query).run(params);
        }
    } catch (error) {
        console.error('SQLite query error:', error);
        throw error;
    }
};

// Initialize SQLite database with schema
export const initializeSQLiteDatabase = (): void => {
    try {
        const database = getDatabase();
        
        // Create tables
        database.exec(`
            -- Users Table
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                learning_path TEXT DEFAULT 'mixed' CHECK(learning_path IN ('visual', 'auditory', 'kinesthetic', 'mixed')),
                preferences TEXT, -- JSON as TEXT
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_login DATETIME,
                is_active BOOLEAN DEFAULT TRUE
            );

            -- User Settings Table
            CREATE TABLE IF NOT EXISTS user_settings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                font_size INTEGER DEFAULT 16,
                line_spacing REAL DEFAULT 1.5,
                character_spacing REAL DEFAULT 1.0,
                background_color TEXT DEFAULT 'cream',
                text_color TEXT DEFAULT 'dark-blue',
                reading_speed INTEGER DEFAULT 200,
                preferred_voice TEXT DEFAULT 'system',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            -- Courses Table
            CREATE TABLE IF NOT EXISTS courses (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                difficulty_level TEXT DEFAULT 'beginner' CHECK(difficulty_level IN ('beginner', 'intermediate', 'advanced')),
                estimated_duration INTEGER,
                category TEXT,
                prerequisites TEXT, -- JSON as TEXT
                learning_objectives TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE
            );

            -- Lessons Table
            CREATE TABLE IF NOT EXISTS lessons (
                id TEXT PRIMARY KEY,
                course_id TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                content TEXT,
                lesson_order INTEGER NOT NULL,
                estimated_duration INTEGER,
                difficulty_level TEXT DEFAULT 'beginner' CHECK(difficulty_level IN ('beginner', 'intermediate', 'advanced')),
                learning_objectives TEXT, -- JSON as TEXT
                prerequisites TEXT, -- JSON as TEXT
                pass_required_score INTEGER DEFAULT 70,
                max_attempts INTEGER DEFAULT 3,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
            );

            -- Quiz Questions Table
            CREATE TABLE IF NOT EXISTS quiz_questions (
                id TEXT PRIMARY KEY,
                lesson_id TEXT NOT NULL,
                question_text TEXT NOT NULL,
                question_type TEXT DEFAULT 'multiple_choice' CHECK(question_type IN ('multiple_choice', 'true_false', 'fill_blank', 'matching')),
                correct_answer TEXT NOT NULL,
                options TEXT, -- JSON as TEXT
                explanation TEXT,
                image_url TEXT,
                image_alt TEXT,
                difficulty_level TEXT DEFAULT 'medium' CHECK(difficulty_level IN ('easy', 'medium', 'hard')),
                points INTEGER DEFAULT 1,
                time_limit INTEGER,
                tags TEXT, -- JSON as TEXT
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
            );

            -- Quiz Attempts Table
            CREATE TABLE IF NOT EXISTS quiz_attempts (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                lesson_id TEXT NOT NULL,
                attempt_number INTEGER NOT NULL,
                score REAL NOT NULL,
                max_score REAL NOT NULL,
                percentage REAL NOT NULL,
                passed BOOLEAN NOT NULL,
                time_taken INTEGER,
                answers TEXT, -- JSON as TEXT
                started_at DATETIME NOT NULL,
                completed_at DATETIME NOT NULL,
                confidence_level INTEGER,
                feedback TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
            );

            -- User Course Enrollments
            CREATE TABLE IF NOT EXISTS user_enrollments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                course_id TEXT NOT NULL,
                enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                completion_date DATETIME,
                status TEXT DEFAULT 'enrolled' CHECK(status IN ('enrolled', 'in_progress', 'completed', 'dropped')),
                progress_percentage REAL DEFAULT 0.00,
                last_accessed DATETIME,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
                UNIQUE(user_id, course_id)
            );

            -- Learning Analytics Table
            CREATE TABLE IF NOT EXISTS learning_analytics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                session_id TEXT,
                activity_type TEXT NOT NULL CHECK(activity_type IN ('lesson_view', 'quiz_attempt', 'example_view', 'audio_play', 'rewind', 'speed_change')),
                lesson_id TEXT,
                course_id TEXT,
                duration INTEGER,
                details TEXT, -- JSON as TEXT
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL,
                FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
            );
        `);

        // Insert sample data
        const insertSampleData = database.transaction(() => {
            // Sample courses
            database.prepare(`
                INSERT OR IGNORE INTO courses (id, title, description, difficulty_level, estimated_duration, category) 
                VALUES (?, ?, ?, ?, ?, ?)
            `).run('course-algebra-1', 'Algebra Fundamentals', 'Basic algebraic concepts for dyslexic learners', 'beginner', 180, 'Mathematics');

            database.prepare(`
                INSERT OR IGNORE INTO courses (id, title, description, difficulty_level, estimated_duration, category) 
                VALUES (?, ?, ?, ?, ?, ?)
            `).run('course-geometry-1', 'Visual Geometry', 'Geometry with visual learning techniques', 'beginner', 150, 'Mathematics');

            // Sample lessons
            database.prepare(`
                INSERT OR IGNORE INTO lessons (id, course_id, title, description, lesson_order, estimated_duration, pass_required_score) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run('lesson-solving-equations', 'course-algebra-1', 'Solving Linear Equations', 'Learn to solve basic linear equations step by step', 1, 30, 70);

            database.prepare(`
                INSERT OR IGNORE INTO lessons (id, course_id, title, description, lesson_order, estimated_duration, pass_required_score) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run('lesson-graphing-lines', 'course-algebra-1', 'Graphing Linear Equations', 'Visual representation of linear equations', 2, 35, 70);

            // Sample users (password is 'password123' hashed with bcrypt)
            database.prepare(`
                INSERT OR IGNORE INTO users (id, name, email, password_hash, learning_path) 
                VALUES (?, ?, ?, ?, ?)
            `).run('user-1', 'Demo Student', 'demo@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'visual');

            database.prepare(`
                INSERT OR IGNORE INTO users (id, name, email, password_hash, learning_path) 
                VALUES (?, ?, ?, ?, ?)
            `).run('user-2', 'Test User', 'test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'auditory');

            // Sample user settings
            database.prepare(`
                INSERT OR IGNORE INTO user_settings (user_id, font_size, line_spacing, background_color) 
                VALUES (?, ?, ?, ?)
            `).run('user-1', 18, 1.8, 'cream');

            database.prepare(`
                INSERT OR IGNORE INTO user_settings (user_id, font_size, line_spacing, background_color) 
                VALUES (?, ?, ?, ?)
            `).run('user-2', 16, 1.5, 'light-blue');

            // Sample enrollments
            database.prepare(`
                INSERT OR IGNORE INTO user_enrollments (user_id, course_id, status, progress_percentage) 
                VALUES (?, ?, ?, ?)
            `).run('user-1', 'course-algebra-1', 'in_progress', 45.50);

            database.prepare(`
                INSERT OR IGNORE INTO user_enrollments (user_id, course_id, status, progress_percentage) 
                VALUES (?, ?, ?, ?)
            `).run('user-2', 'course-geometry-1', 'enrolled', 0.00);
        });

        insertSampleData();
        
        console.log('✅ SQLite database initialized with sample data');
    } catch (error) {
        console.error('❌ SQLite database initialization failed:', error);
        throw error;
    }
};

// Close database connection
export const closeSQLiteDatabase = (): void => {
    if (db) {
        db.close();
        db = null;
        console.log('SQLite database connection closed');
    }
};

// Utility functions
export const sqliteUtils = {
    // Check if a table exists
    tableExists: (tableName: string): boolean => {
        try {
            const database = getDatabase();
            const result = database.prepare(`
                SELECT COUNT(*) as count FROM sqlite_master 
                WHERE type='table' AND name=?
            `).get(tableName) as { count: number };
            return result.count > 0;
        } catch (error) {
            return false;
        }
    },

    // Get table row count
    getRowCount: (tableName: string): number => {
        try {
            const database = getDatabase();
            const result = database.prepare(`SELECT COUNT(*) as count FROM ${tableName}`).get() as { count: number };
            return result.count;
        } catch (error) {
            return 0;
        }
    },

    // Check if database has sample data
    hasSampleData: (): boolean => {
        try {
            const userCount = sqliteUtils.getRowCount('users');
            const courseCount = sqliteUtils.getRowCount('courses');
            return userCount > 0 && courseCount > 0;
        } catch (error) {
            return false;
        }
    }
};

export default {
    getDatabase,
    testSQLiteConnection,
    executeSQLiteQuery,
    initializeSQLiteDatabase,
    closeSQLiteDatabase,
    sqliteUtils
};