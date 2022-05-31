const CommentRepository = require("../repositories/CommentRepository");

exports.getAllComments = () => CommentRepository.getAllComments();
exports.getCommentsByPostId = (id) => CommentRepository.getCommentsByPostId(id);
exports.createComment = (data) => CommentRepository.createComment(data);
exports.updateComment = (id, data) => CommentRepository.updateComment(id, data);
exports.deleteComment = (id) => CommentRepository.deleteComment(id);