const db = require("../config/db");
const { Op } = require("sequelize");

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
