const db = require("../config/db");
const User = db.users;
const { Joi } = require("sequelize-joi");
const ErrorHander = require("../utils/errorHandler");

const validateUser = (req, res, next) => {
  const userSchema = Joi.object({
    username: Joi.string().trim().required().alphanum().min(2).max(30),
    email: Joi.string().trim().required().email(),
    firstName: Joi.string().required().alphanum().min(2).max(30),
    lastName: Joi.string().required().alphanum().min(2).max(30),
    password: Joi.string().trim().required().min(4),
    gender: Joi.string().required(),
    phone: Joi.string().regex(/^\d+$/).min(10),
    role: Joi.number(),
    avatar: Joi.string(),
  });
  validateRequest(req, next, userSchema);
};

const validatePost = (req, res, next) => {
  const userSchema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    coverImage: Joi.string().required(),
    status: Joi.string(),
    description: Joi.string().trim(),
  });
  validateRequest(req, next, userSchema);
};

const validateComment = (req, res, next) => {
  const userSchema = Joi.object({
    content: Joi.string().trim().required(),
  });
  validateRequest(req, next, userSchema);
};

const validateRating = (req, res, next) => {
  const userSchema = Joi.object({
    rating: Joi.number(),
  });
  validateRequest(req, next, userSchema);
};

const validateRequest = (req, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return next(
      new ErrorHander(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`,
        500
      )
    );
  } else {
    req.body = value;
    next();
  }
};

module.exports = {
  validateUser,
  validatePost,
  validateComment,
  validateRating,
};
