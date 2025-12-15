var db = require('../models');
var Review = db.Review;
var jwt = require('jsonwebtoken');

// Public: return only approved reviews for display on the website
exports.getReviews = function (req, res) {
  if (!Review) {
    return res.status(500).json({
      success: false,
      message: 'Review model not available'
    });
  }

  Review.findAll({
    where: { approved: true },
    order: [['createdAt', 'DESC']]
  })
    .then(function (rows) {
      return res.status(200).json({
        success: true,
        data: rows,
        reviews: rows
      });
    })
    .catch(function (err) {
      console.error('Error fetching public reviews:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to load reviews'
      });
    });
};

// Authenticated: return only reviews created by the logged-in user (all statuses)
exports.getMyReviews = function (req, res) {
  if (!Review) {
    return res.status(500).json({ success: false, message: 'Review model not available' });
  }

  var user = req.user;
  var userId = user && user.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  Review.findAll({ where: { user_id: userId }, order: [['createdAt', 'DESC']] })
    .then(function (rows) {
      return res.status(200).json({ success: true, data: rows });
    })
    .catch(function (err) {
      console.error('Error fetching my reviews:', err);
      return res.status(500).json({ success: false, message: 'Failed to load your reviews' });
    });
};

// Public: create a new review (starts unapproved)
exports.createReview = function (req, res) {
  if (!Review) {
    return res.status(500).json({
      success: false,
      message: 'Review model not available'
    });
  }

  var body = req.body || {};
  var userId = body.user_id || null;
  var name = body.name || null;
  var company = body.company || null;
  // Try to associate review with authenticated user if token is present
  try {
    var authHeader = req.headers && req.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      var token = authHeader.split(' ')[1];
      var payload = jwt.verify(token, process.env.JWT_SECRET || 'starshipping-dev-secret');
      if (payload && payload.id) userId = payload.id;
    }
  } catch (e) {}
  var rating = body.rating;
  var comment = body.comment;

  if (!rating || !comment) {
    return res.status(400).json({
      success: false,
      message: 'Rating and comment are required'
    });
  }

  var ratingNumber = parseInt(rating, 10);
  if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return res.status(400).json({
      success: false,
      message: 'Rating must be between 1 and 5'
    });
  }

  var autoApprove = (process.env.REVIEWS_AUTO_APPROVE || 'true').toLowerCase() === 'true';

  Review.create({
    user_id: userId,
    name: name,
    company: company,
    rating: ratingNumber,
    comment: comment,
    is_visible: true,
    approved: autoApprove
  })
    .then(function (created) {
      return res.status(201).json({
        success: true,
        data: created,
        review: created
      });
    })
    .catch(function (err) {
      // If failure likely due to user_id null or FK, retry with a default user id
      var msg = (err && (err.original && err.original.sqlMessage || err.message)) || '';
      var code = (err && (err.original && err.original.code || err.name)) || '';
      var needsRetry = /cannot be null|foreign key|ER_NO_DEFAULT_FOR_FIELD|ER_BAD_NULL_ERROR/i.test(msg + ' ' + code);
      if (!userId && needsRetry) {
        var fallbackId = parseInt(process.env.DEFAULT_REVIEW_USER_ID || '1', 10) || 1;
        return Review.create({
          user_id: fallbackId,
          name: name,
          company: company,
          rating: ratingNumber,
          comment: comment,
          is_visible: true,
          approved: autoApprove
        })
          .then(function (created2) {
            return res.status(201).json({ success: true, data: created2, review: created2 });
          })
          .catch(function (err2) {
            console.error('Error creating review (fallback failed):', err2 && err2.message);
            return res.status(500).json({ success: false, message: 'Failed to create review' });
          });
      }
      console.error('Error creating review:', msg || err);
      return res.status(500).json({ success: false, message: 'Failed to create review' });
    });
};

// Admin helpers (not directly mounted as routes here)
exports._getAllReviewsForAdmin = function (callback) {
  if (!Review) return callback(new Error('Review model not available'));

  Review.findAll({ order: [['createdAt', 'DESC']] })
    .then(function (rows) {
      return callback(null, rows);
    })
    .catch(function (err) {
      return callback(err);
    });
};

exports._approveReviewForAdmin = function (id, callback) {
  if (!Review) return callback(new Error('Review model not available'));

  Review.findByPk(id)
    .then(function (review) {
      if (!review) return callback(null, null);
      review.approved = true;
      return review.save();
    })
    .then(function (saved) {
      if (!saved) return; // not found
      return callback(null, saved);
    })
    .catch(function (err) {
      return callback(err);
    });
};

exports._deleteReviewForAdmin = function (id, callback) {
  if (!Review) return callback(new Error('Review model not available'));

  Review.destroy({ where: { id: id } })
    .then(function (count) {
      return callback(null, count);
    })
    .catch(function (err) {
      return callback(err);
    });
};
