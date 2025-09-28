// SQLite database connection test
import { testSQLiteConnection, initializeSQLiteDatabase, sqliteUtils } from '../lib/sqliteDatabase';

async function testSQLiteDatabaseConnection() {
    console.log('🔍 Testing SQLite database connection...');
    
    try {
        // Test basic connection
        const connected = testSQLiteConnection();
        
        if (connected) {
            console.log('✅ SQLite database connection successful!');
            
            // Initialize database with schema and sample data
            console.log('📋 Initializing database schema...');
            initializeSQLiteDatabase();
            
            // Display database statistics
            console.log('\n📊 Database Statistics:');
            const userCount = sqliteUtils.getRowCount('users');
            const courseCount = sqliteUtils.getRowCount('courses');
            const lessonCount = sqliteUtils.getRowCount('lessons');
            
            console.log(`   👥 Users: ${userCount}`);
            console.log(`   📚 Courses: ${courseCount}`);
            console.log(`   📖 Lessons: ${lessonCount}`);
            
            console.log('\n🎉 SQLite database setup completed successfully!');
            console.log('\n📋 Next steps:');
            console.log('   1. Your database file is located at: database/dyslexia_learning.db');
            console.log('   2. Install SQLite Browser to view data: https://sqlitebrowser.org/');
            console.log('   3. Or install SQLTools extension in VS Code with SQLite driver');
            console.log('   4. Run your React app to test database integration');
            
            // Sample data info
            console.log('\n📝 Sample Data Available:');
            console.log('   • Demo users: demo@example.com, test@example.com');
            console.log('   • Sample courses: Algebra Fundamentals, Visual Geometry');
            console.log('   • Password for demo accounts: password123');
            
        } else {
            console.log('❌ SQLite database connection failed');
        }
        
    } catch (error) {
        console.error('❌ Connection error:', error);
        console.log('\n📋 Troubleshooting:');
        console.log('   • Check if the database directory exists');
        console.log('   • Ensure write permissions for the database folder');
        console.log('   • Try running with administrator privileges');
    }
}

// Run the test
testSQLiteDatabaseConnection();