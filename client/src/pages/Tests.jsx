import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Tests() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    const res = await API.get("/tests");
    setTests(res.data);
  };

  const now = new Date();

  const upcoming = tests.filter(
    (t) => new Date(t.startTime) > now
  );

  const live = tests.filter(
    (t) =>
      new Date(t.startTime) <= now &&
      new Date(t.endTime) >= now
  );

  const past = tests.filter(
    (t) => new Date(t.endTime) < now
  );

  const format = (date) =>
    new Date(date).toLocaleString();

  const Card = ({ test, type }) => (
    <div className="bg-white p-5 rounded-xl shadow space-y-2">

      <h2 className="font-semibold text-lg">{test.title}</h2>

      <p className="text-sm text-gray-500">
        {test.subject} • Class {test.className}
      </p>

      <p className="text-xs">
        📝 {test.totalQuestions} Qs | 🎯 {test.totalMarks} Marks
      </p>

      <p className="text-xs text-gray-400">
        ⏰ {format(test.startTime)}
      </p>

      {/* BUTTON LOGIC */}
      {type === "live" && (
        <button
          onClick={() => navigate(`/test/${test._id}`)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Start Test 🚀
        </button>
      )}

      {type === "upcoming" && (
        <button
          disabled
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Not Started
        </button>
      )}

      {type === "past" && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Result
        </button>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold">🧪 Tests</h1>

      {/* 🔴 LIVE */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-red-500">
          Live Tests
        </h2>

        {live.length === 0 ? (
          <p className="text-gray-400">No live tests</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {live.map((t) => (
              <Card key={t._id} test={t} type="live" />
            ))}
          </div>
        )}
      </div>

      {/* 🟡 UPCOMING */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-yellow-500">
          Upcoming Tests
        </h2>

        {upcoming.length === 0 ? (
          <p className="text-gray-400">No upcoming tests</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {upcoming.map((t) => (
              <Card key={t._id} test={t} type="upcoming" />
            ))}
          </div>
        )}
      </div>

      {/* ⚫ PAST */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-600">
          Past Tests
        </h2>

        {past.length === 0 ? (
          <p className="text-gray-400">No past tests</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {past.map((t) => (
              <Card key={t._id} test={t} type="past" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}