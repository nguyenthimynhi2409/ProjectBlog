const db = require("../config/db");
const { Op } = require("sequelize");
const { getAllBookmarksByPost } = require("./BookmarkRepository");
const {
  getRatingByPostId,
  getAllRatingsByPostId,
} = require("./RatingRepository");
const { getCommentsByPostId } = require("./CommentRepository");

async function getAllPosts(query) {
  const keyword = "%" + `${query.keyword}` + "%";
  console.log(keyword);
  if (query.keyword !== undefined)
    return await db.posts.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: keyword,
            },
          },
        ],
      },
      include: {
        model: db.users,
      },
    });
  else {
    return await db.posts.findAll({
      include: {
        model: db.users,
      },
    });
  }
}

// Get all posts by userId
async function getAllPostsByUser(id) {
  return await db.posts.findAll({
    where: { userId: id },
    include: {
      model: db.users,
    },
  });
}

async function getPostById(id) {
  return await getPost(id);
}

async function createPost(params) {
  const post = new db.posts(params);
  await post.save();
  return post;
}

async function updatePost(id, params) {
  const post = await getUser(id);

  // copy params to post and save
  Object.assign(post, params);
  await post.save();
  return post;
}

async function deletePost(id) {
  const post = await getPost(id);
  const bookmarks = await getAllBookmarksByPost(id);
  const ratings = await getAllRatingsByPostId(id);
  const comments = await getCommentsByPostId(id);

  if (bookmarks.length !== 0)
    await db.bookmarks.destroy({
      where: {
        id: [bookmarks.map((bookmark) => bookmark.id)],
      },
    });
  if (ratings.length !== 0)
    await db.ratings.destroy({
      where: {
        id: [ratings.map((rating) => rating.id)],
      },
    });
  if (comments.length !== 0)
    await db.comments.destroy({
      where: {
        id: [comments.map((comment) => comment.id)],
      },
    });
  // Notes: transaction
  // Delete all ratings, comments, bookmarks of the post
  // Then delete post
  await post.destroy();
}

async function getPost(id) {
  const post = await db.posts.findByPk(id, {
    include: {
      model: db.users,
    },
  });
  if (!post) throw "Post not found";
  return post;
}

module.exports = {
  getAllPosts,
  getAllPostsByUser,
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
