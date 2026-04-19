import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminLectures() {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    videoUrl: "",
  });

  const [lectures, setLectures] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    const res = await API.get("/lectures");
    setLectures(res.data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await API.put(`/lectures/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/lectures", form);
    }

    setForm({ title: "", subject: "", videoUrl: "" });
    fetchLectures();
  };

  const handleEdit = (lec) => {
    setForm({
      title: lec.title,
      subject: lec.subject,
      videoUrl: lec.videoUrl,
    });
    setEditId(lec._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete lecture?")) return;

    await API.delete(`/lectures/${id}`);
    fetchLectures();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">🎥 Manage Lectures</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">

        <input
          placeholder="Lecture Title"
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
          placeholder="YouTube Link"
          value={form.videoUrl}
          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded text-white ${
            editId ? "bg-blue-500" : "bg-purple-600"
          }`}
        >
          {editId ? "Update Lecture" : "Add Lecture"}
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-3">

        {lectures.length === 0 ? (
          <p className="text-gray-500">No lectures</p>
        ) : (
          lectures.map((lec) => (
            <div
              key={lec._id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
            >
              <div>
                <p className="font-semibold">{lec.title}</p>
                <p className="text-sm text-gray-500">{lec.subject}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(lec)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(lec._id)}
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