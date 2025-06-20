const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: String,
    category: String,
    difficulty: String,
    tags: [String],
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
},{
    versionKey: false
});

module.exports = mongoose.model('Challenge', challengeSchema);
