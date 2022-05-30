const express = require("express");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/PostController");
const router = express.Router();

router.route("/posts").get(getAllPosts);
router.route("/post/:id").get(getPost).put(updatePost).delete(deletePost);
router.post("/post/new", createPost);

module.exports = router;
