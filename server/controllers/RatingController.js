const { responseData } = require("../common/responseData");
const ratingService = require("../services/RatingService");

exports.getAllRatings = (req, res, next) => {
  ratingService
    .getAll()
    .then((ratings) =>
      responseData(res, 200, { ratings, total: ratings.length })
    )
    .catch(next);
};
// Get rating by postId
exports.getRating = (req, res, next) => {
  ratingService
    .getByPostId(req.params.id)
    .then((rating) => responseData(res, 200, rating))
    .catch(next);
};

// Rate a post
exports.createRating = (req, res, next) => {
  ratingService
    .create(req.body)
    .then((rating) => responseData(res, 201, rating))
    .catch(next);
};

exports.updateRating = (req, res, next) => {
  ratingService
    .update(req.params.id, req.body)
    .then((rating) => responseData(res, 200, rating))
    .catch(next);
};

exports.deleteRating = (req, res, next) => {
  ratingService
    ._delete(req.params.id)
    .then(() => responseData(res, 200))
    .catch(next);
};
