const Submission = require('../models/Submission');

exports.submitSolution = async (req, res) => {
  const { challengeId, user, solutionLink } = req.body;
  const submission = await Submission.create({ challengeId, user, solutionLink });
  res.json(submission);
};
