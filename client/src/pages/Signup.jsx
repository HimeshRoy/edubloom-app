import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import indiaStates from "../utils/indiaStates";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    className: "10",
  });

  const [loading, setLoading] = useState(false);

  // 🔐 Password validation
  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      password,
    );
  };

  const handleSignup = async () => {
    if (!isValidPassword(form.password)) {
      return toast.error(
        "Password must be 8+ chars with A-Z, a-z, number & special char 😏",
      );
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", form);

      toast.success(`Account created 🎉 ID: ${res.data.studentId}`);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="w-[900px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        {/* LEFT FORM */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaUser className="text-purple-500 mr-3" />
              <input
                placeholder="Full Name"
                className="bg-transparent outline-none w-full"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaEnvelope className="text-purple-500 mr-3" />
              <input
                placeholder="Email"
                className="bg-transparent outline-none w-full"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaLock className="text-purple-500 mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaPhone className="text-purple-500 mr-3" />
              <input
                placeholder="Mobile Number"
                className="bg-transparent outline-none w-full"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {/* State */}
            <select
              className="w-full p-3 rounded-full bg-gray-100 outline-none"
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              defaultValue=""
            >
              <option value="" disabled>
                Select State / UT
              </option>

              {indiaStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignup}
            className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold"
          >
            {loading ? "Creating..." : "CREATE ACCOUNT"}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center justify-center">
          <div className="text-center px-6">
            <img src="" alt="" />
            <h1 className="text-2xl font-bold">Welcome to EduBloom</h1>
            <p className="mt-2 text-sm opacity-80">
              Learn smarter. Grow faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
