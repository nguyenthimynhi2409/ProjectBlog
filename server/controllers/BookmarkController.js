const { responseData } = require("../common/responseData");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bookmarkService = require("../services/BookmarkService");

const getAllBookmarks = catchAsyncErrors(async (req, res, next) => {
  const bookmarks = await bookmarkService.getAllBookmarks();
  responseData(res, 200, {
    bookmarks,
    total: bookmarks.length,
  });
});

// Get All Bookmark by userid
const getAllBookmarksByUser = catchAsyncErrors(async (req, res, next) => {
  const bookmarks = await bookmarkService.getAllBookmarksByUser(req.params.id);
  responseData(res, 200, {
    bookmarks,
    total: bookmarks.length,
  });
});

const getBookmark = catchAsyncErrors(async (req, res, next) => {
  const bookmark = await bookmarkService.getBookmarkById(req.params.id);
  responseData(res, 200, bookmark);
});

const createBookmark = catchAsyncErrors(async (req, res, next) => {
  const bookmark = await bookmarkService.createBookmark(req.body);
  responseData(res, 201, bookmark);
});

const updateBookmark = catchAsyncErrors(async (req, res, next) => {
  const bookmark = await bookmarkService.updateBookmark(
    req.params.id,
    req.body
  );
  responseData(res, 200, bookmark);
});

const deleteBookmark = catchAsyncErrors(async (req, res, next) => {
  await bookmarkService.deleteBookmark(req.params.id);
  responseData(res, 200);
});

module.exports = {
  getAllBookmarks,
  getAllBookmarksByUser,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
