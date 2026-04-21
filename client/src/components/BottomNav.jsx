import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaVideo,
  FaBook,
  FaFileAlt,
  FaUser,
  FaComments,
  FaInbox,
} from "react-icons/fa";

export default function BottomNav() {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center text-xs ${
      isActive ? "text-indigo-600" : "text-gray-500"
    }`;

  return (
    <div className="fixed bottom-0 w-full bg-white border-t h-16 flex justify-around items-center shadow">

      <NavLink to="/dashboard" className={linkClass}>
        <FaHome />
        Dashboard
      </NavLink>

      <NavLink to="/live" className={linkClass}>
        <FaVideo />
        Classes
      </NavLink>

      <NavLink to="/notes" className={linkClass}>
        <FaBook />
        Notes
      </NavLink>

      <NavLink to="/lectures" className={linkClass}>
        <FaFileAlt />
        Lectures
      </NavLink>

      <NavLink to="/chat" className={linkClass}>
        <FaComments />
        Chat
      </NavLink>

    </div>
  );
}