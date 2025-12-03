var db = require('../models');
var nodemailer = require('nodemailer');
var fetch = require('node-fetch');

var chatTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

var chatController = {
  createMessage: function (req, res) {
    var body = req.body || {};
    var message = body.message;
    var sessionId = body.sessionId || null;
    var page = body.page || '';

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.'
      });
    }

    db.ChatMessage.create({
      sessionId: sessionId,
      senderType: 'user',
      message: message,
      metadata: {
        page: page
      }
    }).then(function (saved) {
      var recipient = process.env.CHAT_RECIPIENT || process.env.CONTACT_RECIPIENT || process.env.SMTP_USER;
      var mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: recipient,
        subject: '[StarShipping] New chatbot message',
        text:
          'A new message was received from the website chatbot.\n\n' +
          'Message: ' + message + '\n' +
          (page ? ('Page: ' + page + '\n') : '') +
          (sessionId ? ('Session: ' + sessionId + '\n') : ''),
      };

      chatTransporter.sendMail(mailOptions, function (err) {
        if (err) {
          console.error('❌ Error sending chat email:', err && err.response ? err.response : (err && err.message) || err);
          return res.status(201).json({
            success: true,
            emailSent: false,
            message: 'Chat message stored, but email notification failed.'
          });
        }

        console.log('✅ Chat email sent successfully for chat message ID:', saved && saved.id);
        return res.status(201).json({
          success: true,
          emailSent: true,
          message: 'Chat message received.'
        });
      });
    }).catch(function (err) {
      console.error('Error saving chat message:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to save chat message.',
        error: err.message
      });
    });
  },

  // AI-powered answer using Mistral API (no DB/email, just live reply)
  ask: function (req, res) {
    var body = req.body || {};
    var message = body.message || '';

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.'
      });
    }

    var apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Chat service is not configured.'
      });
    }

    var systemPrompt = 'You are StarShipping\'s virtual assistant. StarShipping is a logistics and freight forwarding company based in Tunisia. ' +
      'Answer questions about shipping services (ocean, air, road, heavy cargo, warehousing, customs clearance), booking, tracking, containers, and contact information. ' +
      'Be concise, friendly, and always stay within StarShipping topics. If something is unrelated, politely redirect the user back to shipping and logistics topics.';

    fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        max_tokens: 256,
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      })
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (result) {
        var data = result && result.data;

        if (!data) {
          console.error('Mistral empty response:', result);
          return res.status(500).json({
            success: false,
            message: 'Assistant service returned an empty response.'
          });
        }

        if (data.error) {
          console.error('Mistral error:', data.error);
          return res.status(500).json({
            success: false,
            message: data.error.message || 'Assistant service reported an error.'
          });
        }

        try {
          var choice = data.choices && data.choices[0];
          var answer = choice && choice.message && choice.message.content;
          if (!answer) {
            return res.status(500).json({
              success: false,
              message: 'Assistant returned an empty reply.'
            });
          }

          return res.status(200).json({
            success: true,
            answer: answer
          });
        } catch (e) {
          console.error('Error parsing Mistral response:', e, 'raw data:', data);
          return res.status(500).json({
            success: false,
            message: 'Failed to parse assistant reply.'
          });
        }
      })
      .catch(function (err) {
        console.error('Error calling Mistral API:', err);
        return res.status(500).json({
          success: false,
          message: 'Error contacting chat service.'
        });
      });
  }
};

module.exports = chatController;
