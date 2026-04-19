import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    teacher: "",
    time: "",
    date: "",
    meetLink: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await API.get("/live-classes/admin");
    setClasses(res.data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await API.put(`/live-classes/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/live-classes", form);
    }

    setForm({
      subject: "",
      teacher: "",
      time: "",
      date: "",
      meetLink: "",
    });

    fetchClasses();
  };

  const handleEdit = (cls) => {
    setForm(cls);
    setEditId(cls._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete class?")) return;

    await API.delete(`/live-classes/${id}`);
    fetchClasses();
  };

  const formatTime = (time) => {
    if (!time || !time.includes(":")) return time;

    const [h, m] = time.split(":");
    const hour = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour}:${m} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🎓 Manage Classes</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-3">
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="Teacher"
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="time"
          placeholder="Select time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="Meet Link"
          value={form.meetLink}
          onChange={(e) => setForm({ ...form, meetLink: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Class" : "Create Class"}
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-3">
        {classes.map((c) => (
          <div
            key={c._id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded"
          >
            <div>
              <p className="font-semibold">{c.subject}</p>
              <p className="text-sm">
                {c.teacher} | {formatTime(c.time)}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(c)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(c._id)}
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
