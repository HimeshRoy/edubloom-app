import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

export default function ClassRoom() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isLogged, setIsLogged] = useState(false);

  if (!state) {
    return <div className="p-6">❌ No class data found. Go back.</div>;
  }

  // 🚀 JOIN CLASS
  const joinMeet = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    window.open(state?.meetLink, "_blank", "noopener,noreferrer");
  };

  // 🚀 LEAVE CLASS
  const leaveClass = async () => {
    if (!startTime) {
      navigate("/live");
      return;
    }

    const endTime = Date.now();
    const duration = (endTime - startTime) / 3600000;

    if (duration < 0.01) {
      navigate("/live");
      return;
    }

    try {
      await API.post("/study-log", {
        subject: state.subject,
        duration: Number(duration.toFixed(2)),
      });
      setIsLogged(true);
    } catch (err) {
      console.log("Tracking failed", err);
    }

    navigate("/live");
  };

  // 🚀 AUTO SAVE ON TAB CLOSE
  useEffect(() => {
    const handleLeave = () => {
      if (!startTime || isLogged) return;

      const endTime = Date.now();
      const duration = (endTime - startTime) / 3600000;

      const blob = new Blob(
        [
          JSON.stringify({
            subject: state.subject,
            duration: Number(duration.toFixed(2)),
          }),
        ],
        { type: "application/json" }
      );

      navigator.sendBeacon(
        "https://edubloom-app.onrender.com/api/study-log",
        blob
      );
    };

    window.addEventListener("beforeunload", handleLeave);

    return () => {
      window.removeEventListener("beforeunload", handleLeave);
    };
  }, [startTime, isLogged, state]);

  // 🚀 TIMER
  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="h-[calc(100vh-64px)] flex gap-4">
      {/* 🎥 VIDEO AREA */}
      <div className="flex-1 bg-black rounded-2xl flex flex-col items-center justify-center text-white relative">
        <h2 className="text-xl font-semibold mb-2">🎥 {state?.subject}</h2>

        <p className="text-gray-300 mb-6">
          {state?.teacher} | {state?.time}
        </p>

        {/* ⏱ LIVE TIMER */}
        {startTime && (
          <p className="text-yellow-400 mb-4">
            ⏱ {(elapsed / 60000).toFixed(1)} min
          </p>
        )}

        <button
          onClick={joinMeet}
          disabled={!!startTime}
          className={`px-6 py-3 rounded-lg text-lg transition ${
            startTime
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:scale-105"
          }`}
        >
          {startTime ? "Joined ✅" : "🚀 Join Live Class"}
        </button>

        <p className="text-green-400 mt-3">🔴 Live class running</p>

        {/* 🎛 CONTROL BAR */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full">
          <button
            onClick={leaveClass}
            className="bg-red-500 text-white px-4 py-2 rounded-full"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}