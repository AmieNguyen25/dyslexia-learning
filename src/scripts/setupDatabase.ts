import fs from 'fs/promises';
import path from 'path';
import { initializeDatabase, executeQuery, dbUtils } from '../lib/database';

// Setup and initialize the database
async function setupDatabase() {
    console.log('🚀 Starting database setup...');

    try {
        // Step 1: Initialize database connection
        console.log('📦 Initializing database connection...');
        await initializeDatabase();

        // Step 2: Check if we need to run schema
        console.log('🔍 Checking database schema...');
        const tablesExist = await dbUtils.tableExists('users');
        
        if (!tablesExist) {
            console.log('📋 Creating database tables...');
            
            // Read and execute schema file
            const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
            const schemaSQL = await fs.readFile(schemaPath, 'utf-8');
            
            // Split SQL into individual statements
            const statements = schemaSQL
                .split(';')
                .map(stmt => stmt.trim())
                .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

            // Execute each statement
            for (const statement of statements) {
                try {
                    await executeQuery(statement);
                } catch (error: any) {
                    // Ignore "table already exists" errors
                    if (!error.message.includes('already exists')) {
                        console.warn('Warning executing statement:', error.message);
                    }
                }
            }

            console.log('✅ Database schema created successfully');
        } else {
            console.log('✅ Database schema already exists');
        }

        // Step 3: Check sample data
        console.log('📊 Checking sample data...');
        const hasSampleData = await dbUtils.hasSampleData();
        
        if (!hasSampleData) {
            console.log('📝 Sample data already included in schema');
        } else {
            console.log('✅ Sample data exists');
        }

        // Step 4: Display database info
        console.log('\n📈 Database Statistics:');
        const userCount = await dbUtils.getRowCount('users');
        const courseCount = await dbUtils.getRowCount('courses');
        const lessonCount = await dbUtils.getRowCount('lessons');
        
        console.log(`   👥 Users: ${userCount}`);
        console.log(`   📚 Courses: ${courseCount}`);
        console.log(`   📖 Lessons: ${lessonCount}`);

        console.log('\n🎉 Database setup completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('   1. Install SQLTools extension in VS Code');
        console.log('   2. Create a MySQL connection using these settings:');
        console.log('      - Host: localhost');
        console.log('      - Port: 3306');
        console.log('      - Database: dyslexia_learning');
        console.log('      - Username: root');
        console.log('      - Password: password');
        console.log('   3. Run your React app to test database integration');

    } catch (error) {
        console.error('❌ Database setup failed:', error);
        throw error;
    }
}

// Export for use in other files
export { setupDatabase };

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase()
        .then(() => {
            console.log('Database setup script completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Setup failed:', error);
            process.exit(1);
        });
}