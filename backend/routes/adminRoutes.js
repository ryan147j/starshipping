const express = require('express');
const router = express.Router();

var authMiddleware = require('../middlewares/auth');
var requireAuth = authMiddleware.requireAuth;
var requireAdmin = authMiddleware.requireAdmin;
var db = require('../models');
var PublicBooking = db.PublicBooking;
var Review = db.Review;
var User = db.User;
var Booking = db.Booking;

// Admin dashboard - only accessible by admin role
router.get('/dashboard', requireAuth, requireAdmin, function (req, res) {
  if (!PublicBooking) {
    return res.status(500).json({ success: false, message: 'Booking model not available' });
  }

  PublicBooking.findAll({ order: [['createdAt', 'DESC']] })
    .then(function (rows) {
      var pending = [];
      var priced = [];
      var totalRevenue = 0;
      var totalProfit = 0;

      rows.forEach(function (row) {
        var plain = row.toJSON();
        var hasPrice = plain.price !== null && plain.price !== undefined;

        if (!hasPrice) {
          pending.push(plain);
        } else {
          priced.push(plain);

          var priceNumber = parseFloat(plain.price || 0);
          var costNumber = plain.internal_cost !== null && plain.internal_cost !== undefined
            ? parseFloat(plain.internal_cost)
            : 0;
          totalRevenue += priceNumber;
          totalProfit += (priceNumber - costNumber);
        }
      });

      return res.json({
        success: true,
        data: {
          user: req.user,
          stats: {
            totalBookings: rows.length,
            pendingPriceCount: pending.length,
            pricedCount: priced.length,
            totalRevenue: totalRevenue,
            totalProfit: totalProfit
          },
          pendingBookings: pending,
          pricedBookings: priced
        }
      });
    })
    .catch(function (err) {
      console.error('Error loading admin dashboard data:', err);
      return res.status(500).json({ success: false, message: 'Failed to load admin dashboard data' });
    });
});

// Admin: set price for a booking (confidential pricing flow)
router.put('/bookings/:id/set-price', requireAuth, requireAdmin, function (req, res) {
  if (!PublicBooking) {
    return res.status(500).json({ success: false, message: 'Booking model not available' });
  }

  var id = req.params.id;
  var body = req.body || {};
  var price = body.price;
  var internalCost = body.internal_cost;

  if (price === undefined || price === null || price === '') {
    return res.status(400).json({ success: false, message: 'Price is required' });
  }

  var priceNumber = parseFloat(price);
  if (isNaN(priceNumber) || priceNumber < 0) {
    return res.status(400).json({ success: false, message: 'Price must be a non-negative number' });
  }

  var costNumber = null;
  if (internalCost !== undefined && internalCost !== null && internalCost !== '') {
    costNumber = parseFloat(internalCost);
    if (isNaN(costNumber) || costNumber < 0) {
      return res.status(400).json({ success: false, message: 'Cost must be a non-negative number' });
    }
  }

  PublicBooking.findByPk(id)
    .then(function (booking) {
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      var profitNumber = priceNumber - (costNumber || 0);

      booking.price = priceNumber;
      booking.internal_cost = costNumber;
      booking.profit = profitNumber;
      booking.status = 'priced';

      return booking.save();
    })
    .then(function (updated) {
      if (!updated) return; // already handled (e.g. not found)

      return res.json({
        success: true,
        message: 'Booking price set successfully',
        data: updated.toJSON()
      });
    })
    .catch(function (err) {
      console.error('Error setting booking price:', err);
      return res.status(500).json({ success: false, message: 'Failed to set booking price' });
    });
});

// Admin: reviews management
router.get('/reviews', requireAuth, requireAdmin, function (req, res) {
  if (!Review) {
    return res.status(500).json({ success: false, message: 'Review model not available' });
  }

  Review.findAll({ order: [['createdAt', 'DESC']] })
    .then(function (rows) {
      return res.json({ success: true, data: rows });
    })
    .catch(function (err) {
      console.error('Error loading admin reviews:', err);
      return res.status(500).json({ success: false, message: 'Failed to load reviews' });
    });
});

router.put('/reviews/:id/approve', requireAuth, requireAdmin, function (req, res) {
  if (!Review) {
    return res.status(500).json({ success: false, message: 'Review model not available' });
  }

  var id = req.params.id;

  Review.findByPk(id)
    .then(function (review) {
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
      review.approved = true;
      return review.save();
    })
    .then(function (saved) {
      if (!saved) return; // response already sent
      return res.json({ success: true, data: saved });
    })
    .catch(function (err) {
      console.error('Error approving review:', err);
      return res.status(500).json({ success: false, message: 'Failed to approve review' });
    });
});

router.delete('/reviews/:id', requireAuth, requireAdmin, function (req, res) {
  if (!Review) {
    return res.status(500).json({ success: false, message: 'Review model not available' });
  }

  var id = req.params.id;

  Review.destroy({ where: { id: id } })
    .then(function (count) {
      if (!count) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
      return res.status(204).send();
    })
    .catch(function (err) {
      console.error('Error deleting review:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete review' });
    });
});


module.exports = router;
