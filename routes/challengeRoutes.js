const router = require('express').Router();
const {
  getChallengeOfTheDay,
  getTopRatedChallenges,
  getTags,
  getChallengesByTag,
  getRandomChallenge,
  getAllChallenges,
  rateChallenge,
  getChallengeRatings
} = require('../controllers/challengeController');


router.get('/random', getRandomChallenge);
module.exports = router;

router.get('/of-the-day', getChallengeOfTheDay);
router.get('/top', getTopRatedChallenges);
router.get('/tags', getTags);
router.get('/all', getAllChallenges);
router.get('/random', getRandomChallenge);
router.get('/:id/ratings', getChallengeRatings);
router.post('/:id/rate', rateChallenge);
router.get('/', getChallengesByTag); // for ?tag=xyz
