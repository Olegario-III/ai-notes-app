function NotesList({ notes, fetchNotes }) {
  const deleteNote = async (id) => {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE"
    });

    fetchNotes();
  };

  return (
    <div className="notes-container">
      {notes.map((note) => (
        <div className="note-card" key={note.id}>
          <p>{note.content}</p>

          <small>
            {note.category}
          </small>

          <button onClick={() => deleteNote(note.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotesList;