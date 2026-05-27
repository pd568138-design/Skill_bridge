import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  level: String,
  points: Number
});

export default mongoose.model(
  "Challenge",
  challengeSchema
);