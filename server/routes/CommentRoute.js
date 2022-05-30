const express = require("express");
const {
  getAllComments,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");
const router = express.Router();

router.route("/comments").get(getAllComments);
router
  .route("/comment/:id")
  .get(getCommentsByPostId)
  .put(updateComment)
  .delete(deleteComment);
router.route("/comment/new").post(createComment);

module.exports = router;
