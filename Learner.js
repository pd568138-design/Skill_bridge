import mongoose from "mongoose";

const learnerSchema = new mongoose.Schema({
  name: String,
  skill: String,
  coins: { type: Number, default: 0 },
  status: { type: String, default: "Not Started" }
});

export default mongoose.model("Learner", learnerSchema);