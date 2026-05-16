import { useEffect, useState } from "react";

import AddNote from "../components/AddNote";
import Filters from "../components/Filters";
import NotesList from "../components/NotesList";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  const [category, setCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  const fetchNotes = async () => {
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

    const res = await fetch(url);

    const data = await res.json();

    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <AddNote fetchNotes={fetchNotes} />

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
      />
    </>
  );
}

export default NotesPage;