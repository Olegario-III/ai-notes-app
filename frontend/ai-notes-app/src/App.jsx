import { useEffect, useState } from "react";

import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import Filters from "./components/Filters";
import Quiz from "./components/Quiz";

import "./index.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  const fetchNotes = async () => {
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

    const res = await fetch(url);

    const data = await res.json();

    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app">
      <h1>AI Notes Quiz App</h1>

      <AddNote fetchNotes={fetchNotes} />

      <Filters
        category={category}
        setCategory={setCategory}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        fetchNotes={fetchNotes}
      />

      <Quiz notes={notes} />

      <NotesList
        notes={notes}
        fetchNotes={fetchNotes}
      />
    </div>
  );
}

export default App;