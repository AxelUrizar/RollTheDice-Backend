const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Rol = new Schema({
    rol: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        userId: String
    }]
});

const model = mongoose.model("Roles", Rol);

module.exports = model;