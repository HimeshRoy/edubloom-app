import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function TestInstructions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    API.get(`/tests/${id}`).then((res) => setTest(res.data));
  }, [id]);

  if (!test) return <p className="p-6">Loading...</p>;

  const now = new Date();

  // 🚫 TIME CHECK
  if (now < new Date(test.startTime)) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-yellow-600">
          ⏳ Test not started yet
        </h2>
      </div>
    );
  }

  if (now > new Date(test.endTime)) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">
        Test already ended
        </h2>
      </div>
    );
  }

  const startTest = () => {
    if (!agree) {
      return toast.error("Please accept instructions");
    }

    navigate(`/test/${id}/start`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white max-w-3xl w-full p-6 rounded-2xl shadow space-y-6">

        {/* HEADER */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold">{test.title}</h1>
          <p className="text-gray-500 text-sm">
            {test.subject} • Class {test.className}
          </p>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="bg-gray-100 p-3 rounded">
            📝 Questions: <b>{test.totalQuestions}</b>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            🎯 Total Marks: <b>{test.totalMarks}</b>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            ⏱ Duration: <b>{test.duration} mins</b>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            ❌ Negative Marks: <b>{test.negativeMarks}</b>
          </div>

        </div>

        {/* INSTRUCTIONS */}
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">📋 Instructions</h2>

          <ul className="text-sm space-y-1 text-gray-700">
            <li>🚫 No tab switching allowed</li>
            <li>🚫 No copy paste</li>
            <li>🚫 No right click</li>
            <li>📷 Webcam must stay ON</li>
            <li>⚠️ 3 warnings = auto submit</li>
            <li>🔒 Fullscreen required</li>
          </ul>

          {/* ADMIN INSTRUCTIONS */}
          {test.instructions && (
            <div className="mt-3 p-3 bg-yellow-100 rounded text-sm">
              ✏️ {test.instructions}
            </div>
          )}
        </div>

        {/* AGREEMENT */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <label className="text-sm">
            I have read all instructions and agree
          </label>
        </div>

        {/* START BUTTON */}
        <button
          onClick={startTest}
          className={`w-full py-3 rounded-lg font-semibold ${
            agree
              ? "bg-green-600 text-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Start Test
        </button>
      </div>
    </div>
  );
}