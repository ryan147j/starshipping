var nodemailer = require('nodemailer');
var db = require('../models');
var PublicBooking = db.PublicBooking;
var jwt = require('jsonwebtoken');

// Nodemailer transport reused for booking notifications
var bookingTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const shippingController = {
  // Track shipment
  trackShipment: async (req, res) => {
    try {
      const { trackingNumber } = req.params;
      
      // TODO: Validate tracking number
      // TODO: Get shipment data from database
      // TODO: Get tracking updates
      
      res.status(200).json({
        success: true,
        data: {
          trackingNumber,
          status: 'In Transit',
          origin: 'New York, NY',
          destination: 'Los Angeles, CA',
          estimatedDelivery: '2024-01-15T10:00:00Z',
          updates: [
            {
              status: 'Picked Up',
              location: 'New York, NY',
              timestamp: '2024-01-10T09:00:00Z',
              description: 'Package picked up from sender'
            },
            {
              status: 'In Transit',
              location: 'Chicago, IL',
              timestamp: '2024-01-12T14:30:00Z',
              description: 'Package in transit to destination'
            }
          ]
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to track shipment',
        error: error.message
      });
    }
  },

  // Create new shipment
  createShipment: async (req, res) => {
    try {
      const { 
        sender, 
        recipient, 
        packageDetails, 
        serviceType, 
        shippingOptions 
      } = req.body;
      
      // TODO: Validate input
      // TODO: Calculate shipping cost
      // TODO: Generate tracking number
      // TODO: Save to database
      
      res.status(201).json({
        success: true,
        message: 'Shipment created successfully',
        data: {
          id: 'shipment-id',
          trackingNumber: 'ST' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          status: 'Created',
          cost: 25.50,
          estimatedDelivery: '2024-01-15T10:00:00Z'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create shipment',
        error: error.message
      });
    }
  },

  // Get shipping history
  getShippingHistory: async (req, res) => {
    try {
      // TODO: Get user's shipping history
      // TODO: Apply filters and pagination
      
      res.status(200).json({
        success: true,
        data: {
          shipments: [
            {
              id: 'ship-1',
              trackingNumber: 'ST123456789',
              status: 'Delivered',
              destination: 'Los Angeles, CA',
              createdAt: '2024-01-01T10:00:00Z',
              deliveredAt: '2024-01-05T14:30:00Z',
              cost: 25.50
            },
            {
              id: 'ship-2',
              trackingNumber: 'ST987654321',
              status: 'In Transit',
              destination: 'Miami, FL',
              createdAt: '2024-01-10T09:00:00Z',
              estimatedDelivery: '2024-01-15T10:00:00Z',
              cost: 18.75
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 2,
            pages: 1
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get shipping history',
        error: error.message
      });
    }
  },

  // Update shipment
  updateShipment: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // TODO: Validate shipment exists
      // TODO: Check if update is allowed
      // TODO: Update shipment data
      
      res.status(200).json({
        success: true,
        message: 'Shipment updated successfully',
        data: {
          id,
          ...updateData
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update shipment',
        error: error.message
      });
    }
  },

  // Cancel shipment
  cancelShipment: async (req, res) => {
    try {
      const { id } = req.params;
      
      // TODO: Validate shipment exists
      // TODO: Check if cancellation is allowed
      // TODO: Update shipment status
      // TODO: Process refund if applicable
      
      res.status(200).json({
        success: true,
        message: 'Shipment cancelled successfully',
        data: {
          id,
          status: 'Cancelled',
          refundAmount: 25.50
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to cancel shipment',
        error: error.message
      });
    }
  },

  // Get shipping rates
  getShippingRates: async (req, res) => {
    try {
      const { origin, destination, weight, dimensions } = req.query;
      
      // TODO: Validate input
      // TODO: Calculate rates for different services
      
      res.status(200).json({
        success: true,
        data: {
          rates: [
            {
              service: 'Standard',
              description: '5-7 business days',
              cost: 15.50,
              estimatedDelivery: '2024-01-20T10:00:00Z'
            },
            {
              service: 'Express',
              description: '2-3 business days',
              cost: 25.50,
              estimatedDelivery: '2024-01-15T10:00:00Z'
            },
            {
              service: 'Overnight',
              description: 'Next business day',
              cost: 45.00,
              estimatedDelivery: '2024-01-12T10:00:00Z'
            }
          ]
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get shipping rates',
        error: error.message
      });
    }
  },

  // Calculate shipping cost
  calculateShipping: async (req, res) => {
    try {
      const { origin, destination, weight, dimensions, serviceType } = req.body;
      
      // TODO: Validate input
      // TODO: Calculate shipping cost
      
      res.status(200).json({
        success: true,
        data: {
          cost: 25.50,
          serviceType,
          estimatedDelivery: '2024-01-15T10:00:00Z',
          breakdown: {
            baseRate: 20.00,
            weightSurcharge: 3.50,
            fuelSurcharge: 2.00
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to calculate shipping',
        error: error.message
      });
    }
  },

  // Public booking request from marketing Booking form (email notification only)
  bookingRequest: function (req, res) {
    var body = req.body || {};

    var fullName = body.fullName || '';
    var email = body.email || '';
    var phone = body.phone || '';
    var cargoType = body.cargoType || '';
    var origin = body.origin || '';
    var destination = body.destination || '';
    var weight = body.weight || '';
    var date = body.date || '';
    var notes = body.notes || '';

    console.log('📦 New booking request received from', fullName, '(', email, ')');

    // Try to associate with the authenticated user if an Authorization header is present
    var userIdFromToken = null;
    try {
      var authHeader = req.headers && req.headers.authorization;
      if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
        var token = authHeader.split(' ')[1];
        var payload = jwt.verify(token, process.env.JWT_SECRET || 'starshipping-dev-secret');
        userIdFromToken = payload && payload.id ? payload.id : null;
      }
    } catch (e) {}

    // Persist a simple PublicBooking record so it can show up in "My Bookings"
    if (PublicBooking) {
      var numericWeight = null;
      if (typeof weight === 'number') {
        numericWeight = weight;
      } else if (typeof weight === 'string' && weight.trim() !== '') {
        var parsed = parseInt(weight, 10);
        if (!isNaN(parsed)) numericWeight = parsed;
      }

      var preferredDate = null;
      if (date) {
        var d = new Date(date);
        if (!isNaN(d.getTime())) preferredDate = d;
      }

      PublicBooking.create({
        user_id: userIdFromToken,
        client_name: fullName,
        client_phone: phone,
        cargo_type: cargoType,
        origin: origin,
        destination: destination,
        cargo_weight: numericWeight,
        preferred_date: preferredDate,
        additional_notes: notes,
        price: null,
        internal_cost: null,
        profit: null,
        status: 'pending-price'
      }).catch(function (err) {
        console.error('Error saving booking request to database:', err && err.message ? err.message : err);
      });
    }

    var recipient = process.env.BOOKING_RECIPIENT || process.env.CONTACT_RECIPIENT || process.env.SMTP_USER;

    var mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipient,
      cc: process.env.SMTP_USER || undefined,
      subject: '[StarShipping] A new client wants a booking',
      text:
        'Salut Insaf, here\'s a new booking for service: ' + cargoType + '.\n\n' +
        'Booking details:\n' +
        'Full Name: ' + fullName + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n' +
        'Cargo Type: ' + cargoType + '\n' +
        'Origin: ' + origin + '\n' +
        'Destination: ' + destination + '\n' +
        'Cargo Weight (kg): ' + weight + '\n' +
        'Preferred Date: ' + date + '\n' +
        'Additional Notes: ' + notes + '\n',
      replyTo: email || undefined
    };

    // If EMAIL_DRY_RUN is enabled, do not actually send mail; simulate success for testing
    if (String(process.env.EMAIL_DRY_RUN || '').toLowerCase() === 'true') {
      try {
        console.log('📭 EMAIL_DRY_RUN enabled. Would send booking email with options:', {
          to: mailOptions.to,
          cc: mailOptions.cc,
          subject: mailOptions.subject,
          replyTo: mailOptions.replyTo
        });
      } catch (e) {}

      return res.status(201).json({
        success: true,
        emailSent: false,
        message: 'Booking request simulated (EMAIL_DRY_RUN). No email sent.'
      });
    }

    // Optional SMTP connectivity check (does not block if it fails)
    try {
      bookingTransporter.verify(function (vErr, success) {
        if (vErr) {
          console.warn('⚠️ SMTP verify failed (continuing anyway):', vErr && vErr.message ? vErr.message : vErr);
        }
      });
    } catch (verifyCatch) {}

    bookingTransporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.error(' Error sending booking email:', err && err.response ? err.response : (err && err.message) || err);
        return res.status(201).json({
          success: true,
          emailSent: false,
          message: 'Booking request received, but email notification failed.'
        });
      }

      console.log(' Booking email sent successfully to', recipient);
      return res.status(201).json({
        success: true,
        emailSent: true,
        message: 'Booking request submitted successfully.'
      });
    });
  },

  // List recent bookings for the authenticated user
  getBookings: async function (req, res) {
    try {
      if (!PublicBooking) {
        return res.status(500).json({ success: false, message: 'Booking model not available' });
      }

      var userId = req.user && req.user.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      var rows = await PublicBooking.findAll({
        where: { user_id: userId },
        order: [['createdAt', 'DESC']],
        limit: 50
      });

      var list = rows.map(function (row) {
        var plain = row.toJSON();
        var bookingIdNumber = plain.id;
        var bookingCode = 'SS-2024-' + (bookingIdNumber < 10 ? '00' + bookingIdNumber : (bookingIdNumber < 100 ? '0' + bookingIdNumber : bookingIdNumber));

        var originText = plain.origin || '';
        var destinationText = plain.destination || '';

        var rawStatus = (plain.status || 'pending').toString().toLowerCase();
        var prettyStatus = 'Pending';
        if (rawStatus === 'delivered') prettyStatus = 'Delivered';
        else if (rawStatus === 'in transit' || rawStatus === 'in_transit' || rawStatus === 'intransit') prettyStatus = 'In Transit';
        else if (rawStatus === 'approved') prettyStatus = 'Approved';

        return {
          id: plain.id,
          bookingCode: bookingCode,
          clientName: plain.client_name || '',
          clientPhone: plain.client_phone || '',
          origin: originText,
          destination: destinationText,
          date: plain.preferred_date || plain.createdAt,
          status: prettyStatus
        };
      });

      return res.status(200).json({
        success: true,
        data: {
          bookings: list
        }
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to load bookings',
        error: error.message
      });
    }
  },

  // Get office location for contact map
  getOfficeLocation: function (req, res) {
    // Static real office data for now; could be loaded from DB later
    var latitude = 35.8316363490663;
    var longitude = 10.639101248484186;

    // Simple Google Maps embed URL using coordinates (no API key required)
    var embedUrl = 'https://www.google.com/maps?q=' + latitude + ',' + longitude + '&z=16&output=embed';

    res.status(200).json({
      success: true,
      data: {
        name: 'StarShipping Tunisia Office',
        addressLine1: 'B51 - 5th - Imm Bochra',
        addressLine2: "À côté de l'institut des Beaux Arts, Bab Bhar, 4000 Sousse, Sousse, Tunisia",
        latitude: latitude,
        longitude: longitude,
        mapEmbedUrl: embedUrl
      }
    });
  }
};

module.exports = shippingController;



