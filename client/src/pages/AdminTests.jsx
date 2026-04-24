import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function AdminTests() {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    className: "",
    startTime: "",
    endTime: "",
    marksPerQuestion: 4,
    timePerQuestion: 60,
    instructions: "",
  });

  const [testId, setTestId] = useState(null);
  const [file, setFile] = useState(null);

  // ✅ CREATE TEST
  const createTest = async () => {
    try {
      const res = await API.post("/tests/create", form);
      setTestId(res.data._id);
      toast.success("Test Created");
    } catch (err) {
      toast.error("Error creating test");
    }
  };

  // ✅ UPLOAD CSV
  const uploadCSV = async () => {
    if (!file || !testId) return toast.error("Missing data");

    const data = new FormData();
    data.append("file", file);

    try {
      await API.post(`/tests/${testId}/upload`, data);
      toast.success("Questions Uploaded");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">📘 Create Test Paper</h1>

      {/* CREATE TEST */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <input
          placeholder="Test Title"
          className="input"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Subject"
          className="input"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <input
          placeholder="Class"
          className="input"
          onChange={(e) => setForm({ ...form, className: e.target.value })}
        />

        {/* TIME */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="datetime-local"
            className="input"
            onChange={(e) =>
              setForm({ ...form, startTime: e.target.value })
            }
          />

          <input
            type="datetime-local"
            className="input"
            onChange={(e) =>
              setForm({ ...form, endTime: e.target.value })
            }
          />
        </div>

        {/* MARKS + TIME */}
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Marks per question"
            type="number"
            className="input"
            onChange={(e) =>
              setForm({ ...form, marksPerQuestion: e.target.value })
            }
          />

          <input
            placeholder="Time per question (sec)"
            type="number"
            className="input"
            onChange={(e) =>
              setForm({ ...form, timePerQuestion: e.target.value })
            }
          />
        </div>

        {/* INSTRUCTIONS */}
        <textarea
          placeholder="Instructions..."
          className="input h-24"
          onChange={(e) =>
            setForm({ ...form, instructions: e.target.value })
          }
        />

        <button
          onClick={createTest}
          className="btn bg-blue-600 text-white"
        >
          Create Test
        </button>
      </div>

      {/* CSV UPLOAD */}
      {testId && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">

          <h2 className="font-semibold">Upload Questions (CSV)</h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={uploadCSV}
            className="btn bg-green-600 text-white"
          >
            Upload CSV
          </button>
        </div>
      )}
    </div>
  );
}