const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

const GamesHistory = require('../models/GamesHistory')

// MOSTRAR TODOS LOS HISTORIALES
router.get('/', async (req, res, next) => {
  try {
    const history = await GamesHistory.find({});
    res.status(200).json(history)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/newGame', auth, async (req, res) => {
  try {
    const {games, finalResult, userId} = req.body;

    const newGame = GamesHistory.create({
      games: games,
      finalResult: finalResult,
      userId: userId
    })
    console.log(newGame)
    res.status(200).json(newGame)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
