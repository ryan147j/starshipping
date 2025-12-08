// Authentication middleware
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  const secret = process.env.JWT_SECRET || 'starshipping-dev-secret';

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// Role-based authorization middleware
const authorize = function () {
  var roles = Array.prototype.slice.call(arguments);
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    if (roles.indexOf(req.user.role) === -1) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    
    next();
  };
};

// Rate limiting middleware (basic implementation)
const rateLimiter = (req, res, next) => {
  // TODO: Implement proper rate limiting with Redis or memory store
  // For now, just pass through
  next();
};

// Convenience wrappers matching project naming
function requireAuth(req, res, next) {
  return authenticateToken(req, res, next);
}

function requireAdmin(req, res, next) {
  // Assumes requireAuth has already run and set req.user
  if (!req.user) {
    return res.status(401).json({
      message: 'Access token required'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Access denied'
    });
  }

  return next();
}

module.exports = {
  authenticateToken: authenticateToken,
  authorize: authorize,
  rateLimiter: rateLimiter,
  requireAuth: requireAuth,
  requireAdmin: requireAdmin
};



