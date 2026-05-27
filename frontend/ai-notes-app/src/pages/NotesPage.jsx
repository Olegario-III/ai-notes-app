// frontend/src/pages/NotesPage.jsx

import { useEffect, useState } from "react";

import AddNote from "../components/AddNote";
import Filters from "../components/Filters";
import NotesList from "../components/NotesList";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  const [category, setCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  // EDITING STATE
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

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

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <AddNote
        fetchNotes={fetchNotes}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
      />

      <Filters
        category={category}
        setCategory={setCategory}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        fetchNotes={fetchNotes}
      />

      <NotesList
        notes={notes}
        fetchNotes={fetchNotes}
        setEditingNote={setEditingNote}
      />
    </>
  );
}

export default NotesPage;