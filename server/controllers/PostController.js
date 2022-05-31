const { responseData } = require("../common/responseData");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const postService = require("../services/PostService");

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  postService
    .getAllPosts(req.query)
    .then((posts) => responseData(res, 200, { posts, total: posts.length }))
    .catch(next);
});

// Get all post by userId
exports.getAllPostsByUser = catchAsyncErrors(async (req, res, next) => {
  postService
    .getAllPostsByUser(req.params.id)
    .then((posts) => responseData(res, 200, { posts, total: posts.length }))
    .catch(next);
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  postService
    .getPostById(req.params.id)
    .then((post) => responseData(res, 200, post))
    .catch(next);
});

exports.createPost = catchAsyncErrors(async (req, res, next) => {
  postService
    .createPost(req.body)
    .then((post) => responseData(res, 201, post))
    .catch(next);
});

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
  postService
    .updatePost(req.params.id, req.body)
    .then((post) => responseData(res, 200, post))
    .catch(next);
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  postService
    .deletePost(req.params.id)
    .then(() => responseData(res, 200))
    .catch(next);
});
