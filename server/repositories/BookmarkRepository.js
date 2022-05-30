const db = require("../configs/db");

async function getAll() {
  return await db.bookmarks.findAll();
}

async function getAllBookmarksByUser(id) {
  return await db.bookmarks.findAll({
    where: { userId: id },
    include: [
      {
        model: db.users,
      },
      {
        model: db.posts,
      },
    ],
  });
}

async function getById(id) {
  return await getBookmark(id);
}

async function create(params) {
  const bookmark = new db.bookmarks(params);
  await bookmark.save();
  return bookmark;
}

async function update(id, params) {
  const bookmark = await getBookmark(id);

  // copy params to post and save
  Object.assign(bookmark, params);
  await bookmark.save();
  return bookmark;
}

async function _delete(id) {
  const bookmark = await getBookmark(id);
  await bookmark.destroy();
}

async function getBookmark(id) {
  const bookmark = await db.bookmarks.findByPk(id);
  if (!bookmark) throw "Post not found";
  return bookmark;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllBookmarksByUser,
};
