import { useEffect, useState } from "react";
import API from "../services/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("Maths");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    if (!question.trim()) return;

    try {
      await API.post("/messages", {
        question,
        subject,
      });

      setQuestion("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">💬 Doubts</h1>

      {/* INPUT */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Maths</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Biology</option>
        </select>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your doubt..."
          className="w-full border p-3 rounded"
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <p className="font-semibold">
              🧑 You: {msg.question}
            </p>

            <p className="text-sm text-gray-500">
              {msg.subject}
            </p>

            {msg.answer ? (
              <p className="mt-2 text-green-600">
                👨‍🏫 Teacher: {msg.answer}
              </p>
            ) : (
              <p className="mt-2 text-yellow-500">
                ⏳ Waiting for reply...
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}