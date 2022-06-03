const bcrypt = require("bcryptjs");
const db = require("../config/db");
const ErrorHander = require("../utils/errorHandler");

// Compare password
function comparePassword(password, user) {
  return bcrypt.compare(password, user.password);
}

async function signIn(params) {
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

async function signUp(params) {
  // validate
  if (await db.users.findOne({ where: { email: params.email } })) {
    throw new ErrorHander(`Email ${params.email} is already registered`, 500);
  }

  let user = new db.users(params);

  // hash password
  user.password = await bcrypt.hash(params.password, 10);

  if (user.gender == "female")
    user.avatar =
      "https://res.cloudinary.com/dn1b78bjj/image/upload/v1653539865/Blog/ava/female_aduxuv.png";
  else
    user.avatar =
      "https://res.cloudinary.com/dn1b78bjj/image/upload/v1653539862/Blog/ava/male_efvtl4.png";

  // save user
  await user.save();
  return user;
}

module.exports = {
  signIn,
  signUp,
};
