import { useEffect, useState } from "react";

function AddNote({
  fetchNotes,
  editingNote,
  setEditingNote
}) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  // LOAD NOTE INTO INPUTS WHEN EDITING
  useEffect(() => {
    if (editingNote) {
      setContent(editingNote.content);
      setCategory(editingNote.category || "");
    }
  }, [editingNote]);

  const saveNote = async () => {
    if (!content) return;

    try {
      const token = localStorage.getItem("token");

      // EDIT NOTE
      if (editingNote) {
        await fetch(
          `http://localhost:3000/notes/${editingNote.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              content,
              category,
            }),
          }
        );

        setEditingNote(null);
      }

      // ADD NOTE
      else {
        await fetch("http://localhost:3000/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
            category,
          }),
        });
      }

      // CLEAR INPUTS
      setContent("");
      setCategory("");

      // REFRESH NOTES
      fetchNotes();

    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setEditingNote(null);

    setContent("");
    setCategory("");
  };

  return (
    <div className="add-note">

      <textarea
        id="note-content"
        name="content"
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        id="note-category"
        name="category"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={saveNote}>
        {editingNote ? "Update Note" : "Add Note"}
      </button>

      {editingNote && (
        <button onClick={cancelEdit}>
          Cancel
        </button>
      )}

    </div>
  );
}

export default AddNote;