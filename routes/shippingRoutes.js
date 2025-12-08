const express = require('express');
const router = express.Router();

// Import controllers
const shippingController = require('../controllers/shippingController');
const { requireAuth } = require('../middlewares/auth');

// Shipping routes
router.get('/track/:trackingNumber', shippingController.trackShipment);
router.post('/create', shippingController.createShipment);
router.post('/booking-request', shippingController.bookingRequest);
router.get('/history', shippingController.getShippingHistory);
router.get('/bookings', requireAuth, shippingController.getBookings);
router.put('/update/:id', shippingController.updateShipment);
router.delete('/cancel/:id', shippingController.cancelShipment);
router.get('/rates', shippingController.getShippingRates);
router.post('/calculate', shippingController.calculateShipping);
router.get('/office-location', shippingController.getOfficeLocation);

module.exports = router;



