const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

const gameHistoryControllers = require('../controllers/gameHistoryControllers')

// Show gameHistory from all users
router.get('/', gameHistoryControllers.showAll);

//  Show User GameHistory
router.get('/userHistory', auth, gameHistoryControllers.userHistory)

// Create new User Game 
router.post('/newGame', auth, gameHistoryControllers.newGame)

module.exports = router;
