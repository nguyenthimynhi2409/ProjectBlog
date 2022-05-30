const bcrypt = require("bcryptjs");
const { responseData } = require("../common/responseData");
const db = require("../configs/db");

async function getAllUsers() {
  return await db.users.findAll();
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
  await user.destroy();
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

async function login(params) {
  const username = params.username;
  const password = params.password;
  // checking if user has given password and email both
  if (!username || !password) {
    return "Please Enter Username & Password";
  }

  const user = await db.users.findOne({ where: { username: username } });

  if (!user) {
    return "Invalid username or password";
  }

  const isPasswordMatched = comparePassword(password, user);

  if (!isPasswordMatched) {
    return "Invalid username or password";
  }
  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};

