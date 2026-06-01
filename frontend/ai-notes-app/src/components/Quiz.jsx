// frontend/src/components/Quiz.jsx

import { useState } from "react";

function Quiz({
  notes,
  category,
  difficulty,
}) {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [percentage, setPercentage] = useState(null);

  const generateQuiz = async () => {
    if (notes.length === 0) {
      alert("No notes found");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const allNotes = notes
        .map((note) => note.content)
        .join("\n");

      const res = await fetch(
        "http://localhost:3000/quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            notes: allNotes,
            category,
            difficulty,
          }),
        }
      );

      const data = await res.json();

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
            correctAnswer:
              question.answer,
            userAnswer,
            isCorrect,
          };
        }
      );

      const totalQuestions =
        quiz.length;

      const quizPercentage =
        Math.round(
          (correctAnswers /
            totalQuestions) *
            100
        );

      const token =
        localStorage.getItem("token");

      await fetch(
        "http://localhost:3000/quiz-history",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category,
            difficulty,
            score: correctAnswers,
            totalQuestions,
            percentage:
              quizPercentage,
            answers: quizAnswers,
          }),
        }
      );

      setScore(correctAnswers);
      setPercentage(
        quizPercentage
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
              <div
                key={index}
                className="quiz-question"
              >
                <h3>
                  {index + 1}.{" "}
                  {question.question}
                </h3>

                {/* EASY */}
                {difficulty ===
                  "easy" &&
                  question.choices?.map(
                    (
                      choice,
                      choiceIndex
                    ) => (
                      <label
                        key={
                          choiceIndex
                        }
                        className="quiz-choice"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={choice}
                          checked={
                            answers[
                              index
                            ] ===
                            choice
                          }
                          disabled={
                            submitted
                          }
                          onChange={(
                            e
                          ) =>
                            handleAnswerChange(
                              index,
                              e.target
                                .value
                            )
                          }
                        />

                        {choice}
                      </label>
                    )
                  )}

                {/* MEDIUM */}
                {difficulty ===
                  "medium" && (
                  <input
                    type="text"
                    placeholder="Type your answer..."
                    value={
                      answers[
                        index
                      ] || ""
                    }
                    disabled={
                      submitted
                    }
                    onChange={(
                      e
                    ) =>
                      handleAnswerChange(
                        index,
                        e.target
                          .value
                      )
                    }
                  />
                )}

                {/* HARD */}
                {difficulty ===
                  "hard" && (
                  <textarea
                    rows="5"
                    placeholder="Write your answer..."
                    value={
                      answers[
                        index
                      ] || ""
                    }
                    disabled={
                      submitted
                    }
                    onChange={(
                      e
                    ) =>
                      handleAnswerChange(
                        index,
                        e.target
                          .value
                      )
                    }
                  />
                )}
              </div>
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
            <div className="quiz-result">
              <h3>
                Quiz Result
              </h3>

              <p>
                Score: {score} /{" "}
                {quiz.length}
              </p>

              <p>
                Percentage:{" "}
                {percentage}%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;