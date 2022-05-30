const config = require("./config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

function initialize() {
  const { host, port, user, password, database } = config.database;

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // init models and add them to the exported db object
  db.users = require("../models/UserModel")(sequelize);
  db.posts = require("../models/PostModel")(sequelize);
  db.comments = require("../models/CommentModel")(sequelize);
  db.ratings = require("../models/RatingModel")(sequelize);
  
  // relationship
  db.posts.belongsTo(db.users);
  db.users.hasMany(db.posts, { foreignKey: "userId" });

  db.comments.belongsTo(db.posts);
  db.posts.hasMany(db.comments, { foreignKey: "postId" });
  db.comments.belongsTo(db.users);
  db.users.hasMany(db.comments, { foreignKey: "userId" });
  db.comments.belongsTo(db.comments, { as: 'parent', foreignKey: 'commentId' });
  db.comments.hasMany(db.comments, { as: 'children', foreignKey: 'commentId' });

  db.ratings.belongsTo(db.posts);
  db.posts.hasMany(db.ratings, { foreignKey: "postId" });
  db.ratings.belongsTo(db.users);
  db.users.hasMany(db.ratings, { foreignKey: "userId" });

  // sync all models with database
  sequelize.sync({ alter: true });
}
