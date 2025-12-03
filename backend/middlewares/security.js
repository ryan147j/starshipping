const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Security middleware
const securityMiddleware = helmet();

// CORS middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://localhost:3000',
  'https://localhost:5173',
  'http://localhost:5174',
  'https://localhost:5174',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsMiddleware = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
});

// Logging middleware
const loggingMiddleware = morgan('combined');

module.exports = {
  securityMiddleware,
  corsMiddleware,
  loggingMiddleware
};



