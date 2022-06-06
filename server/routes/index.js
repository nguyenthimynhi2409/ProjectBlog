const auth = require("./AuthRoute");
const post = require("./PostRoute");
const user = require("./UserRoute");

module.exports = function (app) {
  auth(app);
  user(app);
  post(app);
};
