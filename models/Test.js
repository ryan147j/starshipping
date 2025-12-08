module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Test',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'tests'
    }
  );
};
