import { useState, useEffect } from "react";
import { Bot, X } from "lucide-react";
import API from "../services/api";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    // show user instantly
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/ai", {
        question: userMsg,
      });

      setMessages((prev) => [...prev, { role: "ai", text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePDF = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("pdf", file);

  setLoading(true);

  try {
    const res = await API.post("/ai/pdf", formData);

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: res.data.answer },
    ]);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const handleImage = async (file) => {
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = async () => {
    const base64 = reader.result.split(",")[1];

    setMessages((prev) => [
      ...prev,
      { role: "user", text: "🖼 Image uploaded" },
    ]);

    setLoading(true);

    try {
      const res = await API.post("/ai/image", {
        image: base64,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.answer },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  reader.readAsDataURL(file);
};


  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

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
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 animate-pulse">AI is typing...</div>
            )}
          </div>

          {/* INPUT */}
          <div className="p-2 border-t flex items-center gap-2 relative">
            {/* ➕ BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              +
            </button>

            {/* POPUP MENU */}
            {showMenu && (
              <div className="absolute bottom-12 left-0 bg-white shadow-xl rounded-xl p-3 w-52 z-50">
                <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  📷 Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImage(e.target.files[0]);
                      setShowMenu(false);
                    }}
                    hidden
                  />
                </label>

                <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  📄 Upload PDF
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      handlePDF(e.target.files[0]);
                      setShowMenu(false);
                    }}
                    hidden
                  />
                </label>
              </div>
            )}

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
