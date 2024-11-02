const express = require('express');
const { incrementScore } = require('../controllers/playerController');
const router = express.Router();

router.post('/click', incrementScore);


module.exports = router;
