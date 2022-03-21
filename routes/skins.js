var express = require('express');
var router = express.Router();

var skinsControllers = require('../controllers/skinsControllers')

// Show all skins
router.get('/', skinsControllers.showSkins);

// Create new skin
router.post('/newSkin', skinsControllers.createSkin);

module.exports = router