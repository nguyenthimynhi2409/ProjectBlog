const bcrypt = require("bcryptjs");
const { responseData } = require("../common/responseData");
const db = require("../config/db");
const { getAllBookmarksByUser } = require("./BookmarkRepository");
const { getCommentsByUserId } = require("./CommentRepository");
const { getAllPostsByUser, deletePost } = require("./PostRepository");
const { getAllRatingsByUserId } = require("./RatingRepository");

async function getAllUsers() {
  return await db.users.findAll({
    where: { deletedAt: null }
  });
}

async function getUserById(id) {
  return await getUser(id);
}

async function createUser(params) {
  // validate
  if (await db.users.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is already registered';
  }
  let user = new db.users(params);
  // hash password
  user.password = await bcrypt.hashSync(params.password, 10);

  // save user
  await user.save();
  return user;
}

// --Admin
async function updateUser(id, params) {
  const user = await getUser(id);

  // validate
  const emailChanged = params.email && user.email !== params.email;
  if (
    emailChanged &&
    (await db.users.findOne({ where: { email: params.email } }))
  ) {
    throw 'Email "' + params.email + '" is already registered';
  }

  // hash password if it was entered
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();
  return user;
}

async function deleteUser(id) {
  const user = await getUser(id);
  const posts = await getAllPostsByUser(id);
  const bookmarks = await getAllBookmarksByUser(id);
  const ratings = await getAllRatingsByUserId(id);
  const comments = await getCommentsByUserId(id);
  
  // If user has no post, comment, rating, bookmark => delete user
  // Else update user (username mark to "banned", deletedAt) and delete all posts and bookmarks, comments, rating of the posts

  if (
    posts.length == 0 &&
    bookmarks.length == 0 &&
    ratings.length == 0 &&
    comments.length == 0
  )
    await user.destroy();
  else {
    await updateUser(id, {
      username: user.username + "-banned",
      deletedAt: new Date(),
    });
    posts.map(async (post) => await deletePost(post.id));
  }
}

async function getUser(id) {
  const user = await db.users.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

// Compare password
function comparePassword(password, user) {
  return bcrypt.compare(password, user.password);
}

async function forgotPassword(data) {
  const user = await db.users.findOne({ where: { email: data } });

  if (!user) {
    throw 'Email "' + data + '" is invalid';
  }

  // send password to email
  const newPassword = Math.floor(1000 + Math.random() * 9000).toString();
  const hashPassword = await bcrypt.hash(newPassword, 10);
  console.log(newPassword);
  Object.assign(user, {
    password: hashPassword.toString(),
  });
  await user.save();
  return {
    newPassword,
    user,
  };
}

async function updatePassword(id, data) {
  const user = await getUser(id);

  // hash password if it was entered
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  // copy params to user and save
  Object.assign(user, params);
  await user.save();
  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
  updatePassword,
};
