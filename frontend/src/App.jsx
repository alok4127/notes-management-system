import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/notes";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveNote = async () => {
    if (!text.trim()) return;

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
      }

      setText("");
      setEditingId(null);
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const editNote = (note) => {
    setText(note.text);
    setEditingId(note._id);
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            fontSize: "42px",
            marginBottom: "40px",
          }}
        >
          📝 Notes App
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Enter a note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              flex: 1,
              padding: "14px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          />

          <button
            onClick={saveNote}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {editingId ? "Update" : "Add Note"}
          </button>
        </div>

        {notes.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#64748b",
              marginTop: "60px",
              fontSize: "18px",
            }}
          >
            No notes available. Add your first note above.
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <p
                style={{
                  marginBottom: "15px",
                  fontSize: "17px",
                  color: "#1e293b",
                }}
              >
                {note.text}
              </p>

              <button
                onClick={() => editNote(note)}
                style={{
                  backgroundColor: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note._id)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;