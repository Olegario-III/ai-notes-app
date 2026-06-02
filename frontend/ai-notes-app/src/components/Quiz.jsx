// src/components/Quiz.jsx

import { useState } from "react";

import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";

import {
  generateQuizRequest,
  saveQuizHistory,
} from "../services/quizService";

import {
  calculateQuizResult,
} from "../utils/quizUtils";

function Quiz({
  notes,
  category,
  difficulty,
}) {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [score, setScore] =
    useState(null);

  const [percentage, setPercentage] =
    useState(null);

  const generateQuiz = async () => {
    if (notes.length === 0) {
      alert("No notes found");
      return;
    }

    setLoading(true);

    try {
      const data =
        await generateQuizRequest(
          notes,
          category,
          difficulty
        );

      setQuiz(data.questions || []);
      setAnswers({});
      setSubmitted(false);
      setScore(null);
      setPercentage(null);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleAnswerChange = (
    questionIndex,
    value
  ) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const submitQuiz = async () => {
    if (difficulty === "hard") {
      alert(
        "Essay scoring will be added later."
      );
      return;
    }

    try {
      const result =
        calculateQuizResult(
          quiz,
          answers
        );

      await saveQuizHistory({
        category,
        difficulty,
        score: result.score,
        totalQuestions:
          result.totalQuestions,
        percentage:
          result.percentage,
        answers:
          result.quizAnswers,
      });

      setScore(result.score);

      setPercentage(
        result.percentage
      );

      setSubmitted(true);

    } catch (error) {
      console.log(error);

      alert(
        "Failed to save quiz result."
      );
    }
  };

  return (
    <div className="quiz-section">
      <button onClick={generateQuiz}>
        Generate Quiz
      </button>

      {loading && (
        <p>Generating quiz...</p>
      )}

      {quiz.length > 0 && (
        <div className="quiz-box">
          <h2>Quiz</h2>

          {quiz.map(
            (question, index) => (
              <QuizQuestion
                key={index}
                question={question}
                index={index}
                difficulty={difficulty}
                answers={answers}
                submitted={submitted}
                handleAnswerChange={
                  handleAnswerChange
                }
              />
            )
          )}

          {!submitted && (
            <button
              onClick={submitQuiz}
              className="submit-quiz-btn"
            >
              Submit Quiz
            </button>
          )}

          {submitted && (
            <QuizResult
              score={score}
              totalQuestions={
                quiz.length
              }
              percentage={
                percentage
              }
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;