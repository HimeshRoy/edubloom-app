import { useEffect, useState } from "react";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
        <h1 className="text-3xl font-bold">Welcome back, {data.name} 👋</h1>
        <p className="text-gray-500 text-sm">Keep learning</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { title: "Courses", value: data.stats.courses },
          { title: "Hours Learned", value: data.stats.hours },
          { title: "Streak", value: data.stats.streak + " days" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-5 rounded-2xl shadow-lg hover:scale-[1.03] transition"
          >
            <p className="text-sm opacity-80">{item.title}</p>
            <h2 className="text-3xl font-bold">{item.value}</h2>
          </div>
        ))}
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

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.analytics}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Notes", "Lectures", "Tests", "Messages"].map((item) => (
          <button
            key={item}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
