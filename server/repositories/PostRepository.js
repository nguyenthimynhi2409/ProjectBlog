const db = require("../configs/db");
const { getUserById } = require("../services/UserService");

async function getAll() {
  return await db.posts.findAll({
    include: {
      model: db.users
    },
  });
}

async function getById(id) {
  return await getPost(id);
}

async function create(params) {
  const post = new db.posts(params);
  console.log(db.posts);
  await post.save();
  return post;
}

async function update(id, params) {
  const post = await getPost(id);

  // copy params to post and save
  Object.assign(post, params);
  await post.save();
  return post;
}

async function _delete(id) {
  const post = await getPost(id);
  await post.destroy();
}

async function getPost(id) {
  const post = await db.posts.findByPk(id);
  if (!post) throw "Post not found";
  return post;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
