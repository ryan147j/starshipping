const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');

// Ensure upload directory exists
var avatarsDir = path.join(__dirname, '..', 'uploads', 'avatars');
if (!fs.existsSync(avatarsDir)) {
  try {
    fs.mkdirSync(avatarsDir, { recursive: true });
  } catch (e) {}
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarsDir);
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname || '');
    var name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  }
});

var upload = multer({ storage: storage });

// Import controllers
const userController = require('../controllers/userController');

// User routes
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.post('/profile/photo', authenticateToken, upload.single('photo'), userController.updateProfilePhoto);
router.get('/dashboard', authenticateToken, userController.getDashboard);
router.get('/settings', authenticateToken, userController.getSettings);
router.put('/settings', authenticateToken, userController.updateSettings);
router.put('/password', authenticateToken, userController.changePassword);
router.delete('/account', authenticateToken, userController.deleteAccount);

module.exports = router;



