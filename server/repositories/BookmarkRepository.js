const db = require("../configs/db");

async function getAllBookmarks() {
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

async function getBookmarkById(id) {
  return await getBookmark(id);
}

async function createBookmark(params) {
  const bookmark = new db.bookmarks(params);
  await bookmark.save();
  return bookmark;
}

async function updateBookmark(id, params) {
  const bookmark = await getBookmark(id);

  // copy params to post and save
  Object.assign(bookmark, params);
  await bookmark.save();
  return bookmark;
}

async function deleteBookmark(id) {
  const bookmark = await getBookmark(id);
  await bookmark.destroy();
}

async function getBookmark(id) {
  const bookmark = await db.bookmarks.findByPk(id);
  if (!bookmark) throw "Post not found";
  return bookmark;
}

module.exports = {
  getAllBookmarks,
  getAllBookmarksByUser,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark
};
