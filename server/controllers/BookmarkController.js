const { responseData } = require("../common/responseData");
const bookmarkService = require("../services/BookmarkService");

exports.getAllBookmarks = (req, res, next) => {
  bookmarkService
    .getAll()
    .then((bookmarks) =>
      responseData(res, 200, {
        bookmarks,
        total: bookmarks.length,
      })
    )
    .catch(next);
};

// Get All Bookmark by userid
exports.getAllBookmarksByUser = (req, res, next) => {
  bookmarkService
    .getAllBookmarksByUser(req.params.id)
    .then((bookmarks) =>
      responseData(res, 200, {
        bookmarks,
        total: bookmarks.length,
      })
    )
    .catch(next);
};

exports.getBookmark = (req, res, next) => {
  bookmarkService
    .getById(req.params.id)
    .then((bookmark) => responseData(res, 200, bookmark))
    .catch(next);
};

exports.createBookmark = (req, res, next) => {
  bookmarkService
    .create(req.body)
    .then((bookmark) => responseData(res, 201, bookmark))
    .catch(next);
};

exports.updateBookmark = (req, res, next) => {
  bookmarkService
    .update(req.params.id, req.body)
    .then((bookmark) => responseData(res, 200, bookmark))
    .catch(next);
};

exports.deleteBookmark = (req, res, next) => {
  bookmarkService
    ._delete(req.params.id)
    .then(() => responseData(res, 200))
    .catch(next);
};
