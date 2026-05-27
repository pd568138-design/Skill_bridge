import Learner from "../models/Learner.js";

// GET
export const getLearners = async (req, res) => {
  try {
    const data = await Learner.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST
export const addLearner = async (req, res) => {
  try {
    const newLearner = await Learner.create(req.body);
    res.json(newLearner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteLearner = async (req, res) => {
  try {
    await Learner.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};