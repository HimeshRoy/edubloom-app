import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // 🔥 future: fetch dashboard data here
    // API.get("/dashboard")

    setLoading(false);
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">
        Welcome back, {user?.name} 👋
      </h1>

      {/* GRID START */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TODAY CLASSES */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Today’s Classes</h2>
          <p className="text-gray-500 text-sm">
            No classes scheduled
          </p>
        </div>

        {/* ANALYTICS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Analytics</h2>
          <p className="text-gray-500 text-sm">
            Data will appear here
          </p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <button className="bg-indigo-500 text-white p-4 rounded-xl hover:scale-105 transition">
          NOTES
        </button>

        <button className="bg-indigo-500 text-white p-4 rounded-xl hover:scale-105 transition">
          LECTURES
        </button>

        <button className="bg-indigo-500 text-white p-4 rounded-xl hover:scale-105 transition">
          TEST
        </button>

        <button className="bg-indigo-500 text-white p-4 rounded-xl hover:scale-105 transition">
          MESSAGE
        </button>

      </div>

    </div>
  );
}