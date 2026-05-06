import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch(`http://localhost:3000/notes`);
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

      <div className="form">
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