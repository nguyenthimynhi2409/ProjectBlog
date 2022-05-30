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
      type: DataTypes.STRING(45),
      validate: {
        is: /^\w{2,}$/,
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(50),
      validate: { isEmail: true },
      unique: { args: true, msg: "Email already exists" },
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(30),
      validate: {
        is: /^\w{2,}$/,
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(30),
      validate: {
        is: /^\w{2,}$/,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING(10),
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING(11),
    },
    role: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING(200),
    }
  });
};

module.exports = User;
