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

db.posts = require("../models/PostModel")(sequelize);

// relationship
// db.posts.belongsTo(db.users);
// db.users.hasMany(db.posts, { foreignKey: "userId" });
db.users = require("../models/users")(sequelize, DataTypes);
// db.posts = require("../models/posts")(sequelize, DataTypes);

module.exports = db;
