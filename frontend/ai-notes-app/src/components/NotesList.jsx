function NotesList({
  notes,
  fetchNotes,
  setEditingNote
}) {

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotes();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notes-container">

      {notes.map((note) => (
        <div
          className="note-card"
          key={note.id}
        >

          <p>{note.content}</p>

          <small>
            {note.category}
          </small>

          <div className="note-actions">

            <button
              onClick={() => setEditingNote(note)}
            >
              Update
            </button>

            <button
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default NotesList;