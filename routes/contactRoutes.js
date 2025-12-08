const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

// POST /api/contact/messages - store message and send email
router.post('/messages', contactController.createMessage);

// Safe test route
router.get('/test', function (req, res) {
  return res.json({ success: true, message: 'contact routes work' });
});

module.exports = router;
