const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  userDetails,
  updateProfile,
  forgotPassword,
  updatePassword,
} = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { validateUser } = require("../middlewares/validate");

module.exports = function (app) {
  app.route("/password/forgot").post(forgotPassword);

  // Admin
  app
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles(2), catchAsyncErrors(getAllUsers));
  app
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles(2), catchAsyncErrors(getUser))
    .put(isAuthenticatedUser, authorizeRoles(2), validateUser, catchAsyncErrors(updateUser))
    .delete(
      isAuthenticatedUser,
      authorizeRoles(2),
      catchAsyncErrors(deleteUser)
    );
  app
    .route("/admin/user/new")
    .post(
      isAuthenticatedUser,
      authorizeRoles(2),
      validateUser,
      catchAsyncErrors(createUser)
    );

  // User
  app.route("/me").get(isAuthenticatedUser, catchAsyncErrors(userDetails));
  app
    .route("/me/update")
    .put(isAuthenticatedUser, validateUser, catchAsyncErrors(updateProfile));
  app
    .route("/password/update")
    .put(isAuthenticatedUser, catchAsyncErrors(updatePassword));
};
