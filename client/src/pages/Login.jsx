import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      toast.success("Welcome back");

      setTimeout(() => {
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 px-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        {/* LEFT (FORM) */}
        <div className="w-full md:w-1/2 p-6 md:p-10">

          {/* MOBILE LOGO */}
          <div className="md:hidden text-center mb-6">
            <img
              src="https://res.cloudinary.com/dpmpmxyfn/image/upload/v1776680542/edubloomLogo.png"
              alt="logo"
              className="mx-auto w-24"
            />
            <h2 className="text-xl font-bold mt-2">EduBloom</h2>
          </div>

          <h2 className="text-xl md:lg:text-2xl text-center font-bold mb-6">
            Welcome Back
          </h2>

          <div className="space-y-4">

            {/* EMAIL */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaEnvelope className="text-purple-500 mr-3" />
              <input
                placeholder="Email"
                className="bg-transparent outline-none w-full text-sm"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <FaLock className="text-purple-500 mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full text-sm"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          {/* SIGNUP */}
          <p className="mt-4 text-sm text-gray-500 text-center md:text-left">
            New here?{" "}
            <span
              className="text-purple-600 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create account
            </span>
          </p>
        </div>

        {/* RIGHT (HIDE IN MOBILE) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white items-center justify-center">
          <div className="text-center px-6">
            <img
              src="https://res.cloudinary.com/dpmpmxyfn/image/upload/v1776680542/edubloomLogo.png"
              alt="logo"
              width={220}
            />
            <h2 className="text-2xl font-bold mt-4">EduBloom</h2>
            <p className="mt-2 text-sm opacity-80">
              Learn smarter. Grow faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}