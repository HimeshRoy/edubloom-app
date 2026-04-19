import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LiveClass() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await API.get("/live-classes");
      setClasses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const joinClass = (cls) => {
    navigate(`/live/${cls._id}`, { state: cls });
  };

  const getColor = (subject) => {
    switch (subject) {
      case "Maths":
        return "from-blue-500 to-indigo-600";
      case "Physics":
        return "from-purple-500 to-pink-500";
      case "Chemistry":
        return "from-green-500 to-emerald-600";
      case "Biology":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  if (loading) return <div className="p-6">Loading classes...</div>;

  const formatTime = (time) => {
    if (!time || !time.includes(":")) return time;

    const [h, m] = time.split(":");
    const hour = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour}:${m} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🎥 Live Classes</h1>

      {/* ❌ NO CLASS */}
      {classes.length === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <p className="text-gray-500">
            😴 No classes scheduled. Chill or revise!
          </p>
        </div>
      )}

      {/* ✅ CLASS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className={`bg-gradient-to-br ${getColor(
              cls.subject,
            )} text-white p-6 rounded-2xl shadow hover:scale-[1.03] transition`}
          >
            <h2 className="text-xl font-semibold mb-2">{cls.subject}</h2>

            <p className="text-sm opacity-80">👨‍🏫 {cls.teacher}</p>

            <p className="text-sm mb-4 opacity-80">🕒{formatTime(cls.time)}</p>

            <button
              onClick={() => joinClass(cls)}
              className="w-full bg-white text-black p-2 rounded-lg hover:scale-105 transition"
            >
              🚀 Join Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
