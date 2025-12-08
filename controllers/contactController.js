var db = require('../models');
var nodemailer = require('nodemailer');

// Create Nodemailer transport using env vars
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

var contactController = {
  createMessage: function (req, res) {
    var body = req.body || {};
    var fullName = body.fullName;
    var email = body.email;
    var phone = body.phone || '';
    var subject = body.subject || 'General Inquiry';
    var message = body.message;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and message are required.'
      });
    }

    console.log('📩 New contact form submission received from', fullName, '(', email, ')');

    db.ContactMessage.create({
      fullName: fullName,
      email: email,
      phone: phone,
      subject: subject,
      message: message
    }).then(function (saved) {
      console.log('✉️  Preparing to send contact email via SMTP to recipient:', process.env.CONTACT_RECIPIENT || process.env.SMTP_USER);

      var mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_RECIPIENT || process.env.SMTP_USER,
        subject: '[StarShipping] New contact message: ' + subject,
        text:
          'You have received a new contact message.\n\n' +
          'Name: ' + fullName + '\n' +
          'Email: ' + email + '\n' +
          'Phone: ' + phone + '\n' +
          'Subject: ' + subject + '\n\n' +
          'Message:\n' + message + '\n',
        replyTo: email
      };

      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          // Log error but still return success for saved message
          console.error('❌ Error sending contact email:', err && err.response ? err.response : (err && err.message) || err);
          return res.status(201).json({
            success: true,
            data: saved,
            emailSent: false,
            message: 'Message stored, but email notification failed.'
          });
        }

        console.log('✅ Contact email sent successfully for message ID:', saved && saved.id);
        return res.status(201).json({
          success: true,
          data: saved,
          emailSent: true,
          message: 'Message sent successfully.'
        });
      });
    }).catch(function (err) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to save contact message.',
        error: err.message
      });
    });
  }
};

module.exports = contactController;
