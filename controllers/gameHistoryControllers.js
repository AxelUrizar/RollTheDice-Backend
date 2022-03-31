const GamesHistory = require('../models/GamesHistory');
const User = require('../models/Users');


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
      const userId = req.user._id  

      const newGame = await GamesHistory.create({
        games: games,
        finalResult: finalResult,
        userId: userId
      })

      const player = await User.findOne({_id: userId})
      switch (finalResult) {
        case 'Win':
          player.points += 15
          player.coins += 25
          player.save()
            break

        case 'Lose':
          if(player.points > 0){
            player.points -= 10
            await player.save(err => console.log(err))
          }
            break

        case 'Tie':
          player.coins += 5
          await player.save(err => console.log(err))
            break

        default:
          break
      }
      
      return res.status(200).json({
        game: newGame,
        player: player
      })
    } catch (error) {
      return res.status(500).json(error)
    }
}