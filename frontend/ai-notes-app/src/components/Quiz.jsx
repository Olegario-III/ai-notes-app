import { useState } from "react";

function Quiz({ notes }) {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);

    const allNotes = notes
      .map((note) => note.content)
      .join("\n");

    const res = await fetch(
      "http://localhost:3000/quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          notes: allNotes
        })
      }
    );

    const data = await res.json();

    setQuiz(data.quiz);

    setLoading(false);
  };

  return (
    <div className="quiz-section">
      <button onClick={generateQuiz}>
        Generate Quiz
      </button>

      {loading && <p>Generating quiz...</p>}

      {quiz && (
        <div className="quiz-box">
          <pre>{quiz}</pre>
        </div>
      )}
    </div>
  );
}

export default Quiz;