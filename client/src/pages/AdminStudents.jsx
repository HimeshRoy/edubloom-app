import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/admin/students");
    setStudents(res.data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students</h2>

      {students.map((s) => (
        <div key={s._id} className="p-3 border mb-2">
          <p>{s.name}</p>
          <button onClick={() => navigate(`/admin/student/${s._id}`)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
}