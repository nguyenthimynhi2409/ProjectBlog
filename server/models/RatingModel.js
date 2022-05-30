const { DataTypes } = require("sequelize");

const Rating = (sequelize) => {
  return sequelize.define("ratings", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    rate: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    postId: {
      allowNull: false,
      type: DataTypes.STRING(36),
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING(36),
    },
  });
};

module.exports = Rating;
