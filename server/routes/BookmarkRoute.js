const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  getAllBookmarksByUser,
} = require("../controllers/BookmarkController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

module.exports = function (app) {
  // --Admin
  app
    .route("/admin/bookmarks")
    .get(
      isAuthenticatedUser,
      authorizeRoles(2),
      catchAsyncErrors(getAllBookmarks)
    );
  app
    .route("/admin/bookmark/:id")
    .put(
      isAuthenticatedUser,
      authorizeRoles(2),
      catchAsyncErrors(updateBookmark)
    )
    .delete(
      isAuthenticatedUser,
      authorizeRoles(2),
      catchAsyncErrors(deleteBookmark)
    );

  app
    .route("/bookmarks/:id")
    .get(isAuthenticatedUser, catchAsyncErrors(getAllBookmarksByUser))
    .delete(isAuthenticatedUser, catchAsyncErrors(deleteBookmark));
  app
    .route("/bookmark/new")
    .get(isAuthenticatedUser, catchAsyncErrors(createBookmark));
};
