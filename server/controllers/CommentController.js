const { responseData } = require("../common/responseData");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const commentService = require("../services/CommentService");

exports.getAllComments = catchAsyncErrors(async (req, res, next) => {
  const comments = await commentService.getAllComments();
  responseData(res, 200, { comments, total: comments.length });
});

// Get comment of a post bt postId
exports.getCommentsByPostId = catchAsyncErrors(async (req, res, next) => {
  const comments = await commentService.getCommentsByPostId(req.params.id);
  responseData(res, 200, comments);
});

exports.createComment = catchAsyncErrors(async (req, res, next) => {
  const comment = await commentService.createComment(req.body);
  responseData(res, 201, comment);
});

exports.updateComment = catchAsyncErrors(async (req, res, next) => {
  const comment = await commentService.updateComment(req.params.id, req.body);
  responseData(res, 200, comment);
});

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  await commentService.deleteComment(req.params.id)
  responseData(res, 200);
});
