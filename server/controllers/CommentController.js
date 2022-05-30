const { responseData } = require("../common/responseData");
const commentService = require("../services/CommentService");

exports.getAllComments = (req, res, next) => {
  commentService
    .getAll()
    .then((comments) =>
      responseData(res, 200, { comments, total: comments.length })
    )
    .catch(next);
};

// Get comment of a post bt postId
exports.getCommentsByPostId = (req, res, next) => {
  commentService
    .getByPostId(req.params.id)
    .then((comment) => responseData(res, 200, comment))
    .catch(next);
};

exports.createComment = (req, res, next) => {
  commentService
    .create(req.body)
    .then((comment) => responseData(res, 201, comment))
    .catch(next);
};

exports.updateComment = (req, res, next) => {
  commentService
    .update(req.params.id, req.body)
    .then((comment) => responseData(res, 200, comment))
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  commentService
    ._delete(req.params.id)
    .then(() => responseData(res, 200))
    .catch(next);
};
