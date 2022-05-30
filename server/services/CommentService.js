const CommentRepository = require("../repositories/CommentRepository");

exports.getAll = () => CommentRepository.getAll();
exports.getByPostId = (id) => CommentRepository.getByPostId(id);
exports.create = (data) => CommentRepository.create(data);
exports.update = (id, data) => CommentRepository.update(id, data);
exports._delete = (id) => CommentRepository.delete(id);