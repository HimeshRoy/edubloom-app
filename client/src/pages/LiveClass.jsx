import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LiveClass() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const allowedSubjects = ["Math", "Physics", "Chemistry", "Biology"];

  const filteredClasses = classes.filter((cls) =>
    allowedSubjects.includes(cls.subject),
  );

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

  const navigate = useNavigate();

  const joinClass = (cls) => {
    navigate(`/live/${cls._id}`, { state: cls });
  };

  if (loading)
    return (
      <div className="p-6 text-gray-500 animate-pulse">Loading classes...</div>
    );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold">🎥 Live Classes</h1>

      {/* CLASS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-500">😴 No classes scheduled today</p>
          </div>
        ) : (
          filteredClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">{cls.subject}</h2>

              <p className="text-gray-500 text-sm">👨‍🏫 {cls.teacher}</p>
              <p className="text-gray-500 text-sm mb-4">🕒 {cls.time}</p>

              <button
                onClick={() => joinClass(cls)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg hover:scale-105 transition"
              >
                Join Class
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
