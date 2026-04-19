import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function AdminMessages() {
  const [text, setText] = useState("");
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMessages();
    fetchStudents();
  }, []);

  const fetchMessages = async () => {
    const res = await API.get("/messages");
    setMessages(res.data);
  };

  const fetchStudents = async () => {
    const res = await API.get("/admin/students");
    setStudents(res.data);
  };

  const handleEdit = (msg) => {
  setText(msg.text);
  setEditId(msg._id);
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete message?")) return;

  await API.delete(`/messages/${id}`);
  fetchMessages();
};

const send = async () => {
  if (!text.trim()) return;

  if (editId) {
    await API.put(`/messages/${editId}`, { text });
    setEditId(null);
  } else {
    await API.post("/messages", {
      text,
      userId: selectedUser || null,
    });
  }

  setText("");
  setSelectedUser("");
  fetchMessages();

  toast.success("Message sent");
};

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">💬 Admin Messages</h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-3">
        <textarea
          placeholder="Write announcement..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-3 w-full rounded"
        />

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">Broadcast (All)</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} - {s.studentId}
            </option>
          ))}
        </select>

        <button
          onClick={send}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow space-y-3">
        <h2 className="font-semibold">Sent Messages</h2>

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <p>{msg.text}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(msg)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(msg._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
