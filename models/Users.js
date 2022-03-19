const mongoose = require("mongoose");
const {Schema} = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    default: 'user'
  },
  points: {
    type: Number,
    required: true,
    default: 0
  },
  coins: {
    type: Number,
    required: true,
    default: 0
  },
  skins: [{
    type: Schema.Types.ObjectId,
    ref: 'Skins'
  }]
});

module.exports = mongoose.model('User', UserSchema)



