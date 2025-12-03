const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const { requireAuth } = require('../middlewares/auth');

router.get('/', reviewController.getReviews);
router.post('/', reviewController.createReview);
router.get('/mine', requireAuth, reviewController.getMyReviews);

module.exports = router;
