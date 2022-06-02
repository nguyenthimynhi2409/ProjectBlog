const PostRepository = require("../repositories/PostRepository");

exports.getAllPosts = (data) => PostRepository.getAllPosts(data);
exports.getPostById = (id) => PostRepository.getPostById(id);
exports.createPost = (data) => PostRepository.createPost(data);
exports.updatePost = (id, data) => PostRepository.updatePost(id, data);
exports.deletePost = (id) => PostRepository.deletePost(id);
exports.getAllPostsByUser = (id) => PostRepository.getAllPostsByUser(id);