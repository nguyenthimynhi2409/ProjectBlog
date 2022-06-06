const { signIn, signOut, signUp } = require("../controllers/AuthController");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { validateUser } = require("../middlewares/validate");

module.exports = function (app) {
  app.route("/signin").post(catchAsyncErrors(signIn));
  app.route("/signout").get(catchAsyncErrors(signOut));
  app.route("/signup").post(validateUser, catchAsyncErrors(signUp));
};
