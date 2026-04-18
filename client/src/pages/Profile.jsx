import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await API.get("/user/me");
    setUser(res.data);
  };

  const update = async () => {
    setLoading(true);
    try {
      await API.put("/user/update", user);
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">

      {/* CONTAINER */}
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">Student • Class {user.class}</p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              value={user.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-gray-500">Phone Number</label>
            <input
              value={user.phone || ""}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* STATE */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">State</label>
            <input
              value={user.state || ""}
              onChange={(e) => setUser({ ...user, state: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* STUDENT ID */}
          <div>
            <label className="text-sm text-gray-500">Student ID</label>
            <input
              value={user.studentId || ""}
              disabled
              className="w-full mt-1 p-3 rounded-xl bg-gray-100"
            />
          </div>

          {/* CLASS */}
          <div>
            <label className="text-sm text-gray-500">Class</label>
            <input
              value={user.class || ""}
              disabled
              className="w-full mt-1 p-3 rounded-xl bg-gray-100"
            />
          </div>

          {/* EDU EMAIL */}
          <div>
            <label className="text-sm text-gray-500">Edu Email</label>
            <input
              value={user.studentEmail || ""}
              disabled
              className="w-full mt-1 p-3 rounded-xl bg-gray-100"
            />
          </div>

          {/* ORIGINAL EMAIL */}
          <div>
            <label className="text-sm text-gray-500">Original Email</label>
            <input
              value={user.email || ""}
              disabled
              className="w-full mt-1 p-3 rounded-xl bg-gray-100"
            />
          </div>

        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={update}
          className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}