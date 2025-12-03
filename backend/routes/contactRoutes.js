const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

// POST /api/contact/messages - store message and send email
router.post('/messages', contactController.createMessage);

module.exports = router;
