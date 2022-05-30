const express = require("express");
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  getAllBookmarksByUser,
} = require("../controllers/BookmarkController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// --Admin
router
  .route("/admin/bookmarks")
  .get(isAuthenticatedUser, authorizeRoles(2), getAllBookmarks);
router
  .route("/bookmarks/:id")
  .get(isAuthenticatedUser, getAllBookmarksByUser)
  .delete(isAuthenticatedUser, deleteBookmark);
router.route("/bookmark/new").get(isAuthenticatedUser, createBookmark);
router
  .route("/admin/bookmark/:id")
  .put(isAuthenticatedUser, authorizeRoles(2), updateBookmark)
  .delete(isAuthenticatedUser, authorizeRoles(2), deleteBookmark);

module.exports = router;