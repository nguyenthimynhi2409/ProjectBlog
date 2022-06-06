const { responseData } = require("../common/responseData");
const userService = require("../services/UserService");
const cloudinary = require("cloudinary");
const ErrorHander = require("../utils/errorHandler");
const { sendEmail } = require("../utils/sendEmail");

const getAllUsers = async (req, res, next) => {
  const users = await userService.getAllUsers();
  responseData(res, 200, { users, total: users.length });
};

const getUser = async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);
  responseData(res, 200, user);
};

// --Admin
const createUser = async (req, res, next) => {
  const {
    username,
    email,
    firstName,
    lastName,
    gender,
    phone,
    role,
    password,
  } = req.body;

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
    password,
    avatar: myCloud.secure_url,
  });
  responseData(res, 201, user);
};

const updateUser = async (req, res, next) => {
  const user = await userService.updateUser(req.params.id, req.body);
  responseData(res, 200, user);
};

const deleteUser = async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  responseData(res, 200);
};

// User
const userDetails = async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);
  responseData(res, 200, user);
};

const updateProfile = async (req, res, next) => {
  const user = await userService.updateUser(req.user.id, req.body);
  responseData(res, 200, user);
};

// Enter email to receive new password
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const data = await userService.forgotPassword(email);
  const message = `Your password reset is: ${data.newPassword} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: data.user.email,
      subject: `Reset Password Blog`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${data.user.email} successfully`,
    });
  } catch (error) {
    return next(new ErrorHander(error.message, 500));
  }
};

// Change password (signed in)
const updatePassword = async (req, res, next) => {
  const { id, password } = req.body;
  await userService.updatePassword(id, password);
  responseData(res, 201);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userDetails,
  updateProfile,
  forgotPassword,
  updatePassword,
};
