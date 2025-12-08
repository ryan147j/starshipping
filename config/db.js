// db.js
var Sequelize = require('sequelize');
require('dotenv').config();

/**
 * DB connection:
 * - Works with MySQL (local / hosted)
 * - Works with PostgreSQL (Render / Neon)
 * - Supports SSL if needed
 * - Can use DATABASE_URL directly (for Postgres)
 */

// Check if DATABASE_URL exists (Neon / Render Postgres)
var connectionUrl = process.env.DATABASE_URL || null;

var sequelize;

if (connectionUrl) {
  // PostgreSQL connection using full URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  sequelize = new Sequelize(connectionUrl, {
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    dialectOptions: {
      ssl:
        process.env.DB_SSL === 'true'
          ? { require: true, rejectUnauthorized: false }
          : false
    }
  });
} else {
  // Classic MySQL connection (local or hosted)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'starshipping',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'root',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: process.env.DB_DIALECT || 'mysql',
      logging: false,
      dialectOptions: {
        ssl:
          process.env.DB_SSL === 'true'
            ? { require: true, rejectUnauthorized: false }
            : false
      }
    }
  );
}

module.exports = sequelize;
