const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  learnerId: String,
  name: String,
  skill: String,
  score: Number,
  coins: Number,
  totalQuestions: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizResult", quizSchema);