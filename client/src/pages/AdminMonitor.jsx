import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function AdminMonitor() {
  const [students, setStudents] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const socket = io("https://edubloom-app.onrender.com");

    // 🎥 VIDEO STREAM
    socket.on("admin_video", (data) => {
      setStudents((prev) => ({
        ...prev,
        [data.user]: {
          ...prev[data.user],
          frame: data.frame,
        },
      }));
    });

    // 🚨 ALERTS
    socket.on("admin_alert", (data) => {
      setAlerts((prev) => [data, ...prev]);

      setStudents((prev) => ({
        ...prev,
        [data.user]: {
          ...prev[data.user],
          score: (prev[data.user]?.score || 0) + data.score,
        },
      }));
    });

    return () => socket.disconnect();
  }, []);

  // 🎯 STATUS COLOR
  const getStatus = (score = 0) => {
    if (score >= 10) return "bg-red-500";
    if (score >= 5) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="flex h-screen">

      {/* LEFT - VIDEO GRID */}
      <div className="flex-1 p-4 grid grid-cols-3 gap-4 bg-gray-100 overflow-y-auto">
        {Object.keys(students).map((user) => (
          <div
            key={user}
            className="bg-white rounded-xl shadow p-2 relative"
          >
            <img
              src={students[user].frame}
              className="w-full h-40 object-cover rounded"
            />

            <div className="mt-2 flex justify-between items-center">
              <p className="font-semibold">{user}</p>

              <span
                className={`w-3 h-3 rounded-full ${getStatus(
                  students[user].score
                )}`}
              ></span>
            </div>

            <p className="text-xs text-gray-500">
              Score: {students[user].score || 0}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT - ALERT PANEL */}
      <div className="w-80 bg-white border-l p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-3">🚨 Alerts</h2>

        {alerts.map((a, i) => (
          <div
            key={i}
            className="bg-red-100 p-2 rounded mb-2 text-sm"
          >
            <b>{a.user}</b> → {a.message}
          </div>
        ))}
      </div>
    </div>
  );
}