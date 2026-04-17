import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Live Classes", path: "/live" },
    { name: "Lectures", path: "/lectures" },
    { name: "Notes", path: "/notes" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div className="w-64 h-screen bg-dark text-white p-5 fixed">
      <h1 className="text-2xl font-bold mb-8">EduBloom</h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-2 rounded-lg ${
              location.pathname === item.path
                ? "bg-primary"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}