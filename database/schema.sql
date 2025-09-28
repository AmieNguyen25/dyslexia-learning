-- Dyslexia Learning App Database Schema
-- Created: September 28, 2025

-- ========================================
-- Users Table
-- ========================================
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    learning_path ENUM('visual', 'auditory', 'kinesthetic', 'mixed') DEFAULT 'mixed',
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- ========================================
-- User Settings Table
-- ========================================
CREATE TABLE user_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    font_size INT DEFAULT 16,
    line_spacing DECIMAL(3,1) DEFAULT 1.5,
    character_spacing DECIMAL(3,1) DEFAULT 1.0,
    background_color VARCHAR(20) DEFAULT 'cream',
    text_color VARCHAR(20) DEFAULT 'dark-blue',
    reading_speed INT DEFAULT 200, -- words per minute
    preferred_voice VARCHAR(50) DEFAULT 'system',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ========================================
-- Courses Table
-- ========================================
CREATE TABLE courses (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    estimated_duration INT, -- in minutes
    category VARCHAR(100),
    prerequisites JSON, -- array of course IDs
    learning_objectives TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- ========================================
-- Lessons Table
-- ========================================
CREATE TABLE lessons (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content TEXT,
    lesson_order INT NOT NULL,
    estimated_duration INT, -- in minutes
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    learning_objectives JSON,
    prerequisites JSON,
    pass_required_score INT DEFAULT 70, -- percentage
    max_attempts INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- ========================================
-- Quiz Questions Table
-- ========================================
CREATE TABLE quiz_questions (
    id VARCHAR(50) PRIMARY KEY,
    lesson_id VARCHAR(50) NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'true_false', 'fill_blank', 'matching') DEFAULT 'multiple_choice',
    correct_answer VARCHAR(500) NOT NULL,
    options JSON, -- for multiple choice questions
    explanation TEXT,
    image_url VARCHAR(500),
    image_alt TEXT,
    difficulty_level ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    points INT DEFAULT 1,
    time_limit INT, -- seconds
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- ========================================
-- Quiz Attempts Table
-- ========================================
CREATE TABLE quiz_attempts (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    lesson_id VARCHAR(50) NOT NULL,
    attempt_number INT NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    max_score DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    passed BOOLEAN NOT NULL,
    time_taken INT, -- in seconds
    answers JSON, -- store user answers
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP NOT NULL,
    confidence_level INT, -- 1-5 scale
    feedback TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- ========================================
-- User Course Enrollments
-- ========================================
CREATE TABLE user_enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP NULL,
    status ENUM('enrolled', 'in_progress', 'completed', 'dropped') DEFAULT 'enrolled',
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    last_accessed TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (user_id, course_id)
);

-- ========================================
-- Learning Analytics Table
-- ========================================
CREATE TABLE learning_analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    session_id VARCHAR(50),
    activity_type ENUM('lesson_view', 'quiz_attempt', 'example_view', 'audio_play', 'rewind', 'speed_change') NOT NULL,
    lesson_id VARCHAR(50),
    course_id VARCHAR(50),
    duration INT, -- in seconds
    details JSON,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- ========================================
-- Sample Data Insertion
-- ========================================

-- Insert sample courses
INSERT INTO courses (id, title, description, difficulty_level, estimated_duration, category) VALUES
('course-algebra-1', 'Algebra Fundamentals', 'Basic algebraic concepts for dyslexic learners', 'beginner', 180, 'Mathematics'),
('course-geometry-1', 'Visual Geometry', 'Geometry with visual learning techniques', 'beginner', 150, 'Mathematics'),
('course-fractions-1', 'Understanding Fractions', 'Fractions made easy with visual aids', 'beginner', 120, 'Mathematics');

-- Insert sample lessons
INSERT INTO lessons (id, course_id, title, description, lesson_order, estimated_duration, pass_required_score) VALUES
('lesson-solving-equations', 'course-algebra-1', 'Solving Linear Equations', 'Learn to solve basic linear equations step by step', 1, 30, 70),
('lesson-graphing-lines', 'course-algebra-1', 'Graphing Linear Equations', 'Visual representation of linear equations', 2, 35, 70),
('lesson-basic-shapes', 'course-geometry-1', 'Basic Geometric Shapes', 'Identify and understand basic shapes', 1, 25, 70);

-- Insert sample users (password is 'password123' hashed)
INSERT INTO users (id, name, email, password_hash, learning_path) VALUES
('user-1', 'Demo Student', 'demo@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'visual'),
('user-2', 'Test User', 'test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'auditory');

-- Insert sample user settings
INSERT INTO user_settings (user_id, font_size, line_spacing, background_color) VALUES
('user-1', 18, 1.8, 'cream'),
('user-2', 16, 1.5, 'light-blue');

-- Insert sample enrollments
INSERT INTO user_enrollments (user_id, course_id, status, progress_percentage) VALUES
('user-1', 'course-algebra-1', 'in_progress', 45.50),
('user-2', 'course-geometry-1', 'enrolled', 0.00);

-- ========================================
-- Indexes for Performance
-- ========================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_learning_path ON users(learning_path);
CREATE INDEX idx_lessons_course_order ON lessons(course_id, lesson_order);
CREATE INDEX idx_quiz_attempts_user_lesson ON quiz_attempts(user_id, lesson_id);
CREATE INDEX idx_learning_analytics_user_timestamp ON learning_analytics(user_id, timestamp);