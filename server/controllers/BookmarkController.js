const { responseData } = require("../common/responseData");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bookmarkService = require("../services/BookmarkService");

exports.getAllBookmarks = catchAsyncErrors(async (req, res, next) => {
  const bookmarks = await bookmarkService.getAllBookmarks();
  responseData(res, 200, {
    bookmarks,
    total: bookmarks.length,
  });
});

// Get All Bookmark by userid
exports.getAllBookmarksByUser = catchAsyncErrors(async (req, res, next) => {
  const bookmarks = await bookmarkService.getAllBookmarksByUser(req.params.id);
  responseData(res, 200, {
    bookmarks,
    total: bookmarks.length,
  });
});

exports.getBookmark = catchAsyncErrors(async (req, res, next) => {
  const bookmark = await bookmarkService.getBookmarkById(req.params.id);
  responseData(res, 200, bookmark);
});

exports.createBookmark = catchAsyncErrors(async (req, res, next) => {
  const bookmark = await bookmarkService.createBookmark(req.body);
  responseData(res, 201, bookmark);
});

exports.updateBookmark = catchAsyncErrors(async (req, res, next) => {
  const bookmark = await bookmarkService.updateBookmark(req.params.id, req.body);
  responseData(res, 200, bookmark);
});

exports.deleteBookmark = catchAsyncErrors(async (req, res, next) => {
  await bookmarkService.deleteBookmark(req.params.id);
  responseData(res, 200);
});
