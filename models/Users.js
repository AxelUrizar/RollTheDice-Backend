const mongoose = require("mongoose");
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
  // skins: [{
  //   type: 
  // }],
  // roles: [{
  //   type:
  // }]
});

module.exports = mongoose.model('User', UserSchema)



