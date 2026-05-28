import { useEffect, useState } from "react";

import Quiz from "../components/Quiz";
import QuizFilters from "../components/QuizFilters";
import QuizNotesPreview from "../components/QuizNotesPreview";

function QuizPage() {
  const [notes, setNotes] = useState([]);

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [timeFilter, setTimeFilter] = useState("");

  const [categories, setCategories] = useState([]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      let url = "http://localhost:3000/notes";

      const params = new URLSearchParams();

      if (category) {
        params.append("category", category);
      }

      if (timeFilter) {
        params.append("time", timeFilter);
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

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      const uniqueCategories = [
        ...new Set(
          data
            .map((note) => note.category)
            .filter(Boolean)
        ),
      ];

      setCategories(uniqueCategories);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  return (
    <div>

      <h1>Quiz Generator</h1>

      <QuizFilters
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        categories={categories}
        fetchNotes={fetchNotes}
      />

      <QuizNotesPreview notes={notes} />

      <Quiz
        notes={notes}
        category={category}
        difficulty={difficulty}
      />

    </div>
  );
}

export default QuizPage;