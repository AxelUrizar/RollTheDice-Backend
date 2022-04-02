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
      const points = 0

      const player = await User.findOne({_id: userId})

      switch (finalResult) {
        case 'Win':
          player.points += 15
          player.coins += 25
          player.save()
          points += 15
            break

        case 'Lose':
          if(player.points > 9){
            player.points -= 10
            await player.save(err => console.log(err))
          } else {
            player.points = 0
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

      const newGame = await GamesHistory.create({
        games: games,
        finalResult: finalResult,
        userId: userId,
        points: points
      })
      
      return res.status(200).json({
        game: newGame,
        player: player
      })
    } catch (error) {
      return res.status(500).json(error)
    }
}