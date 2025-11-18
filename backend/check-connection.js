// Quick script to test MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/companies_directory';

console.log('Testing MongoDB connection...');
console.log('Connection string:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
})
.then(async () => {
  console.log('✅ Connection successful!');
  console.log('Database:', mongoose.connection.db.databaseName);
  
  // Try a simple query
  const Company = require('./models/Company');
  const count = await Company.countDocuments();
  console.log(`✅ Found ${count} companies in database`);
  
  if (count === 0) {
    console.log('⚠️  Database is empty. Run: npm run seed');
  }
  
  await mongoose.connection.close();
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Connection failed!');
  console.error('Error:', err.message);
  console.error('\nTroubleshooting:');
  console.error('1. Check your MONGODB_URI in .env file');
  console.error('2. For MongoDB Atlas:');
  console.error('   - Add your IP to whitelist (or use 0.0.0.0/0 for all)');
  console.error('   - Verify username/password');
  console.error('   - Make sure database name is in connection string');
  console.error('3. For local MongoDB:');
  console.error('   - Make sure MongoDB is running');
  console.error('   - Check if port 27017 is accessible');
  process.exit(1);
});

