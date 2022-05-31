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

// relationship
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts, { foreignKey: "userId" });

module.exports = db;
