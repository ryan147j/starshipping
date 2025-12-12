const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
require('dotenv').config();

// Middleware
const configureMiddlewares = require('./middlewares/configure');
const { errorHandler, notFoundHandler } = require('./middlewares');

// Sequelize models
var db = require('./models');

// Routes
var authRoutes = require('./routes/authRoutes');
var userRoutes = require('./routes/userRoutes');
var shippingRoutes = require('./routes/shippingRoutes');
var contactRoutes = require('./routes/contactRoutes');
var chatRoutes = require('./routes/chatRoutes');
var reviewRoutes = require('./routes/reviewRoutes');
var mediaRoutes = require('./routes/mediaRoutes');
var adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS Configuration ---
const allowedOrigins = [
  'https://starshipping-5511.vercel.app',
  'https://starshipping.com.tn',
  'https://www.starshipping.com.tn'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or Postman requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Middlewares
configureMiddlewares(app);
app.set('trust proxy', 1);

if (process.env.DEV_ENABLE_HTTPS === 'true') {
  app.use(function(req, res, next) {
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') return next();
    res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
  });
}

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'StarShipping Backend API is running!', status: 'success', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/media', mediaRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);
app.use(notFoundHandler);

// DB init and server start
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected to', process.env.DB_NAME || 'starshipping');

    await db.sequelize.sync({ alter: true });

    // Optional test record
    try {
      var test = await db.Test.create({ name: 'Hello Neon!' });
      console.log('🧪 Test record inserted:', test.toJSON());
    } catch (err) {
      console.warn('⚠️ Failed to insert test record:', err.message);
    }

    // HTTPS dev check
    const enableHttpsEnv = (process.env.DEV_ENABLE_HTTPS || '').toLowerCase() === 'true';
    const certsDir = path.join(__dirname, '..', 'certs');
    const defaultKey = path.join(certsDir, 'localhost-key.pem');
    const defaultCert = path.join(certsDir, 'localhost.pem');
    const hasDefaultCerts = fs.existsSync(defaultKey) && fs.existsSync(defaultCert);

    if (enableHttpsEnv && hasDefaultCerts) {
      try {
        const httpsOptions = { key: fs.readFileSync(defaultKey), cert: fs.readFileSync(defaultCert) };
        https.createServer(httpsOptions, app).listen(PORT, () => {
          console.log('🔐 HTTPS server running on port', PORT);
        });
        return;
      } catch (err) {
        console.warn('⚠️ Failed to start HTTPS server, falling back to HTTP:', err.message);
      }
    }

    // Start HTTP server
    app.listen(PORT, () => {
      console.log('🚀 Server running on port', PORT);
      if (process.env.PORT) console.log('📡 Railway public URL will be available in Deployments → Latest Deployment');
      else console.log('📡 API available at http://localhost:' + PORT);
      console.log('🏥 Health check at /api/health');
    });
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
  }
}

startServer();

module.exports = app;
