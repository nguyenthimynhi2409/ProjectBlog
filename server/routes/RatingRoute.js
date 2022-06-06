const {
  getAllRatings,
  getRating,
  createRating,
  updateRating,
  deleteRating,
} = require("../controllers/RatingController");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { validateRating } = require("../middlewares/validate");

module.exports = function (app) {
  app.route("/ratings").get(catchAsyncErrors(getAllRatings));
  app
    .route("/rating/:id")
    .get(catchAsyncErrors(getRating))
    .put(validateRating, catchAsyncErrors(updateRating))
    .delete(catchAsyncErrors(deleteRating));
  app.route("/rating/new").post(validateRating, catchAsyncErrors(createRating));
};
