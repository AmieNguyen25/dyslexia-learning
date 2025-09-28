import { executeQuery, executeTransaction } from '../lib/database';

export interface User {
    id: string;
    name: string;
    email: string;
    learning_path: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    preferences?: any;
    created_at?: Date;
    updated_at?: Date;
    last_login?: Date;
    is_active?: boolean;
}

export interface UserSettings {
    id?: number;
    user_id: string;
    font_size: number;
    line_spacing: number;
    character_spacing: number;
    background_color: string;
    text_color: string;
    reading_speed: number;
    preferred_voice: string;
}

export class UserService {
    
    // Get user by ID
    static async getUserById(userId: string): Promise<User | null> {
        try {
            const result = await executeQuery(
                'SELECT * FROM users WHERE id = ? AND is_active = TRUE',
                [userId]
            );
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }

    // Get user by email
    static async getUserByEmail(email: string): Promise<User | null> {
        try {
            const result = await executeQuery(
                'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
                [email]
            );
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    }

    // Create new user
    static async createUser(userData: Omit<User, 'created_at' | 'updated_at'>): Promise<User> {
        try {
            await executeQuery(
                `INSERT INTO users (id, name, email, password_hash, learning_path, preferences, is_active) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    userData.id,
                    userData.name,
                    userData.email,
                    '', // password_hash should be handled separately
                    userData.learning_path,
                    JSON.stringify(userData.preferences || {}),
                    true
                ]
            );

            // Return the created user
            const createdUser = await this.getUserById(userData.id);
            if (!createdUser) {
                throw new Error('Failed to create user');
            }
            return createdUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Update user
    static async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
        try {
            const setClause = [];
            const values = [];

            if (updates.name) {
                setClause.push('name = ?');
                values.push(updates.name);
            }
            if (updates.learning_path) {
                setClause.push('learning_path = ?');
                values.push(updates.learning_path);
            }
            if (updates.preferences) {
                setClause.push('preferences = ?');
                values.push(JSON.stringify(updates.preferences));
            }
            if (updates.last_login) {
                setClause.push('last_login = ?');
                values.push(updates.last_login);
            }

            if (setClause.length === 0) {
                return await this.getUserById(userId);
            }

            values.push(userId);

            await executeQuery(
                `UPDATE users SET ${setClause.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                values
            );

            return await this.getUserById(userId);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    // Get user settings
    static async getUserSettings(userId: string): Promise<UserSettings | null> {
        try {
            const result = await executeQuery(
                'SELECT * FROM user_settings WHERE user_id = ?',
                [userId]
            );
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error fetching user settings:', error);
            throw error;
        }
    }

    // Create or update user settings
    static async saveUserSettings(settings: UserSettings): Promise<UserSettings> {
        try {
            await executeQuery(
                `INSERT INTO user_settings 
                 (user_id, font_size, line_spacing, character_spacing, background_color, text_color, reading_speed, preferred_voice) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 font_size = VALUES(font_size),
                 line_spacing = VALUES(line_spacing),
                 character_spacing = VALUES(character_spacing),
                 background_color = VALUES(background_color),
                 text_color = VALUES(text_color),
                 reading_speed = VALUES(reading_speed),
                 preferred_voice = VALUES(preferred_voice),
                 updated_at = CURRENT_TIMESTAMP`,
                [
                    settings.user_id,
                    settings.font_size,
                    settings.line_spacing,
                    settings.character_spacing,
                    settings.background_color,
                    settings.text_color,
                    settings.reading_speed,
                    settings.preferred_voice
                ]
            );

            const updatedSettings = await this.getUserSettings(settings.user_id);
            if (!updatedSettings) {
                throw new Error('Failed to save user settings');
            }
            return updatedSettings;
        } catch (error) {
            console.error('Error saving user settings:', error);
            throw error;
        }
    }

    // Delete user (soft delete)
    static async deleteUser(userId: string): Promise<boolean> {
        try {
            await executeQuery(
                'UPDATE users SET is_active = FALSE WHERE id = ?',
                [userId]
            );
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    // Get all users (admin function)
    static async getAllUsers(limit: number = 50, offset: number = 0): Promise<User[]> {
        try {
            const result = await executeQuery(
                'SELECT * FROM users WHERE is_active = TRUE ORDER BY created_at DESC LIMIT ? OFFSET ?',
                [limit, offset]
            );
            return result;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    }

    // Get user statistics
    static async getUserStats(userId: string): Promise<any> {
        try {
            const [enrollments, completedCourses, totalQuizzes] = await Promise.all([
                executeQuery('SELECT COUNT(*) as count FROM user_enrollments WHERE user_id = ?', [userId]),
                executeQuery('SELECT COUNT(*) as count FROM user_enrollments WHERE user_id = ? AND status = "completed"', [userId]),
                executeQuery('SELECT COUNT(*) as count FROM quiz_attempts WHERE user_id = ?', [userId])
            ]);

            return {
                total_enrollments: enrollments[0].count,
                completed_courses: completedCourses[0].count,
                total_quiz_attempts: totalQuizzes[0].count
            };
        } catch (error) {
            console.error('Error fetching user stats:', error);
            throw error;
        }
    }
}