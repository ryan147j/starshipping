const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');

// Legacy route that stores messages + email (optional)
router.post('/messages', chatController.createMessage);

// Live AI answer via OpenRouter
router.post('/ask', chatController.ask);

module.exports = router;
