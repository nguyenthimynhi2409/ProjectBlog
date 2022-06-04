const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  getAllBookmarksByUser,
} = require("../controllers/BookmarkController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

module.exports = function (app) {
  // --Admin
  app
    .route("/admin/bookmarks")
    .get(isAuthenticatedUser, authorizeRoles(2), getAllBookmarks);
  app
    .route("/admin/bookmark/:id")
    .put(isAuthenticatedUser, authorizeRoles(2), updateBookmark)
    .delete(isAuthenticatedUser, authorizeRoles(2), deleteBookmark);

  app
    .route("/bookmarks/:id")
    .get(isAuthenticatedUser, getAllBookmarksByUser)
    .delete(isAuthenticatedUser, deleteBookmark);
  app.route("/bookmark/new").get(isAuthenticatedUser, createBookmark);
};
