import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

import "./database/db.js";

import notesRoutes from "./routes/notes.js";
import quizRoutes from "./routes/quiz.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running"
  });
});

app.use("/notes", notesRoutes);
app.use("/quiz", quizRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});