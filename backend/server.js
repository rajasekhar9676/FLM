const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration - Allow all origins for production
const corsOptions = {
  origin: '*', // Allow all origins (you can restrict this to specific domains in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/companies_directory';

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds
  connectTimeoutMS: 30000, // 30 seconds
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
  console.log('Database:', mongoose.connection.db.databaseName);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('Please check:');
  console.error('1. Your MONGODB_URI in .env file');
  console.error('2. MongoDB Atlas IP whitelist (add 0.0.0.0/0 for all IPs)');
  console.error('3. Database name in connection string');
  console.error('4. Username and password are correct');
  process.exit(1);
});

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

// Root route - Server status
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({
    status: 'OK',
    message: 'Companies Directory API Server is Running',
    version: '1.0.0',
    database: dbStatus,
    endpoints: {
      health: '/api/health',
      companies: '/api/companies',
      filters: '/api/companies/filters'
    },
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/companies', require('./routes/companies'));

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

