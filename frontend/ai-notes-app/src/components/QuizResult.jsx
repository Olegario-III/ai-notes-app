// src/components/QuizResult.jsx

function QuizResult({
  score,
  totalQuestions,
  percentage,
}) {
  return (
    <div className="quiz-result">
      <h3>Quiz Result</h3>

      <p>
        Score: {score} / {totalQuestions}
      </p>

      <p>
        Percentage: {percentage}%
      </p>
    </div>
  );
}

export default QuizResult;