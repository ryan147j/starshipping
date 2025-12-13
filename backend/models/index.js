// Sequelize dynamic model loader using the project's existing DB config
const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
require('dotenv').config();
// Reuse the single Sequelize instance configured for the app
const sequelize = require('../../config/db');

const db = {};

// Dynamically require all model files in this directory (except index.js)
const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.endsWith('.js') || file.endsWith('.cjs'))
    );
  })
  .forEach((file) => {
    const modelFactory = require(path.join(__dirname, file));
    // sequelize-auto models are typically functions of (sequelize, DataTypes)
    const model = typeof modelFactory === 'function'
      ? modelFactory(sequelize, DataTypes)
      : modelFactory;

    if (!model || !model.name) return;
    db[model.name] = model;
  });

// Run model associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Enforce security defaults for users model: exclude password hash by default
const userModel = db.User || db.users || db.Users || db.user;
if (userModel && typeof userModel.addScope === 'function') {
  userModel.addScope('defaultScope', {
    attributes: { exclude: ['password_hash'] },
  }, { override: true });
}

db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize || require('sequelize');

module.exports = db;

