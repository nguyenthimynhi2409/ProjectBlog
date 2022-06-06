"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(post, user, comment) {
      // define association here
      comments.belongsTo(post);
      comments.belongsTo(user);
      comments.hasMany(comment, { as: "children", foreignKey: "commentId" });
      comments.belongsTo(comment, { as: "parent", foreignKey: "commentId" });
    }
  }
  comments.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      postId: {
        allowNull: false,
        type: DataTypes.STRING(36),
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING(36),
      },
      commentId: {
        allowNull: true,
        type: DataTypes.STRING(36),
      },
    },
    {
      sequelize,
      modelName: "comments",
    }
  );
  return comments;
};
