import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
  <div className="space-y-6">

    {/* HEADER */}
    <div>
      <h1 className="text-3xl font-bold">
        Welcome back, {data.name} 👋
      </h1>
      <p className="text-gray-500 text-sm">
        Keep learning
      </p>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      <div className="bg-white/70 backdrop-blur p-5 rounded-2xl shadow-md hover:scale-[1.02] transition">
        <p className="text-gray-500 text-sm">Courses</p>
        <h2 className="text-2xl font-bold">{data.stats.courses}</h2>
      </div>

      <div className="bg-white/70 backdrop-blur p-5 rounded-2xl shadow-md hover:scale-[1.02] transition">
        <p className="text-gray-500 text-sm">Hours Learned</p>
        <h2 className="text-2xl font-bold">{data.stats.hours}</h2>
      </div>

      <div className="bg-white/70 backdrop-blur p-5 rounded-2xl shadow-md hover:scale-[1.02] transition">
        <p className="text-gray-500 text-sm">Streak</p>
        <h2 className="text-2xl font-bold">{data.stats.streak} days</h2>
      </div>

    </div>

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* TODAY CLASSES */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold mb-4">📅 Today’s Classes</h2>

        {data.todayClasses.map((cls, i) => (
          <div
            key={i}
            className="flex justify-between p-3 bg-gray-100 rounded-lg mb-2"
          >
            <span>{cls.subject}</span>
            <span className="text-sm text-gray-600">{cls.time}</span>
          </div>
        ))}
      </div>

      {/* ANALYTICS */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold mb-4">📊 Weekly Activity</h2>

        {data.analytics.map((a, i) => (
          <div key={i} className="mb-3">

            <div className="flex justify-between text-sm mb-1">
              <span>{a.day}</span>
              <span>{a.hours} hrs</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: `${a.hours * 20}%` }}
              />
            </div>

          </div>
        ))}
      </div>

    </div>

    {/* QUICK ACTIONS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {["Notes", "Lectures", "Tests", "Messages"].map((item) => (
        <button
          key={item}
          className="bg-indigo-600 text-white p-4 rounded-xl hover:scale-105 hover:bg-indigo-700 transition"
        >
          {item}
        </button>
      ))}

    </div>

  </div>
);
}