// src/utils/quizUtils.js

export function calculateQuizResult(
  quiz,
  answers
) {
  let correctAnswers = 0;

  const quizAnswers = quiz.map(
    (question, index) => {
      const userAnswer =
        answers[index] || "";

      const isCorrect =
        userAnswer.trim().toLowerCase() ===
        question.answer
          ?.trim()
          .toLowerCase();

      if (isCorrect) {
        correctAnswers++;
      }

      return {
        question: question.question,
        correctAnswer: question.answer,
        userAnswer,
        isCorrect,
      };
    }
  );

  const totalQuestions = quiz.length;

  const percentage = Math.round(
    (correctAnswers / totalQuestions) *
      100
  );

  return {
    score: correctAnswers,
    totalQuestions,
    percentage,
    quizAnswers,
  };
}