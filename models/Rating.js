const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  rating: Number,
  comment: String,
  ratedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', RatingSchema);
