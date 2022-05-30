const jwt = require("jsonwebtoken");
const db = require("../configs/db");
const User = db.users;
const ErrorHander = require("../utils/errorHandler");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander ("Please login to access", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData.id);
  req.user = await User.findByPk(decodedData.id);

  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander (
          `Role: ${req.user.role} is not allowed to access `,
          403
        )
      );
    }

    next();
  };
};