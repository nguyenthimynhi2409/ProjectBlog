const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("users", {
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
      validate: {
        is: /^\w{2,}$/,
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: { args: true, msg: "Email already exists" },
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^\w{2,}$/,
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^\w{2,}$/,
      },
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
    }
  });
};

module.exports = User;
