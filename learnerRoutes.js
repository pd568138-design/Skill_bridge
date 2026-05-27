import express from "express";
import { getLearners, addLearner, deleteLearner } from "../controllers/learnerController.js";

const router = express.Router();

router.get("/", getLearners);
router.post("/", addLearner);
router.delete("/:id", deleteLearner);

export default router;