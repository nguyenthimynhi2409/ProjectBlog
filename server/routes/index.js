const auth = require("./AuthRoute");
const user = require("./UserRoute");

module.exports = function (app) {
  auth(app);
  user(app);
};
