var db = require('../models');
var User = db.User;
var bcrypt = require('bcryptjs');

const userController = {
  // Get user profile
  getProfile: async (req, res) => {
    try {
      var authUser = req.user;
      if (!authUser || !authUser.id) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      var user = await User.findByPk(authUser.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      var baseUrl = process.env.APP_BASE_URL || (req && req.protocol && req.get ? (req.protocol + '://' + req.get('host')) : ('http://localhost:' + (process.env.PORT || 5000)));
      var avatarUrl = '';
      if (user.avatar_url) {
        if (user.avatar_url.indexOf('http://') === 0 || user.avatar_url.indexOf('https://') === 0) {
          avatarUrl = user.avatar_url;
        } else if (user.avatar_url.charAt(0) === '/') {
          avatarUrl = baseUrl + user.avatar_url;
        } else {
          avatarUrl = baseUrl + '/uploads/avatars/' + user.avatar_url;
        }
      }

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          phone: user.phone || '',
          avatar_url: avatarUrl
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get profile',
        error: error.message
      });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      var authUser = req.user;
      if (!authUser || !authUser.id) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      var body = req.body || {};
      var full_name = body.full_name;
      var phone = body.phone;

      if (!full_name) {
        return res.status(400).json({
          success: false,
          message: 'Full name is required'
        });
      }

      var user = await User.findByPk(authUser.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      user.full_name = full_name;
      if (typeof phone === 'string') {
        user.phone = phone;
      }

      await user.save();

      var baseUrl2 = process.env.APP_BASE_URL || (req && req.protocol && req.get ? (req.protocol + '://' + req.get('host')) : ('http://localhost:' + (process.env.PORT || 5000)));
      var avatarUrl2 = '';
      if (user.avatar_url) {
        if (user.avatar_url.indexOf('http://') === 0 || user.avatar_url.indexOf('https://') === 0) {
          avatarUrl2 = user.avatar_url;
        } else if (user.avatar_url.charAt(0) === '/') {
          avatarUrl2 = baseUrl2 + user.avatar_url;
        } else {
          avatarUrl2 = baseUrl2 + '/uploads/avatars/' + user.avatar_url;
        }
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          phone: user.phone || '',
          avatar_url: avatarUrl2
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update profile',
        error: error.message
      });
    }
  },

  // Get user dashboard
  getDashboard: async (req, res) => {
    try {
      // TODO: Get user statistics
      // TODO: Get recent shipments
      // TODO: Get notifications
      
      res.status(200).json({
        success: true,
        data: {
          stats: {
            totalShipments: 15,
            activeShipments: 3,
            completedShipments: 12,
            totalSpent: 1250.50
          },
          recentShipments: [
            {
              id: 'ship-1',
              trackingNumber: 'ST123456789',
              status: 'In Transit',
              destination: 'Los Angeles, CA',
              estimatedDelivery: '2024-01-15'
            }
          ],
          notifications: [
            {
              id: 'notif-1',
              message: 'Your shipment ST123456789 has been delivered',
              type: 'delivery',
              read: false,
              createdAt: new Date().toISOString()
            }
          ]
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get dashboard data',
        error: error.message
      });
    }
  },

  // Get user settings
  getSettings: async (req, res) => {
    try {
      // TODO: Get user settings from database
      
      res.status(200).json({
        success: true,
        data: {
          notifications: {
            email: true,
            sms: false,
            push: true
          },
          privacy: {
            profileVisibility: 'private',
            dataSharing: false
          },
          preferences: {
            currency: 'USD',
            language: 'en',
            timezone: 'America/New_York'
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get settings',
        error: error.message
      });
    }
  },

  // Update user settings
  updateSettings: async (req, res) => {
    try {
      const { notifications, privacy, preferences } = req.body;
      
      // TODO: Validate input
      // TODO: Update settings in database
      
      res.status(200).json({
        success: true,
        message: 'Settings updated successfully',
        data: {
          notifications,
          privacy,
          preferences
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update settings',
        error: error.message
      });
    }
  },

  // Update profile photo (upload handled by multer)
  updateProfilePhoto: async (req, res) => {
    try {
      var authUser = req.user;
      if (!authUser || !authUser.id) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      var filePath = '/uploads/avatars/' + req.file.filename;

      var user = await User.findByPk(authUser.id);
      if (user) {
        user.avatar_url = filePath;
        await user.save();
      }

      var baseUrl3 = process.env.APP_BASE_URL || (req && req.protocol && req.get ? (req.protocol + '://' + req.get('host')) : ('http://localhost:' + (process.env.PORT || 5000)));
      var fullUrl = baseUrl3 + filePath;

      res.status(200).json({
        success: true,
        message: 'Profile photo updated successfully',
        data: {
          avatarUrl: fullUrl
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update profile photo',
        error: error.message
      });
    }
  },

  // Change password
  changePassword: async (req, res) => {
    try {
      var authUser = req.user;
      if (!authUser || !authUser.id) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      var body = req.body || {};
      var currentPassword = body.currentPassword;
      var newPassword = body.newPassword;
      var confirmPassword = body.confirmPassword;

      if (!currentPassword) {
        return res.status(400).json({ success: false, message: 'Current password is required' });
      }

      if (!newPassword) {
        return res.status(400).json({ success: false, message: 'New password is required' });
      }

      if (!confirmPassword) {
        return res.status(400).json({ success: false, message: 'Please confirm your new password' });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'New passwords do not match' });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
      }

      var user = await User.findByPk(authUser.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      var isMatch = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect' });
      }

      var newHash = await bcrypt.hash(newPassword, 10);
      user.password_hash = newHash;
      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Password updated successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update password',
        error: error.message
      });
    }
  },

  // Delete user account
  deleteAccount: async (req, res) => {
    try {
      // TODO: Verify user identity
      // TODO: Delete user data
      // TODO: Cancel active shipments
      
      res.status(200).json({
        success: true,
        message: 'Account deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete account',
        error: error.message
      });
    }
  }
};

module.exports = userController;



