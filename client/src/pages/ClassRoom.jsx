import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ClassRoom() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { sender: "Sir", text: "Welcome to class" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  const joinMeet = () => {
    window.open(state?.meetLink, "_blank");
  };

  return (
    <div className="h-[calc(100vh-64px)] flex gap-4">

      {/* 🎥 VIDEO AREA */}
      <div className="flex-1 bg-black rounded-2xl flex flex-col items-center justify-center text-white relative">

        <h2 className="text-xl font-semibold mb-2">
          🎥 {state?.subject}
        </h2>

        <p className="text-gray-300 mb-6">
          {state?.teacher} | {state?.time}
        </p>

        <button
          onClick={joinMeet}
          className="bg-green-500 px-6 py-3 rounded-lg text-lg hover:scale-105 transition"
        >
          🚀 Join Live Class
        </button>

        <p className="text-green-400 mt-3">🔴 Live class running</p>

        {/* 🎛 CONTROL BAR */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full">

          <button
            onClick={() => navigate("/live")}
            className="bg-red-500 text-white px-4 py-2 rounded-full"
          >
            Leave
          </button>

        </div>

      </div>

      {/* 💬 CHAT PANEL */}
      <div className="w-80 bg-white rounded-2xl shadow p-4 flex flex-col">

        <h2 className="font-semibold mb-3">💬 Chat</h2>

        <div className="flex-1 overflow-y-auto text-sm space-y-2">
          {messages.map((msg, i) => (
            <div key={i}>
              <span className="font-semibold">{msg.sender}: </span>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded-lg"
            placeholder="Ask doubt..."
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 rounded-lg"
          >
            Send
          </button>
        </div>

        {/* 🧠 AI PANEL */}
        <div className="mt-4 border-t pt-3">
          <h3 className="font-semibold mb-2">🧠 AI Doubt Solver</h3>

          <input
            placeholder="Ask AI anything..."
            className="w-full border p-2 rounded mb-2"
          />

          <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg">
            Ask AI
          </button>
        </div>

      </div>

    </div>
  );
}