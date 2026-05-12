import express from "express";
import { generateQuiz } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { notes } = req.body;

    const quiz = await generateQuiz(notes);

    res.json({
      quiz
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to generate quiz"
    });
  }
});

export default router;