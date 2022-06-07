const db = require("../config/db");

async function getAllComments() {
  return await db.comments.findAll();
}

async function getCommentsByPostId(id) {
  return await db.comments.findAll({ where: { postId: id } });
}

async function getCommentsByUserId(id) {
  return await db.comments.findAll({ where: { userId: id } });
}

async function createComment(params) {
  const comment = new db.comments(params);
  await comment.save();
  return comment;
}

async function updateComment(id, params) {
  const comment = await getComment(id);

  // copy params to post and save
  Object.assign(comment, params);
  await comment.save();
  return comment;
}

async function deleteComment(id) {
  const comment = await getComment(id);
  await comment.destroy();
}

async function getComment(id) {
  const comment = await db.comments.findByPk(id);
  if (!comment) throw "Comment not found";
  return comment;
}

module.exports = {
  getAllComments,
  getCommentsByPostId,
  getCommentsByUserId,
  createComment,
  updateComment,
  deleteComment,
};
