import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaVideo,
  FaBook,
  FaFileAlt,
  FaClipboardList,
  FaComments,
  FaWhatsapp,
  FaUserCircle,
  FaInbox,
} from "react-icons/fa";

export default function Sidebar() {

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Live Classes", path: "/live", icon: <FaVideo /> },
    { name: "Notes", path: "/notes", icon: <FaBook /> },
    { name: "Lectures", path: "/lectures", icon: <FaFileAlt /> },
    { name: "Tests", path: "/tests", icon: <FaClipboardList /> },
    { name: "Announcement", path: "/messages", icon: < FaInbox /> },
    { name: "Profile", path: "/profile", icon: <FaUserCircle /> },
    { name: "Chat", path: "/chat", icon: <FaComments /> },
  ];

  return (
    <div className="w-64 h-screen bg-indigo-900 text-white p-6 fixed flex flex-col">

      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-8">EduBloom</h1>

      {/* MENU */}
      <div className="space-y-3 flex-1">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-indigo-700"
                  : "hover:bg-indigo-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

      </div>

      {/* WHATSAPP BUTTON (BOTTOM FIXED) */}
      <button className="flex items-center justify-center gap-2 bg-lime-600 w-full p-3 rounded-lg text-sm hover:scale-105 transition">
        <FaWhatsapp className="text-lg" />
        Join WhatsApp
      </button>

    </div>
  );
}