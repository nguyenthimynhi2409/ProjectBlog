const RatingRepository = require("../repositories/RatingRepository");

exports.getAllRatings = () => RatingRepository.getAllRatings();
exports.getRatingByPostId = (id) => RatingRepository.getRatingByPostId(id);
exports.createRating = (data) => RatingRepository.createRating(data);
exports.updateRating = (id, data) => RatingRepository.updateRating(id, data);
exports.deleteRating = (id) => RatingRepository.deleteRating(id);