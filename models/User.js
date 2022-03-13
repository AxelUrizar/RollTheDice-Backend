const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let User = new Schema({
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
    required: false,
  },
  coins: {
    type: Number,
    required: false
  }
});

const model = mongoose.model("Users", User);

module.exports = model;