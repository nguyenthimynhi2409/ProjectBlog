const { responseData } = require("../common/responseData");
const authService = require("../services/AuthService");
const sendToken = require("../utils/jwtToken");

const signIn = async (req, res, next) => {
  const user = await authService.signIn(req.body);
  sendToken(user, 200, res);
};

const signOut = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  responseData(res, 200);
};

const signUp = async (req, res, next) => {
  const { username, email, firstName, lastName, gender, phone, password } =
    req.body;

  const user = await authService.signUp({
    username,
    email,
    firstName,
    lastName,
    gender,
    phone,
    password,
  });
  responseData(res, 201, user);
};

module.exports = {
  signIn,
  signUp,
  signOut,
};
