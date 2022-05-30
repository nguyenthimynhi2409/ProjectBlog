const db = require("../configs/db");

async function getAll() {
  return await db.comments.findAll();
}

async function getByPostId(id) {
  return await db.comments.findAll({ where: { postId: id } });
}

async function create(params) {
  const comment = new db.comments(params);
  await comment.save();
  return comment;
}

async function update(id, params) {
  const comment = await getComment(id);

  // copy params to post and save
  Object.assign(comment, params);
  await comment.save();
  return comment;
}

async function _delete(id) {
  const comment = await getComment(id);
  await comment.destroy();
}

async function getComment(id) {
  const comment = await db.comments.findByPk(id);
  if (!comment) throw "Comment not found";
  return comment;
}

module.exports = {
  getAll,
  getByPostId,
  create,
  update,
  delete: _delete,
};
