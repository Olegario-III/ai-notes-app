import express from "express";
import db from "../database/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/*
GET /quiz-history

Returns all quiz history records
for the currently logged-in user.
*/
router.get("/", authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.all(
    `
    SELECT *
    FROM quiz_history
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId],
    (err, rows) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          error: "Failed to fetch quiz history",
        });
      }

      res.json(rows);
    }
  );
});

/*
GET /quiz-history/:id

Returns one quiz attempt
including all saved answers.
*/
router.get("/:id", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const historyId = req.params.id;

  db.get(
    `
    SELECT *
    FROM quiz_history
    WHERE id = ?
    AND user_id = ?
    `,
    [historyId, userId],
    (err, history) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          error: "Failed to fetch quiz",
        });
      }

      if (!history) {
        return res.status(404).json({
          error: "Quiz not found",
        });
      }

      db.all(
        `
        SELECT *
        FROM quiz_answers
        WHERE quiz_history_id = ?
        `,
        [historyId],
        (err, answers) => {
          if (err) {
            console.log(err);

            return res.status(500).json({
              error: "Failed to fetch quiz answers",
            });
          }

          res.json({
            ...history,
            answers,
          });
        }
      );
    }
  );
});

/*
POST /quiz-history

Expected body:

{
  category,
  difficulty,
  score,
  totalQuestions,
  percentage,
  answers: [
    {
      question,
      correctAnswer,
      userAnswer,
      isCorrect
    }
  ]
}
*/
router.post("/", authMiddleware, (req, res) => {
  const userId = req.user.id;

  const {
    category,
    difficulty,
    score,
    totalQuestions,
    percentage,
    answers,
  } = req.body;

  db.run(
    `
    INSERT INTO quiz_history (
      user_id,
      category,
      difficulty,
      score,
      total_questions,
      percentage
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      userId,
      category,
      difficulty,
      score,
      totalQuestions,
      percentage,
    ],
    function (err) {
      if (err) {
        console.log(err);

        return res.status(500).json({
          error: "Failed to save quiz history",
        });
      }

      const quizHistoryId = this.lastID;

      if (
        !answers ||
        !Array.isArray(answers) ||
        answers.length === 0
      ) {
        return res.status(201).json({
          message: "Quiz history saved successfully",
          quizHistoryId,
        });
      }

      let completed = 0;
      let hasError = false;

      answers.forEach((answer) => {
        db.run(
          `
          INSERT INTO quiz_answers (
            quiz_history_id,
            question,
            correct_answer,
            user_answer,
            is_correct
          )
          VALUES (?, ?, ?, ?, ?)
          `,
          [
            quizHistoryId,
            answer.question,
            answer.correctAnswer,
            answer.userAnswer,
            answer.isCorrect ? 1 : 0,
          ],
          (err) => {
            if (hasError) return;

            if (err) {
              hasError = true;

              console.log(err);

              return res.status(500).json({
                error: "Failed to save quiz answers",
              });
            }

            completed++;

            if (completed === answers.length) {
              res.status(201).json({
                message: "Quiz history saved successfully",
                quizHistoryId,
              });
            }
          }
        );
      });
    }
  );
});

export default router;