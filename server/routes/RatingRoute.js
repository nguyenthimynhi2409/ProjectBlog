const express = require("express");
const {
  getAllRatings,
  getRating,
  createRating,
  updateRating,
  deleteRating,
} = require("../controllers/RatingController");
const router = express.Router();

router.route("/ratings").get(getAllRatings);
router
  .route("/rating/:id")
  .get(getRating)
  .put(updateRating)
  .delete(deleteRating);
router.route("/rating/new").post(createRating);

module.exports = router;
