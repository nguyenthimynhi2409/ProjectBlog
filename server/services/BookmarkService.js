const BookmarkRepository = require("../repositories/BookmarkRepository");

const getAllBookmarks = () => BookmarkRepository.getAllBookmarks();
const getAllBookmarksByUser = (id) => BookmarkRepository.getAllBookmarksByUser(id);
const getAllBookmarksByPost = (id) => BookmarkRepository.getAllBookmarksByPost(id);
const getBookmarkById = (id) => BookmarkRepository.getBookmarkById(id);
const createBookmark = (data) => BookmarkRepository.createBookmark(data);
const updateBookmark = (id, data) => BookmarkRepository.updateBookmark(id, data);
const deleteBookmark = (id) => BookmarkRepository.deleteBookmark(id);

module.exports = {
  getAllBookmarks,
  getAllBookmarksByUser,
  getAllBookmarksByPost,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
