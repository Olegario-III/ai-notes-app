// frontend/src/pages/QuizHistoryPage.jsx

import { useEffect, useState } from "react";

function QuizHistoryPage() {
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchHistory = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/quiz-history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setHistory(data);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const viewQuizDetails = async (
    historyId
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/quiz-history/${historyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setSelectedQuiz(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="quiz-history-page">
      <h1>Quiz History</h1>

      {loading && (
        <p>Loading history...</p>
      )}

      {!loading &&
        history.length === 0 && (
          <p>
            No quiz attempts found.
          </p>
        )}

      {!loading &&
        history.length > 0 && (
          <div className="history-list">
            {history.map((quiz) => (
              <div
                key={quiz.id}
                className="history-card"
              >
                <h3>
                  {quiz.category ||
                    "General"}
                </h3>

                <p>
                  Difficulty:{" "}
                  {quiz.difficulty}
                </p>

                <p>
                  Score: {quiz.score}/
                  {
                    quiz.total_questions
                  }
                </p>

                <p>
                  Percentage:{" "}
                  {quiz.percentage}%
                </p>

                <p>
                  Date:{" "}
                  {new Date(
                    quiz.created_at
                  ).toLocaleString()}
                </p>

                <button
                  onClick={() =>
                    viewQuizDetails(
                      quiz.id
                    )
                  }
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

      {selectedQuiz && (
        <div className="quiz-details">
          <h2>Quiz Details</h2>

          <p>
            Category:{" "}
            {selectedQuiz.category}
          </p>

          <p>
            Difficulty:{" "}
            {selectedQuiz.difficulty}
          </p>

          <p>
            Score: {selectedQuiz.score}/
            {
              selectedQuiz.total_questions
            }
          </p>

          <p>
            Percentage:{" "}
            {selectedQuiz.percentage}%
          </p>

          <hr />

          {selectedQuiz.answers?.map(
            (answer, index) => (
              <div
                key={answer.id}
                className="answer-card"
              >
                <h4>
                  Question {index + 1}
                </h4>

                <p>
                  <strong>
                    Question:
                  </strong>{" "}
                  {answer.question}
                </p>

                <p>
                  <strong>
                    Your Answer:
                  </strong>{" "}
                  {answer.user_answer}
                </p>

                <p>
                  <strong>
                    Correct Answer:
                  </strong>{" "}
                  {
                    answer.correct_answer
                  }
                </p>

                <p>
                  <strong>
                    Result:
                  </strong>{" "}
                  {answer.is_correct
                    ? "✅ Correct"
                    : "❌ Incorrect"}
                </p>

                <hr />
              </div>
            )
          )}

          <button
            onClick={() =>
              setSelectedQuiz(null)
            }
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizHistoryPage;