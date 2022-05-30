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

  // sync all models with database
  sequelize.sync({ alter: true });
}
