import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let user = {};

  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch (e) {
    console.log("User parse error", e);
  }

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="h-16 backdrop-blur-lg bg-white/40 shadow flex items-center justify-between px-6">
        {/* LEFT */}
        <p className="text-sm font-medium">
  🎓 {user?.name || "Student"} | {user?.studentEmail || ""}
</p>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* 🔔 NOTIFICATION */}
          <FaBell
            className="text-xl cursor-pointer hover:scale-110 transition"
            onClick={() => setShowNotif(true)}
          />

          {/* 👤 PROFILE */}
          <div className="relative">
            <FaUserCircle
              className="text-2xl cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />

            {/* DROPDOWN */}
            {showProfile && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-3 w-40">
                <p
                  className="text-m mb-2 cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                    setShowProfile(false);
                  }}
                >
                  My Profile
                </p>
                <button onClick={handleLogout} className="text-red-500 text-m">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔔 NOTIFICATION PANEL */}
      <AnimatePresence>
        {showNotif && (
          <>
            {/* OVERLAY */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setShowNotif(false)}
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4 z-50"
            >
              <h2 className="font-semibold mb-4">Notifications</h2>

              <p className="text-sm">📢 New class at 5 PM</p>
              <p className="text-sm mt-2">📝 Test tomorrow</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
