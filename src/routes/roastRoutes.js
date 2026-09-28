const express = require('express');
const router = express.Router();
const roastController = require('../controllers/roastController');

// GET /api/roast/:name/:tag?region=na
router.get('/:name/:tag', (req, res) => roastController.getPlayerRoast(req, res));

module.exports = router;
