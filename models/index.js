// Proxy models loader: delegate to backend/models to keep a single source of truth
// This keeps existing require paths working (require('../models')) without breaking routes/controllers
module.exports = require('../backend/models');
