const BookmarkRepository = require("../repositories/BookmarkRepository");

exports.getAll = () => BookmarkRepository.getAll();
exports.getAllBookmarksByUser = (id) => BookmarkRepository.getAllBookmarksByUser(id); 
exports.getById = (id) => BookmarkRepository.getById(id);
exports.create = (data) => BookmarkRepository.create(data);
exports.update = (id, data) => BookmarkRepository.update(id, data);
exports._delete = (id) => BookmarkRepository.delete(id);