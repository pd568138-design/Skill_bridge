import express from "express";

const router = express.Router();

let challenges = [];

// GET
router.get("/", (req, res) => {
  res.json(challenges);
});

// POST
router.post("/", (req, res) => {

  const newChallenge = {
    _id: Date.now().toString(),
    ...req.body
  };

  challenges.push(newChallenge);

  res.json(newChallenge);
});

// DELETE
router.delete("/:id", (req, res) => {

  challenges = challenges.filter(
    (c) => c._id !== req.params.id
  );

  res.json({
    message: "Deleted"
  });
});

export default router;