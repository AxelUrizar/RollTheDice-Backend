const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Skin = new Schema({
    skin: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        userId: {
            type: String,
            unique: true
        }
    }]
});

const model = mongoose.model('Skins', Skin);

module.exports = model