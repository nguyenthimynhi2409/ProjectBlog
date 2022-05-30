const { responseData } = require("../common/responseData");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const userService = require("../services/UserService");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  userService
    .getAllUsers()
    .then((users) => responseData(res, 200, { users, total: users.length }))
    .catch(next);
});

exports.getUser = catchAsyncErrors(async (req, res, next) => {
  userService
    .getUserById(req.params.id)
    .then((user) => responseData(res, 200, user))
    .catch(next);
});

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, firstName, lastName, gender, phone, role } = req.body;
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "blog/ava",
    width: 150,
    crop: "scale",
  });
  userService
    .createUser({
      username,
      email,
      firstName,
      lastName,
      gender,
      phone,
      role,
      avatar: myCloud.secure_url,
    })
    .then((user) => responseData(res, 201, user))
    .catch(next);
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  userService
    .updateUser(req.params.id, req.body)
    .then((user) => responseData(res, 200, user))
    .catch(next);
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  userService
    .deleteUser(req.params.id)
    .then(() => responseData(res, 200))
    .catch(next);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  userService
    .login(req.body)
    .then((user) => sendToken(user, 200, res))
    .catch(next);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  responseData(res, 200);
});

// User
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user.id);
  userService
    .getUserById(req.user.id)
    .then((user) => responseData(res, 200, user))
    .catch(next);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  userService
    .updateUser(req.user.id, req.body)
    .then((user) => responseData(res, 200, user))
    .catch(next);
});
