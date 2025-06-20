const Challenge = require('../models/Challenge');
const Rating = require('../models/Rating');

exports.getRandomChallenge = async (req, res) => {
  try {
    // Optional filter by difficulty
    const filter = req.query.difficulty ? { difficulty: req.query.difficulty } : {};

    // Count how many challenges match
    const count = await Challenge.countDocuments(filter);
    if (count === 0) return res.status(404).json({ message: 'No challenges found' });

    // Pick a random one
    const random = Math.floor(Math.random() * count);
    const challenge = await Challenge.findOne(filter).skip(random);


    // Get average rating for this challenge
    const ratings = await Rating.aggregate([
      { $match: { challengeId: challenge._id } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          ratingCount: { $sum: 1 }
        }
      }
    ]);

    const avgRating = ratings[0]?.avgRating || 0;
    const ratingCount = ratings[0]?.ratingCount || 0;

    // Send response
    const challengeObj = challenge.toObject();
    delete challengeObj.__v;
    res.json({
      ...challengeObj,
      avgRating,
      ratingCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getChallengeOfTheDay = async (req, res) => {
  const challenge = await Challenge.findOne({ featured: true });
  res.json(challenge || {});
};


exports.getTopRatedChallenges = async (req, res) => {
  const result = await Rating.aggregate([
    { $group: {
        _id: "$challengeId",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 }
    }},
    { $sort: { avgRating: -1, count: -1 } },
    { $limit: 5 },
    { $lookup: {
        from: "challenges",
        localField: "_id",
        foreignField: "_id",
        as: "challenge"
    }},
    { $unwind: "$challenge" },
    { $project: {
        _id: "$challenge._id",
        title: "$challenge.title",
        category: "$challenge.category",
        avgRating: 1,
        count: 1
    }}
  ]);

  res.json(result);
};

exports.getTags = async (req, res) => {
  const tags = await Challenge.distinct("tags");
  res.json(tags);
};

exports.getChallengesByTag = async (req, res) => {
  const { tag } = req.query;
  if (!tag) return res.status(400).json({ message: "Missing ?tag=" });

  const challenges = await Challenge.find({ tags: tag });
  res.json(challenges);
};


exports.getAllChallenges = async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
};

exports.rateChallenge = async (req, res) => {
  const { rating, comment } = req.body;
  const challengeId = req.params.id;

  const newRating = await Rating.create({
    challengeId,
    rating,
    comment
  });

  res.json(newRating);
};

exports.getChallengeRatings = async (req, res) => {
  const challengeId = req.params.id;

  const [result] = await Rating.aggregate([
    { $match: { challengeId: new mongoose.Types.ObjectId(challengeId) }},
    { $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
        total: { $sum: 1 }
    }}
  ]);

  res.json(result || { avgRating: 0, total: 0 });
};
