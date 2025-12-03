const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');

// Auth routes
// Signup (real implementation)
router.post('/signup', authController.signup);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;



