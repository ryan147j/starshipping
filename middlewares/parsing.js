const express = require('express');

// Body parsing middleware
const bodyParserMiddleware = express.json({ limit: '10mb' });
const urlEncodedMiddleware = express.urlencoded({ extended: true, limit: '10mb' });

// Request validation middleware
const validateRequest = (req, res, next) => {
  // Basic request validation
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required'
      });
    }
  }
  next();
};

// Content type middleware
const contentTypeMiddleware = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    if (!req.is('application/json')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type must be application/json'
      });
    }
  }
  next();
};

module.exports = {
  bodyParserMiddleware,
  urlEncodedMiddleware,
  validateRequest,
  contentTypeMiddleware
};



