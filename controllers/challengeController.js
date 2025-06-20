const Challenge = require('../models/Challenge');

exports.getRandomChallenge = async (req, res) => {
  const filter = req.query.difficulty ? { difficulty: req.query.difficulty } : {};
  const count = await Challenge.countDocuments(filter);
  const random = Math.floor(Math.random() * count);
  const challenge = await Challenge.findOne(filter).skip(random);
  res.json(challenge);
};
