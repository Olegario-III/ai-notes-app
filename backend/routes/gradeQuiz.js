import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  gradeQuizAnswers,
} from "../services/aiService.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const { questions } = req.body;

      const result =
        await gradeQuizAnswers(
          questions
        );

      res.json(result);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Failed to grade quiz",
      });
    }
  }
);

export default router;