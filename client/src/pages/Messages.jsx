import { useEffect, useState } from "react";
import API from "../services/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await API.get("/messages");
    setMessages(res.data);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const unreadCount = messages.filter(
    (msg) => !msg.readBy?.includes(user._id),
  ).length;

  const openMessage = async (id) => {
    await API.put(`/messages/read/${id}`);
    fetchMessages();
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
        </div>
      ))}
    </div>
  );
}
