import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import { io } from "socket.io-client";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user.role === "admin";

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  // 🔥 SOCKET INIT (ONLY ONCE)
  useEffect(() => {
    socketRef.current = io("https://edubloom-app.onrender.com");

    socketRef.current.emit("join", user._id);

    socketRef.current.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    socketRef.current.on("new_message", (msg) => {
      if (
        selectedUser &&
        (msg.senderId === selectedUser ||
          msg.receiverId === selectedUser)
      ) {
        setMessages((prev) => {
          const exists = prev.find((m) => m._id === msg._id);
          if (exists) return prev;
          return [...prev, msg];
        });
      }
    });

    socketRef.current.on("user_typing", (data) => {
      if (data.from === selectedUser) {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      }
    });

    return () => socketRef.current.disconnect();
  }, [selectedUser]);

  // 🔥 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 FETCH USERS
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      if (isAdmin) {
        const res = await API.get("/admin/students");
        setUsers(res.data);
      } else {
        // 👇 student ke liye admin fetch
        const res = await API.get("/user/admin");
        setUsers([res.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 AUTO OPEN CHAT (STUDENT SIDE)
  useEffect(() => {
    if (!isAdmin && users.length > 0) {
      openChat(users[0]._id);
    }
  }, [users]);

  // 🔥 OPEN CHAT
  const openChat = async (id) => {
    setSelectedUser(id);

    const res = await API.get(`/messages/chat/${id}`);
    setMessages(res.data);

    // mark read
    res.data.forEach((msg) => {
      if (!msg.readBy?.includes(user._id)) {
        API.put(`/messages/read/${msg._id}`);
      }
    });
  };

  // 🔥 SEND
  const send = async () => {
    if (!text.trim() || !selectedUser) return;

    const res = await API.post("/messages", {
      text,
      receiverId: selectedUser,
    });

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  // 🔥 TYPING
  const handleTyping = () => {
    socketRef.current.emit("typing", {
      from: user._id,
      to: selectedUser,
    });
  };

 return (
  <div className="h-[85vh] flex">

    {/* 🟣 MOBILE VIEW */}
    {isMobile ? (
      <>
        {/* 👉 USERS LIST */}
        {!selectedUser && (
          <div className="w-full bg-white p-4">
            <h2 className="font-semibold mb-3">Chats</h2>

            {users.map((u) => (
              <div
                key={u._id}
                onClick={() => openChat(u._id)}
                className="p-3 border-b flex justify-between items-center"
              >
                <span>
                  {u.name} {!isAdmin && "(Admin)"}
                </span>

                {onlineUsers.includes(u._id) && (
                  <span className="text-green-500">●</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 👉 CHAT SCREEN */}
        {selectedUser && (
          <div className="flex flex-col w-full">

            {/* 🔙 BACK HEADER */}
            <div className="p-3 bg-white border-b flex items-center gap-3">
              <button onClick={() => setSelectedUser(null)}>
                ⬅
              </button>
              <span className="font-semibold">
                {users.find(u => u._id === selectedUser)?.name}
              </span>
            </div>

            {/* 💬 MESSAGES */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-2 rounded-lg max-w-[70%] ${
                    msg.senderId === user._id
                      ? "bg-purple-500 text-white ml-auto"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>

            {/* INPUT */}
            <div className="p-2 border-t flex gap-2">
              <input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  handleTyping();
                }}
                className="flex-1 border p-2 rounded"
              />

              <button
                onClick={send}
                className="bg-purple-600 text-white px-3 rounded"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </>
    ) : (
      /* 🖥️ DESKTOP VIEW (UNCHANGED) */
      <>
        {/* LEFT USERS */}
        <div className="w-1/3 bg-white border-r p-4">
          <h2 className="font-semibold mb-3">Chats</h2>

          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => openChat(u._id)}
              className={`p-3 rounded cursor-pointer mb-2 ${
                selectedUser === u._id
                  ? "bg-purple-100"
                  : "hover:bg-gray-100"
              }`}
            >
              {u.name}

              {onlineUsers.includes(u._id) && (
                <span className="text-green-500 ml-2">●</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT CHAT */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-3 rounded-xl max-w-xs ${
                  msg.senderId === user._id
                    ? "bg-purple-500 text-white ml-auto"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 border p-2 rounded"
            />

            <button
              onClick={send}
              className="bg-purple-600 text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </>
    )}
  </div>
);
}