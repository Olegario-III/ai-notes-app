//frontend\ai-notes-app\src\components\Quiz.jsx
import { useState } from "react";

function Quiz({
  notes,
  category,
  difficulty
}) {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

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

      setQuiz(data.quiz);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="quiz-section">

      <button onClick={generateQuiz}>
        Generate Quiz
      </button>

      {loading && (
        <p>Generating quiz...</p>
      )}

      {quiz && (
        <div className="quiz-box">
          <pre>{quiz}</pre>
        </div>
      )}

    </div>
  );
}

export default Quiz;