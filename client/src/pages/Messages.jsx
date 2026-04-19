import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import { io } from "socket.io-client";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 SOCKET
  useEffect(() => {
    socketRef.current = io("https://edubloom-app.onrender.com");

    socketRef.current.on("new_message", (msg) => {
      // ✅ only announcements
      if (!msg.isAnnouncement) return;

      setMessages((prev) => {
        const exists = prev.find((m) => m._id === msg._id);
        if (exists) return prev;
        return [msg, ...prev];
      });
    });

    return () => socketRef.current.disconnect();
  }, []);

  // 🔥 FETCH
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await API.get("/messages/announcements");
    setMessages(res.data);
  };

  // 🔥 UNREAD COUNT
  const unreadCount = messages.filter(
    (msg) => !msg.readBy?.includes(user._id)
  ).length;

  // 🔥 MARK READ
  const openMessage = async (id) => {
    await API.put(`/messages/read/${id}`);

    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === id
          ? {
              ...msg,
              readBy: [...(msg.readBy || []), user._id],
            }
          : msg
      )
    );
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">
        📢 Announcements
        {unreadCount > 0 && (
          <span className="ml-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
            {unreadCount}
          </span>
        )}
      </h1>

      {messages.length === 0 && <p>No announcements</p>}

      {messages.map((msg) => (
        <div
          key={msg._id}
          onClick={() => openMessage(msg._id)}
          className="bg-white p-4 rounded-xl shadow cursor-pointer hover:scale-[1.01] transition"
        >
          <p className="text-xs text-gray-500">📢 Announcement</p>

          <p className="font-medium">{msg.text}</p>

          <span className="text-xs text-gray-400">
            {new Date(msg.createdAt).toLocaleString()}
          </span>

          <div className="text-xs mt-1 text-gray-400">
            {msg.readBy?.includes(user._id) ? "✔✔ Seen" : "✔ New"}
          </div>
        </div>
      ))}
    </div>
  );
}