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
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // 🔐 Password validation
  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
  };

  // 🔥 SEND OTP
  const handleSendOtp = async () => {
    if (!form.email) return toast.error("Enter email first");

    try {
      setLoading(true);

      await API.post("/auth/send-otp", {
        email: form.email,
      });

      toast.success("OTP sent to email 📩");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FINAL SIGNUP
  const handleSignup = async () => {
    if (!isValidPassword(form.password)) {
      return toast.error(
        "Password must be strong (A-Z, a-z, number, special)"
      );
    }

    if (!form.otp) {
      return toast.error("Enter OTP");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", form);

      toast.success("Account created");

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="w-[900px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        
        {/* LEFT */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          <div className="space-y-4">

            {/* NAME */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaUser className="mr-3 text-purple-500" />
              <input
                placeholder="Full Name"
                className="bg-transparent outline-none w-full"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            {/* EMAIL */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaEnvelope className="mr-3 text-purple-500" />
              <input
                placeholder="Email"
                className="bg-transparent outline-none w-full"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* SEND OTP BUTTON */}
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="w-full py-2 rounded-full bg-blue-500 text-white"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            )}

            {/* OTP INPUT */}
            {otpSent && (
              <input
                placeholder="Enter OTP"
                className="w-full p-3 rounded-full bg-gray-100 outline-none"
                onChange={(e) =>
                  setForm({ ...form, otp: e.target.value })
                }
              />
            )}

            {/* PASSWORD */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaLock className="mr-3 text-purple-500" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {/* PHONE */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaPhone className="mr-3 text-purple-500" />
              <input
                placeholder="Mobile Number"
                className="bg-transparent outline-none w-full"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            {/* STATE */}
            <select
              className="w-full p-3 rounded-full bg-gray-100 outline-none"
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
            >
              <option value="">Select State</option>
              {indiaStates.map((s, i) => (
                <option key={i}>{s}</option>
              ))}
            </select>
          </div>

          {/* FINAL BUTTON */}
          {otpSent && (
            <button
              onClick={handleSignup}
              className="mt-6 w-full py-3 rounded-full bg-purple-600 text-white"
            >
              {loading ? "Creating..." : "CREATE ACCOUNT"}
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center justify-center">
          <div className="text-center">
            <img src="https://res.cloudinary.com/dpmpmxyfn/image/upload/v1776680542/edubloomLogo.png" alt="logo" width={300} />
            <h1 className="text-2xl font-bold">EduBloom</h1>
            <p className="mt-2 text-sm">Learn smarter. Grow faster.</p>
          </div>
        </div>
      </div>
    </div>
  );
}