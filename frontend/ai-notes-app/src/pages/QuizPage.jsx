import { useEffect, useState } from "react";

import Quiz from "../components/Quiz";

function QuizPage() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch(
      "http://localhost:3000/notes"
    );

    const data = await res.json();

    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Quiz Generator</h1>

      <Quiz notes={notes} />
    </div>
  );
}

export default QuizPage;