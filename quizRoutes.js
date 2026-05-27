const router = require("express").Router();
const c = require("../controllers/quizController");

router.post("/submit", c.saveQuiz);

module.exports = router;