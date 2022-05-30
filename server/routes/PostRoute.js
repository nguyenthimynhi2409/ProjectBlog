const express = require("express");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllPostsByUser,
} = require("../controllers/PostController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/posts").get(getAllPosts);
router.route("/post/:id").put(updatePost).delete(deletePost);
router.route("/posts/:id").get(getAllPostsByUser);
router.post("/post/new", createPost);

// --Admin
router
  .route("/admin/post/:id")
  .get(isAuthenticatedUser, authorizeRoles(2), getPost);

module.exports = router;
