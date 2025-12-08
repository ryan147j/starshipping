const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
require('dotenv').config();

// Import middleware configuration
const configureMiddlewares = require('./middlewares/configure');
const { errorHandler, notFoundHandler } = require('./middlewares');

// Import Sequelize models (DB connection & associations)
var db = require('./models');

// Import routes
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

// Configure core middlewares (security, cors, body parsers, logging)
configureMiddlewares(app);

// Respect reverse proxy headers (needed for secure cookies, HTTPS redirects behind proxy)
app.set('trust proxy', 1);

// Optionally enforce HTTPS in local development
if (process.env.DEV_ENABLE_HTTPS === 'true') {
app.use(function (req, res, next) {
if (req.secure || req.headers['x-forwarded-proto'] === 'https') return next();
return res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
});
}

// Basic health check route
app.get('/api/health', function (req, res) {
res.json({
status: 'healthy',
uptime: process.uptime(),
timestamp: new Date().toISOString()
});
});

// Root route
app.get('/', function (req, res) {
res.json({
message: 'StarShipping Backend API is running!',
status: 'success',
timestamp: new Date().toISOString()
});
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/media', mediaRoutes);

// Serve uploaded files (avatars, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling and 404 (after routes)
app.use(errorHandler);
app.use(notFoundHandler);

// Initialize database connection, then start server
db.sequelize
.authenticate()
.then(function () {
console.log('✅ Database connection to "' + (process.env.DB_NAME || 'starshipping') + '" has been established successfully.');
return db.sequelize.sync({ alter: true });
})
.then(function () {
return db.Test.create({ name: 'Hello Neon!' })
.then(function (created) {
if (created && created.toJSON) console.log('🧪 Inserted Test record:', created.toJSON());
})
.catch(function (err) {
console.warn('⚠️ Failed to insert Test record:', err && err.message);
});
})
.then(function () {
// Only enable HTTPS locally
var enableHttpsEnv = (process.env.DEV_ENABLE_HTTPS || '').toLowerCase() === 'true';
var certsDir = path.join(__dirname, '..', 'certs');
var defaultKey = path.join(certsDir, 'localhost-key.pem');
var defaultCert = path.join(certsDir, 'localhost.pem');
var hasDefaultCerts = fs.existsSync(defaultKey) && fs.existsSync(defaultCert);

```
if (enableHttpsEnv && hasDefaultCerts) {  
  try {  
    var httpsOptions = {  
      key: fs.readFileSync(defaultKey),  
      cert: fs.readFileSync(defaultCert)  
    };  
    https.createServer(httpsOptions, app).listen(PORT, function () {  
      console.log('🔐 HTTPS server running on port ' + PORT);  
      console.log('📡 API available at https://localhost:' + PORT);  
    });  
    return;  
  } catch (err) {  
    console.warn('⚠️ Failed to start HTTPS server, falling back to HTTP:', err && err.message);  
  }  
}  

app.listen(PORT, function () {  
  console.log('🚀 Server is running on port ' + PORT);  
  if (process.env.PORT) {  
    console.log('📡 Your Railway public URL will be available in Deployments → Latest Deployment');  
  } else {  
    console.log('📡 API available at http://localhost:' + PORT);  
  }  
  console.log('🏥 Health check at /api/health');  
});  
```

})
.catch(function (err) {
console.error('❌ Unable to connect to the database:', err);
});

module.exports = app;
