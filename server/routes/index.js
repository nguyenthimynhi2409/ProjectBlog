const auth = require("./AuthRoute");
const post = require("./PostRoute");
const user = require("./UserRoute");
const comment = require("./CommentRoute");

module.exports = function (app) {
  auth(app);
  user(app);
  post(app);
  comment(app);
};
