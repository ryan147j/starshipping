module.exports = function (sequelize, DataTypes) {
  var Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Services',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    client_name: { type: DataTypes.STRING },
    client_phone: { type: DataTypes.STRING },
    cargo_type: { type: DataTypes.STRING },
    origin: { type: DataTypes.STRING },
    destination: { type: DataTypes.STRING },
    cargo_weight: { type: DataTypes.INTEGER },
    preferred_date: { type: DataTypes.DATE },
    additional_notes: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
  }, {
    tableName: 'Bookings',
    timestamps: true
  });

  return Booking;
};
