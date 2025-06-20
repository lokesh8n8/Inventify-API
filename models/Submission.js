const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge'},
    user: String,
    solutionLink: String,
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', SubmissionSchema);