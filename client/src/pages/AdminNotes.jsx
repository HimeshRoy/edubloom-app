import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function AdminNotes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    pdfUrl: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.subject || !form.pdfUrl) {
      return toast.error("Fill all fields");
    }

    if (editId) {
      await API.put(`/notes/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/notes", form);
    }

    setForm({ title: "", subject: "", pdfUrl: "" });
    fetchNotes();
  };

  const handleEdit = (note) => {
    setForm({
      title: note.title,
      subject: note.subject,
      pdfUrl: note.pdfUrl,
    });
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete note?")) return;

    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">📄 Manage Notes</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Subject</option>
          <option>Maths</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Biology</option>
        </select>

        <input
          placeholder="PDF URL"
          value={form.pdfUrl}
          onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded text-white ${
            editId ? "bg-blue-500" : "bg-purple-600"
          }`}
        >
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-3">

        {notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded"
            >
              <div>
                <p className="font-semibold">{note.title}</p>
                <p className="text-sm text-gray-500">{note.subject}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}