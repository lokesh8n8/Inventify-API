const router = require('express').Router();
const { submitSolution } = require('../controllers/submissionController');

router.post('/submit', submitSolution);
module.exports = router;
