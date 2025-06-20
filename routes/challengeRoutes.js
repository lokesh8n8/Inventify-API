const router = require('express').Router();
const { getRandomChallenge } = require('../controllers/challengeController');

router.get('/random', getRandomChallenge);
module.exports = router;
