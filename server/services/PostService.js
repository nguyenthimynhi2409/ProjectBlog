const PostRepository = require("../repositories/PostRepository");

const getAllPosts = (data) => PostRepository.getAllPosts(data);
const getPostById = (id) => PostRepository.getPostById(id);
const createPost = (data) => PostRepository.createPost(data);
const updatePost = (id, data) => PostRepository.updatePost(id, data);
const deletePost = (id) => PostRepository.deletePost(id);
const getAllPostsByUser = (id) => PostRepository.getAllPostsByUser(id);

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllPostsByUser,
};
