module.exports = function (sequelize, DataTypes) {
  var Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'Services',
    timestamps: true
  });

  return Service;
};
