import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminStudentDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    state: "",
  });

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await API.get(`/admin/students/${id}`);

      setData(res.data);

      // ✅ MOVE HERE
      setForm({
        name: res.data.student.name,
        phone: res.data.student.phone || "",
        state: res.data.student.state || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  if (data) {
    setForm({
      name: data.student.name,
      phone: data.student.phone || "",
      state: data.student.state || "",
    });
  }
}, [data]);

  if (!data) return <div className="p-6">Loading...</div>;

  const { student, logs, totalHours } = data;

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure?");

    if (!confirm) return;

    try {
      await API.delete(`/admin/students/${id}`);

      toast.success("Deleted successfully");

      window.location.href = "/admin/students";
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/admin/students/${id}`, form);

      toast.success("Updated");

      setEditMode(false);

      fetchDetails(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold">👤 Student Details</h1>

      {/* INFO */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">

  {editMode ? (
    <>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded w-full"
        placeholder="Name"
      />

      <input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="border p-2 rounded w-full"
        placeholder="Phone"
      />

      <input
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
        className="border p-2 rounded w-full"
        placeholder="State"
      />
    </>
  ) : (
    <>
      <div className="grid grid-cols-2 gap-4">

        <p><b>Name:</b> {student.name}</p>
        <p><b>Email:</b> {student.email}</p>

        <p><b>Student Email:</b> {student.studentEmail}</p>
        <p><b>Class:</b> {student.class}</p>

        <p><b>Phone:</b> {student.phone || "N/A"}</p>
        <p><b>State:</b> {student.state || "N/A"}</p>

        <p><b>Student ID:</b> {student.studentId}</p>
        <p><b>Joined:</b> {new Date(student.createdAt).toLocaleDateString()}</p>

      </div>
    </>
  )}

</div>

      <div className="flex gap-3">
        {editMode ? (
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>

      {/* STATS */}
      <div className="bg-indigo-600 text-white p-5 rounded-2xl">
        <p>Total Study Time</p>
        <h2 className="text-2xl font-bold">{totalHours.toFixed(2)} hrs</h2>
      </div>

      {/* LOGS */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="font-semibold mb-4">Recent Activity</h2>

        {logs.length === 0 ? (
          <p className="text-gray-500">No activity</p>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="flex justify-between mb-2">
              <span>{log.subject}</span>
              <span className="text-sm text-gray-500">{log.duration} hrs</span>
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
      >
        Delete Student
      </button>
    </div>
  );
}
