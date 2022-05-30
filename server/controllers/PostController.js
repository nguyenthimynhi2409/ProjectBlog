const { responseData } = require("../common/responseData");
const postService = require("../services/PostService");

exports.getAllPosts = (req, res, next) => {
  postService
    .getAll()
    .then((posts) => responseData(res, 200, { posts, total: posts.length }))
    .catch(next);
};

// Get all post by userId
exports.getAllPostsByUser = (req, res, next) => {
  postService
    .getAllPostsByUser(req.params.id)
    .then((posts) => responseData(res, 200, { posts, total: posts.length }))
    .catch(next);
};

exports.getPost = (req, res, next) => {
  postService
    .getById(req.params.id)
    .then((post) => responseData(res, 200, post))
    .catch(next);
};

exports.createPost = (req, res, next) => {
  postService
    .create(req.body)
    .then((post) => responseData(res, 201, post))
    .catch(next);
};

exports.updatePost = (req, res, next) => {
  postService
    .update(req.params.id, req.body)
    .then((post) => responseData(res, 200, post))
    .catch(next);
};

exports.deletePost = (req, res, next) => {
  postService
    ._delete(req.params.id)
    .then(() => responseData(res, 200))
    .catch(next);
};
