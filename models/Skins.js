const mongoose = require('mongoose');
require('mongoose-type-url')

let Skin = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true,
        unique: true
    },
    imageURL: {
        type: mongoose.SchemaTypes.Url,
        required: true,
        unique: true
    }
});

const model = mongoose.model('Skins', Skin);

module.exports = model