const RatingRepository = require("../repositories/RatingRepository");

const getAllRatings = () => RatingRepository.getAllRatings();
const getRatingByPostId = (id) => RatingRepository.getRatingByPostId(id);
const createRating = (data) => RatingRepository.createRating(data);
const updateRating = (id, data) => RatingRepository.updateRating(id, data);
const deleteRating = (id) => RatingRepository.deleteRating(id);

module.exports = {
  getAllRatings,
  getRatingByPostId,
  createRating,
  updateRating,
  deleteRating,
};
