const express = require("express");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllPostsByUser,
} = require("../controllers/PostController");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { validatePost } = require("../middlewares/validate");

module.exports = function (app) {
  app.route("/posts").get(catchAsyncErrors(getAllPosts));
  app
    .route("/post/:id")
    .put(validatePost, catchAsyncErrors(updatePost))
    .delete(catchAsyncErrors(deletePost));
  app.route("/posts/:id").get(catchAsyncErrors(getAllPostsByUser));
  app.post("/post/new", validatePost, catchAsyncErrors(createPost));

  // --Admin
  app
    .route("/admin/post/:id")
    .get(isAuthenticatedUser, authorizeRoles(2), catchAsyncErrors(getPost));
};
