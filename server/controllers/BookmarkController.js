const { responseData } = require("../common/responseData");
const bookmarkService = require("../services/BookmarkService");

const getAllBookmarks = async (req, res, next) => {
  const bookmarks = await bookmarkService.getAllBookmarks();
  responseData(res, 200, {
    bookmarks,
    total: bookmarks.length,
  });
};

// Get All Bookmark by userid
const getAllBookmarksByUser = async (req, res, next) => {
  const bookmarks = await bookmarkService.getAllBookmarksByUser(req.params.id);
  responseData(res, 200, {
    bookmarks,
    total: bookmarks.length,
  });
};

// Get All Bookmark by postId
const getAllBookmarksByPost = async (req, res, next) => {
  const bookmarks = await bookmarkService.getAllBookmarksByPost(req.params.id);
  responseData(res, 200, {
    bookmarks,
    total: bookmarks.length,
  });
};

const getBookmark = async (req, res, next) => {
  const bookmark = await bookmarkService.getBookmarkById(req.params.id);
  responseData(res, 200, bookmark);
};

const createBookmark = async (req, res, next) => {
  const bookmark = await bookmarkService.createBookmark(req.body);
  responseData(res, 201, bookmark);
};

const updateBookmark = async (req, res, next) => {
  const bookmark = await bookmarkService.updateBookmark(
    req.params.id,
    req.body
  );
  responseData(res, 200, bookmark);
};

const deleteBookmark = async (req, res, next) => {
  await bookmarkService.deleteBookmark(req.params.id);
  responseData(res, 200);
};

module.exports = {
  getAllBookmarks,
  getAllBookmarksByUser,
  getAllBookmarksByPost,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
