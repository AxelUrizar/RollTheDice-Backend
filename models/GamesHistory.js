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
        required: true,
        default: moment(new Date()).format("DD/MM/YYYY")
    }
})

module.exports = mongoose.model('GamesHistory', GamesHistory)