const { responseData } = require("../common/responseData");
const ratingService = require("../services/RatingService");

const getAllRatings = async (req, res, next) => {
  const ratings = await ratingService.getAllRatings();
  responseData(res, 200, { ratings, total: ratings.length });
};

// Get rating by postId
const getRating = async (req, res, next) => {
  const rating = await ratingService.getRatingByPostId(req.params.id);
  responseData(res, 200, rating);
};

// Rate a post
const createRating = async (req, res, next) => {
  const rating = await ratingService.createRating(req.body);
  responseData(res, 201, rating);
};

const updateRating = async (req, res, next) => {
  const rating = await ratingService.updateRating(req.params.id, req.body);
  responseData(res, 200, rating);
};

const deleteRating = async (req, res, next) => {
  await ratingService.deleteRating(req.params.id);
  responseData(res, 200);
};

module.exports = {
  getAllRatings,
  getRating,
  createRating,
  updateRating,
  deleteRating,
};
