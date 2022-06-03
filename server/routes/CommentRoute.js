const {
  getAllComments,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

module.exports = function (app) {
  app.route("/comments").get(catchAsyncErrors(getAllComments));
  app
    .route("/comment/:id")
    .get(catchAsyncErrors(getCommentsByPostId))
    .put(catchAsyncErrors(updateComment))
    .delete(catchAsyncErrors(deleteComment));
  app.route("/comment/new").post(catchAsyncErrors(createComment));
};
