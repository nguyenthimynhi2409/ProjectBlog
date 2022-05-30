const RatingRepository = require("../repositories/RatingRepository");

exports.getAll = () => RatingRepository.getAll();
exports.getByPostId = (id) => RatingRepository.getByPostId(id);
exports.create = (data) => RatingRepository.create(data);
exports.update = (id, data) => RatingRepository.update(id, data);
exports._delete = (id) => RatingRepository.delete(id);