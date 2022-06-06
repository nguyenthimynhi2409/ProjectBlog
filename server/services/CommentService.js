const CommentRepository = require("../repositories/CommentRepository");

const getAllComments = () => CommentRepository.getAllComments();
const getCommentsByPostId = (id) => CommentRepository.getCommentsByPostId(id);
const createComment = (data) => CommentRepository.createComment(data);
const updateComment = (id, data) => CommentRepository.updateComment(id, data);
const deleteComment = (id) => CommentRepository.deleteComment(id);

module.exports = {
  getAllComments,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
