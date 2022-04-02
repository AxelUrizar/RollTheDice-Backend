const moment = require('moment')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let GamesHistory = new Schema({
    games:{
        type: Array,
        required: true
    },
    finalResult: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameDate: {
        type: String,
        required: false,
        default: moment(new Date()).format("DD/MM/YYYY")
    },
    points: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('GamesHistory', GamesHistory)