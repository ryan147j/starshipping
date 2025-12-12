const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Security middleware
const securityMiddleware = helmet();

// CORS middleware
const allowedOrigins = [
  'https://starshipping-5511.vercel.app',
  'https://starshipping.vercel.app',
  'https://starshipping.com.tn',
  'https://www.starshipping.com.tn'
].filter(Boolean);

const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server/Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Allow Vercel and Netlify preview URLs
    try {
      const hostname = new URL(origin).hostname;
      if (hostname.endsWith('.vercel.app') || hostname.endsWith('.netlify.app')) {
        return callback(null, true);
      }
    } catch (e) {}

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
