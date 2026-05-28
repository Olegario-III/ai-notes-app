function QuizNotesPreview({ notes }) {
  return (
    <div className="notes-preview">

      <h2>
        Selected Notes ({notes.length})
      </h2>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <div
            className="note-card"
            key={note.id}
          >
            <p>{note.content}</p>

            <small>
              {note.category}
            </small>
          </div>
        ))
      )}

    </div>
  );
}

export default QuizNotesPreview;