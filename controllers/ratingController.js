const Rating = require('../models/Rating');

exports.rateChallenge = async (req, res) => {
  const { challengeId, rating, comment } = req.body;
  const newRating = await Rating.create({ challengeId, rating, comment });
  res.json(newRating);
};
