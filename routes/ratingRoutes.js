const router = require('express').Router();
const { rateChallenge } = require('../controllers/ratingController');

router.post('/rate', rateChallenge);
module.exports = router;
