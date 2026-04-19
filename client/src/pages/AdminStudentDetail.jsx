import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

export default function AdminStudentDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await API.get(`/admin/student/${id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <div className="p-6">Loading...</div>;

  const { student, logs, totalHours } = data;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">👤 Student Details</h1>

      {/* INFO */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-2">
        <p><b>Name:</b> {student.name}</p>
        <p><b>Email:</b> {student.studentEmail}</p>
        <p><b>Class:</b> {student.class}</p>
        <p><b>Phone:</b> {student.phone || "N/A"}</p>
        <p><b>State:</b> {student.state || "N/A"}</p>
        <p><b>Student ID:</b> {student.studentId}</p>
      </div>

      {/* STATS */}
      <div className="bg-indigo-600 text-white p-5 rounded-2xl">
        <p>Total Study Time</p>
        <h2 className="text-2xl font-bold">
          {totalHours.toFixed(2)} hrs
        </h2>
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
              <span className="text-sm text-gray-500">
                {log.duration} hrs
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}