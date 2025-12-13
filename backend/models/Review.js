module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    rating: { type: DataTypes.INTEGER },
    comment: { type: DataTypes.TEXT },
    is_visible: { type: DataTypes.BOOLEAN, defaultValue: true },
    approved: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'Reviews',
    timestamps: true
  });

  return Review;
};
