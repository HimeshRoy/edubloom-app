import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Result() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/tests/result/${id}`).then((res) =>
      setData(res.data)
    );
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  const { result, test } = data;

  const total = test.questions.length;
  const percentage = ((result.correct / total) * 100).toFixed(1);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">🎉 Result</h1>

        <p>Score: <b>{result.score}</b></p>
        <p>Correct: <b>{result.correct}</b></p>
        <p>Wrong: <b>{result.wrong}</b></p>
        <p>Percentage: <b>{percentage}%</b></p>
      </div>

      {/* QUESTIONS REVIEW */}
      {test.questions.map((q, i) => {
        const userAns = result.answers[i];

        return (
          <div key={i} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">
              Q{i + 1}. {q.question}
            </p>

            {q.options.map((opt, idx) => {
              let style = "bg-gray-100";

              if (idx === q.correct)
                style = "bg-green-200";

              if (idx === userAns && idx !== q.correct)
                style = "bg-red-200";

              return (
                <div key={idx} className={`p-2 mb-1 rounded ${style}`}>
                  {opt}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}