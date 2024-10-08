import { useState, useEffect } from "react";
import api from "../context/api";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";

// NoteType interface definition
interface NoteType {
  id: number;
  title: string;
  content: string;
  created_at: string; // or Date if you prefer
}

function Home() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    setLoading(true); // Set loading to true when fetching notes
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false)); // Set loading to false after fetching
  };

  const deleteNote = (id: number) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
        setTitle("");
        setContent("");
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <div className="flex justify-between mx-12 ">
          <h2 className="text-3xl font-bold p-4">Notes</h2>
          <button
            onClick={() => navigate("/logout")}
            className="bg-blue-500 h-12 px-4 mt-4 hover:bg-blue-700 text-white font-bold rounded"
          >
            Log Out
          </button>
        </div>

        {loading ? ( // Show loading indicator
          <LoadingIndicator/>
        ) : notes.length === 0 ? ( // Show message if no notes
          <p className="text-center text-gray-600 my-4">No notes available.</p>
        ) : (
          notes.map((note: NoteType) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />
          ))
        )}
      </div>

      <form
        onSubmit={createNote}
        className="bg-white shadow-md rounded md:mx-52 px-20 pt-6 pb-8 mb-4"
      >
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label
          htmlFor="content"
          className="block text-gray-700 text-sm font-bold mb-2 mt-4"
        >
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
        ></textarea>

        <input
          type="submit"
          value="Submit"
          className="mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>
  );
}

export default Home;
