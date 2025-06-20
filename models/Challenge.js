const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: String,
    category: String,
    difficulty: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Challenge', challengeSchema);
