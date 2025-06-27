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

/**
 * @swagger
 * /challenge/random:
 *   get:
 *     summary: Get a random challenge
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Random challenge with ratings
 */
router.get('/random', getRandomChallenge);

/**
 * @swagger
 * /challenge/of-the-day:
 *   get:
 *     summary: Get the challenge of the day
 *     responses:
 *       200:
 *         description: Featured challenge of the day
 */
router.get('/of-the-day', getChallengeOfTheDay);

/**
 * @swagger
 * /challenge/top:
 *   get:
 *     summary: Get top-rated challenges
 *     responses:
 *       200:
 *         description: Top challenges based on rating
 */
router.get('/top', getTopRatedChallenges);

/**
 * @swagger
 * /challenge/tags:
 *   get:
 *     summary: Get all challenge tags
 *     responses:
 *       200:
 *         description: List of tags
 */
router.get('/tags', getTags);

/**
 * @swagger
 * /challenge/all:
 *   get:
 *     summary: Get all challenges
 *     responses:
 *       200:
 *         description: List of all challenges
 */
router.get('/all', getAllChallenges);

/**
 * @swagger
 * /challenge/{id}/ratings:
 *   get:
 *     summary: Get rating summary for a challenge
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Average rating and count
 */
router.get('/:id/ratings', getChallengeRatings);

/**
 * @swagger
 * /challenge/{id}/rate:
 *   post:
 *     summary: Submit a rating
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rating submitted
 */
router.post('/:id/rate', rateChallenge);

/**
 * @swagger
 * /challenge:
 *   get:
 *     summary: Get challenges by tag
 *     parameters:
 *       - in: query
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of challenges filtered by tag
 */
router.get('/', getChallengesByTag);

// ✅ Export should be at the very end
module.exports = router;
