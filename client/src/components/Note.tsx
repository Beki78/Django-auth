
interface NoteType {
  id: number;
  title: string;
  content: string;
  created_at: string; // or Date if you prefer
}

interface NoteProps {
  note: NoteType;
  onDelete: (id: number) => void; // Type for the delete function
}

function Note({ note, onDelete }: NoteProps) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container bg-white shadow-md rounded p-4 mb-4 md:mx-40">
      <p className="note-title text-lg font-bold text-gray-800">{note.title}</p>
      <p className="note-content text-gray-700">{note.content}</p>
      <p className="note-date text-gray-500 text-sm">{formattedDate}</p>
      <button 
        className="delete-button mt-2 bg-red-600 text-white font-bold py-1 px-2 rounded hover:bg-red-500 focus:outline-none focus:shadow-outline"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Note;
