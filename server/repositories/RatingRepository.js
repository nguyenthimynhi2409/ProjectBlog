const db = require("../configs/db");

async function getAll() {
  return await db.ratings.findAll();
}

// Get rating of the post by postId
async function getByPostId(id) {
  const ratings = await db.ratings.findAll({ where: { postId: id } });
  let sum = 0;
  ratings.map((rating) => {
    sum += rating.rate;
    return sum/(ratings.length);
  });
  return sum;
}

// Rate a post
async function create(params) {
  const rating = new db.ratings(params);
  await rating.save();
  return rating;
}

async function update(id, params) {
  const rating = await getRating(id);

  // copy params to post and save
  Object.assign(rating, params);
  await rating.save();
  return rating;
}

async function _delete(id) {
  const rating = await getRating(id);
  await rating.destroy();
}

async function getRating(id) {
  const rating = await db.ratings.findByPk(id);
  if (!rating) throw "Rating not found";
  return rating;
}

module.exports = {
  getAll,
  getByPostId,
  create,
  update,
  delete: _delete,
};
