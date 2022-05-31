const { responseData } = require("../common/responseData");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ratingService = require("../services/RatingService");

exports.getAllRatings = catchAsyncErrors(async (req, res, next) => {
  const ratings = await ratingService.getAllRatings();
  responseData(res, 200, { ratings, total: ratings.length });
});

// Get rating by postId
exports.getRating = catchAsyncErrors(async (req, res, next) => {
  const rating = await ratingService.getRatingByPostId(req.params.id);
  responseData(res, 200, rating);
});

// Rate a post
exports.createRating = catchAsyncErrors(async (req, res, next) => {
  const rating = await ratingService.createRating(req.body);
  responseData(res, 201, rating);
});

exports.updateRating = catchAsyncErrors(async (req, res, next) => {
  const rating = await ratingService.updateRating(req.params.id, req.body);
  responseData(res, 200, rating);
});

exports.deleteRating = catchAsyncErrors(async (req, res, next) => {
  await ratingService.deleteRating(req.params.id);
  responseData(res, 200);
});
