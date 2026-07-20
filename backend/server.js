// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./database/db.js";

import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import quizRoutes from "./routes/quiz.js";
import quizHistoryRoutes from "./routes/quizHistory.js";
import gradeQuizRoute from "./routes/gradeQuiz.js";
import usersRoutes from "./routes/users.js";

dotenv.config();

const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Root Route
// ======================
app.get("/", (req, res) => {
  res.json({
    message: "AI Notes Quiz API is running.",
  });
});

// ======================
// API Routes
// ======================
app.use("/auth", authRoutes);

app.use("/notes", notesRoutes);

app.use("/quiz", quizRoutes);

app.use(
  "/quiz-history",
  quizHistoryRoutes
);

app.use(
  "/grade-quiz",
  gradeQuizRoute
);

app.use(
  "/users",
  usersRoutes
);

// ======================
// 404 Route
// ======================
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found.",
  });
});

// ======================
// Start Server
// ======================
const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});