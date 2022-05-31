const { responseData } = require("../common/responseData");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const postService = require("../services/PostService");

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const posts = await postService.getAllPosts(req.query);
  responseData(res, 200, { posts, total: posts.length });
});

// Get all post by userId
exports.getAllPostsByUser = catchAsyncErrors(async (req, res, next) => {
  const posts = await postService.getAllPostsByUser(req.params.id);
  responseData(res, 200, { posts, total: posts.length });
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  const post = await postService.getPostById(req.params.id);
  responseData(res, 200, post);
});

exports.createPost = catchAsyncErrors(async (req, res, next) => {
  const post = await postService.createPost(req.body);
  responseData(res, 201, post);
});

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
  const post = await postService.updatePost(req.params.id, req.body);
  responseData(res, 200, post);
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  await postService.deletePost(req.params.id);
  responseData(res, 200);
});
