import { useState, useEffect } from "react";
import { Bot, X } from "lucide-react";
import API from "../services/api";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    const updatedMessages = [...messages, { role: "user", content: userMsg }];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/ai", {
        messages: updatedMessages,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.data.answer },
      ]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", content: "Error" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <div
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
      >
        <Bot size={24} />
      </div>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* HEADER */}
          <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
            <span>🤖 EduBloom AI</span>
            <X onClick={() => setOpen(false)} className="cursor-pointer" />
          </div>

          {/* BODY */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white ml-auto"
                    : "bg-gray-200"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 animate-pulse">AI is typing...</div>
            )}
          </div>

          {/* INPUT */}
          <div className="p-2 border-t flex items-center gap-2 relative">
            {/* INPUT */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border p-2 rounded-lg"
              placeholder="Ask anything..."
            />

            {/* SEND */}
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
