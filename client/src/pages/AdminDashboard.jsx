import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">👑 Admin Panel</h1>

      <button onClick={() => navigate("/admin/students")}>
        Students
      </button>

      <button onClick={() => navigate("/admin/lectures")}>
        Lectures
      </button>

      <button onClick={() => navigate("/admin/notes")}>
        Notes
      </button>

      <button onClick={() => navigate("/admin/classes")}>
        Classes
      </button>

      <button onClick={() => navigate("/admin/messages")}>
        Messages
      </button>
    </div>
  );
}