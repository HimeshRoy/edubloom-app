import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/admin/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">👨‍🎓 Students</h1>

        <input
          placeholder="Search student..."
          className="border p-2 rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="bg-white rounded-2xl shadow p-4 space-y-3">

        {filtered.length === 0 ? (
          <p className="text-gray-500">No students found</p>
        ) : (
          filtered.map((s) => (
            <div
              key={s._id}
              onClick={() => navigate(`/admin/student/${s._id}`)}
              className="flex justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-gray-500">{s.studentEmail}</p>
              </div>

              <span className="text-sm text-gray-400">
                {s.studentId}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}