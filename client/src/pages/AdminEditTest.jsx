import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function AdminEditTest() {
  const { id } = useParams();

  const [test, setTest] = useState(null);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [image, setImage] = useState("");

  // 🔥 LOAD TEST
  useEffect(() => {
    API.get(`/tests/${id}`).then((res) => setTest(res.data));
  }, [id]);

  // 🔥 ADD QUESTION
  const addQuestion = async () => {
    if (!question || options.some((o) => !o)) {
      return toast.error("Fill all fields");
    }

    try {
      await API.post(`/tests/${id}/question`, {
        question,
        options,
        correct,
        image,
      });

      toast.success("Question added");

      // RESET
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrect(0);
      setImage("");

      // REFRESH
      const res = await API.get(`/tests/${id}`);
      setTest(res.data);
    } catch {
      toast.error("Error adding question");
    }
  };

  if (!test) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">
        ✏️ Edit Test: {test.title}
      </h1>

      {/* TEST INFO */}
      <div className="bg-white p-4 rounded shadow">
        <p>Questions: {test.totalQuestions}</p>
        <p>Total Marks: {test.totalMarks}</p>
        <p>Duration: {test.duration} mins</p>
      </div>

      {/* ADD QUESTION */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <h2 className="font-semibold">Add Question</h2>

        <textarea
          placeholder="Question"
          className="input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {/* IMAGE */}
        <input
          placeholder="Image URL (optional)"
          className="input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* OPTIONS */}
        {options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Option ${i + 1}`}
            className="input"
            value={opt}
            onChange={(e) => {
              const updated = [...options];
              updated[i] = e.target.value;
              setOptions(updated);
            }}
          />
        ))}

        {/* CORRECT */}
        <select
          className="input"
          value={correct}
          onChange={(e) => setCorrect(Number(e.target.value))}
        >
          <option value={0}>Correct: Option 1</option>
          <option value={1}>Option 2</option>
          <option value={2}>Option 3</option>
          <option value={3}>Option 4</option>
        </select>

        <button
          onClick={addQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>
      </div>

      {/* QUESTION LIST */}
      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <h2 className="font-semibold">All Questions</h2>

        {test.questions.map((q, i) => (
          <div key={i} className="p-3 bg-gray-100 rounded">
            <p className="font-semibold">
              {i + 1}. {q.question}
            </p>
            {q.image && (
              <img src={q.image} className="w-40 mt-2" />
            )}
            <ul className="text-sm mt-2">
              {q.options.map((o, idx) => (
                <li key={idx}>
                  {idx === q.correct ? "✅" : ""} {o}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}