// Simple database connection test
import { testConnection, initializeDatabase } from '../lib/database';

async function testDatabaseConnection() {
    console.log('🔍 Testing database connection...');
    
    try {
        // Test basic connection
        const connected = await testConnection();
        
        if (connected) {
            console.log('✅ Database connection successful!');
            
            // Initialize database if needed
            await initializeDatabase();
            console.log('✅ Database initialization complete!');
            
        } else {
            console.log('❌ Database connection failed');
            console.log('📋 Troubleshooting steps:');
            console.log('   1. Make sure MySQL is running');
            console.log('   2. Check your credentials in .env.local');
            console.log('   3. Verify port 3306 is available');
        }
        
    } catch (error) {
        console.error('❌ Connection error:', error);
        console.log('\n📋 Common solutions:');
        console.log('   • Install MySQL server locally');
        console.log('   • Start MySQL service');
        console.log('   • Update credentials in .env.local file');
    }
}

// Run the test
testDatabaseConnection();