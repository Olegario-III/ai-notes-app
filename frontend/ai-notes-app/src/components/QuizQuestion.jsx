// src/components/QuizQuestion.jsx

function QuizQuestion({
  question,
  index,
  difficulty,
  answers,
  submitted,
  handleAnswerChange,
}) {
  return (
    <div className="quiz-question">
      <h3>
        {index + 1}. {question.question}
      </h3>

      {difficulty === "easy" &&
        question.choices?.map(
          (choice, choiceIndex) => (
            <label
              key={choiceIndex}
              className="quiz-choice"
            >
              <input
                type="radio"
                name={`question-${index}`}
                value={choice}
                checked={
                  answers[index] === choice
                }
                disabled={submitted}
                onChange={(e) =>
                  handleAnswerChange(
                    index,
                    e.target.value
                  )
                }
              />

              {choice}
            </label>
          )
        )}

      {difficulty === "medium" && (
        <input
          type="text"
          placeholder="Type your answer..."
          value={answers[index] || ""}
          disabled={submitted}
          onChange={(e) =>
            handleAnswerChange(
              index,
              e.target.value
            )
          }
        />
      )}

      {difficulty === "hard" && (
        <textarea
          rows="5"
          placeholder="Write your answer..."
          value={answers[index] || ""}
          disabled={submitted}
          onChange={(e) =>
            handleAnswerChange(
              index,
              e.target.value
            )
          }
        />
      )}
    </div>
  );
}

export default QuizQuestion;