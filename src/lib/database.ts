import mysql from 'mysql2/promise';

// Database configuration from environment variables
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dyslexia_learning',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    multipleStatements: true
};

// Create connection pool
let pool: mysql.Pool | null = null;

export const getPool = (): mysql.Pool => {
    if (!pool) {
        pool = mysql.createPool(dbConfig);
    }
    return pool;
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
    try {
        const connection = await getPool().getConnection();
        await connection.ping();
        connection.release();
        console.log('✅ Database connection successful');
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
};

// Execute a single query
export const executeQuery = async (
    query: string, 
    params?: any[]
): Promise<any> => {
    try {
        const connection = await getPool().getConnection();
        const [results] = await connection.execute(query, params);
        connection.release();
        return results;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

// Execute multiple queries (for transactions)
export const executeTransaction = async (
    queries: { query: string; params?: any[] }[]
): Promise<any[]> => {
    const connection = await getPool().getConnection();
    
    try {
        await connection.beginTransaction();
        
        const results = [];
        for (const { query, params } of queries) {
            const [result] = await connection.execute(query, params);
            results.push(result);
        }
        
        await connection.commit();
        connection.release();
        return results;
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error('Transaction error:', error);
        throw error;
    }
};

// Initialize database (create tables if they don't exist)
export const initializeDatabase = async (): Promise<void> => {
    try {
        // First, create the database if it doesn't exist
        const tempPool = mysql.createPool({
            ...dbConfig,
            database: undefined // Don't specify database initially
        });
        
        const tempConnection = await tempPool.getConnection();
        await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        tempConnection.release();
        await tempPool.end();
        
        // Now connect to the created database and test
        const connected = await testConnection();
        if (connected) {
            console.log('✅ Database initialized successfully');
        } else {
            throw new Error('Failed to connect to database after creation');
        }
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
};

// Close all connections
export const closeConnections = async (): Promise<void> => {
    if (pool) {
        await pool.end();
        pool = null;
        console.log('Database connections closed');
    }
};

// Utility functions for common database operations
export const dbUtils = {
    // Check if a table exists
    tableExists: async (tableName: string): Promise<boolean> => {
        try {
            const result = await executeQuery(
                'SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?',
                [dbConfig.database, tableName]
            );
            return result[0].count > 0;
        } catch (error) {
            return false;
        }
    },

    // Get table row count
    getRowCount: async (tableName: string): Promise<number> => {
        try {
            const result = await executeQuery(`SELECT COUNT(*) as count FROM ${tableName}`);
            return result[0].count;
        } catch (error) {
            return 0;
        }
    },

    // Check if database has sample data
    hasSampleData: async (): Promise<boolean> => {
        try {
            const userCount = await dbUtils.getRowCount('users');
            const courseCount = await dbUtils.getRowCount('courses');
            return userCount > 0 && courseCount > 0;
        } catch (error) {
            return false;
        }
    }
};

export default {
    getPool,
    testConnection,
    executeQuery,
    executeTransaction,
    initializeDatabase,
    closeConnections,
    dbUtils
};