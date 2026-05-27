import Mentor from "../models/Mentor.js";

// GET
export const getMentors = async (req, res) => {

  try {

    const mentors =
      await Mentor.find();

    res.json(mentors);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// ADD
export const addMentor = async (req, res) => {

  try {

    const mentor =
      await Mentor.create(req.body);

    res.status(201).json(mentor);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// DELETE
export const deleteMentor = async (req, res) => {

  try {

    await Mentor.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
      "Mentor Deleted"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};