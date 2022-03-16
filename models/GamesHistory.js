const moment = require('moment')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let GamesHistory = new Schema({
    games:[{
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
        }
    }],
    finalResult: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    gameDate: {
        type: String,
        required: true,
        default: moment(new Date()).format("DD/MM/YYYY")
    }
})

module.exports = mongoose.model('GamesHistory', GamesHistory)