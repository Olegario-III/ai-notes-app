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
      <h1>AI Notes App</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
        <input
          type="text"
          placeholder="filter by category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
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
        <button onClick={() => fetchNotes(filterCategory, timeFilter)}>
          Filter
        </button>
        <button onClick={() => {
          setTimeFilter("");
          setFilterCategory("");
          fetchNotes("", "");
        }}>
          Show All
        </button>
      </div>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <div>
              <div className="note-content">{note.content}</div>
              <div className="note-category">{note.category}</div>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App