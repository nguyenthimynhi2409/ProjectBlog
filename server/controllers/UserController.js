const { responseData } = require("../common/responseData");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const userService = require("../services/UserService");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await userService.getAllUsers();
  responseData(res, 200, { users, total: users.length });
});

exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);
  responseData(res, 200, user);
});

// --Admin
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, firstName, lastName, gender, phone, role, password } =
    req.body;

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "blog/ava",
    width: 150,
    crop: "scale",
  });

  const user = await userService.createUser({
    username,
    email,
    firstName,
    lastName,
    gender,
    phone,
    role,
    password
    avatar: myCloud.secure_url,
  });
  responseData(res, 201, user);
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.updateUser(req.params.id, req.body);
  responseData(res, 200, user);
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  responseData(res, 200);
});

exports.signIn = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.signIn(req.body);
  sendToken(user, 200, res);
});

exports.signOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  responseData(res, 200);
});

exports.signUp = catchAsyncErrors(async (req, res, next) => {
  const { username, email, firstName, lastName, gender, phone, password } = req.body;
  
  const user = await userService.signUp({
    username,
    email,
    firstName,
    lastName,
    gender,
    phone,
    password,
  });
  responseData(res, 201, user);
});

// User
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);
  responseData(res, 200, user);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.updateUser(req.user.id, req.body);
  responseData(res, 200, user);
});
