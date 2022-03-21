const GamesHistory = require('../models/GamesHistory');

// 
// Show gameHistory from all users
// 
exports.showAll = async (req, res, next) => {
    try {
      const history = await GamesHistory.find({});
      return res.status(200).json(history)
    } catch (error) {
      return res.status(500).json(error)
    }
}

// 
//  Show User GameHistory
// 
exports.userHistory = async (req, res) => {
    try {
      const userHistory = await GamesHistory.find({userId: req.user._id});
  
      return res.status(200).json(userHistory)
    } catch (error) {
      return res.status(500).json(error)
    }
}

// 
// Create new User Game
// 
exports.newGame = async (req, res) => {
    try {
      const {games, finalResult} = req.body;
  
      const newGame = await GamesHistory.create({
        games: games,
        finalResult: finalResult,
        userId: req.user._id
      })
      console.log(newGame)
      return res.status(200).json(newGame)
    } catch (error) {
      return res.status(500).json(error)
    }
}