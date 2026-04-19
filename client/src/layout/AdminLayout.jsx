import { Outlet, Link, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">EduBloom</h2>

        <nav className="flex flex-col gap-4 text-sm">
          <Link className="hover:bg-white/10 p-2 rounded-lg" to="/admin">
            📊 Dashboard
          </Link>

          <Link
            className="hover:bg-white/10 p-2 rounded-lg"
            to="/admin/students"
          >
            👨‍🎓 Students
          </Link>

          <Link
            className="hover:bg-white/10 p-2 rounded-lg"
            to="/admin/lectures"
          >
            🎥 Lectures
          </Link>

          <Link className="hover:bg-white/10 p-2 rounded-lg" to="/admin/notes">
            📚 Notes
          </Link>

          <Link
            className="hover:bg-white/10 p-2 rounded-lg"
            to="/admin/classes"
          >
            🧑‍🏫 Classes
          </Link>

          <Link
            className="hover:bg-white/10 p-2 rounded-lg"
            to="/admin/messages"
          >
            💬 Messages
          </Link>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* 🔵 NAVBAR */}
        <div className="h-16 backdrop-blur-lg bg-white/40 shadow flex items-center justify-between px-6">
          <h1 className="font-semibold text-lg">Admin Panel</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            Logout
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
