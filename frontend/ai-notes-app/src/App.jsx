import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async (
    category = filterCategory,
    time = timeFilter
  ) => {
    let url = `http://localhost:3000/notes`;
    let queryParams = [];

    if (category) {
      queryParams.push(`category=${category}`);
    }

    if (time) {
      queryParams.push(`time=${time}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async () => {
    await fetch(`http://localhost:3000/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ content, category })
    });

    setContent("");
    setCategory("");

    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE"
    });

    fetchNotes();
  };

  return (
  <div className="app">

    <h1>AI Notes</h1>
    <p className="subtitle">
      Smart notes with AI-powered quizzes
    </p>

    <div className="top-section">

      {/* ADD NOTE */}
      <div className="card">
        <h2>Add Note</h2>

        <input
          type="text"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={addNote}
        >
          Add Note
        </button>
      </div>

      {/* FILTERS */}
      <div className="card">
        <h2>Filters</h2>

        <input
          type="text"
          placeholder="Filter by category..."
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />

        <div className="filter-buttons">

          <button onClick={() => {
            setTimeFilter("today");
            fetchNotes(filterCategory, "today");
          }}>
            Today
          </button>

          <button onClick={() => {
            setTimeFilter("week");
            fetchNotes(filterCategory, "week");
          }}>
            Week
          </button>

          <button onClick={() => {
            setTimeFilter("month");
            fetchNotes(filterCategory, "month");
          }}>
            Month
          </button>

          <button onClick={() => {
            fetchNotes(filterCategory, timeFilter);
          }}>
            Apply
          </button>

          <button onClick={() => {
            setTimeFilter("");
            setFilterCategory("");
            fetchNotes("", "");
          }}>
            All
          </button>

        </div>
      </div>

    </div>

    {/* NOTES */}
    <div className="notes">

      {notes.length === 0 ? (
        <div className="empty">
          No notes found.
        </div>
      ) : (
        notes.map((note) => (
          <div className="note" key={note.id}>

            <div>
              <div className="note-content">
                {note.content}
              </div>

              <div className="note-category">
                {note.category}
              </div>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>

  </div>
);
}

export default App