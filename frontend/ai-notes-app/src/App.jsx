import { useState, useEffect } from "react"

function App() {

const [notes, setNotes] = useState([]);
const [content, setContent] = useState("");
const [category, setCategory] = useState("");

useEffect(()=>{
  fetchNotes();
}, []);

const fetchNotes = async()=>{
  const res = await fetch(`http://localhost:3000/notes`);
  const data = await res.json();
  setNotes(data);
};

const addNote = async ()=>{
  await fetch(`http://localhost:3000/notes`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ content, category})
  });

  setContent("");
  setCategory("");

  fetchNotes();
};

const deleteNote = async (id)=>{
  await fetch(`http://localhost:3000/notes/${id}`, {
    method: "DELETE"
  });

  fetchNotes();
};

  return (
    <div style={{padding: "20px"}}>
    <h1>AI Note App</h1>
    <input
    type="text"
    placeholder="Note Content"
    value={content}
    onChange={(e)=> setContent(e.target.value)}
    />

    <input
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e)=> setCategory(e.target.value)}
    />

    <button onClick={addNote}>Add Note</button>

    <ul>
      {notes.map((note)=>(
        <li key={note.id}>
          <strong>{note.content}</strong> ({note.category})
          <button onClick={()=> deleteNote(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default App