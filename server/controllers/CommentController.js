const { responseData } = require("../common/responseData");
const commentService = require("../services/CommentService");

const getAllComments = async (req, res, next) => {
  const comments = await commentService.getAllComments();
  responseData(res, 200, { comments, total: comments.length });
};

// Get comment of a post bt postId
const getCommentsByPostId = async (req, res, next) => {
  const comments = await commentService.getCommentsByPostId(req.params.id);
  responseData(res, 200, comments);
};

const createComment = async (req, res, next) => {
  const comment = await commentService.createComment(req.body);
  responseData(res, 201, comment);
};

const updateComment = async (req, res, next) => {
  const comment = await commentService.updateComment(req.params.id, req.body);
  responseData(res, 200, comment);
};

const deleteComment = async (req, res, next) => {
  await commentService.deleteComment(req.params.id);
  responseData(res, 200);
};

module.exports = {
  getAllComments,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
