// ==========================================================================
// server.js - Main entry point for the Backend Express Server
// ==========================================================================

require('dotenv').config(); // Load environment variables from .env file first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const logger = require('./utils/logger'); // Uncomment when logger is implemented
// const errorHandler = require('./middleware/error-handler'); // Uncomment when error handler is implemented
const leadRoutes = require('./routes/leadRoutes'); // Import lead routes
// const userRoutes = require('./routes/userRoutes'); // Uncomment when ready
// const videoInteractionRoutes = require('./routes/videoInteractionRoutes'); // Uncomment when ready

// --- Constants ---
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

// --- Database Connection ---
if (!DATABASE_URL) {
  console.error("FATAL ERROR: DATABASE_URL is not defined in the environment variables.");
  process.exit(1); // Exit if DB URL is missing
}

mongoose.connect(DATABASE_URL, {
  // useNewUrlParser: true, // Deprecated but good practice to be aware of
  // useUnifiedTopology: true, // Deprecated
  // useCreateIndex: true, // Deprecated
  // useFindAndModify: false // Deprecated
  // Mongoose 6+ handles these automatically
})
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit on connection failure
});

mongoose.connection.on('error', err => {
  console.error('MongoDB runtime error:', err);
  // Consider adding more robust error handling/reconnection logic here
});

// --- Express App Setup ---
const app = express();

// --- Core Middleware ---
// Enable CORS - configure origins properly for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'YOUR_FRONTEND_DOMAIN' : '*', // Allow all in dev
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need cookies/sessions
}));

// Parse JSON request bodies
app.use(express.json({ limit: '10mb' })); // Limit payload size

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic Request Logging (Replace with Winston later)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  // logger.info(`${req.method} ${req.originalUrl}`, { ip: req.ip }); // Use Winston later
  next();
});

// --- API Routes ---
// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Backend server is running.',
    timestamp: new Date().toISOString(),
    db_status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Mount API routes
app.use('/api/leads', leadRoutes);
// app.use('/api/users', userRoutes); // Uncomment when ready
// app.use('/api/video-interactions', videoInteractionRoutes); // Uncomment when ready

// --- Error Handling Middleware ---
// Basic 404 Handler for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: { message: 'Not Found' } });
});

// Global Error Handler (Replace with dedicated middleware later)
app.use((err, req, res, next) => {
  console.error("Global Error Handler Caught:", err.stack);
  // logger.error(err.message, { stack: err.stack }); // Use Winston later
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_SERVER_ERROR',
      // Optionally include stack in development
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    }
  });
  // errorHandler(err, req, res, next); // Use dedicated handler later
});


// --- Start Server ---
const server = app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// --- Graceful Shutdown ---
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});