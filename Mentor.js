const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  skill: {
    type: String,
    required: true
  },

  coins: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: "Not Started"
  }

});

module.exports =
  mongoose.model(
    "Challenge",
    challengeSchema
  );