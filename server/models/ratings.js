"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(user, post) {
      // define association here
      ratings.belongsTo(user);
      ratings.belongsTo(post);
    }
  }
  ratings.init(
    {
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
    },
    {
      sequelize,
      modelName: "ratings",
    }
  );
  return ratings;
};
