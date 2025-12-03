module.exports = function (sequelize, DataTypes) {
  var ChatMessage = sequelize.define('ChatMessage', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    sessionId: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    senderType: {
      type: DataTypes.ENUM('user', 'assistant'),
      allowNull: false,
      defaultValue: 'user'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'chat_messages',
    timestamps: true
  });

  return ChatMessage;
};
