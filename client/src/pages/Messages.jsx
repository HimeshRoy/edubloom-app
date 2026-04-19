import { useEffect, useState } from "react";
import API from "../services/api";
import { io } from "socket.io-client";
import { useRef } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://edubloom-app.onrender.com");

    socketRef.current.on("new_message", (msg) => {
      setMessages((prev) => {
        const exists = prev.find((m) => m._id === msg._id);
        if (exists) return prev;
        return [msg, ...prev];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await API.get("/messages");
    setMessages(res.data);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const unreadCount = messages.filter(
    (msg) =>
      (!msg.userId || msg.userId === user._id) &&
      !msg.readBy?.includes(user._id),
  ).length;

  const openMessage = async (id) => {
    await API.put(`/messages/read/${id}`);

    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === id
          ? {
              ...msg,
              readBy: [...(msg.readBy || []), user._id],
            }
          : msg,
      ),
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

      {messages.length === 0 && <p>No messages</p>}

      {messages.map((msg) => (
        <div
          key={msg._id}
          className="bg-white p-4 rounded-xl shadow"
          onClick={() => openMessage(msg._id)}
        >
          <p className="text-xs text-gray-500">
            {msg.userId ? "Private" : "Broadcast"}
          </p>
          <p>{msg.text}</p>
          <span className="text-xs text-gray-400">
            {new Date(msg.createdAt).toLocaleString()}
          </span>
          {msg.role === "admin" && (
            <span>{msg.readBy?.includes(user._id) ? "✔✔ Seen" : "✔ Sent"}</span>
          )}
        </div>
      ))}
    </div>
  );
}
