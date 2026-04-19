import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">👑 Admin Dashboard</h1>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <div className="bg-indigo-600 text-white p-5 rounded-2xl">
          <p>Total Students</p>
          <h2 className="text-2xl font-bold">
            {data.stats.totalStudents}
          </h2>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-2xl">
          <p>Lectures</p>
          <h2 className="text-2xl font-bold">
            {data.stats.totalLectures}
          </h2>
        </div>

        <div className="bg-purple-600 text-white p-5 rounded-2xl">
          <p>Notes</p>
          <h2 className="text-2xl font-bold">
            {data.stats.totalNotes}
          </h2>
        </div>

        <div className="bg-pink-600 text-white p-5 rounded-2xl">
          <p>Classes</p>
          <h2 className="text-2xl font-bold">
            {data.stats.totalClasses}
          </h2>
        </div>

      </div>

      {/* 🔥 GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 👨‍🎓 RECENT STUDENTS */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">New Students</h2>

          {data.recentStudents.length === 0 ? (
            <p className="text-gray-500">No students</p>
          ) : (
            data.recentStudents.map((s) => (
              <div key={s._id} className="flex justify-between mb-2">
                <span>{s.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>

        {/* 📊 RECENT ACTIVITY */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Recent Activity</h2>

          {data.recentLogs.length === 0 ? (
            <p className="text-gray-500">No activity</p>
          ) : (
            data.recentLogs.map((log) => (
              <div key={log._id} className="mb-2">
                <span>{log.subject}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {log.duration} hrs
                </span>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}