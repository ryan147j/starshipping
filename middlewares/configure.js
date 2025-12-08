const express = require('express');

// Import all middleware functions
const {
  securityMiddleware,
  corsMiddleware,
  loggingMiddleware,
  bodyParserMiddleware,
  urlEncodedMiddleware,
  errorHandler,
  notFoundHandler
} = require('./');

// Configure and apply core middlewares
const configureMiddlewares = function (app) {
  // Security & CORS
  app.use(securityMiddleware);
  app.use(corsMiddleware);
  app.use(loggingMiddleware);

  // Body parsing
  app.use(bodyParserMiddleware);
  app.use(urlEncodedMiddleware);
};

module.exports = configureMiddlewares;



