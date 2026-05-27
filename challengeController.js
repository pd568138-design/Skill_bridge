import Challenge from "../models/Challenge.js";

// GET
export const getChallenges = async (req, res) => {

  try {

    const challenges =
      await Challenge.find();

    res.json(challenges);

  } catch (err) {

    res.status(500).json(err);

  }
};

// ADD
export const addChallenge = async (req, res) => {

  try {

    const challenge =
      new Challenge(req.body);

    const saved =
      await challenge.save();

    res.json(saved);

  } catch (err) {

    res.status(500).json(err);

  }
};

// DELETE
export const deleteChallenge =
async (req, res) => {

  try {

    await Challenge.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Challenge Deleted"
    });

  } catch (err) {

    res.status(500).json(err);

  }
};