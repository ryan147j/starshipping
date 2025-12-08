const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var db = require('../models');
var User = db.User;

const authController = {
  // Signup: real implementation that saves to database
  signup: function (req, res) {
    try {
      var body = req.body || {};

      var full_name = (body.full_name || '').toString().trim();
      var email = (body.email || '').toString().trim().toLowerCase();
      try { console.log('[signup] email:', email); } catch (e) {}
      var rawPhone = (body.phone || '').toString();
      // Keep persisted phone in E.164-like digits only for validation/storage
      var phone = rawPhone.replace(/\D/g, '');
      var password = body.password;
      var confirmPassword = body.confirmPassword;

    // Manual validation
    if (!full_name) {
      return res.status(400).json({ success: false, message: 'Full name is required' });
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone is required' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    if (!confirmPassword) {
      return res.status(400).json({ success: false, message: 'Confirm password is required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    var phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone must be 8–15 digits' });
    }

    // Check if email already exists
    User.findOne({ where: { email: email } })
      .then(function (existingUser) {
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: 'Email already in use'
          });
        }

        // Hash password
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({
              success: false,
              message: 'An error occurred while securing the password'
            });
          }

          // Create user in database (using password_hash field)
          User.create({
            full_name: full_name,
            email: email,
            phone: phone,
            password_hash: hash,
            role: 'client'
          })
            .then(function (user) {
              var payload = { id: user.id, email: user.email, role: user.role };
              var secret = process.env.JWT_SECRET || 'starshipping-dev-secret';
              var token = jwt.sign(payload, secret, { expiresIn: '7d' });

              return res.status(201).json({
                success: true,
                message: 'Account created successfully',
                data: {
                  token: token,
                  user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role
                  }
                }
              });
            })
            .catch(function (createErr) {
              // Handle unique constraint error (race condition on email)
              if (createErr && (createErr.name === 'SequelizeUniqueConstraintError' || createErr.original && createErr.original.code === 'ER_DUP_ENTRY')) {
                return res.status(409).json({ success: false, message: 'Email already in use' });
              }
              console.error('Error creating user:', createErr);
              return res.status(500).json({
                success: false,
                message: 'An error occurred while creating the account'
              });
            });
        });
      })
      .catch(function (err) {
        console.error('Error checking existing user:', err);
        return res.status(500).json({
          success: false,
          message: 'An error occurred while checking the account'
        });
      });
    } catch (outerErr) {
      console.error('Signup unexpected error:', outerErr);
      return res.status(500).json({ success: false, message: 'Internal error during signup' });
    }
  },

  // Register new user (placeholder/demo)
  register: async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      // TODO: Add validation
      // TODO: Check if user already exists
      // TODO: Hash password
      // TODO: Save user to database
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          email,
          firstName,
          lastName
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const email = req.body && req.body.email;
      const password = req.body && req.body.password;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const payload = { id: user.id, email: user.email, role: user.role };
      let token = '';
      try {
        token = jwt.sign(payload, process.env.JWT_SECRET || 'starshipping-dev-secret', {
          expiresIn: '7d'
        });
      } catch (e) {
        // If JWT generation fails, still allow login without token for this demo
        token = 'demo-token';
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          token: token,
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  },

  // Logout user
  logout: async (req, res) => {
    try {
      // TODO: Invalidate token
      // TODO: Clear session
      
      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Logout failed',
        error: error.message
      });
    }
  },

  // Forgot password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      
      // TODO: Check if user exists
      // TODO: Generate reset token
      // TODO: Send email with reset link
      
      res.status(200).json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to send reset email',
        error: error.message
      });
    }
  },

  // Reset password
  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      
      // TODO: Validate token
      // TODO: Hash new password
      // TODO: Update user password
      
      res.status(200).json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Password reset failed',
        error: error.message
      });
    }
  },

  // Verify email
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;
      
      // TODO: Validate token
      // TODO: Update user email verification status
      
      res.status(200).json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Email verification failed',
        error: error.message
      });
    }
  }
};

module.exports = authController;



