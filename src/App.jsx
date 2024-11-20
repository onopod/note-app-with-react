import './App.css';
import { useState } from "react";
import Main from "./components/Main.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  const onAddNote = () => {
    const newNote = {
      id: 1,
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now()
    }
    setNotes([...notes, newNote]);
    console.log("新しくノートが追加されました");
    console.log(notes);
  }
  return (
    <div className="App">
      <Sidebar onAddNote={onAddNote} notes={notes} />
      <Main />
    </div>
  )
}

export default App
