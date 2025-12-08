// Export all middleware functions
const { securityMiddleware, corsMiddleware, loggingMiddleware } = require('./security');
const { bodyParserMiddleware, urlEncodedMiddleware, validateRequest, contentTypeMiddleware } = require('./parsing');
const { errorHandler, notFoundHandler, asyncHandler } = require('./errorHandler');
const { authenticateToken, authorize, rateLimiter } = require('./auth');

module.exports = {
  // Security middlewares
  securityMiddleware,
  corsMiddleware,
  loggingMiddleware,
  
  // Parsing middlewares
  bodyParserMiddleware,
  urlEncodedMiddleware,
  validateRequest,
  contentTypeMiddleware,
  
  // Error handling middlewares
  errorHandler,
  notFoundHandler,
  asyncHandler,
  
  // Authentication middlewares
  authenticateToken,
  authorize,
  rateLimiter
};



