import express from "express";

const router = express.Router();


// ✅ GET ALL MENTORS
router.get("/", async (req, res) => {

  try {

    res.json([
      {
        name: "Arun",
        skill: "React"
      }
    ]);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


export default router;