// backend/routes/quiz.js

import express from "express";
import { generateQuiz } from "../services/aiService.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      notes,
      category,
      difficulty,
    } = req.body;

    const quiz = await generateQuiz(
      notes,
      category,
      difficulty
    );

    res.json(quiz);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate quiz",
    });
  }
});

export default router;