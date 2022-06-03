"use strict";
const { Model } = require("sequelize");
const db = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(user, comment, rating) {
      // define association here
      posts.belongsTo(user);
      posts.hasMany(comment, { foreignKey: "postId" });
      posts.hasMany(rating, { foreignKey: "postId" });
    }
  }
  posts.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      coverImage: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "draft",
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING(36),
      },
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return posts;
};
