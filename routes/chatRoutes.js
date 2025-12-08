const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');

// Legacy route that stores messages + email (optional)
router.post('/messages', chatController.createMessage);

// Live AI answer via OpenRouter
router.post('/ask', chatController.ask);

// Safe test route
router.get('/test', function (req, res) {
  return res.json({ success: true, message: 'chat routes work' });
});

module.exports = router;
