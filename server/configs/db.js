const config = require("./config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

const { host, port, user, password, database, pool } = config.database;

const db = {};

const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

db.sequelize = sequelize;

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

module.exports = db;
