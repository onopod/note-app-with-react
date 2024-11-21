import { useEffect, useState } from "react";
import uuid from "react-uuid";
import './App.css';
import Main from "./components/Main.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [notes, setNotes] = useState(JSON.parse(typeof window !== "undefined" ? localStorage.getItem("notes") : undefined) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    // ローカルストレージにノートを保存
    if (typeof window !== 'undefined') {
      localStorage.setItem("notes", JSON.stringify(notes));
    }

  }, [notes])

  useEffect(() => {
    setActiveNote(notes[0].id);
  }, [])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "",
      modDate: Date.now()
    }
    setNotes([...notes, newNote]);
  }
  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  }
  const onUpdateNote = (updatedNote) => {
    // 修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    })
    setNotes(updatedNotesArray);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }
  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App
