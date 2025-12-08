require('dotenv').config();
var sequelize = require('./config/db');

// Simple connectivity test to Neon via existing Sequelize config (.env)
console.log('Testing Neon PostgreSQL connection using DATABASE_URL and DB_DIALECT from .env ...');

sequelize
  .authenticate()
  .then(function () {
    console.log('✅ Connected to Neon PostgreSQL successfully.');
    return sequelize.close();
  })
  .then(function () {
    console.log('🔌 Connection closed.');
    process.exit(0);
  })
  .catch(function (err) {
    console.error('❌ Unable to connect to Neon PostgreSQL:', err && err.message ? err.message : err);
    sequelize
      .close()
      .catch(function () {})
      .then(function () { process.exit(1); });
  });
