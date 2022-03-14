const moment = require('moment')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let GamesHistory = new Schema({
    games:[{
        game: {
            userDiceRolls: {
                type: Array,
                required: true
            },
            opponentDiceRolls: {
                type: Array,
                required: true
            },
            winner: {
                type: Boolean,
                required: true
            },
            gameDate: {
                type: String,
                required: true,
                default: moment(new Date()).format("DD/MM/YYYY")
            }
        }
    }],
    userId: {
        type: String,
        required: true
    }
})