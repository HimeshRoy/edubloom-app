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

  const getStatus = (cls) => {
    const now = new Date();

    const classDate = new Date(cls.date);

    const [sh, sm] = cls.time.split(":");
    const [eh, em] = cls.endTime.split(":");

    const startTime = new Date(classDate);
    startTime.setHours(sh, sm, 0);

    const endTime = new Date(classDate);
    endTime.setHours(eh, em, 0);

    if (now < startTime) return "Not Started";
    if (now >= startTime && now <= endTime) return "Live Now 🔴";
    if (now > endTime) return "Ended";
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
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
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
            {getStatus(cls) === "Live Now 🔴" && (
              <span className="bg-red-500 px-2 py-1 text-xs rounded-full ml-2">
                🔴 LIVE
              </span>
            )}

            <button
              onClick={() => joinClass(cls)}
              disabled={getStatus(cls) !== "Live Now 🔴"}
              className={`w-full p-2 rounded-lg transition ${
                getStatus(cls) === "Live Now 🔴"
                  ? "bg-white text-black hover:scale-105"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              {getStatus(cls) === "Live Now 🔴"
                ? "🚀 Join Now"
                : getStatus(cls)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
