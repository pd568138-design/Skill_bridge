const QuizResult = require("../models/QuizResult");
const Learner = require("../models/Learner");

exports.saveQuiz = async (req, res) => {
  const { learnerId, name, skill, score, coins, totalQuestions } = req.body;

  const result = await QuizResult.create({
    learnerId,
    name,
    skill,
    score,
    coins,
    totalQuestions
  });

  await Learner.findByIdAndUpdate(learnerId, {
    coins,
    status: "completed",
    completed: true
  });

  res.json(result);
};