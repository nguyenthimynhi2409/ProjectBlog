const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  login,
  logout,
  userDetails,
  updateProfile,
} = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/register").post(createUser);

// Admin
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles(2), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles(2), getUser)
  .put(isAuthenticatedUser, authorizeRoles(2), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles(2), deleteUser);
router
  .route("/admin/user/new")
  .post(isAuthenticatedUser, authorizeRoles(2), createUser);

// User
router.route("/me").get(isAuthenticatedUser, userDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
