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
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">👑 Admin</h2>

        <nav className="space-y-3">
          <a href="/admin">Dashboard</a>
          <a href="/admin/students">Students</a>
          <a href="/admin/lectures">Lectures</a>
          <a href="/admin/notes">Notes</a>
          <a href="/admin/classes">Classes</a>
          <a href="/admin/messages">Messages</a>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* 🔵 NAVBAR */}
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">

          <h1 className="font-semibold">Admin Panel</h1>

          {/* 🔥 LOGOUT BUTTON */}
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