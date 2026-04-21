import { Outlet, NavLink, useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function MobileLayout() {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* 🔥 TOP HEADER */}
      <div className= "bg-indigo-900 text-white px-4 py-3 flex justify-between items-center shadow-sm">

        {/* LEFT */}
        <h1 className="text-lg font-bold">EduBloom</h1>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">

          {/* 🔔 NOTIFICATION */}
          <NavLink to="/messages" className="text-white text-xl">
            <FaBell />
          </NavLink>

          {/* 👤 PROFILE */}
          <div>
            <FaUserCircle
              className="text-2xl cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />

            {/* DROPDOWN */}
            {showProfile && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-3 w-40 z-50">
                <p
                  className="text-sm mb-2 cursor-pointer hover:text-indigo-600"
                  onClick={() => {
                    navigate("/profile");
                    setShowProfile(false);
                  }}
                >
                  My Profile
                </p>

                <button
                  onClick={handleLogout}
                  className="text-red-500 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 📱 CONTENT */}
      <div className="flex-1 p-4 pb-20">
        <Outlet />
      </div>

      {/* 🔻 BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}