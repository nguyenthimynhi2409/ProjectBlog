const { responseData } = require("../common/responseData");
const postService = require("../services/PostService");

const getAllPosts = async (req, res, next) => {
  const posts = await postService.getAllPosts(req.query);
  responseData(res, 200, { posts, total: posts.length });
};

// Get all post by userId
const getAllPostsByUser = async (req, res, next) => {
  const posts = await postService.getAllPostsByUser(req.params.id);
  responseData(res, 200, { posts, total: posts.length });
};

const getPost = async (req, res, next) => {
  const post = await postService.getPostById(req.params.id);
  responseData(res, 200, post);
};

const createPost = async (req, res, next) => {
  const post = await postService.createPost(req.body);
  responseData(res, 201, post);
};

const updatePost = async (req, res, next) => {
  const post = await postService.updatePost(req.params.id, req.body);
  responseData(res, 200, post);
};

const deletePost = async (req, res, next) => {
  await postService.deletePost(req.params.id);
  responseData(res, 200);
};

module.exports = {
  getAllPosts,
  getAllPostsByUser,
  getPost,
  createPost,
  updatePost,
  deletePost
}