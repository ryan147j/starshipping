const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');
const userController = require('../controllers/userController');

// Ensure upload directory exists
var avatarsDir = path.join(__dirname, '..', 'uploads', 'avatars');
if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });

var storage = multer.diskStorage({
  destination: function(req, file, cb) { cb(null, avatarsDir); },
  filename: function(req, file, cb) {
    var ext = path.extname(file.originalname || '');
    var name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  }
});

var upload = multer({ storage: storage });

// Public route to check users
router.get('/', function(req, res) {
  res.json({ message: 'Users route is working!' });
});

// User routes (protected)
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.post('/profile/photo', authenticateToken, upload.single('photo'), userController.updateProfilePhoto);
router.get('/dashboard', authenticateToken, userController.getDashboard);
router.get('/settings', authenticateToken, userController.getSettings);
router.put('/settings', authenticateToken, userController.updateSettings);
router.put('/password', authenticateToken, userController.changePassword);
router.delete('/account', authenticateToken, userController.deleteAccount);

router.get('/test', function(req, res) {
  return res.json({ success: true, message: 'Users route working!' });
});

module.exports = router;
