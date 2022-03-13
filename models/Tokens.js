const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Token = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    }
});

const model = mongoose.model('Tokens', Token);

module.exports = model