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
      type: DataTypes.STRING(80),
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(1000),
    },
    coverImage: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING(45),
      defaultValue: "draft",
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING(36),
    },
  });
};
module.exports = Post;
