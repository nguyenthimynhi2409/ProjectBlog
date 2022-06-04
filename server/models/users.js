"use strict";
const { Model } = require("sequelize");
const db = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(post, comment, rating, bookmark) {
      // define association here
      users.hasMany(post, { foreignKey: "userId" });
      users.hasMany(comment, { foreignKey: "userId" });
      users.hasMany(rating, { foreignKey: "userId" });
      users.hasMany(bookmark, { foreignKey: "userId" });
    }
  }
  users.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        allowNull: false,
        unique: { args: true, msg: "Username already exists" },
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: { args: true, msg: "Email already exists" },
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
