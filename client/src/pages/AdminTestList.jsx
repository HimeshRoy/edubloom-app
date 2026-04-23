import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function AdminTestList() {
  const [tests, setTests] = useState([]);

  // ✅ FETCH ALL TESTS (ADMIN)
  const fetchTests = async () => {
    try {
      const res = await API.get("/tests/admin/all");
      setTests(res.data);
    } catch {
      toast.error("Failed to load tests");
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // ✅ PUBLISH TEST
  const publishTest = async (id) => {
    try {
      await API.put(`/tests/${id}/publish`);
      toast.success("Published 🚀");
      fetchTests();
    } catch {
      toast.error("Publish failed");
    }
  };

  // ✅ DELETE TEST
  const deleteTest = async (id) => {
    if (!window.confirm("Delete this test?")) return;

    try {
      await API.delete(`/tests/${id}`);
      toast.success("Deleted ❌");
      fetchTests();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 All Test Papers</h1>

      {tests.length === 0 && (
        <p className="text-gray-500">No tests created yet</p>
      )}

      <div className="space-y-4">
        {tests.map((test) => (
          <div
            key={test._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >
            {/* LEFT INFO */}
            <div>
              <h2 className="text-lg font-semibold">{test.title}</h2>

              <p className="text-sm text-gray-500">
                {test.subject} • Class {test.className}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Questions: {test.totalQuestions || 0} | Marks:{" "}
                {test.totalMarks || 0}
              </p>

              <p className="text-xs mt-1">
                {new Date(test.startTime).toLocaleString()} →
                {new Date(test.endTime).toLocaleString()}
              </p>

              {/* STATUS */}
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                  test.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {test.isPublished ? "Published" : "Draft"}
              </span>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-3">
              {!test.isPublished && (
                <button
                  onClick={() => publishTest(test._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Publish
                </button>
              )}

              <button
                onClick={() => deleteTest(test._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  (window.location.href = `/admin/tests/${test._id}/edit`)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
