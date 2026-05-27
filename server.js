import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import mentorRoutes from "./routes/mentorRoutes.js";
import learnerRoutes from "./routes/learnerRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";

dotenv.config();

const app = express();


// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());


// ✅ DATABASE CONNECTION
connectDB();


// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("SkillBridge API Running");
});


// ✅ API ROUTES
app.use(
  "/api/mentors",
  mentorRoutes
);

app.use(
  "/api/learners",
  learnerRoutes
);

app.use(
  "/api/challenges",
  challengeRoutes
);


// ✅ SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});