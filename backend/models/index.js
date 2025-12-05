var Sequelize = require('sequelize');
var sequelize = require('../config/db');

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load model definitions
var User = require('./User')(sequelize, Sequelize.DataTypes);
var Service = require('./Service')(sequelize, Sequelize.DataTypes);
var Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
var PublicBooking = require('./PublicBooking')(sequelize, Sequelize.DataTypes);
var Review = require('./Review')(sequelize, Sequelize.DataTypes);
var ContactMessage = require('./ContactMessage')(sequelize, Sequelize.DataTypes);
var ChatMessage = require('./ChatMessage')(sequelize, Sequelize.DataTypes);
var Test = require('./Test')(sequelize, Sequelize.DataTypes);

db.User = User;
db.Service = Service;
db.Booking = Booking;
db.PublicBooking = PublicBooking;
db.Review = Review;
db.ContactMessage = ContactMessage;
db.ChatMessage = ChatMessage;
db.Test = Test;

// Associations (ES5 syntax)
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Service.hasMany(Booking, { foreignKey: 'service_id' });
Booking.belongsTo(Service, { foreignKey: 'service_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

module.exports = db;
