"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(user, post) {
      // define association here
      bookmarks.belongsTo(user);
      bookmarks.belongsTo(post);
    }
  }
  bookmarks.init(
    {
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
    },
    {
      sequelize,
      modelName: "bookmarks",
    }
  );
  return bookmarks;
};
