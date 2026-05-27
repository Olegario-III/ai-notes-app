// frontend/src/pages/QuizPage.jsx

import { useEffect, useState } from "react";

import Quiz from "../components/Quiz";

function QuizPage() {
  const [notes, setNotes] = useState([]);

  const [category, setCategory] = useState("");

  // NEW
  const [difficulty, setDifficulty] = useState("easy");

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      let url = "http://localhost:3000/notes";

      const params = new URLSearchParams();

      if (category) {
        params.append("category", category);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setNotes(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>

      <h1>Quiz Generator</h1>

      <div className="quiz-filters">

        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* DIFFICULTY SELECT */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">
            Easy
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="hard">
            Hard
          </option>
        </select>

        <button onClick={fetchNotes}>
          Apply Filter
        </button>

      </div>

      <Quiz
        notes={notes}
        category={category}
        difficulty={difficulty}
      />

    </div>
  );
}

export default QuizPage;