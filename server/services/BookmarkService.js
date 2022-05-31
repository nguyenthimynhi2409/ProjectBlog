const BookmarkRepository = require("../repositories/BookmarkRepository");

exports.getAllBookmarks = () => BookmarkRepository.getAllBookmarks();
exports.getAllBookmarksByUser = (id) => BookmarkRepository.getAllBookmarksByUser(id); 
exports.getBookmarkById = (id) => BookmarkRepository.getBookmarkById(id);
exports.createBookmark = (data) => BookmarkRepository.createBookmark(data);
exports.updateBookmark = (id, data) => BookmarkRepository.updateBookmark(id, data);
exports.deleteBookmark = (id) => BookmarkRepository.deleteBookmark(id);