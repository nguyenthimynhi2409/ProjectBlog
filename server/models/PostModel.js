const { DataTypes } = require("sequelize");

const Post = (sequelize) => {
  return sequelize.define("posts", {
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
    userId: {
      allowNull: false,
      type: DataTypes.STRING(36),
    },
  });
};
module.exports = Post;
