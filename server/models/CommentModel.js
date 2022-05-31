const { DataTypes } = require("sequelize");

const Commnent = (sequelize) => {
  return sequelize.define("comments", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    postId: {
      allowNull: false,
      type: DataTypes.STRING(36),
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING(36),
    },
    commentId: {
      allowNull: true,
      type: DataTypes.STRING(36),
    },
  });
};

module.exports = Commnent;
