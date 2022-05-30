const { DataTypes } = require("sequelize");

const Bookmark = (sequelize) => {
  return sequelize.define("bookmarks", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

module.exports = Bookmark;
