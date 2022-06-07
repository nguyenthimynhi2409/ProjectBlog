const config = require("./config.json");
const mysql = require("mysql2/promise");
const { Sequelize, DataTypes } = require("sequelize");

const { host, port, username, password, database, pool } = config.development;

const db = {};

const sequelize = new Sequelize(database, username, password, {
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

db.users = require("../models/users")(sequelize, DataTypes);
db.posts = require("../models/posts")(sequelize, DataTypes);
db.comments = require("../models/comments")(sequelize, DataTypes);
db.ratings = require("../models/ratings")(sequelize, DataTypes);
db.bookmarks = require("../models/bookmarks")(sequelize, DataTypes);

db.users.associate(db.posts, db.comments, db.ratings, db.bookmarks);
db.posts.associate(db.users, db.comments, db.ratings, db.bookmarks);
db.comments.associate(db.users, db.posts, db.comments);
db.ratings.associate(db.users, db.posts);
db.bookmarks.associate(db.users, db.posts);

module.exports = db;
