const PostRepository = require("../repositories/PostRepository");

exports.getAll = () => PostRepository.getAll();
exports.getById = (id) => PostRepository.getById(id);
exports.create = (data) => PostRepository.create(data);
exports.update = (id, data) => PostRepository.update(id, data);
exports._delete = (id) => PostRepository.delete(id);
exports.getAllPostsByUser = (id) => PostRepository.getAllPostsByUser(id);