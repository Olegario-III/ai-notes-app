import { useState } from "react";

function AddNote({ fetchNotes }) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const addNote = async () => {
    if (!content) return;

    await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        category
      })
    });

    setContent("");
    setCategory("");

    fetchNotes();
  };

  return (
    <div className="add-note">
      <textarea
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

      <button onClick={addNote}>
        Add Note
      </button>
    </div>
  );
}

export default AddNote;