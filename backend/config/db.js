var Sequelize = require('sequelize');
require('dotenv').config();

// Read from environment variables with sensible defaults
var DB_NAME = process.env.DB_NAME || 'starshipping';
var DB_USER = process.env.DB_USER || 'root';
var DB_PASSWORD = process.env.DB_PASSWORD || 'root';
var DB_HOST = process.env.DB_HOST || 'localhost';
var DB_DIALECT = process.env.DB_DIALECT || 'mysql';

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false
});

module.exports = sequelize;
