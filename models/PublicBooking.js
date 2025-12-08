    module.exports = function (sequelize, DataTypes) {
  var PublicBooking = sequelize.define('PublicBooking', {
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
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    },
    client_name: {
      type: DataTypes.STRING
    },
    client_phone: {
      type: DataTypes.STRING
    },
    cargo_type: {
      type: DataTypes.STRING
    },
    origin: {
      type: DataTypes.STRING
    },
    destination: {
      type: DataTypes.STRING
    },
    cargo_weight: {
      type: DataTypes.INTEGER
    },
    preferred_date: {
      type: DataTypes.DATE
    },
    additional_notes: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    internal_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    profit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending-price'
    }
  }, {
    tableName: 'PublicBookings',
    timestamps: true
  });

  return PublicBooking;
}
