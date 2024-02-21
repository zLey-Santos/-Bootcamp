import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Card from "./components/Card";
import "./style.css";

interface Notepad {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
}

const App: React.FC = () => {
  const [notepads, setNotepads] = useState<Notepad[]>([]);
  const [newNotepad, setNewNotepad] = useState({ title: "", subtitle: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState("");

  const fetchData = async () => {
    const response = await axios.get<Notepad[]>("http://localhost:3001/notepads");
    setNotepads(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateNotepad = async () => {
    await axios.post("http://localhost:3001/notepads", newNotepad);
    setNewNotepad({ title: "", subtitle: "", content: "" });
    fetchData();
  };

  const handleEditNotepad = async () => {
    if (editNoteId) {
      await axios.put(`http://localhost:3001/notepads/${editNoteId}`, newNotepad);
      setEditNoteId("");
      setIsEditing(false);
      fetchData();
    }
  };

  const handleDeleteNotepad = async (id: string) => {
    await axios.delete(`http://localhost:3001/notepads/${id}`);
    fetchData();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewNotepad((prevNotepad: any) => ({ ...prevNotepad, [name]: value }));
  };

  const startEditing = (id: string) => {
    const notepadToEdit = notepads.find((notepad) => notepad._id === id);
    if (notepadToEdit) {
      setNewNotepad({ title: notepadToEdit.title, subtitle: notepadToEdit.subtitle, content: notepadToEdit.content });
      setIsEditing(true);
      setEditNoteId(id);
    }
  };

  return (
    <div>
      <Card>
        <h1 className="text-center font-bold uppercase">Listas de Notepads</h1>

        <ul className="p-2">
          {notepads.map((notepad: Notepad) => (
            <li key={notepad._id}>
              <span className="uppercase font-bold text-gray-500">#Título</span>
              <div className="mb-5">{notepad.title}</div>
              <span className="uppercase font-bold text-gray-500">#Subtítulo</span>
              <div>{notepad.subtitle}</div>
              <span className="uppercase font-bold text-gray-500">#Conteúdo</span>
              <div>{notepad.content}</div>
              <Card>
                <button
                  className="border-2 uppercase font-bold mr-2 border-black px-2 rounded bg-yellow-500  hover:bg-yellow-600"
                  onClick={() => startEditing(notepad._id)}>
                  Edit
                </button>
                <button
                  className="border-2 uppercase font-bold mr-2 border-black px-2 rounded bg-red-500  hover:bg-red-600"
                  onClick={() => handleDeleteNotepad(notepad._id)}>
                  Delete
                </button>
              </Card>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="text-center font-bold uppercase">{isEditing ? "Edit" : "Create"} Notepad</h2>
        <input
          className="border-2 border-sky-500 outline-none rounded w-full px-1 mt-3 mb-3"
          type="text"
          placeholder="Title"
          name="title"
          value={newNotepad.title}
          onChange={handleInputChange}
        />
        <input
          className="border-2 border-sky-500 rounded flex w-full outline-none mb-3 px-1 "
          type="text"
          placeholder="Subtitle"
          name="subtitle"
          value={newNotepad.subtitle}
          onChange={handleInputChange}
        />
        <textarea
          className=" border-2 border-sky-500 outline-none rounded px-1 w-full resize-none"
          placeholder="Content"
          name="content"
          value={newNotepad.content}
          onChange={handleInputChange}
        />
        <button
          className="border-2 border-black uppercase font-bold px-2 rounded mx-2 mt-5 flex w-full justify-center bg-sky-700 hover:bg-sky-900 "
          onClick={isEditing ? handleEditNotepad : handleCreateNotepad}>
          {isEditing ? "Edit Notepad" : "Create Notepad"}
        </button>
      </Card>
    </div>
  );
};

export default App;
